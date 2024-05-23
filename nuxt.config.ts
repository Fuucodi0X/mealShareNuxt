// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: ["@nuxtjs/tailwindcss"],

  tailwindcss:{
    config: {
      theme:{
        
      },
      plugins:[require('@tailwindcss/forms')],
    }
  }
})