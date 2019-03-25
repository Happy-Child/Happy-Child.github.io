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
			babel 				= require("gulp-babel"),
			pug 					= require('gulp-pug'),
			autoprefixer  = require('gulp-autoprefixer'),
			gcmq					=	require('gulp-group-css-media-queries'),
			prettify			=	require('gulp-prettify'),
			notify 				= require("gulp-notify");


//Autoreload
gulp.task('browser-sync', () => 
	browserSync({
		server: {
			baseDir: 'app'
		},
		notify: false
	})
);

gulp.task('pre', function() {
  return gulp.src('app/*.html')
    .pipe(prettify())
    .pipe(gulp.dest('app/after-prettify'));
});

//Pug
gulp.task('pug', () =>
	gulp.src('app/pug/*.pug')
	.pipe(pug({pretty: true}))
	.pipe(gulp.dest('app/'))
	.pipe(browserSync.stream())
);


//Less other page
gulp.task('styles', () =>
	gulp.src([
		`app/less/main.less`,
	])
	.pipe(less({ outputStyle: 'expanded' }).on("error", notify.onError()))
	.pipe(autoprefixer(['last 15 versions']))
	.pipe(gcmq())
	.pipe(concat('main.css'))
	.pipe(gulp.dest('app/css'))
	.pipe(browserSync.stream())
);


//Css libs
gulp.task('css-libs', () =>
	gulp.src([
		'app/libs/css/reset.css/reset.min.css',
		'app/libs/css/bootstrap/grid.css',
		'app/libs/css/hamburgers/hamburgers.min.css',
		'app/libs/css/selectize/selectize.min.css',
		'app/libs/css/custom-scrollbar/jquery.mCustomScrollbar.min.css',
		'app/libs/css/slick/slick.css',
		'app/libs/css/slider-swiper/swiper.min.css',
		'app/libs/css/mmenu/jquery.mmenu.all.css',
	])
	.pipe(concat('libs.css'))
	.pipe(gulp.dest('app/css'))
	.pipe(browserSync.stream())
);


//Styles top content
gulp.task('styles-top-content', () =>
	gulp.src([
		`app/less/top-content.less`,
	])
	.pipe(less({ outputStyle: 'expanded' }).on("error", notify.onError()))
	.pipe(autoprefixer(['last 15 versions']))
	.pipe(gcmq())
	.pipe(concat('top-content.css'))
	.pipe(cssnano({discardComments: {removeAll: true}}))
	.pipe(rename({ suffix: '.min', prefix : '' }))
	.pipe(gulp.dest('app/css'))
	.pipe(browserSync.stream())
);


//Styles main task
gulp.task('styles-all', ['styles', 'css-libs', 'styles-top-content'], () => {
	gulp.src([
		'app/fonts/fonts.css',
		'app/css/libs.css',
		'app/css/main.css',
	])
	.pipe(concat('styles.css'))
	.pipe(cssnano({discardComments: {removeAll: true}}))
	.pipe(rename({ suffix: '.min', prefix : '' }))
	.pipe(gulp.dest('app/css'))
	.pipe(browserSync.stream())
});



//Common script babel
gulp.task('common-babel', () =>
	gulp.src([
		'app/js/common.js'
	])
	.pipe(concat('common-babel.js'))
	.pipe(babel({presets: ['es2015']}))
	.pipe(gulp.dest('app/js'))
	.pipe(browserSync.reload({ stream: true }))
);


//JavaScript libs
gulp.task('js-libs', () =>
	gulp.src([
		'app/libs/js/jquery/jquery.min.js',
		'app/libs/js/lazyload/lazyload.min.js',
		'app/libs/js/selectize/selectize.min.js',
		'app/libs/js/custom-scrollbar/jquery.mCustomScrollbar.js',
		'app/libs/js/jquery-sticky-kit/jquery.sticky-kit.min.js',
		'app/libs/js/jq-mask/jquery.mask.min.js',
		'app/libs/js/slider-swiper/swiper.min.js',
		'app/libs/js/slick/slick.min.js',
		'app/libs/js/flex-menu/flexmenu.1.4.min.js',
		'app/libs/js/modernizr/modernizr.custom.js',
		'app/libs/js/mmenu/jquery.mmenu.all.js',
	])
	.pipe(concat('libs.js'))
	.pipe(uglify())
	.pipe(rename({ suffix: '.min', prefix : '' }))
	.pipe(gulp.dest('app/js'))
	.pipe(browserSync.reload({ stream: true }))
);


//JavaScript
gulp.task('js', ['js-libs', 'common-babel'], () =>
	gulp.src([
		'app/js/common-babel.js' // Always at the END
	])
	.pipe(concat('scripts.js'))
	.pipe(uglify())
	.pipe(rename({ suffix: '.min', prefix : '' }))
	.pipe(gulp.dest('app/js'))
	.pipe(browserSync.reload({ stream: true }))
);





//Watch
gulp.task('watch', ['pug', 'styles-all', 'js', 'browser-sync'], () => {
	gulp.watch(`app/pug/**/*.pug`, ['pug']);
	gulp.watch(`app/${syntax}/**/*.${syntax}`, ['styles-all']);
	gulp.watch(['libs/**/*.js', 'app/js/common.js'], ['js']);
	gulp.watch('app/*.html', browserSync.reload)
});


//Build
gulp.task('build', ['pug', 'pre', 'styles-all', 'js'], () => {
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

