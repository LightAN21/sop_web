
function has_c2(comp) {
    var msg = comp.day;
    if (msg[0].volume >= 2 * average_volume(msg, 1, 10))
        return 1;
    return 0;
}

function condition_02() {
        clear_result_area();
        console.log('===========================================');
        console.log('Find condition_02 in all company.');

        var list = [];
        var curr_com_lst = get_selected_com_list();
        for (var i = 0; i < curr_com_lst.length; i++) {
            if (has_c2(curr_com_lst[i])) {
                list.push(curr_com_lst[i].name);
            }
        }
        console.log(list);
        update_result_area_from_list(list);
        progress_bar_show_msg(list.length + ' companies satisfy C2');
        filter_list = list;
}