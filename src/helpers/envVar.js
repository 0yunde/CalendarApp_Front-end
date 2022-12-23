export const envVar = () => {
    //issue de import meta por parte de vite
    //import.meta.env;

    return {
        //...import.meta.env 
        //impportar manualmente
        VITE_API_URL: import.meta.env.VITE_API_URL,
    }
}