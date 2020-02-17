function has_c7(comp, type = document.getElementById("c7_type").value) {
    if (comp[type] == undefined)
        add_all_time_frame(type);

    var msg = comp[type];
    if (msg[0].high > msg[1].high && msg[0].low < msg[1].low
        && msg[1].high > msg[2].high && msg[1].low < msg[2].low)
        return 1;
    return 0;
}

function condition_07() {
    if (curr_company == 'all') {
        clear_result_area();
        console.log('===========================================');
        console.log('Find condition_07 in all company.');

        var list = [];
        var type = document.getElementById("c7_type").value;

        console.log("type: " + type);
        for (var i = 0; i < com.length; i++) {
            if (has_c7(com[i], type))
                list.push(com[i].name);
        }
        console.log(list);
        update_result_area_from_list(list);
        progress_bar_show_msg(list.length + ' companies satisfy C7');
    }
}