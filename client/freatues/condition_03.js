
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
        var curr_com_lst = get_selected_com_list();
        for (var i = 0; i < curr_com_lst.length; i++) {
            if (has_c3_1(curr_com_lst[i]))
                list.push(curr_com_lst[i].name);
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
        var curr_com_lst = get_selected_com_list();
        for (var i = 0; i < curr_com_lst.length; i++) {
            if (has_c3_2(curr_com_lst[i]))
                list.push(curr_com_lst[i].name);
        }
        console.log(list);
        update_result_area_from_list(list);
        progress_bar_show_msg(list.length + ' companies satisfy C3_2');
    }
}