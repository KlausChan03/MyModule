var gulp = require('gulp');
var fileinclude = require('gulp-file-include');
 
gulp.task('fileinclude', function () {
    // 适配page中所有文件夹下的所有html，排除page下的include文件夹中html
    gulp.src(['../www/page/qq_items/model/*.html'])
        .pipe(fileinclude({
            prefix: '@@',
            basepath: '@file'
        }))
        .pipe(gulp.dest('../www/page/qq_items/dist'));
});
 
gulp.task('watch', function () {
    gulp.watch('../www/page/bc_items/*.html', ['fileinclude']);
});