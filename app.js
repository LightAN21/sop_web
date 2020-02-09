const fs = require('fs');
const express = require('express');
const get_seperator = require('./server/get_seperator');
const express_use = require('./server/express_use');
const express_get_post = require('./server/express_get_post');
const read_data = require('./server/read_data');

var app = express();
var sep = get_seperator();

var data_folder_name = 'data';
var tmp_data_folder_name = 'data_tmp';

var info = {
    data_folder_path: __dirname + sep + data_folder_name,
    company_list_file_path: __dirname + sep + 'server' + sep + 'company_list.csv',
    company_name_list: [],
    file_name_list: [],
    company_msg: [],
    sep: sep,
};

info.company_name_list = read_data.get_company_name_list(info.company_list_file_path);
info.file_name_list = read_data.get_file_name_list(info.data_folder_path);

console.log("seperator: \'" + sep + "\'");
// console.log(info.company_name_list);
// console.log(info.file_name_list);
console.log("company: " + info.company_name_list.length + " companies");
console.log("file:    " + info.file_name_list.length + " files");

/* move file
// fs.renameSync(folder + name, new_folder + name);
*/

express_use(app);
express_get_post(app, __dirname, info);

app.listen(7000, () => {
    console.log('Server is running(port 7000)...');
});
