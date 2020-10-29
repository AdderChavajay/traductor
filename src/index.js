const express = require("express")
const database = require('./conexion')
const cors = require("cors")
const app = express()
const port = 3000

app.use(cors({origin: true}))

app.get('/', (req, res) => {
    const sql = "SELECT  * FROM p_kiche K, p_espanol E,traduccione_k T WHERE K.idk = ? and K.idk=T.idT and T.idT =E.idE"
    const { wordid } = req.query
    //const wordid = req.query.wordid
    database.connection.query(sql, [wordid], (err, result) => {
        if (err) throw err
        console.log(result)
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
