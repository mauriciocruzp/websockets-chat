module.exports = (io) => {

    let nickNames = [];

    io.on('connection', socket => {
        console.log('New user conected');

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