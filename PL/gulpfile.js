'use strict';

const syntax 				= 'less',
			gulp 					= require('gulp'),
			gutil 				= require('gulp-util'),
			less 					= require('gulp-less'),
			browserSync 	= require('browser-sync'),
			concat 				= require('gulp-concat'),
			uglify				= require('gulp-uglify-es').default,
			cssnano 			= require('gulp-cssnano'),
			rename 				= require('gulp-rename'),
			pug 					= require('gulp-pug'),
			autoprefixer  = require('gulp-autoprefixer'),
			gcmq					=	require('gulp-group-css-media-queries'),
			prettify			=	require('gulp-prettify'),			
			notify 				= require("gulp-notify");

//Prettify HTML
gulp.task('pre', function() {
  return gulp.src('app/compare-products.html')
    .pipe(prettify())
    .pipe(gulp.dest('app/after-prettify'));
});

//Autoreload
gulp.task('browser-sync', () => 
	browserSync({
		server: {
			baseDir: 'app'
		},
		notify: false
	})
);

//Pug
gulp.task('pug', () =>
	gulp.src('app/pages/*.pug')
	.pipe(pug({pretty: true}))
	.pipe(gulp.dest('app/'))
	.pipe(browserSync.stream())
);

//Sass
gulp.task('styles', () =>
	gulp.src(`app/**/*.${syntax}`)
	.pipe(less({ outputStyle: 'expanded' }).on("error", notify.onError()))
	.pipe(autoprefixer(['last 15 versions']))
	.pipe(gcmq())
	.pipe(concat('styles.css'))
	.pipe(rename({ suffix: '.min', prefix : '' }))
	.pipe(cssnano({discardComments: {removeAll: true}}))
	.pipe(gulp.dest('app/css'))
	.pipe(browserSync.stream())
);


//JavaScript
gulp.task('js', () =>
	gulp.src([
		'app/libs/js/selectize/selectize.min.js',
		'app/libs/js/slick/slick.min.js',
		'app/libs/js/custom-scrollbar/jquery.mCustomScrollbar.js',
		'app/libs/js/jq-mask/jquery.mask.min.js',
		'app/libs/js/jq-range/jquery-ui.min.js',
		'app/libs/js/jq-range/jquery.ui.touch-punch.min.js',
		'app/libs/js/jquery-sticky-kit/jquery.sticky-kit.min.js',
		'app/libs/js/flex-menu/flexmenu.1.4.min.js',
		'app/libs/js/modernizr/modernizr.custom.js',
		'app/libs/js/mmenu/jquery.mmenu.all.js',
		'app/libs/js/slider-swiper/swiper.min.js',
		'app/js/common.js' // Always at the END
	])
	.pipe(concat('scripts.js'))
	.pipe(rename({ suffix: '.min', prefix : '' }))
	.pipe(uglify())
	.pipe(gulp.dest('app/js'))
	.pipe(browserSync.reload({ stream: true }))
);


//Watch
gulp.task('watch', ['pug', 'styles', 'js', 'browser-sync'], () => {
	gulp.watch([`app/pages/**/*.pug`, `app/modules/**/*.pug`], ['pug']);
	gulp.watch(`app/**/*.${syntax}`, ['styles']);
	gulp.watch(['libs/**/*.js', 'app/js/common.js'], ['js']);
	gulp.watch('app/*.html', browserSync.reload)
});


//Build
gulp.task('build', ['pre', 'pug', 'styles', 'js'], () => {
	//HTML
	gulp.src('app/*.html')
		.pipe(gulp.dest('project'));

	//CSS
 	gulp.src('app/css/main.min.css')
		.pipe(gulp.dest('project/css'));

	//JavaScript
	gulp.src('app/js/scripts.min.js')
		.pipe(gulp.dest('project/js'));

	//Fonts
	gulp.src('app/fonts/**/*')
		.pipe(gulp.dest('project/fonts'));

	//Img
	gulp.src('app/img/**/*')
		.pipe(gulp.dest('project/img'));

});

gulp.task('default', ['watch']);

