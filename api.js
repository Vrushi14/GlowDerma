import express from 'express';

const app = express();

let PORT = 5000;

app.use(express.json());

app.use((req, res, next) => {
    const currentDateTime = new Date().toISOString();
    console.log(`${currentDateTime} | ${req.method} | ${req.path}`);
    next();
});


app.use(express.static("assets"));

// const limiter = rateLimit({
//     windowMs: 5 * 60 * 1000, 
//     max: 5, 
//     message: "Sorry, you have exhausted your plan.",
// });
// app.use(limiter);

app.get("/", (req, res) => {
    res.send("Welcome to GlowDerma - Your Skincare Journey Begins Here");
});

app.get("/about", (req, res) => {
    res.send("<h3>We are a premium skincare brand committed to bringing you dermatologist-approved, clean beauty products</h3>");
});

app.get("/contact", (req, res) => {
    res.send({
        email: "care@glowderma.com",
        instagram: "http://instagram.com/glowderma",
        consultation: "http://glowderma.com/book-appointment",
    });
});

let products = [
    { id: 11, name: "Retinol Serum", price: 1200, availableQty: 50 },
    { id: 12, name: "Niacinamide Solution", price: 800, availableQty: 30 },
];
let orders = [
    { id: 1, product: 'Anti-Aging Serum', quantity: 2 },
];

app.get("/orders/:orderID", (req, res) => {
    const orderID = parseInt(req.params.orderID);
    const order = orders.find(order => order.id === orderID);
    if (order) {
        res.status(200).json(order);
    } else {
        res.status(404).send("Order Not Found");
    }
});

app.get("/products", (req, res) => {
    const { name, maxPrice } = req.query;
    let filteredProducts = products;

    if (name) {
        filteredProducts = filteredProducts.filter(product =>
            product.name.toLowerCase().includes(name.toLowerCase())
        );
    }

    if (maxPrice) {
        filteredProducts = filteredProducts.filter(product =>
            product.price <= parseInt(maxPrice, 10)
        );
    }

    res.status(200).json(filteredProducts);
});


app.use((req, res, next) => {
    res.status(404).send("We don't have this page yet!");
});

app.use((err, req, res, next) => {
    console.error(err);
    res.status(500).send("Sorry! Something went wrong.");
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
