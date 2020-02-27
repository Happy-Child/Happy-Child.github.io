const breakpoints = require("%helpers%/breakpoints.js");

const isDesktop = ($(window).width() >= breakpoints.md);

module.exports = isDesktop;
