const express = require('express')
const app = express()
const path = require('path')
const fs = require('fs')
const port = 3000

app.use(express.json());
app.set('view engine' , 'ejs');
app.use(express.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname,'public')));

app.get('/', (req, res) => {
  fs.readdir('./files', (err, files) => {
    res.render("index" ,{files : files });
 
  })
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
