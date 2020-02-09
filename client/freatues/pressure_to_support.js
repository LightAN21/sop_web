
function pressure_to_support_list(com, type = 'day') {
    var msg = com[type];
    var list;

    get_fractal_list(com, type);
    list = com.fractal[type];
    console.log(list);
}

function show_pressure_to_support_list() {
    console.log('===========================================');
    if (curr_company == 0)
        return;
    if (curr_company != 'all') {
        console.log('pressure_to_support_list of '+ curr_company.name + ':');
        pressure_to_support_list(curr_company);
    }
}
