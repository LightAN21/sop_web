function has_c6(comp)
{
    var msg = comp.day;

    if (msg[0].trend == undefined)
        get_trend(comp);
    if (msg[0].lag_trend == 'switch up'
        || msg[0].lag_trend == 'switch down')
        return 1;
    return 0;
}

function condition_06() {
    if (curr_company == 'all') {
        clear_result_area();
        console.log('===========================================');
        console.log('Find condition_06 in all company.');

        var list = [];
        for (var i = 0; i < com.length; i++) {
            if (has_c6(com[i])) {
                list.push(com[i].name);
            }
        }
        console.log(list);
        update_result_area_from_list(list);
    }
}