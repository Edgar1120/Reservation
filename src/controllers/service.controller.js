import { getConnection, sql } from '../database/connection'


export const getServices = async (req, res) => {
  const pool = await getConnection();
  const resul = await pool.request().execute('pa_GetServices');
  console.log(resul);
  res.json(resul.recordset);
  pool.close();
};

export const addService = async (req, res) => {
  const pool = await getConnection();
  const result = await pool
    .request()
    .input('pName', req.body.pName)
    .input('pCategory', req.body.pCategory)
    .input('pDescription', req.body.pDescription)
    .input('pRackPrice', req.body.pRackPrice)
    .input('pNetPrice', req.body.pNetPrice)
    .input('pTax', req.body.pTax)
    .execute('pa_AddService');

  const resultMessage = result.recordset[0].Msg;
  res.json({ message: resultMessage });
  pool.close();
};


export const deleteService = async (req, res) => {
  const pool = await getConnection();
  const result = await pool
    .request()
    .input('pId', req.params.pId)
    .execute('pa_DeleteService');

  const resultMessage = result.recordset[0].Msg;
  res.json({ message: resultMessage });
  pool.close();
};



export const updateService = async (req, res) => {
  const { pName, pCategory, pDescription, pRackPrice, pNetPrice, pTax } = req.body;
  const { pId } = req.params
  const pool = await getConnection();
  const transaction = pool.transaction();
  console.log(pTax);

  try {
    await transaction.begin();

    if (!pName || pName.trim() === '') {
      throw new Error('El nombre del servicio no puede estar en blanco.');
    }

    if (pRackPrice <= 0 || pNetPrice <= 0) {
      throw new Error('Los precios deben ser mayores que cero.');
    }

    if (pTax < 0 || pTax > 100) {
      throw new Error('El impuesto debe estar en el rango de 0 a 100.');
    }

    const result = await transaction
      .request()
      .input('pId', pId)
      .input('pName', pName)
      .input('pCategory', pCategory)
      .input('pDescription', pDescription)
      .input('pRackPrice', pRackPrice)
      .input('pNetPrice', pNetPrice)
      .input('pTax', pTax)
      .execute('pa_UpdateService');

    const resultMessage = result.recordset[0].Msg;

    await transaction.commit();
    res.json({ message: resultMessage });
  } catch (error) {
    console.log(error);
    await transaction.rollback();
    console.error('Error en updateService:', error);
    res.status(500).json({ error: 'Error en la actualización del servicio.' });
  }
};