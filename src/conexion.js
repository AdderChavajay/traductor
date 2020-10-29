const mysql = require('mysql');
const connection = mysql.createConnection({
   host: 'localhost',
   user: 'root',
   password: '',
   database: 'prueba',
   port: 3306
});

const connectDatabase = async () => {
    try {
        await connection.connect();
        console.log("database connected");
    } catch (error) {
        console.error(error);
    }
}

// const sql = "SELECT K.palabrak, E.palabrae FROM p_kiche K, p_espanol E,traduccione_k T WHERE K.idk = ? and K.idk=T.idT and T.idT =E.idE ";
// //const sql = "SELECT K.palabra, E.palabra FROM p_kiche k JOIN traduccione_k t ON t.id = k.idk ";
// const query = connection.query(sql, [1], function(error, result){
//     if(error){
//        throw error;
//     }else{
//        var resultado = result;
//        if(resultado.length > 0){
//           console.log(resultado);
//        }else{
//           console.log('Registro no encontrado');
//        }
//     }
//  }
 
// );

const disconnectedDatabase = async () => {
    await connection.end();
}

module.exports = {
    connectDatabase,
    disconnectedDatabase,
    connection
}