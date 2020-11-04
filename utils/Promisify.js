const http = require('http');

function requestUsingCallback(host, path, callback) {
    http.get({
        hostname: host,
        path: path,
        method: 'GET',
        headers: { "content-type": "application/json" }
    }, (res) => {
        let bodyData = [];
        res.on('data', (chunk) => {
            bodyData.push(chunk);
        });
        res.on('end', () => {
            if (!res.complete) {
                callback(true, new Error('The connection was terminated while the message was still being sent'));
            }
            const parsedBody = Buffer.concat(bodyData).toString();
            callback(false, parsedBody);
        });

    });
}

// calling callback function
requestUsingCallback('dummy.restapiexample.com', '/api/v1/employees/', (err, data) => {
    if (err) {
        console.log(err);
        return;
    }
    console.log(data);
});

// promisify function
function requestUsingPromise(host, path) {
    return new Promise((resolve, reject) => {
        requestUsingCallback(host, path, (err, data) => {
            if (err) {
                reject(err);
            }
            resolve(data);
        });
    })
}

// calling promisify function
requestUsingPromise('dummy.restapiexample.com', '/api/v1/employees/')
    .then(data => {
        console.log(data);
    })
    .catch(err => {
        console.log(err);
    })