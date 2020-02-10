function is_gap_up_down_candle(msg, index, percent = 0.02)
{
    if (index >= 0 && index + 1 < msg.length
        && is_down_candle(msg[index])
        && msg[index].low > (1 + percent) * msg[index + 1].close
        )
        return 1;
    return 0;
}

function is_gap_down_up_candle(msg, index, percent = 0.02)
{
    if (index >= 0 && index + 1 < msg.length
        && is_up_candle(msg[index])
        && msg[index].high < (1 - percent) * msg[index + 1].close
        )
        return 1;
    return 0;
}