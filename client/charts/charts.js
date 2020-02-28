var canvasArea = document.getElementById("canvas1");
var drawArea = canvasArea.getContext("2d");

function show_chart() {
    var name = document.getElementById('chart_com_name').value;
    show_com_chart(name);
}

function get_chart_com_msg(name) {
    var lst = get_selected_com_list();

    for (var i = 0; i < lst.length; i++) {
        if (lst[i].name.toUpperCase() == name.toUpperCase())
            return lst[i].day;
    }
    return;
}

function show_com_chart(name) {
    var msg = get_chart_com_msg(name);
    
    console.log('===========================================');
    if (msg == undefined) {
        progress_bar_show_msg('Message of \"' + name.toUpperCase() + '\" not found');
        return;
    }
    progress_bar_show_msg('Chart of ' + name.toUpperCase());
    
    var width = canvasArea.width, height = canvasArea.height;
    var max = 0, min = 1000000, len = width / 5;
    
    for (var i = 0; i < len && i < msg.length; i++) {
        if (msg[i].high > max)
        max = msg[i].high;
        if (msg[i].low < min)
        min = msg[i].low;
    }
    var max_height = max - min;
    var ratio = height / max_height;
    
    drawArea.clearRect(0, 0, width, height);
    drawArea.fillStyle = 'black';
    drawArea.fillRect(0, 0, width, height);
    for (var i = 0; i < len && i < msg.length; i++) {
        if (is_up_candle(msg[i]))
            drawArea.fillStyle = 'green';
        else if (is_down_candle(msg[i]))
            drawArea.fillStyle = 'red';
        else
            drawArea.fillStyle = 'gray';
        drawArea.fillRect(width - (5 * (i + 1)) + 1, start_high(msg, i, max, ratio), 3, msg[i].body_height * ratio + 1);
        drawArea.fillRect(width - (5 * (i + 1)) + 2, (max - msg[i].high) * ratio, 1, msg[i].height * ratio + 1);
    }

}

function start_high(msg, i, max, ratio){
    var p = (is_up_candle(msg[i])) ? msg[i].close : msg[i].open;

    return (max - p) * ratio;
}

function show_filter_chart() {
    if (filter_list.length == 0)
        return ;
    console.log('Show chart');
    show_com_chart(filter_list[filter_list_index]);
}

function pre_filter_chart() {
    if (filter_list_index > 0){
        console.log('Pre chart');
        --filter_list_index;
        show_com_chart(filter_list[filter_list_index]);
    }
}

function next_filter_chart() {
    if (filter_list_index < filter_list.length - 1){
        console.log('Next chart');
        ++filter_list_index;
        show_com_chart(filter_list[filter_list_index]);
    }
}