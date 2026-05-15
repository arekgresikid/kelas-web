import React, { useState, useEffect } from 'react';
import { Play, RotateCcw, Copy, Check } from 'lucide-react';

interface CodePlaygroundProps {
  initialHtml?: string;
  initialCss?: string;
}

const CodePlayground: React.FC<CodePlaygroundProps> = ({ 
  initialHtml = '<div class="card">\n  <h1>Hello World</h1>\n  <p>Coba edit teks ini!</p>\n</div>',
  initialCss = '.card {\n  padding: 20px;\n  border: 2px solid black;\n  border-radius: 12px;\n  background: #f0f0f0;\n  text-align: center;\n}\nh1 {\n  color: #333;\n}'
}) => {
  const [html, setHtml] = useState(initialHtml);
  const [css, setCss] = useState(initialCss);
  const [srcDoc, setSrcDoc] = useState('');
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setSrcDoc(`
        <html>
          <style>${css}</style>
          <body>${html}</body>
        </html>
      `);
    }, 500);

    return () => clearTimeout(timeout);
  }, [html, css]);

  const handleCopy = () => {
    navigator.clipboard.writeText(`${html}\n\n<style>\n${css}\n</style>`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleReset = () => {
    setHtml(initialHtml);
    setCss(initialCss);
  };

  return (
    <div className="my-10 border border-black dark:border-white rounded-2xl overflow-hidden shadow-2xl">
      <div className="bg-black text-white px-6 py-3 flex items-center justify-between border-b border-white/10">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-red-500" />
          <div className="w-3 h-3 rounded-full bg-yellow-500" />
          <div className="w-3 h-3 rounded-full bg-green-500" />
          <span className="ml-2 text-xs font-bold uppercase tracking-widest opacity-50">Interactive Playground</span>
        </div>
        <div className="flex items-center gap-3">
          <button onClick={handleReset} className="p-1.5 hover:bg-white/10 rounded-lg transition-colors" title="Reset">
            <RotateCcw size={16} />
          </button>
          <button onClick={handleCopy} className="p-1.5 hover:bg-white/10 rounded-lg transition-colors" title="Copy Code">
            {copied ? <Check size={16} className="text-green-400" /> : <Copy size={16} />}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 h-[400px]">
        <div className="flex flex-col border-b lg:border-b-0 lg:border-r border-black/10 dark:border-white/10">
          <div className="flex-1 flex flex-col p-4 space-y-4 overflow-hidden">
            <div className="flex-1 flex flex-col">
              <span className="text-[10px] font-bold uppercase opacity-40 mb-2">HTML</span>
              <textarea
                value={html}
                onChange={(e) => setHtml(e.target.value)}
                className="flex-1 bg-black/5 dark:bg-white/5 p-3 rounded-xl font-mono text-sm outline-none focus:ring-1 ring-black dark:ring-white resize-none"
              />
            </div>
            <div className="flex-1 flex flex-col">
              <span className="text-[10px] font-bold uppercase opacity-40 mb-2">CSS</span>
              <textarea
                value={css}
                onChange={(e) => setCss(e.target.value)}
                className="flex-1 bg-black/5 dark:bg-white/5 p-3 rounded-xl font-mono text-sm outline-none focus:ring-1 ring-black dark:ring-white resize-none"
              />
            </div>
          </div>
        </div>

        <div className="bg-white flex flex-col">
          <div className="flex-1 relative">
            <iframe
              srcDoc={srcDoc}
              title="output"
              sandbox="allow-scripts"
              className="w-full h-full border-none"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CodePlayground;
