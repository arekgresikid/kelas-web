import { useMemo } from 'react';
import jsYaml from 'js-yaml';
import type { Materi, Modul, FrontMatter, SubMateri } from '../types';

export const useMaterials = () => {
  const materials = useMemo(() => {
    // Dynamically import all markdown files from src/materi
    // Using import: 'default' to get the string content directly when query: '?raw' is used
    const rawFiles = import.meta.glob('/src/materi/**/*.md', { 
      query: '?raw', 
      eager: true,
      import: 'default'
    }) as Record<string, string>;
    
    const parsedMateri: Materi[] = Object.entries(rawFiles).map(([path, content]) => {
      // Simple frontmatter parser
      const match = content.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n([\s\S]*)$/);
      let frontmatter: FrontMatter = { title: 'Untitled', modul: 0, order: 0 };
      let body = content;

      if (match) {
        try {
          frontmatter = jsYaml.load(match[1]) as FrontMatter;
          body = match[2];
        } catch (e) {
          console.error(`Error parsing frontmatter in ${path}`, e);
        }
      }

      // Extract sub-materials (h2 headings)
      const subMateri: SubMateri[] = [];
      const h2Regex = /^## (.*)$/gm;
      let h2Match;
      while ((h2Match = h2Regex.exec(body)) !== null) {
        const title = h2Match[1].trim();
        const id = title.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]/g, '');
        subMateri.push({ id, title });
      }

      const filename = path.split('/').pop()?.replace('.md', '') || '';
      const slug = filename.replace(/^\d+(\.\d+)?-/, '');

      return {
        id: slug,
        slug,
        content: body,
        frontmatter,
        subMateri,
        path
      };
    });

    // Group by modul. The display order follows a professional web-learning path:
    // internet fundamentals -> product planning -> tools -> frontend -> backend -> AI -> release -> growth/career.
    const modulTitles: Record<number, string> = {
      // PHASE 1: FOUNDATIONS
      1: 'FONDASI: DASAR INTERNET',
      2: 'FONDASI: DOMAIN, DNS & HTTP',
      13: 'PRODUK: UI/UX, WIREFRAME & FULLSTACK',
      3: 'FONDASI: ALAT & WORKSPACE',
      
      // PHASE 2: FRONTEND DEVELOPMENT
      4: 'FRONTEND: HTML, CSS & JS',
      5: 'FRONTEND: MODERN TECH STACK',
      7: 'FRONTEND: ADVANCED PRACTICES',
      
      // PHASE 3: BACKEND & DATA
      8: 'BACKEND: DATABASE, API & LOGIKA',
      
      // PHASE 4: MODERN DEV (AI)
      9: 'MODERN: VIBE CODING DENGAN AI',
      
      // PHASE 5: DEPLOYMENT & PRODUCTION
      6: 'RILIS: PROSES DEPLOY WEBSITE',
      12: 'RILIS: DARI KODING KE ONLINE',
      10: 'RILIS: SEO, ANALITIK & KEAMANAN',
      
      // PHASE 6: QUALITY, OPERATIONS & TRUST
      14: 'PRODUKSI: QA & LAUNCH READINESS',
      15: 'OPERASIONAL: OBSERVABILITY & MAINTENANCE',
      16: 'TRUST: LEGAL, PRIVACY & ETIKA DATA',

      // PHASE 7: CAREER
      11: 'KARIR: MONETISASI & FREELANCE',
    };

    const modulLearningOrder = [1, 2, 13, 3, 4, 5, 7, 8, 9, 6, 12, 10, 14, 15, 16, 11];
    const getModulSortIndex = (id: number) => {
      const index = modulLearningOrder.indexOf(id);
      return index === -1 ? modulLearningOrder.length + id : index;
    };

    const grouped: Record<number, Materi[]> = {};
    parsedMateri.forEach(m => {
      const modulId = m.frontmatter.modul;
      if (!grouped[modulId]) grouped[modulId] = [];
      grouped[modulId].push(m);
    });

    const moduls: Modul[] = Object.entries(grouped)
      .map(([id, items]) => ({
        id: parseInt(id),
        title: modulTitles[parseInt(id)] || `Modul ${id}`,
        materi: items.sort((a, b) => a.frontmatter.order - b.frontmatter.order)
      }))
      .sort((a, b) => getModulSortIndex(a.id) - getModulSortIndex(b.id));

    return { allMateri: parsedMateri, moduls };
  }, []);

  return materials;
};
