const express = require('express');
const app = express();

app.use(express.json());

const carBrand = [
    {id: 1, name: 'Lamborgini'},
    {id: 2, name: 'Mustang'},
    {id: 3, name: 'Chevrolet'},
    {id: 4, name: 'Ford'},
    {id: 5, name: 'Tesla'},
];

// List of all datas, json
app.get('/api/carBrand', (req, res) => {
    res.send(carBrand);
});

// Locating a specific data
app.get('/api/carBrand/:id', (req, res) => {
    const car = carBrand.find(c => c.id === parseInt(req.params.id));
    if(!car) req.send(404).send('The car that your looking for is not visible.');
    res.send(car);
});

// POST
app.post('/api/carBrand', (req, res) => {
    if (!req.body.name || req.body.name < 3){
        res.status(400).send('The name should be in minimum of 3 characters.');
        return;
    }
    const car = {
        id: carBrand.length + 1,
        name: req.body.name
    };
    carBrand.push(car);
    res.send(car);
});

// PUT
app.put('/api/carBrand/:id', (req, res) => {
    const car = carBrand.find(c => c.id === parseInt(req.params.id));
    if(!car) req.status(404).send('The car with the given ID is not found.');
    car.name = req.body.name;
    res.send(car);
});

// DELETE
app.delete('/api/carBrand/:id', (req, res) => {
    const car = carBrand.find(c => c.id === parseInt(req.params.id));
    if(!car) req.status(404).send('The car with the given ID is not found.');

    const index = carBrand.indexOf(car);
    carBrand.splice(index, 1);
    res.send(car);
});

app.listen(3000, () => console.log('Listening on port 3000...'));