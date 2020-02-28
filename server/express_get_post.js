// const express = require('express');
// const bodyParser = require('body-parser');

/*

var info = {
    data_folder_path,
    company_list_file_path,
    company_name_list,
    file_name_list,
    company_msg,
    sep,
};

*/

const read_data = require('../server/read_data');

function express_get_post(app, main_dir, info) {
    app.get('/', function (req, res) {
        res.sendFile('./client/index.html', { root: main_dir });
    });

    app.get('/get_file_name_list', function (req, res) {
        res.send(info.file_name_list);
        res.end();
    });

    app.get('/get_url_crumb', function (req, res) {
        res.send(info.url_crumb);
        res.end();
    });

    app.post('/get_file_info', function (req, res) {
        var id = req.body.companyID;
        var file_name = req.body.file_name;
        var company_msg = read_data.read_file_to_obj(info.data_folder_path, file_name);
        if (company_msg != undefined)
            company_msg.id = id;
        res.send(company_msg);
        res.end();
    });

    app.get('/get_list_info', function (req, res) {
        res.send(info.list_info);
        res.end();
    });

    app.get('/get_all_list_info', function (req, res) {
        res.send(info.all_list_info);
        res.end();
    });

    // jtsai client
    app.get('/jtsai_client', function (req, res) {
        res.sendFile('./client/jtsai_index.html', { root: main_dir });
    });
}

module.exports = express_get_post;