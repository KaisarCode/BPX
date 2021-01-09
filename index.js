var mrg = require('kc-obj-merge');
var frd = require('kc-fread');
var fwt = require('kc-fwrite');
var stm = require('kc-strmin');
var rmc = require('kc-rmcomm');
var tgf = require('kc-tagfun');
var run = require('asbox');
var t2j = require('t2js');
var dir = __dirname;

module.exports = function(opt, cb){
    opt = opt || {};
    opt.cfg = opt.cfg || {};
    opt.src = opt.src || '';
    opt.out = opt.out || '';
    cb = cb || function(){};
    var str = '';
    
    // Load source
    if (opt.src) str += frd(opt.src);
    
    // Parse templates
    str = tgf(str, '@{', '}', function(c){
        c = c.replace(/__BPX/g, dir+'/src');
        return frd(c);
    }); str = t2j(str);
    
    // Load configs
    var cfg = frd(dir+'/src/conf.json');
    cfg = rmc(cfg);
    cfg = JSON.parse(cfg);
    cfg = mrg(cfg, opt.cfg);
    
    // Build CSS
    run(str, cfg, function(str){
        str = rmc(str);
        str = stm(str);
        if (opt.out) fwt(opt.out, str);
        cb(str);
    });
}
