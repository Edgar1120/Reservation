import React, { useState, useEffect } from 'react';
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';
import { Sidebar } from '../Sidebar';

const url = "http://localhost:4000/reservation/";

export function Reservation() {
  const [reservations, setReservations] = useState([]);
  const [client, setClient] = useState([]);
  const [search, setSearch] = useState("");
  const [modalInsertar, setModalInsertar] = useState(false);
  const [modalEliminar, setModalEliminar] = useState(false);
  const [form, setForm] = useState({
    pIdRes: '',
    pDate: '',
    pStatus: 'Pendiente',
    pClientID: '',
    tipoModal: ''
  });

  useEffect(() => {
    get();
    getClient();
  }, [setReservations]);

  const get = async () => {
    try {
      const response = await axios.get(url + "getResClientAdmin");
      setReservations(response.data);
    } catch (error) {
      console.log(error.message);
    }
  };

  const getClient = async () => {
    try {
      const response = await axios.get("http://localhost:4000/client/getClient");
      setClient(response.data);
    } catch (error) {
      console.log(error.message);
    }
  };

  const peticionPost = async () => {
    const formattedDate = new Date(form.pDate).toISOString().slice(0, 10);
    try {
      await axios.post(url + "addResClientAdmin", { ...form, pDate: formattedDate });

      toggleModalInsertar();

      get();
    } catch (error) {
      console.log(error.message);
    }
  };

  const toggleModalInsertar = () => {
    setModalInsertar(!modalInsertar);
  };

  const peticionPut = () => {
    const formattedDate = new Date(form.pDate).toISOString().slice(0, 10);
    axios
      .put(url + "updateReservation/" + form.pIdRes, { ...form, pDate: formattedDate })
      .then(() => {
        toggleModalInsertar();
        get();
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  const peticionDelete = () => {
    axios.delete(url + "deleteRes/" + form.pIdRes)
      .then(() => {
        setModalEliminar(false);
        get();
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  const selectRes = (reservation) => {
    const formattedDate = new Date(reservation.dateN).toISOString().slice(0, 10);
    setForm({
      pIdRes: reservation.id,
      pClientId: reservation.clientName,
      pDate: formattedDate,
      pStatus: reservation.status,
      tipoModal: 'actualizar'
    });
  };

  let resultado = [];
  if (!search) {
    resultado = reservations;
  } else {
    resultado = reservations.filter((dato) =>
      dato.clientName.toLowerCase().includes(search.toLocaleLowerCase())
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
      <div className="resClient">
        <br />
        <div className="center-content">
          <button className="btn" onClick={() => { setForm(null); setForm({ tipoModal: 'insertar' }); setModalInsertar(true); }}><span>Agregar reservación</span></button>
        </div>
        <input value={search} className='input-s' placeholder='Buscar...' onChange={searcher} type="text" name="value" id="value" />
        <br /><br />
        <table className="table">
          <thead>
            <tr>
              <th>Id</th>
              <th>Nombre cliente</th>
              <th>Fecha</th>
              <th>Estado</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {resultado.map(reservation => {
              return (
                <tr>
                  <td>{reservation.id}</td>
                  <td>{reservation.clientName}</td>
                  <td>{reservation.dateN}</td>
                  <td>{reservation.status}</td>

                  <td>
                    <button className="btn-modal " onClick={() => { selectRes(reservation); toggleModalInsertar(); }}><span><FontAwesomeIcon icon={faEdit} /></span> </button>
                    {"   "}
                    <button className="btn-modal" onClick={() => { selectRes(reservation); setModalEliminar(true); }}><span><FontAwesomeIcon icon={faTrashAlt} /></span></button>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>


        <Modal isOpen={modalInsertar}>

          <ModalHeader style={{ display: 'block' }}>

            <span style={{ float: 'right' }} onClick={() => toggleModalInsertar()}>x</span>
            <h1>Reservación Cliente</h1>
          </ModalHeader>

          <ModalBody>

            <div className="form-group">

              <input type="date" className="custom-input" name="pDate" placeholder="Fecha" onChange={handleChange} value={form ? form.pDate : ''} />
              <br />
              <select
                name="pClientID"
                className="form-control"
                value={form ? form.pClientID : ''}
                onChange={handleChange}
              >
                {client.map((elemento) => (
                  <option key={elemento.id} value={elemento.id}>
                    {elemento.name}
                  </option>
                ))}
              </select>
              <br />
              <input type="text" className="custom-input" name="pStatus" placeholder="Estado" onChange={handleChange} value={form ? form.pStatus : ''} />
              <br />
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
            Estás seguro que deseas eliminar la reservation {form && form.pClientID}
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
  );



}

export default Reservation;