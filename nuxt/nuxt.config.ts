// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  components: true,
  devtools: { enabled: true },
  routeRules: {
      '/laravel/**': { proxy: 'https://laravel-seven-indol.vercel.app/**' },
  },
  modules: [
      '@pinia/nuxt',
      '@pinia-plugin-persistedstate/nuxt',
      '@nuxt/test-utils/module'
  ],
  css: [
      '~/assets/css/main.css',
      '~/assets/css/fonts.css',
      '~/assets/css/base.css'
  ],
  app:{
    head: {
      link: [
          { rel:"stylesheet", type:"text/css",
            href:'https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css'
          }
      ]
    }
  },
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
})
