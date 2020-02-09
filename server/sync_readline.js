// readline function
function readline(path, buff_size = 128) {
    var f_d = (typeof (path) == "string") ? require('fs').openSync(path, "r") : 0;

    if (typeof (buff_size) != "number" || buff_size < 128)
        buff_size = 128;

    var rl = {
        rd: require('fs').readSync,
        fd: f_d,
        save: { lines: [], index: 0, remain: 0 }, //remain = 1: with non-full-readed line.
        buffsize: buff_size,
        getline: function () {
            if (this.save.lines.length > 0) {
                var s = this.save;
                var curr_line = s.lines[s.index];
                if (curr_line[curr_line.length - 1] == '\r')
                    curr_line.slice(0, -1);
                if (s.index == s.lines.length - 1) {
                    s.lines = (s.remain) ? [s.lines[s.index]] : [];
                    s.index = 0;
                    if (s.remain) { return this.read_file(); }
                }
                else
                    s.index++;
                return curr_line;
            }
            return this.read_file();
        },
        read_file: function () {
            var b = new Buffer.alloc(this.buffsize);
            var bytes, tmp = [], arr = [""], last_char = 1;
            while (tmp.length < 2) {
                if ((bytes = this.rd(this.fd, b, 0, this.buffsize)) <= 0)
                    break;
                tmp = b.toString('utf-8', 0, bytes).split('\n');
                arr[0] += tmp[0];
            }
            if (bytes == 0) {
                if (tmp.length == 0 && this.save.lines.length == 0)
                    return 0;
                last_char = 0;
            }
            if (tmp.length) {
                tmp[0] = arr[0];
                if (tmp[tmp.length - 1].length == 0) {
                    tmp.pop();
                    last_char = 0;
                }
                if (this.save.remain)
                    tmp[0] = this.save.lines.pop() + tmp[0];
            }
            this.save.lines = this.save.lines.concat(tmp);
            this.save.remain = last_char;
            return this.getline();
        },
        close_file: function() {
            require('fs').closeSync(f_d);
        }
    };
    return rl;
}

module.exports = readline;