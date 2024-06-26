import { useAuth0 } from "@auth0/auth0-vue";
import { jwtDecode } from "jwt-decode";

export async function getHasuraToken () {
    const auth0 = process.client ? useAuth0() : undefined;
    if(process.client){
        if(auth0?.isAuthenticated.value){
            const token = await auth0.getAccessTokenSilently()
            localStorage.setItem("hasura-token",token)
            return token
        }
        if(!auth0?.isAuthenticated.value){
            return ""
        }
    }
}

export function tokenHasExpired () {
    if(process.client) {
      const token = localStorage.getItem('hasura-token')
  
      if(token == null) return true;
      const decodedToken = jwtDecode(token);
      const currentTime = Math.floor(Date.now() / 1000);
      
      return decodedToken.exp < currentTime;
    } 
  }
  