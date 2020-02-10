
function condition_02() {
    if (curr_company == 'all') {
        clear_result_area();
        console.log('===========================================');
        console.log('Apply condition_02 on all company.');

        var list = [];
        for (var i = 0; i < com.length; i++)
        {
            var msg = com[i].day;
            if (msg[0].volume >= 2 * average_volume(com[i], 1, 10))
            {
                list.push(com[i].name);
            }
        }
        console.log(list);
        update_result_area_from_list(list);
    }
}