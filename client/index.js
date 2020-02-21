var list_info = [];
var list_set = {};
var list_com_set = {}; // lists of companiy data with data files
var all_com_list = []; // main list (lists/list.csv)
var com = [];
var com_set = {};
var file_list = [];
var file_com_list = [];
var file_com_name_set = {};
var curr_company = 0;
var data_is_read = 0;
var reading_data_in_process = 0;
var url_crumb = "";

$(document).ready(function () {
    $.get('/get_url_crumb', function (data) {
        url_crumb = data;
        console.log("url_crumb: \"" + url_crumb + "\"");
    });
    $.get('/get_list_info', function (data) {
        list_info = data;
        console.log("list_info:");
        console.log(list_info);

        for (var i = 0; i < list_info.length; i++) {
            list_set[list_info[i].name] = {
                com_list: list_info[i].company_list,
                com: [],
            };
        }
        console.log("list_set:");
        console.log(list_set);

        // add list selection
        if (list_info.length == 0)
            return;
        var select_show = document.getElementById("select_list_to_show");
        var select_move = document.getElementById("select_list_to_move");
        var select_find = document.getElementById("select_list_for_filter");
        add_list_selection(select_show, list_info, 1);
        add_list_selection(select_move, list_info);
        add_list_selection(select_find, list_info);
        show_list();
    });
    $.get('/get_company_name_list', function (data) {
        all_com_list = data;
        console.log("all_com_list(list.csv):");
        console.log(all_com_list);
    });
    $.get('/get_file_name_list', function (data) {
        file_list = data;
        for (var i = 0; i < file_list.length; i++)
            file_com_list.push(file_list[i].split('.')[0]);
        for (var i = 0; i < file_list.length; i++)
            file_com_name_set[file_com_list[i]] = i;
        com = new Array(file_list.length);
        console.log("file_list:");
        console.log(file_list);
        console.log("file_com_list:");
        console.log(file_com_list);
    });
    $('#read_data').click(function () {
        if (data_is_read) {
            progress_bar_show_msg('Data has already been read.');
            return;
        }
        else if (reading_data_in_process == 1) {
            return;
        }
        else if (file_list.length == 0) {
            progress_bar_show_msg('Error: No files');
            return;
        }
        read_data();
    })
    $('#download_from_url').click(function () {
        if (url_crumb == 'null' || url_crumb == '' || url_crumb == undefined) {
            progress_bar_show_msg('Error: URL crumb not found.');
            return;
        }
        else if (list_info.length == 0) {
            progress_bar_show_msg('Error: Server is not running / No list files');
            return;
        }
        var str = 'Please make sure that you have a correct URL curmb.\n';
        str += 'Do you want to download the latest data(' + all_com_list.length + ' files)?';
        var r = confirm(str);
        if (r == true)
            download_from_url();
    })
    $('#check_data').click(function () {
        console.log(com);
    })
});

function read_data() {

    console.log('===========================================');
    console.log("Reading data...");
    // var com_lst_table = document.getElementById('com_list');
    // com_lst_table.innerHTML = '';
    // add_button_all_com(com_lst_table);

    com = [];
    var count = 0;
    reading_data_in_process = 1;
    for (var i = 0; i < file_list.length; i++) {
        $.post('/get_file_info', { companyID: i, file_name: file_list[i] }, function (data) {
            com[data.id] = data;
            com_set[data.name] = com[data.id];
            count++;
            progress_bar(count, file_list.length);
            if (count >= file_list.length) {
                // for (var i = 0; i < file_list.length; i++)
                //     add_com_to_list(com_lst_table, com[i], i);
                console.log('com_set:');
                console.log(com_set);
                save_read_data_to_list();
                curr_company = "all";
                document.getElementById('selected_com').innerHTML = 'all company';
                data_is_read = 1;
                reading_data_in_process = 0;
                console.log('Finished.');
            }
        });
    }
}

function save_read_data_to_list() {
    for (var i = 0; i < list_info.length; i++) {
        var list_name = list_info[i].name;
        var lst = list_info[i].company_list;

        // list_com_set[list_name] = [];
        // var curr_lst = list_com_set[list_name];
        // for (var j = 0; j < lst.length; j++) {
        //     if (lst[j] in file_com_name_set){
        //         curr_lst.push(com_set[lst[j]]);
        //     }
        // }
        list_set[list_name].com = [];
        var curr_lst = list_set[list_name].com;
        for (var j = 0; j < lst.length; j++) {
            if (lst[j] in file_com_name_set) {
                curr_lst.push(com_set[lst[j]]);
            }
        }
    }
    console.log('list_set update:');
    console.log(list_set);
}

function progress_bar(curr, total) {
    var p = document.getElementById('progress');
    var per = (100 * (curr / total)).toFixed(2);
    if (curr < total)
        p.innerHTML = "Progress: " + per + "% (" + curr + "/" + total + ")";
    else
        p.innerHTML = "Progress: 100% (Finished)";
}

function progress_bar_show_msg(str) {
    document.getElementById('progress').innerHTML = str;
    console.log(str);
}

function add_button_all_com(table) {
    var row = table.insertRow(-1);
    var cell = row.insertCell(0);
    cell.innerHTML = '[Select all]';
    cell.onclick = function () {
        curr_company = "all";
        console.log('===========================================');
        progress_bar_show_msg('Select: all company');
        document.getElementById('selected_com').innerHTML = 'all company';
    }
}

function select_all_company() {
    curr_company = '';
    if (!data_is_read)
        return;
    curr_company = 'all';
    console.log('===========================================');
    progress_bar_show_msg('Select: all company');
    document.getElementById('selected_com').innerHTML = 'all company';
}

function add_com_to_list(table, company, count) {
    var row = table.insertRow(-1);
    var cell = row.insertCell(0);
    cell.innerHTML = '[' + count + '] ' + company.name;

    cell.onclick = function () {
        curr_company = company;
        document.getElementById('selected_com').innerHTML = curr_company.name;
        console.log('===========================================');
        progress_bar_show_msg('Select: company ' + curr_company.name);
        print_company_msg(company);
    }
}

function search_company() {
    var name = document.getElementById('search_com_name').value;

    console.log('===========================================');
    console.log(msg);
    if (data_is_read == 0) {
        msg = 'Search company: Data is not read';
        progress_bar_show_msg(msg);
        return;
    }
    for (var i = 0; i < com.length; i++) {
        if (com[i].name.toUpperCase() == name.toUpperCase())
            break;
    }
    if (i == com.length) {
        msg = 'Search: ' + name + ' not found';
        progress_bar_show_msg(msg);
    }
    else {
        curr_company = com[i];
        document.getElementById('selected_com').innerHTML = curr_company.name;
        progress_bar_show_msg(com[i].name + ' is found and selected.');
        print_company_msg(curr_company);
    }
}

function print_company_msg(company) {
    console.log(company);
}

function update_result_area(str) {
    document.getElementById('result_area').innerHTML = str;
}

function update_result_area_from_list(list) {
    var str = "";
    for (var i = 0; i < list.length; i++) {
        str += list[i] + '\n';
    }
    document.getElementById('result_area').innerHTML = str;
}

function clear_result_area() {
    document.getElementById("result_area").innerHTML = "";
    document.getElementById("result").innerHTML = "";
    progress_bar_show_msg('');
}

function get_chart() {
    var com_name = curr_company.name;

    if (!com_name)
        return 0;
    console.log('curr_company: ' + com_name);
    open_chart(com_name);
}

function open_chart(com_name) {
    // var tab = document.createElement('a');

    // tab.target = '_blank';
    // tab.href = 'https://finance.yahoo.com/quote/' + com_name + '/chart';
    // tab.click();
    window.open('https://finance.yahoo.com/quote/' + com_name + '/chart', '');
}

function open_all_charts() {
    var res = document.getElementById('result_area').innerHTML;
    var list = res.split('\n');

    if (list[list.length - 1] == '')
        list.pop();
    console.log(list);
    res = document.getElementById('result');
    res.innerHTML = '';
    for (var i = 0; i < list.length; i++) {
        add_open_chart_button(res, list[i]);
    }
}

function add_open_chart_button(res, com_name) {
    var b = document.createElement('button');

    b.onclick = () => {
        open_chart(com_name);
    };
    b.innerHTML = com_name;
    res.appendChild(b);
    res.appendChild(document.createElement('br'));
}

// lists

function add_list_selection(select_obj, list_info, show_all = 0) {
    for (var i = 0; i < list_info.length; i++) {
        if (list_info[i].name.split('.')[0] == 'bad_list' && show_all == 0)
            continue;
        var op = document.createElement('option');
        op.value = list_info[i].name;
        op.innerHTML = list_info[i].name;
        if (list_info[i].name.split('.')[0] == 'list')
            op.selected = 1;
        select_obj.appendChild(op);
    }
}

function show_list() {
    var v = document.getElementById('select_list_to_show').value;
    if (v == undefined)
        return;
    var lst = list_set[v].com_list;
    var list_box = document.getElementById('list_area');
    var str = '';

    for (var i = 0; i < lst.length; i++) {
        str += lst[i] + '\n';
    }
    list_box.innerHTML = str;
}

function get_selected_com_list() {
    var v = document.getElementById('select_list_for_filter').value;
    
    console.log('v: ' + v);
    return list_set[v].com;
}