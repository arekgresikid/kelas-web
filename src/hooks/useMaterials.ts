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
      const match = content.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);
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

      const slug = path.split('/').pop()?.replace('.md', '') || '';

      return {
        id: slug,
        slug,
        content: body,
        frontmatter,
        subMateri,
        path
      };
    });

    // Group by modul
    const modulTitles: Record<number, string> = {
      1: 'DASAR INTERNET & WEBSITE',
      2: 'DOMAIN DAN DNS',
      3: 'ALAT DAN PLATFORM',
      4: 'DASAR FRONTEND',
      5: 'TECH STACK & JENIS WEB',
      6: 'PROSES RILIS WEBSITE',
      7: 'LANJUTAN (BONUS)',
      8: 'DASAR BACKEND & DATABASE',
      9: 'VIBE CODING DENGAN AI',
      10: 'OPTIMASI, SEO & KEAMANAN',
      11: 'MONETISASI & FREELANCING',
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
      .sort((a, b) => a.id - b.id);

    return { allMateri: parsedMateri, moduls };
  }, []);

  return materials;
};
