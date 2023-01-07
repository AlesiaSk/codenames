import { Request, Response } from 'express';

const express = require('express');
const cors = require('cors');
const app = express();

const words = ['Test1', 'Test2', 'Test3', 'Test4', 'Test5'];

app.use(cors())

app.get('/words', (req: Request, res: Response) => {
    res.json( {words: words});
});

app.listen(8000);