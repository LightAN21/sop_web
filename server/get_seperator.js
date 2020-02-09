function get_seperator(){
    var win = __dirname.split('\\');

    if (win.length > 1){
        return '\\';
    }
    else {
        return '/';
    }
}

module.exports = get_seperator;