const express = require('express');
const path = require('path');


const app = express();
const PORT = 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const tables = [

]

app.get('/', (req, res) => res.sendFile(path.join(__dirname, 'home.html')));
app.get('/reservation', (req, res) => res.sendFile(path.join(__dirname, 'reservation.html')));
app.get('/tables', (req, res) => res.sendFile(path.join(__dirname, 'tablesAvailable.html')));

app.post('/api/tables', (req, res) => {
   
    const newguest = req.body;
  

    
    console.log(newguest);
  
   tables.push(newguest);
    res.json(newguest);
  });
app.get('/api/tables', (req, res) => res.json(tables));

app.listen(PORT, () => console.log(`Server is listening on PORT: ${PORT}`));