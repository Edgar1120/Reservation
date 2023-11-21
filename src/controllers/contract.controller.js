import { getConnection, sql } from '../database/connection'

export const addContract = async (req, res) => {
  const pool = await getConnection();
  const result = await pool
    .request()
    .input('pAgency', req.body.pAgency)
    .input('pService', req.body.pService)
    .input('pPrice', req.body.pPrice)
    .input('pDiscount', req.body.pDiscount)
    .execute('pa_AddContract');

  const resultMessage = result.recordset[0].Msg;
  res.json({ message: resultMessage });
  pool.close();
};

/*
export const deleteContract = async (req, res) => {
    const pool = await getConnection();
    const result = await pool
      .request()
      .input('pId', req.params.pId)
      .execute('pa_DeleteContract');
  
      const resultMessage = result.recordset[0].Msg;
      res.json( {message: resultMessage});
      pool.close();
  };*/

export const deleteContract = async (req, res) => {
  const pool = await getConnection();
  const result = await pool
    .request()
    .input('pId', req.params.pId)
    .execute('pa_DeleteContract');

  const resultMessage = result.recordset[0].Msg;
  res.json({ message: resultMessage });
  pool.close();
};


export const getAllContracts = async (req, res) => {
  const pool = await getConnection();
  const resul = await pool.request().execute('pa_GetAllContracts');
  console.log(resul);
  res.json(resul.recordset);
  pool.close();
};

export const getContracts = async (req, res) => {
  const pool = await getConnection();
  const result = await pool
    .request()
    .input('pAgency', req.params.pAgency)
    .execute('pa_GetContracts');

  const contracts = result.recordset;

  res.json({ contracts });

  pool.close();
};

