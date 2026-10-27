// The OpenAPI renderer (redocusaurus) bundles prismjs. Loaded in the browser,
// prismjs re-highlights every <pre><code> in the document unless
// window.Prism.manual is set, and it does so before React hydrates the page:
// every page with a code block then fails hydration (React #418) and is
// re-rendered. The classic theme's loader leaves its own Prism instance on
// window, so mark that one manual before handing it over.

import includeLanguages from '@theme-init/prism-include-languages';

export default function prismIncludeLanguages(PrismObject) {
  PrismObject.manual = true;
  includeLanguages(PrismObject);
}
