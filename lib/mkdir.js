// Create deirectory
var fs = require('fs');
function mkdir(pth) {
    if (!fs.existsSync(pth)) fs.mkdirSync(pth);
}

// Export
module.exports = mkdir;
