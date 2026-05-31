import type { MetadataRoute } from "next";
import { listDocs } from "@/lib/docs";
import { doerzProjects } from "@/lib/doerz";

const SITE_URL = "https://www.junaidkhattak.com";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [caseStudies, posts] = await Promise.all([listDocs("case-studies"), listDocs("blog")]);

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: SITE_URL, changeFrequency: "monthly", priority: 1 },
    { url: `${SITE_URL}/work`, changeFrequency: "monthly", priority: 0.9 },
    { url: `${SITE_URL}/blog`, changeFrequency: "weekly", priority: 0.8 },
    { url: `${SITE_URL}/videos`, changeFrequency: "weekly", priority: 0.7 },
  ];

  const caseStudyRoutes: MetadataRoute.Sitemap = caseStudies.map((d) => ({
    url: `${SITE_URL}/case-studies/${d.slug}`,
    lastModified: d.date ? new Date(d.date) : undefined,
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  const blogRoutes: MetadataRoute.Sitemap = posts.map((d) => ({
    url: `${SITE_URL}/blog/${d.slug}`,
    lastModified: d.date ? new Date(d.date) : undefined,
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  const workRoutes: MetadataRoute.Sitemap = doerzProjects.map((p) => ({
    url: `${SITE_URL}/work/${p.slug}`,
    changeFrequency: "yearly",
    priority: 0.5,
  }));

  return [...staticRoutes, ...caseStudyRoutes, ...blogRoutes, ...workRoutes];
}
