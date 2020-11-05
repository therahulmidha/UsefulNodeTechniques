// Open a connection
var socket = new WebSocket('ws://localhost:9000/');

// When a connection is made
socket.onopen = function () {
    console.log('Opened connection ');

    // send data to the server
    var json = JSON.stringify({ message: 'Hello' });
    socket.send(json);
}

// When data is received
socket.onmessage = function (event) {
    console.log(event.data, (JSON.parse(event.data))['orderLengthGreater']);
    if ((JSON.parse(event.data))['orderLengthGreater'] === true) {
        document.getElementById('notification').style.display = 'block';
        setTimeout(() => {
            document.getElementById('notification').style.display = 'none';
        }, 20000)
    }
    console.log(event.data);
}

// A connection could not be made
socket.onerror = function (event) {
    console.log(event);
}

// A connection was closed
socket.onclose = function (code, reason) {
    console.log(code, reason);
}

// Close the connection when the window is closed
window.addEventListener('beforeunload', function () {
    socket.close();
});