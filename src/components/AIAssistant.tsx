import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  X, Send, Brain, ChevronDown, 
  Trash2, Copy, Check, Command, Download, Mic, 
  MinusCircle, Maximize2, Settings, GraduationCap, Code, Zap,
  ImageIcon
} from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import rehypeHighlight from 'rehype-highlight';
import 'highlight.js/styles/github-dark.css';

interface Message {
  role: 'user' | 'assistant' | 'system';
  content: string;
  timestamp: Date;
  type?: 'text' | 'image' | 'code';
}

interface Persona {
  id: string;
  name: string;
  icon: React.ElementType;
  prompt: string;
}

const personas: Persona[] = [
  { 
    id: 'mentor', 
    name: 'Guru Ramah', 
    icon: GraduationCap, 
    prompt: 'Anda adalah Guru yang sangat ramah dan sabar di KelasWeb. Jelaskan materi dengan bahasa yang mudah dipahami pemula.' 
  },
  { 
    id: 'expert', 
    name: 'Senior Dev', 
    icon: Code, 
    prompt: 'Anda adalah Senior Software Engineer. Berikan jawaban teknis yang mendalam, fokus pada best practices, dan optimasi kode.' 
  },
  { 
    id: 'socrates', 
    name: 'Metode Socrates', 
    icon: Brain, 
    prompt: 'Jangan berikan jawaban langsung. Ajukan pertanyaan balik yang memicu siswa untuk berpikir dan menemukan jawabannya sendiri.' 
  },
  { 
    id: 'fast', 
    name: 'Cepat & Ringkas', 
    icon: Zap, 
    prompt: 'Berikan jawaban yang sangat singkat, poin-per-poin, dan langsung ke inti masalah.' 
  }
];

interface AIAssistantProps {
  context: string;
}

const generateSeed = () => Math.floor(Math.random() * 1000000);

const AIAssistant = ({ context }: AIAssistantProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [selectedPersona, setSelectedPersona] = useState(personas[0]);
  
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isListening, setIsListening] = useState(false);
  
  // Dynamic Models with robust fallbacks
  const [textModels, setTextModels] = useState<string[]>(['deepseek', 'polly', 'openai', 'qwen-coder', 'mistral', 'gemini', 'llama']);
  const [imageModels, setImageModels] = useState<{name: string, description: string}[]>([]);
  const [selectedTextModel, setSelectedTextModel] = useState('deepseek');
  const [selectedImageModel, setSelectedImageModel] = useState('flux');
  
  const [showModels, setShowModels] = useState(false);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const abortControllerRef = useRef<AbortController | null>(null);
  const API_KEY = import.meta.env.VITE_POLLINATIONS_API_KEY;

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowModels(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const suggestions = [
    "Ringkas materi ini",
    "Berikan contoh kodenya",
    "Buat kuis latihan",
    "Visualisasikan konsep ini"
  ];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const headers = { 
          'Authorization': `Bearer ${(API_KEY || "").trim()}`, 
          'accept': 'application/json' 
        };
        
        // Fetch Text Models
        const textRes = await fetch('https://gen.pollinations.ai/text/models', { headers });
        const textData = await textRes.json();
        if (Array.isArray(textData) && textData.length > 0) {
          const names = textData.map((m: { name?: string; id?: string } | string) => {
            const name = typeof m === 'string' ? m : m.name || m.id;
            return name ? String(name).toLowerCase() : null;
          }).filter(Boolean) as string[];
          
          if (names.length > 0) {
            setTextModels(names);
            // Don't auto-reset selected model if current one is still in the list
            if (!names.includes(selectedTextModel)) {
              setSelectedTextModel(names.includes('deepseek') ? 'deepseek' : names[0]);
            }
          }
        }

        // Fetch Image Models
        const imgRes = await fetch('https://gen.pollinations.ai/image/models', { headers });
        const imgData = await imgRes.json();
        if (Array.isArray(imgData) && imgData.length > 0) {
          const imgOnly = imgData
            .filter((m: { output_modalities?: string[] }) => m.output_modalities?.includes('image'))
            .map((m: { name?: string; description?: string }) => ({ 
              name: m.name ? String(m.name).toLowerCase() : 'unknown', 
              description: m.description || '' 
            }));
          
          if (imgOnly.length > 0) {
            setImageModels(imgOnly);
            if (!imgOnly.some(m => m.name === selectedImageModel)) {
              setSelectedImageModel(imgOnly.some(m => m.name === 'flux') ? 'flux' : imgOnly[0].name);
            }
          }
        }
      } catch (error) {
        console.error('Failed to fetch models:', error);
      }
    };
    if (API_KEY) fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [API_KEY]);

  /* Automatic scroll disabled for better user focus
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading, showSettings]);
  */

  const exportChat = () => {
    const text = messages.map(m => `${m.role.toUpperCase()} [${m.timestamp.toLocaleString()}]: ${m.content}`).join('\n\n');
    const blob = new Blob([text], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `chat-mentor-${new Date().getTime()}.txt`;
    a.click();
  };

  const toggleListening = () => {
    if (!('webkitSpeechRecognition' in window)) {
      alert('Browser Anda tidak mendukung pengenalan suara.');
      return;
    }
    interface ISpeechRecognition {
      lang: string;
      start(): void;
      onresult: (event: { results: { [key: number]: { [key: number]: { transcript: string } } } }) => void;
      onerror: (event: unknown) => void;
      onend: () => void;
    }

    const SpeechRecognition = ((window as unknown as Record<string, never>).webkitSpeechRecognition || 
                               (window as unknown as Record<string, never>).SpeechRecognition) as unknown as { new(): ISpeechRecognition };
    if (!SpeechRecognition) return;
    
    const recognition = new SpeechRecognition();
    recognition.lang = 'id-ID';
    if (!isListening) {
      setIsListening(true);
      recognition.start();
      recognition.onresult = (event: { results: { [key: number]: { [key: number]: { transcript: string } } } }) => {
        const transcript = event.results[0][0].transcript;
        setInput(prev => prev + ' ' + transcript);
        setIsListening(false);
      };
      recognition.onerror = () => setIsListening(false);
      recognition.onend = () => setIsListening(false);
    } else {
      setIsListening(false);
    }
  };

  const handleSend = async (textOverride?: string) => {
    const query = textOverride || input;
    if (!query.trim() || isLoading) return;

    const isImageRequest = query.toLowerCase().includes('visualisasikan') || query.toLowerCase().includes('buat gambar');
    const userMessage: Message = { role: 'user', content: query, timestamp: new Date() };
    const currentMessages = [...messages, userMessage];
    setMessages(currentMessages);
    setInput('');
    setIsLoading(true);

    if (isImageRequest) {
      try {
        const response = await fetch('https://gen.pollinations.ai/v1/images/generations', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${(API_KEY || "").trim()}`
          },
          body: JSON.stringify({
            prompt: query,
            model: selectedImageModel,
            width: 1024,
            height: 1024,
            seed: generateSeed(),
            nologo: true,
            response_format: 'url'
          })
        });
        const data = await response.json();
        const imageUrl = data.data?.[0]?.url || data.url;
        setMessages([...currentMessages, { 
          role: 'assistant', 
          content: `Tentu, berikut adalah visualisasi untuk "${query}":\n\n![Visualisasi](${imageUrl})`, 
          timestamp: new Date(),
          type: 'image'
        }]);
      } catch {
        const randomSeed = generateSeed();
        const fallbackUrl = `https://pollinations.ai/p/${encodeURIComponent(query)}?width=1024&height=1024&seed=${randomSeed}&nologo=true`;
        setMessages([...currentMessages, { 
          role: 'assistant', 
          content: `Tentu, berikut adalah visualisasi untuk "${query}":\n\n![Visualisasi](${fallbackUrl})`, 
          timestamp: new Date(),
          type: 'image'
        }]);
      } finally {
        setIsLoading(false);
      }
      return;
    }

    const controller = new AbortController();
    abortControllerRef.current = controller;
    try {
      const projectContext = `
        Konteks Proyek: "Kelas Web" - Platform Edukasi Web Developer Modern.
        Kurikulum Utama:
        1. Dasar Web (HTML5, Semantic HTML, CSS3 Dasar)
        2. CSS Lanjutan & Framework (Flexbox, Grid, Tailwind CSS, Bootstrap)
        3. JavaScript (DOM, ES6+, Async/Await, API)
        4. Modern Library (React.js, Hooks, State Management)
        5. Backend (Node.js, Express.js, API Design)
        6. Database (PostgreSQL, Prisma ORM, Neon DB)
        7. Deployment & Tooling (Cloudflare, Vercel, Git, CI/CD)
        8. Tren 2026: Vibe Coding, Cursor, Antigravity, VSCode, AI-Powered Dev.
        9. Keamanan Web (XSS, SQL Injection, CSRF).
      `;

      const systemMessage = { 
        role: 'system', 
        content: `
          ${selectedPersona.prompt} 
          ${projectContext}
          
          Konteks Materi Saat Ini: ${context}.
          
          Aturan:
          - Jika user bertanya di luar konteks "Kelas Web" atau Web Development, berikan jawaban singkat lalu arahkan kembali ke materi.
          - Gunakan markdown code blocks untuk kode.
          - Fokus pada edukasi dan pemahaman siswa.
        `
      };
      const response = await fetch('https://gen.pollinations.ai/text', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${(API_KEY || "").trim()}`
        },
        body: JSON.stringify({
          messages: [systemMessage, ...currentMessages.map(({role, content}) => ({role, content}))],
          model: selectedTextModel,
          temperature: 0.7,
        }),
        signal: controller.signal
      });
      const contentType = response.headers.get('content-type');
      let content = '';
      if (contentType?.includes('application/json')) {
        const data = await response.json();
        content = data.choices?.[0]?.message?.content || data.content || JSON.stringify(data);
      } else {
        content = await response.text();
      }
      setMessages([...currentMessages, { role: 'assistant', content, timestamp: new Date() }]);
    } catch (error: unknown) {
      if ((error as Error).name === 'AbortError') return;
      setMessages([...currentMessages, { role: 'assistant', content: `❌ Gagal: ${(error as Error).message}`, timestamp: new Date() }]);
    } finally {
      setIsLoading(false);
      abortControllerRef.current = null;
    }
  };

  return (
    <div className="fixed bottom-[5px] right-[5px] md:bottom-8 md:right-8 z-[9999]">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ 
              opacity: 1, 
              scale: 1, 
              y: 0,
            }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className={`absolute bottom-0 right-0 bg-white dark:bg-zinc-900 border border-black/10 dark:border-white/10 shadow-2xl overflow-hidden flex flex-col transition-all duration-300 ${isMinimized ? 'rounded-2xl w-[72px] h-[72px]' : 'rounded-xl md:rounded-[2rem] w-[calc(100vw-10px)] sm:w-[400px] md:w-[450px] h-[calc(100svh-10px)] md:h-[min(650px,calc(100svh-140px))]'}`}
          >
            {/* Header Area */}
            <div className="p-3 md:p-4 bg-black dark:bg-zinc-800 text-white shrink-0">
              <div className="flex items-center justify-between gap-1 md:gap-2">
                <div className="flex items-center gap-2 md:gap-3 min-w-0">
                  <div className="w-8 h-8 md:w-10 md:h-10 rounded-xl bg-white/10 flex items-center justify-center shrink-0">
                    <selectedPersona.icon size={18} className={`md:size-[22px] ${isLoading ? 'animate-pulse' : ''}`} />
                  </div>
                  {!isMinimized && (
                    <div className="min-w-0 flex-1">
                      <h3 className="font-bold text-xs md:text-sm truncate leading-tight">Kelas Web AI</h3>
                      <div className="relative" ref={dropdownRef}>
                        <button 
                          onClick={() => setShowModels(!showModels)}
                          className="flex items-center gap-1 text-[8px] md:text-[9px] font-bold uppercase tracking-widest opacity-60 hover:opacity-100 transition-opacity truncate max-w-full"
                        >
                          <span className="truncate">{selectedTextModel}</span> <ChevronDown size={8} />
                        </button>
                        <AnimatePresence>
                          {showModels && (
                            <motion.div
                              initial={{ opacity: 0, y: 5 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0, y: 5 }}
                              className="absolute top-6 left-0 bg-white dark:bg-zinc-700 border border-black/10 dark:border-white/10 rounded-xl shadow-2xl z-[100] p-1 w-44 max-h-48 overflow-y-auto"
                            >
                              {textModels.map(m => (
                                <button
                                  key={m}
                                  onClick={() => { setSelectedTextModel(m); setShowModels(false); }}
                                  className={`w-full text-left px-3 py-2 rounded-lg text-[10px] font-bold uppercase tracking-widest transition-colors ${selectedTextModel === m ? 'bg-black text-white' : 'text-black dark:text-white hover:bg-black/5 dark:hover:bg-white/10'}`}
                                >
                                  {m}
                                </button>
                              ))}
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    </div>
                  )}
                </div>

                <div className="flex items-center gap-0.5 md:gap-1">
                  {!isMinimized && (
                    <>
                      <button onClick={() => setShowSettings(!showSettings)} className={`p-1.5 md:p-2 rounded-lg transition-colors ${showSettings ? 'bg-white/20' : 'hover:bg-white/10'}`} title="Persona Settings">
                        <Settings size={14} className="md:size-[16px]" />
                      </button>
                      <button onClick={() => setMessages([])} className="p-1.5 md:p-2 hover:bg-white/10 rounded-lg transition-colors" title="Reset">
                        <Trash2 size={14} className="md:size-[16px]" />
                      </button>
                    </>
                  )}
                  <button onClick={() => setIsMinimized(!isMinimized)} className="p-1.5 md:p-2 hover:bg-white/10 rounded-lg transition-colors">
                    {isMinimized ? <Maximize2 size={16} className="md:size-[18px]" /> : <MinusCircle size={16} className="md:size-[18px]" />}
                  </button>
                  <button onClick={() => setIsOpen(false)} className="p-1.5 md:p-2 hover:bg-white/10 rounded-lg transition-colors">
                    <X size={18} className="md:size-[20px]" />
                  </button>
                </div>
              </div>
            </div>

            {/* Content Area */}
            {!isMinimized && (
              <div className="flex-1 relative overflow-hidden flex flex-col">
                {/* Settings Overlay */}
                <AnimatePresence>
                  {showSettings && (
                    <motion.div 
                      initial={{ x: '100%' }}
                      animate={{ x: 0 }}
                      exit={{ x: '100%' }}
                      className="absolute inset-0 bg-white dark:bg-zinc-900 z-[90] p-6 flex flex-col space-y-6"
                    >
                      <div className="flex items-center justify-between">
                        <h4 className="font-bold text-lg">Konfigurasi AI</h4>
                        <button onClick={() => setShowSettings(false)} className="p-2 hover:bg-black/5 dark:hover:bg-white/5 rounded-xl">
                          <X size={20} />
                        </button>
                      </div>
                      <div className="flex-1 overflow-y-auto pr-2 pb-6 space-y-6">
                        <div>
                          <p className="text-[10px] font-bold uppercase tracking-widest opacity-40 mb-3">Persona Mentor</p>
                          <div className="grid grid-cols-1 gap-2">
                            {personas.map(p => (
                              <button
                                key={p.id}
                                onClick={() => { setSelectedPersona(p); setShowSettings(false); }}
                                className={`flex items-start gap-3 p-3 rounded-xl border transition-all ${selectedPersona.id === p.id ? 'border-black dark:border-white bg-black/5 dark:bg-white/5' : 'border-transparent bg-zinc-50 dark:bg-white/5 hover:border-black/10'}`}
                              >
                                <div className={`p-2 rounded-lg ${selectedPersona.id === p.id ? 'bg-black text-white dark:bg-white dark:text-black' : 'bg-black/5 dark:bg-white/10'}`}>
                                  <p.icon size={16} />
                                </div>
                                <div className="text-left">
                                  <p className="font-bold text-xs">{p.name}</p>
                                  <p className="text-[9px] opacity-40 leading-tight">{p.id === 'mentor' ? 'Gaya mengajar sabar' : p.id === 'expert' ? 'Fokus teknis & best practice' : p.id === 'socrates' ? 'Mendorong berpikir kritis' : 'Jawaban singkat & padat'}</p>
                                </div>
                              </button>
                            ))}
                          </div>
                        </div>

                        <div>
                          <p className="text-[10px] font-bold uppercase tracking-widest opacity-40 mb-3">Model Visualisasi (Dinamis)</p>
                          <div className="grid grid-cols-2 gap-2">
                            {imageModels.length > 0 ? imageModels.map(m => (
                              <button
                                key={m.name}
                                onClick={() => setSelectedImageModel(m.name)}
                                className={`p-2 h-16 rounded-xl border text-[8px] font-bold uppercase tracking-widest transition-all text-center flex flex-col items-center justify-center gap-1 ${selectedImageModel === m.name ? 'bg-black dark:bg-white text-white dark:text-black border-black dark:border-white' : 'bg-zinc-50 dark:bg-white/5 border-transparent hover:border-black/10'}`}
                              >
                                <span>{m.name}</span>
                                <span className="opacity-40 text-[6px] line-clamp-1 lowercase">{m.description}</span>
                              </button>
                            )) : (
                              <div className="col-span-2 py-4 text-center opacity-40 text-[10px] animate-pulse">Memuat model gambar...</div>
                            )}
                          </div>
                        </div>
                      </div>
                      <div className="pt-4 border-t border-black/5 dark:border-white/5">
                        <button 
                          onClick={exportChat}
                          className="w-full py-3 bg-zinc-100 dark:bg-white/5 rounded-xl text-xs font-bold uppercase tracking-widest flex items-center justify-center gap-2 hover:bg-zinc-200 dark:hover:bg-white/10"
                        >
                          <Download size={14} /> Ekspor Percakapan
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Messages Container */}
                <div className="flex-1 overflow-y-auto p-5 space-y-6 bg-zinc-50 dark:bg-zinc-950 scrollbar-hide">
                  {messages.length === 0 ? (
                    <div className="h-full flex flex-col items-center justify-center text-center space-y-6 px-4">
                      <div className="w-20 h-20 rounded-3xl bg-black/5 dark:bg-white/5 flex items-center justify-center text-black/10 dark:text-white/10">
                        <selectedPersona.icon size={40} />
                      </div>
                      <div className="space-y-1">
                        <h4 className="font-bold text-black dark:text-white">Halo! Saya Kelas Web AI</h4>
                        <p className="text-xs opacity-40">Mentor belajar Anda untuk materi Web Development.</p>
                      </div>
                      <div className="grid grid-cols-1 gap-2 w-full max-w-[280px]">
                        {suggestions.map(s => (
                          <button 
                            key={s} 
                            onClick={() => handleSend(s)}
                            className="p-3 rounded-xl bg-white dark:bg-white/5 border border-black/5 dark:border-white/5 text-[10px] font-bold uppercase tracking-widest hover:bg-black dark:hover:bg-white hover:text-white dark:hover:text-black transition-all shadow-sm flex items-center justify-center gap-2"
                          >
                            {s.includes('Visual') ? <ImageIcon size={12} /> : <Command size={12} />} {s}
                          </button>
                        ))}
                      </div>
                    </div>
                  ) : (
                    messages.map((msg, i) => (
                      <div key={i} className={`flex flex-col ${msg.role === 'user' ? 'items-end' : 'items-start'} space-y-1`}>
                        <div 
                          className={`max-w-[85%] px-4 py-2 rounded-2xl text-sm relative group ${
                            msg.role === 'user' 
                              ? 'bg-black dark:bg-zinc-800 text-white rounded-tr-none shadow-md w-fit ml-auto' 
                              : 'bg-white dark:bg-zinc-800 text-black dark:text-white rounded-tl-none border border-black/5 dark:border-white/5 shadow-sm'
                          }`}
                          style={msg.role === 'user' ? { color: 'white' } : {}}
                        >
                          <div className={msg.role === 'user' ? 'whitespace-pre-wrap' : `prose dark:prose-invert prose-sm max-w-none prose-img:rounded-xl prose-pre:p-0 prose-pre:bg-transparent prose-p:my-0`}>
                            {msg.role === 'user' ? msg.content : (
                              <ReactMarkdown 
                                rehypePlugins={[rehypeHighlight]}
                                components={{
                                  code({ inline, className, children, ...props }: { inline?: boolean; className?: string; children?: React.ReactNode }) {
                                    const match = /language-(\w+)/.exec(className || '');
                                    const codeString = String(children).replace(/\n$/, '');
                                    
                                    if (!inline && match) {
                                      return (
                                        <div className="relative group my-4">
                                          <div className="absolute right-3 top-3 z-10 flex gap-2">
                                            <button
                                              onClick={() => {
                                                navigator.clipboard.writeText(codeString);
                                                // Minimal feedback via alert or local state could be added here
                                              }}
                                              className="p-1.5 rounded-md bg-white/10 hover:bg-white/20 text-white/50 hover:text-white transition-all opacity-0 group-hover:opacity-100 flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-widest backdrop-blur-sm border border-white/10"
                                              title="Copy Code"
                                            >
                                              <Copy size={12} /> Copy
                                            </button>
                                          </div>
                                          <pre className="!m-0">
                                            <code className={className} {...props}>
                                              {children}
                                            </code>
                                          </pre>
                                        </div>
                                      );
                                    }
                                    return <code className={className} {...props}>{children}</code>;
                                  }
                                }}
                              >
                                {msg.content}
                              </ReactMarkdown>
                            )}
                          </div>
                          {msg.role === 'assistant' && (
                            <button 
                              onClick={() => {
                                navigator.clipboard.writeText(msg.content);
                                setCopiedIndex(i);
                                setTimeout(() => setCopiedIndex(null), 2000);
                              }}
                              className="absolute -right-10 top-0 p-2 opacity-0 group-hover:opacity-100 transition-opacity text-black/30 dark:text-white/30"
                            >
                              {copiedIndex === i ? <Check size={14} className="text-green-500" /> : <Copy size={14} />}
                            </button>
                          )}
                        </div>
                        <span className="text-[8px] font-bold uppercase opacity-30 px-2">
                          {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </span>
                      </div>
                    ))
                  )}
                  {isLoading && (
                    <div className="flex flex-col items-start gap-2">
                      <div className="bg-white dark:bg-zinc-800 p-4 rounded-2xl rounded-tl-none shadow-sm flex gap-1">
                        <motion.span animate={{ opacity: [0.3, 1, 0.3] }} transition={{ repeat: Infinity, duration: 1 }} className="w-1.5 h-1.5 rounded-full bg-black/20 dark:bg-white/20" />
                        <motion.span animate={{ opacity: [0.3, 1, 0.3] }} transition={{ repeat: Infinity, duration: 1, delay: 0.2 }} className="w-1.5 h-1.5 rounded-full bg-black/20 dark:bg-white/20" />
                        <motion.span animate={{ opacity: [0.3, 1, 0.3] }} transition={{ repeat: Infinity, duration: 1, delay: 0.4 }} className="w-1.5 h-1.5 rounded-full bg-black/20 dark:bg-white/20" />
                      </div>
                      <button onClick={() => { abortControllerRef.current?.abort(); setIsLoading(false); }} className="text-[9px] font-bold text-red-500 uppercase tracking-widest px-2 hover:underline">Stop Generating</button>
                    </div>
                  )}
                  <div ref={messagesEndRef} />
                </div>

                {/* Input Area */}
                <div className="p-4 bg-white dark:bg-zinc-900 border-t border-black/5 dark:border-white/10 shrink-0">
                  <div className="flex items-center gap-2 bg-zinc-100 dark:bg-white/5 rounded-2xl p-1 pr-2 focus-within:ring-2 ring-black/5 dark:ring-white/5 transition-all">
                    <button 
                      onClick={toggleListening}
                      className={`p-3 rounded-xl transition-colors ${isListening ? 'bg-red-500 text-white' : 'hover:bg-black/5 dark:hover:bg-white/5 text-black/40 dark:text-white/40'}`}
                    >
                      <Mic size={18} />
                    </button>
                    <textarea 
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' && !e.shiftKey) {
                          e.preventDefault();
                          handleSend();
                        }
                      }}
                      placeholder={isListening ? "Mendengarkan..." : "Tanya Kelas Web..."}
                      className="flex-1 bg-transparent border-none px-2 py-3 text-sm outline-none font-medium text-black dark:text-white resize-none h-12 py-3 scrollbar-hide"
                      rows={1}
                    />
                    <button 
                      onClick={() => handleSend()}
                      disabled={!input.trim() || isLoading}
                      className="w-10 h-10 bg-black dark:bg-white text-white dark:text-black rounded-xl flex items-center justify-center disabled:opacity-20 transition-all hover:scale-105 active:scale-95 shadow-md"
                    >
                      <Send size={18} />
                    </button>
                  </div>
                </div>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {(!isOpen || isMinimized) && (
          <motion.button
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => {
              if (isOpen && isMinimized) setIsMinimized(false);
              else setIsOpen(true);
            }}
            className="w-14 h-14 bg-black dark:bg-white text-white dark:text-black rounded-2xl shadow-2xl flex items-center justify-center group relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-tr from-blue-500 to-purple-500 opacity-0 group-hover:opacity-20 transition-opacity rounded-2xl" />
            <div className="relative">
              <selectedPersona.icon size={24} />
              {!isOpen && (
                <span className="absolute -top-3 -right-3 w-4 h-4 bg-blue-600 border-4 border-[#fafafa] dark:border-[#0d0d0d] rounded-full animate-bounce" />
              )}
            </div>
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AIAssistant;
