// Simple minify (Remove new lines and multiple spaces)
function strmin(str) {
    str = str.replace(/\s+/g, ' ');
    str = str.trim();
    return str;
}
