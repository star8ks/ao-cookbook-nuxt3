export default defineAppConfig({
  ui: {
    primary: 'green',
    gray: 'zinc',
    footer: {
      bottom: {
        left: 'text-sm text-gray-500 dark:text-gray-400',
        wrapper: 'border-t border-gray-200 dark:border-gray-800'
      }
    }
  },
  seo: {
    siteName: 'AO Cookbook',
  },
  header: {
    logo: {
      alt: 'AO',
      light: '/ao_pictograph_lightmode.svg',
      dark: '/ao_pictograph_darkmode.svg'
    },
    search: true,
    colorMode: false,
    links: []
  },
  footer: {
    credits: 'Copyright © 2024',
    colorMode: true,
    links: [{
      icon: 'i-simple-icons-discord',
      to: 'https://discord.gg/zAN7PTHkAX',
      target: '_blank',
      'aria-label': 'AO on Discord'
    }, {
      icon: 'i-simple-icons-x',
      to: 'https://twitter.com/aoTheComputer',
      target: '_blank',
      'aria-label': 'AO on X'
    }, {
      icon: 'i-simple-icons-github',
      to: 'https://github.com/Web3HackerWorld/ao-cookbook-nuxt3',
      target: '_blank',
      'aria-label': 'ao cookbook on GitHub'
    }]
  },
  toc: {
    title: 'Table of Contents',
  }
})
