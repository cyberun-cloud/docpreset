# @cyberun/docusaurus-preset

Shared look and conventions for Cyberun documentation sites built with
Docusaurus 3: colours, fonts, navbar and footer layout, code highlighting,
local full-text search (Chinese and English), strict link checking and an
optional language switcher.

Each product keeps its own content, sidebars, plugins, translations and
release. Only this package is shared.

## Use in a project

```js
// docusaurus.config.js
const {withCyberun} = require('@cyberun/docusaurus-preset');

module.exports = withCyberun(
  {
    title: 'Project docs',
    url: 'https://example.cyberun.cloud',
    baseUrl: '/docs/',
  },
  {
    docs: {sidebarPath: require.resolve('./sidebars.js')},
    navbarItems: [{to: '/api', label: 'API', position: 'right'}],
  },
);
```

Install it with its peers (`@docusaurus/core`, `@docusaurus/preset-classic`,
`@easyops-cn/docusaurus-search-local`, `prism-react-renderer`, React).

## Brand, front page and code blocks

A site sets its accent and logo on top of the shared look:

```js
module.exports = withCyberun(
  {
    title: 'Product',
    favicon: 'img/favicon.svg',
    themeConfig: {
      navbar: {title: 'Product', logo: {alt: 'Product', src: 'img/logo.svg', srcDark: 'img/logo-dark.svg'}},
    },
    // ...
  },
  {customCss: [require.resolve('./src/css/product.css')]},
);
```

```css
/* src/css/product.css */
:root {
  --cy-blue: #0d8f80;            /* accent for cards, hero, active links */
  --cy-blue-dim: rgba(13, 143, 128, 0.08);
  --ifm-color-primary: #0d8f80;  /* and the six --ifm-color-primary-* shades */
}
[data-theme='dark'] { --cy-blue: #2fc3ae; --ifm-color-primary: #2fc3ae; }
```

The front page (an `.mdx` file) uses the shared hero and cards:

```mdx
import {Hero, Cards, Card} from '@theme/Cyberun';

<Hero eyebrow="Market data API" title="Product" actions={[{label: 'Quickstart', to: '/quickstart'}]}>
One sentence on what the product does.
</Hero>

<Cards>
  <Card to="/data" icon="database" title="Data">What this section covers.</Card>
</Cards>
```

Icons are named in `src/theme/Cyberun/index.js` (Lucide outlines).

The preset also keeps prismjs, which an OpenAPI page (redocusaurus) bundles,
from re-highlighting code blocks before React hydrates them; without it every
page with a code block reports React error #418 and re-renders. A site that
had copied that fix into its own `src/theme/prism-include-languages.js` can
delete it.

## Languages

By default the preset serves a single Traditional Chinese locale, which keeps
older sites unchanged. Pass `locales` to enable the navbar language switcher:

```js
module.exports = withCyberun(
  {
    title: 'Project docs',
    url: 'https://example.cyberun.cloud',
    baseUrl: '/docs/',
    i18n: {
      defaultLocale: 'en',
      locales: ['en', 'zh-Hant', 'zh-Hans'],
      localeConfigs: {
        en: {label: 'English', htmlLang: 'en'},
        'zh-Hant': {label: '繁體中文', htmlLang: 'zh-Hant'},
        'zh-Hans': {label: '简体中文', htmlLang: 'zh-Hans'},
      },
    },
  },
  {
    docs: {sidebarPath: require.resolve('./sidebars.js')},
    locales: {
      default: 'en',
      items: [
        {code: 'en', label: 'English'},
        {code: 'zh-Hant', label: '繁體中文'},
        {code: 'zh-Hans', label: '简体中文'},
      ],
    },
  },
);
```

When `locales` has more than one item, the preset adds
`{type: 'localeDropdown', position: 'right'}` after the project navbar items.
An explicit `site.i18n` always wins; the preset only supplies `i18n` when the
project does not.

## Versioning and distribution

Releases are git tags. A project depends on a tag through its tarball, so the
build does not need a registry, an npm token or `git`:

```json
"@cyberun/docusaurus-preset": "https://github.com/cyberun-cloud/docpreset/archive/refs/tags/v0.2.0.tar.gz"
```

Upgrade by changing the tag and regenerating the lockfile. There is no shared
release train: each product decides when to move.

## Development

```bash
npm install
npm test
```

The tests cover the configuration shape; visual changes are checked in the
consuming site's build.
