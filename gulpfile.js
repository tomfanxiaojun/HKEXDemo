const config = require('./gulp.config')();
const gulp = require('gulp');
const gulpLoadPlugins = require('gulp-load-plugins');
const browserSync = require('browser-sync');
const del = require('del');
const handlebars = require('handlebars');
const wiredep = require('wiredep').stream;

const $ = gulpLoadPlugins();
const reload = browserSync.reload;

const autoprefixerOptions = {
    browsers: ['last 2 version', 'safari 5', 'ie 9', 'opera 12.1', 'ios 6', 'android 4']
};

gulp.task('styles', () => {
    return gulp.src('src/sass/**/*.scss')
        .pipe($.plumber())
        .pipe($.sourcemaps.init())
        .pipe($.sass.sync({
            outputStyle: 'expanded',
            precision: 10,
            includePaths: ['.']
        }).on('error', $.sass.logError))
        .pipe($.autoprefixer(autoprefixerOptions))
        .pipe($.sourcemaps.write())
        .pipe(gulp.dest('.tmp/styles'))
        .pipe(reload({ stream: true }));
});



gulp.task('htmllint', function() {
    return gulp.src('.tmp/*.html')
        .pipe($.htmllint(htmllintReporter));
});

function htmllintReporter(filepath, issues) {
    console.log(filepath);
    if (issues.length > 0) {
        issues.forEach(function (issue) {
            $.util.log($.util.colors.cyan('[gulp-htmllint] ') + $.util.colors.white(filepath + ' [' + issue.line + ',' + issue.column + ']: ') + $.util.colors.red('(' + issue.code + ') ' + issue.msg));
        });

        process.exitCode = 1;
    }
}

gulp.task('vnu', function() {
  return gulp.src('.tmp/homePage.html')
  .pipe($.html())
  .pipe(gulp.dest('output/'));
});


gulp.task('hbs', function() {

    let baseDir = 'src/templates/partials/';

    let options = {
        allowedExtensions: ['hbs', 'handlebars'],
        partialsDirectory: [
            baseDir, `${baseDir}common/`,
            `${baseDir}home/`,
            `${baseDir}faq/`,
            `${baseDir}listings/`,
            `${baseDir}listings/listing_committee` ,
            `${baseDir}listings/listingProcess`,
            `${baseDir}listings/whyListInHK`,
            `${baseDir}statistics/`,
            `${baseDir}statistics/monthlyHighlight`,
            `${baseDir}statistics/chinaDimension`,
            `${baseDir}statistics/monthlyBulletin/`,
            `${baseDir}equities/`,
            `${baseDir}equityIndex/`,
            `${baseDir}etp/`,
            `${baseDir}etp/etpIssuers/`,
            `${baseDir}etp/etpOverview/`,
            `${baseDir}etp/products/`,
            `${baseDir}etp/education/`,
            `${baseDir}etp/etpLiquidityProviders/`,
            `${baseDir}advancedSearch/`,
            `${baseDir}contactsUs/`,
            `${baseDir}circulars/`,
            `${baseDir}news/`,
            `${baseDir}calendar/`,
            `${baseDir}becomeParticipant/`,
            `${baseDir}findPartner/`,
            `${baseDir}nonCms/`,
        ]
    };

    return gulp.src('src/templates/*.hbs')
        .pipe($.plumber())
        .pipe($.handlebarsHtml(handlebars)(config, options))
        .pipe($.rename((path) => {
            path.extname = '.html';
        }))
        .pipe(gulp.dest('.tmp/'))
        .pipe(reload({ stream: true }));

});


gulp.task('images', () => {
    return gulp.src('src/images/**/*')
        .pipe($.cache($.imagemin({
            progressive: true,
            interlaced: true,
            // don't remove IDs from SVGs, they are often used
            // as hooks for embedding and styling
            svgoPlugins: [{ cleanupIDs: false }]
        })))
        .pipe(gulp.dest('dist/images'));
});


gulp.task('fonts', () => {
    return gulp.src(require('main-bower-files')('**/*.{eot,svg,ttf,woff,woff2}', function(err) {})
            .concat('src/fonts/**/*'))
        .pipe(gulp.dest('.tmp/fonts'))
        .pipe(gulp.dest('dist/fonts'));
});

gulp.task('files', () => {
    return gulp.src('src/files/*')
        .pipe(gulp.dest('dist/files'));
});

gulp.task('scripts', () => {
    return gulp.src('src/scripts/**/*.js')
        .pipe($.plumber())
        .pipe($.sourcemaps.init())
        .pipe($.babel())
        .pipe($.sourcemaps.write('.'))
        .pipe(gulp.dest('.tmp/scripts'))
        .pipe(reload({ stream: true }));
});

gulp.task('lint', () => {
    return lint('src/scripts/**/*.js', {
            fix: true
        })
        .pipe(gulp.dest('src/scripts'));
});



gulp.task('clean-html', (done) => {
    clean('.tmp/*.html', done);
});


gulp.task('html', ['styles', 'scripts'], () => {
    return gulp.src('.tmp/*.html')
        .pipe($.useref({ searchPath: ['.tmp', 'src', '.'] }))
        .pipe(gulp.dest('dist'));
});


gulp.task('html:min', ['styles', 'scripts'], () => {
    return gulp.src('.tmp/*.html')
        .pipe($.useref({ searchPath: ['.tmp', 'src', '.'] }))
        .pipe($.if('*.js', $.uglify()))
        .pipe($.if('*.css', $.cssnano({ safe: true, autoprefixer: false })))
        .pipe($.if('*.html', $.htmlmin({ collapseWhitespace: false })))
        .pipe(gulp.dest('dist'));
});



gulp.task('serve:dist', () => {
  browserSync({
    notify: false,
    port: 80,
    ghostMode: false,
    server: {
      baseDir: ['dist']
    }
  });
});

gulp.task('clean', (done) => {
    clean(['.tmp', 'dist'], done);
});


gulp.task('clean:dist', (done) => {
    clean(['dist'], done);
});

gulp.task('serve', ['styles', 'scripts', 'fonts', 'hbs'], () => {
    browserSync({
        notify: false,
        port: 9000,
        ghostMode: false,
        server: {
            baseDir: ['.tmp', 'src'],
            routes: {
                '/node_modules': 'node_modules'
            }
        }
    });

    gulp.watch([
        'src/templates/**/*.hbs',
        'src/images/**/*',
        '.tmp/fonts/**/*'
    ]).on('change', reload);

    gulp.watch('src/templates/**/*.hbs', ['hbs']);
    gulp.watch('src/templates/**/*.hbs', ['htmllint']);
    gulp.watch('src/sass/**/*.scss', ['styles']);
    gulp.watch('src/scripts/**/*.js', ['scripts']);
    gulp.watch('src/fonts/**/*', ['fonts']);
});

gulp.task('dist', ['lint', 'html', 'htmllint', 'images', 'fonts','files', 'styles', 'scripts'], () => {
    return gulp.src('dist/**/*').pipe($.size({ title: 'build', gzip: true }));
});

gulp.task('build', ['hbs'], () => {
    return gulp.start('dist');
});

gulp.task('default', ['clean-html'], () => {
    gulp.start('serve');
});

/////////////
function clean(path, done) {
    log('Cleaning: ' + $.util.colors.blue(path));
    del(path, done);
}

function log(msg) {
    if (typeof(msg) === 'object') {
        for (let item in msg) {
            if (msg.hasOwnProperty(item)) {
                $.util.log($.util.colors.blue(msg[item]));
            }
        }
    } else {
        $.util.log($.util.colors.blue(msg));
    }
}


function lint(files, options) {
    return gulp.src(files)
        .pipe(reload({ stream: true, once: true }))
        .pipe($.eslint(options))
        .pipe($.eslint.format())
        .pipe($.if(!browserSync.active, $.eslint.failAfterError()));
}
