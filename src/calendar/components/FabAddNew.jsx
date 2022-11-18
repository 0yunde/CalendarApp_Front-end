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

export const FabAddNew = () => {
  const { openDateModal } = useUiStore();
  const { setActiveEvent } = useCalendarStore();

  const handleClickNew = () => {
    setActiveEvent({
      title: "",
      notes: "",
      start: new Date(),
      end: addHours(new Date(), 2),
      bgColor: "#fafafa",
      user: {
        _id: "123",
        name: "Victor",
      },
    });

    openDateModal();
  };

  return (
    <button className="btn btn-primary fab" onClick={handleClickNew}>
      <i className="fas fa-plus"></i>
    </button>
  );
};
