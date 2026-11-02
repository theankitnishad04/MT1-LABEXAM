import http from 'http';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

let cart = [
    {
        id: 1,
        productName: "Laptop",
        price: 50000,
        quantity: 1
    },
    {
        id: 2,
        productName: "Mouse",
        price: 500,
        quantity: 2
    },
    {
        id: 3,
        productName: "Keyboard",
        price: 1000,
        quantity: 1
    }
];

const server = http.createServer((req, res) => {

    const url = new URL(req.url, 'http://localhost:3000');
    const pathname = url.pathname;

    if (req.method === 'GET' && pathname === '/') {

        res.writeHead(200, {
            'Content-Type': 'text/html'
        });

        res.end('<h1>Welcome to Shopping Cart</h1>');
    }

    else if (req.method === 'GET' && pathname === '/cart') {

        res.writeHead(200, {
            'Content-Type': 'application/json'
        });

        res.end(JSON.stringify(cart));
    }

    else if (req.method === 'GET' && pathname === '/about') {

        res.writeHead(200, {
            'Content-Type': 'text/html'
        });

        res.end('<h1>About Shopping Cart</h1><p>This application manages shopping cart products.</p>');
    }

    else if (req.method === 'GET' && pathname === '/home') {

        const filePath = path.join(__dirname, 'public', 'index.html');

        fs.readFile(filePath, 'utf8', (err, data) => {

            if (err) {

                res.writeHead(500, {
                    'Content-Type': 'text/plain'
                });

                res.end('Error reading HTML file');
            }

            else {

                res.writeHead(200, {
                    'Content-Type': 'text/html'
                });

                res.end(data);
            }
        });
    }

    else if (req.method === 'POST' && pathname === '/add-to-cart') {

        let body = '';

        req.on('data', chunk => {
            body += chunk;
        });

        req.on('end', () => {

            try {

                const product = JSON.parse(body);

                const { id, productName, price, quantity } = product;

                if (
                    id === undefined ||
                    !productName ||
                    typeof productName !== 'string' ||
                    !Number.isFinite(price) ||
                    !Number.isFinite(quantity) ||
                    price <= 0 ||
                    quantity <= 0 ||
                    cart.some(item => item.id === id)
                ) {

                    res.writeHead(400, {
                        'Content-Type': 'application/json'
                    });

                    res.end(JSON.stringify({
                        message: 'Invalid product details'
                    }));

                    return;
                }

                cart.push(product);

                res.writeHead(201, {
                    'Content-Type': 'application/json'
                });

                res.end(JSON.stringify({
                    message: 'Product added successfully',
                    product: product
                }));
            }

            catch (error) {

                res.writeHead(400, {
                    'Content-Type': 'application/json'
                });

                res.end(JSON.stringify({
                    message: 'Invalid JSON data'
                }));
            }
        });
    }

    else {

        res.writeHead(404, {
            'Content-Type': 'text/plain'
        });

        res.end('404 - Page Not Found');
    }

});

server.listen(3000, () => {
    console.log('HTTP Server running at http://localhost:3000');
});