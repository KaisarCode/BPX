var t2js = require('t2js');
var asbox = require('asbox');
var watch = require('kc-watch');
var dwalk = require('kc-dwalk');
var fwalk = require('kc-fwalk');
var fread = require('kc-fread');
var fwrite = require('kc-fwrite');

// Compile
function compile() {
    var str = '';
    str += fread('node_modules/kc-hex2rgb/hex2rgb.js');
    str += fread('node_modules/kc-rgb2hex/rgb2hex.js');
    fwalk('src').forEach(function(f) {
        if (f.match(/\.css$/)) {
            str += fread(f);
        }
    });
    str = t2js(str,{mini:1});
    fwrite('dist/bpx.js', str);
    asbox(str, null, function(str){
        fwrite('dist/bpx.css', str);
    });
    console.log('Compiled.');
} compile();

// Watch
var dir = dwalk('src');
dir.unshift(dir);
watch(dir, function(d, f){
    if (f.match(/\.css$/)) {
        compile();
    }
});
