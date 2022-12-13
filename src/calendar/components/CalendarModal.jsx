import { useEffect, useMemo, useState } from "react";
import { addHours, differenceInSeconds } from "date-fns";

import "react-datepicker/dist/react-datepicker.css";
import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";

import Modal from "react-modal";
import DatePicker, { registerLocale } from "react-datepicker";

import es from "date-fns/locale/es";
import { useCalendarStore, useUiStore } from "../../hooks";

registerLocale("es", es);

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};

//Para super poner el modal sobre la App
Modal.setAppElement("#root");

export const CalendarModal = () => {

  //Activar modal del evento y traer funcion de guardado de modal 
  const { activeEvent, startSavingEvent } = useCalendarStore();

  // Accion del modal para abrirlo al accionar en calendar
  const { isDateModalOpen, closeDateModal } = useUiStore();

  //Titulo manejo de validacion del formulario
  const [formSubmitted, setFormSubmitted] = useState(false);

  //Valores iniciales para la creacion de un nuevo evento
  const [formValues, setFormValues] = useState({
    title: "",
    notes: "",
    start: new Date(),
    end: addHours(new Date(), 2),
  });


  //Memoriza los valores 
  const titleClass = useMemo(() => {
    //Si el formulario no se dispara regresa un string vacio en la titulo
    if (!formSubmitted) return "";

    return formValues.title.length > 0 ? "is-valid" : "is-invalid";
  }, [formValues.title, formSubmitted]);

  //Para el manejo de dependencias
  //cargar la info del evento de calendar slice
  //Manejar que al momento que cargue la aplicacion no sea null
  useEffect(() => {
    if (activeEvent !== null) {
      setFormValues({ ...activeEvent });
    }
  }, [activeEvent]);

  //Permite realizar los cambios en el formulario
  const onInputChanged = ({ target }) => {
    setFormValues({
      ...formValues,
      [target.name]: target.value,
    });
  };

  //Recibir el evento que seria la nueva fecha, segundo parametro para actualizar el start o el end
  //Usar operador spread, para romper la referencia para crear una nueva instancia del objeto trabajado
  const onDateChanged = (event, changing) => {
    setFormValues({
      ...formValues,
      [changing]: event,
    });
  };

  //Me permite cerrar el modal
  const onCloseModal = () => {
    closeDateModal({ ...activeEvent });
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    //formulario intento posteo de formulario
    setFormSubmitted(true);

    const difference = differenceInSeconds(formValues.end, formValues.start);
    if (isNaN(difference) || difference <= 0) {
      Swal.fire("Fechas incorrectas", "Revisar fechas ingresadas", "error");
      return;
    }
    if (formValues.title.length <= 0) {
      Swal.fire("Debe ingresar un titulo del evento", "", "error");
      return;
    }

    console.log(formValues);

    //TODO
    await startSavingEvent(formValues);
    closeDateModal();
    setFormSubmitted(false);
    // Cerrar modal
    // Remover errores en pantalla
    // Una vez grabado regresa a su estado normal para limpiar falta de campos en modal
  };

  return (
    <Modal
      isOpen={isDateModalOpen}
      onRequestClose={onCloseModal}
      style={customStyles}
      className="modal"
      overlayClassName="modal-fondo"
      closeTimeoutMS={200}
    >
      <h1> Nuevo evento </h1>
      <hr />
      <form className="container" onSubmit={onSubmit}>
        <div className="form-group mb-2">
          <label>Fecha y hora inicio</label>
          <DatePicker
            selected={formValues.start}
            onChange={(event) => onDateChanged(event, "start")}
            className="form-control"
            dateFormat="Pp"
            timeCaption="Hora"
            showTimeSelect
            locale="es"
          />
        </div>

        <div className="form-group mb-2">
          <label>Fecha y hora fin</label>
          <DatePicker
            minDate={formValues.start}
            selected={formValues.end}
            onChange={(event) => onDateChanged(event, "end")}
            className="form-control"
            dateFormat="Pp"
            timeCaption="Hora"
            showTimeSelect
            locale="es"
          />
        </div>

        <div className="form-group mb-2">
          <label>Titulo del evento</label>
          <input
            type="text"
            className={`form-control ${titleClass}`}
            placeholder="Título"
            name="title"
            autoComplete="off"
            value={formValues.title}
            onChange={onInputChanged}
          />
        </div>

        <div className="form-group mb-3">
          <label>Descripción del evento</label>
          <textarea
            type="text"
            className="form-control"
            placeholder="Descripción"
            rows="5"
            name="notes"
            value={formValues.notes}
            onChange={onInputChanged}
          ></textarea>
        </div>

        <button type="submit" className="btn btn-outline-primary btn-block">
          <i className="far fa-save"></i>
          <span> Guardar</span>
        </button>
      </form>
    </Modal>
  );
};
