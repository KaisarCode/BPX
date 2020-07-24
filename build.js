var fs = require('fs');
var vm = require('vm');
var t2js = require('t2js');
var jrun = vm.runInNewContext;
var watch = require('kc-watch');
var dwalk = require('kc-dwalk');
var fwalk = require('kc-fwalk');
var fread = require('kc-fread');
var fwrite = require('kc-fwrite');
var strmin = require('kc-strmin');
var rmcomm = require('kc-rmcomm');

var runCSS = function() {
    var str = '';
    fwalk('./').forEach(function(f){
        if (f.match(/\.t2\.css$/ig)) {
        str += fread(f); }
    });
    str = t2js(str, {
        mode: 'tpl'
    });
    str = rmcomm(str);
    str = jrun(str);
    str = strmin(str);
    str = str.trim();
    fwrite('dist/style.css', str);
    console.log('CSS Compiled');
}

runCSS();
var dir = dwalk('./');
watch(dir, function(d, f, e){
    if (
    f.match(/\.t2\.css$/ig)
    ) { runCSS(); }
});
