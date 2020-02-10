function add_time_frame(type) {

    if (type == 'M')
        M(com);
    else if (type == 'Mx')
        Mx(com);
    else if (type == 'M2')
        Mn(com, 2);
    else if (type == 'M2_1')
        Mn(com, 2, 1);
    else if (type == 'M3')
        Mn(com, 3);
    else if (type == 'M3_1')
        Mn(com, 3, 1);
    else if (type == 'M4')
        Mn(com, 4);
    else if (type == 'M4_1')
        Mn(com, 4, 1);
    else if (type == 'M6')
        Mn(com, 6);
    else if (type == 'M6_1')
        Mn(com, 6, 1);
    else if (type == 'W')
        W(com);
}

function has_c1(comp, type = document.getElementById("c1_type").value) {
    if (comp[type] == undefined)
        add_time_frame(type);

    var msg = comp[type];
    if (msg[0].high < msg[1].high && msg[0].low > msg[1].low)
        return 1;
    return 0;
}

function condition_01() {
    if (curr_company == 'all') {
        clear_result_area();
        console.log('===========================================');
        console.log('Find condition_01 in all company.');

        var list = [];
        var type = document.getElementById("c1_type").value;

        console.log("type: " + type);
        add_time_frame(type);
        for (var i = 0; i < com.length; i++) {
            if (has_c1(com[i], type))
                list.push(com[i].name);
        }
        console.log(list);
        update_result_area_from_list(list);
    }
}