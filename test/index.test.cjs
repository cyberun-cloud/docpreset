const {test} = require('node:test');
const assert = require('node:assert/strict');
const {withCyberun} = require('../src/index.js');

const site = {title: 'Docs', url: 'https://example.test', baseUrl: '/'};

test('without locales keeps the previous default', () => {
  const config = withCyberun(site, {});
  assert.deepEqual(config.i18n, {defaultLocale: 'zh-Hant', locales: ['zh-Hant']});
  assert.equal(config.themeConfig.navbar.items.some((i) => i.type === 'localeDropdown'), false);
});

test('locales sets i18n and adds the switcher once', () => {
  const config = withCyberun(site, {
    locales: {
      default: 'en',
      items: [
        {code: 'en', label: 'English'},
        {code: 'zh-Hant', label: '繁體中文'},
      ],
    },
    navbarItems: [{to: '/api', label: 'OpenAPI', position: 'right'}],
  });
  assert.deepEqual(config.i18n, {defaultLocale: 'en', locales: ['en', 'zh-Hant']});
  assert.deepEqual(config.themeConfig.navbar.items.map((i) => i.type ?? i.to), [
    '/api',
    'localeDropdown',
  ]);
});

test('an explicit site i18n wins', () => {
  const config = withCyberun(
    {...site, i18n: {defaultLocale: 'ja', locales: ['ja']}},
    {
      locales: {
        default: 'en',
        items: [
          {code: 'en', label: 'English'},
          {code: 'zh-Hant', label: '繁體中文'},
        ],
      },
    },
  );
  assert.deepEqual(config.i18n, {defaultLocale: 'ja', locales: ['ja']});
  assert.equal(config.themeConfig.navbar.items.some((i) => i.type === 'localeDropdown'), true);
});

test('the shared theme components come with every site', () => {
  const config = withCyberun(site, {});
  assert.equal(config.themes[0], require.resolve('../src/theme-plugin.js'));
  const plugin = require('../src/theme-plugin.js')();
  assert.equal(require('node:fs').existsSync(require('node:path').join(plugin.getThemePath(), 'Cyberun', 'index.js')), true);
});
