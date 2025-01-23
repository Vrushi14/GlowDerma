import express from 'express';

const app = express();

let PORT = 5000;

app.use(express.json());

app.get("/", (req, res) => {
    res.send("Welcome to GlowDerma - Your Skincare Journey Begins Here");
});

let shoppingCart = []

app.get("/cart",(req,res)=>{
    res.json(shoppingCart)
})

app.post("/cart",(req,res)=>{
    console.log(req.body)
    const {id,name,price,qty} = req.body
    if (!id || !name || !price || !qty){
        res.status(400).json({"error":"Please enter all the required fields"})
    }
    let x = {id,name,price,qty}
    shoppingCart.push(x)
    res.json({"message":"Successfully inserted into cart", data:x})
})

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});