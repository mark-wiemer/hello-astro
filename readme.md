# Astro issue 14211: unist-util-visit: Cannot use 'in' operator to search for 'children' in undefined

https://github.com/withastro/astro/issues/14211

Bash `fnm use && npm i && npm run dev`, then open the page. It should load "Hello world" without refreshing.

Currently, it loads a TypeError, but on refresh, it works.
