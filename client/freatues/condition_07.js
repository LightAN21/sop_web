function has_c7(comp)
{
    var msg = comp.day;


    return 0;
}

function condition_07() {
    if (curr_company == 'all') {
        clear_result_area();
        console.log('===========================================');
        console.log('Find condition_07 in all company.');

        var list = [];
        for (var i = 0; i < com.length; i++) {
            if (has_c7(com[i])) {
                list.push(com[i].name);
            }
        }
        console.log(list);
        update_result_area_from_list(list);
    }
}