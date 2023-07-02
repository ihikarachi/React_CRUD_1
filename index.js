/*********************************************************************/
// it is imam Hussain a.s institute CRUD Document
// facebook: fb.com/iHi.Karachi
// youTube: https://www.youtube.com/channel/UCa_Hun35Du0kAuWu-zkXyaQ
/*********************************************************************/

const express = require('express')
const app = express()
const mySQL = require('mysql')



const db = mySQL.createPool(
    {
        host: 'localhost', // 127.0.0.1 //   
        user: 'root',
        password: 'accessme',
        database: 'db_python_class'
    }
)

const BodyParser = require('body-parser')
const cors = require('cors')

app.use(cors())
app.use(express.json())
app.use(BodyParser.urlencoded({ extended: true }))

app.post("/CUD_Fun", (req, res) => {
   let mySQL = req.body.mySQL
   db.query(mySQL, (err, result) => {
    console.log(err)
    if (err == null)
        res.send('Done')
    else 
        res.send('Error....')
  })
});

app.get ("/iHi/DataQuery", (req,res) => {
    const mySQL = req.query.sql
    db.query(mySQL, (err, result) => {
        console.log(result)
        res.send(result)
    })
}
);

app.listen(3001, () => {
    console.log('Hello iHi MySQL Server')
});
