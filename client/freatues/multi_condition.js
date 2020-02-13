
function multi_condition() {
    var condition = [
        has_c1,
        has_c2,
        has_c3_1,
        has_c3_2,
        has_c4,
        has_c5,
        has_c6,
        has_c7,
        has_c8,
    ];
    clear_result_area();
    progress_bar_show_msg('Searching...');
    console.log('===========================================');
    console.log('Using multi condition for all company.');

    var list = [];

    for (var i = 0; i < com.length; i++) {
        var comp = com[i];
        for (var j = 0; j < condition.length; j++) {
            if (condition[j](comp)) {
                list.push(comp.name);
                break ;
            }
        }
    }
    console.log(list);
    update_result_area_from_list(list);

    var str = 'Multi filter: ';
    str += list.length + ' companies satisfy at least one of the conditions';
    progress_bar_show_msg(str);
}
