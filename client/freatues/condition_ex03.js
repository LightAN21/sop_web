
function has_ex03(comp, range = 20, ratio = 0.6) {
    var msg = comp.day;
    var arr = [], tmp = [];
    var max = 0, curr = 0;

    for (var i = 0; i < range; i++) {
        arr.push({
            price: msg[i].high,
            mark: 1,
        });
        arr.push({
            price: msg[i].low,
            mark: 0,
        });
    }
    arr.sort(function (a, b) {
        if (a.price > b.price)
            return 1;
        return -1;
    });
    for (var i = 0; i < arr.length; i++) {
        if (arr[i].mark == 0){
            curr++;
            if (curr > max);
                max = curr;
        }
        else {
            curr--;
        }
    }
    // console.log('-------------------------------------------');
    // console.log(arr);
    // console.log(max);
    if (max / range > ratio)
        return 1;
    return 0;
}

function condition_ex03() {
    clear_result_area();
    console.log('===========================================');
    console.log('Find condition_ex03 in current list.');

    var list = [];

    var curr_com_lst = get_selected_com_list();
    for (var i = 0; i < curr_com_lst.length; i++) {
        if (has_ex03(curr_com_lst[i]))
            list.push(curr_com_lst[i].name);
    }
    console.log(list);
    update_result_area_from_list(list);
    progress_bar_show_msg(list.length + ' companies satisfy ex03');
    filter_list = list;
}