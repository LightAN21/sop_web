
function multi_condition() {
    var condition = [
        {check: has_c0, name: 'c0', is_checked: document.getElementById("c0_checkbox").checked},
        {check: has_c1, name: 'c1', is_checked: document.getElementById("c1_checkbox").checked},
        {check: has_c2, name: 'c2', is_checked: document.getElementById("c2_checkbox").checked},
        {check: has_c3_1, name: 'c3_1', is_checked: document.getElementById("c3_1_checkbox").checked},
        {check: has_c3_2, name: 'c3_2', is_checked: document.getElementById("c3_2_checkbox").checked},
        {check: has_c4, name: 'c4', is_checked: document.getElementById("c4_checkbox").checked},
        {check: has_c5, name: 'c5', is_checked: document.getElementById("c5_checkbox").checked},
        {check: has_c6, name: 'c6', is_checked: document.getElementById("c6_checkbox").checked},
        {check: has_c7, name: 'c7', is_checked: document.getElementById("c7_checkbox").checked},
    ];
    clear_result_area();
    progress_bar_show_msg('Searching...');
    console.log('===========================================');
    console.log('Using multi condition for all company.');

    var list = [];

    for (var i = 0; i < com.length; i++) {
        var comp = com[i];
        for (var j = 0; j < condition.length; j++) {
            if (condition[j].is_checked && condition[j].check(comp)) {
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
