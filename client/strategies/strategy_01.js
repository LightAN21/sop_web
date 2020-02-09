



function strategy_01_break_up_and_fractal(com, type = 'day')
{
    var break_list = break_up_hedge_point_list(com, type);
    var msg = com[type];
    var list = [];

    for (var i = 0; i < break_list.length; i++){
        var b = break_list[i].index;
        var next = find_next_up_fractal(msg, b + 1); // including b
        var pre = find_previous_up_fractal(msg, b);
        var pre_hedge = find_previous_down_fractal(msg, b);

        if (next != -1 && pre != -1 && pre_hedge != -1){
            var h = break_list[i].hedge_break[0].index;
            var avg = (msg[pre].low + msg[h].high) / 2;
            var stop_loss = (avg > msg[pre_hedge].high) ? avg : msg[pre_hedge].high;

            if (msg[next].low > stop_loss){
                list.push({
                    index: b,
                    time: break_list[i].time,
                    stop_loss: stop_loss,
                    fractal_index: next,
                    fractal_time: msg[next].time,
                    hedge_time: msg[h].time,
                    pre_fractal_time: msg[pre].time,
                });
            }
        }
    }
    return list;
}

function strategy_01() {
    console.log('===========================================');
    if (curr_company == 0)
        return;
    if (curr_company != 'all') {
        console.log('Apply strategy_01 on ' + curr_company.name + ':');
        console.log(strategy_01_break_up_and_fractal(curr_company));
    }
}