import { getConnection, sql } from '../database/connection'


export const addAgency = async (req, res) => {

    const pool = await getConnection();
    const result = await pool
        .request()
        .input('pIdJuridic', req.body.pIdJuridic)
        .input('pName', req.body.pName)
        .input('pDir', req.body.pDir)
        .input('pEmail', req.body.pEmail)
        .input('pTel', req.body.pTel)
        .execute('pa_AddAgency');

    const resultMessage = result.recordset[0].Msg;
    res.json({ message: resultMessage });
    pool.close();
};



export const updateAgency = async (req, res) => {
    const { pAgencyId } = req.params;
    const pool = await getConnection();
    const {
        pIdJuridic,
        pName,
        pDir,
        pEmail,
        pTel
    } = req.body;

    const result = await pool
        .request()
        .input('pAgencyId', pAgencyId)
        .input('pIdJuridic', pIdJuridic)
        .input('pName', pName)
        .input('pDir', pDir)
        .input('pEmail', pEmail)
        .input('pTel', pTel)
        .execute('pa_UpdateAgency');

    const resultMessage = result.recordset[0].Message;

    res.json({ message: resultMessage });
    pool.close();
};

export const deleteAgency = async (req, res) => {
    const pool = await getConnection();
    const result = await pool
        .request()
        .input('pAgencyId', req.params.pAgencyId)
        .execute('pa_DeleteAgency');

    const resultMessage = result.recordset[0].Msg;
    res.json({ message: resultMessage });
    pool.close();
};

export const getAgency = async (req, res) => {
    const pool = await getConnection();
    const resul = await pool.request().execute('pa_GetAgency');
    console.log(resul);
    res.json(resul.recordset);
    pool.close();
};
