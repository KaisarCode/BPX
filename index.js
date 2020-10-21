var t2js = require('t2js');
var asbox = require('asbox');
var watch = require('kc-watch');
var dwalk = require('kc-dwalk');
var fwalk = require('kc-fwalk');
var fread = require('kc-fread');
var fwrite = require('kc-fwrite');
var regesc = require('kc-regesc');

module.exports = function(cfg) {
    
    cfg = cfg || {};
    cfg.lib = cfg.lib || [];
    cfg.src = cfg.src || 'src';
    cfg.out = cfg.out || 'dist';
    cfg.ext = cfg.ext || 't2.css';
    
    if (typeof cfg.src == 'string')
    cfg.src = [cfg.src];
    if (typeof cfg.ext == 'string')
    cfg.ext = [cfg.ext];
    
    var str = '';
    cfg.lib.forEach(function(v){
        str += fread(v);
        str += fread(v);
    });
    
    var src = [];
    cfg.src.forEach(function(d){
        src.push(d);
        var sub = dwalk(d, 1);
        src = src.concat(sub);
    });
    
    var fls = [];
    src.forEach(function(d){
        fwalk(d).forEach(function(f){
            fls.push(f);
        });
    });
    
}
