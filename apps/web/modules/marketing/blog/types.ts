import type { ParsedContent } from "@nuxt/content";

export type MarketingBlogPageFields = ParsedContent & {
  description?: string;
  draft?: boolean;
  image?: {
    src?: string;
  };
  date?: string;
  authorName?: string;
  authorImage?: string;
  tags?: string[];
};
