import vuetify, { transformAssetUrls } from 'vite-plugin-vuetify'

// https://nuxt.com/docs/api/configuration/nuxt-config

export default defineNuxtConfig({
  css: ['~/assets/styles/main.scss'],
  devtools: { enabled: true },
  // routeRules: {
  //   '/miniapp/**': {
  //     ssr: false,
  //   }
  // },
  build: {
    transpile: ['vuetify'],
  },
  runtimeConfig: {
    ycAccessKeyId: process.env.YC_KEY_ID,
    ycSecretAccessKKey: process.env.YC_SECRET,
    public: {
      apiBase: process.env.NUXT_PUBLIC_API_BASE,
      siteUrl: process.env.NUXT_PUBLIC_SITE_URL,
    },
  },
  modules: [
    (_options, nuxt) => {
      nuxt.hooks.hook('vite:extendConfig', (config) => {
        // @ts-expect-error
        config.plugins.push(vuetify({ autoImport: true }))
      })
    },
    ['@nuxtjs/google-fonts', {
      families: {
        Montserrat: [100, 200, 300, 400, 500, 600, 700, 800, 900]
      }
    }],
    "@pinia/nuxt",
  ],
  vite: {
    vue: {
      template: {
        transformAssetUrls,
      },
    },
  },
  postcss: {
    plugins: {
      autoprefixer: {},
    },
  },
  devServer: {
    port: 3065,
  },
  app: {
    pageTransition: { name: 'page', mode: 'out-in' },
    head: {
      script: [{
        src: 'https://telegram.org/js/telegram-web-app.js?56',
        tagPosition: 'head',
        type: "text/javascript",
        // async: true,
      }]
    }
  }
})
