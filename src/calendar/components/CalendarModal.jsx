import { useState } from 'react';
import { addHours, differenceInSeconds } from 'date-fns';

import "react-datepicker/dist/react-datepicker.css";

import Modal from 'react-modal';
import DatePicker, { registerLocale } from "react-datepicker";
import es from 'date-fns/locale/es';


registerLocale('es', es)


const customStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
    },
  };

//Para super poner el modal sobre la App
Modal.setAppElement('#root');

export const CalendarModal = () => {
 
  // Accion del modal
  const [isOpen, setIsOpen] = useState(true);
  //Manejo de formulario tradicional
  const [formValues, setFormValues] = useState({
    title: 'Alejandro',
    notes: 'Creación de formulario',
    start: new Date(),
    end: addHours(new Date(),2),
  });

  //Permite realizar los cambios en el formulario
  const onInputChanged = ({ target }) => {
    setFormValues({
        ...formValues,
        [target.name]: target.value
    })
  }

  //Recibir el evento que seria la nueva fecha, segundo parametro para actualizar el start o el end 
  const onDateChanged = (event, changing) => {
    setFormValues({
        ...formValues,
        [changing]: event
    })
  }

  const onCloseModal = () => {
    console.log('Cerrando modal');
    setIsOpen(false);
  }  

  const onSubmit = (event) => {
    event.preventDefault();
    
    const difference = differenceInSeconds(formValues.end, formValues.start);
    if(isNaN(difference) || difference <= 0 ){
        console.log('Error en fechas');
        return;
    }
    if(formValues.title.length <= 0) {
        console.log('Debe ingresar una titulo o evento');
        return;
    };

    console.log(formValues);

    //TODO
    // Cerrar modal 
    // Remover errores en pantalla 
  }

  return (
    <Modal
        isOpen={isOpen}
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
                    onChange={ (event) => onDateChanged(event, 'start')}
                    className="form-control"
                    dateFormat="Pp"
                    timeCaption='Hora'
                    showTimeSelect
                    locale="es"
                />
            </div>

            <div className="form-group mb-2">
                <label>Fecha y hora fin</label>
                <DatePicker
                    minDate={formValues.start}
                    selected={formValues.end}
                    onChange={ (event) => onDateChanged(event, 'end')}
                    className="form-control"
                    dateFormat="Pp"
                    timeCaption='Hora'
                    showTimeSelect
                    locale="es"
                />
            </div>


            <div className="form-group mb-2">
                <label>Titulo y notas</label>
                <input 
                    type="text" 
                    className="form-control"
                    placeholder="Título del evento"
                    name="title"
                    autoComplete="off"
                    value= {formValues.title}
                    onChange={onInputChanged}
                />
                <small id="emailHelp" className="form-text text-muted">Una descripción corta</small>
            </div>

            <div className="form-group mb-3">
                <textarea 
                    type="text" 
                    className="form-control"
                    placeholder="Notas"
                    rows="5"
                    name="notes"
                    value={formValues.notes}
                    onChange={onInputChanged}
                ></textarea>
            </div>

            <button
                type="submit"
                className="btn btn-outline-primary btn-block"
            >
                <i className="far fa-save"></i>
                <span> Guardar</span>
            </button>

        </form>


    </Modal>
  )
}
