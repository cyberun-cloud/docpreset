// Shared configuration for Cyberun documentation sites (Docusaurus 3).
//
// A project keeps its own content, sidebars and plugins and wraps its config:
//
//   const {withCyberun} = require('@cyberun/docusaurus-preset');
//   module.exports = withCyberun({title, url, baseUrl, ...}, {navbarItems, footerLinks});
//
// Everything visual (colors, fonts, navbar and footer layout, code theme,
// search, the front-page hero and cards in @theme/Cyberun) comes from here so
// every site looks the same.

const {themes} = require('prism-react-renderer');

/**
 * @param {import('@docusaurus/types').Config} site  project config; its own
 *   presets, themes and plugins are appended after the shared ones
 * @param {object} [options]
 * @param {object} [options.docs]          options for the classic docs plugin
 * @param {string[]} [options.customCss]   extra stylesheets after the shared one
 * @param {object[]} [options.navbarItems] project navbar items (right side)
 * @param {object[]} [options.footerLinks] project footer link columns
 * @param {object} [options.search]        overrides for the local search theme
 * @param {object} [options.locales]       {default, items: [{code, label}]};
 *   when given, sets i18n and adds the language switcher. Without it the
 *   previous behaviour (Traditional Chinese only) is kept.
 * @returns {import('@docusaurus/types').Config}
 */
function withCyberun(site, options = {}) {
  const {
    docs = {},
    customCss = [],
    navbarItems = [],
    footerLinks = [],
    search = {},
    locales,
  } = options;
  const docsRoute = docs.routeBasePath ?? '/';
  const {themeConfig = {}, presets = [], themes: siteThemes = [], ...rest} = site;
  const i18n =
    site.i18n ??
    (locales
      ? {defaultLocale: locales.default, locales: locales.items.map((item) => item.code)}
      : {defaultLocale: 'zh-Hant', locales: ['zh-Hant']});
  const localeItems =
    locales && locales.items.length > 1 ? [{type: 'localeDropdown', position: 'right'}] : [];
  return {
    onBrokenLinks: 'throw',
    onBrokenAnchors: 'throw',
    trailingSlash: false,
    i18n,
    ...rest,
    markdown: {format: 'detect', hooks: {onBrokenMarkdownLinks: 'throw'}, ...(rest.markdown || {})},
    presets: [
      [
        'classic',
        {
          docs: {routeBasePath: docsRoute, ...docs},
          blog: false,
          theme: {customCss: [require.resolve('./css/cyberun.css'), ...customCss]},
        },
      ],
      ...presets,
    ],
    themes: [
      require.resolve('./theme-plugin'),
      [
        require.resolve('@easyops-cn/docusaurus-search-local'),
        {
          hashed: true,
          language: ['en', 'zh'],
          indexBlog: false,
          docsRouteBasePath: docsRoute,
          highlightSearchTermsOnTargetPage: true,
          explicitSearchResultPath: true,
          ...search,
        },
      ],
      ...siteThemes,
    ],
    themeConfig: {
      colorMode: {defaultMode: 'light', respectPrefersColorScheme: true},
      docs: {sidebar: {hideable: true, autoCollapseCategories: false}},
      tableOfContents: {minHeadingLevel: 2, maxHeadingLevel: 3},
      prism: {
        theme: themes.github,
        darkTheme: themes.dracula,
        additionalLanguages: ['bash', 'json', 'python', 'yaml'],
      },
      ...themeConfig,
      navbar: {
        title: site.title,
        hideOnScroll: false,
        ...(themeConfig.navbar || {}),
        items: [...navbarItems, ...localeItems, ...((themeConfig.navbar && themeConfig.navbar.items) || [])],
      },
      footer: {
        style: 'dark',
        links: footerLinks,
        copyright: `© ${new Date().getFullYear()} Cyberun`,
        ...(themeConfig.footer || {}),
      },
    },
  };
}

module.exports = {withCyberun};
