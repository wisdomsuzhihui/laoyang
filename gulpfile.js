var gulp = require('gulp'),
  sass = require('gulp-sass'),
  sourcemaps = require('gulp-sourcemaps'),
  autoprefixer = require('gulp-autoprefixer'),
  minifycss = require('gulp-minify-css'),
  uglify = require('gulp-uglify'),
  // rename = require('gulp-rename'),
  clean = require('gulp-clean'),
  changed = require('gulp-changed'),
  debug = require('gulp-debug'),
  browserSync = require('browser-sync').create(),
  jade = require('gulp-jade'),
  base64 = require('gulp-base64');

//样式
gulp.task('css', function () {
  return gulp.src(['src/**/*.scss'])
    .pipe(changed('dist/**/css/', {
      extension: '.css'
    }))
    .pipe(debug({
      title: '编译：'
    }))
    //  .pipe(sourcemaps.init())
    // 嵌套输出方式 nested (默认)
    // 展开输出方式 expanded
    // 紧凑输出方式 compact
    // 压缩输出方式 compressed
    .pipe(sass({
      outputStyle: 'compressed'
    }).on('error', sass.logError))
    .pipe(autoprefixer({
      browsers: ['last 2 versions', 'Android >= 4.0', 'IE >= 9'],
      cascade: true,
      remove: true
    }))
    .pipe(base64({
      // 排除字体文件
      exclude: ['.eot', '.woff', '.ttf', '.svg']
    }))
    //  .pipe(sourcemaps.write('./maps'))
    .pipe(gulp.dest('dist'))
    .pipe(browserSync.reload({
      stream: true
    }));
})

//脚本
gulp.task('js', function () {
  return gulp.src(['src/**/js/*.js'])
    .pipe(changed('dist/**/js', {
      extension: '.js'
    }))
    .pipe(debug({
      title: '编译：'
    }))
    // .pipe(rename({ suffix: '.min'}))
    .pipe(uglify())
    .pipe(gulp.dest('dist'))
})

// 图片
gulp.task('img', function () {
  return gulp.src(['src/**/img/*'])
    // .pipe(cache(imagemin({ optimizationLevel: 3, progressive: true, interlaced: true })))
    .pipe(gulp.dest('dist'))
  // .pipe(notify({ message: 'Images task complete' }));
});

//第三方js
gulp.task('plugs', function () {
  return gulp.src(['src/**/plugs/*', 'src/**/plugs/**/*'])
    .pipe(changed('dist/skin/plugs', {
      extension: '.plugs'
    }))
    .pipe(debug({
      title: '编译：'
    }))
    .pipe(gulp.dest('dist/**/plugs'))
})

//jade
gulp.task('jade', function () {
  return gulp.src(['src/*.jade', 'src/**/*.jade'])
    .pipe(changed('dist', {
      extension: '.html'
    }))
    .pipe(debug({
      title: '编译：'
    }))
    .pipe(jade({
      pretty: true
    }))
    .pipe(gulp.dest('dist'))
    .pipe(browserSync.reload({
      stream: true
    }));
});

//清理
gulp.task('clean', function () {
  return gulp.src('dist', {
      read: false
    })
    .pipe(clean());
})


gulp.task('build', function () {
  gulp.start('css', 'js', 'img', 'jade', 'plugs');
});

gulp.task('serve', ['css', 'js', 'img', 'jade', 'plugs'], function () {
  browserSync.init({
    server: {
      baseDir: 'dist'
    }
  });

  gulp.watch(['src/*.jade', 'src/**/*.jade'], ['jade'])
  gulp.watch(['src/**/scss/*.scss', 'src/**/scss/**/*.scss', 'src/skin/promotion/**/*.scss'], ['css']);
  gulp.watch(['src/**/js/*.js', 'src/**/js/**/*.js'], ['js']);
  gulp.watch(['src/**/img/*', 'src/**/img/**/*'], ['img']);
  gulp.watch('*').on('change', browserSync.reload);
})

gulp.task('default', ['serve'])