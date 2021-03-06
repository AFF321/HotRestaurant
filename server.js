const express = require('express');
const path = require('path');


const app = express();
const PORT = process.env.PORT || 8080;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const reserved = [
  { customerName: 'yoda',
    phoneNumber: 'Yoda',
    customerEmail: 'Jedi Master',
    customerID: 'a',
  },
  {
    customerName: 'darthmaul',
    phoneNumber: 'Darth Maul',
    customerEmail: 'Sith Lord',
    customerID: 'b',
  },
  {
    customerName: 'obiwankenobi',
    phoneNumber: 'Obi Wan Kenobi',
    customerEmail: 'Jedi Master',
    customerID: 'c',
  },
  {
    customerName: 'darthmaul',
    phoneNumber: 'Darth Maul',
    customerEmail: 'Sith Lord',
    customerID: 'b',
  },
  {
    customerName: 'obiwankenobi',
    phoneNumber: 'Obi Wan Kenobi',
    customerEmail: 'Jedi Master',
    customerID: 'c',
  },
]
const waiting =[

]


app.get('/', (req, res) => res.sendFile(path.join(__dirname, 'home.html')));
app.get('/reservation', (req, res) => res.sendFile(path.join(__dirname, 'reservation.html')));
app.get('/tables', (req, res) => res.sendFile(path.join(__dirname, 'tablesAvailable.html')));

app.post('/api/tables', (req, res) => {
    
    const newguest = req.body;
    if(reserved.length > 4){
        waiting.push(newguest);
        const responseobj = {
            openRes: waiting,
            status: 'waitlist'
        }
        if (reserved.length >4&&waiting.length < 0){
          console.log('hello')
          reserved.push(waiting);
          
        }
        return res.json(responseobj)
    
   }

    
    console.log(newguest);
    
    reserved.push(newguest);

    const responseobj = {
        openRes: reserved,
        status: 'reserve'
    }

    return res.json(responseobj);
  });

  app.get('/api/tables', (req, res) => res.json(reserved));
  app.get('/api/waitlist', (req, res) => res.json(waiting));
  app.post('/api/clear', (req, res) => {
reserved.pop();
if(waiting.length> 0){
const newReserved = waiting.shift();
reserved.push(newReserved)
}
  });

app.listen(PORT, () => console.log(`Server is listening on PORT: ${PORT}`));