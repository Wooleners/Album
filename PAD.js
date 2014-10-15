	/**
	 *	PadWeb Library
	 *	公共模块
	 *	@time 2014-2-13
	 */

	var PAD = PAD || {};
	//注册模块
	PAD.register = function(str) {
		var arr = str.split("."),
			o = PAD,
			i;
		for (i = (arr[0] == "PAD") ? 1 : 0; i < arr.length; i++) {
			o[arr[i]] = o[arr[i]] || {};
			o = o[arr[i]];
		}
	}
	/**
	 *	工具类（可扩展）
	 *	常用工具方法，CSS3特性嗅探
	 *	@time 2014-2-13
	 */
	PAD.register("Util");
	PAD.Util.array = (function() {
		//依赖
		var ulang = PAD.Util.lang,
			//私有属性
			toString = Object.prototype.toString,
			arrayStr = "[Object Array]";
		//可选的一次性初始化过程
		//...

		//公有 API
		return {

			inArray: function(neddle, haystack) {
				if (haystack[i] === neddle) {
					return true;
				}
			},

			isArray: function(ele) {
				return toString.call(ele) === arrayStr;
			}
			//... 更多的方法和属性
		};
	})();
	/**
	 *	Ajax 模块
	 *	@author hwang
	 *	@time   2014-2-13
	 *  @tips   wait to overwrite
	 */

	PAD.Util.ajax = (function() {
		var getData = function(url, callback) {
			J.get({
				url: url,
				async: true,
				cache: false,
				timeout: 150000,
				onSuccess: function(data) {
					callback(data);
				}
			});
		};
		return {
			execute: getData
		};
	}());

	/**
	 * 模拟跳转
	 * 解决iscroll下跳转问题
	 * @author hwang
	 */
	PAD.Util.fireJump = function(href, target) {
		if (!href) {
			return;
		}
		var ele = J.create("a", {
			"href": href,
			"target": target || "_blank",
			"style": "display:none"
		}).appendTo(J.g(document.body));
		ele.get(0).click(), ele.remove();
	};
	/**
	 * 替换图片域名
	 *
	 */
	PAD.Util.changeImageDomain = function(imgsrc, imgkey) {
		if (imgsrc.indexOf(imgkey) > 0) {
			return imgsrc.replace("http://", "http://" + PAD.Util.getImageDomain(imgsrc) + ".");
		} else {
			return imgsrc;
		}
	}

	PAD.Util.getImageDomain = function(url) {
		var a = url.split("/");
		var b = c = d = "";
		for (b in a) {
			if (a[b].length == 32 || a[b].length == 34) { //取imageid
				c = String.fromCharCode(parseInt(a[b][0], 16) % 4 + 97); //
			}
		}
		return c;
	}

	PAD.Util.lang = (function() {
		var Constr;
		//公有 API --构造函数
		Constr = function(o) {
			this.elements = this.toArray(o);
		}
		//公有 API --原型
		Constr.prototype = {
			constructor: PAD.Util.lang,
			version: "2.0",
			toArray: function(obj) {
				return obj;
			}
		}
	})();

	//Use Constr Func
	//var arr = new PAD.Util.lang(obj);

	//import window into module

	PAD.register("Comm");
	/**
	 * 滑动类
	 * @param  {[type]} app    [应用程序]
	 * @param  {[type]} global [全局对象]
	 * @return {[type]}        [实例对象]
	 * @time   2014-2-21
	 */

	PAD.Comm.swipe = (function(app, global) {
		//引用全局对象
		//引用应用程序

	}(PAD, this));

	/**
	 * iScroll v4.1.9
	 * @change by hwang
	 * @return iscroll
	 * @time   2014-2-26
	 */

	PAD.Comm.iscroll = (function() {
		var m = Math,
			vendor = (/webkit/i).test(navigator.appVersion) ? 'webkit' :
				(/firefox/i).test(navigator.userAgent) ? 'Moz' :
				'opera' in window ? 'O' : '',
			// Browser capabilities
			has3d = 'WebKitCSSMatrix' in window && 'm11' in new WebKitCSSMatrix(),
			hasTouch = 'ontouchstart' in window,
			hasTransform = vendor + 'Transform' in document.documentElement.style,
			isAndroid = (/android/gi).test(navigator.appVersion),
			isIDevice = (/iphone|ipad/gi).test(navigator.appVersion),
			isPlaybook = (/playbook/gi).test(navigator.appVersion),
			hasTransitionEnd = isIDevice || isPlaybook,
			nextFrame = (function() {
				return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame || function(callback) {
					return setTimeout(callback, 1);
				}
			})(),
			cancelFrame = (function() {
				return window.cancelRequestAnimationFrame || window.webkitCancelRequestAnimationFrame || window.mozCancelRequestAnimationFrame || window.oCancelRequestAnimationFrame || window.msCancelRequestAnimationFrame || clearTimeout
			})(),
			// Events
			RESIZE_EV = 'onorientationchange' in window ? 'orientationchange' : 'resize',
			START_EV = hasTouch ? 'touchstart' : 'mousedown',
			MOVE_EV = hasTouch ? 'touchmove' : 'mousemove',
			END_EV = hasTouch ? 'touchend' : 'mouseup',
			CANCEL_EV = hasTouch ? 'touchcancel' : 'mouseup',
			WHEEL_EV = vendor == 'Moz' ? 'DOMMouseScroll' : 'mousewheel',
			// Helpers
			trnOpen = 'translate' + (has3d ? '3d(' : '('),
			trnClose = has3d ? ',0)' : ')',
			// Constructor
			iScroll = function(el, options) {
				var that = this,
					doc = document,
					i;
				that.wrapper = typeof el == 'object' ? el : doc.getElementById(el);
				that.wrapper.style.overflow = 'hidden';
				that.scroller = that.wrapper.children[0];
				// Default options
				that.options = {
					hScroll: true,
					vScroll: true,
					bounce: true,
					bounceLock: false,
					momentum: true,
					lockDirection: true,
					useTransform: true,
					useTransition: false,
					topOffset: 0,
					checkDOMChanges: false, // Experimental
					roundPosition: false,
					// Scrollbar
					hScrollbar: true,
					vScrollbar: true,
					fixedScrollbar: isAndroid,
					hideScrollbar: isIDevice,
					fadeScrollbar: isIDevice && has3d,
					scrollbarClass: '',
					// Zoom
					zoom: false,
					zoomMin: 1,
					zoomMax: 4,
					doubleTapZoom: 2,
					wheelAction: 'scroll',
					// Snap
					snap: false,
					snapThreshold: 1,
					// Events
					onRefresh: null,
					onBeforeScrollStart: function(e) {
						e.preventDefault();
					},
					onScrollStart: null,
					onBeforeScrollMove: null,
					onScrollMove: null,
					onBeforeScrollEnd: null,
					onScrollEnd: null,
					onTouchEnd: null,
					onDestroy: null,
					onZoomStart: null,
					onZoom: null,
					onZoomEnd: null
				};
				// User defined options
				for (i in options) that.options[i] = options[i];
				// Normalize options
				that.options.useTransform = hasTransform ? that.options.useTransform : false;
				that.options.hScrollbar = that.options.hScroll && that.options.hScrollbar;
				that.options.vScrollbar = that.options.vScroll && that.options.vScrollbar;
				that.options.zoom = that.options.useTransform && that.options.zoom;
				that.options.useTransition = hasTransitionEnd && that.options.useTransition;
				// Set some default styles
				that.scroller.style[vendor + 'TransitionProperty'] = that.options.useTransform ? '-' + vendor.toLowerCase() + '-transform' : 'top left';
				that.scroller.style[vendor + 'TransitionDuration'] = '0';
				that.scroller.style[vendor + 'TransformOrigin'] = '0 0';
				if (that.options.useTransition) that.scroller.style[vendor + 'TransitionTimingFunction'] = 'cubic-bezier(0.33,0.66,0.66,1)';
				if (that.options.useTransform) that.scroller.style[vendor + 'Transform'] = trnOpen + '0,0' + trnClose;
				else that.scroller.style.cssText += ';position:absolute;top:0;left:0';
				if (that.options.useTransition) that.options.fixedScrollbar = true;
				that.refresh();
				that._bind(RESIZE_EV, window);
				that._bind(START_EV);
				if (!hasTouch) {
					that._bind('mouseout', that.wrapper);
					that._bind(WHEEL_EV);
				}
				if (that.options.checkDOMChanges) that.checkDOMTime = setInterval(function() {
					that._checkDOMChanges();
				}, 500);
			};
		// Prototype
		iScroll.prototype = {
			enabled: true,
			x: 0,
			y: 0,
			steps: [],
			scale: 1,
			currPageX: 0,
			currPageY: 0,
			pagesX: [],
			pagesY: [],
			aniTime: null,
			wheelZoomCount: 0,
			handleEvent: function(e) {
				var that = this;
				switch (e.type) {
					case START_EV:
						if (!hasTouch && e.button !== 0) return;
						that._start(e);
						break;
					case MOVE_EV:
						that._move(e);
						break;
					case END_EV:
					case CANCEL_EV:
						that._end(e);
						break;
					case RESIZE_EV:
						that._resize();
						break;
					case WHEEL_EV:
						that._wheel(e);
						break;
					case 'mouseout':
						that._mouseout(e);
						break;
					case 'webkitTransitionEnd':
						that._transitionEnd(e);
						break;
				}
			},
			_checkDOMChanges: function() {
				if (this.moved || this.zoomed || this.animating ||
					(this.scrollerW == this.scroller.offsetWidth * this.scale && this.scrollerH == this.scroller.offsetHeight * this.scale)) return;
				this.refresh();
			},
			_scrollbar: function(dir) {
				var that = this,
					doc = document,
					bar;
				if (!that[dir + 'Scrollbar']) {
					if (that[dir + 'ScrollbarWrapper']) {
						if (hasTransform) that[dir + 'ScrollbarIndicator'].style[vendor + 'Transform'] = '';
						that[dir + 'ScrollbarWrapper'].parentNode && that[dir + 'ScrollbarWrapper'].parentNode.removeChild(that[dir + 'ScrollbarWrapper']);
						that[dir + 'ScrollbarWrapper'] = null;
						that[dir + 'ScrollbarIndicator'] = null;
					}
					return;
				}
				if (!that[dir + 'ScrollbarWrapper']) {
					// Create the scrollbar wrapper
					bar = doc.createElement('div');
					if (that.options.scrollbarClass) bar.className = that.options.scrollbarClass + dir.toUpperCase();
					else bar.style.cssText = 'position:absolute;z-index:100;' + (dir == 'h' ? 'height:7px;bottom:1px;left:2px;right:' + (that.vScrollbar ? '7' : '2') + 'px' : 'width:7px;bottom:' + (that.hScrollbar ? '7' : '2') + 'px;top:2px;right:1px');
					bar.style.cssText += ';pointer-events:none;-' + vendor + '-transition-property:opacity;-' + vendor + '-transition-duration:' + (that.options.fadeScrollbar ? '350ms' : '0') + ';overflow:hidden;opacity:' + (that.options.hideScrollbar ? '0' : '1');
					that.wrapper.appendChild(bar);
					that[dir + 'ScrollbarWrapper'] = bar;
					// Create the scrollbar indicator
					bar = doc.createElement('div');
					if (!that.options.scrollbarClass) {
						bar.style.cssText = 'position:absolute;z-index:100;background:rgba(0,0,0,0.5);border:1px solid rgba(255,255,255,0.9);-' + vendor + '-background-clip:padding-box;-' + vendor + '-box-sizing:border-box;' + (dir == 'h' ? 'height:100%' : 'width:100%') + ';-' + vendor + '-border-radius:3px;border-radius:3px';
					}
					bar.style.cssText += ';pointer-events:none;-' + vendor + '-transition-property:-' + vendor + '-transform;-' + vendor + '-transition-timing-function:cubic-bezier(0.33,0.66,0.66,1);-' + vendor + '-transition-duration:0;-' + vendor + '-transform:' + trnOpen + '0,0' + trnClose;
					if (that.options.useTransition) bar.style.cssText += ';-' + vendor + '-transition-timing-function:cubic-bezier(0.33,0.66,0.66,1)';
					that[dir + 'ScrollbarWrapper'].appendChild(bar);
					that[dir + 'ScrollbarIndicator'] = bar;
				}
				if (dir == 'h') {
					that.hScrollbarSize = that.hScrollbarWrapper.clientWidth;
					that.hScrollbarIndicatorSize = m.max(m.round(that.hScrollbarSize * that.hScrollbarSize / that.scrollerW), 8);
					that.hScrollbarIndicator.style.width = that.hScrollbarIndicatorSize + 'px';
					that.hScrollbarMaxScroll = that.hScrollbarSize - that.hScrollbarIndicatorSize;
					that.hScrollbarProp = that.hScrollbarMaxScroll / that.maxScrollX;
				} else {
					that.vScrollbarSize = that.vScrollbarWrapper.clientHeight;
					that.vScrollbarIndicatorSize = m.max(m.round(that.vScrollbarSize * that.vScrollbarSize / that.scrollerH), 8);
					that.vScrollbarIndicator.style.height = that.vScrollbarIndicatorSize + 'px';
					that.vScrollbarMaxScroll = that.vScrollbarSize - that.vScrollbarIndicatorSize;
					that.vScrollbarProp = that.vScrollbarMaxScroll / that.maxScrollY;
				}
				// Reset position
				that._scrollbarPos(dir, true);
			},
			_resize: function() {
				var that = this;
				setTimeout(function() {
					that.refresh();
				}, isAndroid ? 200 : 0);
			},
			_pos: function(x, y) {
				x = this.hScroll ? x : 0;
				y = this.vScroll ? y : 0;
				if (this.options.roundPosition || !this.options.useTransform) {
					x = m.round(x);
					y = m.round(y);
				}
				if (this.options.useTransform) {
					this.scroller.style[vendor + 'Transform'] = trnOpen + x + 'px,' + y + 'px' + trnClose + ' scale(' + this.scale + ')';
				} else {
					this.scroller.style.left = x + 'px';
					this.scroller.style.top = y + 'px';
				}
				this.x = x;
				this.y = y;
				this._scrollbarPos('h');
				this._scrollbarPos('v');
			},
			_scrollbarPos: function(dir, hidden) {
				var that = this,
					pos = dir == 'h' ? that.x : that.y,
					size;
				if (!that[dir + 'Scrollbar']) return;
				pos = that[dir + 'ScrollbarProp'] * pos;
				if (pos < 0) {
					if (!that.options.fixedScrollbar) {
						size = that[dir + 'ScrollbarIndicatorSize'] + m.round(pos * 3);
						if (size < 8) size = 8;
						that[dir + 'ScrollbarIndicator'].style[dir == 'h' ? 'width' : 'height'] = size + 'px';
					}
					pos = 0;
				} else if (pos > that[dir + 'ScrollbarMaxScroll']) {
					if (!that.options.fixedScrollbar) {
						size = that[dir + 'ScrollbarIndicatorSize'] - m.round((pos - that[dir + 'ScrollbarMaxScroll']) * 3);
						if (size < 8) size = 8;
						that[dir + 'ScrollbarIndicator'].style[dir == 'h' ? 'width' : 'height'] = size + 'px';
						pos = that[dir + 'ScrollbarMaxScroll'] + (that[dir + 'ScrollbarIndicatorSize'] - size);
					} else {
						pos = that[dir + 'ScrollbarMaxScroll'];
					}
				}
				that[dir + 'ScrollbarWrapper'].style[vendor + 'TransitionDelay'] = '0';
				that[dir + 'ScrollbarWrapper'].style.opacity = hidden && that.options.hideScrollbar ? '0' : '1';
				that[dir + 'ScrollbarIndicator'].style[vendor + 'Transform'] = trnOpen + (dir == 'h' ? pos + 'px,0' : '0,' + pos + 'px') + trnClose;
			},
			_start: function(e) {
				var that = this,
					point = hasTouch ? e.touches[0] : e,
					matrix, x, y,
					c1, c2;
				if (!that.enabled) return;
				if (that.options.onBeforeScrollStart) that.options.onBeforeScrollStart.call(that, e);
				if (that.options.useTransition || that.options.zoom) that._transitionTime(0);
				that.moved = false;
				that.animating = false;
				that.zoomed = false;
				that.distX = 0;
				that.distY = 0;
				that.absDistX = 0;
				that.absDistY = 0;
				that.dirX = 0;
				that.dirY = 0;
				// Gesture start
				if (that.options.zoom && hasTouch && e.touches.length > 1) {
					c1 = m.abs(e.touches[0].pageX - e.touches[1].pageX);
					c2 = m.abs(e.touches[0].pageY - e.touches[1].pageY);
					that.touchesDistStart = m.sqrt(c1 * c1 + c2 * c2);
					that.originX = m.abs(e.touches[0].pageX + e.touches[1].pageX - that.wrapperOffsetLeft * 2) / 2 - that.x;
					that.originY = m.abs(e.touches[0].pageY + e.touches[1].pageY - that.wrapperOffsetTop * 2) / 2 - that.y;
					if (that.options.onZoomStart) that.options.onZoomStart.call(that, e);
				}
				if (that.options.momentum) {
					if (that.options.useTransform) {
						// Very lame general purpose alternative to CSSMatrix
						matrix = getComputedStyle(that.scroller, null)[vendor + 'Transform'].replace(/[^0-9-.,]/g, '').split(',');
						x = matrix[4] * 1;
						y = matrix[5] * 1;
					} else {
						x = getComputedStyle(that.scroller, null).left.replace(/[^0-9-]/g, '') * 1;
						y = getComputedStyle(that.scroller, null).top.replace(/[^0-9-]/g, '') * 1;
					}
					if (x != that.x || y != that.y) {
						if (that.options.useTransition) that._unbind('webkitTransitionEnd');
						else cancelFrame(that.aniTime);
						that.steps = [];
						that._pos(x, y);
					}
				}
				that.absStartX = that.x; // Needed by snap threshold
				that.absStartY = that.y;
				that.startX = that.x;
				that.startY = that.y;
				that.pointX = point.pageX;
				that.pointY = point.pageY;
				that.startTime = e.timeStamp || (new Date()).getTime();
				if (that.options.onScrollStart) that.options.onScrollStart.call(that, e);
				that._bind(MOVE_EV);
				that._bind(END_EV);
				that._bind(CANCEL_EV);
			},
			_move: function(e) {
				var that = this,
					point = hasTouch ? e.touches[0] : e,
					deltaX = point.pageX - that.pointX,
					deltaY = point.pageY - that.pointY,
					newX = that.x + deltaX,
					newY = that.y + deltaY,
					c1, c2, scale,
					timestamp = e.timeStamp || (new Date()).getTime();
				if (that.options.onBeforeScrollMove) that.options.onBeforeScrollMove.call(that, e);
				// Zoom
				if (that.options.zoom && hasTouch && e.touches.length > 1) {
					c1 = m.abs(e.touches[0].pageX - e.touches[1].pageX);
					c2 = m.abs(e.touches[0].pageY - e.touches[1].pageY);
					that.touchesDist = m.sqrt(c1 * c1 + c2 * c2);
					that.zoomed = true;
					scale = 1 / that.touchesDistStart * that.touchesDist * this.scale;
					if (scale < that.options.zoomMin) scale = 0.5 * that.options.zoomMin * Math.pow(2.0, scale / that.options.zoomMin);
					else if (scale > that.options.zoomMax) scale = 2.0 * that.options.zoomMax * Math.pow(0.5, that.options.zoomMax / scale);
					that.lastScale = scale / this.scale;
					newX = this.originX - this.originX * that.lastScale + this.x,
					newY = this.originY - this.originY * that.lastScale + this.y;
					this.scroller.style[vendor + 'Transform'] = trnOpen + newX + 'px,' + newY + 'px' + trnClose + ' scale(' + scale + ')';
					if (that.options.onZoom) that.options.onZoom.call(that, e);
					return;
				}
				that.pointX = point.pageX;
				that.pointY = point.pageY;
				// Slow down if outside of the boundaries
				if (newX > 0 || newX < that.maxScrollX) {
					newX = that.options.bounce ? that.x + (deltaX / 2) : newX >= 0 || that.maxScrollX >= 0 ? 0 : that.maxScrollX;
				}
				if (newY > that.minScrollY || newY < that.maxScrollY) {
					newY = that.options.bounce ? that.y + (deltaY / 2) : newY >= that.minScrollY || that.maxScrollY >= 0 ? that.minScrollY : that.maxScrollY;
				}
				if (that.absDistX < 6 && that.absDistY < 6) {
					that.distX += deltaX;
					that.distY += deltaY;
					that.absDistX = m.abs(that.distX);
					that.absDistY = m.abs(that.distY);
					return;
				}
				// Lock direction
				if (that.options.lockDirection) {
					if (that.absDistX > that.absDistY + 5) {
						newY = that.y;
						deltaY = 0;
					} else if (that.absDistY > that.absDistX + 5) {
						newX = that.x;
						deltaX = 0;
					}
				}
				that.moved = true;
				that._pos(newX, newY);
				that.dirX = deltaX > 0 ? -1 : deltaX < 0 ? 1 : 0;
				that.dirY = deltaY > 0 ? -1 : deltaY < 0 ? 1 : 0;
				if (timestamp - that.startTime > 300) {
					that.startTime = timestamp;
					that.startX = that.x;
					that.startY = that.y;
				}
				if (that.options.onScrollMove) that.options.onScrollMove.call(that, e);
			},
			_end: function(e) {
				if (hasTouch && e.touches.length != 0) return;
				var that = this,
					point = hasTouch ? e.changedTouches[0] : e,
					target, ev,
					momentumX = {
						dist: 0,
						time: 0
					},
					momentumY = {
						dist: 0,
						time: 0
					},
					duration = (e.timeStamp || (new Date()).getTime()) - that.startTime,
					newPosX = that.x,
					newPosY = that.y,
					distX, distY,
					newDuration,
					snap,
					scale;
				that._unbind(MOVE_EV);
				that._unbind(END_EV);
				that._unbind(CANCEL_EV);
				if (that.options.onBeforeScrollEnd) that.options.onBeforeScrollEnd.call(that, e);
				if (that.zoomed) {
					scale = that.scale * that.lastScale;
					scale = Math.max(that.options.zoomMin, scale);
					scale = Math.min(that.options.zoomMax, scale);
					that.lastScale = scale / that.scale;
					that.scale = scale;
					that.x = that.originX - that.originX * that.lastScale + that.x;
					that.y = that.originY - that.originY * that.lastScale + that.y;
					that.scroller.style[vendor + 'TransitionDuration'] = '200ms';
					that.scroller.style[vendor + 'Transform'] = trnOpen + that.x + 'px,' + that.y + 'px' + trnClose + ' scale(' + that.scale + ')';
					that.zoomed = false;
					that.refresh();
					if (that.options.onZoomEnd) that.options.onZoomEnd.call(that, e);
					return;
				}
				if (!that.moved) {
					if (hasTouch) {
						if (that.doubleTapTimer && that.options.zoom) {
							// Double tapped
							clearTimeout(that.doubleTapTimer);
							that.doubleTapTimer = null;
							if (that.options.onZoomStart) that.options.onZoomStart.call(that, e);
							that.zoom(that.pointX, that.pointY, that.scale == 1 ? that.options.doubleTapZoom : 1);
							if (that.options.onZoomEnd) {
								setTimeout(function() {
									that.options.onZoomEnd.call(that, e);
								}, 200); // 200 is default zoom duration
							}
						} else {
							that.doubleTapTimer = setTimeout(function() {
								that.doubleTapTimer = null;
								// Find the last touched element
								target = point.target;
								while (target.nodeType != 1) target = target.parentNode;
								if (target.tagName != 'SELECT' && target.tagName != 'INPUT' && target.tagName != 'TEXTAREA') {
									ev = document.createEvent('MouseEvents');
									ev.initMouseEvent('click', true, true, e.view, 1,
										point.screenX, point.screenY, point.clientX, point.clientY,
										e.ctrlKey, e.altKey, e.shiftKey, e.metaKey,
										0, null);
									ev._fake = true;
									target.dispatchEvent(ev);
								}
							}, that.options.zoom ? 250 : 0);
						}
					}
					that._resetPos(200);
					if (that.options.onTouchEnd) that.options.onTouchEnd.call(that, e);
					return;
				}
				if (duration < 300 && that.options.momentum) {
					momentumX = newPosX ? that._momentum(newPosX - that.startX, duration, -that.x, that.scrollerW - that.wrapperW + that.x, that.options.bounce ? that.wrapperW : 0) : momentumX;
					momentumY = newPosY ? that._momentum(newPosY - that.startY, duration, -that.y, (that.maxScrollY < 0 ? that.scrollerH - that.wrapperH + that.y - that.minScrollY : 0), that.options.bounce ? that.wrapperH : 0) : momentumY;
					newPosX = that.x + momentumX.dist;
					newPosY = that.y + momentumY.dist;
					if ((that.x > 0 && newPosX > 0) || (that.x < that.maxScrollX && newPosX < that.maxScrollX)) momentumX = {
						dist: 0,
						time: 0
					};
					if ((that.y > that.minScrollY && newPosY > that.minScrollY) || (that.y < that.maxScrollY && newPosY < that.maxScrollY)) momentumY = {
						dist: 0,
						time: 0
					};
				}
				if (momentumX.dist || momentumY.dist) {
					newDuration = m.max(m.max(momentumX.time, momentumY.time), 10);
					// Do we need to snap?
					if (that.options.snap) {
						distX = newPosX - that.absStartX;
						distY = newPosY - that.absStartY;
						if (m.abs(distX) < that.options.snapThreshold && m.abs(distY) < that.options.snapThreshold) {
							that.scrollTo(that.absStartX, that.absStartY, 200);
						} else {
							snap = that._snap(newPosX, newPosY);
							newPosX = snap.x;
							newPosY = snap.y;
							newDuration = m.max(snap.time, newDuration);
						}
					}
					that.scrollTo(newPosX, newPosY, newDuration);
					if (that.options.onTouchEnd) that.options.onTouchEnd.call(that, e);
					return;
				}
				// Do we need to snap?
				if (that.options.snap) {
					distX = newPosX - that.absStartX;
					distY = newPosY - that.absStartY;
					if (m.abs(distX) < that.options.snapThreshold && m.abs(distY) < that.options.snapThreshold) that.scrollTo(that.absStartX, that.absStartY, 200);
					else {
						snap = that._snap(that.x, that.y);
						if (snap.x != that.x || snap.y != that.y) that.scrollTo(snap.x, snap.y, snap.time);
					}
					if (that.options.onTouchEnd) that.options.onTouchEnd.call(that, e);
					return;
				}
				that._resetPos(200);
				if (that.options.onTouchEnd) that.options.onTouchEnd.call(that, e);
			},
			_resetPos: function(time) {
				var that = this,
					resetX = that.x >= 0 ? 0 : that.x < that.maxScrollX ? that.maxScrollX : that.x,
					resetY = that.y >= that.minScrollY || that.maxScrollY > 0 ? that.minScrollY : that.y < that.maxScrollY ? that.maxScrollY : that.y;
				if (resetX == that.x && resetY == that.y) {
					if (that.moved) {
						that.moved = false;
						if (that.options.onScrollEnd) that.options.onScrollEnd.call(that); // Execute custom code on scroll end
					}
					if (that.hScrollbar && that.options.hideScrollbar) {
						if (vendor == 'webkit') that.hScrollbarWrapper.style[vendor + 'TransitionDelay'] = '300ms';
						that.hScrollbarWrapper.style.opacity = '0';
					}
					if (that.vScrollbar && that.options.hideScrollbar) {
						if (vendor == 'webkit') that.vScrollbarWrapper.style[vendor + 'TransitionDelay'] = '300ms';
						that.vScrollbarWrapper.style.opacity = '0';
					}
					return;
				}
				that.scrollTo(resetX, resetY, time || 0);
			},
			_wheel: function(e) {
				var that = this,
					wheelDeltaX, wheelDeltaY,
					deltaX, deltaY,
					deltaScale;
				if ('wheelDeltaX' in e) {
					wheelDeltaX = e.wheelDeltaX / 12;
					wheelDeltaY = e.wheelDeltaY / 12;
				} else if ('detail' in e) {
					wheelDeltaX = wheelDeltaY = -e.detail * 3;
				} else {
					wheelDeltaX = wheelDeltaY = -e.wheelDelta;
				}
				if (that.options.wheelAction == 'zoom') {
					deltaScale = that.scale * Math.pow(2, 1 / 3 * (wheelDeltaY ? wheelDeltaY / Math.abs(wheelDeltaY) : 0));
					if (deltaScale < that.options.zoomMin) deltaScale = that.options.zoomMin;
					if (deltaScale > that.options.zoomMax) deltaScale = that.options.zoomMax;
					if (deltaScale != that.scale) {
						if (!that.wheelZoomCount && that.options.onZoomStart) that.options.onZoomStart.call(that, e);
						that.wheelZoomCount++;
						that.zoom(e.pageX, e.pageY, deltaScale, 400);
						setTimeout(function() {
							that.wheelZoomCount--;
							if (!that.wheelZoomCount && that.options.onZoomEnd) that.options.onZoomEnd.call(that, e);
						}, 400);
					}
					return;
				}
				deltaX = that.x + wheelDeltaX;
				deltaY = that.y + wheelDeltaY;
				if (deltaX > 0) deltaX = 0;
				else if (deltaX < that.maxScrollX) deltaX = that.maxScrollX;
				if (deltaY > that.minScrollY) deltaY = that.minScrollY;
				else if (deltaY < that.maxScrollY) deltaY = that.maxScrollY;
				that.scrollTo(deltaX, deltaY, 0);
			},
			_mouseout: function(e) {
				var t = e.relatedTarget;
				if (!t) {
					this._end(e);
					return;
				}
				while (t = t.parentNode)
					if (t == this.wrapper) return;
				this._end(e);
			},
			_transitionEnd: function(e) {
				var that = this;
				if (e.target != that.scroller) return;
				that._unbind('webkitTransitionEnd');
				that._startAni();
			},
			/**
			 *
			 * Utilities
			 *
			 */
			_startAni: function() {
				var that = this,
					startX = that.x,
					startY = that.y,
					startTime = (new Date).getTime(),
					step, easeOut;
				if (that.animating) return;
				if (!that.steps.length) {
					that._resetPos(400);
					return;
				}
				step = that.steps.shift();
				if (step.x == startX && step.y == startY) step.time = 0;
				that.animating = true;
				that.moved = true;
				if (that.options.useTransition) {
					that._transitionTime(step.time);
					that._pos(step.x, step.y);
					that.animating = false;
					if (step.time) that._bind('webkitTransitionEnd');
					else that._resetPos(0);
					return;
				}
				(function animate() {
					var now = (new Date).getTime(),
						newX, newY;
					if (now >= startTime + step.time) {
						that._pos(step.x, step.y);
						that.animating = false;
						if (that.options.onAnimationEnd) that.options.onAnimationEnd.call(that); // Execute custom code on animation end
						that._startAni();
						return;
					}
					now = (now - startTime) / step.time - 1;
					easeOut = m.sqrt(1 - now * now);
					newX = (step.x - startX) * easeOut + startX;
					newY = (step.y - startY) * easeOut + startY;
					that._pos(newX, newY);
					if (that.animating) that.aniTime = nextFrame(animate);
				})();
			},
			_transitionTime: function(time) {
				time += 'ms';
				this.scroller.style[vendor + 'TransitionDuration'] = time;
				if (this.hScrollbar) this.hScrollbarIndicator.style[vendor + 'TransitionDuration'] = time;
				if (this.vScrollbar) this.vScrollbarIndicator.style[vendor + 'TransitionDuration'] = time;
			},
			_momentum: function(dist, time, maxDistUpper, maxDistLower, size) {
				var deceleration = 0.0006,
					speed = m.abs(dist) / time,
					newDist = (speed * speed) / (2 * deceleration),
					newTime = 0,
					outsideDist = 0;
				// Proportinally reduce speed if we are outside of the boundaries
				if (dist > 0 && newDist > maxDistUpper) {
					outsideDist = size / (6 / (newDist / speed * deceleration));
					maxDistUpper = maxDistUpper + outsideDist;
					speed = speed * maxDistUpper / newDist;
					newDist = maxDistUpper;
				} else if (dist < 0 && newDist > maxDistLower) {
					outsideDist = size / (6 / (newDist / speed * deceleration));
					maxDistLower = maxDistLower + outsideDist;
					speed = speed * maxDistLower / newDist;
					newDist = maxDistLower;
				}
				newDist = newDist * (dist < 0 ? -1 : 1);
				newTime = speed / deceleration;
				return {
					dist: newDist,
					time: m.round(newTime)
				};
			},
			_offset: function(el) {
				var left = -el.offsetLeft,
					top = -el.offsetTop;
				while (el = el.offsetParent) {
					left -= el.offsetLeft;
					top -= el.offsetTop;
				}
				if (el != this.wrapper) {
					left *= this.scale;
					top *= this.scale;
				}
				return {
					left: left,
					top: top
				};
			},
			_snap: function(x, y) {
				var that = this,
					i, l,
					page, time,
					sizeX, sizeY;
				// Check page X
				page = that.pagesX.length - 1;
				for (i = 0, l = that.pagesX.length; i < l; i++) {
					if (x >= that.pagesX[i]) {
						page = i;
						break;
					}
				}
				if (page == that.currPageX && page > 0 && that.dirX < 0) page--;
				x = that.pagesX[page];
				sizeX = m.abs(x - that.pagesX[that.currPageX]);
				sizeX = sizeX ? m.abs(that.x - x) / sizeX * 500 : 0;
				that.currPageX = page;
				// Check page Y
				page = that.pagesY.length - 1;
				for (i = 0; i < page; i++) {
					if (y >= that.pagesY[i]) {
						page = i;
						break;
					}
				}
				if (page == that.currPageY && page > 0 && that.dirY < 0) page--;
				y = that.pagesY[page];
				sizeY = m.abs(y - that.pagesY[that.currPageY]);
				sizeY = sizeY ? m.abs(that.y - y) / sizeY * 500 : 0;
				that.currPageY = page;
				// Snap with constant speed (proportional duration)
				time = m.round(m.max(sizeX, sizeY)) || 200;
				return {
					x: x,
					y: y,
					time: time
				};
			},
			_bind: function(type, el, bubble) {
				(el || this.scroller).addEventListener(type, this, !! bubble);
			},
			_unbind: function(type, el, bubble) {
				(el || this.scroller).removeEventListener(type, this, !! bubble);
			},
			/**
			 *
			 * Public methods
			 *
			 */
			destroy: function() {
				var that = this;
				that.scroller.style[vendor + 'Transform'] = '';
				// Remove the scrollbars
				that.hScrollbar = false;
				that.vScrollbar = false;
				that._scrollbar('h');
				that._scrollbar('v');
				// Remove the event listeners
				that._unbind(RESIZE_EV, window);
				that._unbind(START_EV);
				that._unbind(MOVE_EV);
				that._unbind(END_EV);
				that._unbind(CANCEL_EV);
				if (that.options.hasTouch) {
					that._unbind('mouseout', that.wrapper);
					that._unbind(WHEEL_EV);
				}
				if (that.options.useTransition) that._unbind('webkitTransitionEnd');
				if (that.options.checkDOMChanges) clearInterval(that.checkDOMTime);
				if (that.options.onDestroy) that.options.onDestroy.call(that);
			},
			refresh: function() {
				var that = this,
					offset,
					i, l,
					els,
					pos = 0,
					page = 0;
				if (that.scale < that.options.zoomMin) that.scale = that.options.zoomMin;
				that.wrapperW = that.wrapper.clientWidth || 1;
				that.wrapperH = that.wrapper.clientHeight || 1;
				that.minScrollY = -that.options.topOffset || 0;
				that.scrollerW = m.round(that.scroller.offsetWidth * that.scale);
				that.scrollerH = m.round((that.scroller.offsetHeight + that.minScrollY) * that.scale);
				that.maxScrollX = that.wrapperW - that.scrollerW;
				that.maxScrollY = that.wrapperH - that.scrollerH + that.minScrollY;
				that.dirX = 0;
				that.dirY = 0;
				if (that.options.onRefresh) that.options.onRefresh.call(that);
				that.hScroll = that.options.hScroll && that.maxScrollX < 0;
				that.vScroll = that.options.vScroll && (!that.options.bounceLock && !that.hScroll || that.scrollerH > that.wrapperH);
				that.hScrollbar = that.hScroll && that.options.hScrollbar;
				that.vScrollbar = that.vScroll && that.options.vScrollbar && that.scrollerH > that.wrapperH;
				offset = that._offset(that.wrapper);
				that.wrapperOffsetLeft = -offset.left;
				that.wrapperOffsetTop = -offset.top;
				// Prepare snap
				if (typeof that.options.snap == 'string') {
					that.pagesX = [];
					that.pagesY = [];
					els = that.scroller.querySelectorAll(that.options.snap);
					for (i = 0, l = els.length; i < l; i++) {
						pos = that._offset(els[i]);
						pos.left += that.wrapperOffsetLeft;
						pos.top += that.wrapperOffsetTop;
						that.pagesX[i] = pos.left < that.maxScrollX ? that.maxScrollX : pos.left * that.scale;
						that.pagesY[i] = pos.top < that.maxScrollY ? that.maxScrollY : pos.top * that.scale;
					}
				} else if (that.options.snap) {
					that.pagesX = [];
					while (pos >= that.maxScrollX) {
						that.pagesX[page] = pos;
						pos = pos - that.wrapperW;
						page++;
					}
					if (that.maxScrollX % that.wrapperW) that.pagesX[that.pagesX.length] = that.maxScrollX - that.pagesX[that.pagesX.length - 1] + that.pagesX[that.pagesX.length - 1];
					pos = 0;
					page = 0;
					that.pagesY = [];
					while (pos >= that.maxScrollY) {
						that.pagesY[page] = pos;
						pos = pos - that.wrapperH;
						page++;
					}
					if (that.maxScrollY % that.wrapperH) that.pagesY[that.pagesY.length] = that.maxScrollY - that.pagesY[that.pagesY.length - 1] + that.pagesY[that.pagesY.length - 1];
				}
				// Prepare the scrollbars
				that._scrollbar('h');
				that._scrollbar('v');
				if (!that.zoomed) {
					that.scroller.style[vendor + 'TransitionDuration'] = '0';
					that._resetPos(200);
				}
			},
			scrollTo: function(x, y, time, relative) {
				var that = this,
					step = x,
					i, l;
				that.stop();
				if (!step.length) step = [{
					x: x,
					y: y,
					time: time,
					relative: relative
				}];
				for (i = 0, l = step.length; i < l; i++) {
					if (step[i].relative) {
						step[i].x = that.x - step[i].x;
						step[i].y = that.y - step[i].y;
					}
					that.steps.push({
						x: step[i].x,
						y: step[i].y,
						time: step[i].time || 0
					});
				}
				that._startAni();
			},
			scrollToElement: function(el, time) {
				var that = this,
					pos;
				el = el.nodeType ? el : that.scroller.querySelector(el);
				if (!el) return;
				pos = that._offset(el);
				pos.left += that.wrapperOffsetLeft;
				pos.top += that.wrapperOffsetTop;
				pos.left = pos.left > 0 ? 0 : pos.left < that.maxScrollX ? that.maxScrollX : pos.left;
				pos.top = pos.top > that.minScrollY ? that.minScrollY : pos.top < that.maxScrollY ? that.maxScrollY : pos.top;
				time = time === undefined ? m.max(m.abs(pos.left) * 2, m.abs(pos.top) * 2) : time;
				that.scrollTo(pos.left, pos.top, time);
			},
			scrollToPage: function(pageX, pageY, time) {
				var that = this,
					x, y;
				if (that.options.snap) {
					pageX = pageX == 'next' ? that.currPageX + 1 : pageX == 'prev' ? that.currPageX - 1 : pageX;
					pageY = pageY == 'next' ? that.currPageY + 1 : pageY == 'prev' ? that.currPageY - 1 : pageY;
					pageX = pageX < 0 ? 0 : pageX > that.pagesX.length - 1 ? that.pagesX.length - 1 : pageX;
					pageY = pageY < 0 ? 0 : pageY > that.pagesY.length - 1 ? that.pagesY.length - 1 : pageY;
					that.currPageX = pageX;
					that.currPageY = pageY;
					x = that.pagesX[pageX];
					y = that.pagesY[pageY];
				} else {
					x = -that.wrapperW * pageX;
					y = -that.wrapperH * pageY;
					if (x < that.maxScrollX) x = that.maxScrollX;
					if (y < that.maxScrollY) y = that.maxScrollY;
				}
				that.scrollTo(x, y, time || 400);
			},
			disable: function() {
				this.stop();
				this._resetPos(0);
				this.enabled = false;
				// If disabled after touchstart we make sure that there are no left over events
				this._unbind(MOVE_EV);
				this._unbind(END_EV);
				this._unbind(CANCEL_EV);
			},
			enable: function() {
				this.enabled = true;
			},
			stop: function() {
				if (this.options.useTransition) this._unbind('webkitTransitionEnd');
				else cancelFrame(this.aniTime);
				this.steps = [];
				this.moved = false;
				this.animating = false;
			},
			zoom: function(x, y, scale, time) {
				var that = this,
					relScale = scale / that.scale;
				if (!that.options.useTransform) return;
				that.zoomed = true;
				time = time === undefined ? 200 : time;
				x = x - that.wrapperOffsetLeft - that.x;
				y = y - that.wrapperOffsetTop - that.y;
				that.x = x - x * relScale + that.x;
				that.y = y - y * relScale + that.y;
				that.scale = scale;
				that.refresh();
				that.x = that.x > 0 ? 0 : that.x < that.maxScrollX ? that.maxScrollX : that.x;
				that.y = that.y > that.minScrollY ? that.minScrollY : that.y < that.maxScrollY ? that.maxScrollY : that.y;
				that.scroller.style[vendor + 'TransitionDuration'] = time + 'ms';
				that.scroller.style[vendor + 'Transform'] = trnOpen + that.x + 'px,' + that.y + 'px' + trnClose + ' scale(' + scale + ')';
				that.zoomed = false;
			},
			isReady: function() {
				return !this.moved && !this.zoomed && !this.animating;
			}
		};
		return iScroll;
	}());

	/**
	 * 推荐组件
	 * @version 0.1
	 * @author  hwang
	 * @time    2014-3-3
	 */

	PAD.Comm.recommends = (function() {
		var args, count = 0,
			showNum = 3;
		var init = function() {
			args = [].slice.call(arguments),
			url = args.pop();
			getData(url, args);
		};
		var getData = function(url) {
			PAD.Util.ajax.execute(url, resolveArgs);
		}
		var buildModul = function(comm_id, comm_data, comm_from, comm_showNum) {
			var posNum = comm_data.length;
			showNum = comm_showNum || showNum; !! comm_data && J.g(comm_id + "_con").html(buildComp(comm_data, comm_from)); !! posNum && J.g(comm_id + "_posPic").html(buildPos(posNum / showNum)); !! J.g(comm_id + "_rolling") && initSwipe(comm_id);
		}
		var buildComp = function(comm_data, comm_from) {
			var compHtml = [],
				data = comm_data,
				from = comm_from,
				count = 1,
				result;
			data.forEach(function(item, index) {
				compHtml.push(buildHtml(item, from, index, count));
				count == showNum ? count = 1 : count++;
			});
			return result = compHtml.join(""), result;
		}
		var buildHtml = function(content, from, index, count) {
			//changeImageDomain记得处理掉
			var warp = [];
			count == 1 && warp.push('<div class="liWarp">');
			warp.push('<li>');
			warp.push('<a href="' + content.LINK + '?from=' + from + '&position=' + (index + 1) + content.SOJ + '">');
			warp.push('<img src="' + PAD.Util.changeImageDomain(content.IMAGESRC, ".ajkimg.") + '" width="150" height="115" alt="' + content.TITLE + '"/>');
			warp.push('</a>');
			warp.push('<a href="' + content.LINK + '?from=' + from + '&position=' + (index + 1) + content.SOJ + '">' + content.TITLE + '...</a>');
			warp.push('<div class="v_c_desc">' + content.ROOMNUM + '室' + content.HALLNUM + '厅' + '</div>');
			warp.push('<div class="v_c_desc">' + parseInt(content.AREANUM) + '平米' + '</div>');
			warp.push('<div class="v_c_p"><em>' + parseInt(content.PROPRICE) + '</em>万</div>');
			warp.push('</li>');
			count == showNum && warp.push("</div>");
			return warp.join("");
		}
		var buildPos = function(num) {
			var posHtml = [],
				i;
			for (i = 0; i < num; i++) {
				i == 0 ? posHtml.push('<em class="on">•</em>') : posHtml.push('<em>•</em>');
			}
			return posHtml.join("");
		}
		var initSwipe = function(comm_id) {
			var ele = J.g(comm_id + "_rolling").get();
			var sider = P.Swipe(ele, {
				continuous: false,
				disableScroll: true,
				callback: function(index) {
					cotrolBullets(index, comm_id);
					cotrolArrow(index, comm_id);
				}
			});
			bindArrow(comm_id, sider);
		}
		var cotrolBullets = function(index, comm_id) {
			var bullets = J.g(comm_id + "_posPic");
			bullets.s("em").each(function(index, ele) {
				ele.removeClass("on");
			});
			bullets.s("em").eq(index).addClass("on");
			P.trackEvent(J.g(comm_id + "_rolling").attr('data-event') + "PageTurn" + index);
		}
		var cotrolArrow = function(index, comm_id) {
			var len = J.g(comm_id + "_con").s(".liWarp").length;
			switch (index) {
				case 0:
					J.g(comm_id + "_arrowL").hide()
					break;
				case len - 1:
					J.g(comm_id + "_arrowR").hide();
					J.g(comm_id + "_arrowL").show()
					break;
				default:
					J.g(comm_id + "_arrowL").show();
					J.g(comm_id + "_arrowR").show();
			}
		}
		var bindArrow = function(comm_id, sider) {
			J.g(comm_id + "_arrowL").on("click", function() {
				sider.prev();
				P.trackEvent(J.g(comm_id + "_rolling").attr('data-event') + "L");
			});
			J.g(comm_id + "_arrowR").on("click", function() {
				sider.next();
				P.trackEvent(J.g(comm_id + "_rolling").attr('data-event') + "R");
			});
			J.g(comm_id + "_arrowR").show();
		}
		var checkArgs = function() {
			var args = [].slice.call(arguments),
				flag = true;
			args.forEach(function(comm) {
				!J.g(comm[0]) && (flag = false);
			});
			return flag;
		}
		var resolveArgs = function(data) {
			if (!data) {
				args.forEach(function(comm) {
					hideComm(comm[0]);
				});
				return;
			}
			if (typeof data === "string") {
				data = eval("(" + data + ")");
			}
			if (data.status == "ok") { !! args[0] && args.forEach(function(comm) {
					buildModul(comm[0], data[comm[1]], comm[2]);
				});
			} else {
				args.forEach(function(comm) {
					hideComm(comm[0]);
				});
				return;
			}
		};
		var hideComm = function(comm_id) {
			J.g(comm_id).hide();
		}
		return {
			init: init
		}
	}());

	/**
	 * 查看大图
	 * @version 2.0
	 * @author  hwang
	 * @time    2014-3-9
	 */

	PAD.Comm.viewBigPic = (function() {
		var defaultOpts = {
			target: J.D.body,
			continuous: false,
			autoplay: false,
			catogry: false,
			thum: false,
			arrow: true,
			pageNum: true,
			closebtn: true
		};
		var initComp = function() {
			var args = [].slice.call(arguments),
				config = args.pop(),
				els = (args[0] && typeof args[0] === "string") ? args : args[0],
				opts = J.mix(defaultOpts, config),
				ck = els.every(function(el) {
					return !!J.g(el);
				});
			if (!ck || !opts.data) {
				return;
			}
			initMask(opts);
		}
		var initMask = function(opts) {
			var maskEl = J.create("div", {
				"class": "p_mask"
			});
			var maskHtml = '<div class="p_mode">' +
				'<div class="p_mode_rolling" id="p_mode_rolling">' +
				'<div class="p_mode_picBox ht525">' +
				buildPicBox(opts.data) +
				'</div>' +
				'</div>' +
				(opts.closebtn ? '<div class="p_mode_close">╳</div>' : "") +
				(opts.arrow ? '<div class="p_mode_left"></div><div class="p_mode_right"></div>' : "") +
				(opts.pageNum ? '<div class="p_mode_control"><span class="p_mode_pCur"></span><span class="p_mode_slash">/</span><span class="p_mode_pNum"></span></div>' : "") +
				'</div>';
			maskEl.html(maskHtml).appendTo(J.g(opts.target));
		}
		var buildPicBox = function(imgs) {
			var picBoxHtml = "";
			imgs.forEach(function(imgSrc) {
				picBoxHtml += buildPic(imgSrc);
			});
			return picBoxHtml;
		}
		var buildPic = function(imgSrc) {
			return '<div class="p_mode_picShow ht525">' + '<span>' + '<img src="' + imgSrc + '" />' + '<span>' + '</div>';
		}
		return {
			init: initComp
		}
	}());