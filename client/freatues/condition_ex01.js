function has_ex01(comp) {
    var msg = comp.day;

    return 1;
}

function condition_ex01() {
    clear_result_area();
    console.log('===========================================');
    console.log('Find condition_ex01 in current list.');

    var list = [];

    var curr_com_lst = get_selected_com_list();
    for (var i = 0; i < curr_com_lst.length; i++) {
        if (has_ex01(curr_com_lst[i]))
            list.push(curr_com_lst[i].name);
    }
    console.log(list);
    update_result_area_from_list(list);
    progress_bar_show_msg(list.length + ' companies satisfy ex01');

}