function key_detect(e){
    var num;
    num = (window.event) ? e.keyCode : (e.which) ? e.which : -1;
    return num;
}

document.onkeydown = function (event){
    var key = key_detect(event);

    if (key == 13)
    {
        console.log("key: Enter");
        search_company();
    }
    // if (key == 16)
    //     game_object.speed = 2;
    // else if (key == 37)
    //     game_object.move_left = 1;
    // else if (key == 38)
    //     game_object.move_up = 1;
    // else if (key == 39)
    //     game_object.move_right = 1;
    // else if (key == 40)
    //     game_object.move_down = 1;
    // else if (key == 13){
    //     clearInterval(time_interval);
    //     gameStart();
    //     return ;
    // }
    // document.getElementById("test0").innerHTML = "Key press: " + key;
};