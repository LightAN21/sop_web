// is fractal //

function is_up_fractal(msg, now, pre = now + 1, next = now - 1) {
    now = msg[now];
    pre = msg[pre];
    next = msg[next];
    if (now == undefined || pre == undefined || next == undefined)
        return 0;
    if (now.low <= pre.low && now.low < next.low)
        return 1;
    return 0;
}

function is_down_fractal(msg, now, pre = now + 1, next = now - 1) {
    now = msg[now];
    pre = msg[pre];
    next = msg[next];
    if (now == undefined || pre == undefined || next == undefined)
        return 0;
    if (now.high >= pre.high && now.high > next.high)
        return 1;
    return 0;
}

function is_fractal(msg, now, pre = now + 1, next = now - 1) {
    if (is_up_fractal(msg, now, pre, next) || is_down_fractal(msg, now, pre, next))
        return 1;
    return 0;
}

// find next fractal //

function find_next_up_fractal(msg, curr_index, last_index = 1) {
    if (curr_index <= 0)
        return -1;
    if (last_index <= 0)
        last_index = 1;
    for (var i = curr_index - 1; i >= last_index; i--) {
        if (is_up_fractal(msg, i))
            return i;
    }
    return -1;
}

function find_next_down_fractal(msg, curr_index, last_index = 1) {
    if (curr_index <= 0)
        return -1;
    if (last_index <= 0)
        last_index = 1;
    for (var i = curr_index - 1; i >= last_index; i--) {
        if (is_down_fractal(msg, i))
            return i;
    }
    return -1;
}

function find_next_fractal(msg, curr_index, last_index = 1) {
    if (curr_index <= 0)
        return -1;
    if (last_index <= 0)
        last_index = 1;
    for (var i = curr_index - 1; i >= last_index; i--) {
        if (is_fractal(msg, i))
            return i;
    }
    return -1;
}

// find previous fractal //

function find_previous_fractal(msg, curr_index, last_index = msg.length - 1) {
    if (curr_index >= msg.length - 1)
        return -1;
    if (last_index >= msg.length)
        last_index = msg.length - 1;
    for (var i = curr_index + 1; i <= last_index; i++) {
        if (is_fractal(msg, i))
            return i;
    }
    return -1;
}

function find_previous_down_fractal(msg, curr_index, last_index = msg.length - 1) {
    if (curr_index >= msg.length - 1)
        return -1;
    if (last_index >= msg.length)
        last_index = msg.length - 1;
    for (var i = curr_index + 1; i <= last_index; i++) {
        if (is_down_fractal(msg, i))
            return i;
    }
    return -1;
}

function find_previous_up_fractal(msg, curr_index, last_index = msg.length - 1) {
    if (curr_index >= msg.length - 1)
        return -1;
    if (last_index >= msg.length)
        last_index = msg.length - 1;
    for (var i = curr_index + 1; i <= last_index; i++) {
        if (is_up_fractal(msg, i))
            return i;
    }
    return -1;
}


// fractal list //

function get_fractal_list(com, type = 'day') {
    if (com.fractal == undefined)
        com.fractal = {};
    var msg = com[type];
    var list = [];
    var i = find_next_fractal(msg, msg.length - 1);

    while (i >= 0 && i < msg.length) {
        list.push({index: i, time: msg[i].time});
        i = find_next_fractal(msg, i);
    }
    // com.fractal[type] = list;
    return list;
}

function get_up_fractal_list(com, type = 'day') {
    if (com.fractal == undefined)
        com.fractal = {};
    var msg = com[type];
    var list = [];
    var i = find_next_up_fractal(msg, msg.length - 1);

    while (i >= 0 && i < msg.length) {
        list.push({index: i, time: msg[i].time});
        i = find_next_up_fractal(msg, i);
    }
    // com.fractal[type] = list;
    return list;
}

function get_down_fractal_list(com, type = 'day') {
    if (com.fractal == undefined)
        com.fractal = {};
    var msg = com[type];
    var list = [];
    var i = find_next_down_fractal(msg, msg.length - 1);

    while (i >= 0 && i < msg.length) {
        list.push({index: i, time: msg[i].time});
        i = find_next_down_fractal(msg, i);
    }
    // com.fractal[type] = list;
    return list;
}

// function get_down_up_fractal_list_com(com, type = 'day') {
//     var msg = com[type];
//     var list = [];

//     if (com.fractal == undefined || com.fractal[type] == undefined) {
//         get_fractal_list_com(com, type);
//     }
//     if (com.down_up_fractal == undefined) {
//         com.down_up_fractal = {};
//     }
//     var fractal = com.fractal[type];
//     for (var i = 0; i < fractal.length - 1; i++) {
//         if (is_up_fractal(msg, fractal[i])
//             && is_down_fractal(msg, fractal[i + 1])
//             && msg[fractal[i + 1]].high > msg[fractal[i]].low) {
//             list.push({
//                 down: fractal[i + 1],
//                 up: fractal[i],
//                 down_time: msg[fractal[i + 1]].time,
//                 up_time: msg[fractal[i]].time,
//                 time: msg[fractal[i + 1]].time + ' to ' + msg[fractal[i]].time,
//                 high: msg[fractal[i + 1]].high,
//                 low: msg[fractal[i]].low,
//                 height: msg[fractal[i + 1]].high - msg[fractal[i]].low,
//             });
//         }
//     }
//     com.down_up_fractal[type] = list;
// }
