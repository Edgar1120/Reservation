import 'bootstrap/dist/css/bootstrap.min.css';
import axios from "axios";
import React, { useState, useEffect } from 'react';

import { NavBar } from "./NavBar";
import { Footer } from './Footer';
import { Contact } from "./Contact";

const url = "http://localhost:4000/reservation/getResInfo";

export function GetReserva() {
  const [search, setSearch] = useState("");
  const [getResers, setGetReser] = useState([]);

  useEffect(() => {
    get();
  }, []);

  const get = async () => {
    try {
      const response = await axios.get(url);
      setGetReser(response.data);
    } catch (error) {
      console.log("Error:", error.message);
    }
  };

  const searcher = async (e) => {
    setSearch(e.target.value)
    console.log(e.target.value)
  };

  let resultado = [];
  if (!search) {
    resultado = getResers;
  } else {
    resultado = getResers.filter((dato) =>
      dato.ClientName.toLowerCase().includes(search.toLowerCase()));

  }





  return (

    <div className="getReserva">
      <NavBar />
      <section className="e" id="e">
        <input className="custom" value={search} placeholder='Buscar...' onChange={searcher} type="text" name="value" id="value" />

        <div className="card-container">
          {resultado.map((getReser) => (
            <div className="card" key={getReser.id}>
              <h2>Reserva</h2>
              <p><strong>Nombre Cliente:</strong> {getReser.ClientName} {getReser.ClientLastName}</p>
              <p><strong>Correo:</strong> {getReser.ClientEmail}</p>
              <p><strong>Telefono:</strong> {getReser.ClientTel}</p>
              <p><strong>Fecha:</strong> {getReser.ReservationDate}</p>
              <p><strong>Hora:</strong> {getReser.ServiceDetailTime}</p>
              <p><strong>Cantidad:</strong> {getReser.ServiceDetailPax}</p>
              <p><strong>Servicio:</strong> {getReser.ServiceName}</p>
              <p><strong>Estado:</strong> {getReser.ReservationStatus}</p>
              <p><strong>Precio:</strong> {getReser.ServiceDetailPrice}</p>
              <p><strong>Impuestos:</strong> {getReser.ServiceDetailTax}</p>
            </div>
          ))}
        </div>
      </section>
      <Contact />
      <Footer />
    </div>

  );
}