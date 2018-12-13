var gulp = require('gulp'),
    sass = require('gulp-sass')
    browserSync = require('browser-sync')
    del          = require('del'),
    autoprefixer = require('gulp-autoprefixer');

gulp.task('sass', function() { // Создаем таск "sass"
    return gulp.src('assets/sass/**/*.sass') // Берем источник
        .pipe(sass({outputStyle: 'expanded'}).on('error', sass.logError)) // Преобразуем Sass в CSS посредством gulp-sass
        .pipe(autoprefixer(['last 2 versions', '> 1%'], { cascade: true })) //
        .pipe(gulp.dest('assets/css')) // Выгружаем результата в папку app/css
        .pipe(browserSync.reload({stream: true})) // Обновляем CSS на странице при изменении
});

gulp.task('browser-sync', function() { // Создаем таск browser-sync
    browserSync({ // Выполняем browser Sync
        server: { // Определяем параметры сервера
            baseDir: 'assets' // Директория для сервера - app
        },
        notify: false // Отключаем уведомления
    });
});

gulp.task('watch', ['browser-sync', 'sass'], function() {
    gulp.watch('assets/sass/**/*.sass', ['sass']); // Наблюдение за sass файлами
    gulp.watch('assets/*.html', browserSync.reload); // Наблюдение за HTML файлами в корне проекта
    //gulp.watch('app/js/**/*.js', browserSync.reload); // Наблюдение за JS файлами в папке js
    // Наблюдение за другими типами файлов
});

gulp.task('clean', function() {
    return del.sync('build'); // Удаляем папку dist перед сборкой
});

gulp.task('default', ['watch']);

gulp.task('clear', function () {
    return cache.clearAll();
})

gulp.task('build', ['clean', 'sass'], function() {

    var buildCss = gulp.src([ // Переносим CSS стили в продакшен
        'assets/css/styles.css'
    ])
        .pipe(gulp.dest('build/css'))

    var buildFonts = gulp.src('assets/fonts/**/*') // Переносим шрифты в продакшен
        .pipe(gulp.dest('build/fonts'))

    var buildJs = gulp.src('assets/js/**/*') // Переносим скрипты в продакшен
        .pipe(gulp.dest('build/js'))

    var buildHtml = gulp.src('assets/*.html') // Переносим HTML в продакшен
        .pipe(gulp.dest('build'));

});