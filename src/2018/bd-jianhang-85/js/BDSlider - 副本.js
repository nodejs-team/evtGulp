function refreshNumber(ix){}
var dis=0.85;
function initNum(){
  var $input = $('.pro-num input'),
    $nowPrice = $('.now-price'),
    $oldPrice = $('.old-price'),
    $minus = $input.siblings('.minus'),
    $plus = $input.siblings('.plus');
  var items = [];
  $('.slideItem').each(function(ix, el){
    var ponds = $(el).attr('data-pond');
    var ids = $(el).attr('data-postID');
    var price = $(el).attr('data-price');


    if(ponds){
      items.push({
        ponds: ponds.split(',').map(function(str){ return str.replace(/(^\s*)|(\s*$)/g, "")}),
        ix: 0,
        ids: ids.split(',').map(function(str){ return str.replace(/(^\s*)|(\s*$)/g, "")}),
        price: price.split(',').map(function(str){ return str.replace(/(^\s*)|(\s*$)/g, "")})
      })
    }
  });


  /*$nowPrice.text((currentItem.price[ix]*dis).toFixed(1));
  $oldPrice.text(currentItem.price[ix]);*/

  var currentItem = items[0];

  $minus.on('click', function(){
    var ix = --currentItem.ix;
    if(ix<0){
      ix = currentItem.ix = 0;
    }
    $input.val(currentItem.ponds[ix]).attr('data-postID', currentItem.ids[ix]);
    $nowPrice.text((currentItem.price[ix]*dis).toFixed(1));
    $oldPrice.text(currentItem.price[ix]);
  });
  $plus.on('click', function(){
    var ix = ++currentItem.ix;
    if(ix>currentItem.ponds.length-1){
      ix = currentItem.ix = currentItem.ponds.length-1;
    }

    $input.val(currentItem.ponds[ix]).attr('data-postID', currentItem.ids[ix]);
    $nowPrice.text((currentItem.price[ix]*dis).toFixed(1));
    $oldPrice.text(currentItem.price[ix]);
  })
  return function(ix){
    currentItem = items[ix];
    $input.val(currentItem.ponds[currentItem.ix]).attr('data-postID', currentItem.ids[currentItem.ix]);
    $nowPrice.text((currentItem.price[ix]*dis).toFixed(1));
    $oldPrice.text(currentItem.price[ix]);
  }
}

function BDSlider(el, options){
  //console.log(options)
  this.$wrapper = $(el);
  this.$items = this.$wrapper.children();
  this.percentage = 0.8;
  this.$next = $(options.next);
  this.$prev = $(options.prev);
  this.wrapWidth = this.$wrapper.width();
  this.wrapHeight = this.$wrapper.height();
  this.itemWidth = this.$items.width();
  this.itemHeight = this.$items.height();
  this.isSliding = false;
  this.slideEnd = options.slideEnd || function(ix){};

  this.position = {
    center: {
      top:0,
      left:(this.wrapWidth-this.itemWidth)/2,
      width: this.itemWidth,
      height: this.itemHeight
    },
    left: {
      top: (this.wrapHeight - this.itemHeight*this.percentage) / 2,
      left: 0,
      width: this.itemWidth * this.percentage,
      height: this.itemHeight * this.percentage
    },
    right: {
      top: (this.wrapHeight - this.itemHeight*this.percentage) / 2,
      left: this.wrapWidth - this.itemWidth * this.percentage,
      width: this.itemWidth * this.percentage,
      height: this.itemHeight * this.percentage
    },
    hide: {
      top: (this.wrapHeight - this.itemHeight*this.percentage) / 2,
      left: (this.wrapWidth - this.itemWidth*this.percentage) /2,
      width: this.itemWidth * this.percentage,
      height: this.itemHeight * this.percentage
    }
  };
  this.current = 0;
  this.total = this.$items.length;
  this.autoplay = options.autoplay || false;
  this.init();
}
BDSlider.prototype = {
  constructor: BDSlider,
  next: function(){
    if(this.isSliding) return;
    this.current--;
    if(this.current<0){
      this.current = this.total-1;
    }
    this.sliding('right');
  },
  prev: function(){
    if(this.isSliding) return;
    this.current++;
    if(this.current>=this.total){
      this.current = 0;
    }
    this.sliding('left');
  },
  auto:function () {
    if(!this.autoplay) return;
    var self = this;
    function delay(){
      self.timer = setTimeout(function(){
        self.next();
        delay();
      }, 5000)
    }
    delay();
  },
  sliding: function(direction){

    this.isSliding = true;
    var self = this;
    this.$items.each(function(ix, el){
      if(ix == self.current){
        $(el).css('z-index',4).animate(self.position.center,500, function(){
          self.isSliding = false;
          self.slideEnd(self.current);
        }).removeClass('slideRight slideLeft slideHide').addClass('slideCenter').find('span').animate({
          bottom: '28px',
          'font-size': '14px'
        });
        return;
      }
      if(ix == (self.current+1)%self.total){
        $(el).css('z-index', direction=='right' ? 3 : 2).animate(self.position.right,500)
          .removeClass('slideCenter slideLeft slideHide').addClass('slideRight').find('span').animate({
          bottom: '21px',
          'font-size': '12px'
        });
        return;
      }
      if(ix == (self.current-1+self.total)%self.total){
        $(el).css('z-index', direction=='left' ? 3 : 2).animate(self.position.left, 500)
          .removeClass('slideCenter slideRight slideHide').addClass('slideLeft').find('span').animate({
          bottom: '21px',
          'font-size': '12px'
        });
        return;
      }
      $(el).css('z-index', 1).animate(self.position.hide, 500)
        .removeClass('slideCenter slideRight slideLeft').addClass('slideHide')
      // console.log(direction, ix)
      // if((direction == 'right' && ix == (self.current+2)%self.total) || (direction == 'left' && ix == (self.current-2+self.total)%self.total)){
      //
      //     return;
      // }
    })
  },
  init: function(){
    var self = this;
    this.sliding('right');
    this.$next.on('click', function(){
      self.next();
    })
    this.$prev.on('click', function(){
      self.prev();
    })
    this.$wrapper.on('mouseenter', function(){
      clearTimeout(self.timer);
    })
    this.$wrapper.on('mouseleave', function(){
      self.auto();
    })
    this.auto();
  }
}

function initSlider(){
  new BDSlider('#bdSlider', {
    prev: '.slidePrev',
    next: '.slideNext',
    autoplay: false,
    slideEnd: function(ix){
      refreshNumber(ix);
    }
  })
}
initSlider();