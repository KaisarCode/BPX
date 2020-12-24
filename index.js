var mrg = require('kc-obj-merge');
var frd = require('kc-fread');
var fwt = require('kc-fwrite');
var stm = require('kc-strmin');
var rmc = require('kc-rmcomm');
var tgf = require('kc-tagfun');
var t2j = require('t2js');
var run = require('asbox');
var dir = __dirname;

module.exports = function(opt, cb){
    opt = opt || {};
    opt.cfg = opt.cfg || {};
    opt.src = opt.src || '';
    opt.out = opt.out || 'build.css';
    opt.wtc = opt.wtc || false;
    cb = cb || function(){};
    var str = '';
    
    // Load core
    str += frd(dir+'/src/init.css');
    
    // Load source
    if (opt.src) str += frd(opt.src);
    
    // Parse templates
    str = tgf(str, '@{', '}', function(c){
        c = c.replace(/__core/g, dir+'/src');
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
