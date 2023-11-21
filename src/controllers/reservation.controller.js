import { getConnection, sql } from '../database/connection'

export const addResClient = async (req, res) => {
  const pool = await getConnection();
  const result = await pool
    .request()
    .input('pDate', req.body.pDate)
    .execute('pa_AddResClient');

  const resultMessage = result.recordset[0].Msg;
  res.json({ message: resultMessage });
  pool.close();
};

export const addRes = async (req, res) => {
  const pool = await getConnection();
  const result = await pool
    .request()
    .input('pClient', req.body.pClient)
    .input('pAgency', req.body.pAgency)
    .input('pDate', req.body.pDate)
    .input('pStatus', req.body.pStatus)
    .execute('pa_AddReservation');
  const resultMessage = result.recordset[0].Msg;
  res.json({ message: resultMessage });
  pool.close();
};

export const getResInfo = async (req, res) => {
  const pool = await getConnection();

  const result = await pool
    .request()
    .execute('pa_GetResInfo');

  res.json(result.recordset);
  pool.close();
};

export const updateReservation = async (req, res) => {

  const { pReservationId } = req.params;
  const pool = await getConnection();
  const {
    pDate,
    pStatus,
    pClientID,
  } = req.body;

  const result = await pool
    .request()
    .input('pReservationId', pReservationId)
    .input('pDate', pDate)
    .input('pStatus', pStatus)
    .input('pAgencyId', pClientID)
    .execute('pa_UpdateReservations');
  console.log(req.body);

  const resultMessage = result.recordset[0].Message;

  res.json({ message: resultMessage });
  pool.close();
}

export const deleteReservation = async (req, res) => {
  const pool = await getConnection();
  console.log(req.body);


  const result = await pool
    .request()
    .input('pReservationId', req.params.pReservationId)
    .execute('pa_DeleteReservation');

  const resultMessage = result.recordset[0].Msg;
  res.json({ message: resultMessage });
  pool.close();
};

/* add admin*/
export const addResClientAdim = async (req, res) => {
  const pool = await getConnection();
  const result = await pool
    .request()
    .input('pClientID', req.body.pClientID)
    .input('pDate', req.body.pDate)
    .input('pStatus', req.body.pStatus)
    .execute('pa_AddClientResAdmin');
  console.log(req.body);

  const resultMessage = result.recordset[0].Msg;
  res.json({ message: resultMessage });
  pool.close();
};

export const addResAgencyAdim = async (req, res) => {
  const pool = await getConnection();
  const result = await pool
    .request()
    .input('pAgencyID', req.body.pAgencyID)
    .input('pDate', req.body.pDate)
    .input('pStatus', req.body.pStatus)
    .execute('pa_AddAgencyResAdmin');
  console.log(req.body);

  const resultMessage = result.recordset[0].Msg;
  res.json({ message: resultMessage });
  pool.close();
};

export const getResClientAdmin = async (req, res) => {
  const pool = await getConnection();

  const result = await pool
    .request()
    .execute('pa_GetClientResAdmin');

  res.json(result.recordset);
  pool.close();
};

export const getResAgencyAdmin = async (req, res) => {
  const pool = await getConnection();

  const result = await pool
    .request()
    .execute('pa_GetAgencyResAdmin');

  res.json(result.recordset);
  pool.close();
};
