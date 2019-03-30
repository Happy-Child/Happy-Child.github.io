'use strict';

const syntax 				= 'sass', // Sass or scss
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


//Pug
gulp.task('pug', () =>
	gulp.src('app/pug/pages/*.pug')
	.pipe(pug({pretty: true}))
	.pipe(gulp.dest('app/'))
	.pipe(browserSync.stream())
);


//Sass
gulp.task('styles', () =>
	gulp.src(`app/${syntax}/**/*.${syntax}`)
	.pipe(sass({ outputStyle: 'expanded' }).on("error", notify.onError()))
	.pipe(autoprefixer(['last 15 versions']))
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
gulp.task('js', ['common-babel'], () =>
	gulp.src([
		'app/libs/jquery/jquery.min.js',
		'app/libs/jq-mask/jquery.maskedinput.min.js',
		'app/libs/owl-carousel/owl.carousel.min.js',
		'app/js/common-babel.js' // Always at the END
	])
	.pipe(concat('scripts.js'))
	.pipe(rename({ suffix: '.min', prefix : '' }))
	.pipe(jscomments())
	.pipe(uglify())
	.pipe(gulp.dest('app/js'))
	.pipe(browserSync.reload({ stream: true }))
);


//Watch
gulp.task('watch', ['pug', 'styles', 'js', 'browser-sync'], () => {
	gulp.watch([`app/pug/pages/**/*.pug`, `app/pug/modules/**/*.pug`], ['pug']);
	gulp.watch(`app/${syntax}/**/*.${syntax}`, ['styles']);
	gulp.watch(['libs/**/*.js', 'app/js/common.js'], ['js']);
	gulp.watch('app/*.html', browserSync.reload)
});


//Build
gulp.task('build', ['pug', 'styles', 'js'], () => {
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

