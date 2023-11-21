import React, { useState } from 'react';
import axios from "axios";
import Swal from 'sweetalert2';
import headerImg from "../assets/img/raft.png";

const url = "http://localhost:4000/user/";

export function Login() {
  const [form, setForm] = useState({
    pName: '',
    pPass: '',
  });

  const handleChange = (e) => {
    e.persist();
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const Login = async () => {

    await axios.post(url + "login", form).then((response) => {
      console.log(response);
      if (response.data[0].mensaje === 'Credenciales incorrectas.') {
        Swal.fire({
          title: 'Error con las credenciales',
          text: 'Revise sus credenciales',
          icon: 'error',

        });
      } else {
        if (response.data[0].type === 'admin') {
          Swal.fire({
            title: 'Inicio de sesión exitoso',
            text: 'Tipo de usuario correcto',
            icon: 'success',

          }).then((result) => {
            if (result.isConfirmed) {

              sessionStorage.setItem(
                'user',
                JSON.stringify([response.data[0].id])
              );
              window.location.href = '/clients ';
            }
          });
        } else {
          if (response.data[0].type === 'agency') {
            Swal.fire({
              title: 'Inicio de sesión exitoso',
              text: 'Tipo de usuario correcto',
              icon: 'success',

            }).then((result) => {
              if (result.isConfirmed) {
                sessionStorage.setItem(
                  'user',
                  JSON.stringify([response.data[0].id])
                );
                window.location.href = '/';
              }
            });
          } else {
            Swal.fire({
              title: 'Error con las credenciales',
              text: 'No tiene el permiso para entrar a esta pagina',
              icon: 'error',
              confirmButtonText: `ok`,
            });
          }
        }
      }
    })
      .catch((error) => {
        console.log(error);
      });

  }

  return (
    <>
      <section className="Form-login my-4 mx-5">
        {/*Card */}
        <div className="container-login Centro">
          <div className="row Fixrow g-0">
            {/*Imagen del login */}
            <div className="img-login col-lg-5">
              <img
                src={headerImg}
                className="App-logo"
                alt=""
              />
            </div>

            {/*Card hijo*/}
            <div className="col-lg-7 px-5 pt-5">
              <h1 className="font-weight-bold text-center minifix">
                Login
              </h1>

              <form>
                <br />
                <input className="custom-input" placeholder='Nombre de usuario' type="text" name="pName" id="pName" onChange={handleChange} value={form ? form.pName : ''} />
                <br />
                <br />
                <input className="custom-input" placeholder='Contraseña' type="password" name="pPass" id="pPass" onChange={handleChange} value={form ? form.pPass : ''} />
                <br />

                {/*Boton de login*/}
                <div className="form-row fix">
                  <div className="col-lg-7">
                    <button
                      type="button"
                      className="buttons"
                      onClick={() => Login()}
                    >
                      Login
                    </button>
                  </div>
                </div>

                {/*Referencias*/}
                <p className="fix">
                  ¿No tienes cuenta?<a href="/register">Registrate</a>
                </p>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  )



}

export default Login;