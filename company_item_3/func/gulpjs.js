var gulp = require('gulp');
var fileinclude = require('gulp-file-include');
 
gulp.task('fileinclude', function () {
    // 适配page中所有文件夹下的所有html，排除page下的include文件夹中html
    gulp.src(['../www/page/show/model/*.html'])
        .pipe(fileinclude({
            prefix: '@@',
            basepath: '@file'
        }))
        .pipe(gulp.dest('../www/page/show/dist'));
});
 
gulp.task('watch', function () {
    gulp.watch('../www/page/show/*.html', ['fileinclude']);
});