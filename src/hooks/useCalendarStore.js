/* 
* Es el encargado de cualquier interaccion que se realize con el store 
* se realizara a travez de este custom Hook
* para a si tener centralizada toda la logica
* los demas componentes solo llamaran las funciones o las propiedades que este custom Hook exporta
*/

import { useDispatch, useSelector } from "react-redux"
import { onAnNewEvent, onSetActiveEvent, onUpdateEvent, onDeleteEvent } from "../store/calendar/calendarSlice";



/**
 * 
 * @returns Primero lo que ara sera tomar los eventos 
 * Se crea funcionalidad para generar disparador (dispatch) de la accion para 
 * abstraer la info respecto al evento seleccionado realizado en calendarSlice
 * setActiveEvent va ha hacer el primer evento que se expondra en el use calendar store.
 * se llama al evento con el payload que se espera la accion y se encarga 
 * de realizar el dispatch respectivo que es con el calendar Event
 * 
 * en ves de usar Thunks , por lo cual simplemente se disparara acciones sincronas, para el no uso del thunk asincrono 
 * pero de cierto modo simular un tipo de thunk asincrono, entonces se mentaliza que se iniciara el proceso de grabación 
 * 
 * Se utiliza el operador spread para asegurar que se esta enviado un nuevo objeto 
 * 
 * Se ocupara la funcion para mandar a hacer el despacho de esa accion 
 */
export const useCalendarStore = () => {
    
    const dispatch = useDispatch();

    const { events, activeEvent} = useSelector(state => state.calendar)
    
    const setActiveEvent = ( calendarEvent ) => {
      dispatch(onSetActiveEvent( calendarEvent ))
    }

    const startSavingEvent = async(calendarEvent) => {
        //TODO: llegar eventualmente al back end para que este regrese la informacion

        //Todo bien
        if ( calendarEvent._id ) {
          //Actualizando 
          dispatch(onUpdateEvent( {...calendarEvent })) ;

        } else {
          //Creando se activa dispatch, en teoria el back end me dara el nuevo evento con el nuevo id
          //lo cual se incertara en el parametro por que el id ya estara por detras 
          dispatch(onAnNewEvent({ ...calendarEvent, _id: new Date().getTime()}))
        }
    }

    const startDeletingEvent = () => {

      //Todo: Llegar al backend
      dispatch(onDeleteEvent())
    }


    return {
        //*Propiedades
        activeEvent,
        events,
        hasEventSelected: !!activeEvent, //si es null este regresara falso , si tiene objeto regresara true

        //*Metodos
        startDeletingEvent,
        setActiveEvent,
        startSavingEvent,

  }
}
