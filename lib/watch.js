// Watch
var fs = require('fs');
var pt = require('path');
var pr = pt.resolve;
var st = fs.lstatSync;

function watch(dr, cb){
    dr = dr || __dirname;
    dr = fs.realpathSync(dr);
    cb = cb || function(){};
    fs.watch(dr,
    function(e, f){
    cb(dr, f, e);});
    fs.readdirSync(dr)
    .forEach(function(d){
        d = pr(dr, d);
        st(d).isDirectory()
        && watch(d, cb);
    });
}

// Export
module.exports = watch;

