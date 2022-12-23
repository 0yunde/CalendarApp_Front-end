/*
 * Es el encargado de cualquier interaccion que se realize con el store
 * se realizara a travez de este custom Hook
 * para a si tener centralizada toda la logica
 * los demas componentes solo llamaran las funciones o las propiedades que este custom Hook exporta
 */

import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import { calendarApi } from "../api";
import { convertToDateEvents } from "../helpers";
import {
  onAnNewEvent,
  onSetActiveEvent,
  onUpdateEvent,
  onDeleteEvent,
  onLoadEvents,
} from "../store/calendar/calendarSlice";

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

  const { events, activeEvent } = useSelector((state) => state.calendar);
  const { user } = useSelector((state) => state.auth);


  const setActiveEvent = (calendarEvent) => {
    dispatch(onSetActiveEvent(calendarEvent));
  };

  const startSavingEvent = async (calendarEvent) => {


    try {

      if (calendarEvent.id) {
        //Actualizando
        await calendarApi.put(`/events/${ calendarEvent.id }` , calendarEvent)
        dispatch(onUpdateEvent({ ...calendarEvent, user }));
        return; 
      } 
        //Creando: se activa dispatch, en teoria el back end me dara el nuevo evento con el nuevo id
        //lo cual se incertara en el parametro por que el id ya estara por detras
        const { data } = await calendarApi.post('/events', calendarEvent); //body
        dispatch(onAnNewEvent({ ...calendarEvent, id: data.event.id, user }));//prepara el evento que se quiere almacenar en el store

    } catch (error) {
      console.log(error);
      Swal.fire('Error al guardar', error.response.data.msg , 'error');
    }

    //TODO: llegar eventualmente al back end para que este regrese la informacion : back end todo update event 
    //Todo bien
  
    
  };

  const startDeletingEvent = async() => {

    try {
      //Todo: Llegar al backend
      await calendarApi.delete(`/events/${ activeEvent.id }`)
      dispatch(onDeleteEvent());
    } catch (error) {
      console.log(error);
      Swal.fire('Error al eliminar', error.response.data.msg , 'error');
      
    }
  };

  const startLoadingEvents = async() => {

    try {
      const { data } = await calendarApi.get('/events');
      const events = convertToDateEvents(data.event)
      dispatch(onLoadEvents(events));
    } catch (error) {
      console.log('Cargando eventos');
      console.log(error);
      
    }

  }
  return {
    //*Propiedades
    activeEvent,
    events,
    hasEventSelected: !!activeEvent, //si es null este regresara falso , si tiene objeto regresara true

    //*Metodos
    startDeletingEvent,
    setActiveEvent,
    startLoadingEvents,
    startSavingEvent,
  };
};
