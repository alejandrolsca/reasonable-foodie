`use strict`;
//////////////////////////////////////////
// Run node in cluster mode 
// (Use all the cores available,
// node uses one by default)
////////////////////////////////////////// 

// Include the cluster module
const cluster = require('cluster');

// Code to run if we`re in the master process
if (cluster.isMaster) {

    // Count the machine`s CPUs
    const numWorkers = require('os').cpus().length;

    console.log(`Master cluster setting up ${numWorkers} workers...`);

    // Create a worker for each CPU
    for (let i = 0; i < numWorkers; i++) {
        cluster.fork();
    }

    // Listen for online workers
    cluster.on(`online`, function (worker) {
        console.log(`Worker ${worker.process.pid} is online`);
    });

    // Listen for dying workers
    cluster.on(`exit`, function (worker, code, signal) {
        console.log(`Worker ${worker.process.pid} died with code: ${code}, and signal: ${signal}`);
        console.log(`Starting a new worker`);
        cluster.fork();
    });

    // Code to run if we`re in a worker process
} else {

    //////////////////////////////////////////
    // Packages required
    //////////////////////////////////////////
    const express = require('express'),
        requestPromise = require('request-promise'),
        ConnectHistoryAPIFallback = require('connect-history-api-fallback'),
        bodyParser = require('body-parser'),
        cors = require('cors'),
        path = require('path');

    //////////////////////////////////////////
    // Express setup
    //////////////////////////////////////////
    const app = express();
    app.use(ConnectHistoryAPIFallback());
    app.use(cors());
    app.use(bodyParser.json()); // support json encoded bodies
    app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies
    app.use(`/`, express.static(path.join(__dirname, `dist`)));

    ////////////////////////////////////////////////////////////////
    // Select Google Places API Key
    ////////////////////////////////////////////////////////////////

    const googlePlacesApiEnv = [
        { env: 'local', key: 'AIzaSyDtysoqSjK3xv6FhlZSAsBk3RwS-Rm_k3k' },
        { env: 'dev', key: 'AIzaSyDtysoqSjK3xv6FhlZSAsBk3RwS-Rm_k3k' },
        { env: 'test', key: 'AIzaSyDtysoqSjK3xv6FhlZSAsBk3RwS-Rm_k3k' },
        { env: 'prod', key: 'AIzaSyDtysoqSjK3xv6FhlZSAsBk3RwS-Rm_k3k' },
    ].find((gpa) => {
        return gpa.env === process.env.ENV
    })

    ////////////////////////////////////////////////////////////////
    // Define APIs
    ////////////////////////////////////////////////////////////////

    app.post(`/api/place/details`, function (req, res) {
        requestPromise({
            method: `GET`,
            uri: `https://maps.googleapis.com/maps/api/place/details/json?placeid=${req.body.place_id}&key=${googlePlacesApiEnv.key}`
        }).then(function (data) {
            return res.send(data);
        });
    });

    app.post(`/api/place/nearbytype`, function (req, res) {
        requestPromise({
            method: `GET`,
            uri: `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${req.body.location}&radius=${req.body.radius}&type=${req.body.type}&key=${googlePlacesApiEnv.key}`
        }).then(function (data) {
            return res.send(data);
        });
    });

    //////////////////////////////////////////
    // Run server
    //////////////////////////////////////////
    const server = app.listen(3000, function () {
        const port = server.address().port;
        console.log(`Server running on worker %d listening at port: %s`, cluster.worker.id, port);
    });

    console.log(`Worker %d running!`, cluster.worker.id);
}