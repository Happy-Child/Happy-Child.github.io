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


//Prettify HTML
gulp.task('pre', function() {
  return gulp.src('app/*.html')
    .pipe(prettify())
    .pipe(gulp.dest('app'));
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
	gulp.src(`app/sass/main.${syntax}`)
	.pipe(sass({ outputStyle: 'expanded' }).on("error", notify.onError()))
	.pipe(autoprefixer(['last 15 versions']))
	.pipe(gcmq())
	.pipe(concat('main.css'))
	.pipe(rename({ suffix: '.min', prefix : '' }))
	.pipe(cssnano({discardComments: {removeAll: true}}))
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
		'app/libs/jq-range/jquery-ui.min.js',
		'app/libs/jq-range/jquery.ui.touch-punch.min.js',
		'app/libs/slick/slick.min.js',		
		'app/libs/datepicker/datepicker.min.js',
		'app/libs/select2/select2.min.js',
		'app/libs/jq-mask/jquery.mask.min.js',
		'app/libs/mmenu/jquery.mmenu.all.js',
		'app/libs/custom-scrollbar/jquery.mCustomScrollbar.js',
		'app/libs/timer/countdown.js',
		'app/libs/iziModal/iziModal.min.js',
		'app/libs/jq-validate/jquery.validate.min.js',
		'app/libs/jq-validate/messages_ru.min.js',
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
	gulp.watch([`app/pages/**/*.${syntax}`, `app/modules/**/*.${syntax}`, `app/${syntax}/**/*.${syntax}`], ['styles']);
	gulp.watch(['libs/**/*.js', 'app/js/common.js'], ['js']);
	gulp.watch('app/*.html', browserSync.reload)
});


//Build
gulp.task('b', ['pug', 'pre', 'styles', 'js'], () => {
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

