import axios from 'axios' ;
import { envVar } from '../helpers'

const { VITE_API_URL} =  envVar()

const calendarApi = axios.create({
    baseURL: VITE_API_URL
})

//TODO : configurar interceptores (propio de axios)
//Permite interceptar una petición antes o desppues que se haga, añadir o modificar la respuesta 
//o añadi o modificar informacion a la peticion 

export default calendarApi;