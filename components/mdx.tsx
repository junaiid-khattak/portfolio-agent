import { compileMDX } from "next-mdx-remote/rsc";
import rehypePrettyCode from "rehype-pretty-code";
import Link from "next/link";

// Local stand-in for mdx/types' MDXComponents (avoids needing @types/mdx).
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type MDXComponents = Record<string, React.ComponentType<any>>;

/**
 * Rehype plugin: convert ```mermaid fenced code blocks into
 * <pre class="mermaid">…raw source…</pre> BEFORE rehype-pretty-code runs,
 * so Shiki never touches them and the source survives as plain HTML text.
 * MermaidRunner then renders them in the browser.
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function rehypeMermaid() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const visit = (node: any) => {
    if (!node || !Array.isArray(node.children)) return;
    for (const child of node.children) {
      if (
        child.type === "element" &&
        child.tagName === "pre" &&
        child.children?.length === 1 &&
        child.children[0]?.tagName === "code"
      ) {
        const code = child.children[0];
        const cls: string[] = code.properties?.className ?? [];
        if (cls.includes("language-mermaid")) {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          const text = (code.children ?? [])
            .filter((n: any) => n.type === "text")
            .map((n: any) => n.value)
            .join("");
          child.properties = { className: ["mermaid"] };
          child.children = [{ type: "text", value: text }];
          continue;
        }
      }
      visit(child);
    }
  };
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return (tree: any) => visit(tree);
}

function Callout({ children, label }: { children: React.ReactNode; label?: string }) {
  return (
    <div className="my-6 rounded-2xl border border-violet/30 bg-violet/10 p-5">
      {label && <p className="mb-1 font-mono text-[11px] uppercase tracking-wider text-violet-bright">{label}</p>}
      <div className="text-text-muted [&>p]:m-0">{children}</div>
    </div>
  );
}

export const mdxComponents: MDXComponents = {
  h1: (p) => <h1 className="mt-2 font-display text-3xl font-bold tracking-tight sm:text-4xl" {...p} />,
  h2: (p) => <h2 className="mt-12 mb-3 font-display text-2xl font-bold tracking-tight" {...p} />,
  h3: (p) => <h3 className="mt-8 mb-2 font-display text-lg font-semibold" {...p} />,
  p: (p) => <p className="my-4 leading-relaxed text-text-muted" {...p} />,
  ul: (p) => <ul className="my-4 list-disc space-y-1.5 pl-5 text-text-muted marker:text-violet-bright" {...p} />,
  ol: (p) => <ol className="my-4 list-decimal space-y-1.5 pl-5 text-text-muted marker:text-text-dim" {...p} />,
  li: (p) => <li className="leading-relaxed" {...p} />,
  a: ({ href = "#", ...rest }) => (
    <Link href={href} className="text-cyan-bright underline-offset-4 hover:underline" {...rest} />
  ),
  blockquote: (p) => <blockquote className="my-6 border-l-2 border-violet pl-5 text-text" {...p} />,
  hr: () => <hr className="my-10 border-0 hairline" />,
  strong: (p) => <strong className="font-semibold text-text" {...p} />,
  img: ({ src = "", alt = "" }) => (
    // eslint-disable-next-line @next/next/no-img-element
    <img src={src as string} alt={alt} className="my-6 w-full rounded-2xl border border-line" />
  ),
  table: (p) => (
    <div className="my-6 overflow-x-auto rounded-2xl border border-line">
      <table className="w-full text-left text-sm" {...p} />
    </div>
  ),
  th: (p) => <th className="bg-elevated/60 px-4 py-2 font-mono text-[11px] uppercase tracking-wider text-text-dim" {...p} />,
  td: (p) => <td className="border-t border-line/70 px-4 py-2 text-text-muted" {...p} />,
  Callout,
};

export async function MDXContent({ source }: { source: string }) {
  const { content } = await compileMDX({
    source,
    components: mdxComponents,
    options: {
      parseFrontmatter: true,
      mdxOptions: {
        rehypePlugins: [rehypeMermaid, [rehypePrettyCode, { theme: "github-dark", keepBackground: false }]],
      },
    },
  });
  return content;
}
