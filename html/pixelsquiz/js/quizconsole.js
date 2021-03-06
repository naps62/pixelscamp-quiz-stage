function _send_command(cmd) {
    $.post('/actions/'+ cmd)

}

function send_command(ev) {
    _send_command($(ev.target).attr('id'));
}

$("#commands button").each(function (idx) {
    $(this).click(send_command);
})

$("#buzzed button").each(function (idx) {
    $(this).click(function (e) {
        _send_command($(e.target).attr('id'));
        $("#buzzed .buzzed-text").removeClass("text-highlight");
    });
})

function get_right_wrong(team) {
    $("#buzzed .buzzed-team").text(team + 1);
    $("#buzzed .buzzed-text").addClass("text-highlight");
}

var ws = null;
var status_counter = 0;

function start() {
    console.log('starting ws');
    ws = new WebSocket("ws://" + document.location.host +"/displays");
    ws.onopen = function (event) {
        ws.send(JSON.stringify({"kind": "quizmaster-auth"}))
    }
    ws.onmessage = function (event) {
        var msg = JSON.parse(event.data);
        console.log(event.data);

        if (msg.do === 'quizmaster-only') {
            if ('getrightwrong' in msg) {
                get_right_wrong(msg.getrightwrong);
            } else {
                $('#question .qz_question').html(msg.question);
                $('#question .qz_answer').text(msg.answer);
                $('#question .qz_trivia').html(msg.trivia);
            }
        } else if (msg.do === 'timer-update') {
            $('#timer_number').text(msg.value);
        }

        if (msg.do !== 'timer-update') {  // ...reduce noise.
            var status_box = $('#status');
            status_box.text(status_box.text() + status_counter + ': ' + event.data + '\n');
            status_box.animate({scrollTop: status_box.prop('scrollHeight')}, 500);
            status_counter++;
        }
    }
}

function check() {
    if(!ws || ws.readyState == 3) start();
}

check();

setInterval(check, 3000);
