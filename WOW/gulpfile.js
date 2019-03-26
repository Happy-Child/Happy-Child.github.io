'use strict';

const syntax 				= 'sass',
			gulp 					= require('gulp'),
			gutil 				= require('gulp-util'),
			sass 					= require('gulp-sass'),
			browserSync 	= require('browser-sync'),
			concat 				= require('gulp-concat'),
			uglify				= require('gulp-uglify-es').default,
			cssnano 			= require('gulp-cssnano'),
			rename 				= require('gulp-rename'),
			autoprefixer  = require('gulp-autoprefixer'),
			pug 					= require('gulp-pug'),
			babel 				= require("gulp-babel"),
			jscomments		=	require('gulp-strip-comments'),
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


//Prettify HTML
gulp.task('pre', function() {
  return gulp.src('app/*.html')
    .pipe(prettify())
    .pipe(gulp.dest('app/html-prettify'));
});


//Pug
gulp.task('pug', () =>
	gulp.src('app/pages/*.pug')
	.pipe(pug({pretty: true}))
	.pipe(gulp.dest('app/'))
	.pipe(browserSync.stream())
);


//Sass
gulp.task('styles', () =>
	gulp.src(`app/sass/main.${syntax}`)
	.pipe(sass({ outputStyle: 'expanded' }).on("error", notify.onError()))
	.pipe(autoprefixer(['last 15 versions']))
	.pipe(gcmq())
	.pipe(concat('style.css'))
	.pipe(rename({ suffix: '.min', prefix : '' }))
	
	.pipe(gulp.dest('app/css'))
);

//Style libs
gulp.task('style-libs', () =>
	gulp.src([
		'app/libs/hamburgers-icon/hamburgers.min.css',
		'app/libs/reset.css/reset.min.css',
		'app/libs/swiper/swiper.min.css',
	])
	.pipe(concat('libs.css'))
	.pipe(rename({ suffix: '.min', prefix : '' }))
	
	.pipe(gulp.dest('app/css'))
);

//Styles build
gulp.task('styles-build', ['style-libs', 'styles'], () =>
	gulp.src([
		'app/css/libs.min.css',
		'app/css/style.min.css',
	])
	.pipe(concat('main.css'))
	.pipe(rename({ suffix: '.min', prefix : '' }))
	.pipe(gulp.dest('app/css'))
	.pipe(browserSync.stream())
);

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

//JavaScript
gulp.task('js', () =>
	gulp.src([
		'app/libs/jquery/jquery.min.js',
		'app/libs/swiper/swiper.min.js',
		'app/js/common.js' // Always at the END
	])
	.pipe(concat('scripts.js'))
	.pipe(rename({ suffix: '.min', prefix : '' }))
	.pipe(gulp.dest('app/js'))
	.pipe(browserSync.reload({ stream: true }))
);


//Watch
gulp.task('watch', ['pug', 'js', 'browser-sync'], () => {
	gulp.watch([`app/pages/**/*.pug`, `app/modules/**/*.pug`], ['pug']);
	gulp.watch([`app/pages/**/*.${syntax}`, `app/modules/**/*.${syntax}`, `app/${syntax}/**/*.${syntax}`], ['styles-build']);
	gulp.watch(['libs/**/*.js', 'app/js/common.js'], ['js']);
	gulp.watch('app/*.html', browserSync.reload)
});


//Build
gulp.task('b', ['pug', 'pre', 'styles-build', 'js'], () => {
	//HTML
	gulp.src('app/*.html')
		.pipe(gulp.dest('project'));

	//CSS
 	gulp.src('app/css/main.min.css')
		.pipe(gulp.dest('project/css'));

	//JavaScript
	gulp.src('app/js/scripts.min.js')
		.pipe(gulp.dest('project/js'));

	//Img
	gulp.src('app/img/**/*')
		.pipe(gulp.dest('project/img'));

});

gulp.task('default', ['watch']);

