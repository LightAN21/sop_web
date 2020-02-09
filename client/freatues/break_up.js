var box_len = 20;

function is_break_up(msg, i, len = 20) {
    if (i < 0 || i >= msg - len - 1)
        return 0;
    var close = msg[i].close;
    for (var k = i + 1; k <= i + len; k++) {
        if (msg[k].high > close)
            return 0;
    }
    return 1;
}

function break_up_list(com, type = 'day') {
    var msg = com[type];
    var list = [];

    for (var i = 0; i < msg.length - box_len - 1; i++) {
        if (is_break_up(msg, i, box_len)) {
            list.push({ index: i, time: msg[i].time });
        }
    }
    return list;
}

function show_break_up_list() {
    console.log('===========================================');
    if (curr_company == 0)
        return;
    if (curr_company != 'all') {
        console.log('break_up_list of '+ curr_company.name + ':');
        console.log(break_up_list(curr_company));
    }
}
