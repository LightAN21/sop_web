function latest_average_volume(com, days, start_index = 0) {
    var d = com.day;
    var v = 0, i;

    for (i = start_index + 1; i <= start_index + days && i < d.length; i++) {
        v += d[i].volume;
    }
    return v / (i - start_index);
}

// days: look backward
function average_volume(com, start_day_index, days) {
    var d = com.day;
    var v = 0, i;

    for (i = start_day_index + 1; i <= start_day_index + days && i < d.length; i++) {
        v += d[i].volume;
    }
    return v / (i - start_day_index);
}


function find_volume_high_ratio(com, curr_day_index, days, ratio) {
    var d = com.day;

    for (var i = curr_day_index; i < curr_day_index + days && i < d.length; i++) {
        var avg = average_volume(com, i, 20);
        var h = ratio * avg;
        var v = d[i].volume;
        if (v >= h)
            return 1;
    }
    return 0;
}

