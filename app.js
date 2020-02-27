const fs = require('fs');
const express = require('express');
const get_seperator = require('./server/get_seperator');
const express_use = require('./server/express_use');
const express_get_post = require('./server/express_get_post');
const read_data = require('./server/read_data');

var app = express();
var sep = get_seperator();

var data_folder_name = 'data';
var list_folder_name = 'lists';

var info = {
    list_folder_path: __dirname + sep + list_folder_name,
    data_folder_path: __dirname + sep + data_folder_name,
    // company_list_file_path: __dirname + sep + list_folder_name + sep + 'list.csv',
    all_list_file_path: __dirname + sep + list_folder_name + sep + 'All_Optionable_Stocks3000.csv',
    // company_name_list: [],
    file_name_list: [],
    company_msg: [],
    sep: sep,
    url_crumb_path: __dirname + sep + 'server' + sep + 'url_crumb.txt',
    url_crumb: String,
    // list_file_names: [],
    // list_info: [],
    all_list_info: [],
};

// info.company_name_list = read_data.get_company_name_list(info.company_list_file_path);
info.file_name_list = read_data.get_file_name_list(info.data_folder_path);
info.url_crumb = read_data.get_url_curmb(info.url_crumb_path);
// info.list_file_names = read_data.get_file_name_list(info.list_folder_path);
// for (var i = 0; i < info.list_file_names.length; i++)
// {
//     var com_list_file_path = __dirname + sep + list_folder_name + sep + info.list_file_names[i];
//     var com_list = read_data.get_company_name_list(com_list_file_path);
//     info.list_info.push({
//         name: info.list_file_names[i],
//         company_list: com_list,
//     });
// }

info.all_list_info = read_data.get_all_lists(info.all_list_file_path);

console.log("column names of all lists:");
console.log(info.all_list_info.col);
console.log("URL crumb: \"" + info.url_crumb + "\"");
console.log("seperator: \'" + sep + "\'");
// console.log(info.company_name_list);
// console.log(info.file_name_list);
// console.log("company: " + info.company_name_list.length + " companies");
console.log("file:    " + info.file_name_list.length + " files");
// console.log("list files:");
// console.log(info.list_file_names);
// console.log("list info:");
// console.log(info.list_info);




// test

// function read_all_files(){
//     var lst = info.file_name_list;
//     var res = [];
//     for  (var i = 0; i < lst.length; i++){
//         res.push(
//             read_data.read_file_to_obj(info.data_folder_path, lst[i])
//         );
//         if (i % 100 == 0)
//             console.log(i);
//     }
//     return res;
// }

// var all_data = read_all_files();
// console.log(all_data);






/* move file
// fs.renameSync(folder + name, new_folder + name);
*/

if (info.url_crumb == "")
{
    console.log("\nError: URL crumb not found.");
    process.exit();
}

express_use(app);
express_get_post(app, __dirname, info);

app.listen(7000, () => {
    console.log('Server is running(port 7000)...');
});
