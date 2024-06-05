export function useAuth() {
    const token = ref(''); // Initialize with your token
  
    const setToken = (newToken) => {
      token.value = newToken;
    };
  
    return { token, setToken };
}