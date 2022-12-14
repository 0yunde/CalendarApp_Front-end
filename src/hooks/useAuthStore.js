import { useDispatch, useSelector } from "react-redux"
import { calendarApi } from "../api"
import { onChecking, onLogin, onLogOut, clearErrorMessage } from "../store"

//Tiene como objetico realizarr cualquier interacion ccon la parte del auth en nuestro Store
export const useAuthStore = () => {

    const { status, user, errorMessage } = useSelector(state => state.auth)
    const dispatch = useDispatch()

    //Ingresar

    const startLogin = async({email, password}) => {
        dispatch(onChecking())
        try {
        
            const { data }  = await calendarApi.post('/auth', {email, password} );
            localStorage.setItem('token' , data.token) ;
            //Representacion de en un entero de la fecha actual para ahorar al llegar
            //a la peticion al back para saber si el token es permitido
            localStorage.setItem('token-init-date' , new Date().getTime()); 
            dispatch(onLogin( {name: data.name, id: data.id}))


            
        } catch (error) {
            dispatch(onLogOut('Credenciales incorrectas'));

            setTimeout(() => {
                dispatch(clearErrorMessage());
            }, 10);
        }
    }

    //Registrarse

    const startRegister = async({name, email, password}) => {
        dispatch(onChecking())
        try {
        
            const { data }  = await calendarApi.post('/auth/register', {name, email, password} );
            localStorage.setItem('token' , data.token) ;
            //Representacion de en un entero de la fecha actual para ahorar al llegar
            //a la peticion al back para saber si el token es permitido
            localStorage.setItem('token-init-date' , new Date().getTime()); 
            dispatch(onLogin( {name: data.name, id: data.id}))


            
        } catch (error) {
            dispatch(onLogOut(error.response.data?.msg || 'Error por personalizar'));

            setTimeout(() => {
                dispatch(clearErrorMessage());
            }, 10);
        }
    }


    return {
        //* Propiedades que se expondran al mundo exterior
        status, 
        user, 
        errorMessage, 

        //* Metodos acciones que las personas van a poder llamar (otros desarrolladores) para interactuar con el store. 
        startLogin,
        startRegister
    }
}


