import { getConnection, sql } from '../database/connection'

export const addServiceDetail = async (req, res) => {
    const pool = await getConnection();
    const result = await pool
        .request()
        .input('pId', req.body.pId)
        .input('pTime', req.body.pTime)
        .input('pPax', req.body.pPax)
        .execute('pa_AddSerDetails');

    const resultMessage = result.recordset[0].Msg;
    res.json({ message: resultMessage });
    pool.close();
};