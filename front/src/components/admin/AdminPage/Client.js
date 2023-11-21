import React, { useState, useEffect } from 'react';
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';
import { Row, Col } from "react-bootstrap";
import { Sidebar } from '../Sidebar';

const url = "http://localhost:4000/client/";
export function Client() {
  const [clients, setClients] = useState([]);
  const [search, setSearch] = useState("");
  const [modalInsertar, setModalInsertar] = useState(false);
  const [modalEliminar, setModalEliminar] = useState(false);
  const [form, setForm] = useState({
    pClientID: '',
    pName: '',
    pLastname: '',
    pEmail: '',
    pTel: '',
    tipoModal: ''
  });

  useEffect(() => {
    get();
  }, []);

  const get = async () => {
    try {
      const response = await axios.get(url + "getClient");
      setClients(response.data);
    } catch (error) {
      console.log(error.message);
    }
  };

  const peticionPost = async () => {
    try {
      await axios.post(url + "addClient", form);
      toggleModalInsertar();
    } catch (error) {
      console.log(error.message);
    }
  };

  const peticionPut = () => {
    axios
      .put(url + "updateClient/" + form.pClientID, form)
      .then(() => {
        toggleModalInsertar();
        get();
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  const peticionDelete = () => {
    axios.delete(url + "deleteClient/" + form.pClientID)
      .then(() => {
        setModalEliminar(false);
        get();
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  const selectclient = (client) => {
    setForm({
      pClientID: client.id,
      pName: client.name,
      pLastname: client.lastname,
      pEmail: client.email,
      pTel: client.tel,
      tipoModal: 'actualizar'
    });
  };


  const toggleModalInsertar = () => {
    setModalInsertar(!modalInsertar);
  };

  let resultado = [];
  if (!search) {
    resultado = clients;
  } else {
    resultado = clients.filter((dato) =>
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
      <div className="client">
        <br />
        <div className="center-content">
          <button className="btn" onClick={() => { setForm(null); setForm({ tipoModal: 'insertar' }); setModalInsertar(true); }}><span>Agregar Cliente</span></button>
        </div>
        <input value={search} className='input-s' placeholder='Buscar...' onChange={searcher} type="text" name="value" id="value" />
        <br /><br />
        <table className="table">
          <thead>
            <tr>
              <th>Id</th>
              <th>Nombre</th>
              <th>Apellido</th>
              <th>Correo</th>
              <th>Telefono</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {resultado.map(client => {
              return (
                <tr>
                  <td>{client.id}</td>
                  <td>{client.name}</td>
                  <td>{client.lastname}</td>
                  <td>{client.email}</td>
                  <td>{client.tel}</td>
                  <td>
                    <button className="btn-modal " onClick={() => { selectclient(client); toggleModalInsertar(); }}> <span><FontAwesomeIcon icon={faEdit} /></span> </button>
                    {"   "}
                    <button className="btn-modal" onClick={() => { selectclient(client); setModalEliminar(true); }}> <span><FontAwesomeIcon icon={faTrashAlt} /></span> </button>
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
              <Row>
                <Col size={12} sm={6} className="px-2">
                  <input type="text" className="custom-input" name="pName" placeholder="Nombre" onChange={handleChange} value={form ? form.pName : ''} />
                </Col>
                <Col size={12} sm={6} className="px-2">
                  <input type="text" className="custom-input" name="pLastname" placeholder="Apellido" onChange={handleChange} value={form ? form.pLastname : ''} />
                </Col>
                <Col size={12} sm={6} className="px-2">
                  <input type="email" className="custom-input" name="pEmail" placeholder="Correo" onChange={handleChange} value={form ? form.pEmail : ''} />
                </Col>
                <Col size={12} sm={6} className="px-2">
                  <input type="text" className="custom-input" name="pTel" placeholder="Telefono" onChange={handleChange} value={form ? form.pTel : ''} />
                </Col>
              </Row>

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
            Estás seguro que deseas eliminar el Cliente {form && form.pName}
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


export default Client;