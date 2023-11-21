import { getConnection, sql } from '../database/connection'

export const login = async (req, res) => {
    const pool = await getConnection();
    console.log(req.body);
    const result = await pool
        .request()
        .input('pName', req.body.pName)
        .input('pPass', req.body.pPass)
        .query('exec pa_Login @pName,@pPass');
    console.log(result);
    res.json(result.recordset);
    pool.close();
};

export const changePassword = async (req, res) => {

    const { pId } = req.params;
    const pool = await getConnection();

    const {
        pPass
    } = req.body;

    const result = await pool
        .request()
        .input('pId', pId)
        .input('pPass', pPass)
        .execute('pa_ChangePassword');

    const resultMessage = result.recordset[0].Msg;
    res.json({ message: resultMessage });
    pool.close();

};

export const registerAgency = async (req, res) => {
    const pool = await getConnection();
    const result = await pool
        .request()
        .input('pId', req.body.pId)
        .input('pName', req.body.pName)
        .input('pDir', req.body.pDir)
        .input('pEmail', req.body.pEmail)
        .input('pTel', req.body.pTel)
        .input('pUser', req.body.pUser)
        .input('pPass', req.body.pPass)
        .execute('pa_RegisterAgency');

    const resultMessage = result.recordset[0].Msg;
    res.json({ message: resultMessage });
    pool.close();

};