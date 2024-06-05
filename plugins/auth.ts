import { createAuth0 } from '@auth0/auth0-vue'

export default defineNuxtPlugin((nuxtApp) => {
  const auth0 = createAuth0({
    domain: 'dev-huzqyd0je3vnz75v.us.auth0.com',
    clientId: 'kZFjHNOPyqIMtSHMzZnsSwnInY8d2xbd',
    authorizationParams: {
      redirect_uri: 'http://localhost:3000'
    },
    cacheLocation: 'localstorage'
  })

  if (process.client) {
    nuxtApp.vueApp.use(auth0)
  }

  addRouteMiddleware('auth', () => {
    if (process.client) {
      auth0.checkSession()
      if (!auth0.isAuthenticated.value) {
        auth0.loginWithRedirect({
          appState: {
            target: useRoute().path,
          },
        })
      }
    }
  })
})