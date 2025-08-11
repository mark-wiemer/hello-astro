import { defineConfig } from "astro/config";
import starlight from "@astrojs/starlight";
import { visit } from "unist-util-visit";

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
  integrations: [
    starlight({
      title: "My Docs",
      social: [
        {
          icon: "github",
          label: "GitHub",
          href: "https://github.com/withastro/starlight",
        },
      ],
      sidebar: [
        {
          label: "Guides",
          items: [
            // Each item here is one entry in the navigation menu.
            { label: "Example Guide", slug: "guides/example" },
          ],
        },
        {
          label: "Reference",
          autogenerate: { directory: "reference" },
        },
      ],
    }),
  ],
  markdown: {
    remarkPlugins: [rewriteLinks(base)],
  },
});
