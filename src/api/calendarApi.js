import axios from 'axios' ;
import { envVar } from '../helpers'

const { VITE_API_URL} =  envVar()

const calendarApi = axios.create({
    baseURL: VITE_API_URL
})

//TODO : configurar interceptores (propio de axios)
//Permite interceptar una peticiónes que van hacia al back-end o regresan 
//antes o desppues que se haga, añadir o modificar la respuesta 
//o añadi o modificar informacion a la peticion 

calendarApi.interceptors.request.use(config => {

    config.headers = {
        ...config.headers, //para usar todos los token que vengan en la configuracion y mantenerlos
        'x-token': localStorage.getItem('token')
    }

    //si no hay token el usuario no esta autenticado

    return config;
})

export default calendarApi;