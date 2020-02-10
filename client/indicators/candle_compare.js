function is_up_candle(candle) {
    if (candle.open < candle.close)
        return 1;
    return 0;
}

function is_down_candle(candle) {
    if (candle.open > candle.close)
        return 1;
    return 0;
}

function is_doji_candle(candle) {
    if (candle.open == candle.close)
        return 1;
    return 0;
}





function is_up(msg, now, compare = now + 1) {
    now = msg[now];
    compare = msg[compare];
    if (now == undefined || compare == undefined)
        return 0;
    if (now.high > compare.high && now.low >= compare.low)
        return 1;
    return 0;
}

function is_strict_up(msg, now, compare = now + 1) {
    now = msg[now];
    compare = msg[compare];
    if (now == undefined || compare == undefined)
        return 0;
    if (now.high > compare.high && now.low > compare.low)
        return 1;
    return 0;
}

function is_up_equal(msg, now, compare = now + 1) {
    now = msg[now];
    compare = msg[compare];
    if (now == undefined || compare == undefined)
        return 0;
    if (now.high > compare.high && now.low == compare.low)
        return 1;
    return 0;
}








function is_down(msg, now, compare = now + 1) {
    now = msg[now];
    compare = msg[compare];
    if (now == undefined || compare == undefined)
        return 0;
    if (now.high <= compare.high && now.low < compare.low)
        return 1;
    return 0;
}

function is_strict_down(msg, now, compare = now + 1) {
    now = msg[now];
    compare = msg[compare];
    if (now == undefined || compare == undefined)
        return 0;
    if (now.high < compare.high && now.low < compare.low)
        return 1;
    return 0;
}

function is_down_equal(msg, now, compare = now + 1) {
    now = msg[now];
    compare = msg[compare];
    if (now == undefined || compare == undefined)
        return 0;
    if (now.high == compare.high && now.low < compare.low)
        return 1;
    return 0;
}







function is_inside(msg, now, compare = now + 1) {
    now = msg[now];
    compare = msg[compare];
    if (now == undefined || compare == undefined)
        return 0;
    if (now.high <= compare.high && now.low >= compare.low)
        return 1;
    return 0;
}

function is_outside(msg, now, compare = now + 1) {
    now = msg[now];
    compare = msg[compare];
    if (now == undefined || compare == undefined)
        return 0;
    if (now.high > compare.high && now.low < compare.low)
        return 1;
    return 0;
}








function is_outside_inside(msg, now, pre = now + 1, next = now - 1) {
    if (is_outside(msg, now) && is_inside(msg, next))
        return 1;
    return 0;
}
function is_ouside_up(msg, now, pre = now + 1, next = now - 1) {
    if (is_outside(msg, now) && is_strict_up(msg, next))
        return 1;
    return 0;
}
function is_down_inside(msg, now, pre = now + 1, next = now - 1) {
    if (is_down(msg, now) && is_inside(msg, next))
        return 1;
    return 0;
}
function is_down_up(msg, now, pre = now + 1, next = now - 1) {
    if (is_down(msg, now) && is_strict_up(msg, next))
        return 1;
    return 0;
}








function has_pattern_in_period(msg, start, end, is_pattern) {
    if (start < 0 || start >= msg.length)
        return -1;
    if (end < 0)
        end = 0;
    var candles = [];
    for (var i = start; i >= end; i--) {
        if (is_pattern(msg, i))
            candles.push(i);
    }
    if (candles.length > 0)
        return candles;
    return -1;
}







function candle_cover_price(msg, index, price) {
    if (msg[index] == undefined)
        return 0;
    var x = msg[index];
    if (x.low <= price && price <= x.high)
        return 1;
    return 0;
}







function is_gap_up_per(msg, per, curr, pre = curr + 1) {
    curr = msg[curr];
    pre = msg[pre];
    if (curr == undefined || pre == undefined) {
        return 0;
    }
    if (curr.open / pre.close >= 1 + per)
        return curr.open / pre.close;
    return 0;
}






function is_gap_down(msg, curr, pre = curr + 1) {
    curr = msg[curr];
    pre = msg[pre];
    if (curr == undefined || pre == undefined) {
        return 0;
    }
    if (curr.high < pre.low) {
        return 1;
    }
    return 0;
}

function is_gap_up(msg, curr, pre = curr + 1) {
    curr = msg[curr];
    pre = msg[pre];
    if (curr == undefined || pre == undefined) {
        return 0;
    }
    if (curr.low > pre.high) {
        return 1;
    }
    return 0;
}

function is_above_body(msg, curr, pre = curr + 1) {
    curr = msg[curr];
    pre = msg[pre];
    if (curr == undefined || pre == undefined) {
        return 0;
    }
    var body_high = (pre.open > pre.close) ? pre.open : pre.close;
    if (curr.low > body_high){
        return 1;
    }
    return 0;
}

function is_below_body(msg, curr, pre = curr + 1) {
    curr = msg[curr];
    pre = msg[pre];
    if (curr == undefined || pre == undefined) {
        return 0;
    }
    var body_low = (pre.open < pre.close) ? pre.open : pre.close;
    if (curr.high < body_low){
        return 1;
    }
    return 0;
}