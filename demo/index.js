var bpx = require('../index');
var fwt = require('kc-fwrite');
var dir = __dirname;

bpx({
    src: `${dir}/app.css`,
    out: `${dir}/out.css`,
},function(css){
    
    console.log('CSS compiled');
});
