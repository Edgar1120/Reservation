import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Home } from './components/Home';
import Service from './components/admin/AdminPage/Service';
import Agency from './components/admin/AdminPage/Agency';
import Client from './components/admin/AdminPage/Client'
import Register from './components/Register';
import Login from './components/Login';
import RestClient from './components/admin/AdminPage/RestClient'
import RestAgency from './components/admin/AdminPage/RestAgency';
import { Bill } from './components/admin/AdminPage/bill';
import { Sidebar } from './components/admin/Sidebar';

function App() {
  return (

    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/service" element={<Service />} />
          <Route path="/agency" element={<Agency />} />
          <Route path="/clients" element={<Client />} />
          <Route path="/prueba" element={<Sidebar />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/ResClient" element={<RestClient />} />
          <Route path="/ResAgency" element={<RestAgency />} />
          <Route path="/Bill" element={<Bill />} />

        </Routes>
      </div>
    </Router>
  );
}

export default App;