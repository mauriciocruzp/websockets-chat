const socket = io();


$(function () {
    const socket = io();
    let nick = '';

    const messageForm = $('#messages-form');
    const messageBox = $('#message');
    const chat = $('#chat');

    const nickForm = $('#nick-form');
    const nickError = $('#nick-error');
    const nickName = $('#nick-name');

    const userNames = $('#usernames');

    messageForm.submit(e => {
        e.preventDefault();
        if (messageBox.val() !== '') {
            socket.emit('send message', messageBox.val());

            messageBox.val('');
        }
        messageBox.val('');
    });

    socket.on('new message', function (data) {
        let color = '#f5f4f4';
        let side = 'start';
        if (nick == data.nick) {
            color = '#9ff4c5';
            side = 'end';
        }

        chat.append(`
        <div class="w-100 d-flex justify-content-${side}">
        <div class="w-50">
        <div class="msg-area mb-2" style="background-color:${color}">
            <p class="msg"><b>${data.nick} :</b> ${data.msg}</p>
        </div>
        </div>
        </div>
        `);
    });


    nickForm.submit(e => {
        e.preventDefault();
        console.log('Sending...');
        socket.emit('new user', nickName.val(), data => {
            if (data) {
                nick = nickName.val();
                $('#nick-wrap').hide();
                $('#content-wrap').show();
            } else {
                nickError.html(`
                <div class="alert alert-danger">
                User already exists
                </div>
                `);
            }
            nickName.val('');
        });
    });

    socket.on('usernames', data => {
        let html = '';
        let color = '#000';
        let goOut = '';
        console.log(nick);
        for (let i = 0; i < data.length; i++) {
            if (nick == data[i]) {
                color = '#027f43';
                goOut = `<a class="link-go-out" href="/"><i class="fas fa-sign-out-alt go-out"></i></a>`;
            } else {
                color = '#000';
                goOut = '';
            }
            html += `<p style="color:${color}"><i class="fas fa-user"></i> ${data[i]} ${goOut}</p>`;
        }
        userNames.html(html);
    });

});

function upload(files) {
    socket.emit('upload', files[0], (status) => {
      console.log(status);
    });
  }