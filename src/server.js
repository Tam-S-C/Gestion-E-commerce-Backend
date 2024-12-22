import express from "express";

const app = express();

app.use(express.urlencoded({ extended: true}));

app.get("/", (req, res) => {
    res.send("<h1>Hola mundo</h1>")
});
app.listen(8080, () => {
    console.log("Server listening on port http://localhost:8080");

})