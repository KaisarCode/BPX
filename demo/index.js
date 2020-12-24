var bpx = require('../index');
bpx({
    src: __dirname+'/src.css',
    out: __dirname+'/out.css'
}, function(str){
    console.log('Compiled!');
});
