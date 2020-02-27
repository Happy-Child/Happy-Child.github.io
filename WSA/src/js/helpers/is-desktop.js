const breakpoints = require("%helpers%/breakpoints.js");

const isDesktop = ( $(window).width() >= breakpoints.md ) ? true : false;

module.exports = isDesktop;
