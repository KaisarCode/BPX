var wtc = require('kc-watch');
var mkd = require('kc-mkdir');
var dwk = require('kc-dwalk');
var fwk = require('kc-fwalk');
var frd = require('kc-fread');
var fwt = require('kc-fwrite');
var stm = require('kc-strmin');
var rmc = require('kc-rmcomm');
var tgf = require('kc-tagfun');
var t2j = require('t2js');
var run = require('asbox');

// build CSS
function build(dir) {
    var str = '';
    var thm = '';
    
    // Source
    thm = dir.split('/').pop();
    str = frd(dir+'/index.css');
    str = tgf(str, '@{', '}', function(c){
        return frd(c);
    }); 
    
    // Compile
    mkd('app');
    str = t2j(str);
    run(str, null, function(str){
        str = rmc(str);
        str = stm(str);
        fwt('app/'+thm+'.css',str);
        console.log(thm+' theme built.');
    });
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
