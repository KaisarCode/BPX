var fs = require('fs');

// Read file wrapper
function fread(fl, cb) {
    cb = cb || null;
    if (!cb) {
    return fs.readFileSync(fl)+'';
    } else { fs.readFile(fl, cb) }
}

// Export
module.exports = fread;
