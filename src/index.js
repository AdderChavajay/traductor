const express = require("express")
const bodyParser = require("body-parser")
const database = require('./conexion')
const cors = require("cors")
const app = express()
const port = 3000

app.use(cors({origin: true}))
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.post('/search/word', (req, res) => {
    
    const sql = "select *  from p_espanol e, p_kiche k, traduccione_k t WHERE e.idE = t.idT and t.idT = k.idK and e.palabrae = ?"
    const { word } = req.body
    database.connection.query(sql, [word], (err, result) => {
        if (err) throw err
        res.json(result)
    })
})

app.get('/image/:name', (req, res) => {
    res.sendFile(`C:/Users/Epik/Desktop/translate/uploads/${req.params.name}`)
})


app.listen(port, () => {
    console.log(`server lisen in port ${port}`)
    database.connectDatabase()
})
