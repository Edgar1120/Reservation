import { getConnection, sql } from '../database/connection'

export const addClient = async (req, res) => {
  const pool = await getConnection();
  const result = await pool
    .request()
    .input('pName', req.body.pName)
    .input('pLastname', req.body.pLastname)
    .input('pEmail', req.body.pEmail)
    .input('pTel', req.body.pTel)
    .execute('pa_AddClient');

  const resultMessage = result.recordset[0].Msg;
  res.json({ message: resultMessage });
  pool.close();
};

export const getClient = async (req, res) => {
  const pool = await getConnection();
  const resul = await pool.request().execute('pa_GetAllClients');
  console.log(resul);
  res.json(resul.recordset);
  pool.close();
};

export const deleteClient = async (req, res) => {
  const pool = await getConnection();
  const result = await pool
    .request()
    .input('pClientId', req.params.pClientId)
    .execute('pa_DeleteClient');

  const resultMessage = result.recordset[0].Msg;
  res.json({ message: resultMessage });
  pool.close();
};

export const updateClient = async (req, res) => {
  const { pClientId } = req.params;
  const pool = await getConnection();
  const {
    pName,
    pLastname,
    pEmail,
    pTel
  } = req.body;


  const result = await pool
    .request()
    .input('pClientId', pClientId)
    .input('pName', pName)
    .input('pLastname', pLastname)
    .input('pEmail', pEmail)
    .input('pTel', pTel)
    .execute('pa_UpdateClient');

  const resultMessage = result.recordset[0].Message;

  res.json({ message: resultMessage });
  pool.close();
};