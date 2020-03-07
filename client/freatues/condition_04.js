
function has_c4(comp) {
    var msg = comp.day;
    if (msg[0].height >= 2 * average_height(msg, 1, 10))
        return 1;
    return 0;
}

function condition_04() {
    clear_result_area();
    console.log('===========================================');
    console.log('Find condition_04 in all company.');

    var list = [];
    var curr_com_lst = get_selected_com_list();
    for (var i = 0; i < curr_com_lst.length; i++) {
        if (has_c4(curr_com_lst[i])) {
            list.push(curr_com_lst[i].name);
        }
    }
    console.log(list);
    update_result_area_from_list(list);
    progress_bar_show_msg(list.length + ' companies satisfy C4');
    filter_list = list;
}