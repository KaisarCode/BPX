var fs = require('fs');
var vm = require('vm');
var t2js = require('t2js');
var watch = require('kc-watch');
var dwalk = require('kc-dwalk');
var fwalk = require('kc-fwalk');
var fread = require('kc-fread');
var fwrite = require('kc-fwrite');
var strmin = require('kc-strmin');
var rmcomm = require('kc-rmcomm');

var runCSS = function() {
    var str = '';
    fwalk('src').forEach(function(f){
        str += fread(f);
    });
    str = t2js(str, {
        mode: 'tpl'
    });
    str = rmcomm(str);
    str = vm.runInNewContext(str);
    str = strmin(str);
    str = str.trim();
    fwrite('dist/style.css', str);
    console.log('CSS Compiled');
}

runCSS();
var dir = dwalk('src');
dir.unshift('src');
watch(dir, function(d, f, e){
    if (
    !d.match(/^\./g) &&
    !f.match(/^\./g)
    ) { runCSS(); }
});
