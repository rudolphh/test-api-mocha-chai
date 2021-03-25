let chai= require('chai');
let chaiHttp = require('chai-http');
let expect=chai.expect;
chai.use(chaiHttp);

describe('Testing Rest API',()=>{ 

    describe('base and invalid route', () => {

    // '/' route which returns all products
        it('returns status 200 on "/" route', () => { // <= Pass in done callback
            return chai.request('http://localhost:3000')
            .get('/')
            .then(res => {
                expect(res).to.have.status(200);
            })
            .catch(err => {
                throw err;
            });
        });

        it('returns status 404 on wrong route', () =>{ 
            return chai.request('http://localhost:3000') 
            .get('/blah') 
            .then((res) =>{ 
                expect(res).to.have.status(404);
            })
            .catch((err) => { throw err });
        });

    });

    describe('post product API', () => {

    // post to '/product'

        it('returns created object name="apple sauce"', () => { 
            
            return chai.request('http://localhost:3000') 
            .post('/product') 
            .set('content-type', 'application/x-www-form-urlencoded')
            .send({
                'name': 'apple sauce',
                'qty': 10,
                'price': '0.58'
            })
            .then((res) =>{ 
                expect(res.body).to.have.property("name", "apple sauce");
            })
            .catch(err => { throw err });
        });

        it('returns status 500 on bad post request', () =>{ 
            return chai.request('http://localhost:3000') 
            .post('/product')
            .then((res)=>{ 
                expect(res).to.have.status(500);
            })
            .catch(err => { throw err });
        });

    });

    describe('product/:id endpoints - get, put', () => {

        // get '/product/:id'
        it('returns product with _id "605a56e78a17e94f1cb1bc44" and has qty: 3', () =>{ 
            return chai.request('http://localhost:3000') 
            .get('/product/605a56e78a17e94f1cb1bc44') 
            .then((res) =>{ 
                expect(res.body[0]).to.have.property("qty", 3);
            }) 
            .catch((err) => { throw err });
        });

        it('returns status 500 for product _id : 1234', () =>{ 
            return chai.request('http://localhost:3000') 
            .get('/product/1234') 
            .then((res) =>{ 
                expect(res).to.have.status(500);
            }) 
            .catch((err) => { throw err });
        });

        // put '/product/:id'
        it('returns status 200 after updating product _id "605a5ce135dd4cc6a967d779" with qty 3', () =>{ 
            return chai.request('http://localhost:3000') 
            .put('/product/605a5ce135dd4cc6a967d779')
            .set('content-type', 'application/x-www-form-urlencoded')
            .send({
                'qty': 3,
            })
            .then((res) =>{ 
                expect(res).to.have.status(200);
            }) 
            .catch((err) => { throw err });
        });

        it('returns status 500 when failing to update product _id "605a5ce135dd4cc6a967d779" with invalid property value', () =>{ 
            return chai.request('http://localhost:3000') 
            .put('/product/605a5ce135dd4cc6a967d779')
            .set('content-type', 'application/x-www-form-urlencoded')
            .send({
                'qty': "three",
            })
            .then((res) =>{ 
                expect(res).to.have.status(500);
            }) 
            .catch((err) => { throw err });
        });

    });


    describe('product/:id endpoints - delete', () => {

        // delete '/product/:id'
        it('returns status 200 after deleting product with _id 605cadb39dc6b3110bedb539', () =>{ 
            return chai.request('http://localhost:3000') 
            .delete('/product/605cadb39dc6b3110bedb539') 
            .then((res) =>{ 
                expect(res).to.have.status(200);
            }) 
            .catch((err) => { throw err });
        });

        it('returns status 500 after failed to delete product with _id : 1234', () =>{ 
            return chai.request('http://localhost:3000') 
            .delete('/product/1234') 
            .then((res) =>{ 
                expect(res).to.have.status(500);
            }) 
            .catch((err) => { throw err });
        });

    });

});