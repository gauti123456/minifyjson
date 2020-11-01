const express = require('express')
const bodyParser = require('body-parser')

const fs = require('fs')

const app = express()

app.use(bodyParser.json())
app.use(express.static('public'))
app.use(bodyParser.urlencoded({extended:false}))

const PORT = 3001

app.set('view engine','ejs')

app.get('/',(req,res) => {
    res.render('index',{title:'Minify JSON Code Online - Best JSON Online Minifer Tool - MinifyJSON.com'})
})

app.get('/privacypolicy',(req,res) => {
    res.render('privacypolicy',{title:"Official Privacy Policy Page for MinifyJSON.com"})
})

app.get('/contactus',(req,res) => {
    res.render('contactus',{title:"Official Contact Us Page for MinifyJSON.com"})
})

app.get('/fr',(req,res) => {
    res.render('frenchsite',{title:'Minifier le code JSON en ligne - Meilleur outil de minifer en ligne JSON - MinifyJSON.com'})
})

app.post('/',(req,res) => {
    var json = req.body.json

    var minifiedjson = JSON.stringify(JSON.parse(json));

    var outputjson = Date.now() + "output.json"

    fs.writeFileSync(outputjson,minifiedjson)

    res.download(outputjson,(err) => {
        if(err) {
            fs.unlinkSync(outputjson)
            res.send("Unable to download the file")
        }
        fs.unlinkSync(outputjson)
    })
})

app.listen(PORT,()=> {
    console.log(`App is listening on Port ${PORT}`)
})