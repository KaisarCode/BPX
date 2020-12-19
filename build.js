var wtc = require('./lib/watch');
var run = require('./lib/asbox');
var mkd = require('./lib/mkdir');
var dwk = require('./lib/dwalk');
var fwk = require('./lib/fwalk');
var frd = require('./lib/fread');
var fwt = require('./lib/fwrite');
var f2m = require('./lib/fun2mod');
var t2j = f2m('./lib/t2js.js', 't2js');
var stm = f2m('./lib/strmin.js', 'strmin');
var rmc = f2m('./lib/rmcomm.js', 'rmcomm');
var tgf = f2m('./lib/tagfun.js', 'tagfun');

// build CSS
function build(dir) {
    var str = '';
    var thm = dir.split('/').pop();
    fwk(dir,1).forEach(function(f){
        str += frd(f);
    });
    
    str = rmc(str);
    str = stm(str);
    
    str = t2j(str);
    mkd('dist/'+thm);
    run(str, prm, function(str){
        console.log(thm+' compiled.');
        fwt('dist/'+thm+'/style.css',str);
    }); fwt('dist/'+thm+'/style.js', str);
}

// Watch file changes
dwk('src').forEach(function(t){
    var drs = dwk(t,true,true);
    drs.forEach(function(d){
    wtc(d, function(d, f){
        f.match(/\.css$/)
        && build(t);
    });}); build(t);
});
