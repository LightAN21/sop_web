function get_real_type(comp, web_type) {
    if (web_type[0] != 'M' || web_type == 'Mx' || web_type == 'M')
        return web_type;
    var real_shift = get_real_shift(comp, web_type);
    if (real_shift == 0)
        return web_type.split('_')[0];
    else
        return web_type.split('_')[0] + '_' + real_shift;
}

function get_real_shift(comp, web_type) {
    var d = comp.day;
    var t = d[0].time;
    var month = parseInt(t.split('-')[1]);
    var web_m = parseInt(web_type.split('M')[1]);

    if (web_type.split('_').length == 1)
        return shift_to_start_at_Jan(month, web_m) % web_m;
    else if (web_type.split('_')[1] == 'shift')
        return (shift_to_start_at_Jan(month, web_m) + (2 * web_m - 1)) % web_m;
}

function get_month_number(comps) {
    var c = comps[0];
    var d = c.day;
    var t = d[0].time;
    var m = parseInt(t.split('-')[1]);

    console.log('Current date: ' + t);
    console.log('Current month: ' + m);
    return m;
}

function shift_to_start_at_Jan(month, n) {
    return month % n;
}

function add_all_time_frame(type, comps = get_selected_com_list()) {
    // console.log('Add type on all company: ' + type);
    if (type == 'W')
        W(comps);
    else if (type == 'M')
        M(comps);
    else if (type == 'Mx')
        Mx(comps);
    else if (type[0] == 'M') {
        var n = parseInt(type.split('M')[1]);
        var shift = parseInt(type.split('_')[1]);

        // console.log('n = ' + n);
        // console.log('shift = ' + shift);
        Mn(comps, n, shift);
    }
}

function add_company_time_frame(com, type) {

    if (type == 'M')
        M_com(com);
    else if (type == 'Mx')
        Mx_com(com);
    else if (type == 'M2')
        Mn_com(com, 2);
    else if (type == 'M2_shift')
        Mn_com(com, 2, 1);
    else if (type == 'M3')
        Mn_com(com, 3);
    else if (type == 'M3_shift')
        Mn_com(com, 3, 1);
    else if (type == 'M4')
        Mn_com(com, 4);
    else if (type == 'M4_shift')
        Mn_com(com, 4, 1);
    else if (type == 'M6')
        Mn_com(com, 6);
    else if (type == 'M6_shift')
        Mn_com(com, 6, 1);
    else if (type == 'W')
        W_com(com);
}

function find_start_day(day, curr_index, start_weekday) {
    if (curr_index >= day.length)
        return day.length - 1;
    if (day[curr_index].weekday == start_weekday)
        return curr_index;
    if (curr_index + 4 >= day.length)
        return day.length - 1;
    if (day[curr_index + 4].weekday == start_weekday)
        return curr_index + 4;
    var pre = day[curr_index + 4].weekday;
    var shift = 0;
    if (pre > start_weekday)
        start_weekday += 7;
    for (var i = curr_index + 4; i > curr_index; i--) {
        if (day[i].weekday < pre)
            shift = 7;
        if (day[i].weekday + shift >= start_weekday) {
            // console.log('curr_index: ' + curr_index + ', time: ' + day[curr_index].time);
            // console.log('find index: ' + i + ', time: ' + day[i].time);
            return i;
        }
        pre = day[i].weekday + shift;
    }
    // console.log('curr_index: ' + curr_index + ', time: ' + day[curr_index].time);
    // console.log('find index: Not found.');
    return curr_index;
}

function transform_data(msg, start_index, end_index, count, type) {
    var new_message = {
        id: count,
        start_day: msg[start_index].time,
        end_day: msg[end_index].time,
        start_day_index: start_index,
        end_day_index: end_index,
        time: msg[start_index].time + " to " + msg[end_index].time,
        days: start_index - end_index + 1,
        open: msg[start_index].open,
        close: msg[end_index].close,
        body_height: (msg[start_index].open > msg[end_index].close) ? msg[start_index].open - msg[end_index].close : msg[start_index].close - msg[end_index].open,
    };
    var max = 0;
    var min = 1000000;
    var vol = 0;

    for (var i = start_index; i >= end_index; i--) {
        if (msg[i].high > max)
            max = msg[i].high;
        if (msg[i].low < min)
            min = msg[i].low;
        msg[i][type + '_index'] = count;
        vol += msg[i].volume;
    }
    new_message.high = max;
    new_message.low = min;
    new_message.mid = (max + min) / 2;
    new_message.height = max - min;
    new_message.volume = vol;
    return new_message;
}









function W_com(com, start_weekday = 1) {
    var week_messages = [];
    var day = com.day;
    var i = 0, count = 0;
    var type;

    if (start_weekday == 1) type = 'W';
    else type = 'W_' + start_weekday.toString();

    while (i < day.length) {
        var end = i;
        var start = find_start_day(day, end, start_weekday);
        var curr_week = transform_data(day, start, end, count, type);
        week_messages.push(curr_week);
        i = start + 1;
        count++;
    }
    com[type] = week_messages;
}

function W(info, start_weekday = 1) {
    for (var i = 0; i < info.length; i++) {
        W_com(info[i], start_weekday);
    }
}
// usage: W(info);
// usage: W_com(info[0]);








function Wn_com(com, n = 1, shift = 0, start_weekday = 1) {
    var week_messages = [];
    var day = com.day;
    var i = 0, count = 0, end = 0, start_0 = 0;
    var type = "W" + n;

    if (n < 1)
        n = 1;
    for (shift = shift % n; shift > 0; shift--) {
        if (i >= day.length)
            break;
        start_0 = find_start_day(day, start_0 + 1, start_weekday);
    }
    var curr_week_0 = transform_data(day, start_0, end, count, type);
    week_messages.push(curr_week_0);
    i = start_0 + 1;
    count++;
    while (i < day.length) {
        end = i;
        var start = end - 1;
        for (var x = 0; x < n; x++)
            start = find_start_day(day, start + 1, start_weekday);
        var curr_week = transform_data(day, start, end, count, type);
        week_messages.push(curr_week);
        i = start + 1;
        count++;
    }
    com[type] = week_messages;
}

function Wn(info, n = 1, shift = 0, start_weekday = 1) {
    for (var i = 0; i < info.length; i++) {
        Wn_com(info[i], n, shift, start_weekday);
    }
    return week_W_info;
}









function find_start_day_of_month(day, curr_index) {
    if (curr_index >= day.length)
        return day.length - 1;
    var x = curr_index + 10;
    if (curr_index + 10 < day.length)
        x = (day[curr_index].month == day[x].month) ? curr_index + 25 : x;
    if (x >= day.length)
        x = day.length - 1;
    for (var i = x; i > curr_index; i--) {
        if (day[curr_index].month == day[i].month)
            return i;
    }
    return curr_index;
}

function M_com(com) {
    var month_messages = [];
    var day = com.day;
    var i = 0, count = 0;

    while (i < day.length) {
        var end = i;
        var start = find_start_day_of_month(day, end);
        var curr_month = transform_data(day, start, end, count, 'M');
        month_messages.push(curr_month);
        i = start + 1;
        count++;
    }
    com['M'] = month_messages;
}

function M(info) {
    for (var i = 0; i < info.length; i++) {
        M_com(info[i]);
    }
}









function Mn_com(com, n = 1, shift = 0) {
    var month_messages = [];
    var day = com.day;
    var i = 0, count = 0, end = 0;
    var type = "M" + n.toString();

    if (n < 1)
        n = 1;
    if (shift % n > 0) {
        if (shift % n > 0)
            type += '_' + (shift % n).toString();
        end = i;
        var start_0 = end - 1;
        for (shift = shift % n; shift > 0; shift--) {
            start_0 = find_start_day_of_month(day, start_0 + 1);
        }
        var curr_month_0 = transform_data(day, start_0, end, count, type);
        month_messages.push(curr_month_0);
        i = start_0 + 1;
        count++;
    }
    while (i < day.length) {
        end = i;
        var start = end - 1;
        for (var x = 0; x < n; x++)
            start = find_start_day_of_month(day, start + 1);
        var curr_month = transform_data(day, start, end, count, type);
        month_messages.push(curr_month);
        i = start + 1;
        count++;
    }
    com[type] = month_messages;
}

function Mn(info, n = 1, shift = 0) {
    for (var i = 0; i < info.length; i++) {
        Mn_com(info[i], n, shift);
    }
}
// usage: Mn(info, 3);

// example: info[0]['M3']







function find_first_x_weekday_of_month(day, curr_index, x = 3, weekday = 5) {
    var list = [], tmp = curr_index - 1;
    if (x >= 4 || x < 1) {
        x = (x >= 4) ? 4 : 1;
    }
    var y = x - 1;

    // console.log('curr_index: ' + curr_index + ', time: ' + day[curr_index].time);
    // console.log('');

    if (curr_index >= day.length)
        return day.length - 1;
    for (var i = 0; i < 11; i++) {
        tmp = find_start_day(day, tmp + 1, weekday);
        list.push(tmp);
    }
    // console.log(list);
    // for (var i = 0; i < list.length; i++){
    //     console.log('list_index: ' + list[i] + ', time: ' + day[list[i]].time);
    // }
    // console.log('');

    var k = 0;
    if (day[list[0]].month == day[curr_index].month) {
        while (k < list.length && day[list[k]].month == day[curr_index].month) {
            k++;
        }
        // console.log('k index: ' + k + ', time: ' + day[list[k]].time);
        if (k == list.length) {
            return list[k - 1];
        }
        if (k >= x) {
            return list[k - x];
        }
    }
    var k2 = k;
    while (k2 < list.length && day[list[k2]].month == day[list[k]].month) {
        k2++;
    }
    if (k2 - k >= 4) {
        return list[k2 - x];
    }
    return list[k];
}

function Mx_com(com, x = 3, weekday = 5) {
    var month_messages = [];
    var day = com.day;
    var i = 0, count = 0;
    var type = "Mx";

    while (i < day.length) {
        var end = i;
        var start = find_first_x_weekday_of_month(day, end, x, weekday);
        var mon = start, end_month = end;
        if (x == 3 && weekday == 5) {
            if (mon > 0 && day[mon].weekday > day[mon - 1].weekday)
                mon--;
            if (end_month > 0 && day[end_month].weekday < day[end_month - 1].weekday)
                end_month--;
        }
        // console.log('');
        // console.log('start index: ' + start);
        // console.log('mon index: ' + mon + ', time: ' + day[mon].time);
        // console.log('end_month index: ' + end_month + ', time: ' + day[end_month].time);
        // console.log('-------------------------------------------------------------\n');
        var curr_month = transform_data(day, mon, end_month, count, type);
        month_messages.push(curr_month);
        i = start + 1;
        count++;
    }
    com[type] = month_messages;
}

function Mx(info, x = 3, weekday = 5) {
    for (var i = 0; i < info.length; i++) {
        Mx_com(info[i], x, weekday);
    }
}








function Mxn_com(com, n = 1, shift = 0, x = 3, weekday = 5) {
    var month_messages = [];
    var day = com.day;
    var i = 0, count = 0, end = 0;
    var type = "Mx" + n.toString();

    if (n < 1)
        n = 1;
    if (shift % n > 0) {
        if (shift % n > 0)
            type += '_' + (shift % n).toString();
        end = i;
        var start_0 = end - 1;
        for (shift = shift % n; shift > 0; shift--) {
            start_0 = find_first_x_weekday_of_month(day, start_0 + 1, x, weekday);
        }
        var mon = start_0, end_month = end;
        if (x == 3 && weekday == 5) {
            if (mon > 0 && day[mon].weekday > day[mon - 1].weekday)
                mon--;
            if (end_month > 0 && day[end_month].weekday < day[end_month - 1].weekday)
                end_month--;
        }
        if (end_month < 0)
            end_month = 0;
        var curr_month_0 = transform_data(day, mon, end_month, count, type);
        month_messages.push(curr_month_0);
        i = start_0 + 1;
        count++;
    }
    while (i < day.length) {
        end = i;
        var start = end - 1;
        for (var k = 0; k < n; k++)
            start = find_first_x_weekday_of_month(day, start + 1, x, weekday);
        var mon = start, end_month = end;
        if (x == 3 && weekday == 5) {
            if (mon > 0 && day[mon].weekday > day[mon - 1].weekday)
                mon--;
            if (end_month > 0 && day[end_month].weekday < day[end_month - 1].weekday)
                end_month--;
        }
        var curr_month = transform_data(day, mon, end_month, count, type);
        month_messages.push(curr_month);
        i = start + 1;
        count++;
    }
    com[type] = month_messages;
}

function Mxn(info, n = 1, shift = 0, x = 3, weekday = 5) {
    for (var i = 0; i < info.length; i++) {
        Mxn_com(info[i], n, shift, x, weekday);
    }
}