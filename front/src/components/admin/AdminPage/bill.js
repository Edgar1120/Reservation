import React, { useState, useEffect } from 'react';
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';
import { Sidebar } from '../Sidebar';

const url = "http://localhost:4000/bill/";

export function Bill() {

    const [bills, setBills] = useState([]);
    const [reservation, setReservations] = useState([]);
    const [services, setService] = useState([]);
    const [search, setSearch] = useState("");
    const [modalEliminar, setModalEliminar] = useState(false);
    const [modalInsertar, setModalInsertar] = useState(false);

    const [form1, setForm1] = useState({
        pBillId: '',
        pReservationId: '',
        pTotal: '',

    });

    const [form2, setForm2] = useState({
        pBillDetailsId: '',
        pBillId: '',
        pRawPrice: '',
        pNetPrice: '',
        pService: '',
        tipoModal: ''
    });

    useEffect(() => {
        get();
        getReserva();
        getService();
    }, []);

    const get = async () => {
        try {
            const response = await axios.get(url + "getBill");
            setBills(response.data);
        } catch (error) {
            console.log(error.message);
        }
    };
    const getReserva = async () => {
        try {
            const response = await axios.get("http://localhost:4000/reservation/getReservation");
            setReservations(response.data);
        } catch (error) {
            console.log(error.message);
        }
    };
    const getService = async () => {
        try {
            const response = await axios.get("http://localhost:4000/service/getService");
            setService(response.data);
        } catch (error) {
            console.log(error.message);
        }
    };

    const peticionPutBill = () => {
        axios
            .put(url + "updateBill" + form1.pBillId, form1)
            .then(() => {
                get();
            })
            .catch((error) => {
                console.log(error.message);
            });
    };

    const peticionPutBillDetails = () => {
        axios
            .put(url + "updateBillDetails" + form2.pBillDetailsId, form2)
            .then(() => {
                get();
            })
            .catch((error) => {
                console.log(error.message);
            });
    };

    const peticionDeleteBill = () => {
        axios.delete(url + "deleteBill/" + form1.pBillId)
            .then(() => {
                setModalEliminar(false);
                get();
            })
            .catch((error) => {
                console.log(error.message);
            });
    };

    const peticionDeleteBillDetails = () => {
        axios.delete(url + "deleteBillDetails/" + form2.pBillDetailsId)
            .then(() => {
                setModalEliminar(false);
                get();
            })
            .catch((error) => {
                console.log(error.message);
            });
    };

    const selectBill = (bill) => {
        setForm1({
            pBillId: bill.pBillId,
            pReservationId: bill.pReservationId,
            pTotal: bill.pTotal,
            tipoModal: 'actualizar'

        });
    };

    const selectBillDetails = (billDetails) => {
        setForm2({
            pBillDetailsId: billDetails.pBillDetailsId,
            pBillId: billDetails.pBillId,
            pRawPriceal: billDetails.pRawPrice,
            pNetPrice: billDetails.pNetPrice,
            pService: billDetails.pService,
            tipoModal: 'actualizar'

        });
    }

    const toggleModalInsertar = () => {
        setModalInsertar(!modalInsertar);
    };

    let resultado = [];
    if (!search) {
        resultado = bills;
    } else {
        resultado = bills.filter((dato) =>
            dato.name.toLowerCase().includes(search.toLocaleLowerCase())
        )
    }
    const searcher = async (e) => {
        setSearch(e.target.value)
        console.log(e.target.value)
    };

    const handleChange = async (e) => {
        e.persist();
        setForm1({
            ...form1,
            [e.target.name]: e.target.value
        });
    };
    const handleChange1 = async (e) => {
        e.persist();
        setForm2({
            ...form2,
            [e.target.name]: e.target.value
        });
    };

    return (
        <>
            <Sidebar />
            <div className="bill">
                <br />

                <input value={search} className='input-s' placeholder='Buscar...' onChange={searcher} type="text" name="value" id="value" />
                <br /><br />
                <table className="table">
                    <thead>
                        <tr>
                            <th>Id </th>
                            <th>Id Reserva</th>
                            <th>Nombre</th>
                            <th>Servicio</th>
                            <th>Precio bruto </th>
                            <th>Precio neto</th>
                            <th>Total</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {resultado.map(bill => {
                            return (
                                <tr>
                                    <td>{bill.idBillDetails}</td>
                                    <td>{bill.ReservationID}</td>
                                    <td>{bill.ClientAgencyName}</td>
                                    <td>{bill.idService}</td>
                                    <td>{bill.RawPrice}</td>
                                    <td>{bill.NetPrice}</td>
                                    <td>{bill.BillTotal}</td>
                                    <td>
                                    <button className="btn-modal " onClick={() => { selectBill(bill); selectBillDetails(bill); toggleModalInsertar(); }}><span><FontAwesomeIcon icon={faEdit} /></span> </button>
                                        {"   "}
                                        <button className="btn-modal" onClick={() => { selectBill(bill); selectBillDetails(bill); setModalEliminar(true); }}><span><FontAwesomeIcon icon={faTrashAlt} /></span></button>
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
            <input
                className="custom-input"
                placeholder='Id de la factura'
                type="text"
                name="pBillId"
                id="pBillId"
                onChange={handleChange}
                value={form1 ? form1.pBillId : ''}
            />
            <br />
            <br />
            <select
                name="pReservationId"
                className="form-control"
                value={form1 ? form1.pReservationId : ''}
                onChange={handleChange}
            >
                {reservation.map((elemento) => (
                    <option key={elemento.id} value={elemento.id}>
                        {elemento.id}
                    </option>
                ))}
            </select>
            <br />
            <br />
            <select
                name="pService"
                className="form-control"
                value={form1 ? form2.pService : ''}
                onChange={handleChange1}
            >
                {services.map((elemento) => (
                    <option key={elemento.id} value={elemento.id}>
                        {elemento.name}
                    </option>
                ))}
            </select>
            <br />
            <br />
            <input
                className="custom-input"
                placeholder='Precio neto'
                type="text"
                name="pNetPrice"
                id="pNetPrice"
                onChange={handleChange1}
                value={form2 ? form2.pNetPrice : ''}
            />
            <br />
            <input
                className="custom-input"
                placeholder='Precio bruto'
                type="text"
                name="pRawPrice"
                id="pRawPrice"
                onChange={handleChange1}
                value={form2 ? form2.pRawPrice : ''}
            />
            <br />
            <input
                className="custom-input"
                placeholder='Total'
                type="text"
                name="pTotal"
                id="pTotal"
                onChange={handleChange}
                value={form1 ? form1.pTotal : ''}
            />
            <br />
        </div>
    </ModalBody>

    <ModalFooter>
        <button className="btn-modal" onClick={() => { peticionPutBill(); peticionPutBillDetails(); }}>
            <span>Actualizar</span>
        </button>
        <button className="btn-modal" onClick={() => setModalInsertar(false)}>
            <span>Cancelar</span>
        </button>
    </ModalFooter>
</Modal>

<Modal isOpen={modalEliminar}>
    <ModalBody>
        Estás seguro que deseas eliminar la Empresa {form1 && form1.ClientAgencyName}
    </ModalBody>
    <ModalFooter>
        <button className="btn-modal" onClick={() => { peticionDeleteBill(); peticionDeleteBillDetails(); }}>
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


};

