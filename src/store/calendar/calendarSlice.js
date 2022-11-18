import { createSlice } from '@reduxjs/toolkit';
import { addHours } from 'date-fns';


const tempEvent = {
    _id  : new Date().getTime(),
    title:'Cumple del jano',
    notes: 'Hay que comprar copete',
    start: new Date(),
    end  : addHours(new Date(), 2 ),
    bgColor: '#fafafa',
    user: {
        _id: '123',
        name: 'Victor'}
}


/* 
*
* Como quiero que lusca el estado respecto al tempEvent en mi calendarSlice 
* Los eventos seran los obejetos que creemos
* Realizar puntero para cuando se seleccione la nota este traiga la info deseada
*
* onAddNewEvent permitira este reduce, crear mi nuevo evento en el calendarSlice
* lo cual sera incertada a mis eventos, se utilizara un parametro de redux toolkit que es un push para el
* evento nuevo a crear, una ves insertado el evento, y se cierrre el modal, este limpiara la nota activa
* lo cual su acccion sera luego de ello esperar un nuevo evento o el siguente evento
*
* Se realiza reduce de evento para actualizar evento activo, entonces se mapea el evento con el fin de crear un nuevo arreglo
* basado en el valor de retorno, osea lo que sea que regrese el mapeo sera el nuevo valor del state.events
*
* Se realiza el reduce de eliminar un evento
*
*/


export const calendarSlice = createSlice({
    name: 'calendar',
    initialState: {
        events: [tempEvent]
        ,
        activeEvent: null
    },
    reducers: {
        onSetActiveEvent: (state, { payload }) => {
            state.activeEvent = payload;
        },
        onAnNewEvent: (state, {payload }) => {
            state.events.push(payload);
            state.activeEvent = null ;
        },
        onUpdateEvent: (state, {payload}) => {
            state.events = state.events.map( event => {
                if (event._id === payload._id) {
                    //Este seria el nuevo evento
                    return payload ;
                }
                return event;
            })
        },
        onDeleteEvent: ( state ) => {
            //Si no existen notas activas no deberia hacer el delete 
            if (state.activeEvent) {
                //Es decir , voy a regresar todos los eventos cuyo id sea diferente al de la nota activa
                //entonces fisicamente se eliminara del arreglo
                state.events = state.events.filter( event => event._id !== state.activeEvent._id);
                //Para no tener ninguna nota activa en los cambios 
                state.activeEvent = null ;
            }
        }
    }
});


// Action creators are generated for each case reducer function
export const { onSetActiveEvent, onAnNewEvent, onUpdateEvent, onDeleteEvent } =  calendarSlice.actions;