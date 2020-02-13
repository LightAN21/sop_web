
function has_c3_1(comp) {
    var msg = comp.day;
    if (is_gap_up_down_candle(msg, 0))
        return 1;
    return 0;
}

function has_c3_2(comp) {
    var msg = comp.day;
    if (is_gap_down_up_candle(msg, 0))
        return 1;
    return 0;
}

function condition_03_1() {
    if (curr_company == 'all') {
        clear_result_area();
        console.log('===========================================');
        console.log('Find condition_03 in all company.');

        var list = [];
        for (var i = 0; i < com.length; i++) {
            if (has_c3_1(com[i]))
                list.push(com[i].name);
        }
        console.log(list);
        update_result_area_from_list(list);
        progress_bar_show_msg(list.length + ' companies satisfy C3_1');
    }
}

function condition_03_2() {
    if (curr_company == 'all') {
        clear_result_area();
        console.log('===========================================');
        console.log('Find condition_03 in all company.');

        var list = [];
        for (var i = 0; i < com.length; i++) {
            if (has_c3_2(com[i]))
                list.push(com[i].name);
        }
        console.log(list);
        update_result_area_from_list(list);
        progress_bar_show_msg(list.length + ' companies satisfy C3_2');
    }
}