// Docusaurus plugin that ships the shared theme components (src/theme):
// @theme/Cyberun (hero, link cards, icons) and the code-highlighting fix in
// @theme/prism-include-languages. withCyberun adds it to every site.

const path = require('path');

module.exports = function cyberunTheme() {
  return {
    name: 'cyberun-docs-theme',
    getThemePath() {
      return path.resolve(__dirname, 'theme');
    },
  };
};
