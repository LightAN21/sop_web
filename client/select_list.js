
function add_list_selection(select_obj, lst) {
    for (var i = 0; i < lst.length; i++) {
        if (lst[i] == '' || lst[i] == undefined)
            continue;
        var op = document.createElement('option');
        op.value = lst[i];
        op.innerHTML = lst[i] + '(' + all_list_info.set[lst[i]].com_name_list.length + ')';
        select_obj.appendChild(op);
    }
}

function show_list() {
    var n = document.getElementById('select_list_to_show');
    if (n == undefined)
        return;
    var v = n.value;
    if (v == undefined)
        return;
    var lst = all_list_info.set[v].com_name_list;
    var list_box = document.getElementById('list_area');
    var str = '';

    for (var i = 0; i < lst.length; i++) {
        str += lst[i] + '\n';
    }
    list_box.innerHTML = str;
}

function get_selected_com_list() {
    var v = document.getElementById('select_list_to_download_and_read').value;

    if (all_list_info.set[v] == undefined)
        return ;
    return all_list_info.set[v].com;
}

function get_selected_com_name_list() {
    var v = document.getElementById('select_list_to_download_and_read').value;

    if (all_list_info.set[v] == undefined)
        return ;
    return all_list_info.set[v].com_name_list;
}

function show_file_list() {
    var list_box = document.getElementById('list_area');
    var str = '';

    for (var i = 0; i < file_com_list.length; i++) {
        str += file_com_list[i] + '\n';
    }
    list_box.innerHTML = str;
}

function add_file_list_to_show() {
    var select_show = document.getElementById("select_list_to_show");
    var op = document.createElement('option');
    op.value = 'file_list';
    op.innerHTML = 'file_list';
    select_show.appendChild(op);
}

function set_curr_list(list_name) {
    var obj = document.getElementById('curr_list');
    if (obj != undefined)
        obj.innerHTML = list_name;
}

function get_all_com_name_list() {
    var res = [];
    var set = {};
    var col = all_list_info.col;
    for (var i = 0; i < col.length; i++) {
        if (col[i] != '' && col[i] != undefined) {
            var curr_lst = all_list_info.set[col[i]].com_name_list;
            if (curr_lst != undefined) {
                for (var j = 0; j < curr_lst.length; j++) {
                    if (!(curr_lst[j] in set)) {
                        res.push(curr_lst[j]);
                        set[curr_lst[j]] = 1;
                    }
                }
            }
        }
    }
    return res;
}