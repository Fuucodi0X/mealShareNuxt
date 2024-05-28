// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: ["@nuxtjs/tailwindcss","nuxt-icon","@nuxtjs/apollo"],


  imports: {
    presets: [
      {
        from: 'class-variance-authority',
        imports: ['cva']
      },
      {
        from: 'tailwind-merge',
        imports: ['twMerge']
      }
    ]
  },

  apollo: {
    clients: {
      default: {
        httpEndpoint: 'http://localhost:8080/v1/graphql'
      }
    },
  },
})