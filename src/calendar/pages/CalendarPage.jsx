import { useState, useEffect } from "react";
import { Calendar } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import "./CalendarPage.css";



import {
  Navbar,
  CalendarEventBox,
  CalendarModal,
  FabAddNew,
  FabDelete,
} from "../";

import { localizer, getMessagesES } from "../../helpers";
import { useUiStore, useCalendarStore, useAuthStore } from "../../hooks";

export const CalendarPage = () => {

  const { user } = useAuthStore();
  const { openDateModal } = useUiStore();

  //Cuando se quiera crear un evento o actualizarlo
  //Se crearan funciones dentro del custom hook para realizar los disparadores de las acciones respectivas
  const { events, setActiveEvent, startLoadingEvents } = useCalendarStore();

  //Si no se tiene el valor se dejara en la semana
  const [lasView, setLasView] = useState(
    localStorage.getItem('lastView') || 'week'
  );

  const eventStyleGetter = (event, start, end, isSelected) => {
    // console.log({event, start, end, isSelected});
    const isMyEvent = (user.id === event.user._id) || (user.id === event.user.id) 

    const style = {
      backgroundColor: isMyEvent ? "#FF5733": "#465660",
      borderRadius: "0px",
      opacity: 0.8,
      color: "white",
    };

    return {
      style,
    };
  };

  //Para activar modal
  const onDoubleClick = (event) => {
    openDateModal();
  };

  //Respecto a lo seleccionado se abstrae la info de este
  const onSelect = (event) => {
    // console.log({onSelect: event});
    setActiveEvent(event);
  };

  //Cuando la vista cambia almacenarla en LocalStorage
  //Permite establecerlo a la hora que se recargue el navegador
  const onViewChanged = (event) => {
    localStorage.setItem("lastView", event);
    setLasView(event);
  };

  useEffect(() => {
    startLoadingEvents()
  }, [])
  

  return (
    <>
      <Navbar />
      <Calendar
        culture="es"
        localizer={localizer}
        events={events}
        defaultView={lasView}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 'calc(80vh - 80px)' }} //{{ height: 'calc(80vh - 80px)' }}
        messages={getMessagesES()}
        eventPropGetter={eventStyleGetter}
        components={{
          event: CalendarEventBox,
        }}
        onDoubleClickEvent={onDoubleClick} //captura del evento clickeado
        onSelectEvent={onSelect}
        onView={onViewChanged}
      />

      <CalendarModal />
      <FabAddNew />
      <FabDelete />
    </>
  );
};
