// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: ["@nuxtjs/tailwindcss","nuxt-icon","@nuxtjs/apollo"],
  plugins: ['~/plugins/auth'],

  runtimeConfig: {
    public: {
      domain: 'dev-huzqyd0je3vnz75v.us.auth0.com',
      clientId: 'kZFjHNOPyqIMtSHMzZnsSwnInY8d2xbd',
    }
  },
  
  apollo: {
    clients: {
      default: {
        httpEndpoint: 'http://localhost:8080/v1/graphql'
      }
    },
  },
})