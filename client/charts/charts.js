var canvasArea = document.getElementById("canvas1");
var drawArea = canvasArea.getContext("2d");

function get_chart_com_name(){
    var n = document.getElementById('chart_com_name').value;

    console.log(n);
    return n;
}

function show_chart(){
    var name = get_chart_com_name();
    var width = canvasArea.width, height = canvasArea.height;

    drawArea.clearRect(0, 0, width, height);
    drawArea.fillStyle = 'black';
    drawArea.fillRect(0, 0, width, height);

    drawArea.fillStyle = 'gray';
    drawArea.fillRect(100, 200, 5, 30);
    
    drawArea.fillRect(102, 180, 1, 80);


}