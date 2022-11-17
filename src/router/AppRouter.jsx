import { Routes, Route, Navigate } from "react-router-dom"
import { LoginPage } from "../auth";
import { CalendarPage } from "../calendar";

/*
* Proteccion de rutas.
* Fail Safe route : en caso de que se requiera solicitar cualquier otra ruta no existente llevar a pantalla de login 
*@param {Routes} Manejo de las rutas de la aplicacion, en caso de estar autenticado o no estarlo
*/
export const AppRouter = () => {

    const authStatus = 'authenticated' //'authenticated' ;;

  return (
    <Routes>
        { 
            (authStatus === 'not-authenticated')
             ? <Route path= "/auth/*" element= {<LoginPage/>} />
             : <Route path= "/*" element= {<CalendarPage/>} />
        }

        <Route path= "/*" element={ <Navigate to="/auth/login"/> } />
    </Routes>
    )
}
