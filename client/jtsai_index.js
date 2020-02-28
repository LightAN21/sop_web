var all_list_info;

var com = [];
var com_set = {};

var file_list = [];
var file_com_list = [];
var file_com_name_set = {};

var curr_company = 'all';
var data_is_read = 0;
var reading_data_in_process = 0;
var url_crumb = "";

var filter_list = [];
var filter_list_index = 0;

$(document).ready(function () {
    $.get('/get_url_crumb', function (data) {
        url_crumb = data;
        console.log("url_crumb: \"" + url_crumb + "\"");
    });
    $.get('/get_all_list_info', function (data) {
        all_list_info = data;
        console.log("all_list_info:");
        console.log(all_list_info);

        // add list selection
        if (all_list_info.col.length == 0)
            return;
        var select_dl_read = document.getElementById("select_list_to_download_and_read");
        add_list_selection(select_dl_read, all_list_info.col);
        show_list();
    });
    $.get('/get_file_name_list', function (data) {
        file_list = data;
        for (var i = 0; i < file_list.length; i++)
            file_com_list.push(file_list[i].split('.')[0]);
        for (var i = 0; i < file_list.length; i++)
            file_com_name_set[file_com_list[i]] = i;
        console.log("file_list:");
        console.log(file_list);
        console.log("file_com_list:");
        console.log(file_com_list);
        console.log("file_com_name_set:");
        console.log(file_com_name_set);

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
        var lst = get_selected_com_name_list();

        if (url_crumb == 'null' || url_crumb == '' || url_crumb == undefined) {
            progress_bar_show_msg('Error: URL crumb not found.');
            return;
        }
        else if (lst.length == 0) {
            progress_bar_show_msg('list length = 0.');
            return;
        }
        var str = 'Please make sure that you have a correct URL curmb.\n';
        str += 'Do you want to download the latest data(' + lst.length + ' files)?';
        var r = confirm(str);
        if (r == true)
            download_from_url(lst);
    })

    $('#download_all_from_url').click(function () {
        var lst = get_all_com_name_list();

        if (url_crumb == 'null' || url_crumb == '' || url_crumb == undefined) {
            progress_bar_show_msg('Error: URL crumb not found.');
            return;
        }
        else if (lst.length == 0) {
            progress_bar_show_msg('list length = 0.');
            return;
        }
        var str = 'Please make sure that you have a correct URL curmb.\n';
        str += 'Do you want to download all latest data(' + lst.length + ' files)?';
        var r = confirm(str);
        if (r == true)
            download_from_url(lst);
    })
    $('#check_data').click(function () {
        console.log('===========================================');
        console.log('all_list_info:');
        console.log(all_list_info);
    })
});

function read_data() {

    console.log('===========================================');
    console.log("Reading data...");

    var count = 0;
    reading_data_in_process = 1;
    var lst_name = document.getElementById('select_list_to_download_and_read').value;
    var lst = all_list_info.set[lst_name].com_name_list;
    var curr_lst = [];
    for (var i = 0; i < lst.length; i++) {
        if (lst[i] in file_com_name_set && !(lst[i] in com_set))
            curr_lst.push(lst[i].split('.')[0] + '.csv');
    }
    console.log('curr_lst:');
    console.log(curr_lst);
    if (curr_lst.length == 0) {
        progress_bar_show_msg('Progress: 100% (0/0 Finished)');
        company = "all";
        reading_data_in_process = 0;
        return;
    }
    var col = all_list_info.col;
    for (var i = 0; i < col.length; i++) {
        if (col[i] != '')
            all_list_info.set[col[i]].com = [];
    }
    var save_com = new Array(curr_lst.length);

    for (var i = 0; i < curr_lst.length; i++) {
        $.post(
            '/get_file_info',
            {
                companyID: i,
                file_name: curr_lst[i],
            },
            function (data) {
                save_com[data.id] = data;
                com_set[data.name] = 1;
                count++;
                progress_bar(count, curr_lst.length);
                if (count >= curr_lst.length) {
                    console.log('com_set:');
                    console.log(com_set);
                    all_list_info.set[lst_name].com = save_com;
                    console.log('all_list_info.set[' + lst_name + '].com:');
                    console.log(all_list_info.set[lst_name].com);
                    company = "all";
                    reading_data_in_process = 0;
                    console.log('Finished.');
                }
            }
        );
    }
}

function progress_bar(curr, total) {
    var p = document.getElementById('progress');
    var per = (100 * (curr / total)).toFixed(2);
    if (curr < total)
        p.innerHTML = "Progress: " + per + "% (" + curr + "/" + total + ")";
    else
        p.innerHTML = 'Progress: 100% (' + total + '/' + total + ' Finished)';
}

function progress_bar_show_msg(str) {
    document.getElementById('progress').innerHTML = str;
    console.log(str);
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
    progress_bar_show_msg('');
}

function get_chart() {
    var com_name = curr_company;

    if (!com_name)
        return 0;
    console.log('curr_company: ' + com_name);
    open_chart(com_name);
}

function filter_show_list() {
    var lst = get_selected_com_list();

    console.log('===========================================');
    console.log("Show list");
    if (lst == undefined)
        return ;
    var res = [];

    for (var i = 0; i < lst.length; i++){
        res.push(lst[i].name);
    }
    update_result_area_from_list(res);
    console.log(res);
    filter_list = res;
    return res;
}