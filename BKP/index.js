var is = require('kc-is');
var t2js = require('t2js');
var asbox = require('asbox');
var dwalk = require('kc-dwalk');
var fwalk = require('kc-fwalk');
var fread = require('kc-fread');
var regesc = require('kc-regesc');

module.exports = function(opt, cb) {
    var rx; var str = '';
    
    // Config
    opt = opt || {};
    opt.lib = opt.lib || [];
    opt.src = opt.src || [];
    opt.ext = opt.ext || '.css';
    opt.min = opt.min || false;
    
    // Default CSS config
    opt.cfg = opt.cfg || {};
    opt.cfg.r = opt.cfg.r || 'bpx'; // Root class
    opt.cfg.bps = opt.cfg.bps || ['0']; // Breakpoints
    if (!is.def(opt.cfg.x)) opt.cfg.x = ''; // Selectors prefix
    if (!is.def(opt.cfg.s)) opt.cfg.s = ''; // Selectors separator
    if (!is.def(opt.cfg.fsz)) opt.cfg.fsz = '18px'; // Font size
    if (!is.def(opt.cfg.mxw)) opt.cfg.mxw = 768; // Max width (px)
    if (!is.def(opt.cfg.mnw)) opt.cfg.mnw = 320; // Min width (px)
    if (!is.def(opt.cfg.spc)) opt.cfg.spc = 0.5; // Spacing base (em)
    if (!is.def(opt.cfg.spd)) opt.cfg.spd = 0.5; // Animation speed (s)
    if (!is.def(opt.cfg.drk)) opt.cfg.drk = 30; // Darken rate (%)
    if (!is.def(opt.cfg.rad)) opt.cfg.rad = 4; // Border radius (px)
    
    opt.cfg.clr = opt.cfg.clr || {}; // Color scheme
    opt.cfg.clr.bgc = opt.cfg.clr.bgc || '#E1E1E1'; // Bg
    opt.cfg.clr.sys = opt.cfg.clr.sys || '#CCCCCC'; // System
    opt.cfg.clr.txt = opt.cfg.clr.txt || '#606C76'; // Text
    opt.cfg.clr.lnk = opt.cfg.clr.lnk || '#337AB7'; // Links
    opt.cfg.clr.pnl = opt.cfg.clr.pnl || '#FFFFFF'; // Panels
    opt.cfg.clr.prm = opt.cfg.clr.prm || '#536878'; // Primary
    opt.cfg.clr.sec = opt.cfg.clr.sec || '#77838C'; // Secondary
    opt.cfg.clr.inf = opt.cfg.clr.inf || '#17A2B8'; // Info
    opt.cfg.clr.scc = opt.cfg.clr.scc || '#3AAA35'; // Success
    opt.cfg.clr.dng = opt.cfg.clr.dng || '#DC3545'; // Danger
    opt.cfg.clr.wht = opt.cfg.clr.wht || '#FFFFFF'; // White
    opt.cfg.clr.blk = opt.cfg.clr.blk || '#000000'; // Black
    
    // Callback
    cb = cb || function(){};
    
    // Parse config
    if (typeof opt.lib == 'string')
    opt.lib = [opt.lib]; lib = opt.lib;
    if (typeof opt.src == 'string')
    opt.src = [opt.src]; src = opt.src;
    if (typeof opt.ext == 'string')
    opt.ext = [opt.ext]; ext = opt.ext;
    
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
    str = t2js(str,{
    mini: opt.min });
    asbox(str, opt.cfg, cb);
}
