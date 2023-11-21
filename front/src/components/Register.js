import React, { useState } from 'react';
import axios from "axios";
import Swal from 'sweetalert2';


const url = "http://localhost:4000/user/";

export function Register() {
  const [form, setForm] = useState({

    pId: '',
    pName: '',
    pDir: '',
    pEmail: '',
    pTel: '',
    pUser: '',
    pPass: ''
  });

  const peticionPost = async () => {
    const isAnyFieldEmpty = Object.values(form).some(value => value === '');
    if (isAnyFieldEmpty) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Por favor, complete todos los campos antes de registrar la agencia.'
      });
      return;
    }

    try {
      await axios.post(url + "register", form);
      console.log(form);
      Swal.fire({
        icon: 'success',
        title: 'Registro exitoso',
        text: 'La agencia se ha registrado correctamente.'
      });
      setForm({
        pId: '',
        pName: '',
        pDir: '',
        pEmail: '',
        pTel: '',
        pUser: '',
        pPass: ''
      });
    } catch (error) {
      console.log(error.message);
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Algo salió mal. No se pudo registrar la agencia.'
      });
    }
  };

  const handleChange = (e) => {
    e.persist();
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  return (
    <>

      <section className='form-register' >

        <h4>Registro de Agencia</h4>
        <br />
        <input className="custom-input" placeholder='Id Juridico' type="text" name="pId" id="pId" onChange={handleChange} value={form ? form.pId : ''} />
        <br />
        <input className="custom-input" placeholder='Nombre Agencia' type="text" name="pName" id="pName" onChange={handleChange} value={form ? form.pName : ''} />
        <br />
        <input className="custom-input" placeholder='Direccion' type="text" name="pDir" id="pDir" onChange={handleChange} value={form ? form.pDir : ''} />
        <br />
        <input className="custom-input" placeholder='Email' type="text" name="pEmail" id="pEmail" onChange={handleChange} value={form ? form.pEmail : ''} />
        <br />
        <input className="custom-input" placeholder='Telefono' type="text" name="pTel" id="pTel" onChange={handleChange} value={form ? form.pTel : ''} />
        <br />
        <input className="custom-input" placeholder='Nombre Usuario' type="text" name="pUser" id="pUser" onChange={handleChange} value={form ? form.pUser : ''} />
        <br />
        <input className="custom-input" placeholder='Contraseña' type="password" name="pPass" id="pPass" onChange={handleChange} value={form ? form.pPass : ''} />

        <button className='buttons' onClick={() => peticionPost()}><span>Registrar</span></button>

      </section>
    </>
  )



}

export default Register;