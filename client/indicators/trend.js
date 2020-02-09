
function find_trend_start_day(com, type = 'day') {
    var msg = com[type];
    var i = msg.length - 2;

    while (i > 0) {
        var u = find_next_up_fractal(msg, i);
        if (u == 0) break;

        var next = find_next_fractal(msg, u);
        if (next == 0) break;
        if (is_down_fractal(msg, next)) {
            if (msg[u].low >= msg[next].high)
                return (next);
            else {
                var high = msg[next].high;
                var low = msg[u].low;
                var b = find_break_index(msg, high, low, next);
                if (b == -1) {
                    i = next;
                    continue;
                };
                if (msg[b].high > high)
                    return u;
                else if (msg[b].low < low)
                    return next;
            }
        }
        var d = find_next_down_fractal(msg, next);
        if (d == 0)
            break;
        i = next + 1;
    }
    return 0;
}







function get_trend(com, type = 'day') {
    var msg = com[type];
    var start = find_trend_start_day(com, type);
    if (start == 0) {
        for (var i = msg.length - 1; i >= 0; i--) {
            msg[i].trend = 'unknown';
            msg[i].lag_trend = 'unknown';
        }
        return;
    }
    //console.log(com.name);
    //console.log("start: " + msg[start].time);
    for (var i = msg.length - 1; i > start; i--) {
        msg[i].trend = 'unknown';
        msg[i].lag_trend = 'unknown';
    }

    var curr_trend;
    if (is_up_fractal(msg, start))
        curr_trend = 1;
    else
        curr_trend = -1;
    msg[start].trend = (curr_trend == 1) ? 'up' : 'down';
    msg[start].lag_trend = (curr_trend == 1) ? 'up' : 'down';

    var break_days = [];
    var previous_start = start;
    var origin_start = start;
    var i = start - 1;
    while (i >= 0) {
        if (curr_trend == 1) {
            if (msg[i].low >= msg[start].low) {
                if (is_up_fractal(msg, i)) {
                    start = i;
                    msg[i].update = 'up';
                }
                msg[i].trend = 'up';
                if (msg[i].lag_trend == undefined){
                    msg[i].lag_trend = 'up';
                }
            }
            else {
                if (msg[i].lag_trend == undefined){
                    msg[i].lag_trend = 'down';
                }
                var break_msg = {
                    index: i,
                    direction: "down",
                    time: msg[i].time,
                    break_start_index: start,
                    break_origin_start_index: origin_start,
                    time: msg[start].time + ", origin: " + msg[origin_start].time
                };
                var highset_high = find_highest_high_candle(msg, origin_start, i);
                if (msg[i].high > msg[highset_high].high)
                    highset_high = i;
                if (highset_high == previous_start && previous_start == origin_start) {
                    highset_high = find_highest_high_candle(msg, origin_start - 1, i);
                    if (msg[i].high > msg[highset_high].high)
                        highset_high = i;
                    msg[origin_start].trend = 'switch down up';
                    origin_start = highset_high;
                }
                else {
                    previous_start = origin_start;
                    origin_start = highset_high;
                }
                msg[highset_high].trend = 'switch down';
                // console.log("highest_high: " + msg[highset_high].time);

                for (var k = highset_high - 1; k >= i; k--) {
                    msg[k].trend = 'down';
                }

                break_msg.highset_high_index = highset_high;
                break_days.push(break_msg);

                start = highset_high;
                i = highset_high - 1;
                curr_trend = -1;
                continue;
            }
        }
        else {
            if (msg[i].high <= msg[start].high) {
                if (is_down_fractal(msg, i)) {
                    start = i;
                    msg[i].update = 'down';
                }
                msg[i].trend = 'down';
                if (msg[i].lag_trend == undefined){
                    msg[i].lag_trend = 'down';
                }
            }
            else {
                if (msg[i].lag_trend == undefined){
                    msg[i].lag_trend = 'up';
                }
                var break_msg = {
                    index: i,
                    direction: "up",
                    time: msg[i].time,
                    break_start_index: start,
                    break_origin_start_index: origin_start,
                    time: msg[start].time + ", origin: " + msg[origin_start].time
                };
                var lowest_low = find_lowest_low_candle(msg, origin_start, i);
                if (msg[i].low < msg[lowest_low].low)
                    lowest_low = i;
                if (lowest_low == previous_start && previous_start == origin_start) {
                    lowest_low = find_lowest_low_candle(msg, origin_start - 1, i);
                    if (msg[i].low < msg[lowest_low].low)
                        lowest_low = i;
                    msg[origin_start].trend = 'switch up down';
                    origin_start = lowest_low;
                }
                else {
                    previous_start = origin_start;
                    origin_start = lowest_low;
                }
                msg[lowest_low].trend = 'switch up';
                //console.log("lowest_low: " + msg[lowest_low].time);

                for (var k = lowest_low - 1; k >= i; k--) {
                    msg[k].trend = 'up';
                }

                break_msg.lowest_low_index = lowest_low;
                break_days.push(break_msg);

                start = lowest_low;
                i = lowest_low - 1;
                curr_trend = 1;
                continue;
            }
        }
        // console.log(msg[i].time + " start: " + msg[start].time + ", origin_start: " + msg[origin_start].time + " curr_trend: " + curr_trend + " curr_LAG_trend: " + msg[i].lag_trend);
        i--;
    }
    for (var i = 0; i < break_days.length; i++) {
        msg[break_days[i].index].break = break_days[i];
    }
}


