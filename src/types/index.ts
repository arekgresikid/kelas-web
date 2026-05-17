export interface FrontMatter {
  title: string;
  modul: number;
  order: number;
  description?: string;
  type?: string;
  isBonus?: boolean;
}

export interface SubMateri {
  id: string;
  title: string;
}

export interface Materi {
  id: string;
  slug: string;
  content: string;
  frontmatter: FrontMatter;
  subMateri: SubMateri[];
  path: string;
}

export interface Modul {
  id: number;
  title: string;
  materi: Materi[];
}
