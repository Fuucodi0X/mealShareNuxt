// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: ["@nuxtjs/tailwindcss","nuxt-icon"],


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
  }
})