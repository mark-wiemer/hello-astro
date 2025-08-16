import { defineConfig } from "astro/config";
import { visit } from "unist-util-visit";

// Relative links work with `dev` but not with `build`
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
  markdown: {
    remarkPlugins: [rewriteLinks(base)],
  },
});
