import { addHours } from "date-fns";
import { useUiStore, useCalendarStore } from "../../hooks";

/**
 * 
 * @returns Este boton realizara como disparador de ciertas acciones  
 * Abrir modal principalmente y a la vez se requiere activar una nota para que la persona 
 * pueda ver una nota activa, para ello se utilizaran los hooks personalizados creados 
 * Traer nota vacia y asegurar de limpiarla al seleccionar el boton agregar para no traer una nota anterior
 * se trae al set activeEvent para modo desmosttrativo en caso de ver uno selecccionado o bien crear una nueva 
 * como se indica en la funcion 
 */

export const FabDelete = () => {

  const { startDeletingEvent, hasEventSelected } = useCalendarStore();

  const handleClickDelte = () => {
    startDeletingEvent();
  }
  
    return (
    <button
        className="btn btn-danger fab-danger"
        onClick={handleClickDelte}
        style={{
          display: hasEventSelected ? '': 'none'
        }}
    >
        <i className="fas fa-trash-alt"></i>
    </button>
  )
}
