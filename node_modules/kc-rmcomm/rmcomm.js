// Remove comments
function rmcomm(str, remove_html_comments) {
    remove_html_comments = remove_html_comments || false;
    var rx = /\/\*[\s\S]*?\*\/|(?<!:)\/\/.*$/gm;
    str = str.replace(rx, '');
    if (remove_html_comments) {
        rx = /<!--[\s\S]*?-->/gm;
        str = str.replace(rx, '');
    }
    return str;
}
