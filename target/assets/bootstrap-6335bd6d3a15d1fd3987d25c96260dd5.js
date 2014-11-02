if("undefined"==typeof jQuery)throw new Error("Bootstrap's JavaScript requires jQuery");+function($){"use strict";function Plugin(option){return this.each(function(){var $this=$(this),data=$this.data("bs.carousel"),options=$.extend({},Carousel.DEFAULTS,$this.data(),"object"==typeof option&&option),action="string"==typeof option?option:options.slide;data||$this.data("bs.carousel",data=new Carousel(this,options)),"number"==typeof option?data.to(option):action?data[action]():options.interval&&data.pause().cycle()})}var Carousel=function(element,options){this.$element=$(element).on("keydown.bs.carousel",$.proxy(this.keydown,this)),this.$indicators=this.$element.find(".carousel-indicators"),this.options=options,this.paused=this.sliding=this.interval=this.$active=this.$items=null,"hover"==this.options.pause&&this.$element.on("mouseenter.bs.carousel",$.proxy(this.pause,this)).on("mouseleave.bs.carousel",$.proxy(this.cycle,this))};Carousel.VERSION="3.2.0",Carousel.DEFAULTS={interval:5e3,pause:"hover",wrap:!0},Carousel.prototype.keydown=function(e){switch(e.which){case 37:this.prev();break;case 39:this.next();break;default:return}e.preventDefault()},Carousel.prototype.cycle=function(e){return e||(this.paused=!1),this.interval&&clearInterval(this.interval),this.options.interval&&!this.paused&&(this.interval=setInterval($.proxy(this.next,this),this.options.interval)),this},Carousel.prototype.getItemIndex=function(item){return this.$items=item.parent().children(".item"),this.$items.index(item||this.$active)},Carousel.prototype.to=function(pos){var that=this,activeIndex=this.getItemIndex(this.$active=this.$element.find(".item.active"));return pos>this.$items.length-1||0>pos?void 0:this.sliding?this.$element.one("slid.bs.carousel",function(){that.to(pos)}):activeIndex==pos?this.pause().cycle():this.slide(pos>activeIndex?"next":"prev",$(this.$items[pos]))},Carousel.prototype.pause=function(e){return e||(this.paused=!0),this.$element.find(".next, .prev").length&&$.support.transition&&(this.$element.trigger($.support.transition.end),this.cycle(!0)),this.interval=clearInterval(this.interval),this},Carousel.prototype.next=function(){return this.sliding?void 0:this.slide("next")},Carousel.prototype.prev=function(){return this.sliding?void 0:this.slide("prev")},Carousel.prototype.slide=function(type,next){var $active=this.$element.find(".item.active"),$next=next||$active[type](),isCycling=this.interval,direction="next"==type?"left":"right",fallback="next"==type?"first":"last",that=this;if(!$next.length){if(!this.options.wrap)return;$next=this.$element.find(".item")[fallback]()}if($next.hasClass("active"))return this.sliding=!1;var relatedTarget=$next[0],slideEvent=$.Event("slide.bs.carousel",{relatedTarget:relatedTarget,direction:direction});if(this.$element.trigger(slideEvent),!slideEvent.isDefaultPrevented()){if(this.sliding=!0,isCycling&&this.pause(),this.$indicators.length){this.$indicators.find(".active").removeClass("active");var $nextIndicator=$(this.$indicators.children()[this.getItemIndex($next)]);$nextIndicator&&$nextIndicator.addClass("active")}var slidEvent=$.Event("slid.bs.carousel",{relatedTarget:relatedTarget,direction:direction});return $.support.transition&&this.$element.hasClass("slide")?($next.addClass(type),$next[0].offsetWidth,$active.addClass(direction),$next.addClass(direction),$active.one("bsTransitionEnd",function(){$next.removeClass([type,direction].join(" ")).addClass("active"),$active.removeClass(["active",direction].join(" ")),that.sliding=!1,setTimeout(function(){that.$element.trigger(slidEvent)},0)}).emulateTransitionEnd(1e3*$active.css("transition-duration").slice(0,-1))):($active.removeClass("active"),$next.addClass("active"),this.sliding=!1,this.$element.trigger(slidEvent)),isCycling&&this.cycle(),this}};var old=$.fn.carousel;$.fn.carousel=Plugin,$.fn.carousel.Constructor=Carousel,$.fn.carousel.noConflict=function(){return $.fn.carousel=old,this},$(document).on("click.bs.carousel.data-api","[data-slide], [data-slide-to]",function(e){var href,$this=$(this),$target=$($this.attr("data-target")||(href=$this.attr("href"))&&href.replace(/.*(?=#[^\s]+$)/,""));if($target.hasClass("carousel")){var options=$.extend({},$target.data(),$this.data()),slideIndex=$this.attr("data-slide-to");slideIndex&&(options.interval=!1),Plugin.call($target,options),slideIndex&&$target.data("bs.carousel").to(slideIndex),e.preventDefault()}}),$(window).on("load",function(){$('[data-ride="carousel"]').each(function(){var $carousel=$(this);Plugin.call($carousel,$carousel.data())})})}(jQuery),+function($){"use strict";function clearMenus(e){e&&3===e.which||($(backdrop).remove(),$(toggle).each(function(){var $parent=getParent($(this)),relatedTarget={relatedTarget:this};$parent.hasClass("open")&&($parent.trigger(e=$.Event("hide.bs.dropdown",relatedTarget)),e.isDefaultPrevented()||$parent.removeClass("open").trigger("hidden.bs.dropdown",relatedTarget))}))}function getParent($this){var selector=$this.attr("data-target");selector||(selector=$this.attr("href"),selector=selector&&/#[A-Za-z]/.test(selector)&&selector.replace(/.*(?=#[^\s]*$)/,""));var $parent=selector&&$(selector);return $parent&&$parent.length?$parent:$this.parent()}function Plugin(option){return this.each(function(){var $this=$(this),data=$this.data("bs.dropdown");data||$this.data("bs.dropdown",data=new Dropdown(this)),"string"==typeof option&&data[option].call($this)})}var backdrop=".dropdown-backdrop",toggle='[data-toggle="dropdown"]',Dropdown=function(element){$(element).on("click.bs.dropdown",this.toggle)};Dropdown.VERSION="3.2.0",Dropdown.prototype.toggle=function(e){var $this=$(this);if(!$this.is(".disabled, :disabled")){var $parent=getParent($this),isActive=$parent.hasClass("open");if(clearMenus(),!isActive){"ontouchstart"in document.documentElement&&!$parent.closest(".navbar-nav").length&&$('<div class="dropdown-backdrop"/>').insertAfter($(this)).on("click",clearMenus);var relatedTarget={relatedTarget:this};if($parent.trigger(e=$.Event("show.bs.dropdown",relatedTarget)),e.isDefaultPrevented())return;$this.trigger("focus"),$parent.toggleClass("open").trigger("shown.bs.dropdown",relatedTarget)}return!1}},Dropdown.prototype.keydown=function(e){if(/(38|40|27)/.test(e.keyCode)){var $this=$(this);if(e.preventDefault(),e.stopPropagation(),!$this.is(".disabled, :disabled")){var $parent=getParent($this),isActive=$parent.hasClass("open");if(!isActive||isActive&&27==e.keyCode)return 27==e.which&&$parent.find(toggle).trigger("focus"),$this.trigger("click");var desc=" li:not(.divider):visible a",$items=$parent.find('[role="menu"]'+desc+', [role="listbox"]'+desc);if($items.length){var index=$items.index($items.filter(":focus"));38==e.keyCode&&index>0&&index--,40==e.keyCode&&index<$items.length-1&&index++,~index||(index=0),$items.eq(index).trigger("focus")}}}};var old=$.fn.dropdown;$.fn.dropdown=Plugin,$.fn.dropdown.Constructor=Dropdown,$.fn.dropdown.noConflict=function(){return $.fn.dropdown=old,this},$(document).on("click.bs.dropdown.data-api",clearMenus).on("click.bs.dropdown.data-api",".dropdown form",function(e){e.stopPropagation()}).on("click.bs.dropdown.data-api",toggle,Dropdown.prototype.toggle).on("keydown.bs.dropdown.data-api",toggle+', [role="menu"], [role="listbox"]',Dropdown.prototype.keydown)}(jQuery),+function($){"use strict";function Plugin(option){return this.each(function(){var $this=$(this),data=$this.data("bs.tab");data||$this.data("bs.tab",data=new Tab(this)),"string"==typeof option&&data[option]()})}var Tab=function(element){this.element=$(element)};Tab.VERSION="3.2.0",Tab.prototype.show=function(){var $this=this.element,$ul=$this.closest("ul:not(.dropdown-menu)"),selector=$this.data("target");if(selector||(selector=$this.attr("href"),selector=selector&&selector.replace(/.*(?=#[^\s]*$)/,"")),!$this.parent("li").hasClass("active")){var previous=$ul.find(".active:last a")[0],e=$.Event("show.bs.tab",{relatedTarget:previous});if($this.trigger(e),!e.isDefaultPrevented()){var $target=$(selector);this.activate($this.closest("li"),$ul),this.activate($target,$target.parent(),function(){$this.trigger({type:"shown.bs.tab",relatedTarget:previous})})}}},Tab.prototype.activate=function(element,container,callback){function next(){$active.removeClass("active").find("> .dropdown-menu > .active").removeClass("active"),element.addClass("active"),transition?(element[0].offsetWidth,element.addClass("in")):element.removeClass("fade"),element.parent(".dropdown-menu")&&element.closest("li.dropdown").addClass("active"),callback&&callback()}var $active=container.find("> .active"),transition=callback&&$.support.transition&&$active.hasClass("fade");transition?$active.one("bsTransitionEnd",next).emulateTransitionEnd(150):next(),$active.removeClass("in")};var old=$.fn.tab;$.fn.tab=Plugin,$.fn.tab.Constructor=Tab,$.fn.tab.noConflict=function(){return $.fn.tab=old,this},$(document).on("click.bs.tab.data-api",'[data-toggle="tab"], [data-toggle="pill"]',function(e){e.preventDefault(),Plugin.call($(this),"show")})}(jQuery),+function($){"use strict";function Plugin(option){return this.each(function(){var $this=$(this),data=$this.data("bs.collapse"),options=$.extend({},Collapse.DEFAULTS,$this.data(),"object"==typeof option&&option);!data&&options.toggle&&"show"==option&&(option=!option),data||$this.data("bs.collapse",data=new Collapse(this,options)),"string"==typeof option&&data[option]()})}var Collapse=function(element,options){this.$element=$(element),this.options=$.extend({},Collapse.DEFAULTS,options),this.transitioning=null,this.options.parent&&(this.$parent=$(this.options.parent)),this.options.toggle&&this.toggle()};Collapse.VERSION="3.2.0",Collapse.DEFAULTS={toggle:!0},Collapse.prototype.dimension=function(){var hasWidth=this.$element.hasClass("width");return hasWidth?"width":"height"},Collapse.prototype.show=function(){if(!this.transitioning&&!this.$element.hasClass("in")){var startEvent=$.Event("show.bs.collapse");if(this.$element.trigger(startEvent),!startEvent.isDefaultPrevented()){var actives=this.$parent&&this.$parent.find("> .panel > .in");if(actives&&actives.length){var hasData=actives.data("bs.collapse");if(hasData&&hasData.transitioning)return;Plugin.call(actives,"hide"),hasData||actives.data("bs.collapse",null)}var dimension=this.dimension();this.$element.removeClass("collapse").addClass("collapsing")[dimension](0),this.transitioning=1;var complete=function(){this.$element.removeClass("collapsing").addClass("collapse in")[dimension](""),this.transitioning=0,this.$element.trigger("shown.bs.collapse")};if(!$.support.transition)return complete.call(this);var scrollSize=$.camelCase(["scroll",dimension].join("-"));this.$element.one("bsTransitionEnd",$.proxy(complete,this)).emulateTransitionEnd(350)[dimension](this.$element[0][scrollSize])}}},Collapse.prototype.hide=function(){if(!this.transitioning&&this.$element.hasClass("in")){var startEvent=$.Event("hide.bs.collapse");if(this.$element.trigger(startEvent),!startEvent.isDefaultPrevented()){var dimension=this.dimension();this.$element[dimension](this.$element[dimension]())[0].offsetHeight,this.$element.addClass("collapsing").removeClass("collapse").removeClass("in"),this.transitioning=1;var complete=function(){this.transitioning=0,this.$element.trigger("hidden.bs.collapse").removeClass("collapsing").addClass("collapse")};return $.support.transition?void this.$element[dimension](0).one("bsTransitionEnd",$.proxy(complete,this)).emulateTransitionEnd(350):complete.call(this)}}},Collapse.prototype.toggle=function(){this[this.$element.hasClass("in")?"hide":"show"]()};var old=$.fn.collapse;$.fn.collapse=Plugin,$.fn.collapse.Constructor=Collapse,$.fn.collapse.noConflict=function(){return $.fn.collapse=old,this},$(document).on("click.bs.collapse.data-api",'[data-toggle="collapse"]',function(e){var href,$this=$(this),target=$this.attr("data-target")||e.preventDefault()||(href=$this.attr("href"))&&href.replace(/.*(?=#[^\s]+$)/,""),$target=$(target),data=$target.data("bs.collapse"),option=data?"toggle":$this.data(),parent=$this.attr("data-parent"),$parent=parent&&$(parent);data&&data.transitioning||($parent&&$parent.find('[data-toggle="collapse"][data-parent="'+parent+'"]').not($this).addClass("collapsed"),$this[$target.hasClass("in")?"addClass":"removeClass"]("collapsed")),Plugin.call($target,option)})}(jQuery),+function($){"use strict";function transitionEnd(){var el=document.createElement("bootstrap"),transEndEventNames={WebkitTransition:"webkitTransitionEnd",MozTransition:"transitionend",OTransition:"oTransitionEnd otransitionend",transition:"transitionend"};for(var name in transEndEventNames)if(void 0!==el.style[name])return{end:transEndEventNames[name]};return!1}$.fn.emulateTransitionEnd=function(duration){var called=!1,$el=this;$(this).one("bsTransitionEnd",function(){called=!0});var callback=function(){called||$($el).trigger($.support.transition.end)};return setTimeout(callback,duration),this},$(function(){$.support.transition=transitionEnd(),$.support.transition&&($.event.special.bsTransitionEnd={bindType:$.support.transition.end,delegateType:$.support.transition.end,handle:function(e){return $(e.target).is(this)?e.handleObj.handler.apply(this,arguments):void 0}})})}(jQuery);