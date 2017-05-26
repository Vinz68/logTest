const gulp = require('gulp');
const nodemon = require('gulp-nodemon');
const uglify = require('gulp-uglify');
const mocha = require('gulp-mocha');
const env = require('gulp-env');
const supertest = require('supertest');

gulp.task('default', function() {
      nodemon({
            script: 'logTest.js',
            ext: 'js',
            env: {
                  PORT:3000
            },
            ignore: ['./node_modules/**']
      })
      .on('restart', function(){
            console.log('Restarting');
      });
});

gulp.task('compress', function() {
   return gulp.src('logTest.js')
      .pipe(uglify())
      .pipe(gulp.dest('dist'));
});

gulp.task('test', function() {
      env({vars: {ENV:'Tests'}});
	gulp.src('tests/*.js', {read: false})
		// `gulp-mocha` needs filepaths so you can't have any plugins before it
		.pipe(mocha({reporter: 'nyan'}))
});

gulp.task('test2', () =>
      env({vars: {ENV:'Tests'}}),
	gulp.src('tests/*.js', {read: false})
		// `gulp-mocha` needs filepaths so you can't have any plugins before it
		.pipe(mocha({reporter: 'nyan'}))
);