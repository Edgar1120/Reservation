import { getConnection, sql } from '../database/connection'


export const getBill = async (req, res) => {
    const pool = await getConnection();
    const resul = await pool.request().execute('pa_GetBill');
    console.log(resul);
    res.json(resul.recordset);
    pool.close();
};


export const updateBill = async (req, res) => {
    const { pBillId } = req.params;
    const pool = await getConnection();
    const {
        pReservationId,
        pTotal
    } = req.body;
    const result = await pool
        .request()
        .input('pBillId', pBillId)
        .input('pReservationId', pReservationId)
        .input('pTotal', pTotal)
        .execute('pa_UpdateBill');

    const resultMessage = result.recordset[0].Message;

    res.json({ message: resultMessage });
    pool.close();
};

export const updateBillDetails = async (req, res) => {
    const { pBillDetailsId } = req.params;
    const pool = await getConnection();
    const {
        pBillId,
        pRawPrice,
        pNetPrice,
        pService
    } = req.body;
    const result = await pool
        .request()
        .input('pBillDetailsId', pBillDetailsId)
        .input('pBillId', pBillId)
        .input('pRawPrice', pRawPrice)
        .input('pNetPrice', pNetPrice)
        .input('pService', pService)
        .execute('pa_UpdateBillDetails');

    const resultMessage = result.recordset[0].Message;

    res.json({ message: resultMessage });
    pool.close();
};

export const deleteBill = async (req, res) => {
    const pool = await getConnection();
    const result = await pool
        .request()
        .input('pBillId', req.params.pBillId)
        .execute('pa_DeleteBill');

    const resultMessage = result.recordset[0].Msg;
    res.json({ message: resultMessage });
    pool.close();
};

export const deleteBillDetails = async (req, res) => {
    const pool = await getConnection();
    const result = await pool
        .request()
        .input('pBillDetailsId', req.params.pBillDetailsId)
        .execute('pa_DeleteBillDetails');

    const resultMessage = result.recordset[0].Msg;
    res.json({ message: resultMessage });
    pool.close();
};