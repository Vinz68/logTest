var gulp = require('gulp');
var nodemon = require('gulp-nodemon')
var uglify = require('gulp-uglify');
var gulpMocha = require('gulp-mocha');

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


gulp.task('test', function(){
      gulp.src('tests/*.js', {read: false})
            .pipe(gulpMocha({reporter: 'nyan'}))
});