import { useDispatch, useSelector } from "react-redux"
import { calendarApi } from "../api"
import { onChecking, onLogin, onLogOut, clearErrorMessage, onLogOutCalendar } from "../store"

//Tiene como objetico realizarr cualquier interacion ccon la parte del auth en nuestro Store
export const useAuthStore = () => {

    const { status, user, errorMessage } = useSelector(state => state.auth)
    const dispatch = useDispatch()

    //Ingresar
    const startLogin = async({ email, password }) => {
        console.log(email, password);
        dispatch(onChecking())
        try {
            const { data }  = await calendarApi.post('/auth',{email, password});
            localStorage.setItem('token' , data.token) ;
            //Representacion de en un entero de la fecha actual para ahorar al llegar
            //a la peticion al back para saber si el token es permitido
            localStorage.setItem('token-init-date' , new Date().getTime()); 
            dispatch(onLogin( {name: data.name, id: data.id}));
        } catch (error) {
            dispatch(onLogOut('Credenciales incorrectas' ));
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
            console.log(error);
            dispatch(onLogOut(error.response.data?.msg || Object.values(error.response.data.errors)[0].msg ));
            setTimeout(() => {
                dispatch(clearErrorMessage());
            }, 10);
        }
    }

    //Funcion qque chekea token que se usara en appRouter para mostrar rutas publicas o privadaas
    const checkAuthToken = async() => {
        const token = localStorage.getItem('token');
        if (!token) return dispatch(onLogOut() );            
        

        try {
            const { data } = await calendarApi.post('auth/renew');
            //si se tiene un nuevo token se establecera en el localStorage
            localStorage.setItem('token' , data.token) ;
            localStorage.setItem('token-init-date' , new Date().getTime()); //almacenar nueva fecha de validacion een caso de validacion con la fecha
            dispatch(onLogin( {name: data.name, id: data.id}));  // se toma la name y el id 
        } catch (error) {
            localStorage.clear();//limpiar localStorage ya que el token almacenado no funciona
            dispatch(onLogOut()); //Cerrar
        }
    }

    const startLogOut = () => {
        localStorage.clear();
        dispatch(onLogOutCalendar());
        dispatch(onLogOut());
    }



    return {
        //* Propiedades que se expondran al mundo exterior
        status, 
        user, 
        errorMessage, 

        //* Metodos acciones que las personas van a poder llamar (otros desarrolladores) para interactuar con el store. 
        checkAuthToken,
        startLogin,
        startLogOut,
        startRegister,
    }
}


