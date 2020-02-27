const html = $("html");
const isIE = !!(html.hasClass("ie"));

module.exports = isIE;