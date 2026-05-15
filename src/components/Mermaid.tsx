import React, { useEffect, useRef } from 'react';
import mermaid from 'mermaid';

interface MermaidProps {
  chart: string;
}

mermaid.initialize({
  startOnLoad: true,
  theme: 'base',
  themeVariables: {
    primaryColor: '#000000',
    primaryTextColor: '#ffffff',
    primaryBorderColor: '#ffffff',
    lineColor: '#ffffff',
    secondaryColor: '#ffffff',
    tertiaryColor: '#ffffff',
    mainBkg: '#000000',
    nodeBorder: '#ffffff',
    clusterBkg: '#000000',
    clusterBorder: '#ffffff',
    defaultLinkColor: '#ffffff',
    titleColor: '#ffffff',
    edgeLabelBackground: '#000000',
    nodeTextColor: '#ffffff',
  },
  securityLevel: 'loose',
  fontFamily: 'inherit',
});

const Mermaid: React.FC<MermaidProps> = ({ chart }) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (ref.current) {
      mermaid.contentLoaded();
      // Reset the element and re-render
      ref.current.removeAttribute('data-processed');
      mermaid.render('mermaid-svg-' + Math.random().toString(36).substr(2, 9), chart).then((result) => {
        if (ref.current) {
          ref.current.innerHTML = result.svg;
        }
      });
    }
  }, [chart]);

  return (
    <div className="mermaid flex justify-center my-8 bg-black/5 dark:bg-white/5 p-8 rounded-3xl border border-black/5 dark:border-white/5" ref={ref}>
      {chart}
    </div>
  );
};

export default Mermaid;
