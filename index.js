/**
 * Created by User on 28.03.2015.
 */
var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);


app.get('/', function(req, res) {
    res.sendFile(__dirname + '/index.html');
});

var firstTurn = false;

io.on('connection', function(socket) {
    socket.on('choose side', function() {
        if (!firstTurn) {
            firstTurn = true;
            socket.emit('set side', {'playerSide': 'x'});
            socket.broadcast.emit('set side', {'playerSide': 'o'});
        }
        console.log(firstTurn);
    });

    socket.on('click', function(data) {
        socket.emit('turn', {'boardCells': data.boardCells, 'youTurn': false});
        socket.broadcast.emit('turn', {'boardCells': data.boardCells, 'youTurn': true});
    });

    socket.on('disconnect', function() {
        firstTurn = false;
    });
});

http.listen(3000, function() {
    console.log('Server started');
});