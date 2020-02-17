function has_c0(comp, type = document.getElementById("c0_type").value)
{
    if (comp[type] == undefined)
        add_all_time_frame(type);

    var msg = comp[type];
    if (msg[0].trend == undefined)
        get_trend(comp, type);
    if ((msg[0].lag_trend == 'up' && msg[1].lag_trend == 'down')
        || (msg[0].lag_trend == 'down' && msg[1].lag_trend == 'up'))
        return 1;
    return 0;
}

function condition_00() {
    if (curr_company == 'all') {
        clear_result_area();
        console.log('===========================================');
        console.log('Find condition_00 in all company.');

        var list = [];
        var type = document.getElementById("c0_type").value;

        console.log("type: " + type);
        for (var i = 0; i < com.length; i++) {
            if (has_c0(com[i], type))
                list.push(com[i].name);
        }
        console.log(list);
        update_result_area_from_list(list);
        progress_bar_show_msg(list.length + ' companies satisfy C0');
    }
}