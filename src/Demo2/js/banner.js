/**
 * Created by mcake on 2016/5/24.
 */
(function($){

    var loadComplete = function () {

    };

    var loadResource = function(){
        var loader = new Resource.loadGroup("preload", resDataBanner);
        var spin = Resource.el('#evt_spin');

        loader.on("progress", function (loaded, total) {
            spin.innerHTML = "loading: " + Math.floor(loaded / total * 100) + "%";
        });

        loader.on("complete", function () {
          Resource.el('#evt_loading').style.display = "none";
          Resource.el('#evt_container').style.display = 'block';
          correctPNG($('#evt_container').get(0));
          bindScroll('#evt_container');
          loadComplete();
        });
    };

    $(function(){
        loadResource();
    });

})(jQuery);