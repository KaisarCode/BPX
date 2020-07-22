<?
// Set classes for each breakpoint
function setBPX(enable, cb) {
    enable = enable || false;
    var out = '';
    b = '';
    if (typeof bps == 'undefined') {
        bps = [0];
    } bps.forEach(function(m, b){
        if (b == 0) b = '';
        if (b != 0) b = 'bp'+b+'-';
        if (b == 0) ?>${cb(b)}<?;
        if (b != 0 && enable) {?>
        @media (min-width: ${m}) {
            ${cb(b)}
        }<?}
    });
};

// Set specific breakpoint
function setBP(sz, cb) {
    ?>@media (min-width: ${sz}) {<?
    ?>${cb()}<?
    ?>}<?
}

// RGB to HEX
function rgbToHex(r, g, b) {
  return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
}

// HEX to RGB
function hexToRgb(hex) {
    hex = hex || '';
    hex = hex.toString();
    var shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
    hex = hex.replace(shorthandRegex, function(m, r, g, b) {
        return r + r + g + g + b + b;
    });
    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
        return result ? {
            r: parseInt(result[1], 16),
            g: parseInt(result[2], 16),
            b: parseInt(result[3], 16)
    } : null;
};

// Darken
function cssDarken(hex, amn) {
    var rgb = hexToRgb(hex);
    var r = rgb.r - amn;
    var g = rgb.g - amn;
    var b = rgb.b - amn;
    if (r < 0) r = 0;
    if (g < 0) g = 0;
    if (b < 0) b = 0;
    if (r > 255) r = 255;
    if (g > 255) g = 255;
    if (b > 255) b = 255;
    return rgbToHex(r,g,b);
};

// Vertical gradient
function cssGradY(c1, c2) { return ?>
    background: ${c1};
    background: -moz-linear-gradient(top, ${c1} 0%, ${c2} 100%);
    background: -webkit-linear-gradient(top, ${c1} 0%, ${c2} 100%);
    background: linear-gradient(to bottom, ${c1} 0%, ${c2} 100%);
    filter: progid:DXImageTransform.Microsoft.gradient(
    startColorstr='${c1}',
    endColorstr='${c2}',
    GradientType=0 );
<?};

// Radial gradient
function cssGradRad(c1, c2) { return ?>
    background: ${c1};
    background: -moz-radial-gradient(center, ellipse cover, ${c1} 0%, ${c2} 100%);
    background: -webkit-radial-gradient(center, ellipse cover, ${c1} 0%, ${c2} 100%);
    background: radial-gradient(ellipse at center, ${c1} 0%, ${c2} 100%);
    filter: progid:DXImageTransform.Microsoft.gradient(
    startColorstr='${c1}',
    endColorstr='${c2}',
    GradientType=1 );
<?};

// Vertical gloss
function cssGlossY(c1, c2) { return ?>
    background: ${c1};
    background: -webkit-gradient(linear, left top, left bottom,
    from(${c1}),
    color-stop(50%, ${c1}),
    color-stop(50%, ${c2}),
    to(${c2}));
    background: linear-gradient(to bottom,
    ${c1} 0%,
    ${c1} 50%,
    ${c2} 50%,
    ${c2} 100%);
<?};

// Vertical text gradient
function cssGradTxtY(c1, c2) { return ?>
    background: -webkit-linear-gradient(
    ${c1},${c2});
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
<?};

// Set colors
/*
@param n: selector prefix (e.g: bg)
@param k: color class key (e.g: prm)
@param m: modifier name (e.g: lgt)
@param a: property name (e.g: border-color)
@param c: color (e.g: #fff)
@param d: darken rate (e.g: 30)
*/
function setCSSColorsBase(n, k, m, a, c, d) {
return ?>
.${r} .${x}${s}${n}-${k}${m} { ${a}: ${cssDarken(c, d)}; }
.${r} .${x}${s}${n}-${k}${m}-hvr:hover { ${a}: ${cssDarken(c, d)}; }
.${r} .${x}${s}${n}-${k}${m}-fcs:focus { ${a}: ${cssDarken(c, d)}; }
.${r} .${x}${s}${n}-${k}${m}-act.${x}${s}act { ${a}: ${cssDarken(c, d)}; }
<?};
function setCSSColors(n, k, a, c, d) {
var vrts = '';
vrts += setCSSColorsBase(n, k, '', a, c, 0);
vrts += setCSSColorsBase(n, k, '-lgt', a, c, -d);
vrts += setCSSColorsBase(n, k, '-drk', a, c,  d);
return vrts; };

?>