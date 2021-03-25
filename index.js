const express = require('express');
const db = require('./db');
const Products = require('./models/product');

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.get('/', (req, res) => {
    Products.find({ }, (err, products) => {
        if(err) res.status(500).send(err);
        res.send(products);
    })
});


app.post('/product', (req, res) => {

    Products.create(req.body, (err, success) => {
        if(err) res.status(500).send(err);
        res.status(200).send(success);
    });
});

app.route('/product/:id')
    .get((req, res) => {
        Products.find({ _id: req.params.id }, (err, products) => {
            if(err) res.status(500).send(err);
            res.status(200).send(products);
        });
    })
    .put((req, res) => {

        Products.updateOne({ _id: req.params.id }, req.body, (err, success) => {
            if(err) res.status(500).send(err);
            res.status(200).send(success);
        });
    })
    .delete((req, res) => {

        Products.remove({ _id: req.params.id }, (err, success) => {
            if(err) res.status(500).send(err);
            res.status(200).send(success);
        });
    });


const port = 3000;
app.listen(port, () => {
    console.log(`listening on port ${port}`);
});