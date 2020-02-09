
function hedge_of_up_fractal_list(com, type = 'day'){
    var msg = com[type];
    var hedge_list = get_up_fractal_list(com, type);
    var list = [];
    var str = "";

    for (var i = 2; i < hedge_list.length - 1; i++)
    {
        var next = hedge_list[i + 1].index;
        var curr = hedge_list[i].index;
        var pre = hedge_list[i - 1].index;
        var pre2 = hedge_list[i - 2].index;
        if (msg[curr].low < msg[next].low
            && msg[curr].low < msg[pre].low
            && msg[curr].low < msg[pre2].low
            ){
            list.push({
                index: curr,
                time: msg[curr].time,
                next_index: next,
                next_fractal_time: msg[next].time,
                pre_index: pre,
                pre_fractal_time: msg[pre].time,
                pre2_index: pre2,
                pre2_fractal_time: msg[pre2].time,
            });
            str += msg[curr].time + '\n';
        }
    }
    update_result_area(str);
    return list;
}

function show_hedge_of_up_fractal_list() {
    console.log('===========================================');
    if (curr_company == 0)
        return;
    if (curr_company != 'all') {
        console.log('hedge_of_up_fractal_list of ' + curr_company.name + ':');
        console.log(hedge_of_up_fractal_list(curr_company));
    }
}


function hedge_of_down_fractal_list(com, type = 'day'){
    var msg = com[type];
    var hedge_list = get_down_fractal_list(com, type);
    var list = [];
    var str = "";

    for (var i = 2; i < hedge_list.length - 1; i++)
    {
        var next = hedge_list[i + 1].index;
        var curr = hedge_list[i].index;
        var pre = hedge_list[i - 1].index;
        var pre2 = hedge_list[i - 2].index;

        if (msg[curr].high > msg[next].high
            && msg[curr].high > msg[pre].high
            && msg[curr].high > msg[pre2].high
            ){
            list.push({
                index: curr,
                time: msg[curr].time,
                next_index: next,
                next_fractal_time: msg[next].time,
                pre_index: pre,
                pre_fractal_time: msg[pre].time,
                pre2_index: pre2,
                pre2_fractal_time: msg[pre2].time,
            });
            str += msg[curr].time + '\n';
        }
    }
    update_result_area(str);
    return list;
}

function show_hedge_of_down_fractal_list() {
    console.log('===========================================');
    if (curr_company == 0)
        return;
    if (curr_company != 'all') {
        console.log('hedge_of_down_fractal_list of ' + curr_company.name + ':');
        console.log(hedge_of_down_fractal_list(curr_company));
    }
}

function feature_3() {
    var list = [];
    var str = "";

    console.log('===========================================');
    if (data_is_read) {
        for (var i = 0; i < com.length; i++) {
            var hedge_list = hedge_of_up_fractal_list(com[i]);

            if (hedge_list.length > 0
                && hedge_list[hedge_list.length - 1].next_index == 1) { // previous day
                var b = hedge_list.pop();
                list.push({
                    company: com[i].name,
                    fractal_time: b.next_fractal_time,
                    hedge: b,
                });
            }
        }
        list.sort((a, b) => {
            return (a.company > b.company) ? 1 : -1;
        });
        for (var i = 0; i < list.length; i++){
            str += list[i].company + '\n';
        }
        console.log('Feature_3 list:');
        console.log(list);
        update_result_area(str);
        return list;
    }
    else
        progress_bar_show_msg('Error: Data is not read');
}

function feature_4() {
    var list = [];
    var str = "";

    console.log('===========================================');
    if (data_is_read) {
        for (var i = 0; i < com.length; i++) {
            var hedge_list = hedge_of_down_fractal_list(com[i]);

            if (hedge_list.length > 0
                && hedge_list[hedge_list.length - 1].next_index == 1) { // previous day
                var b = hedge_list.pop();
                list.push({
                    company: com[i].name,
                    fractal_time: b.next_fractal_time,
                    hedge: b,
                });
            }
        }
        list.sort((a, b) => {
            return (a.company > b.company) ? 1 : -1;
        });
        for (var i = 0; i < list.length; i++){
            str += list[i].company + '\n';
        }
        console.log('Feature_4 list:');
        console.log(list);
        update_result_area(str);
        return list;
    }
    else
        progress_bar_show_msg('Error: Data is not read');
}