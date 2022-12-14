import { createSlice } from '@reduxjs/toolkit';

export const authSlice = createSlice({
    name: 'auth',
    initialState: {
        status: 'checking', // 'authenticated' , 'not-authenticated'  , para saber si la persona esta autenticada o no
        user: {} , //usuario como objeto vacio para tener acceso a el
        errorMessage: undefined, 
    
    },
    reducers: {
        onChecking: (state) => {
            state.status = 'checking';
            state.user = {};
            state.errorMessage = undefined ;
        },
        onLogin: (state, {payload} ) => {
            state.status = 'authenticated';
            state.user = payload ;
            state.errorMessage = undefined;
        },
        onLogOut: (state, {payload}) => {
            state.status = 'not-authenticated';
            state.user = {} ;
            state.errorMessage = payload;
        },
        clearErrorMessage: (state) => {
            state.errorMessage = undefined;
        }
    }
});


// Action creators are generated for each case reducer function
export const { onChecking, onLogin, onLogOut, clearErrorMessage } =  authSlice.actions;