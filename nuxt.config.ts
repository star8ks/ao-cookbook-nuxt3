// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  extends: ['@nuxt/ui-pro'],
  modules: [
    '@nuxt/content',
    'nuxt-gtag',
    '@nuxt/ui',
    '@nuxtjs/mdc',
    '@nuxtjs/i18n',
    '@nuxthq/studio',
    '@nuxtjs/fontaine',
    '@nuxtjs/google-fonts',
    'nuxt-og-image',
    '@vue-macros/nuxt',
    '@nuxt/image'
  ],
  hooks: {
    // Define `@nuxt/ui` components as global to use them in `.md` (feel free to add those you need)
    'components:extend': (components) => {
      const globals = components.filter((c) => ['UButton', 'UIcon'].includes(c.pascalName))

      globals.forEach((c) => c.global = true)
    }
  },
  ui: {
    icons: ['heroicons', 'simple-icons']
  },
  content: {
    sources: {
      content: {
        prefix: '/en',
        driver: 'fs',
        base: 'content/en',
      },
      zh: {
        prefix: '/zh',
        driver: 'fs',
        base: 'content/zh',
      },
    }
  },
  i18n: {
    strategy: 'prefix',
    locales: [
      {
        code: 'en',
        name: 'English'
      },
      {
        code: 'zh',
        name: '中文'
      },
    ],
    defaultLocale: 'en',
    vueI18n: './i18n.config.ts' // if you are using custom path, default
  },
  // Fonts
  fontMetrics: {
    fonts: ['DM Sans']
  },
  googleFonts: {
    display: 'swap',
    download: true,
    families: {
      'DM+Sans': [400, 500, 600, 700]
    }
  },
  vue: {
    propsDestructure: true
  },
  routeRules: {
    '/api/search.json': { prerender: true },
  },
  devtools: {
    enabled: true
  },
  mdc: {
    highlight: {
      langs: ['lua'],
    }
  },
  typescript: {
    strict: false
  }
})