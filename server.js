'use strict';

const portfinder = require('portfinder');

console.log('Finding available port...');

portfinder.getPort({
    port: 3000
}, function (err, port) {
    if (err) {
        throw err;
    }

    // `port` is guaranteed to be a free port in this scope.

    console.log('Setting up service discovery url...');

    let serviceDiscovery = JSON.stringify({
        serviceUrl: "http://localhost:" + port
    });
    const fs = require('fs');
    fs.writeFileSync('public/serviceDiscovery.json', serviceDiscovery);

    console.log('Starting server at: http://localhost:' + port);
    const jsonServer = require('json-server');
    const server = jsonServer.create();
    const router = jsonServer.router('./db.json');
    const middlewares = jsonServer.defaults();

    server.use(middlewares);
    server.use(router);
    server.listen(port);
    console.log('Server running at: http://localhost:' + port);
});