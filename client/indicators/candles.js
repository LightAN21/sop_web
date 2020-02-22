function is_gap_up_down_candle(msg, index, percent = 0.02)
{
    if (index >= 0 && index + 1 < msg.length
        && is_down_candle(msg[index])
        && msg[index].open > (1 + percent) * msg[index + 1].high
        )
        return 1;
    return 0;
}

function is_gap_down_up_candle(msg, index, percent = 0.02)
{
    if (index >= 0 && index + 1 < msg.length
        && is_up_candle(msg[index])
        && msg[index].open < (1 - percent) * msg[index + 1].low
        )
        return 1;
    return 0;
}

function average_height(msg, start_day_index, days)
{
    var h = 0, i;

    if (start_day_index + days >= msg.length || start_day_index < 0)
        return -1;
    for (i = start_day_index; i < start_day_index + days; i++) {
        h += msg[i].height;
    }
    return h / days;
}