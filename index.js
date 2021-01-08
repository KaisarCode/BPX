var css = require('css');
var frd = require('kc-fread');
var fwt = require('kc-fwrite');
var tgf = require('kc-tagfun');
var rpl = require('kc-strrepl');
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
        c = c.replace(/__BPXCORE/g, dir+'/src');
        return frd(c);
    });
    
    var obj = css.parse(str, { silent: true });
    obj.stylesheet.rules.forEach(function(r) {
        if (r.type == 'rule' && opt.cfg.pfx) {
            r.selectors.map(function(a, i) {
                a = rpl('.', `.${opt.cfg.pfx}-`, a);
                r.selectors[i] = a;
            });
        }
    });
    
    obj = JSON.stringify(obj, null, 4);
    if (opt.out) fwt(opt.out+'.json', obj);
    
    if (opt.out) fwt(opt.out, str);
    cb(str);
}
