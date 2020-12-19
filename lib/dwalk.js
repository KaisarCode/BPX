var fs = require('fs');
var pt = require('path');
var pr = pt.resolve;
var st = fs.lstatSync;
var rp = fs.realpathSync;

// List dirs in path
function dwalk(p, r, i = 0, a = []) {
    p = rp(p);
    // Unshift parent
    a.indexOf(p)==-1&&
    i && a.unshift(p);
    // Read inner dirs
    fs.readdirSync(p)
    .forEach(function(d){
        // Resolve path
        d = pr(p, d);
        // Concat dirs
        st(d).isDirectory()
        && a.push(d) && r &&
        a.concat(dwalk(d,r,i,a));
    }); return a;
}

// Export
module.exports = dwalk;
