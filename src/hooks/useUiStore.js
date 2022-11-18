import { useDispatch, useSelector } from "react-redux"
import { onOpenDateModal, onCloseDateModal } from "../store/ui/uiSlice";

export const useUiStore = () => {

    const dispatch = useDispatch();

    //Acceso a state
    const {isDateModalOpen
    } = useSelector(state => state.ui);

    //Funcion que permite abrir modal
    const openDateModal = () => {
        dispatch(onOpenDateModal())
    }

    const closeDateModal = () => {
        dispatch(onCloseDateModal())
    }

    return {
        //*Propiedades 
        isDateModalOpen,

        //*Metodos
        openDateModal,
        closeDateModal
    }
}