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
