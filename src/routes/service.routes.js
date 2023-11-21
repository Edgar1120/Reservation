import { Router } from "express";
import { addService, deleteService, updateService, getServices } from '../controllers/service.controller'
import { addClient, deleteClient, getClient, updateClient } from "../controllers/client.controller";
import {
    addResClient, getResClientAdmin, addResClientAdim, addRes,
    updateReservation, deleteReservation,
    getResClient, getResId, getResInfo, getResAgencyAdmin, addResAgencyAdim
} from "../controllers/reservation.controller";
import { addServiceDetail, getSerDet } from "../controllers/servicedet.controller";
import { addAgency, updateAgency, getAgency, deleteAgency } from "../controllers/agency.controller";
import { login, changePassword, registerAgency } from "../controllers/user.controller";
import { addContract, deleteContract, getAllContracts, getContracts } from "../controllers/contract.controller";
import { deleteBill, deleteBillDetails, getBill, updateBill, updateBillDetails } from "../controllers/bill.controller";

const router = Router()

//Client
router.post('/client/addClient', addClient);
router.get('/client/getClient', getClient);
router.delete('/client/deleteClient/:pClientId', deleteClient);
router.put('/client/updateClient/:pClientId', updateClient);

//User
router.post('/user/login', login);
router.put('/user/changePassword/:pId', changePassword);
router.post('/user/register', registerAgency)

//Agency
router.get('/agency/getAgency', getAgency);
router.post('/agency/addAgency', addAgency);
router.put('/agency/updateAgency/:pAgencyId', updateAgency);
router.delete('/agency/deleteAgency/:pAgencyId', deleteAgency)


//Reservation
router.post('/reservation/addResClient', addResClient);
router.post('/reservation/addResClientAdmin', addResClientAdim);
router.post('/reservation/addResAgencyAdmin', addResAgencyAdim);
router.post('/reservation/addReservation', addRes);
router.put('/reservation/updateReservation/:pReservationId', updateReservation);
router.get('/reservation/getResInfo', getResInfo);
router.get('/reservation/getResClientAdmin', getResClientAdmin);
router.get('/reservation/getResAgencyAdmin', getResAgencyAdmin);
router.delete('/reservation/deleteRes/:pReservationId', deleteReservation);


//Service
router.get('/service/getServices', getServices);
router.post('/service/addService', addService);
router.delete('/service/deleteService/:pId', deleteService);
router.put('/service/updateService/:pId', updateService);

//ServiceDetails
router.post('/serviceDet/addSerDet', addServiceDetail);

//Contract
router.post('/contract/addContract', addContract);
router.delete('/contract/deleteContract/:pId', deleteContract);
router.get('/contract/getAllContracts', getAllContracts);
router.get('/contract/getContracts/:pAgency', getContracts);

//Bill
router.get('/bill/getBill', getBill);
router.delete('/bill/deleteBill/:pBillId', deleteBill);
router.delete('/bill/deleteBillDetails/:pBillDetailsId', deleteBillDetails);
router.put('/bill/updateBill/:pBillId', updateBill);
router.put('/bill/updateBillDetails/:pBillDetailsId', updateBillDetails);





export default router