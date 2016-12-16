

  $(document).ready(function() {
    $('select').material_select();
   const END = 'change';
const START = 'ontouchstart' in document ? 'touchstart' : 'mousedown';
const INPUT = 'input';
const MAX_ROTATION = 35;
const SOFTEN_FACTOR = 3;

class RangeInput {
	
	constructor(el) {
		this.el = el;

		this._handleEnd = this._handleEnd.bind(this);
		this._handleStart = this._handleStart.bind(this);
		this._handleInput = this._handleInput.bind(this);

		//Call the plugin
		$(this.el.querySelector('input[type=range]')).rangeslider({
			polyfill: false, //Never use the native polyfill
			rangeClass: 'rangeslider',
		    disabledClass: 'rangeslider-disabled',
		    horizontalClass: 'rangeslider-horizontal',
		    verticalClass: 'rangeslider-vertical',
		    fillClass: 'rangeslider-fill-lower',
		    handleClass: 'rangeslider-thumb',
		    onInit: function() {
		    	//No args are passed, so we can't change context of this
		    	const pluginInstance = this;

		    	//Move the range-output inside the handle so we can do all the stuff in css
		    	$(pluginInstance.$element)
		    		.parents('.range')
		    		.find('.range-output')
		    		.appendTo(pluginInstance.$handle);
		    }
		});

		this.sliderThumbEl = el.querySelector('.rangeslider-thumb');
		this.outputEl = el.querySelector('.range-output');
		this.inputEl = el.querySelector('input[type=range]');
		this._lastOffsetLeft = 0;
		this._lastTimeStamp = 0;

		this.el.querySelector('.rangeslider').addEventListener(START, this._handleStart);
	}

	_handleStart (e) {
		this._lastTimeStamp = new Date().getTime();
		this._lastOffsetLeft = this.sliderThumbEl.offsetLeft;

		//Wrap in raf because offsetLeft is updated by the plugin after this fires
		requestAnimationFrame(_ => {
			//Bind through jquery because plugin doesn't fire native event
			$(this.inputEl).on(INPUT, this._handleInput);
			$(this.inputEl).on(END, this._handleEnd);
		});
	}

	_handleEnd (e) {
		//Unbind through jquery because plugin doesn't fire native event
		$(this.inputEl).off(INPUT, this._handleInput);
		$(this.inputEl).off(END, this._handleEnd);

		requestAnimationFrame(_ => this.outputEl.style.transform = 'rotate(0deg)')
	}

	_handleInput (e) {
		let now = new Date().getTime();
		let timeElapsed = now - this._lastTimeStamp || 1;
		let distance = this.sliderThumbEl.offsetLeft - this._lastOffsetLeft;
		let direction = distance < 0 ? -1 : 1;
		let velocity = Math.abs(distance) / timeElapsed; //pixels / millisecond
		let targetRotation = Math.min(Math.abs(distance * velocity) * SOFTEN_FACTOR, MAX_ROTATION);

		requestAnimationFrame(_ => this.outputEl.style.transform = 'rotate(' + targetRotation * -direction + 'deg)');

		this._lastTimeStamp = now;
		this._lastOffsetLeft = this.sliderThumbEl.offsetLeft;
	}

}


/*! rangeslider.js - v2.1.1 | (c) 2016 @andreruffert | MIT license | https://github.com/andreruffert/rangeslider.js */
!function(a){"use strict";"function"==typeof define&&define.amd?define(["jquery"],a):"object"==typeof exports?module.exports=a(require("jquery")):a(jQuery)}(function(a){"use strict";function b(){var a=document.createElement("input");return a.setAttribute("type","range"),"text"!==a.type}function c(a,b){var c=Array.prototype.slice.call(arguments,2);return setTimeout(function(){return a.apply(null,c)},b)}function d(a,b){return b=b||100,function(){if(!a.debouncing){var c=Array.prototype.slice.apply(arguments);a.lastReturnVal=a.apply(window,c),a.debouncing=!0}return clearTimeout(a.debounceTimeout),a.debounceTimeout=setTimeout(function(){a.debouncing=!1},b),a.lastReturnVal}}function e(a){return a&&(0===a.offsetWidth||0===a.offsetHeight||a.open===!1)}function f(a){for(var b=[],c=a.parentNode;e(c);)b.push(c),c=c.parentNode;return b}function g(a,b){function c(a){"undefined"!=typeof a.open&&(a.open=a.open?!1:!0)}var d=f(a),e=d.length,g=[],h=a[b];if(e){for(var i=0;e>i;i++)g[i]=d[i].style.cssText,d[i].style.setProperty?d[i].style.setProperty("display","block","important"):d[i].style.cssText+=";display: block !important",d[i].style.height="0",d[i].style.overflow="hidden",d[i].style.visibility="hidden",c(d[i]);h=a[b];for(var j=0;e>j;j++)d[j].style.cssText=g[j],c(d[j])}return h}function h(a,b){var c=parseFloat(a);return Number.isNaN(c)?b:c}function i(a){return a.charAt(0).toUpperCase()+a.substr(1)}function j(b,e){if(this.$window=a(window),this.$document=a(document),this.$element=a(b),this.options=a.extend({},n,e),this.polyfill=this.options.polyfill,this.orientation=this.$element[0].getAttribute("data-orientation")||this.options.orientation,this.onInit=this.options.onInit,this.onSlide=this.options.onSlide,this.onSlideEnd=this.options.onSlideEnd,this.DIMENSION=o.orientation[this.orientation].dimension,this.DIRECTION=o.orientation[this.orientation].direction,this.DIRECTION_STYLE=o.orientation[this.orientation].directionStyle,this.COORDINATE=o.orientation[this.orientation].coordinate,this.polyfill&&m)return!1;this.identifier="js-"+k+"-"+l++,this.startEvent=this.options.startEvent.join("."+this.identifier+" ")+"."+this.identifier,this.moveEvent=this.options.moveEvent.join("."+this.identifier+" ")+"."+this.identifier,this.endEvent=this.options.endEvent.join("."+this.identifier+" ")+"."+this.identifier,this.toFixed=(this.step+"").replace(".","").length-1,this.$fill=a('<div class="'+this.options.fillClass+'" />'),this.$handle=a('<div class="'+this.options.handleClass+'" />'),this.$range=a('<div class="'+this.options.rangeClass+" "+this.options[this.orientation+"Class"]+'" id="'+this.identifier+'" />').insertAfter(this.$element).prepend(this.$fill,this.$handle),this.$element.css({position:"absolute",width:"1px",height:"1px",overflow:"hidden",opacity:"0"}),this.handleDown=a.proxy(this.handleDown,this),this.handleMove=a.proxy(this.handleMove,this),this.handleEnd=a.proxy(this.handleEnd,this),this.init();var f=this;this.$window.on("resize."+this.identifier,d(function(){c(function(){f.update(!1,!1)},300)},20)),this.$document.on(this.startEvent,"#"+this.identifier+":not(."+this.options.disabledClass+")",this.handleDown),this.$element.on("change."+this.identifier,function(a,b){if(!b||b.origin!==f.identifier){var c=a.target.value,d=f.getPositionFromValue(c);f.setPosition(d)}})}Number.isNaN=Number.isNaN||function(a){return"number"==typeof a&&a!==a};var k="rangeslider",l=0,m=b(),n={polyfill:!0,orientation:"horizontal",rangeClass:"rangeslider",disabledClass:"rangeslider--disabled",horizontalClass:"rangeslider--horizontal",verticalClass:"rangeslider--vertical",fillClass:"rangeslider__fill",handleClass:"rangeslider__handle",startEvent:["mousedown","touchstart","pointerdown"],moveEvent:["mousemove","touchmove","pointermove"],endEvent:["mouseup","touchend","pointerup"]},o={orientation:{horizontal:{dimension:"width",direction:"left",directionStyle:"left",coordinate:"x"},vertical:{dimension:"height",direction:"top",directionStyle:"bottom",coordinate:"y"}}};return j.prototype.init=function(){this.update(!0,!1),this.onInit&&"function"==typeof this.onInit&&this.onInit()},j.prototype.update=function(a,b){a=a||!1,a&&(this.min=h(this.$element[0].getAttribute("min"),0),this.max=h(this.$element[0].getAttribute("max"),100),this.value=h(this.$element[0].value,Math.round(this.min+(this.max-this.min)/2)),this.step=h(this.$element[0].getAttribute("step"),1)),this.handleDimension=g(this.$handle[0],"offset"+i(this.DIMENSION)),this.rangeDimension=g(this.$range[0],"offset"+i(this.DIMENSION)),this.maxHandlePos=this.rangeDimension-this.handleDimension,this.grabPos=this.handleDimension/2,this.position=this.getPositionFromValue(this.value),this.$element[0].disabled?this.$range.addClass(this.options.disabledClass):this.$range.removeClass(this.options.disabledClass),this.setPosition(this.position,b)},j.prototype.handleDown=function(a){if(this.$document.on(this.moveEvent,this.handleMove),this.$document.on(this.endEvent,this.handleEnd),!((" "+a.target.className+" ").replace(/[\n\t]/g," ").indexOf(this.options.handleClass)>-1)){var b=this.getRelativePosition(a),c=this.$range[0].getBoundingClientRect()[this.DIRECTION],d=this.getPositionFromNode(this.$handle[0])-c,e="vertical"===this.orientation?this.maxHandlePos-(b-this.grabPos):b-this.grabPos;this.setPosition(e),b>=d&&b<d+this.handleDimension&&(this.grabPos=b-d)}},j.prototype.handleMove=function(a){a.preventDefault();var b=this.getRelativePosition(a),c="vertical"===this.orientation?this.maxHandlePos-(b-this.grabPos):b-this.grabPos;this.setPosition(c)},j.prototype.handleEnd=function(a){a.preventDefault(),this.$document.off(this.moveEvent,this.handleMove),this.$document.off(this.endEvent,this.handleEnd),this.$element.trigger("change",{origin:this.identifier}),this.onSlideEnd&&"function"==typeof this.onSlideEnd&&this.onSlideEnd(this.position,this.value)},j.prototype.cap=function(a,b,c){return b>a?b:a>c?c:a},j.prototype.setPosition=function(a,b){var c,d;void 0===b&&(b=!0),c=this.getValueFromPosition(this.cap(a,0,this.maxHandlePos)),d=this.getPositionFromValue(c),this.$fill[0].style[this.DIMENSION]=d+this.grabPos+"px",this.$handle[0].style[this.DIRECTION_STYLE]=d+"px",this.setValue(c),this.position=d,this.value=c,b&&this.onSlide&&"function"==typeof this.onSlide&&this.onSlide(d,c)},j.prototype.getPositionFromNode=function(a){for(var b=0;null!==a;)b+=a.offsetLeft,a=a.offsetParent;return b},j.prototype.getRelativePosition=function(a){var b=i(this.COORDINATE),c=this.$range[0].getBoundingClientRect()[this.DIRECTION],d=0;return"undefined"!=typeof a["page"+b]?d=a["client"+b]:"undefined"!=typeof a.originalEvent["client"+b]?d=a.originalEvent["client"+b]:a.originalEvent.touches&&a.originalEvent.touches[0]&&"undefined"!=typeof a.originalEvent.touches[0]["client"+b]?d=a.originalEvent.touches[0]["client"+b]:a.currentPoint&&"undefined"!=typeof a.currentPoint[this.COORDINATE]&&(d=a.currentPoint[this.COORDINATE]),d-c},j.prototype.getPositionFromValue=function(a){var b,c;return b=(a-this.min)/(this.max-this.min),c=Number.isNaN(b)?0:b*this.maxHandlePos},j.prototype.getValueFromPosition=function(a){var b,c;return b=a/(this.maxHandlePos||1),c=this.step*Math.round(b*(this.max-this.min)/this.step)+this.min,Number(c.toFixed(this.toFixed))},j.prototype.setValue=function(a){(a!==this.value||""===this.$element[0].value)&&this.$element.val(a).trigger("input",{origin:this.identifier})},j.prototype.destroy=function(){this.$document.off("."+this.identifier),this.$window.off("."+this.identifier),this.$element.off("."+this.identifier).removeAttr("style").removeData("plugin_"+k),this.$range&&this.$range.length&&this.$range[0].parentNode.removeChild(this.$range[0])},a.fn[k]=function(b){var c=Array.prototype.slice.call(arguments,1);return this.each(function(){var d=a(this),e=d.data("plugin_"+k);e||d.data("plugin_"+k,e=new j(this,b)),"string"==typeof b&&e[b].apply(e,c)})},"rangeslider.js is available in jQuery context e.g $(selector).rangeslider(options);"});


new RangeInput(document.querySelector('.range'));
  });

/* thermostat*/
var thermostatDial = (function() {
	
	/*
	 * Utility functions
	 */
	
	// Create an element with proper SVG namespace, optionally setting its attributes and appending it to another element
	function createSVGElement(tag,attributes,appendTo) {
		var element = document.createElementNS('http://www.w3.org/2000/svg',tag);
		attr(element,attributes);
		if (appendTo) {
			appendTo.appendChild(element);
		}
		return element;
	}
	
	// Set attributes for an element
	function attr(element,attrs) {
		for (var i in attrs) {
			element.setAttribute(i,attrs[i]);
		}
	}
	
	// Rotate a cartesian point about given origin by X degrees
	function rotatePoint(point, angle, origin) {
		var radians = angle * Math.PI/180;
		var x = point[0]-origin[0];
		var y = point[1]-origin[1];
		var x1 = x*Math.cos(radians) - y*Math.sin(radians) + origin[0];
		var y1 = x*Math.sin(radians) + y*Math.cos(radians) + origin[1];
		return [x1,y1];
	}
	
	// Rotate an array of cartesian points about a given origin by X degrees
	function rotatePoints(points, angle, origin) {
		return points.map(function(point) {
			return rotatePoint(point, angle, origin);
		});
	}
	
	// Given an array of points, return an SVG path string representing the shape they define
	function pointsToPath(points) {
		return points.map(function(point, iPoint) {
			return (iPoint>0?'L':'M') + point[0] + ' ' + point[1];
		}).join(' ')+'Z';
	}
	
	function circleToPath(cx, cy, r) {
		return [
			"M",cx,",",cy,
			"m",0-r,",",0,
			"a",r,",",r,0,1,",",0,r*2,",",0,
			"a",r,",",r,0,1,",",0,0-r*2,",",0,
			"z"
		].join(' ').replace(/\s,\s/g,",");
	}
	
	function donutPath(cx,cy,rOuter,rInner) {
		return circleToPath(cx,cy,rOuter) + " " + circleToPath(cx,cy,rInner);
	}
	
	// Restrict a number to a min + max range
	function restrictToRange(val,min,max) {
		if (val < min) return min;
		if (val > max) return max;
		return val;
	}
	
	// Round a number to the nearest 0.5
	function roundHalf(num) {
		return Math.round(num*2)/2;
	}
	
	function setClass(el, className, state) {
		el.classList[state ? 'add' : 'remove'](className);
	}
	
	/*
	 * The "MEAT"
	 */

	return function(targetElement, options) {
		var self = this;
		
		/*
		 * Options
		 */
		options = options || {};
		options = {
			diameter: options.diameter || 400,
			minValue: options.minValue || 10, // Minimum value for target temperature
			maxValue: options.maxValue || 30, // Maximum value for target temperature
			numTicks: options.numTicks || 150, // Number of tick lines to display around the dial
			onSetTargetTemperature: options.onSetTargetTemperature || function() {}, // Function called when new target temperature set by the dial
		};
		
		/*
		 * Properties - calculated from options in many cases
		 */
		var properties = {
			tickDegrees: 300, //  Degrees of the dial that should be covered in tick lines
			rangeValue: options.maxValue - options.minValue,
			radius: options.diameter/2,
			ticksOuterRadius: options.diameter / 30,
			ticksInnerRadius: options.diameter / 8,
			hvac_states: ['off', 'heating', 'cooling'],
			dragLockAxisDistance: 15,
		}
		properties.lblAmbientPosition = [properties.radius, properties.ticksOuterRadius-(properties.ticksOuterRadius-properties.ticksInnerRadius)/2]
		properties.offsetDegrees = 180-(360-properties.tickDegrees)/2;
		
		/*
		 * Object state
		 */
		var state = {
			target_temperature: options.minValue,
			ambient_temperature: options.minValue,
			hvac_state: properties.hvac_states[0],
			has_leaf: false,
			away: false
		};
		
		/*
		 * Property getter / setters
		 */
		Object.defineProperty(this,'target_temperature',{
			get: function() {
				return state.target_temperature;
			},
			set: function(val) {
				state.target_temperature = restrictTargetTemperature(+val);
				render();
			}
		});
		Object.defineProperty(this,'ambient_temperature',{
			get: function() {
				return state.ambient_temperature;
			},
			set: function(val) {
				state.ambient_temperature = roundHalf(+val);
				render();
			}
		});
		Object.defineProperty(this,'hvac_state',{
			get: function() {
				return state.hvac_state;
			},
			set: function(val) {
				if (properties.hvac_states.indexOf(val)>=0) {
					state.hvac_state = val;
					render();
				}
			}
		});
		Object.defineProperty(this,'has_leaf',{
			get: function() {
				return state.has_leaf;
			},
			set: function(val) {
				state.has_leaf = !!val;
				render();
			}
		});
		Object.defineProperty(this,'away',{
			get: function() {
				return state.away;
			},
			set: function(val) {
				state.away = !!val;
				render();
			}
		});
		
		/*
		 * SVG
		 */
		var svg = createSVGElement('svg',{
			width: '100%', //options.diameter+'px',
			height: '100%', //options.diameter+'px',
			viewBox: '0 0 '+options.diameter+' '+options.diameter,
			class: 'dial'
		},targetElement);
		// CIRCULAR DIAL
		var circle = createSVGElement('circle',{
			cx: properties.radius,
			cy: properties.radius,
			r: properties.radius,
			class: 'dial__shape'
		},svg);
		// EDITABLE INDICATOR
		var editCircle = createSVGElement('path',{
			d: donutPath(properties.radius,properties.radius,properties.radius-4,properties.radius-8),
			class: 'dial__editableIndicator',
		},svg);
		
		/*
		 * Ticks
		 */
		var ticks = createSVGElement('g',{
			class: 'dial__ticks'	
		},svg);
		var tickPoints = [
			[properties.radius-1, properties.ticksOuterRadius],
			[properties.radius+1, properties.ticksOuterRadius],
			[properties.radius+1, properties.ticksInnerRadius],
			[properties.radius-1, properties.ticksInnerRadius]
		];
		var tickPointsLarge = [
			[properties.radius-1.5, properties.ticksOuterRadius],
			[properties.radius+1.5, properties.ticksOuterRadius],
			[properties.radius+1.5, properties.ticksInnerRadius+20],
			[properties.radius-1.5, properties.ticksInnerRadius+20]
		];
		var theta = properties.tickDegrees/options.numTicks;
		var tickArray = [];
		for (var iTick=0; iTick<options.numTicks; iTick++) {
			tickArray.push(createSVGElement('path',{d:pointsToPath(tickPoints)},ticks));
		};
		
		/*
		 * Labels
		 */
		var lblTarget = createSVGElement('text',{
			x: properties.radius,
			y: properties.radius,
			class: 'dial__lbl dial__lbl--target'
		},svg);
		var lblTarget_text = document.createTextNode('');
		lblTarget.appendChild(lblTarget_text);
		//
		var lblTargetHalf = createSVGElement('text',{
			x: properties.radius + properties.radius/2.5,
			y: properties.radius - properties.radius/8,
			class: 'dial__lbl dial__lbl--target--half'
		},svg);
		var lblTargetHalf_text = document.createTextNode('5');
		lblTargetHalf.appendChild(lblTargetHalf_text);
		//
		var lblAmbient = createSVGElement('text',{
			class: 'dial__lbl dial__lbl--ambient'
		},svg);
		var lblAmbient_text = document.createTextNode('');
		lblAmbient.appendChild(lblAmbient_text);
		//
		var lblAway = createSVGElement('text',{
			x: properties.radius,
			y: properties.radius,
			class: 'dial__lbl dial__lbl--away'
		},svg);
		var lblAway_text = document.createTextNode('AWAY');
		lblAway.appendChild(lblAway_text);
		//
		var icoLeaf = createSVGElement('path',{
			class: 'dial__ico__leaf'
		},svg);
		
		/*
		 * LEAF
		 */
		var leafScale = properties.radius/5/100;
		var leafDef = ["M", 3, 84, "c", 24, 17, 51, 18, 73, -6, "C", 100, 52, 100, 22, 100, 4, "c", -13, 15, -37, 9, -70, 19, "C", 4, 32, 0, 63, 0, 76, "c", 6, -7, 18, -17, 33, -23, 24, -9, 34, -9, 48, -20, -9, 10, -20, 16, -43, 24, "C", 22, 63, 8, 78, 3, 84, "z"].map(function(x) {
			return isNaN(x) ? x : x*leafScale;
		}).join(' ');
		var translate = [properties.radius-(leafScale*100*0.5),properties.radius*1.5]
		var icoLeaf = createSVGElement('path',{
			class: 'dial__ico__leaf',
			d: leafDef,
			transform: 'translate('+translate[0]+','+translate[1]+')'
		},svg);
			
		/*
		 * RENDER
		 */
		function render() {
			renderAway();
			renderHvacState();
			renderTicks();
			renderTargetTemperature();
			renderAmbientTemperature();
			renderLeaf();
		}
		render();

		/*
		 * RENDER - ticks
		 */
		function renderTicks() {
			var vMin, vMax;
			if (self.away) {
				vMin = self.ambient_temperature;
				vMax = vMin;
			} else {
				vMin = Math.min(self.ambient_temperature, self.target_temperature);
				vMax = Math.max(self.ambient_temperature, self.target_temperature);
			}
			var min = restrictToRange(Math.round((vMin-options.minValue)/properties.rangeValue * options.numTicks),0,options.numTicks-1);
			var max = restrictToRange(Math.round((vMax-options.minValue)/properties.rangeValue * options.numTicks),0,options.numTicks-1);
			//
			tickArray.forEach(function(tick,iTick) {
				var isLarge = iTick==min || iTick==max;
				var isActive = iTick >= min && iTick <= max;
				attr(tick,{
					d: pointsToPath(rotatePoints(isLarge ? tickPointsLarge: tickPoints,iTick*theta-properties.offsetDegrees,[properties.radius, properties.radius])),
					class: isActive ? 'active' : ''
				});
			});
		}
	
		/*
		 * RENDER - ambient temperature
		 */
		function renderAmbientTemperature() {
			lblAmbient_text.nodeValue = Math.floor(self.ambient_temperature);
			if (self.ambient_temperature%1!=0) {
				lblAmbient_text.nodeValue += '⁵';
			}
			var peggedValue = restrictToRange(self.ambient_temperature, options.minValue, options.maxValue);
			degs = properties.tickDegrees * (peggedValue-options.minValue)/properties.rangeValue - properties.offsetDegrees;
			if (peggedValue > self.target_temperature) {
				degs += 8;
			} else {
				degs -= 8;
			}
			var pos = rotatePoint(properties.lblAmbientPosition,degs,[properties.radius, properties.radius]);
			attr(lblAmbient,{
				x: pos[0],
				y: pos[1]
			});
		}

		/*
		 * RENDER - target temperature
		 */
		function renderTargetTemperature() {
			lblTarget_text.nodeValue = Math.floor(self.target_temperature);
			setClass(lblTargetHalf,'shown',self.target_temperature%1!=0);
		}
		
		/*
		 * RENDER - leaf
		 */
		function renderLeaf() {
			setClass(svg,'has-leaf',self.has_leaf);
		}
		
		/*
		 * RENDER - HVAC state
		 */
		function renderHvacState() {
			Array.prototype.slice.call(svg.classList).forEach(function(c) {
				if (c.match(/^dial--state--/)) {
					svg.classList.remove(c);
				};
			});
			svg.classList.add('dial--state--'+self.hvac_state);
		}
		
		/*
		 * RENDER - awau
		 */
		function renderAway() {
			svg.classList[self.away ? 'add' : 'remove']('away');
		}
		
		/*
		 * Drag to control
		 */
		var _drag = {
			inProgress: false,
			startPoint: null,
			startTemperature: 0,
			lockAxis: undefined
		};
		
		function eventPosition(ev) {
			if (ev.targetTouches && ev.targetTouches.length) {
				return  [ev.targetTouches[0].clientX, ev.targetTouches[0].clientY];
			} else {
				return [ev.x, ev.y];
			};
		}
		
		var startDelay;
		function dragStart(ev) {
			startDelay = setTimeout(function() {
				setClass(svg, 'dial--edit', true);
				_drag.inProgress = true;
				_drag.startPoint = eventPosition(ev);
				_drag.startTemperature = self.target_temperature || options.minValue;
				_drag.lockAxis = undefined;
			},1000);
		};
		
		function dragEnd (ev) {
			clearTimeout(startDelay);
			setClass(svg, 'dial--edit', false);
			if (!_drag.inProgress) return;
			_drag.inProgress = false;
			if (self.target_temperature != _drag.startTemperature) {
				if (typeof options.onSetTargetTemperature == 'function') {
					options.onSetTargetTemperature(self.target_temperature);
				};
			};
		};
		
		function dragMove(ev) {
			ev.preventDefault();
			if (!_drag.inProgress) return;
			var evPos =  eventPosition(ev);
			var dy = _drag.startPoint[1]-evPos[1];
			var dx = evPos[0] - _drag.startPoint[0];
			var dxy;
			if (_drag.lockAxis == 'x') {
				dxy  = dx;
			} else if (_drag.lockAxis == 'y') {
				dxy = dy;
			} else if (Math.abs(dy) > properties.dragLockAxisDistance) {
				_drag.lockAxis = 'y';
				dxy = dy;
			} else if (Math.abs(dx) > properties.dragLockAxisDistance) {
				_drag.lockAxis = 'x';
				dxy = dx;
			} else {
				dxy = (Math.abs(dy) > Math.abs(dx)) ? dy : dx;
			};
			var dValue = (dxy*getSizeRatio())/(options.diameter)*properties.rangeValue;
			self.target_temperature = roundHalf(_drag.startTemperature+dValue);
		}
		
		svg.addEventListener('mousedown',dragStart);
		svg.addEventListener('touchstart',dragStart);
		
		svg.addEventListener('mouseup',dragEnd);
		svg.addEventListener('mouseleave',dragEnd);
		svg.addEventListener('touchend',dragEnd);
		
		svg.addEventListener('mousemove',dragMove);
		svg.addEventListener('touchmove',dragMove);
		//
		
		/*
		 * Helper functions
		 */
		function restrictTargetTemperature(t) {
			return restrictToRange(roundHalf(t),options.minValue,options.maxValue);
		}
		
		function angle(point) {
			var dx = point[0] - properties.radius;
			var dy = point[1] - properties.radius;
			var theta = Math.atan(dx/dy) / (Math.PI/180);
			if (point[0]>=properties.radius && point[1] < properties.radius) {
				theta = 90-theta - 90;
			} else if (point[0]>=properties.radius && point[1] >= properties.radius) {
				theta = 90-theta + 90;
			} else if (point[0]<properties.radius && point[1] >= properties.radius) {
				theta = 90-theta + 90;
			} else if (point[0]<properties.radius && point[1] < properties.radius) {
				theta = 90-theta+270;
			}
			return theta;
		};
		
		function getSizeRatio() {
			return options.diameter / targetElement.clientWidth;
		}
		
	};
})();

/* ==== */

var nest = new thermostatDial(document.getElementById('thermostat'),{
	onSetTargetTemperature: function(v) {
		document.getElementById('input_target_temperature').value = +v;
	}
});

document.getElementById('input_target_temperature').addEventListener('input',function() {
	nest.target_temperature = this.value;
});
document.getElementById('input_ambient_temperature').addEventListener('input',function() {
	nest.ambient_temperature = this.value;
});
document.getElementById('input_state').addEventListener('change',function() {
	nest.hvac_state = this.value;
});
document.getElementById('input_leaf').addEventListener('change',function() {
	nest.has_leaf = this.value;
});
document.getElementById('input_away').addEventListener('change',function() {
	nest.away = this.value;
});

