import "server-only";
import fs from "node:fs/promises";
import path from "node:path";
import matter from "gray-matter";

const ROOT = path.join(process.cwd(), "content");

export type ContentType = "blog" | "case-studies";
export type DocMeta = {
  slug: string;
  title: string;
  summary?: string;
  date?: string;
  canonical?: string;
  tags?: string[];
  order?: number;
  product?: string;
  metrics?: string[];
  cover?: string;
};

export async function listDocs(type: ContentType): Promise<DocMeta[]> {
  const dir = path.join(ROOT, type);
  let files: string[] = [];
  try {
    files = await fs.readdir(dir);
  } catch {
    return [];
  }
  const docs = await Promise.all(
    files
      .filter((f) => f.endsWith(".mdx"))
      .map(async (f) => {
        const raw = await fs.readFile(path.join(dir, f), "utf8");
        const { data } = matter(raw);
        return { slug: f.replace(/\.mdx$/, ""), ...(data as Omit<DocMeta, "slug">) };
      }),
  );
  return docs.sort(
    (a, b) =>
      (b.date ? +new Date(b.date) : 0) - (a.date ? +new Date(a.date) : 0) ||
      (a.order ?? 0) - (b.order ?? 0),
  );
}

export async function getDocSource(type: ContentType, slug: string): Promise<string | null> {
  try {
    return await fs.readFile(path.join(ROOT, type, `${slug}.mdx`), "utf8");
  } catch {
    return null;
  }
}
