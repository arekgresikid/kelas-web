import React, { useEffect, useRef } from 'react';
import mermaid from 'mermaid';

interface MermaidProps {
  chart: string;
}

mermaid.initialize({
  startOnLoad: true,
  theme: 'default',
  securityLevel: 'loose',
  fontFamily: 'inherit',
});

const Mermaid: React.FC<MermaidProps> = ({ chart }) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (ref.current) {
      ref.current.innerHTML = chart;
      mermaid.run({
        nodes: [ref.current],
      }).catch(err => console.error('Mermaid error:', err));
    }
  }, [chart]);

  return (
    <div 
      className="mermaid flex justify-center my-8 bg-white p-8 rounded-3xl border border-black/10 shadow-sm overflow-x-auto text-black" 
      ref={ref}
    />
  );
};

export default Mermaid;
