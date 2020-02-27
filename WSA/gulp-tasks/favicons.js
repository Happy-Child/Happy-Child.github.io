"use strict";

import { paths } from "../gulpfile.babel";
import gulp from "gulp";
import realFavicon from "gulp-real-favicon";

const FAVICON_DATA_FILE = "faviconData.json"; // File where the favicon markups are stored

gulp.task("generate-favicons", function(done) {
	realFavicon.generateFavicon({
		masterPicture: paths.favicons.src,
		dest: paths.favicons.dist,
		iconsPath: "/",
		design: {
			ios: {
				pictureAspect: "noChange",
				assets: {
					ios6AndPriorIcons: false,
					ios7AndLaterIcons: false,
					precomposedIcons: false,
					declareOnlyDefaultIcon: true
				}
			},
			desktopBrowser: {},
			windows: {
				pictureAspect: "noChange",
				backgroundColor: "#da532c",
				onConflict: "override",
				assets: {
					windows80Ie10Tile: false,
					windows10Ie11EdgeTiles: {
						small: false,
						medium: true,
						big: false,
						rectangle: false
					}
				}
			},
			androidChrome: {
				pictureAspect: "noChange",
				themeColor: "#ffffff",
				manifest: {
					display: "standalone",
					orientation: "notSet",
					onConflict: "override",
					declared: true
				},
				assets: {
					legacyIcon: false,
					lowResolutionIcons: false
				}
			},
			safariPinnedTab: {
				pictureAspect: "silhouette",
				themeColor: "#5bbad5"
			}
		},
		settings: {
			scalingAlgorithm: "Mitchell",
			errorOnImageTooSmall: false,
			readmeFile: false,
			htmlCodeFile: false,
			usePathAsIs: false
		},
		markupFile: FAVICON_DATA_FILE
	}, function() {
		done();
	});
});
