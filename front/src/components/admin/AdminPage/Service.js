import React, { useState, useEffect } from 'react';
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';
import { Sidebar } from '../Sidebar';

const url = "http://localhost:4000/service/";



export function Service() {
  const [services, setServices] = useState([]);
  const [search, setSearch] = useState("");
  const [modalInsertar, setModalInsertar] = useState(false);
  const [modalEliminar, setModalEliminar] = useState(false);
  const [form, setForm] = useState({
    pId: '',
    pName: '',
    pCategory: '',
    pDescription: '',
    pRackPrice: '',
    pNetPrice: '',
    pTax: '',
    tipoModal: ''
  });

  useEffect(() => {
    get();
  }, []);

  const get = async () => {
    try {
      const response = await axios.get(url + "getServices");
      setServices(response.data);
    } catch (error) {
      console.log(error.message);
    }
  };

  const peticionPost = async () => {
    try {
      await axios.post(url + "addService", form);
      toggleModalInsertar();
      get();
    } catch (error) {
      console.log(error.message);
    }
  };

  const peticionPut = () => {
    axios
      .put(url + "updateService/" + form.pId, form)
      .then(() => {
        toggleModalInsertar();
        get();
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  const peticionDelete = () => {
    axios.delete(url + "deleteService/" + form.pId)
      .then(() => {
        setModalEliminar(false);
        get();
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  const selectService = (service) => {
    setForm({
      pId: service.id,
      pName: service.name,
      pCategory: service.category,
      pDescription: service.description,
      pRackPrice: service.rackPrice,
      pNetPrice: service.netPrice,
      pTax: service.tax,
      tipoModal: 'actualizar'
    });
  };

  const toggleModalInsertar = () => {
    setModalInsertar(!modalInsertar);
  };

  let resultado = [];
  if (!search) {
    resultado = services;
  } else {
    resultado = services.filter((dato) =>
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
      <div className="service">
        <br />
        <div className="center-content">
        
          <button className="btn" onClick={() => { setForm(null); setForm({ tipoModal: 'insertar' }); setModalInsertar(true); }}><span>Agregar servicio</span></button>
        </div>
        <input value={search} className='input-s' placeholder='Buscar...' onChange={searcher} type="text" name="value" id="value" />
        <br /><br />
        <table className="table">
          <thead>
            <tr>
              <th>Id del servicio</th>
              <th>Nombre del servicio</th>
              <th>Categoria</th>
              <th>Descripción</th>
              <th>Tarifa rack</th>
              <th>Precio neto</th>
              <th>Impuestos</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {resultado.map(service => {
              return (
                <tr>
                  <td>{service.id}</td>
                  <td>{service.name}</td>
                  <td>{service.category}</td>
                  <td>{service.description}</td>
                  <td>{new Intl.NumberFormat("en-EN").format(service.rackPrice)}</td>
                  <td>{new Intl.NumberFormat("en-EN").format(service.netPrice)}</td>
                  <td>{new Intl.NumberFormat("en-EN").format(service.tax)}</td>
                  <td>
                    <button className="btn-modal " onClick={() => { selectService(service); toggleModalInsertar(); }}><span><FontAwesomeIcon icon={faEdit} /></span> </button>
                    {"   "}
                    <button className="btn-modal" onClick={() => { selectService(service); setModalEliminar(true); }}><span><FontAwesomeIcon icon={faTrashAlt} /></span> </button>
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
              <input className="custom-input" placeholder='Nombre del servicio' type="text" name="pName" id="pName" onChange={handleChange} value={form ? form.pName : ''} />
              <br />
              <br />
              <input className="custom-input" placeholder='Categoria' type="text" name="pCategory" id="pCategory" onChange={handleChange} value={form ? form.pCategory : ''} />
              <br />
              <br />
              <input className="custom-input" placeholder='Descripción' type="text" name="pDescription" id="pDescription" onChange={handleChange} value={form ? form.pDescription : ''} />
              <br />
              <br />
              <input className="custom-input" placeholder='Tarifa rack' type="text" name="pRackPrice" id="pRackPrice" onChange={handleChange} value={form ? form.pRackPrice : ''} />
              <br />
              <br />
              <input className="custom-input" placeholder='Precio neto' type="text" name="pNetPrice" id="pNetPrice" onChange={handleChange} value={form ? form.pNetPrice : ''} />
              <br />
              <br />
              <input className="custom-input" placeholder='Impuestos' type="text" name="pTax" id="pTax" onChange={handleChange} value={form ? form.pTax : ''} />
              <br />
            </div>
          </ModalBody>

          <ModalFooter>
            {form.tipoModal === 'insertar' ?
              <button className="btn-modal " onClick={() =>peticionPost() }>
                <span>Insertar</span>
              </button> :
              <button className="btn-modal " onClick={() => peticionPut()  }>
                <span>Actualizar</span>
              </button>
            }
            <button className="btn-modal" onClick={() => setModalInsertar(false)}><span>Cancelar</span></button>
          </ModalFooter>
        </Modal>

        <Modal isOpen={modalEliminar}>
          <ModalBody>
            Estás seguro que deseas eliminar el servicio {form && form.pName}
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

export default Service;