import { useAuth0 } from "@auth0/auth0-vue";

export async function getHasuraToken () {
    const auth0 = process.client ? useAuth0() : undefined;
    if(process.client){
        if(auth0?.isAuthenticated.value){
            return await auth0.getAccessTokenSilently()
        }
        if(!auth0?.isAuthenticated.value){
            return ""
        }
    }
}