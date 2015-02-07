/*==================================================================
OBJECTIVE FOR GULPFILE

Build development files from an src/ and public/lib folders 
into a production dist/ folder
Watches the source files for changes.


Ref.
http://www.smashingmagazine.com/2014/06/11/building-with-gulp/
http://www.sitepoint.com/introduction-gulp-js/
https://github.com/JacksonGariety/gulp-nodemon
http://www.justinmccandless.com/blog/A+Tutorial+for+Getting+Started+with+Gulp
http://jshint.com/
http://www.kycosoftware.com/blog/article/simple-and-awesome-gulp-setup
https://www.npmjs.com/package/gulp-plumber
https://gist.github.com/floatdrop/8269868
https://leanpub.com/grunt/read

================================================================= */
// load the plugins
var gulp       = require('gulp');
var del        = require('del');
var minifyCSS  = require('gulp-minify-css');
var rename     = require('gulp-rename');
var jshint     = require('gulp-jshint');
var concat     = require('gulp-concat');
var uglify     = require('gulp-uglify');
var ngAnnotate = require('gulp-ng-annotate');
var nodemon    = require('gulp-nodemon');
//var imagemin   = require('gulp-imagemin');
var beep       = require('beepbeep')
var stripDebug = require('gulp-strip-debug');
var gutil      = require('gulp-util');
var plumber    = require('gulp-plumber'); //pipe error will not break gulp
var changed    = require('gulp-changed');
//var livereload = require('gulp-livereload'); //Refresh browser 
//browserSync = require('browser-sync'); //more advanced than livereload

/* ==============================================================
Error Handling Function
On error will beep 3 times
Log the error
=============================================================== */
var onError = function (err) {
  beep([0, 0, 0]);
  gutil.log(gutil.colors.green(err));
};


/* ==============================================================
Set base directories
source & destination (build) files
=============================================================== */
var bases = {
  src: 'public/src/',
  dist: 'public/dist/',
  root: './'
};


/**
 * Define paths
 */
var paths = {
  scripts: ['js/**/*.js'],
  nodeScripts: ['server.js', 'server/**/*.js'], 
  lib: ['lib/angular/angular.min.js',
    'lib/angular-animate/angular-animate.min.js', 
    'lib/angular-aria/angular-aria.min.js', 
    'lib/angular-material/angular-material.min.js',
    'lib/angular-messages/angular-messages.min.js',
    'lib/angular-route/angular-route.min.js',
    'lib/angular-sanitize/angular-sanitize.min.js',
  ],
  libMap:[ 'lib/angular/angular.min.js.map', 
    'lib/angular-animate/angular-animate.min.js.map', 
    'lib/angular-aria/angular-aria.min.js.map', 
    'lib/angular-messages/angular-messages.min.js.map',
    'lib/angular-route/angular-route.min.js.map',
    'lib/angular-sanitize/angular-sanitize.min.js.map'
  ],

  libStyles: ['lib/angular-material/angular-material.css',
    'lib/angular-material/default-theme.css'
  ],
  appStyles: [
    'css/**/*.css'
  ],  
  //html: ['index.html', 'views/*.html'], //This will not keep directory structure
  //using wildcards will
  html: ['**/*.html'],
  images: ['assets/img/**/*.png', 'assets/img/**/*.jpg']
};


/* ==========================================================
GULP TASKS
========================================================== */

/** 
 * clean task - WORKS!!
 * Delete the dist directory 
 */
gulp.task('clean', function() {
  del(bases.dist)
});


/** 
 * html task -
 * Copies HTML to the dist directory 
 */
gulp.task('copy-html', function() {
  gulp.src(paths.html, {cwd: bases.src}) //CWD - current working directory
  .pipe(plumber({
    errorHandler: onError
  }))
  .pipe(gulp.dest(bases.dist));
});


/**
 * css task - WORKS!!
 * get the css files
 * concatenate them 
 * minify
 * save to dist/css/app.min.css
 */
gulp.task('css', function() {
  gulp.src(paths.appStyles, {cwd: bases.src})
  .pipe(plumber({
    errorHandler: onError
  }))
  .pipe(concat('app.css'));

  gulp.src(paths.libStyles, {cwd: 'public'})
  .pipe(plumber({
    errorHandler: onError
  }))
  .pipe(concat('app.css'))
  .pipe(minifyCSS())
  .pipe(rename({ suffix: '.min' }))
  .pipe(gulp.dest(bases.dist + 'css'));
});


/**
 * node-scripts task - WORKS!!
 * Linter for back-end js files
 */
gulp.task('node-scripts', function() {
  gulp.src(paths.nodeScripts, {cwd: bases.root})
  .pipe(plumber({
    errorHandler: onError
  }))
  .pipe(jshint())
  .pipe(jshint.reporter('jshint-stylish'));
  //.pipe(livereload()); //refresh browser
});


/**
 * front-scripts task - WORKS!!
 * Does Annotation
 * Task for front end JS files
 * NOTE!! don't want back end Node files loaded on front end
 */
gulp.task('angular', function() {
  gulp.src(paths.scripts, {cwd: bases.src})
  .pipe(plumber({
    errorHandler: onError
  }))
  .pipe(jshint())
  .pipe(jshint.reporter('jshint-stylish'))
  .pipe(concat('app.js'))
  .pipe(ngAnnotate())
  .pipe(stripDebug())
  .pipe(uglify())
  .pipe(rename({ suffix: '.min' }))
  .pipe(gulp.dest(bases.dist + 'js'));
  //.pipe(livereload()); //refresh browser
});


/**
 * imagemin task - WORKS!!
 * Check for new or changed images 
 * Minify images and ouput them to dist
 */
//gulp.task('imagemin', ['clean'], function() {
gulp.task('imagemin', function() {
  gulp.src(paths.images, {cwd: bases.src})
  .pipe(changed(bases.dist + 'img/'))
 // .pipe(imagemin())
  .pipe(gulp.dest(bases.dist + 'img/'));
});


/**
 * lib-scripts task - WORKS!!
 * get the lib scripts (they are minified already)
 * concatenate them
 * save to /dist
 */
//gulp.task('lib-scripts', ['clean'], function() {
gulp.task('lib-scripts', function() {
  gulp.src(paths.lib, {cwd: 'public'})
  .pipe(plumber({
    errorHandler: onError
  }))
  .pipe(concat("lib.min.js"))
  .pipe(gulp.dest(bases.dist + 'js'));
});


/**
 * lib-maps task - 
 * save to /dist
 */
gulp.task('lib-maps', function() {
  gulp.src(paths.libMap, {cwd: 'public'})
  .pipe(plumber({
    errorHandler: onError
  }))
  .pipe(gulp.dest(bases.dist + 'js'));
});


/**
 * bower task - runs bower install
 */
// gulp.task('bower', function() {
//     return bower()
//     .pipe(gulp.dest(config.bowerDir))
// });


/**
 * Start server.js in development mode 
 * Watch for changes 
 * Watch all .html and .js files in the directory (ext = extension).
 * .on()[event, tasks] -> takes gulp task names to execute.
 * 'change' -> which fires before the server restarts so that you 
 * can run your compile tasks all within the same gulp process.)
 * [tasks] A gulp task name, array of gulp task names, or a function to execute.
 */
gulp.task('nodemon', function() {
  nodemon({
    script: 'server.js',
    ext: 'js html css',
    env: { 'NODE_ENV': 'development' }
  })
  .on('start', ['lib-scripts', 'lib-maps', 'angular', 'copy-html', 
    'css','imagemin'])
  .on('change', ['watch'])
  .on('restart', function() {
    console.log('Restarted!');
  });
});

gulp.task('default', ['nodemon']);


/* ==========================================================
GULP WATCH TASK

A development task - WORKS!!
Watch css files, lib-scripts, back-end js and front-end js files for changes
when a change is detected run the associated task 
========================================================== */
gulp.task('watch', function() {
  
  //Watch lib js files - on change run lib-scripts task
  gulp.watch('public/lib/**/*', ['lib-scripts']);
  //Watch front end js files - on change run lint and run angular task  
  gulp.watch(bases.src + paths.scripts, ['angular']);  
  //Watch html files - on change run copy-html task
  gulp.watch(bases.src + paths.html, ['copy-html']);
  //Watch css files - on change run css task
  //gulp.watch(bases.src + paths.styles, ['css']); 
  gulp.watch('public/src/css/**/*', ['css']); 
  //Watch back-end js files - on change run lint and run node-scripts task
  gulp.watch(bases.root + paths.nodeScripts, ['node-scripts']);

  gulp.watch(bases.src + paths.images, ['imagemin']);
});

