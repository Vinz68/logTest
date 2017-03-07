var gulp = require('gulp');
var nodemon = require('gulp-nodemon')
var uglify = require('gulp-uglify');

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
