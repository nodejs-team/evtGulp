
function Dialog(bg,els,opts,n,money) {
    this.$Dialog = $(els);
    this.$Dialogbg = $(bg);
    this.$close = this.$Dialog.find(opts.close);
    this.$btn = this.$Dialog.find(opts.btn);
    this.n = n;
    this.money = money;
    this._init();
}
Dialog.prototype={
    _init:function () {
        var self = this;
        this.show();
        this.$Dialogbg.click(function () {
            self.hide();
        });
        this.$close.click(function () {
            self.hide();
        });
        this.$btn.click(function () {
            self.hide();
        });
    },
    show:function () {
        this.$Dialogbg.fadeIn(300);
        this.$Dialog.fadeIn(300);
        this.$Dialog.find(".hb").text(this.money);
        this.$Dialog.find(".quan-"+this.n).fadeIn(300).siblings().not(".closes").hide();
    },
    hide:function () {
        this.$Dialogbg.fadeOut(300);
        this.$Dialog.fadeOut(300);
    }
};

/*
new Dialog(".Dialogbg",'.DialogBox',{
    close:'.closes',
    btn:'.go-use'
});*/
