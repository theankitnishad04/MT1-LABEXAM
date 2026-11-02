import express from 'express';

const app = express();

app.use(express.json());

let cart = [
    {
        id: 1,
        productName: "Wireless Mouse",
        price: 799,
        quantity: 2,
        category: "Electronics"
    },
    {
        id: 2,
        productName: "Laptop",
        price: 50000,
        quantity: 1,
        category: "Electronics"
    },
    {
        id: 3,
        productName: "Keyboard",
        price: 1200,
        quantity: 1,
        category: "Electronics"
    }
];

app.get('/cart', (req, res) => {

    res.status(200).json(cart);

});

app.get('/cart/:id', (req, res) => {

    const id = Number(req.params.id);

    const product = cart.find(item => item.id === id);

    if (!product) {

        return res.status(404).json({
            message: 'Product not found'
        });
    }

    const totalPrice = product.price * product.quantity;

    res.status(200).json({
        ...product,
        totalPrice: totalPrice
    });

});

app.post('/cart', (req, res) => {

    const { id, productName, price, quantity, category } = req.body;

    if (
        id === undefined ||
        !productName ||
        typeof productName !== 'string' ||
        !Number.isFinite(price) ||
        !Number.isFinite(quantity) ||
        !category ||
        price <= 0 ||
        quantity <= 0 ||
        cart.some(item => item.id === id)
    ) {

        return res.status(400).json({
            message: 'Invalid product details'
        });
    }

    const product = {
        id,
        productName,
        price,
        quantity,
        category
    };

    cart.push(product);

    res.status(201).json({
        message: 'Product added successfully',
        product: product
    });

});

app.put('/cart/:id', (req, res) => {

    const id = Number(req.params.id);

    const index = cart.findIndex(item => item.id === id);

    if (index === -1) {

        return res.status(404).json({
            message: 'Product not found'
        });
    }

    const updatedProduct = {
        ...cart[index],
        ...req.body,
        id: cart[index].id
    };

    if (
        !updatedProduct.productName ||
        !Number.isFinite(updatedProduct.price) ||
        !Number.isFinite(updatedProduct.quantity) ||
        !updatedProduct.category ||
        updatedProduct.price <= 0 ||
        updatedProduct.quantity <= 0
    ) {

        return res.status(400).json({
            message: 'Invalid product details'
        });
    }

    cart[index] = updatedProduct;

    res.status(200).json({
        message: 'Product updated successfully',
        product: updatedProduct
    });

});

app.delete('/cart/:id', (req, res) => {

    const id = Number(req.params.id);

    const index = cart.findIndex(item => item.id === id);

    if (index === -1) {

        return res.status(404).json({
            message: 'Product not found'
        });
    }

    const deletedProduct = cart.splice(index, 1);

    res.status(200).json({
        message: 'Product deleted successfully',
        product: deletedProduct[0]
    });

});

app.use((req, res) => {

    res.status(404).json({
        message: 'Route not found'
    });

});

app.listen(4000, () => {

    console.log('Express Server running at http://localhost:4000');

});