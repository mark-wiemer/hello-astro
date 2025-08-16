import { defineConfig } from "astro/config";
import { visit } from "unist-util-visit";
import mdx from "@astrojs/mdx";

// Relative links work locally but not in production
const rewriteLinks = (base) => {
  return (tree) => {
    visit(tree, "link", (node) => {
      if (node.url.startsWith("./") || node.url.startsWith("../")) {
        // Remove leading ./ or ../ and prepend base
        node.url = base + "/" + node.url.replace(/^(\.\/|\.\.\/)+/, "");
      }
    });
  };
};

const base = "/next";

// https://astro.build/config
export default defineConfig({
  base,
  integrations: [mdx()],
  markdown: {
    remarkPlugins: [rewriteLinks(base)],
  },
});
