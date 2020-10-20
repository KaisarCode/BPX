var t2js = require('t2js');
var asbox = require('asbox');
var watch = require('kc-watch');
var dwalk = require('kc-dwalk');
var fwalk = require('kc-fwalk');
var fread = require('kc-fread');
var fwrite = require('kc-fwrite');
var regexp = /\.css$|\.js$/;

// Compile
function compile() {
    var str = '';
    
    // Include libs
    str += fread('node_modules/kc-hex2rgb/hex2rgb.js');
    str += fread('node_modules/kc-rgb2hex/rgb2hex.js');
    
    // Read TPLs
    fwalk('src').forEach(function(f) {
    if (f.match(regexp)) {
    str += fread(f); } });
    
    // Compile to JS
    str = t2js(str,{ mini:1 });
    
    // Save JS
    fwrite('dist/bpx.js', str);
    
    // Eval JS
    asbox(str, null, function(str){
        
        // Save CSS
        fwrite('dist/bpx.css', str);
    });
    
    // Done
    console.log('Compiled.');
    
} compile();

// Watch
var dir = dwalk('src');
dir.unshift('src');
dir.forEach(function(d){
    watch(d, function(d, f){
        if (f.match(regexp)) {
            compile();
        }
    });
});

