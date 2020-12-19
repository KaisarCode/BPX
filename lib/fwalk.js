// List files in path
var fs = require('fs');
var pt = require('path');
var pr = pt.resolve;
var st = fs.lstatSync;

function fwalk(p, r, a = []) {
    fs.readdirSync(p)
    .forEach(function(d){
        d = pr(p, d);
        !st(d).isDirectory()
        && a.push(d);
        st(d).isDirectory() && r
        && a.concat(fwalk(d,r,a));
    }); return a;
}

module.exports = fwalk;
