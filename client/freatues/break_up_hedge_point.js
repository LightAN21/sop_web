
function feature_1() {
    var list = [];
    var str = "";

    console.log('===========================================');
    if (data_is_read) {
        for (var i = 0; i < com.length; i++) {
            var broke = break_up_hedge_point_list(com[i]);

            if (broke.length > 0 && broke[broke.length - 1].index == 2) { // previous day
                var b = broke.pop();
                list.push({
                    company: com[i].name,
                    time: b.time,
                    hedge_break: b.hedge_break,
                });
            }
        }
        list.sort((a, b) => {

            return b.hedge_break.length - a.hedge_break.length;
        });
        for (var i = 0; i < list.length; i++){
            str += list[i].company + '\n';
        }
        console.log('Feature_1 list:');
        console.log(list);
        update_result_area(str);
        return list;
    }
    else
        progress_bar_show_msg('Error: Data is not read');
}

function break_up_hedge_point_list(com, type = 'day', len = 5000) {
    var msg = com[type];
    var hedge = [];
    var list = [];
    var str = "";

    if (len > msg.length - 2)
        len = msg.length - 2;
    for (var i = len; i >= 0; i--) {
        var curr_close = msg[i].close;
        // var pre_close = msg[i + 1].close;
        var last = hedge.length - 1;

        if (last >= 0) {
            var last_high = hedge[last].high;

            if (curr_close > last_high) {
                var broke = [];

                while (hedge.length) {
                    var curr_high = hedge[hedge.length - 1].high;

                    if (curr_close > curr_high) {
                        var tmp = hedge.pop();
                        broke.push({
                            index: tmp.id,
                            time: tmp.time,
                            tmp: tmp,
                        });
                    }
                    else
                        break;
                }
                if (broke.length > 0) {
                    list.push({
                        index: i,
                        time: msg[i].time,
                        hedge_break: broke,
                    });
                    str += msg[i].time + '\n';
                }
            }
        }
        if (is_down_fractal(msg, i)) {
            hedge.push(msg[i]);
        }
    }
    update_result_area(str);
    return list;
}

function show_break_up_hedge_point_list() {
    console.log('===========================================');
    if (curr_company == 0)
        return;
    if (curr_company != 'all') {
        console.log('break_up_hedge_point_list of ' + curr_company.name + ':');
        console.log(break_up_hedge_point_list(curr_company));
    }
}