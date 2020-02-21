
function multi_condition() {
    if (data_is_read == 0)
        return ;
    var condition = [
        { check: has_c0, name: '0', is_checked: document.getElementById("c0_checkbox").checked },
        { check: has_c1, name: '1', is_checked: document.getElementById("c1_checkbox").checked },
        { check: has_c2, name: '2', is_checked: document.getElementById("c2_checkbox").checked },
        { check: has_c3_1, name: '3_1', is_checked: document.getElementById("c3_1_checkbox").checked },
        { check: has_c3_2, name: '3_2', is_checked: document.getElementById("c3_2_checkbox").checked },
        { check: has_c4, name: '4', is_checked: document.getElementById("c4_checkbox").checked },
        { check: has_c5, name: '5', is_checked: document.getElementById("c5_checkbox").checked },
        { check: has_c6, name: '6', is_checked: document.getElementById("c6_checkbox").checked },
        { check: has_c7, name: '7', is_checked: document.getElementById("c7_checkbox").checked },
    ];
    clear_result_area();
    progress_bar_show_msg('Searching...');
    console.log('===========================================');
    console.log('Using multi condition for all company.');

    var curr_com_lst = get_selected_com_list();
    var list = [];

    for (var i = 0; i < curr_com_lst.length; i++) {
        var comp = curr_com_lst[i];
        for (var j = 0; j < condition.length; j++) {
            if (condition[j].is_checked && condition[j].check(comp)) {
                if (list.length == 0 || list[list.length - 1].name != comp.name)
                    list.push({
                        name: comp.name,
                        with_c: [],
                        str: '',
                    });
                list[list.length - 1].with_c.push(condition[j].name);
                list[list.length - 1].str += j;
            }
        }
    }
    list.sort(function(a, b){
        if (a.with_c.length != b.with_c.length)
            return b.with_c.length - a.with_c.length;
        else if (a.str < b.str)
            return -1;
        else
            return 1;
    });
    console.log(list);

    var res = '';
    for (var i = 0; i < list.length; i++) {
        res += list[i].name + '(';
        res += list[i].with_c.toString();
        res += ')\n';
    }
    update_result_area(res);

    var str = 'Multi filter: ';
    str += list.length + ' companies satisfy at least one of the conditions';
    progress_bar_show_msg(str);
}
