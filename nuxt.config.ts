// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { 
    enabled: true,
    vscode: {
      enabled: true
    }
  },
  modules: ["@nuxtjs/tailwindcss","nuxt-icon","@nuxtjs/apollo"],
  plugins: ['~/plugins/auth'],

  runtimeConfig: {
    public: {
      auth0: {
        domain: 'dev-huzqyd0je3vnz75v.us.auth0.com',
        clientId: 'kZFjHNOPyqIMtSHMzZnsSwnInY8d2xbd',
        redirect_uri: 'http://localhost:3000',
        audience: 'https://api.hasura.com'
      },
    },
  },
  
  apollo: {
    clients: {
      default: {
        httpEndpoint: 'http://localhost:8080/v1/graphql',
        tokenStorage: 'localStorage',
        tokenName: 'hasura-token'
      },
    },
  },
})
