;(function(){
    var resData = {
        "groups":[
            {
                "keys":"grid_bg_png,bash_bg_png,hand_png,cheese_sugar_png,slogan_png,cheese1_png,cheese2_png,cheese_mc_png",
                "name":"preload"
            }],
        "resources":[
            {
                "name":"grid_bg_png",
                "type":"image",
                "url":"grid_bg.png"
            },
            {
                "name":"bash_bg_png",
                "type":"image",
                "url":"bash_bg.png"
            },
            {
                "name":"hand_png",
                "type":"image",
                "url":"hand.png"
            },
            {
                "name":"cheese_sugar_png",
                "type":"image",
                "url":"cheese_sugar.png"
            },
            {
                "name":"slogan_png",
                "type":"image",
                "url":"slogan.png"
            },
            {
                "name":"cheese1_png",
                "type":"image",
                "url":"cheese1.png"
            },
            {
                "name":"cheese2_png",
                "type":"image",
                "url":"cheese2.png"
            },
            {
                "name":"cheese_mc_png",
                "type":"image",
                "url":"cheese_mc.png"
            }]
    };
    var cheeseMcData = {
        "c6":{"x":557,"y":400,"w":267,"h":276,"offX":53,"offY":115,"sourceW":334,"sourceH":406,"duration":3},
        "c7":{"x":269,"y":663,"w":286,"h":254,"offX":39,"offY":149,"sourceW":334,"sourceH":406,"duration":3},
        "c8":{"x":269,"y":400,"w":286,"h":261,"offX":39,"offY":142,"sourceW":334,"sourceH":406,"duration":1},
        "c1":{"x":557,"y":678,"w":279,"h":235,"offX":39,"offY":163,"sourceW":334,"sourceH":406,"duration":10},
        "c2":{"x":0,"y":0,"w":315,"h":398,"offX":3,"offY":0,"sourceW":334,"sourceH":406,"duration":3},
        "c3":{"x":604,"y":0,"w":279,"h":398,"offX":39,"offY":0,"sourceW":334,"sourceH":406,"duration":3},
        "c4":{"x":317,"y":0,"w":285,"h":398,"offX":33,"offY":0,"sourceW":334,"sourceH":406,"duration":3},
        "c5":{"x":0,"y":400,"w":267,"h":335,"offX":51,"offY":54,"sourceW":334,"sourceH":406,"duration":3}};
    var setCheeseMC = function(){
        var mcEl = document.createElement("div");
        var $target = $("#cheese_aniwp");
        var offset = $target.offset();
        $(mcEl).css({
            position: "absolute",
            left: offset.left,
            top: offset.top,
            zIndex: 1000
        });
        $(document.body).append(mcEl);
        var mc = new MovieClip('cheese_mc_png', cheeseMcData, 'cheese_mc', mcEl);
        mc.gotoAndPlay(1, 1);
        mc.on("complete", function () {
            $(mcEl).css({
                position: "",
                left: "",
                top: "",
                zIndex: ""
            }).appendTo($target);
        });
        return mc;
    };
    function loadResource(){
        var loader = new Resource.loadGroup("preload", resData);
        var spin = Resource.el('#evt_spin');
        loader.addEvent("progress", function (loaded, total) {
            spin.innerHTML = "loading: " + Math.floor(loaded / total * 100) + "%";
        });
        loader.addEvent("complete", function(){
            Resource.el('#evt_loading').style.display = "none";
            Resource.el('#evt_container').style.display = 'block';
            setCheeseMC();
            $("#plax_scene").parallax();
        });
    }
    $(function(){
        loadResource()
    })
})()