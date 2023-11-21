import React, { useState, useEffect } from 'react';
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';
import { Sidebar } from '../Sidebar';

const url = "http://localhost:4000/agency/";


export function Agency() {
  const [agencies, setAgencies] = useState([]);
  const [search, setSearch] = useState("");
  const [modalInsertar, setModalInsertar] = useState(false);
  const [modalEliminar, setModalEliminar] = useState(false);
  const [form, setForm] = useState({
    pId: '',
    pIdJuridic: '',
    pName: '',
    pDir: '',
    pEmail: '',
    pTel: '',
    tipoModal: ''

  });

  useEffect(() => {
    get();
  }, []);

  const get = async () => {
    try {
      const response = await axios.get(url + "getAgency");
      setAgencies(response.data);
    } catch (error) {
      console.log(error.message);
    }
  };

  const peticionPost = async () => {
    try {
      await axios.post(url + "addAgency", form);
      toggleModalInsertar();
      get();
    } catch (error) {
      console.log(error.message);
    }
  };

  const peticionPut = () => {
    axios
      .put(url + "updateAgency/" + form.pId, form)
      .then(() => {
        toggleModalInsertar();
        get();
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  const peticionDelete = () => {
    axios.delete(url + "deleteAgency/" + form.pId)
      .then(() => {
        setModalEliminar(false);
        get();
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  const selectAgency = (agency) => {
    setForm({
      pId: agency.id,
      pIdJuridic: agency.idJuridic,
      pName: agency.name,
      pDir: agency.direction,
      pEmail: agency.email,
      pTel: agency.tel,
      tipoModal: 'actualizar'
    });
  };

  const toggleModalInsertar = () => {
    setModalInsertar(!modalInsertar);
  };

  let resultado = [];
  if (!search) {
    resultado = agencies;
  } else {
    resultado = agencies.filter((dato) =>
      dato.name.toLowerCase().includes(search.toLocaleLowerCase())
    )
  }
  const searcher = async (e) => {
    setSearch(e.target.value)
    console.log(e.target.value)
  };


  const handleChange = async (e) => {
    e.persist();
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };


  return (
    <>
      <Sidebar />
      <div className="agency">
        <br />
        <div className="center-content">
          <button className="btn" onClick={() => { setForm(null); setForm({ tipoModal: 'insertar' }); setModalInsertar(true); }}><span>Agregar Agencia</span></button>
        </div>
        <input value={search} className='input-s' placeholder='Buscar...' onChange={searcher} type="text" name="value" id="value" />
        <br /><br />
        <table className="table">
          <thead>
            <tr>
              <th>Id de la Agencia</th>
              <th>Id Juridico</th>
              <th>Nombre</th>
              <th>Direccion</th>
              <th>Email</th>
              <th>Telefono</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {resultado.map(agency => {
              return (
                <tr>
                  <td>{agency.id}</td>
                  <td>{agency.idJuridic}</td>
                  <td>{agency.name}</td>
                  <td>{agency.direction}</td>
                  <td>{agency.email}</td>
                  <td>{agency.tel}</td>
                  <td>
                    <button className="btn-modal " onClick={() => { selectAgency(agency); toggleModalInsertar(); }}><span><FontAwesomeIcon icon={faEdit} /></span> </button>
                    {"   "}
                    <button className="btn-modal" onClick={() => { selectAgency(agency); setModalEliminar(true); }}><span><FontAwesomeIcon icon={faTrashAlt} /></span></button>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>


        <Modal isOpen={modalInsertar}>

          <ModalHeader style={{ display: 'block' }}>
            <span style={{ float: 'right' }} onClick={() => toggleModalInsertar()}>x</span>
          </ModalHeader>

          <ModalBody>

            <div className="form-group">

              <input className="custom-input" placeholder='Id Juridico' type="text" name="pIdJuridic" id="pIdJuridic" onChange={handleChange} value={form ? form.pIdJuridic : ''} />
              <br />
              <br />
              <input className="custom-input" placeholder='Nombre Agencia' type="text" name="pName" id="pName" onChange={handleChange} value={form ? form.pName : ''} />
              <br />
              <br />
              <input className="custom-input" placeholder='Direccion' type="text" name="pDir" id="pDir" onChange={handleChange} value={form ? form.pDir : ''} />
              <br />
              <br />
              <input className="custom-input" placeholder='Email' type="text" name="pEmail" id="pEmail" onChange={handleChange} value={form ? form.pEmail : ''} />
              <br />
              <br />
              <input className="custom-input" placeholder='Telefono' type="text" name="pTel" id="pTel" onChange={handleChange} value={form ? form.pTel : ''} />
              <br />

            </div>
          </ModalBody>

          <ModalFooter>
            {form.tipoModal === 'insertar' ?
              <button className="btn-modal " onClick={() => peticionPost()}>
                <span>Insertar</span>
              </button> :
              <button className="btn-modal " onClick={() => peticionPut()}>
                <span>Actualizar</span>
              </button>
            }
            <button className="btn-modal" onClick={() => setModalInsertar(false)}><span>Cancelar</span></button>
          </ModalFooter>
        </Modal>

        <Modal isOpen={modalEliminar}>
          <ModalBody>
            Estás seguro que deseas eliminar la Empresa {form && form.pName}
          </ModalBody>
          <ModalFooter>
            <button className="btn-modal" onClick={() => peticionDelete()}>
              <span>Sí</span>
            </button>
            <button className="btn-modal" onClick={() => setModalEliminar(false)}>
              <span>No</span>
            </button>
          </ModalFooter>
        </Modal>


      </div>
    </>
  )


}

export default Agency;