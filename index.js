require('dotenv').config();
const express = require('express');
const axios = require('axios');
const app = express();
const port = 3000;
app.get('/cotacao', async (req, res) => {
    const symbol = req.query.symbol || 'AAPL'; // Símbolo da ação (padrão: Apple)
    const url = `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${symbol}&apikey=${process.env.APIKEY}`;

    try {
        const response = await axios.get(url);
        const data = response.data['Global Quote'];
        res.json(data);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Erro ao buscar cotação' });
    }
});
app.get('/txcambio', async (req, res) => {
    const symbol = req.query.symbol || 'USD';
    const url = `https://www.alphavantage.co/query?function=CURRENCY_EXCHANGE_RATE&from_currency=${symbol}&to_currency=JPY&apikey=${process.env.APIKEY}`;

    try {
        const response = await axios.get(url);
        const data = response.data;
        res.json(data);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Erro ao buscar cotação' });
    }
});

app.get('/exchange_rate', async (req, res) => {
    const symbol = req.query.symbol || 'BTC';
    const url = `https://www.alphavantage.co/query?function=CURRENCY_EXCHANGE_RATE&from_currency=${symbol}&to_currency=EUR&apikey=${process.env.APIKEY}`;
    try {
        const response = await axios.get(url);
        const data = response.data;
        res.json(data);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Erro ao buscar exchange rate' });
    }
});

app.get('/dividends', async (req, res) => {
    const symbol = req.query.symbol || 'IBM';
    const url = `https://www.alphavantage.co/query?function=DIVIDENDS&symbol=${symbol}&apikey=${process.env.APIKEY}`;
    try {
        const response = await axios.get(url);
        const data = response.data;
        res.json(data);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Erro ao buscar exchange rate' });
    }
});

app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`);
});