var bpx = require('./index');
var watch = require('kc-watch');
var dwalk = require('kc-dwalk');
var fwrite = require('kc-fwrite');
var dn = __dirname;

// Compile
function compile() {
    bpx({min:1}, function(c){
    fwrite(dn+'/dist/bpx.css', c);
    console.log('Compiled.'); });
} compile();

// Watch
watch(dn+'/src', function(d, f){
    var rx = /\.css$|\.js$/;
    if (f.match(rx)) compile();
});
