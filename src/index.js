const express = require("express")
const bodyParser = require("body-parser")
const database = require('./conexion')
const cors = require("cors")
const { json } = require("body-parser")
const app = express()
const port = 3000
const ES = 1
const QC = 3
const IN = 2

app.use(cors({origin: true}))
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.post('/search/word/:idfrom/:idto', (req, res) => {
    
    let sql = ""
    const { word } = req.body
    const { idfrom, idto } = req.params
    if ( idfrom == ES && idto == QC ) {
        sql = "select *  from p_kiche k, p_espanol e,  traduccione_k t WHERE e.idE = t.idT and t.idT = k.idK and e.palabrae = ?"           
    }else if ( idfrom == ES && idto == IN ) {
        sql = "select * from p_ingles i, p_espanol e, traduccione_k_i t WHERE  e.idE = t.idE and t.idE = i.idi and e.palabrae = ? "
    }else if (idfrom == QC &&  idto ==  ES ){
        sql = "select * from p_espanol e, p_kiche k, traduccione_k t WHERE e.idE = t.idT and t.idT = k.idK and k.palabrak = ?"
    }else if ( idfrom == QC && idto == IN ){
        sql = "select * from p_ingles i, p_kiche k, traduccione_k_i t WHERE  k.idK = t.idE_K_I and t.idE_K_I = i.idi and k.palabrak = ?"
    }else if ( idfrom == IN && idto == ES ){
        sql = "select * from p_espanol e, p_ingles i, traduccione_k_i t WHERE  t.idE_K_I = e.ide and i.idi = t.idE_K_I and i.palabrai = ?"
    }else if ( idfrom == IN && idto == QC ){
        sql = "select * from p_ingles i, p_kiche k, traduccione_k_i t WHERE  k.idK = t.idE_K_I and t.idE_K_I = i.idi and i.palabrai = ? "
    }    

    database.connection.query(sql, [word], (err, result) => {
        if (err) throw err
        
        if(!result.length){
            console.log("palabra no encontrados")
            grapics = "update grafica set no_encontrados = no_encontrados+1 where id_grafica = 1"
        }else{
            let frase = word.split(" ")
            if(frase.length > 1){
                grapics = "update grafica set frases = frases+1 WHERE id_grafica = 1;"
                console.log("frase")
            }else{
                grapics = "update grafica set palabras = palabras+1 WHERE id_grafica = 1;"
                console.log("palabra");
            }
        }

        database.connection.query(grapics, [], (err, resultado) => {
            if(err) {
                console.log(err);
                throw err
            };
            res.json(result)
            return
        })

        // res.json(result)

    })

})


app.get('/grafica/datos', (req, res) => {
    const Rgrapics ="select * from grafica where id_grafica=1"
    database.connection.query(Rgrapics, [], (err, result) => {
        if(err) throw err
        res.json(result)
    }
    // res.json({dsfsd:"sdfsdf"})
)})


app.get('/image/:name', (req, res) => {
    res.sendFile(`C:/Users/Epik/Desktop/translate/uploads/${req.params.name}`)
})

app.listen(port, () => {
    console.log(`server lisen in port ${port}`)
    database.connectDatabase()
})
