function has_c7(comp, type = document.getElementById("c7_type").value) {
    type = get_real_type(comp, type);
    if (comp[type] == undefined)
        add_all_time_frame(type);

    var msg = comp[type];
    if (msg[0].high > msg[1].high && msg[0].low < msg[1].low
        && msg[1].high > msg[2].high && msg[1].low < msg[2].low)
        return 1;
    return 0;
}

function condition_07() {
    clear_result_area();
    console.log('===========================================');
    console.log('Find condition_07 in all company.');

    var list = [];
    var type = document.getElementById("c7_type").value;

    console.log("type: " + type);
    var curr_com_lst = get_selected_com_list();
    for (var i = 0; i < curr_com_lst.length; i++) {
        if (has_c7(curr_com_lst[i], type))
            list.push(curr_com_lst[i].name);
    }
    console.log(list);
    update_result_area_from_list(list);
    progress_bar_show_msg(list.length + ' companies satisfy C7');
    filter_list = list;
}