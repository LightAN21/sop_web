/*

info = [company1, company2, ..., companyN]

companyK = {
    name: file[i].split('.')[0],    // company name
    id: i,                          // in which index of info
    day: [],                        // all daily mseeages of such company
    id_date: {},                    // index of the datetime of messages(hash table)
    min: 10000,                     // min price in all period
    max: -10000                     // max price in all period
    // fractal: {
        day: [],
        W: [],
        M: [],
        ...
    },
}

day = [message1, message2, ..., messageM]

messageK = {
    id: new_info.day.length,
    time: arr[0],
    weekday: 0,
    open: Number(arr[1]),
    high: Number(arr[2]),
    low: Number(arr[3]),
    close: Number(arr[4]),
    per_change: 0.0,
    per_soft_gap: 0.0,
    per_hard_gap: 0.0, // if not hard gap, value = -1
    mid: 0,
    height: 0,
    height_sum: 0,
    adjusted_close: Number(arr[5]),
    volume: Number(arr[6]),
    volume_sum: 0,
    dividend_amount: Number(arr[7]),
    split_coefficient: Number(arr[8])
}

*/

const fs = require("fs");
const sync_rl = require('./sync_readline');

function get_company_name_list(file_path)
{
    var rl = sync_rl(file_path);
    var com_set = {};
    var com_list = [];

    while ((line = rl.getline()) != 0)
    {
        if (!(line in com_set))
        {
            com_set[line] = 1;
            com_list.push(line);
        }
    }
    return com_list;
}

function get_file_name_list(folder_path, sep = '/') {
    var pa = fs.readdirSync(folder_path);
    var file_name_list = [];

    pa.forEach(function (name) {
        var stat = fs.statSync(folder_path + sep + name);
        if (!stat.isDirectory()) {
            file_name_list.push(name);
        }
    })
    return file_name_list;
}

function read_file_to_obj(folder_path, filename) {
    var rl = sync_rl(folder_path + '/' + filename, 2048);

    var line = rl.getline();
    var new_info = {
        name: filename.split('.')[0],    // insert name from file name
        day: [],
    };

    while ((line = rl.getline()) != "") {
        var arr = line.split(',');
        var t = arr[0].split('-');

        if (Number(t[0]) < 2000)
            continue ;
        var tmp = {
            id: new_info.day.length,
            time: arr[0],
            year: Number(t[0]),
            month: Number(t[1]),
            date: Number(t[2]),
            weekday: 0,
            open: Number(Number(arr[1]).toFixed(2)),
            high: Number(Number(arr[2]).toFixed(2)),
            low: Number(Number(arr[3]).toFixed(2)),
            close: Number(Number(arr[4]).toFixed(2)),
            mid: 0,
            height: 0,
            body_height: 0,
            volume: Number(arr[6]),
        };

        tmp.weekday = new Date(tmp.time).getDay() + 1;
        tmp.mid = ((tmp.high + tmp.low) / 2);
        tmp.height = tmp.high - tmp.low;
        tmp.body_height = (tmp.open > tmp.close) ? (tmp.open - tmp.close) : (tmp.close - tmp.open);
        new_info.day.push(tmp);
    }
    rl.close_file();

    var d = new_info.day
    var left = 0, right = d.length - 1;
    while (left < right) {
        var tmp = d[left];
        d[left] = d[right];
        d[right] = tmp;
        var tmp_id = d[left].id;
        d[left].id = d[right].id;
        d[right].id = tmp_id;
        left++;
        right--;
    }

    return new_info;
}

module.exports = {
    get_file_name_list: get_file_name_list,
    read_file_to_obj: read_file_to_obj,
    get_company_name_list: get_company_name_list,
};