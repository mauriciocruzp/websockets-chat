const fs = require('fs');

module.exports = (io) => {

    let nickNames = [];

    io.on('connection', socket => {
        console.log('New user conected');

        socket.on('new image', (file, callback) => {
            console.log(file);

            io.sockets.emit('new image message', {
                msg: file,
                nick: socket.nickname
            });
            fs.writeFile("images/img", file, (err) => {
                callback({ message: err ? "failure" : "success" });
              });
        });

        socket.on('send message', (data) => {
            io.sockets.emit('new message', {
                msg: data,
                nick: socket.nickname
            });
        });


        socket.on('new user', (data, callback) => {

            if (nickNames.indexOf(data) != -1) {
                callback(false);
            } else {
                callback(true);
                socket.nickname = data;
                nickNames.push(socket.nickname);
                updateUsers();
            }
        });

        socket.on('disconnect', data => {
            if (!socket.nickname) {
                return;
            } else {
                nickNames.splice(nickNames.indexOf(socket.nickname), 1);
                updateUsers();
            }
        });

        function updateUsers() {
            io.sockets.emit('usernames', nickNames);
        }

    });
}