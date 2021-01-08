var bpx = require('../index');
var fwt = require('kc-fwrite');
var dir = __dirname;

var conf = {
    wrp: 'app',
    pfx: 'bpx',
    bps: [0, '768px'],
};

bpx({
    src: `${dir}/app.css`,
    out: `${dir}/out.css`,
    cfg: conf
},function(css){
    
});
