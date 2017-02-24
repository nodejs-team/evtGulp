var gulp         = require('gulp'),
    eventstream  = require('event-stream'),
    cssmin       = require('gulp-minify-css'),
    uglify       = require('gulp-uglify'),
    sass         = require('gulp-sass'),
    minifyInline = require('gulp-minify-inline'),
    jshint       = require('gulp-jshint'),
    stylish      = require('jshint-stylish'),
    webserver    = require('gulp-webserver'),
    clean        = require('gulp-clean'),
    imagemin     = require('gulp-imagemin'),
    pngquant     = require('imagemin-pngquant'),
    cache        = require('gulp-cache'),
    replace      = require('gulp-replace'),
    useref       = require('gulp-useref'),
    gulpif       = require('gulp-if'),
    lazypipe     = require('lazypipe'),
    tinyCompress = require('gulp-tinypng-compress'),
    tinypng     = require('gulp-tinypng'),
    ftp          = require('gulp-ftp'),
    gutil        = require('gulp-util'),
    runSequence  = require('gulp-run-sequence'),
    handleErrors = require('./util/handleErrors'),
    os           = require('os'),
    ifaces       = os.networkInterfaces(),
    config       = require('./config.json'),
    fs           = require('fs'),
    fsPath       = require('path'),
    argv         = require('yargs').argv;

var SRC = 'src/' + config.projectName;
var DIST = 'dist/' + config.projectName;
var path = {
    src: SRC,
    dist: DIST,
    distImgFolder: DIST + '/images',
    srcJs: SRC + '/js/**/*.js',
    srcSass: SRC + '/sass/**/*.scss',
    srcCssFolder: SRC + '/css',
    srcImg: SRC + '/images/**/*.{png,jpg,jpeg}',
    srcImgGif: SRC + '/images/**/*.gif',
    srcFont: SRC + '/fonts/**/*',
    distFontFolder: DIST + '/fonts',
    srcHtml: SRC +'/*.html',
    distHtml: DIST +'/*.html'
};

//压缩图片 - imagemin
gulp.task('imagemin', ["copy-files"], function () {
    return gulp.src(path.srcImg)
        .pipe(cache(imagemin({
            progressive: true,
            svgoPlugins: [{removeViewBox: false}],
            use: [pngquant()]
        })))
        .pipe(gulp.dest(path.distImgFolder))
});

//压缩图片 - tinypng-compress
gulp.task('tinypng-compress', ["copy-files"], function () {
    return gulp.src(path.srcImg)
        .pipe(cache(tinyCompress({
            key:config.tinypngapi,
            log:true
        })))
        .pipe(gulp.dest(path.distImgFolder))
});

//压缩图片 - tinypng
gulp.task('tinypng', ["copy-files"], function () {
    return gulp.src(path.srcImg)
        .pipe(cache(tinypng(config.tinypngapi)))
        .pipe(gulp.dest(path.distImgFolder))
});

//copy files
gulp.task('copy-files', function (done) {
    var tasks = [];

    tasks.push(
        gulp.src(path.srcImgGif)
        .pipe(gulp.dest(path.distImgFolder))
    );

    tasks.push(
        gulp.src(path.srcFont)
        .pipe(gulp.dest(path.distFontFolder))
    );

    eventstream.merge(tasks).on('end', done);

});

//编译sass
gulp.task('compile-sass', function(){
    return gulp.src(path.srcSass)
        .pipe(sass({outputStyle: 'expanded'}).on('error', sass.logError))
        .pipe(gulp.dest(path.srcCssFolder));
});

//从远程仓库下载模板
var ghdownload = require('github-download');
function downloadRepo(dirPath) {
  return new Promise(function (resolve, reject) {
    ghdownload('git@github.com:semdy/evtGulp-template.git', fsPath.join(__dirname, dirPath))
      .on('error', function(err) {
        throw err;
      })
      .on('end', resolve);
  });
}

//创建脚手架工程
gulp.task('create', function(){
  var argName = argv.name;
  var projectName = argName || config.projectName;
  var destPath = path.src;

  if( argName ){
    destPath = destPath.replace(/[^/]+$/, argName);
  }

  if( fs.existsSync(destPath) ){
      throw new Error(projectName + "项目名已存在！");
  }

  console.log("download template...");

  downloadRepo(destPath).then(function(){
    if( argName ){
      config.projectName = argName;
      fs.writeFile(fsPath.join(__dirname, 'config.json'), JSON.stringify(config, null, 1), function(err) {
          if (err) throw err;
          console.log('项目"' + projectName + '"创建成功');
      });
    } else {
      console.log('项目"' + projectName + '"创建成功');
    }
  });

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

var buildHTML = lazypipe()
    .pipe(minifyInline, {
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
    })
    .pipe(replace, /"(css|images|js)\/([^"]+?)"/gm, '"' + config.revPrefix + config.projectName + "/" + '$1/$2' + '"')
    .pipe(replace, /(:\s*url\()(\.\.)?([^)]+?)/gm, '$1' + config.revPrefix + config.projectName + '/$3');

var buildJS = lazypipe()
    .pipe(uglify)
    .pipe(replace, /"(css|images|js)\/([^"]+?)"/gm, '"' + config.revPrefix + config.projectName + "/" + '$1/$2' + '"')
    .pipe(replace, /(url:")([^"]+?)"/gm, '$1' + config.revPrefix + config.projectName + "/images/" + '$2' + '"');

var buildCSS = lazypipe().pipe(cssmin);

//基于配置合并路径
gulp.task('useref', function (done) {
  createConfigFile(false).then(function () {
    return createConfigFile(true)
  }).then(function () {
    gulp.src(path.srcHtml)
      .pipe(useref())
      .pipe(gulpif('*.html', buildHTML()))
      .pipe(gulpif('*.js', buildJS()))
      .pipe(gulpif('*.css', buildCSS()))
      .pipe(gulp.dest(path.dist))
      .on("end", done);
  });
});

function createConfigFile(isBanner) {
  var files = {
    config:  isBanner ? "resBanner.json" : "res.json",
    mcData: isBanner ? 'mcDataBanner.js' : 'mcData.js',
    resData: isBanner ? 'resDataBanner.js' : 'resData.js'
  };
  return new Promise(function (resolve, reject) {
    fs.readFile(fsPath.join(__dirname, path.src, '/images/'+ files.config), 'utf8', function (err, data) {
      if( err ) return resolve(err);
      if( !data ) return resolve();

      data = JSON.parse(data);

      var resMap = {};
      var itemData;
      var writeData = function (data) {
        return "Resource.setAsset(" + data + ");";
      };
      data.resources.forEach(function (item) {
        if ((item.type == 'json' || item.type == 'sheet') && !/res(Banner)?\.json$/.test(item.url)) {
          try {
            itemData = JSON.parse(fs.readFileSync(fsPath.join(__dirname, path.src, '/images/' + item.url), {encoding: 'utf8'}));
          } catch (err){
            throw err;
          }
          resMap[item.name] = itemData.frames || itemData;
        }
      });

      fs.writeFile(fsPath.join(__dirname, path.src, '/js/' + files.mcData), writeData(JSON.stringify(resMap, null, 1)), function (err) {
        if( err ) return resolve(err);

        var resResources = [];
        var sheetKeys = [];
        data.resources.forEach(function (item) {
          if (item.type !== 'json' && item.type !== 'sheet') {
            resResources.push(item);
          }
          if (item.type == 'sheet') {
            var keyName = item.name.replace(/json$/, "png");
            resResources.push({
              name: keyName,
              type: "image",
              url: item.url.replace(/json$/, "png")
            });
            sheetKeys.push(keyName);
          }
        });

        var resGroups = [];
        data.groups.forEach(function (item) {
          var newKeys = [];
          item.keys.split(/,/).forEach(function (key) {
            if (!/_json$/.test(key)) {
              newKeys.push(key);
            }
          });
          item.keys = newKeys.concat(sheetKeys).join(",");
          resGroups.push(item);
        });

        var resData = {
          groups: resGroups,
          resources: resResources
        };

        fs.writeFile(fsPath.join(__dirname, path.src, '/js/' + files.resData), "var resData = " + JSON.stringify(resData, null, 1), function (err) {
          if( err ) return resolve(err);
          resolve();
        });

      });

    });

  });
  
}

//清空res和mc
gulp.task('clear-RES', function (done) {
  ['mcDataBanner', 'mcData','resDataBanner', 'resData'].forEach(function (name) {
    fs.writeFileSync(fsPath.join(__dirname, path.src, '/js/' + name + '.js'), "");
  });
  done();
});

//从远程仓库下载模板
var ghdownload = require('github-download');
gulp.task("download-template", function (done) {
  ghdownload('git@github.com:semdy/evtGulp-template.git', fsPath.join(__dirname, path.src))
    .on('error', function(err) {
      console.error(err)
    })
    .on('end', function() {
      done();
    });
});

/*====task for egret ======*/
gulp.task('tinypng-egret', function(){
    return gulp.src(SRC + "/resource/assets/**/*.{png,jpg,jpeg}")
        .pipe(tinypng({
            key:config.tinypngapi,
            log:true
        }))
        .pipe(gulp.dest(DIST + "/resource/assets"))
});

//copy egret files
gulp.task('build-egret-files', function (done) {
    var tasks = [];

    tasks.push(
        gulp.src(SRC + "/resource/*.json")
        .pipe(replace(/("url":")([^"]+?)"/gm, '$1' + config.revPrefix + config.projectName + "/resource/" + '$2' + '"'))
        .pipe(gulp.dest(DIST + "/resource"))
    );

    tasks.push(
        gulp.src(SRC + "/js/**/*.js")
        .pipe(gulp.dest(DIST + "/js"))
    );

    tasks.push(
        gulp.src(SRC + "/resource/**/*.mp3")
        .pipe(gulp.dest(DIST + "/resource"))
    );

    eventstream.merge(tasks).on('end', done);
});

var cssBase64 = require('gulp-css-base64');
var img64 = require('gulp-img64-2');

gulp.task('base64', function ( done ) {
    var tasks = [];

    tasks.push(
        gulp.src(DIST + "/css/*.css")
        .pipe(cssBase64({
            //baseDir: DIST + "/images"
            maxWeightResource: 1024*100
            //extensionsAllowed: ['.gif', '.jpg']
        }))
        .pipe(gulp.dest(DIST + "/css"))
    );

    tasks.push(
        gulp.src(DIST + '/*.html')
        .pipe(replace(/"launcher\/([^"]+?)"/gm, '"' + config.revPrefix + config.projectName + "/launcher/" + '$1' + '"'))
        .pipe(replace('<img src="' + config.revPrefix + config.projectName + '/', '<img src="'))
        .pipe(img64({
            maxWeightResource: 1024*100
        }))
        .pipe(gulp.dest(DIST))
    );

    eventstream.merge(tasks).on('end', done);
});

gulp.task('build-egret', function(done) {
    runSequence('tinypng-egret', 'build-egret-files', 'base64', done);
});

/*====end task for egret ======*/

//重新build前删除生产目录
gulp.task('clean', function () {
    return gulp.src(path.dist, {read: false})
        .pipe(clean({force: true}));
});

//清理cache
gulp.task('clean-cache', function (done) {
    return cache.clearAll(done);
});

//开启本地 Web 服务器功能
gulp.task('webserver', function() {
    return gulp.src(path.src)
        .pipe(webserver({
            host             : getIP(),
            port             : config.localserver.port,
            livereload       : true,
            open             : true,
            directoryListing : false
        }));
});

gulp.task('upload', function(){
    return gulp.src(path.dist + "/**/*")
        .pipe(ftp({
            host: config.ftp.host,
            user: config.ftp.user,
            pass: config.ftp.pass,
            remotePath: config.ftp.remotePath+ '/' + config.projectName
        }))
        .pipe(gutil.noop())

});

gulp.task('watch', function(){
    gulp.watch(path.srcSass, ['compile-sass']);
});

//默认任务
gulp.task('default', ['compile-sass', 'watch', 'webserver']);

//项目完成提交任务
gulp.task('build', function(done) {
    runSequence('clean','useref', 'tinypng', done);
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
