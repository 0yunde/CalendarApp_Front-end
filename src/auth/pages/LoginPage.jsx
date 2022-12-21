import  { useEffect } from "react";
import Swal from "sweetalert2";
import { useAuthStore ,useForm } from "../../hooks";
import "./LoginPage.css";

const loginFormFields = {
  loginEmail: '',
  loginPassword: '',
}

const registerFormFields = {
  registerName: '',
  registerEmail: '',
  registerPassword: '',
  registerPassword2: '',
}





export const LoginPage = () => {

  const { startLogin, errorMessage, startRegister } = useAuthStore();

  const {loginEmail, loginPassword, onInputChange:onLoginInputChange, } = useForm( loginFormFields );
  const { registerName, registerEmail, registerPassword, registerPassword2, onInputChange:onRegisterInputChange} = useForm( registerFormFields );



  const loginSubmit = ( event ) => {
    event.preventDefault();
    startLogin({ email:loginEmail , password:loginPassword });
  }

  const registerSubmit = ( event ) => {
    event.preventDefault() ;
    if (registerPassword !== registerPassword2 ) {
      Swal.fire('Error en el registro' , 'Las contraseñas no coinciden', errorMessage, 'error');
      return; 
    }

    startRegister({name:registerName, email:registerEmail, password:registerPassword});

  };

  useEffect(() => {
    if (errorMessage !== undefined) {
      Swal.fire('Error', errorMessage, 'error')
    }
  }, [errorMessage]);
  
  //Diseño de ingreso y registro
  const switchers = [...document.querySelectorAll('.switcher')];
  switchers.forEach(item => {
    item.addEventListener('click', function() {
      switchers.forEach(item => item.parentElement.classList.remove('is-active'));
      this.parentElement.classList.add('is-active');
    }) ;
  });
 
  return (
    <section class="forms-section">
      <h1 class="section-title">Aplicación Evec</h1>
      <div class="forms">
        <div class="form-wrapper is-active">
          <button type="button" class="switcher switcher-login">
            Ingresar
            <span class="underline"></span>
          </button>
          <form class="form form-login" onSubmit={loginSubmit}>
            <fieldset>
              <legend>Por favor, introduzca su correo electrónico y contraseña para iniciar sesión.</legend>
              <div class="input-block">
                <label for="login-email">Email</label>
                <input 
                id="login-email" 
                type="email" 
                className="form-control"
                placeholder=""
                name= "loginEmail"
                value={ loginEmail }
                onChange= { onLoginInputChange }  
                required
                />
              </div>
              <div class="input-block">
                <label for="login-password">Contraseña</label>
                <input 
                id="login-password" 
                type="password"
                className="form-control"
                placeholder=""
                name= "loginPassword"
                value={ loginPassword }
                onChange= { onLoginInputChange }   
                required
                />
              </div>
            </fieldset>
            <button type="submit" class="btn-login">Ingresar</button>
          </form>
        </div>
        <div class="form-wrapper">
          <button type="button" class="switcher switcher-signup">
            Registrarse
            <span class="underline"></span>
          </button>
          <form class="form form-signup" onSubmit={registerSubmit}>
            <fieldset>
              <legend>Por favor, introduzca su nombre, correo electrónico, contraseña y confirmación de contraseña para registrarse.</legend>
              <div class="input-block">
                <label for="name">Nombre</label>
                <input 
                id="name" 
                type="text"
                className="form-control"
                placeholder=""
                name= "registerName"
                value={ registerName }
                onChange= { onRegisterInputChange }   
                required
                />
              </div>
              <div class="input-block">
                <label for="signup-email">E-mail</label>
                <input 
                id="signup-email" 
                type="email" 
                className="form-control"
                placeholder=""
                name= "registerEmail"
                value={ registerEmail }
                onChange= { onRegisterInputChange }  
                required
                />
              </div>
              <div class="input-block">
                <label for="signup-password">Contraseña</label>
                <input 
                id="signup-password" 
                type="password" 
                className="form-control"
                placeholder=""
                name= "registerPassword"
                value={ registerPassword }
                onChange= { onRegisterInputChange }  
                required
                />
              </div>
              <div class="input-block">
                <label for="signup-password-confirm">Confirmar contraseña</label>
                <input 
                id="signup-password-confirm" 
                type="password"
                className="form-control"
                placeholder=""
                name= "registerPassword2"
                value={ registerPassword2 }
                onChange= { onRegisterInputChange }   
                required
                />
              </div>
            </fieldset>
            <button type="submit" class="btn-signup">Registrar</button>
          </form>
        </div>
      </div>
    </section>
  );
};
