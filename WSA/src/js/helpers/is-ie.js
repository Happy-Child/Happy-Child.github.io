const html = $("html");
const isIE = (html.hasClass("ie")) ? true : false;

module.exports = isIE;