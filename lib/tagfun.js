// Replace tags by function output
function tagfun(str, tg1, tg2, fun) {
    // escape regex chars
    var rx = /[|\\{}()[\]^$+*?.-]/gm;
    var t1 = tg1.replace(rx, '\\$&');
    var t2 = tg2.replace(rx, '\\$&');
    // replace tags
    rx = t1+'([\\s\\S]*?)'+t2;
    rx = new RegExp(rx,'gim');
    if (str.match(rx)) {
    str = str.replace(rx,
    function(a,c) { return fun(c) });
    str = tagfun(str, tg1, tg2, fun);
    } return str;
}
