<?
/* Set breakpoints */
function setBPX(bps, cb) {
    var out = '';
    bps.forEach(function(m, b) {
        if (b) {
            out += ?>
            @media (min-width: ${m}) {
                ${cb('bp'+b+'-')}
            }
            <?
        } else { out += cb(''); }
    }); return out;
}

/* Darken color */
function darken(hex, amn) {
    var rgb = hex2rgb(hex);
    var r = rgb.r - amn;
    var g = rgb.g - amn;
    var b = rgb.b - amn;
    if (r < 0) r = 0;
    if (g < 0) g = 0;
    if (b < 0) b = 0;
    if (r > 255) r = 255;
    if (g > 255) g = 255;
    if (b > 255) b = 255;
    return rgb2hex(r,g,b);
}

/* Horizontal gradient */
function gradX(c1, c2) { return ?>
    background: ${c1};
    background: -moz-linear-gradient(left, ${c1} 0%, ${c2} 100%);
    background: -webkit-linear-gradient(left, ${c1} 0%, ${c2} 100%);
    background: linear-gradient(to right, ${c1} 0%, ${c2} 100%);
    filter: progid:DXImageTransform.Microsoft.gradient(
    startColorstr='${c1}',
    endColorstr='${c2}',
    GradientType=1 );
<?};

/* Vertical gradient */
function gradY(c1, c2) { return ?>
    background: ${c1};
    background: -moz-linear-gradient(top, ${c1} 0%, ${c2} 100%);
    background: -webkit-linear-gradient(top, ${c1} 0%, ${c2} 100%);
    background: linear-gradient(to bottom, ${c1} 0%, ${c2} 100%);
    filter: progid:DXImageTransform.Microsoft.gradient(
    startColorstr='${c1}',
    endColorstr='${c2}',
    GradientType=0 );
<?};

/* Radial gradient */
function gradC(c1, c2) { return ?>
    background: ${c1};
    background: -moz-radial-gradient(center, ellipse cover, ${c1} 0%, ${c2} 100%);
    background: -webkit-radial-gradient(center, ellipse cover, ${c1} 0%, ${c2} 100%);
    background: radial-gradient(ellipse at center, ${c1} 0%, ${c2} 100%);
    filter: progid:DXImageTransform.Microsoft.gradient(
    startColorstr='${c1}',
    endColorstr='${c2}',
    GradientType=1 );
<?};

/* Horizontal gloss */
function glossX(c1, c2) { return ?>
    background: ${c1};
    background: -webkit-gradient(linear, left top, right top,
    from(${c1}),
    color-stop(50%, ${c1}),
    color-stop(50%, ${c2}),
    to(${c2}));
    background: linear-gradient(to right,
    ${c1} 0%,${c1} 50%,${c2} 50%,${c2} 100%);
<?};

/* Vertical gloss */
function glossY(c1, c2) { return ?>
    background: ${c1};
    background: -webkit-gradient(linear, left top, left bottom,
    from(${c1}),
    color-stop(50%, ${c1}),
    color-stop(50%, ${c2}),
    to(${c2}));
    background: linear-gradient(to bottom,
    ${c1} 0%,${c1} 50%,${c2} 50%,${c2} 100%);
<?};

?>