function find_highest_high_candle(msg, start_index, end_index) {
    if (start_index < 0)
        return -1;
    if (end_index < 0)
        end_index = 0;
    var max_index = start_index;
    for (var i = start_index; i >= end_index; i--) {
        if (msg[i].high > msg[max_index].high)
            max_index = i;
    }
    return max_index;
}

function find_lowest_low_candle(msg, start_index, end_index) {
    if (start_index < 0)
        return -1;
    if (end_index < 0)
        end_index = 0;
    var max_index = start_index;
    for (var i = start_index; i >= end_index; i--) {
        if (msg[i].low < msg[max_index].low)
            max_index = i;
    }
    return max_index;
}

function find_period_high(msg, start_index, end_index = 0) {
    if (start_index < 0)
        return -1;
    if (end_index < 0)
        end_index = 0;
    var max = 0;
    for (var i = start_index; i >= end_index; i--) {
        if (msg[i].high > max)
            max = msg[i].high;
    }
    return max;
}

function find_period_low(msg, start_index, end_index = 0) {
    if (start_index <= 0)
        return -1;
    if (end_index < 0)
        end_index = 0;
    var min = 1000000;
    for (var i = start_index; i >= end_index; i--) {
        if (msg[i].low < min)
            min = msg[i].low;
    }
    return min;
}

function get_period_msg(msg, start_index, end_index){
    if (msg[start_index] == undefined || msg[end_index] == undefined){
        return -1;
    }
    var max = 0, min = 1000000;
    var max_index = start_index, min_index = start_index;
    for (var i = start_index; i >= end_index; i--){
        if (msg[i].high > max){
            max = msg[i].high;
            max_index = i;
        }
        if (msg[i].low < min){
            min = msg[i].low;
            min_index = i;
        }
    }
    return {
        high: max,
        low: min,
        height: max - min,
        high_index: max_index,
        low_index: min_index,
    };
}






function find_break_index(msg, high, low, curr_index, last_index = 0) {
    if (msg[curr_index - 1] == undefined)
        return -1;
    if (last_index < 0)
        last_index = 0;
    for (var i = curr_index - 1; i >= last_index; i--) {
        if (msg[i].high > high || msg[i].low < low)
            return i;
    }
    return -1;
}

function find_break_up_index(msg, high, curr_index, last_index = 0) {
    if (msg[curr_index - 1] == undefined)
        return -1;
    if (last_index < 0)
        last_index = 0;
    for (var i = curr_index - 1; i >= last_index; i--) {
        if (msg[i].high > high)
            return i;
    }
    return -1;
}

function find_break_down_index(msg, low, curr_index, last_index = 0) {
    if (msg[curr_index - 1] == undefined)
        return -1;
    if (last_index < 0)
        last_index = 0;
    for (var i = curr_index - 1; i >= last_index; i--) {
        if (msg[i].low < low)
            return i;
    }
    return -1;
}




function find_close_up_index(msg, high, curr_index, last_index = 0) {
    if (curr_index - 1 <= 0)
        return -1;
    if (last_index < 0)
        last_index = 0;
    for (var i = curr_index - 1; i >= last_index; i--) {
        if (msg[i].close > high)
            return i;
    }
    return -1;
}






/*
function find_break(msg, curr_index, high, low, last_index = 1) {
    if (curr_index - 1 <= 0 || last_index < 0)
        return 0;
    for (var i = curr_index - 1; i >= last_index; i--) {
        if (msg[i].high > high || msg[i].low < low)
            return i;
    }
    return 0;
}

function find_break_up(msg, curr_index, high, last_index = 1) {
    if (curr_index - 1 <= 0 || last_index < 0)
        return 0;
    for (var i = curr_index - 1; i >= last_index; i--) {
        if (msg[i].high > high)
            return i;
    }
    return 0;
}

function find_break_down(msg, curr_index, low, last_index = 1) {
    if (curr_index - 1 <= 0 || last_index < 0)
        return 0;
    for (var i = curr_index - 1; i >= last_index; i--) {
        if (msg[i].low < low)
            return i;
    }
    return 0;
}
*/


function period_height(msg, start_index, last_index) {
    var max = 0, min = 1000000;

    if (start_index < 0)
        return -1;
    if (last_index < 0)
        last_index = 0;
    for (var i = start_index; i >= last_index; i--) {
        if (msg[i].high > max)
            max = msg[i].high;
        if (msg[i].low < min)
            min = msg[i].low;
    }
    return max - min;
}

function period_average_height(msg, start_index, end_index) {
    if (start_index < 0)
        return -1;
    if (end_index < 0)
        end_index = 0;
    var sum = 0;

    for (var i = start_index; i >= end_index; i--) {
        sum += msg[i].height;
    }
    return (sum / (start_index - end_index + 1));
}























function get_time_per(com, type, curr_day_index) {
    var m = com[type];
    if (m == undefined || com.day[curr_day_index][type + '_index'] == undefined)
        return -1;
    var pre_period_index = com.day[curr_day_index][type + '_index'] + 1;
    if (pre_period_index >= m.length)
        return -1;
    var curr_msg = m[pre_period_index];
    var p1 = curr_msg.end_day_index - curr_day_index;
    var p2 = curr_msg.start_day_index - curr_msg.end_day_index + 1;
    return (p1 / p2);
}

function period_height_per(com, type, curr_day_index) {
    var m = com[type];
    if (m == undefined || com.day[curr_day_index][type + '_index'] == undefined)
        return -1;
    var pre_period_index = com.day[curr_day_index][type + '_index'] + 1;
    if (pre_period_index >= m.length)
        return -1;
    var first_period = m[pre_period_index];
    var next_period_start_day = first_period.end_day_index - 1;
    if (next_period_start_day < 0)
        next_period_start_day = 0;
    var second_period_height = period_height(com.day, next_period_start_day, curr_day_index);
    return (second_period_height / first_period.height);
}

// function period_height_per(com, type, type_index, next_period_days) {
//     if (type_index <= 0)
//         return 0;
//     var first_period = com[type][type_index];
//     var next_period_start_days = first_period.end_day_index - 1;
//     if (next_period_start_days < 0)
//         next_period_start_days = 0;
//     var second_period_height = period_height(com.day, next_period_start_days, next_period_start_days - next_period_days);
//     return (second_period_height / first_period.height);
// }





function period_average_height_per(com, type, start_index, num, next_period_days) {
    var last_period = start_index - num + 1;
    if (last_period < 0)
        last_period = 0;
    var next_period_start_days = com[type][last_period].end_day_index - 1;
    if (next_period_start_days < 0)
        next_period_start_days = 0;
    var first_period_average_height = period_average_height(com.day, start_index, start_index - num);
    var second_period_height = period_height(com.day, next_period_start_days, next_period_start_days - next_period_days);
    return (second_period_height / first_period_average_height);
}

function period_average_height_per_to_curr(com, type, start_index, num, curr_day_index) {
    var last_period = start_index - num + 1;
    if (last_period < 0)
        last_period = 0;
    var next_period_start_days = com[type][last_period].end_day_index - 1;
    if (next_period_start_days < 0)
        next_period_start_days = 0;
    var first_period_average_height = period_average_height(com.day, start_index, start_index - num);
    var second_period_height = period_height(com.day, next_period_start_days, curr_day_index);

    return (second_period_height / first_period_average_height);
}





function per_of_height_of_period(msg, curr, start, end) {
    var h = find_period_high(msg, start, end);
    var l = find_period_low(msg, start, end);
    if (h == -1 || l == -1)
        return -1;
    var curr_h = msg[curr].high;
    return ((curr_h - l) / (h - l));
}





function period_is_inside(com, type, curr_day_index){
    var m = com[type];
    if (m == undefined || com.day[curr_day_index][type + '_index'] == undefined)
        return -1;
    var pre_period_index = com.day[curr_day_index][type + '_index'] + 1;
    if (pre_period_index >= m.length)
        return -1;
    var first_period = m[pre_period_index];
    var next_period_start_day = first_period.end_day_index - 1;
    if (next_period_start_day < 0)
        next_period_start_day = 0;
    var h = find_period_high(msg, next_period_start_day, curr_day_index);
    var l = find_period_low(msg, next_period_start_day, curr_day_index);
    if (h < first_period.high && l > first_period.low)
        return 1;
    return 0;
}


function period_average_volume(msg, start_index, end_index) {
    if (start_index < 0 || start_index >= msg.length)
        return -1;
    if (end_index < 0)
        end_index = 0;
    var sum = 0;

    for (var i = start_index; i >= end_index; i--) {
        sum += msg[i].volume;
    }
    return (sum / (start_index - end_index + 1));
}