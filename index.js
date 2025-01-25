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

app.get('/file/:filename', (req, res) => {
  fs.readFile(`./files/${req.params.filename}`, "utf-8", (err, filedata) => {
    if (err) {
      console.error(err);
      return res.status(404).send('File not found');
    }
    res.render("display", {filename: req.params.filename, filedata: filedata});
    console.log(filedata);
    console.log(req.params.filename);
  });
})

app.get('/edit/:filename', (req, res) => {
  fs.readFile(`./files/${req.params.filename}`, "utf-8", (err, filedata) => {
    res.render('edit', {
      filename: req.params.filename,
      filedata: filedata
    });
  });
})

app.post('/edit', (req, res) => {
  fs.writeFile(`./files/${req.body.filename}`, req.body.filedata, (err) => {
    res.redirect('/');
  });
})

app.post('/edit2', (req, res) => {
  fs.writeFile(`./files/${req.body.previous2}`, `./files/${req.body.new2}`, (err) => {
    res.redirect('/');
  });
})


app.post('/create', (req, res) => {
  fs.writeFile(`./files/${req.body.title.split(' ').join('')}.txt` , req.body.details , (err)=>{
    res.redirect('./')
  })  
})

 

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
