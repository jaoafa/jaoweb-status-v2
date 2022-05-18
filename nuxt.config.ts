import { resolve } from 'path'
import { NuxtConfig } from '@nuxt/types'

const baseName = 'jao Minecraft Server Status'
const baseDescription = 'jao Minecraft Server のステータス情報ページ'
const baseUrl = 'https://status.jaoafa.com'

const config: NuxtConfig = {
  ssr: true,
  srcDir: 'src/',

  head: {
    titleTemplate: baseName,
    title: baseName,
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { name: 'apple-mobile-web-app-title', content: baseName },
      { name: 'application-name', content: baseName },
      { name: 'msapplication-TileColor', content: '#ffb41d' },
      { name: 'msapplication-config', content: '/favicons/browserconfig.xml' },
      { name: 'theme-color', content: '#ffb41d' },
      { hid: 'description', name: 'description', content: baseDescription },
      { hid: 'og:site_name', property: 'og:site_name', content: baseName },
      { hid: 'og:type', property: 'og:type', content: 'website' },
      { hid: 'og:url', property: 'og:url', content: baseUrl },
      { hid: 'og:title', property: 'og:title', content: baseName },
      {
        hid: 'og:description',
        property: 'og:description',
        content: baseDescription,
      },
      {
        hid: 'twitter:card',
        name: 'twitter:card',
        content: 'summary_large_image',
      },
      { hid: 'twitter:site', name: 'twitter:site', content: '@jaoafa' },
    ],
    link: [
      {
        rel: 'apple-touch-icon',
        sizes: '180x180',
        href: '/favicons/apple-touch-icon.png',
      },
      {
        rel: 'icon',
        type: 'image/png',
        sizes: '32x32',
        href: '/favicons/favicon-32x32.png',
      },
      {
        rel: 'icon',
        type: 'image/png',
        sizes: '16x16',
        href: '/favicons/favicon-16x16.png',
      },
      { rel: 'manifest', href: '/favicons/site.webmanifest' },
      {
        rel: 'mask-icon',
        href: '/favicons/safari-pinned-tab.svg',
        color: '#ffb41d',
      },
      {
        rel: 'shortcut icon',
        type: 'image/x-icon',
        href: '/favicons/favicon.ico',
      },
      {
        rel: 'stylesheet',
        href: 'https://cdnjs.cloudflare.com/ajax/libs/MaterialDesign-Webfont/5.7.55/css/materialdesignicons.min.css',
      },
      {
        rel: 'stylesheet',
        href: 'https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@400;700&display=swap',
      },
      { rel: 'stylesheet', href: 'https://use.typekit.net/ibc0rnp.css' },
    ],
  },

  css: [],

  plugins: [],

  components: true,

  buildModules: [
    '@nuxt/typescript-build',
    '@nuxtjs/stylelint-module',
    '@nuxtjs/vuetify',
  ],

  modules: ['@nuxtjs/axios', '@nuxtjs/pwa'],

  axios: {
    baseURL: '/',
  },

  pwa: {
    manifest: {
      lang: 'ja',
    },
  },

  vuetify: {
    customVariables: ['~/assets/variables.scss'],
    theme: {
      dark: false,
    },
  },

  serverMiddleware: ['~/api'],

  build: {
    extend(config) {
      config.node = {
        child_process: 'empty',
        fs: 'empty',
        tls: 'empty',
      }
    },
  },

  server: {
    host: '0.0.0.0',
  },

  alias: {
    '~/*': resolve(__dirname, 'src/*'),
  },

  telemetry: false,
}

module.exports = config
