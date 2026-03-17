import express from "express";
import { Client } from "pg";


const app = express();


app.get("/hello", async (req, res) => {
    const client = await new Client({
        user: process.env.POSTGRES_USER,
        host: process.env.POSTGRES_HOST,
        password: process.env.POSTGRES_PASSWORD,
        database: process.env.POSTGRES_DATABASE,
    }).connect()
    const result = await client.query('SELECT $1::text as message', ['Hello world!'])
    console.log("hey hey", result.rows[0].message) // Hello world!
    await client.end()
    res.status(200).end();
})


const port = 8080;

app.listen(port, () => {
    console.log(`Listening on ${port}`);
})


