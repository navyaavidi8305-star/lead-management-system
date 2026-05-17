const express = require("express");
const cors = require("cors");
const db = require("./db");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    res.send("API Running");
});

app.post("/leads", async (req, res) => {

    const { name, phone, source } = req.body;

    const result = await db.query(
        "INSERT INTO leads(name,phone,source) VALUES($1,$2,$3) RETURNING *",
        [name, phone, source]
    );

    res.json(result.rows[0]);

});

app.get("/leads", async (req, res) => {

    const result = await db.query(
        "SELECT * FROM leads"
    );

    res.json(result.rows);

});

app.put("/leads/:id", async (req,res)=>{

    const {status}=req.body;

    const result = await db.query(
        "UPDATE leads SET status=$1 WHERE id=$2 RETURNING *",
        [status, req.params.id]
    );

    res.json(result.rows[0]);

});

app.delete("/leads/:id", async(req,res)=>{

    await db.query(
        "DELETE FROM leads WHERE id=$1",
        [req.params.id]
    );

    res.json({
        message:"Lead Deleted"
    });

});

app.listen(5000, () => {
    console.log("Server running on port 5000");
});