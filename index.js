var t2js = require('t2js');
var asbox = require('asbox');
var dwalk = require('kc-dwalk');
var fwalk = require('kc-fwalk');
var fread = require('kc-fread');
var regesc = require('kc-regesc');

module.exports = function(cfg, cb) {
    var rx; var str = '';
    
    // Config
    cfg = cfg || {};
    cfg.lib = cfg.lib || [];
    cfg.src = cfg.src || [];
    cfg.min = cfg.min || false;
    cfg.ext = cfg.ext || '.t2.css';
    
    // Callback
    cb = cb || function(){};
    
    // Parse config
    if (typeof cfg.lib == 'string')
    cfg.lib = [cfg.lib]; lib = cfg.lib;
    if (typeof cfg.src == 'string')
    cfg.src = [cfg.src]; src = cfg.src;
    if (typeof cfg.ext == 'string')
    cfg.ext = [cfg.ext]; ext = cfg.ext;
    
    // Load core libs
    str += fread('node_modules/kc-hex2rgb/hex2rgb.js');
    str += fread('node_modules/kc-rgb2hex/rgb2hex.js');
    
    // Load custom libs
    lib.forEach(function(v){
        str += fread(v);
        str += fread(v);
    });
    
    // Load core sources
    fwalk(__dirname+'/src')
    .forEach(function(f){
    str += fread(f); });
    
    // Load custom sources
    rx = ext.map(function(e){
    return regesc(e)+'$'; });
    rx = RegExp(rx.join('|'));
    src.forEach(function(d){
        fwalk(d).forEach(function(f){
            if (f.match(rx))
            str += fread(f);
        });
    });
    
    // Compile
    str = t2js(str, {
    mini: cfg.min });
    asbox(str, null, cb);
}
