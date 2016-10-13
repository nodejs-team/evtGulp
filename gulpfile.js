var lr           = require('tiny-lr'),
    server       = lr(),
    gulp         = require('gulp'),
    cssmin       = require('gulp-minify-css'),
    livereload   = require('gulp-livereload'),
    uglify       = require('gulp-uglify'),
    minifyInline = require('gulp-minify-inline'),
    jshint       = require('gulp-jshint'),
    stylish      = require('jshint-stylish'),
    webserver    = require('gulp-webserver'),
    opn          = require('opn'),
    clean        = require('gulp-clean'),
    imagemin     = require('gulp-imagemin'),
    pngquant     = require('imagemin-pngquant'),
    replace      = require('gulp-replace'),
    useref       = require('gulp-useref'),
    gulpif       = require('gulp-if'),
    tinypng      = require('gulp-tinypng-compress'),
    ftp          = require('gulp-ftp'),
    runSequence  = require('gulp-run-sequence'),
    handleErrors = require('./util/handleErrors'),
    os           = require('os'),
    ifaces       = os.networkInterfaces(),
    config       = require('./config.json');

var SRC = 'src/' + config.projectName;
var DIST = 'dist/' + config.projectName;
var TMP = '.tmp';
var path = {
    src: SRC,
    dist: DIST,
    srcJsFolder: SRC + '/js',
    srcTsFolder: SRC + '/ts',
    srcCssFolder: SRC + '/css',
    srcImgFolder: SRC + '/images',
    distJsFolder: DIST + '/js',
    distTsFolder: DIST + '/ts',
    distCssFolder: DIST + '/css',
    distImgFolder: DIST + '/images',
    srcJs: SRC + '/js/**/*.js',
    distJs: DIST + '/js/**/*.js',
    srcTs: SRC + '/ts/**/*.ts',
    distTs: DIST + '/ts/**/*.ts',
    srcCss: SRC + '/css/**/*.css',
    distCss: DIST + '/css/**/*.css',
    srcImg: SRC + '/images/**/*.{png,jpg,jpeg}',
    srcImgGif: SRC + '/images/**/*.gif',
    distImg: DIST + '/images/**/*.{png,jpg,jpeg}',
    srcHtml: SRC +'/*.html',
    distHtml: DIST +'/*.html',
    rev: SRC +'/rev',
    revJs: SRC +'/rev/js',
    revCss: SRC + '/rev/css',
    revImg: SRC + '/rev/image',
    revImgGif: SRC + '/rev/image/gif',
    revJson: SRC + '/rev/**/*.json',
    revImgJson: SRC + '/rev/image/**/*.json',
    tmp: TMP,
    tmpJs: TMP + '/**/*.js',
    tmpCss: TMP + '/**/*.css',
    tmpImg: TMP + '/**/*.{png,jpg,jpeg}',
    tmpHtml: TMP + '/*.html'
};

//压缩图片 - imagemin
gulp.task('imagemin', ["copy-gif"], function () {
    return gulp.src(path.srcImg)
        .pipe(imagemin({
            progressive: true,
            svgoPlugins: [{removeViewBox: false}],
            use: [pngquant()]
        }))
        .pipe(gulp.dest(path.distImgFolder))
});

//压缩图片 - tinypng
gulp.task('tinypng', ["copy-gif"], function () {
    return gulp.src(path.srcImg)
        .pipe(tinypng({
            key:config.tinypngapi,
            log:true
        }))
        .pipe(gulp.dest(path.distImgFolder))
});

//copy gif
gulp.task('copy-gif', function () {
    return gulp.src(path.srcImgGif)
        .pipe(gulp.dest(path.distImgFolder));
});

//JS检测
gulp.task('jshint', function(){
    return gulp.src(path.srcJs)
        .pipe(jshint({
            "undef": false,
            "unused": false
        }))
        //.pipe(jshint.reporter('default'))  //错误默认提示
        .pipe(jshint.reporter(stylish))   //高亮提示
        .pipe(jshint.reporter('fail'));
});

//基于配置合并路径
gulp.task('useref', function () {
    return gulp.src(path.srcHtml)
        .pipe(useref())
        .pipe(gulpif('*.js', uglify()))
        .pipe(gulpif('*.css', cssmin()))
        .pipe(gulp.dest(path.tmp));
});

//压缩html中的css和js代码
gulp.task('minify-inline', function() {
    var options = {
        js: {
            output: {
                comments: false
            }
        },
        jsSelector: 'script[type!="text/template"]',
        css: {
            keepSpecialComments: 1
        },
        cssSelector: 'style[data-minify!="false"]'
    };

    return gulp.src(path.tmpHtml)
        .pipe(minifyInline(options))
        .pipe(gulp.dest(path.tmp));
});

//替换模板相对路径到http
gulp.task('replace-htmlpath', function(){
    return gulp.src([path.tmpHtml])
        .pipe(replace(/"(css|images|js)\/([^"]+?)"/gm, '"' + config.revPrefix + config.projectName + "/" + '$1/$2' + '"'))
        .pipe(replace(/(:\s*url\()(\.\.)?([^)]+?)/gm, '$1' + config.revPrefix + config.projectName + '/$3'))
        .pipe(gulp.dest(path.dist));
});

//替换js相对路径到http
gulp.task('replace-jspath', function(){
    return gulp.src([path.tmpJs])
        .pipe(replace(/"(css|images|js)\/([^"]+?)"/gm, '"' + config.revPrefix + config.projectName + "/" + '$1/$2' + '"'))
        .pipe(replace(/(url:")([^"]+?)"/gm, '$1' + config.revPrefix + config.projectName + "/images/" + '$2' + '"'))
        .pipe(gulp.dest(path.distJsFolder));
});

//替换css相对路径到http
gulp.task('replace-csspath', function(){
    return gulp.src([path.tmpCss])
        .pipe(replace(/(:\s*url\()(\.\.)?([^)]+?)/gm, '$1' + config.revPrefix + config.projectName + '/$3'))
        .pipe(gulp.dest(path.distCssFolder));
});

/*====task for egret ======*/
gulp.task("copy-config", function(){
    return gulp.src(SRC + "/resource/*.json")
        .pipe(gulp.dest(DIST + "/resource"));
});

gulp.task("copy-js", function(){
    return gulp.src([SRC + "/js/**/*.js"])
        .pipe(gulp.dest(DIST + "/js"));
});

gulp.task("copy-media", function(){
    return gulp.src(SRC + "/resource/**/*.mp3")
        .pipe(gulp.dest(DIST + "/resource"));
});

//替换js中sourceMap相对路径到http
gulp.task('replace2cdn', function(){
    return gulp.src(DIST + "/resource/*.json")
        .pipe(replace(/("url":")([^"]+?)"/gm, '$1' + config.revPrefix + config.projectName + "/resource/" + '$2' + '"'))
        .pipe(gulp.dest(DIST + "/resource"));
});

gulp.task('replace-launcher-path', function(){
    return gulp.src(DIST + "/*.html")
        .pipe(replace(/"launcher\/([^"]+?)"/gm, '"' + config.revPrefix + config.projectName + "/launcher/" + '$1' + '"'))
        .pipe(gulp.dest(DIST));
});

gulp.task('clear-html-cdn', function () {
    return gulp.src(DIST + "/*.html")
        .pipe(replace('<img src="' + config.revPrefix + config.projectName + '/', '<img src="'))
        .pipe(gulp.dest(DIST));
});

var cssBase64 = require('gulp-css-base64');
gulp.task('css-base64', function () {
    return gulp.src(DIST + "/css/*.css")
        .pipe(cssBase64({
            //baseDir: DIST + "/images"
            maxWeightResource: 1024*100
            //extensionsAllowed: ['.gif', '.jpg']
        }))
        .pipe(gulp.dest(DIST + "/css"));
});

var img64 = require('gulp-img64-2');
gulp.task('html-base64', function () {
    gulp.src(DIST + '/*.html')
        .pipe(img64({
            maxWeightResource: 1024*100
        }))
        .pipe(gulp.dest(DIST + "/"));
});

gulp.task('imagemin-egret', ["copy-config", "copy-js", "copy-media"], function(){
    return gulp.src(SRC + "/resource/assets/**/*.{png,jpg,jpeg}")
        .pipe(imagemin({
            progressive: true,
            svgoPlugins: [{removeViewBox: false}],
            use: [pngquant()]
        }))
        .pipe(gulp.dest(DIST + "/resource/assets"))
});

gulp.task('build-egret', function(done) {
    runSequence('imagemin-egret', 'replace2cdn', 'replace-launcher-path', 'clear-html-cdn', ['css-base64', 'html-base64'], done);
});

/*====end task for egret ======*/

//删除多余文件
gulp.task('clean', function () {
    return gulp.src(path.dist, {read: false})  //read: boolean 是否读取文件内容
        .pipe(clean({force: true}));
});

//删除.tmp目录临时文件
gulp.task('clean-tmp', function () {
    return gulp.src(path.tmp, {read: false})
        .pipe(clean({force: true}));
});

//上传到远程服务器任务
gulp.task('upload', function () {
    return gulp.src(path.dist +'/**')
        .pipe(ftp({
            host: config.ftp.host,
            user: config.ftp.user,
            pass: config.ftp.key,
            remotePath: config.ftp.remotePath+'/'+ config.projectName
        }));
});

//通过浏览器打开本地 Web服务器 路径
gulp.task('openbrowser', function() {
    opn( 'http://' + config.localserver.host + ':' + config.localserver.port );
});

//开启本地 Web 服务器功能
gulp.task('webserver', function() {
    return gulp.src(path.src)
        .pipe(webserver({
            host             : getIP(),
            port             : config.localserver.port,
            livereload       : true,
            directoryListing : false
        }));
});

//文件监控
gulp.task('watch', function () {

    server.listen(35729, function (err) {
        if (err){
          return console.log(err);
        }
    });

    gulp.watch([path.srcHtml, path.srcCss, path.srcJs],  function (e) {
        server.changed({
            body: {
                files: [e.path]
            }
        });
    });
 
});

//默认任务
gulp.task('default', ['watch','webserver','openbrowser']);

//项目完成提交任务
gulp.task('build', function(done) {
    runSequence('clean','useref','minify-inline', 'imagemin', 'replace-htmlpath', 'replace-jspath', /*'replace-csspath',*/ 'clean-tmp', done); //圆括号内任务串行执行，方括号内并行执行
});


function getIP(){
    var ip = 'localhost';
    for (var dev in ifaces) {
        ifaces[dev].every(function(details){
            if (details.family=='IPv4' && details.address!='127.0.0.1' && !details.internal) {
                ip = details.address;
                return false;
            }
            return true;
        });
    }
    return ip;
}