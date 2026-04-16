const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

let products =[];
let productID =1;
let orders =[];
let orderID =1;

app.use(cors());
app.use(bodyParser.json());

app.get('/',(req, res)=>{
    res.send("Backend Task Running");
});


app.post('/products',(req, res)=>{
    const{name, stock}=req.body;

    const product ={
        id: productID++,
        name,
        stock
    };

    products.push(product);

    res.json(product);
});

app.get('/products/:id',(req, res)=>{
    const id = parseInt(req.params.id);
    
    const product = products.find(p=>p.id===id);

    if(!product)
    {
        return res.sendStatus(404).json({message:"product not found"});
    }
    res.json(product);
});

app.post('/orders', (req,res)=>{
    const{ items} = req.body;

    //check stock
    for(let item of items){
        const product = products.find(p=> p.id ==
            item.productID
        );
        if(!product)
        {
            return res.status(404).json({message: "product not found"});
        }
        if (product.stock < item.quantity){
            return res.status(400).json({message:"Insufficient stock"});
        }
    }

    //reserve stock
    for(let item of items){
        const product = products.find(p=> p.id=== item.productID);
        product.stock -= item.quantity;
    }

    const order ={
        id:orderID++,
        items,
        status:"PENDING" 
    };
    setTimeout(()=>{
        if(order.status ==="PENDING"){
            for (let item of order.items)
            {
                const product = products.find(p=>p.id === item.productID);
                if(product)
                {
                    product.stock +=item.quantity;
                }
            }
            order.status="EXPIRED";
            console.log(`Order ${order.id} expired and stock released`);
        }
    },60000);
    orders.push(order);
    res.json(order);
});

app.post('/orders/:id/confirm',(req, res)=>{
    const id = parseInt(req.params.id);

    const order = orders.find(o=>o.id === id);

    if(!order){
        return res.status(404).json({message:"Order not found"});
    }
    if(order.status !=="PENDING"){
        return res.status(400).json({message: "Order already confirmed"});
    }
    order.status = "CONFIRMED";

    res.json({message:"Order confirmed", order});
});

app.listen(3000,()=>{
    console.log("Server running on the port 3000");
});