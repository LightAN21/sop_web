
function has_c2(comp) {
    var msg = comp.day;
    if (msg[0].volume >= 2 * average_volume(com[i], 1, 10))
        return 1;
    return 0;
}

function condition_02() {
    if (curr_company == 'all') {
        clear_result_area();
        console.log('===========================================');
        console.log('Find condition_02 in all company.');

        var list = [];
        for (var i = 0; i < com.length; i++) {
            if (has_c2(com[i])) {
                list.push(com[i].name);
            }
        }
        console.log(list);
        update_result_area_from_list(list);
    }
}