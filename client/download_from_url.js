
var url_counter = 0;
var timeoutID;
var curr_set;
var crumb = 'HQ5cJMNGoJ2'; // different computer/ip will have different crumb

function download_from_url() {
    console.log('===========================================');
    console.log('Downloading latest data...');

    curr_set = com_list;
    url_counter = 0;
    timeoutID = window.setInterval(download_com_data_fast, 2000);

}

function download_com_data() {
    var name = curr_set[url_counter];
    if (name == undefined){
        console.log('');
        console.log('Finished.');
        console.log('Total number of downloaded files: '+ url_counter);
        url_counter = 0;
        window.clearInterval(timeoutID);
        return ;
    }
    // var name = com.name;
    console.log('');
    console.log('download: ' + name);

    var url_0 = "https://query1.finance.yahoo.com/v7/finance/download/" + name;
    var url_1 = "?period1=-252345600&period2=9999999999";
    var url_2 = "&interval=1d&events=history&crumb=" + crumb;
    
    var link = document.createElement('a');
    link.href = url_0 + url_1 + url_2;
    link.download = name +".csv";
    link.click();
    url_counter++;
}

function download_com_data_fast() {
    if (curr_set[url_counter] == undefined) {
        console.log('');
        console.log('Finished.');
        console.log('Total number of downloaded files: ' + url_counter);
        url_counter = 0;
        window.clearInterval(timeoutID);
        return;
    }

    var len = 15;

    var counter_end = url_counter + len;
    if (counter_end > curr_set.length){
        counter_end = curr_set.length;
    }

    var url_list = [];
    for (var i = url_counter; i < counter_end; i++){
        url_list.push(get_yahoo_url(curr_set[i]));
    }

    for (var i = 0; i < url_list.length; i++){
        window.open(url_list[i], '');
    }

    url_counter = counter_end;
}

function get_yahoo_url(name){
    var url_0 = "https://query1.finance.yahoo.com/v7/finance/download/" + name;
    var url_1 = "?period1=-252345600&period2=9999999999";
    var url_2 = "&interval=1d&events=history&crumb=" + crumb;

    return url_0 + url_1 + url_2;
}

function test_url_counter(){
    var name = curr_set[url_counter];
    if (name == undefined){
        console.log('');
        console.log('Finished.');
        console.log('Total number: '+ url_counter);
        url_counter = 0;
        window.clearInterval(timeoutID);
        return ;
    }
    console.log('');
    console.log(url_counter);
    url_counter++;
}