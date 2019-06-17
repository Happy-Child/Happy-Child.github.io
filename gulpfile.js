'use strict';

const options = {
	syntax: "sass",
	cssMin: true, // True or false
	jsMin: true // True or false
}

const gulp 					= require('gulp'),
			gulpIf 				= require('gulp-if'),
			rename 				= require('gulp-rename'),
			concat 				= require('gulp-concat'),
			browserSync 	= require('browser-sync'),
			notify 				= require("gulp-notify"),

			sass 					= require('gulp-sass'),
			cssnano 			= require('gulp-cssnano'),
			gcmq					=	require('gulp-group-css-media-queries'),
			autoprefixer  = require('gulp-autoprefixer'),
			
			uglify				= require('gulp-uglify-es').default,
			babel 				= require("gulp-babel");









//Autoreload --------------------------------------- START
gulp.task('browser-sync', () => 
	browserSync({
		server: {
			baseDir: 'app'
		},
		notify: false
	})
);
//Autoreload --------------------------------------- END








//Styles --------------------------------------- START
gulp.task('styles-common', () =>
	gulp.src(`app/${options.syntax}/main.${options.syntax}`)
	.pipe(sass({ outputStyle: 'expanded' }).on("error", notify.onError()))
	.pipe(autoprefixer(['last 15 versions']))
	.pipe(gcmq())
	.pipe(concat('styles.css'))
	.pipe(gulp.dest('app/css'))
	.pipe(browserSync.stream())
);

gulp.task('styles-libs', () =>
	gulp.src([
		'app/libs/reset.css/reset.min.css',
		'app/libs/animate.css/animate.min.css',
		'app/libs/magnific-popup/magnific-popup.css',
		'app/libs/slick/slick.css',
	])
	.pipe(concat('libs.css'))
	.pipe(gulp.dest('app/css'))
	.pipe(browserSync.stream())
);

gulp.task('styles-fonts', () =>
	gulp.src(`app/${options.syntax}/fonts.${options.syntax}`)
	.pipe(sass({ outputStyle: 'expanded' }).on("error", notify.onError()))
	.pipe(autoprefixer(['last 15 versions']))
	.pipe(concat('fonts.css'))
	.pipe(gulp.dest('app/css'))
	.pipe(browserSync.stream())
);

gulp.task('styles-ie', () =>
	gulp.src(`app/${options.syntax}/styles-ie.${options.syntax}`)
	.pipe(sass({ outputStyle: 'expanded' }).on("error", notify.onError()))
	.pipe(autoprefixer(['last 15 versions']))
	.pipe(concat('styles-ie.min.css'))
	.pipe(gulp.dest('app/css'))
	.pipe(browserSync.stream())
);

gulp.task('styles-concat', ['styles-libs', 'styles-fonts', 'styles-common'], () =>
	gulp.src([
		'app/css/libs.css',
		'app/css/fonts.css',
		'app/css/styles.css'
	])
	.pipe(concat('main.min.css'))
	.pipe(gulp.dest('app/css'))
	.pipe(browserSync.stream())
);

gulp.task('styles-build', ['styles-concat', 'styles-ie'], () =>
	gulp.src('app/css/main.min.css')
	.pipe(cssnano({discardComments: {removeAll: true}}))
	.pipe(gulp.dest('app/css'))
	.pipe(browserSync.stream())
);

gulp.task('styles-build-nomin', ['styles-concat', 'styles-ie'], () =>
	gulp.src('app/css/main.min.css')
	.pipe(concat('main.css'))
	.pipe(gulp.dest('app/css'))
	.pipe(browserSync.stream())
);


gulp.task('styles-ie', () =>
	gulp.src(`app/${options.syntax}/styles-ie.${options.syntax}`)
	.pipe(sass({ outputStyle: 'expanded' }).on("error", notify.onError()))
	.pipe(autoprefixer(['last 15 versions']))
	.pipe(concat('styles-ie.min.css'))
	.pipe(gulp.dest('app/css'))
	.pipe(browserSync.stream())
);

gulp.task('styles-edge', () =>
	gulp.src(`app/${options.syntax}/styles-edge.${options.syntax}`)
	.pipe(sass({ outputStyle: 'expanded' }).on("error", notify.onError()))
	.pipe(autoprefixer(['last 15 versions']))
	.pipe(concat('styles-edge.min.css'))
	.pipe(gulp.dest('app/css'))
	.pipe(browserSync.stream())
);

gulp.task('styles-ie-build', ['styles-ie'], () =>
	gulp.src('app/css/styles-ie.min.css')
	.pipe(cssnano({discardComments: {removeAll: true}}))
	.pipe(gulp.dest('app/css'))
	.pipe(browserSync.stream())
);

gulp.task('styles-ie-build-nomin', ['styles-ie'], () =>
	gulp.src('app/css/styles-ie.min.css')
	.pipe(gulp.dest('app/css'))
	.pipe(browserSync.stream())
);


gulp.task('styles-edge-build', ['styles-edge'], () =>
	gulp.src('app/css/styles-edge.min.css')
	.pipe(cssnano({discardComments: {removeAll: true}}))
	.pipe(gulp.dest('app/css'))
	.pipe(browserSync.stream())
);

gulp.task('styles-edge-build-nomin', ['styles-edge'], () =>
	gulp.src('app/css/styles-edge.min.css')
	.pipe(gulp.dest('app/css'))
	.pipe(browserSync.stream())
);
//Styles --------------------------------------- END









//Scripts --------------------------------------- START
gulp.task('scripts-babel', () =>
	gulp.src([
		'app/js/common.js'
	])
	.pipe(concat('common-babel.js'))
	.pipe(babel({presets: ['es2015']}))
	.pipe(gulp.dest('app/js'))
	.pipe(browserSync.reload({ stream: true }))
);

gulp.task('scripts-libs', () =>
	gulp.src([
		'app/libs/jquery/jquery.min.js',
		'app/libs/jq-mask/jquery.mask.min.js',
		'app/libs/wow.js/wow.min.js',
		'app/libs/select2/select2.min.js',
		'app/libs/magnific-popup/jquery.magnific-popup.min.js',
		'app/libs/slick/slick.min.js',
		'app/libs/lazyload/lazyload.min.js',
		'app/libs/spincrement/jquery.spincrement.min.js',
	])
	.pipe(concat('libs.js'))
	.pipe(gulp.dest('app/js'))
	.pipe(browserSync.reload({ stream: true }))
);

gulp.task('scripts-concat', ['scripts-libs', 'scripts-babel'], () =>
	gulp.src([
		'app/js/libs.js',
		'app/js/common-babel.js'
	])
	.pipe(concat('scripts.js'))
	.pipe(rename({ suffix: '.min', prefix : '' }))
	.pipe(gulp.dest('app/js'))
	.pipe(browserSync.reload({ stream: true }))
);

gulp.task('scripts-build', ['scripts-concat', 'scripts-babel'], () =>
	gulp.src([
		'app/js/libs.js',
		'app/js/common-babel.js'
	])
	.pipe(concat('scripts.js'))
	.pipe(rename({ suffix: '.min', prefix : '' }))
	.pipe(uglify())
	.pipe(gulp.dest('app/js'))
	.pipe(browserSync.reload({ stream: true }))
);

gulp.task('scripts-build-nomin', ['scripts-concat', 'scripts-babel'], () =>
	gulp.src([
		'app/js/libs.js',
		'app/js/common-babel.js'
	])
	.pipe(concat('scripts.js'))
	.pipe(gulp.dest('app/js'))
	.pipe(browserSync.reload({ stream: true }))
);
//Scripts --------------------------------------- END







//Watch --------------------------------------- START
gulp.task('watch', ['styles-concat', 'styles-ie', 'scripts-concat', 'browser-sync'], () => {
	gulp.watch(`app/*.html`, browserSync.reload);

	gulp.watch([
		`app/pages/**/*.${options.syntax}`,
		`app/modules/**/*.${options.syntax}`,
		`app/${options.syntax}/**/*.${options.syntax}`], ['styles-build']);

	gulp.watch(['app/js/common.js'], ['scripts-concat']);
});
//Watch --------------------------------------- END










//Build --------------------------------------- START
gulp.task('b', gulpIf((options.cssMin && options.jsMin == true),
	['styles-build', 'styles-ie-build', 'styles-edge-build', 'scripts-build'],
	['styles-build-nomin', 'styles-ie-build-nomin', 'styles-edge-build-nomin', 'scripts-build-nomin']
), () => {
	gulp.src('app/*.html')
		.pipe(gulp.dest('dist'));

	gulp.src(gulpIf(options.jsMin, 'app/js/scripts.min.js', 'app/js/scripts.js'))
		.pipe(gulp.dest('dist/js'));

	gulp.src(gulpIf(options.cssMin, 'app/css/main.min.css', 'app/css/main.css'))
		.pipe(gulp.dest('dist/css'));
});
//Build --------------------------------------- END







gulp.task('default', ['watch']);