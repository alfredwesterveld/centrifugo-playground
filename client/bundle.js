(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
(function (process,global){
;(function () {
    'use strict';

    /*!
     * @overview es6-promise - a tiny implementation of Promises/A+.
     * @copyright Copyright (c) 2014 Yehuda Katz, Tom Dale, Stefan Penner and contributors (Conversion to ES6 API by Jake Archibald)
     * @license   Licensed under MIT license
     *            See https://raw.githubusercontent.com/jakearchibald/es6-promise/master/LICENSE
     * @version   3.0.2
     */
    (function(){"use strict";function lib$es6$promise$utils$$objectOrFunction(x){return typeof x==="function"||typeof x==="object"&&x!==null}function lib$es6$promise$utils$$isFunction(x){return typeof x==="function"}function lib$es6$promise$utils$$isMaybeThenable(x){return typeof x==="object"&&x!==null}var lib$es6$promise$utils$$_isArray;if(!Array.isArray){lib$es6$promise$utils$$_isArray=function(x){return Object.prototype.toString.call(x)==="[object Array]"}}else{lib$es6$promise$utils$$_isArray=Array.isArray}var lib$es6$promise$utils$$isArray=lib$es6$promise$utils$$_isArray;var lib$es6$promise$asap$$len=0;var lib$es6$promise$asap$$toString={}.toString;var lib$es6$promise$asap$$vertxNext;var lib$es6$promise$asap$$customSchedulerFn;var lib$es6$promise$asap$$asap=function asap(callback,arg){lib$es6$promise$asap$$queue[lib$es6$promise$asap$$len]=callback;lib$es6$promise$asap$$queue[lib$es6$promise$asap$$len+1]=arg;lib$es6$promise$asap$$len+=2;if(lib$es6$promise$asap$$len===2){if(lib$es6$promise$asap$$customSchedulerFn){lib$es6$promise$asap$$customSchedulerFn(lib$es6$promise$asap$$flush)}else{lib$es6$promise$asap$$scheduleFlush()}}};function lib$es6$promise$asap$$setScheduler(scheduleFn){lib$es6$promise$asap$$customSchedulerFn=scheduleFn}function lib$es6$promise$asap$$setAsap(asapFn){lib$es6$promise$asap$$asap=asapFn}var lib$es6$promise$asap$$browserWindow=typeof window!=="undefined"?window:undefined;var lib$es6$promise$asap$$browserGlobal=lib$es6$promise$asap$$browserWindow||{};var lib$es6$promise$asap$$BrowserMutationObserver=lib$es6$promise$asap$$browserGlobal.MutationObserver||lib$es6$promise$asap$$browserGlobal.WebKitMutationObserver;var lib$es6$promise$asap$$isNode=typeof process!=="undefined"&&{}.toString.call(process)==="[object process]";var lib$es6$promise$asap$$isWorker=typeof Uint8ClampedArray!=="undefined"&&typeof importScripts!=="undefined"&&typeof MessageChannel!=="undefined";function lib$es6$promise$asap$$useNextTick(){return function(){process.nextTick(lib$es6$promise$asap$$flush)}}function lib$es6$promise$asap$$useVertxTimer(){return function(){lib$es6$promise$asap$$vertxNext(lib$es6$promise$asap$$flush)}}function lib$es6$promise$asap$$useMutationObserver(){var iterations=0;var observer=new lib$es6$promise$asap$$BrowserMutationObserver(lib$es6$promise$asap$$flush);var node=document.createTextNode("");observer.observe(node,{characterData:true});return function(){node.data=iterations=++iterations%2}}function lib$es6$promise$asap$$useMessageChannel(){var channel=new MessageChannel;channel.port1.onmessage=lib$es6$promise$asap$$flush;return function(){channel.port2.postMessage(0)}}function lib$es6$promise$asap$$useSetTimeout(){return function(){setTimeout(lib$es6$promise$asap$$flush,1)}}var lib$es6$promise$asap$$queue=new Array(1e3);function lib$es6$promise$asap$$flush(){for(var i=0;i<lib$es6$promise$asap$$len;i+=2){var callback=lib$es6$promise$asap$$queue[i];var arg=lib$es6$promise$asap$$queue[i+1];callback(arg);lib$es6$promise$asap$$queue[i]=undefined;lib$es6$promise$asap$$queue[i+1]=undefined}lib$es6$promise$asap$$len=0}function lib$es6$promise$asap$$attemptVertx(){try{var r=require;var vertx=r("vertx");lib$es6$promise$asap$$vertxNext=vertx.runOnLoop||vertx.runOnContext;return lib$es6$promise$asap$$useVertxTimer()}catch(e){return lib$es6$promise$asap$$useSetTimeout()}}var lib$es6$promise$asap$$scheduleFlush;if(lib$es6$promise$asap$$isNode){lib$es6$promise$asap$$scheduleFlush=lib$es6$promise$asap$$useNextTick()}else if(lib$es6$promise$asap$$BrowserMutationObserver){lib$es6$promise$asap$$scheduleFlush=lib$es6$promise$asap$$useMutationObserver()}else if(lib$es6$promise$asap$$isWorker){lib$es6$promise$asap$$scheduleFlush=lib$es6$promise$asap$$useMessageChannel()}else if(lib$es6$promise$asap$$browserWindow===undefined&&typeof require==="function"){lib$es6$promise$asap$$scheduleFlush=lib$es6$promise$asap$$attemptVertx()}else{lib$es6$promise$asap$$scheduleFlush=lib$es6$promise$asap$$useSetTimeout()}function lib$es6$promise$$internal$$noop(){}var lib$es6$promise$$internal$$PENDING=void 0;var lib$es6$promise$$internal$$FULFILLED=1;var lib$es6$promise$$internal$$REJECTED=2;var lib$es6$promise$$internal$$GET_THEN_ERROR=new lib$es6$promise$$internal$$ErrorObject;function lib$es6$promise$$internal$$selfFulfillment(){return new TypeError("You cannot resolve a promise with itself")}function lib$es6$promise$$internal$$cannotReturnOwn(){return new TypeError("A promises callback cannot return that same promise.")}function lib$es6$promise$$internal$$getThen(promise){try{return promise.then}catch(error){lib$es6$promise$$internal$$GET_THEN_ERROR.error=error;return lib$es6$promise$$internal$$GET_THEN_ERROR}}function lib$es6$promise$$internal$$tryThen(then,value,fulfillmentHandler,rejectionHandler){try{then.call(value,fulfillmentHandler,rejectionHandler)}catch(e){return e}}function lib$es6$promise$$internal$$handleForeignThenable(promise,thenable,then){lib$es6$promise$asap$$asap(function(promise){var sealed=false;var error=lib$es6$promise$$internal$$tryThen(then,thenable,function(value){if(sealed){return}sealed=true;if(thenable!==value){lib$es6$promise$$internal$$resolve(promise,value)}else{lib$es6$promise$$internal$$fulfill(promise,value)}},function(reason){if(sealed){return}sealed=true;lib$es6$promise$$internal$$reject(promise,reason)},"Settle: "+(promise._label||" unknown promise"));if(!sealed&&error){sealed=true;lib$es6$promise$$internal$$reject(promise,error)}},promise)}function lib$es6$promise$$internal$$handleOwnThenable(promise,thenable){if(thenable._state===lib$es6$promise$$internal$$FULFILLED){lib$es6$promise$$internal$$fulfill(promise,thenable._result)}else if(thenable._state===lib$es6$promise$$internal$$REJECTED){lib$es6$promise$$internal$$reject(promise,thenable._result)}else{lib$es6$promise$$internal$$subscribe(thenable,undefined,function(value){lib$es6$promise$$internal$$resolve(promise,value)},function(reason){lib$es6$promise$$internal$$reject(promise,reason)})}}function lib$es6$promise$$internal$$handleMaybeThenable(promise,maybeThenable){if(maybeThenable.constructor===promise.constructor){lib$es6$promise$$internal$$handleOwnThenable(promise,maybeThenable)}else{var then=lib$es6$promise$$internal$$getThen(maybeThenable);if(then===lib$es6$promise$$internal$$GET_THEN_ERROR){lib$es6$promise$$internal$$reject(promise,lib$es6$promise$$internal$$GET_THEN_ERROR.error)}else if(then===undefined){lib$es6$promise$$internal$$fulfill(promise,maybeThenable)}else if(lib$es6$promise$utils$$isFunction(then)){lib$es6$promise$$internal$$handleForeignThenable(promise,maybeThenable,then)}else{lib$es6$promise$$internal$$fulfill(promise,maybeThenable)}}}function lib$es6$promise$$internal$$resolve(promise,value){if(promise===value){lib$es6$promise$$internal$$reject(promise,lib$es6$promise$$internal$$selfFulfillment())}else if(lib$es6$promise$utils$$objectOrFunction(value)){lib$es6$promise$$internal$$handleMaybeThenable(promise,value)}else{lib$es6$promise$$internal$$fulfill(promise,value)}}function lib$es6$promise$$internal$$publishRejection(promise){if(promise._onerror){promise._onerror(promise._result)}lib$es6$promise$$internal$$publish(promise)}function lib$es6$promise$$internal$$fulfill(promise,value){if(promise._state!==lib$es6$promise$$internal$$PENDING){return}promise._result=value;promise._state=lib$es6$promise$$internal$$FULFILLED;if(promise._subscribers.length!==0){lib$es6$promise$asap$$asap(lib$es6$promise$$internal$$publish,promise)}}function lib$es6$promise$$internal$$reject(promise,reason){if(promise._state!==lib$es6$promise$$internal$$PENDING){return}promise._state=lib$es6$promise$$internal$$REJECTED;promise._result=reason;lib$es6$promise$asap$$asap(lib$es6$promise$$internal$$publishRejection,promise)}function lib$es6$promise$$internal$$subscribe(parent,child,onFulfillment,onRejection){var subscribers=parent._subscribers;var length=subscribers.length;parent._onerror=null;subscribers[length]=child;subscribers[length+lib$es6$promise$$internal$$FULFILLED]=onFulfillment;subscribers[length+lib$es6$promise$$internal$$REJECTED]=onRejection;if(length===0&&parent._state){lib$es6$promise$asap$$asap(lib$es6$promise$$internal$$publish,parent)}}function lib$es6$promise$$internal$$publish(promise){var subscribers=promise._subscribers;var settled=promise._state;if(subscribers.length===0){return}var child,callback,detail=promise._result;for(var i=0;i<subscribers.length;i+=3){child=subscribers[i];callback=subscribers[i+settled];if(child){lib$es6$promise$$internal$$invokeCallback(settled,child,callback,detail)}else{callback(detail)}}promise._subscribers.length=0}function lib$es6$promise$$internal$$ErrorObject(){this.error=null}var lib$es6$promise$$internal$$TRY_CATCH_ERROR=new lib$es6$promise$$internal$$ErrorObject;function lib$es6$promise$$internal$$tryCatch(callback,detail){try{return callback(detail)}catch(e){lib$es6$promise$$internal$$TRY_CATCH_ERROR.error=e;return lib$es6$promise$$internal$$TRY_CATCH_ERROR}}function lib$es6$promise$$internal$$invokeCallback(settled,promise,callback,detail){var hasCallback=lib$es6$promise$utils$$isFunction(callback),value,error,succeeded,failed;if(hasCallback){value=lib$es6$promise$$internal$$tryCatch(callback,detail);if(value===lib$es6$promise$$internal$$TRY_CATCH_ERROR){failed=true;error=value.error;value=null}else{succeeded=true}if(promise===value){lib$es6$promise$$internal$$reject(promise,lib$es6$promise$$internal$$cannotReturnOwn());return}}else{value=detail;succeeded=true}if(promise._state!==lib$es6$promise$$internal$$PENDING){}else if(hasCallback&&succeeded){lib$es6$promise$$internal$$resolve(promise,value)}else if(failed){lib$es6$promise$$internal$$reject(promise,error)}else if(settled===lib$es6$promise$$internal$$FULFILLED){lib$es6$promise$$internal$$fulfill(promise,value)}else if(settled===lib$es6$promise$$internal$$REJECTED){lib$es6$promise$$internal$$reject(promise,value)}}function lib$es6$promise$$internal$$initializePromise(promise,resolver){try{resolver(function resolvePromise(value){lib$es6$promise$$internal$$resolve(promise,value)},function rejectPromise(reason){lib$es6$promise$$internal$$reject(promise,reason)})}catch(e){lib$es6$promise$$internal$$reject(promise,e)}}function lib$es6$promise$enumerator$$Enumerator(Constructor,input){var enumerator=this;enumerator._instanceConstructor=Constructor;enumerator.promise=new Constructor(lib$es6$promise$$internal$$noop);if(enumerator._validateInput(input)){enumerator._input=input;enumerator.length=input.length;enumerator._remaining=input.length;enumerator._init();if(enumerator.length===0){lib$es6$promise$$internal$$fulfill(enumerator.promise,enumerator._result)}else{enumerator.length=enumerator.length||0;enumerator._enumerate();if(enumerator._remaining===0){lib$es6$promise$$internal$$fulfill(enumerator.promise,enumerator._result)}}}else{lib$es6$promise$$internal$$reject(enumerator.promise,enumerator._validationError())}}lib$es6$promise$enumerator$$Enumerator.prototype._validateInput=function(input){return lib$es6$promise$utils$$isArray(input)};lib$es6$promise$enumerator$$Enumerator.prototype._validationError=function(){return new Error("Array Methods must be provided an Array")};lib$es6$promise$enumerator$$Enumerator.prototype._init=function(){this._result=new Array(this.length)};var lib$es6$promise$enumerator$$default=lib$es6$promise$enumerator$$Enumerator;lib$es6$promise$enumerator$$Enumerator.prototype._enumerate=function(){var enumerator=this;var length=enumerator.length;var promise=enumerator.promise;var input=enumerator._input;for(var i=0;promise._state===lib$es6$promise$$internal$$PENDING&&i<length;i++){enumerator._eachEntry(input[i],i)}};lib$es6$promise$enumerator$$Enumerator.prototype._eachEntry=function(entry,i){var enumerator=this;var c=enumerator._instanceConstructor;if(lib$es6$promise$utils$$isMaybeThenable(entry)){if(entry.constructor===c&&entry._state!==lib$es6$promise$$internal$$PENDING){entry._onerror=null;enumerator._settledAt(entry._state,i,entry._result)}else{enumerator._willSettleAt(c.resolve(entry),i)}}else{enumerator._remaining--;enumerator._result[i]=entry}};lib$es6$promise$enumerator$$Enumerator.prototype._settledAt=function(state,i,value){var enumerator=this;var promise=enumerator.promise;if(promise._state===lib$es6$promise$$internal$$PENDING){enumerator._remaining--;if(state===lib$es6$promise$$internal$$REJECTED){lib$es6$promise$$internal$$reject(promise,value)}else{enumerator._result[i]=value}}if(enumerator._remaining===0){lib$es6$promise$$internal$$fulfill(promise,enumerator._result)}};lib$es6$promise$enumerator$$Enumerator.prototype._willSettleAt=function(promise,i){var enumerator=this;lib$es6$promise$$internal$$subscribe(promise,undefined,function(value){enumerator._settledAt(lib$es6$promise$$internal$$FULFILLED,i,value)},function(reason){enumerator._settledAt(lib$es6$promise$$internal$$REJECTED,i,reason)})};function lib$es6$promise$promise$all$$all(entries){return new lib$es6$promise$enumerator$$default(this,entries).promise}var lib$es6$promise$promise$all$$default=lib$es6$promise$promise$all$$all;function lib$es6$promise$promise$race$$race(entries){var Constructor=this;var promise=new Constructor(lib$es6$promise$$internal$$noop);if(!lib$es6$promise$utils$$isArray(entries)){lib$es6$promise$$internal$$reject(promise,new TypeError("You must pass an array to race."));return promise}var length=entries.length;function onFulfillment(value){lib$es6$promise$$internal$$resolve(promise,value)}function onRejection(reason){lib$es6$promise$$internal$$reject(promise,reason)}for(var i=0;promise._state===lib$es6$promise$$internal$$PENDING&&i<length;i++){lib$es6$promise$$internal$$subscribe(Constructor.resolve(entries[i]),undefined,onFulfillment,onRejection)}return promise}var lib$es6$promise$promise$race$$default=lib$es6$promise$promise$race$$race;function lib$es6$promise$promise$resolve$$resolve(object){var Constructor=this;if(object&&typeof object==="object"&&object.constructor===Constructor){return object}var promise=new Constructor(lib$es6$promise$$internal$$noop);lib$es6$promise$$internal$$resolve(promise,object);return promise}var lib$es6$promise$promise$resolve$$default=lib$es6$promise$promise$resolve$$resolve;function lib$es6$promise$promise$reject$$reject(reason){var Constructor=this;var promise=new Constructor(lib$es6$promise$$internal$$noop);lib$es6$promise$$internal$$reject(promise,reason);return promise}var lib$es6$promise$promise$reject$$default=lib$es6$promise$promise$reject$$reject;var lib$es6$promise$promise$$counter=0;function lib$es6$promise$promise$$needsResolver(){throw new TypeError("You must pass a resolver function as the first argument to the promise constructor")}function lib$es6$promise$promise$$needsNew(){throw new TypeError("Failed to construct 'Promise': Please use the 'new' operator, this object constructor cannot be called as a function.")}var lib$es6$promise$promise$$default=lib$es6$promise$promise$$Promise;function lib$es6$promise$promise$$Promise(resolver){this._id=lib$es6$promise$promise$$counter++;this._state=undefined;this._result=undefined;this._subscribers=[];if(lib$es6$promise$$internal$$noop!==resolver){if(!lib$es6$promise$utils$$isFunction(resolver)){lib$es6$promise$promise$$needsResolver()}if(!(this instanceof lib$es6$promise$promise$$Promise)){lib$es6$promise$promise$$needsNew()}lib$es6$promise$$internal$$initializePromise(this,resolver)}}lib$es6$promise$promise$$Promise.all=lib$es6$promise$promise$all$$default;lib$es6$promise$promise$$Promise.race=lib$es6$promise$promise$race$$default;lib$es6$promise$promise$$Promise.resolve=lib$es6$promise$promise$resolve$$default;lib$es6$promise$promise$$Promise.reject=lib$es6$promise$promise$reject$$default;lib$es6$promise$promise$$Promise._setScheduler=lib$es6$promise$asap$$setScheduler;lib$es6$promise$promise$$Promise._setAsap=lib$es6$promise$asap$$setAsap;lib$es6$promise$promise$$Promise._asap=lib$es6$promise$asap$$asap;lib$es6$promise$promise$$Promise.prototype={constructor:lib$es6$promise$promise$$Promise,then:function(onFulfillment,onRejection){var parent=this;var state=parent._state;if(state===lib$es6$promise$$internal$$FULFILLED&&!onFulfillment||state===lib$es6$promise$$internal$$REJECTED&&!onRejection){return this}var child=new this.constructor(lib$es6$promise$$internal$$noop);var result=parent._result;if(state){var callback=arguments[state-1];lib$es6$promise$asap$$asap(function(){lib$es6$promise$$internal$$invokeCallback(state,child,callback,result)})}else{lib$es6$promise$$internal$$subscribe(parent,child,onFulfillment,onRejection)}return child},"catch":function(onRejection){return this.then(null,onRejection)}};function lib$es6$promise$polyfill$$polyfill(){var local;if(typeof global!=="undefined"){local=global}else if(typeof self!=="undefined"){local=self}else{try{local=Function("return this")()}catch(e){throw new Error("polyfill failed because global object is unavailable in this environment")}}var P=local.Promise;if(P&&Object.prototype.toString.call(P.resolve())==="[object Promise]"&&!P.cast){return}local.Promise=lib$es6$promise$promise$$default}var lib$es6$promise$polyfill$$default=lib$es6$promise$polyfill$$polyfill;var lib$es6$promise$umd$$ES6Promise={Promise:lib$es6$promise$promise$$default,polyfill:lib$es6$promise$polyfill$$default};if(typeof define==="function"&&define["amd"]){define(function(){return lib$es6$promise$umd$$ES6Promise})}else if(typeof module!=="undefined"&&module["exports"]){module["exports"]=lib$es6$promise$umd$$ES6Promise}else if(typeof this!=="undefined"){this["ES6Promise"]=lib$es6$promise$umd$$ES6Promise}lib$es6$promise$polyfill$$default()}).call(this);

    /*!
     * EventEmitter v4.2.11 - git.io/ee
     * Unlicense - http://unlicense.org/
     * Oliver Caldwell - http://oli.me.uk/
     * @preserve
     */
    (function(){"use strict";function t(){}function i(t,n){for(var e=t.length;e--;)if(t[e].listener===n)return e;return-1}function n(e){return function(){return this[e].apply(this,arguments)}}var e=t.prototype,r=this,s=r.EventEmitter;e.getListeners=function(n){var r,e,t=this._getEvents();if(n instanceof RegExp){r={};for(e in t)t.hasOwnProperty(e)&&n.test(e)&&(r[e]=t[e])}else r=t[n]||(t[n]=[]);return r},e.flattenListeners=function(t){var e,n=[];for(e=0;e<t.length;e+=1)n.push(t[e].listener);return n},e.getListenersAsObject=function(n){var e,t=this.getListeners(n);return t instanceof Array&&(e={},e[n]=t),e||t},e.addListener=function(r,e){var t,n=this.getListenersAsObject(r),s="object"==typeof e;for(t in n)n.hasOwnProperty(t)&&-1===i(n[t],e)&&n[t].push(s?e:{listener:e,once:!1});return this},e.on=n("addListener"),e.addOnceListener=function(e,t){return this.addListener(e,{listener:t,once:!0})},e.once=n("addOnceListener"),e.defineEvent=function(e){return this.getListeners(e),this},e.defineEvents=function(t){for(var e=0;e<t.length;e+=1)this.defineEvent(t[e]);return this},e.removeListener=function(r,s){var n,e,t=this.getListenersAsObject(r);for(e in t)t.hasOwnProperty(e)&&(n=i(t[e],s),-1!==n&&t[e].splice(n,1));return this},e.off=n("removeListener"),e.addListeners=function(e,t){return this.manipulateListeners(!1,e,t)},e.removeListeners=function(e,t){return this.manipulateListeners(!0,e,t)},e.manipulateListeners=function(r,t,i){var e,n,s=r?this.removeListener:this.addListener,o=r?this.removeListeners:this.addListeners;if("object"!=typeof t||t instanceof RegExp)for(e=i.length;e--;)s.call(this,t,i[e]);else for(e in t)t.hasOwnProperty(e)&&(n=t[e])&&("function"==typeof n?s.call(this,e,n):o.call(this,e,n));return this},e.removeEvent=function(e){var t,r=typeof e,n=this._getEvents();if("string"===r)delete n[e];else if(e instanceof RegExp)for(t in n)n.hasOwnProperty(t)&&e.test(t)&&delete n[t];else delete this._events;return this},e.removeAllListeners=n("removeEvent"),e.emitEvent=function(t,u){var n,e,r,i,o,s=this.getListenersAsObject(t);for(i in s)if(s.hasOwnProperty(i))for(n=s[i].slice(0),r=n.length;r--;)e=n[r],e.once===!0&&this.removeListener(t,e.listener),o=e.listener.apply(this,u||[]),o===this._getOnceReturnValue()&&this.removeListener(t,e.listener);return this},e.trigger=n("emitEvent"),e.emit=function(e){var t=Array.prototype.slice.call(arguments,1);return this.emitEvent(e,t)},e.setOnceReturnValue=function(e){return this._onceReturnValue=e,this},e._getOnceReturnValue=function(){return this.hasOwnProperty("_onceReturnValue")?this._onceReturnValue:!0},e._getEvents=function(){return this._events||(this._events={})},t.noConflict=function(){return r.EventEmitter=s,t},"function"==typeof define&&define.amd?define(function(){return t}):"object"==typeof module&&module.exports?module.exports=t:r.EventEmitter=t}).call(this);

    /**
     * Oliver Caldwell
     * http://oli.me.uk/2013/06/01/prototypical-inheritance-done-right/
     */
    if (!Object.create) {
        Object.create = (function(){
            function F(){}
            return function(o){
                if (arguments.length != 1) {
                    throw new Error('Object.create implementation only accepts one parameter.');
                }
                F.prototype = o;
                return new F()
            }
        })()
    }

    function extend(destination, source) {
        destination.prototype = Object.create(source.prototype);
        destination.prototype.constructor = destination;
        return source.prototype;
    }

    if (!Array.prototype.indexOf) {
        Array.prototype.indexOf=function(r){if(null==this)throw new TypeError;var t,e,n=Object(this),a=n.length>>>0;if(0===a)return-1;if(t=0,arguments.length>1&&(t=Number(arguments[1]),t!=t?t=0:0!=t&&1/0!=t&&t!=-1/0&&(t=(t>0||-1)*Math.floor(Math.abs(t)))),t>=a)return-1;for(e=t>=0?t:Math.max(a-Math.abs(t),0);a>e;e++)if(e in n&&n[e]===r)return e;return-1};
    }

    function fieldValue(object, name) {
        try {return object[name];} catch (x) {return undefined;}
    }

    /**
     * Mixes in the given objects into the target object by copying the properties.
     * @param deep if the copy must be deep
     * @param target the target object
     * @param objects the objects whose properties are copied into the target
     */
    function mixin(deep, target, objects) {
        var result = target || {};
        for (var i = 2; i < arguments.length; ++i) { // Skip first 2 parameters (deep and target), and loop over the others
            var object = arguments[i];
            if (object === undefined || object === null) {
                continue;
            }
            for (var propName in object) {
                var prop = fieldValue(object, propName);
                var targ = fieldValue(result, propName);
                if (prop === target) {
                    continue; // Avoid infinite loops
                }
                if (prop === undefined) {
                    continue; // Do not mixin undefined values
                }
                if (deep && typeof prop === 'object' && prop !== null) {
                    if (prop instanceof Array) {
                        result[propName] = mixin(deep, targ instanceof Array ? targ : [], prop);
                    } else {
                        var source = typeof targ === 'object' && !(targ instanceof Array) ? targ : {};
                        result[propName] = mixin(deep, source, prop);
                    }
                } else {
                    result[propName] = prop;
                }
            }
        }
        return result;
    }

    function endsWith(value, suffix) {
        return value.indexOf(suffix, value.length - suffix.length) !== -1;
    }

    function startsWith(value, prefix) {
        return value.lastIndexOf(prefix, 0) === 0;
    }

    function stripSlash(value) {
        if (value.substring(value.length - 1) == "/") {
            value = value.substring(0, value.length - 1);
        }
        return value;
    }

    function isString(value) {
        if (value === undefined || value === null) {
            return false;
        }
        return typeof value === 'string' || value instanceof String;
    }

    function isFunction(value) {
        if (value === undefined || value === null) {
            return false;
        }
        return typeof value === 'function';
    }

    function log(level, args) {
        if (window.console) {
            var logger = window.console[level];
            if (isFunction(logger)) {
                logger.apply(window.console, args);
            }
        }
    }

    function backoff(step, min, max) {
        var jitter = 0.5 * Math.random();
        var interval = min * Math.pow(2, step+1);
        if (interval > max) {
            interval = max
        }
        return Math.floor((1-jitter) * interval);
    }

    function errorExists(data) {
        return "error" in data && data.error !== null && data.error !== "";
    }

    function Centrifuge(options) {
        this._sockjs = false;
        this._status = 'disconnected';
        this._reconnect = true;
        this._reconnecting = false;
        this._transport = null;
        this._transportName = null;
        this._messageId = 0;
        this._clientID = null;
        this._subs = {};
        this._lastMessageID = {};
        this._messages = [];
        this._isBatching = false;
        this._isAuthBatching = false;
        this._authChannels = {};
        this._refreshTimeout = null;
        this._retries = 0;
        this._callbacks = {};
        this._latency = null;
        this._latencyStart = null;
        this._config = {
            retry: 1000,
            maxRetry: 20000,
            timeout: 5000,
            info: "",
            resubscribe: true,
            debug: false,
            insecure: false,
            server: null,
            privateChannelPrefix: "$",
            transports: [
                'websocket',
                'xdr-streaming',
                'xhr-streaming',
                'eventsource',
                'iframe-eventsource',
                'iframe-htmlfile',
                'xdr-polling',
                'xhr-polling',
                'iframe-xhr-polling',
                'jsonp-polling'
            ],
            refreshEndpoint: "/centrifuge/refresh/",
            refreshHeaders: {},
            refreshParams: {},
            refreshTransport: "ajax",
            authEndpoint: "/centrifuge/auth/",
            authHeaders: {},
            authParams: {},
            authTransport: "ajax"
        };
        if (options) {
            this.configure(options);
        }
    }

    extend(Centrifuge, EventEmitter);

    Centrifuge._authCallbacks = {};
    Centrifuge._nextAuthCallbackID = 1;

    var centrifugeProto = Centrifuge.prototype;

    centrifugeProto._jsonp = function (url, params, headers, data, callback) {
        if (headers.length > 0) {
            this._log("Only AJAX request allows to send custom headers, it's not possible with JSONP.");
        }
        self._debug("sending JSONP request to", url);

        var callbackName = Centrifuge._nextAuthCallbackID.toString();
        Centrifuge._nextAuthCallbackID++;

        var document = window.document;
        var script = document.createElement("script");
        Centrifuge._authCallbacks[callbackName] = function (data) {
            callback(false, data);
            delete Centrifuge[callbackName];
        };

        var query = "";
        for (var i in params) {
            if (query.length > 0) {
                query += "&";
            }
            query += encodeURIComponent(i) + "=" + encodeURIComponent(params[i]);
        }

        var callback_name = "Centrifuge._authCallbacks['" + callbackName + "']";
        script.src = this._config.authEndpoint +
            '?callback=' + encodeURIComponent(callback_name) +
            '&data=' + encodeURIComponent(JSON.stringify(data)) +
            '&' + query;

        var head = document.getElementsByTagName("head")[0] || document.documentElement;
        head.insertBefore(script, head.firstChild);
    };

    centrifugeProto._ajax = function (url, params, headers, data, callback) {
        var self = this;
        self._debug("sending AJAX request to", url);

        var xhr = (window.XMLHttpRequest ? new window.XMLHttpRequest() : new ActiveXObject("Microsoft.XMLHTTP"));

        var query = "";
        for (var i in params) {
            if (query.length > 0) {
                query += "&";
            }
            query += encodeURIComponent(i) + "=" + encodeURIComponent(params[i]);
        }
        if (query.length > 0) {
            query = "?" + query;
        }
        xhr.open("POST", url + query, true);

        // add request headers
        xhr.setRequestHeader("X-Requested-With", "XMLHttpRequest");
        xhr.setRequestHeader("Content-Type", "application/json");
        for (var headerName in headers) {
            xhr.setRequestHeader(headerName, headers[headerName]);
        }

        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4) {
                if (xhr.status === 200) {
                    var data, parsed = false;

                    try {
                        data = JSON.parse(xhr.responseText);
                        parsed = true;
                    } catch (e) {
                        callback(true, 'JSON returned was invalid, yet status code was 200. Data was: ' + xhr.responseText);
                    }

                    if (parsed) { // prevents double execution.
                        callback(false, data);
                    }
                } else {
                    self._log("Couldn't get auth info from application", xhr.status);
                    callback(true, xhr.status);
                }
            }
        };

        setTimeout(function() {
            // method == 'get' ? self.xhr.send() : self.xhr.send(JSON.stringify(ops.data));
            xhr.send(JSON.stringify(data));
        }, 20);
        return xhr;
    };

    centrifugeProto._log = function () {
        log("info", arguments);
    };

    centrifugeProto._debug = function () {
        if (this._config.debug === true) {
            log("debug", arguments);
        }
    };

    centrifugeProto._configure = function (configuration) {
        this._debug('Configuring centrifuge object with', configuration);

        if (!configuration) {
            configuration = {};
        }

        this._config = mixin(false, this._config, configuration);

        if (!this._config.url) {
            throw 'Missing required configuration parameter \'url\' specifying server URL';
        }

        if (!this._config.user && this._config.user !== '') {
            if (!this._config.insecure) {
                throw 'Missing required configuration parameter \'user\' specifying user\'s unique ID in your application';
            } else {
                this._debug("user not found but this is OK for insecure mode - anonymous access will be used");
                this._config.user = "";
            }
        }

        if (!this._config.timestamp) {
            if (!this._config.insecure) {
                throw 'Missing required configuration parameter \'timestamp\'';
            } else {
                this._debug("token not found but this is OK for insecure mode");
            }
        }

        if (!this._config.token) {
            if (!this._config.insecure) {
                throw 'Missing required configuration parameter \'token\' specifying the sign of authorization request';
            } else {
                this._debug("timestamp not found but this is OK for insecure mode");
            }
        }

        this._config.url = stripSlash(this._config.url);

        if (endsWith(this._config.url, 'connection')) {
            this._debug("client will connect to SockJS endpoint");
            if (typeof SockJS === 'undefined') {
                throw 'include SockJS client library before Centrifuge javascript client library or use raw Websocket connection endpoint';
            }
            this._sockjs = true;
        } else if (endsWith(this._config.url, 'connection/websocket')) {
            this._debug("client will connect to raw Websocket endpoint");
            this._config.url = this._config.url.replace("http://", "ws://");
            this._config.url = this._config.url.replace("https://", "wss://");
        } else {
            this._debug("client will detect connection endpoint itself");
            if (typeof SockJS === 'undefined') {
                this._debug("no SockJS found, client will connect to raw Websocket endpoint");
                this._config.url += "/connection/websocket";
                this._config.url = this._config.url.replace("http://", "ws://");
                this._config.url = this._config.url.replace("https://", "wss://");
            } else {
                this._debug("SockJS found, client will connect to SockJS endpoint");
                this._config.url += "/connection";
                this._sockjs = true;
            }
        }
    };

    centrifugeProto._setStatus = function (newStatus) {
        if (this._status !== newStatus) {
            this._debug('Status', this._status, '->', newStatus);
            this._status = newStatus;
        }
    };

    centrifugeProto._isDisconnected = function () {
        return this._status === 'disconnected';
    };

    centrifugeProto._isConnecting = function() {
        return this._status === 'connecting';
    };

    centrifugeProto._isConnected = function () {
        return this._status === 'connected';
    };

    centrifugeProto._nextMessageId = function () {
        return ++this._messageId;
    };

    centrifugeProto._resetRetry = function() {
        this._debug("reset retries count to 0");
        this._retries = 0;
    };

    centrifugeProto._getRetryInterval = function() {
        var interval = backoff(this._retries, this._config.retry, this._config.maxRetry);
        this._retries += 1;
        return interval;
    };

    centrifugeProto._clearConnectedState = function (reconnect) {
        self._clientID = null;

        // fire errbacks of registered calls.
        for (var uid in this._callbacks) {
            var callbacks = this._callbacks[uid];
            var errback = callbacks["errback"];
            if (!errback) {
                continue;
            }
            errback(this._createErrorObject("disconnected", "retry"));
        }
        this._callbacks = {};

        // fire unsubscribe events
        for (var channel in this._subs) {
            var sub = this._subs[channel];
            if (reconnect) {
                if (sub._isSuccess()) {
                    sub._triggerUnsubscribe();
                }
                sub._setSubscribing();
            } else {
                sub._setUnsubscribed();
            }
        }

        if (!this._config.resubscribe || !this._reconnect) {
            // completely clear connected state
            this._subs = {};
        }
    };

    centrifugeProto._send = function (messages) {
        if (messages.length === 0) {
            return;
        }
        this._debug('Send', messages);
        this._transport.send(JSON.stringify(messages));
    };

    centrifugeProto._connect = function (callback) {

        if (this.isConnected()) {
            this._debug("connect called when already connected");
            return;
        }

        this._setStatus('connecting');
        this._clientID = null;
        this._reconnect = true;

        var self = this;

        if (callback) {
            this.on('connect', callback);
        }

        // detect transport to use - SockJS or raw Websocket
        if (this._sockjs === true) {
            var sockjsOptions = {
                "transports": this._config.transports
            };
            if (this._config.server !== null) {
                sockjsOptions['server'] = this._config.server;
            }
            this._transport = new SockJS(this._config.url, null, sockjsOptions);
        } else {
            this._transport = new WebSocket(this._config.url);
        }

        this._transport.onopen = function () {

            self._reconnecting = false;

            if (self._sockjs) {
                self._transportName = self._transport._transport.transportName;
            } else {
                self._transportName = "raw-websocket";
            }

            self._resetRetry();

            if (!isString(self._config.user)) {
                self._log("user expected to be string");
            }
            if (!isString(self._config.info)) {
                self._log("info expected to be string");
            }

            var msg = {
                'method': 'connect',
                'params': {
                    'user': self._config.user,
                    'info': self._config.info
                }
            };

            if (!self._config.insecure) {
                // in insecure client mode we don't need timestamp and token.
                msg["params"]["timestamp"] = self._config.timestamp;
                msg["params"]["token"] = self._config.token;
                if (!isString(self._config.timestamp)) {
                    self._log("timestamp expected to be string");
                }
                if (!isString(self._config.token)) {
                    self._log("token expected to be string");
                }
            }
            self._addMessage(msg);
            self._latencyStart = new Date();
        };

        this._transport.onerror = function (error) {
            self._debug("transport level error", error);
        };

        this._transport.onclose = function () {
            self._disconnect("connection closed", true, false);
        };

        this._transport.onmessage = function (event) {
            var data;
            data = JSON.parse(event.data);
            self._debug('Received', data);
            self._receive(data);
        };
    };

    centrifugeProto._disconnect = function (reason, shouldReconnect, closeTransport) {
        this._debug("disconnected:", reason, shouldReconnect);
        var reconnect = shouldReconnect || false;
        if (reconnect === false) {
            this._reconnect = false;
        }

        this._clearConnectedState(shouldReconnect);

        if (!this.isDisconnected()) {
            this._setStatus('disconnected');
            var disconnectContext = {
                "reason": reason,
                "reconnect": reconnect
            };
            if (this._reconnecting === false) {
                this.trigger('disconnect', [disconnectContext]);
            }
        }

        if (closeTransport) {
            this._transport.close();
        }

        var self = this;
        if (shouldReconnect === true && self._reconnect === true) {
            self._reconnecting = true;
            var interval = self._getRetryInterval();
            self._debug("reconnect after " + interval + " milliseconds");
            window.setTimeout(function () {
                if (self._reconnect === true) {
                    self._connect.call(self);
                }
            }, interval);
        }
    };

    centrifugeProto._refresh = function () {
        // ask web app for connection parameters - user ID,
        // timestamp, info and token
        var self = this;
        this._debug('refresh credentials');

        var cb = function(error, data) {
            if (error === true) {
                // 403 or 500 - does not matter - if connection check activated then Centrifugo
                // will disconnect client eventually
                self._debug("error getting connect parameters", data);
                if (self._refreshTimeout) {
                    window.clearTimeout(self._refreshTimeout);
                }
                self._refreshTimeout = window.setTimeout(function(){
                    self._refresh.call(self);
                }, 3000);
                return;
            }
            self._config.user = data.user;
            self._config.timestamp = data.timestamp;
            self._config.info = data.info;
            self._config.token = data.token;
            if (self.isDisconnected()) {
                self._debug("credentials refreshed, connect from scratch");
                self._connect();
            } else {
                self._debug("send refreshed credentials");
                var msg = {
                    "method": "refresh",
                    "params": {
                        'user': self._config.user,
                        'timestamp': self._config.timestamp,
                        'info': self._config.info,
                        'token': self._config.token
                    }
                };
                self._addMessage(msg);
            }
        };

        var transport = this._config.refreshTransport.toLowerCase();
        if (transport === "ajax") {
            this._ajax(this._config.refreshEndpoint, this._config.refreshParams, this._config.refreshHeaders, {}, cb);
        } else if (transport === "jsonp") {
            this._jsonp(this._config.refreshEndpoint, this._config.refreshParams, this._config.refreshHeaders, {}, cb);
        } else {
            throw 'Unknown refresh transport ' + transport;
        }
    };

    centrifugeProto._subscribe = function(sub) {

        var channel = sub.channel;

        if (!(channel in this._subs)) {
            this._subs[channel] = sub;
        }

        if (!this.isConnected()) {
            // subscribe will be called later
            sub._setNew();
            return;
        }

        sub._setSubscribing();

        var msg = {
            "method": "subscribe",
            "params": {
                "channel": channel
            }
        };

        // If channel name does not start with privateChannelPrefix - then we
        // can just send subscription message to Centrifuge. If channel name
        // starts with privateChannelPrefix - then this is a private channel
        // and we should ask web application backend for permission first.
        if (startsWith(channel, this._config.privateChannelPrefix)) {
            // private channel
            if (this._isAuthBatching) {
                this._authChannels[channel] = true;
            } else {
                this.startAuthBatching();
                this._subscribe(sub);
                this.stopAuthBatching();
            }
        } else {
            var recover = this._recover(channel);
            if (recover === true) {
                msg["params"]["recover"] = true;
                msg["params"]["last"] = this._getLastID(channel);
            }
            this._addMessage(msg);
        }
    };

    centrifugeProto._unsubscribe = function(sub) {
        if (this.isConnected()) {
            // No need to unsubscribe in disconnected state - i.e. client already unsubscribed.
            var msg = {
                "method": "unsubscribe",
                "params": {
                    "channel": sub.channel
                }
            };
            this._addMessage(msg);
        }
    };

    centrifugeProto._getSub = function(channel) {
        var sub = this._subs[channel];
        if (!sub) {
            return null;
        }
        return sub;
    };

    centrifugeProto._connectResponse = function (message) {

        if (this.isConnected()) {
            return;
        }

        if (!errorExists(message)) {

            if (this._latencyStart !== null) {
                this._latency = (new Date()).getTime() - this._latencyStart.getTime();
                this._latencyStart = null;
            }

            if (!message.body) {
                return;
            }
            if (message.body.expires) {
                var isExpired = message.body.expired;
                if (isExpired) {
                    this._refresh();
                    return;
                }
            }
            this._clientID = message.body.client;
            this._setStatus('connected');

            if (this._refreshTimeout) {
                window.clearTimeout(this._refreshTimeout);
            }
            if (message.body.expires) {
                var self = this;
                this._refreshTimeout = window.setTimeout(function() {
                    self._refresh.call(self);
                }, message.body.ttl * 1000);
            }

            if (this._config.resubscribe) {
                this.startBatching();
                this.startAuthBatching();
                for (var channel in this._subs) {
                    var sub = this._subs[channel];
                    this._subscribe(sub);
                }
                this.stopAuthBatching();
                this.stopBatching(true);
            }

            var connectContext = {
                "client": message.body.client,
                "transport": this._transportName,
                "latency": this._latency
            };
            this.trigger('connect', [connectContext]);
        } else {
            this.trigger('error', [{"message": message}]);
        }
    };

    centrifugeProto._disconnectResponse = function (message) {
        if (!errorExists(message)) {
            var shouldReconnect = false;
            if ("reconnect" in message.body) {
                shouldReconnect = message.body["reconnect"];
            }
            var reason = "";
            if ("reason" in message.body) {
                reason = message.body["reason"];
            }
            this._disconnect(reason, shouldReconnect, true);
        } else {
            this.trigger('error', [{"message": message}]);
        }
    };

    centrifugeProto._subscribeResponse = function (message) {
        var body = message.body;
        if (body === null) {
            return;
        }
        var channel = body.channel;

        var sub = this._getSub(channel);
        if (!sub) {
            return;
        }

        if (!sub._isSubscribing()) {
            return;
        }

        if (!errorExists(message)) {
            sub._setSubscribeSuccess();
            var messages = body["messages"];
            if (messages && messages.length > 0) {
                // handle missed messages
                for (var i in messages.reverse()) {
                    this._messageResponse({body: messages[i]});
                }
            } else {
                if ("last" in body) {
                    // no missed messages found so set last message id from body.
                    this._lastMessageID[channel] = body["last"];
                }
            }
        } else {
            this.trigger('error', [{"message": message}]);
            sub._setSubscribeError(this._errorObjectFromMessage(message));
        }
    };

    centrifugeProto._unsubscribeResponse = function (message) {
        var uid = message.uid;
        var body = message.body;
        var channel = body.channel;

        var sub = this._getSub(channel);
        if (!sub) {
            return;
        }

        if (!errorExists(message)) {
            if (!uid) {
                // unsubscribe command from server – unsubscribe all current subs
                sub._setUnsubscribed();
            }
            // ignore client initiated successful unsubscribe responses as we
            // already unsubscribed on client level.
        } else {
            this.trigger('error', [{"message": message}]);
        }
    };

    centrifugeProto._publishResponse = function (message) {
        var uid = message.uid;
        var body = message.body;
        if (!(uid in this._callbacks)) {
            return;
        }
        var callbacks = this._callbacks[uid];
        delete this._callbacks[uid];
        if (!errorExists(message)) {
            var callback = callbacks["callback"];
            if (!callback) {
                return;
            }
            callback(body);
        } else {
            var errback = callbacks["errback"];
            if (!errback) {
                return;
            }
            errback(this._errorObjectFromMessage(message));
            this.trigger('error', [{"message": message}]);
        }
    };

    centrifugeProto._presenceResponse = function (message) {
        var uid = message.uid;
        var body = message.body;
        if (!(uid in this._callbacks)) {
            return;
        }
        var callbacks = this._callbacks[uid];
        delete this._callbacks[uid];
        if (!errorExists(message)) {
            var callback = callbacks["callback"];
            if (!callback) {
                return;
            }
            callback(body);
        } else {
            var errback = callbacks["errback"];
            if (!errback) {
                return;
            }
            errback(this._errorObjectFromMessage(message));
            this.trigger('error', [{"message": message}]);
        }
    };

    centrifugeProto._historyResponse = function (message) {
        var uid = message.uid;
        var body = message.body;
        if (!(uid in this._callbacks)) {
            return;
        }
        var callbacks = this._callbacks[uid];
        delete this._callbacks[uid];
        if (!errorExists(message)) {
            var callback = callbacks["callback"];
            if (!callback) {
                return;
            }
            callback(body);
        } else {
            var errback = callbacks["errback"];
            if (!errback) {
                return;
            }
            errback(this._errorObjectFromMessage(message));
            this.trigger('error', [{"message": message}]);
        }
    };

    centrifugeProto._joinResponse = function(message) {
        var body = message.body;
        var channel = body.channel;

        var sub = this._getSub(channel);
        if (!sub) {
            return;
        }
        sub.trigger('join', [body]);
    };

    centrifugeProto._leaveResponse = function(message) {
        var body = message.body;
        var channel = body.channel;

        var sub = this._getSub(channel);
        if (!sub) {
            return;
        }
        sub.trigger('leave', [body]);
    };

    centrifugeProto._messageResponse = function (message) {
        var body = message.body;
        var channel = body.channel;

        // keep last uid received from channel.
        this._lastMessageID[channel] = body["uid"];

        var sub = this._getSub(channel);
        if (!sub) {
            return;
        }
        sub.trigger('message', [body]);
    };

    centrifugeProto._refreshResponse = function (message) {
        if (this._refreshTimeout) {
            window.clearTimeout(this._refreshTimeout);
        }
        if (!errorExists(message)) {
            if (message.body.expires) {
                var self = this;
                var isExpired = message.body.expired;
                if (isExpired) {
                    self._refreshTimeout = window.setTimeout(function () {
                        self._refresh.call(self);
                    }, 3000 + Math.round(Math.random() * 1000));
                    return;
                }
                this._clientID = message.body.client;
                self._refreshTimeout = window.setTimeout(function () {
                    self._refresh.call(self);
                }, message.body.ttl * 1000);
            }
        } else {
            this.trigger('error', [{"message": message}]);
        }
    };

    centrifugeProto._dispatchMessage = function(message) {
        if (message === undefined || message === null) {
            this._debug("dispatch: got undefined or null message");
            return;
        }

        var method = message.method;

        if (!method) {
            this._debug("dispatch: got message with empty method");
            return;
        }

        switch (method) {
            case 'connect':
                this._connectResponse(message);
                break;
            case 'disconnect':
                this._disconnectResponse(message);
                break;
            case 'subscribe':
                this._subscribeResponse(message);
                break;
            case 'unsubscribe':
                this._unsubscribeResponse(message);
                break;
            case 'publish':
                this._publishResponse(message);
                break;
            case 'presence':
                this._presenceResponse(message);
                break;
            case 'history':
                this._historyResponse(message);
                break;
            case 'join':
                this._joinResponse(message);
                break;
            case 'leave':
                this._leaveResponse(message);
                break;
            case 'ping':
                break;
            case 'refresh':
                this._refreshResponse(message);
                break;
            case 'message':
                this._messageResponse(message);
                break;
            default:
                this._debug("dispatch: got message with unknown method" + method);
                break;
        }
    };

    centrifugeProto._receive = function (data) {
        if (Object.prototype.toString.call(data) === Object.prototype.toString.call([])) {
            // array of responses received
            for (var i in data) {
                if (data.hasOwnProperty(i)) {
                    var msg = data[i];
                    this._dispatchMessage(msg);
                }
            }
        } else if (Object.prototype.toString.call(data) === Object.prototype.toString.call({})) {
            // one response received
            this._dispatchMessage(data);
        }
    };

    centrifugeProto._flush = function() {
        var messages = this._messages.slice(0);
        this._messages = [];
        this._send(messages);
    };

    centrifugeProto._ping = function () {
        var msg = {
            "method": "ping",
            "params": {}
        };
        this._addMessage(msg);
    };

    centrifugeProto._recover = function(channel) {
        return channel in this._lastMessageID;
    };

    centrifugeProto._getLastID = function(channel) {
        var lastUID = this._lastMessageID[channel];
        if (lastUID) {
            this._debug("last uid found and sent for channel", channel);
            return lastUID;
        } else {
            this._debug("no last uid found for channel", channel);
            return "";
        }
    };

    centrifugeProto._createErrorObject = function(err, advice) {
        var errObject = {
            "error": err
        };
        if (advice) {
           errObject["advice"] = advice;
        }
        return errObject;
    };

    centrifugeProto._errorObjectFromMessage = function(message) {
        var err = message.error;
        var advice = message["advice"];
        return this._createErrorObject(err, advice);
    };

    centrifugeProto._registerCall = function(uid, callback, errback) {
        var self = this;
        this._callbacks[uid] = {
            "callback": callback,
            "errback": errback
        };
        setTimeout(function() {
            delete self._callbacks[uid];
            if (isFunction(errback)) {
                errback(self._createErrorObject("timeout", "retry"));
            }
        }, this._config.timeout);
    };

    centrifugeProto._addMessage = function (message) {
        var uid = '' + this._nextMessageId();
        message.uid = uid;
        if (this._isBatching === true) {
            this._messages.push(message);
        } else {
            this._send([message]);
        }
        return uid;
    };

    centrifugeProto.getClientId = function () {
        return this._clientID;
    };

    centrifugeProto.isConnected = centrifugeProto._isConnected;

    centrifugeProto.isDisconnected = centrifugeProto._isDisconnected;

    centrifugeProto.configure = function (configuration) {
        this._configure.call(this, configuration);
    };

    centrifugeProto.connect = centrifugeProto._connect;

    centrifugeProto.disconnect = function() {
        this._disconnect("client", false, true);
    };

    centrifugeProto.ping = centrifugeProto._ping;

    centrifugeProto.startBatching = function () {
        // start collecting messages without sending them to Centrifuge until flush
        // method called
        this._isBatching = true;
    };

    centrifugeProto.stopBatching = function(flush) {
        // stop collecting messages
        flush = flush || false;
        this._isBatching = false;
        if (flush === true) {
            this.flush();
        }
    };

    centrifugeProto.flush = function() {
        // send batched messages to Centrifuge
        this._flush();
    };

    centrifugeProto.startAuthBatching = function() {
        // start collecting private channels to create bulk authentication
        // request to authEndpoint when stopAuthBatching will be called
        this._isAuthBatching = true;
    };

    centrifugeProto.stopAuthBatching = function() {
        // create request to authEndpoint with collected private channels
        // to ask if this client can subscribe on each channel
        this._isAuthBatching = false;
        var authChannels = this._authChannels;
        this._authChannels = {};
        var channels = [];

        for (var channel in authChannels) {
            var sub = this._getSub(channel);
            if (!sub) {
                continue;
            }
            channels.push(channel);
        }

        if (channels.length == 0) {
            return;
        }

        var data = {
            "client": this.getClientId(),
            "channels": channels
        };

        var self = this;

        var cb = function(error, data) {
            if (error === true) {
                self._debug("authorization request failed");
                for (var i in channels) {
                    var channel = channels[i];
                    self._subscribeResponse({
                        "error": "authorization request failed",
                        "advice": "fix",
                        "body": {
                            "channel": channel
                        }
                    });
                }
                return;
            }

            // try to send all subscriptions in one request.
            var batch = false;
            if (!self._isBatching) {
                self.startBatching();
                batch = true;
            }

            for (var i in channels) {
                var channel = channels[i];
                var channelResponse = data[channel];
                if (!channelResponse) {
                    // subscription:error
                    self._subscribeResponse({
                        "error": "channel not found in authorization response",
                        "advice": "fix",
                        "body": {
                            "channel": channel
                        }
                    });
                    continue;
                }
                if (!channelResponse.status || channelResponse.status === 200) {
                    var msg = {
                        "method": "subscribe",
                        "params": {
                            "channel": channel,
                            "client": self.getClientId(),
                            "info": channelResponse.info,
                            "sign": channelResponse.sign
                        }
                    };
                    var recover = self._recover(channel);
                    if (recover === true) {
                        msg["params"]["recover"] = true;
                        msg["params"]["last"] = self._getLastID(channel);
                    }
                    self._addMessage(msg);
                } else {
                    self._subscribeResponse({
                        "error": channelResponse.status,
                        "body": {
                            "channel": channel
                        }
                    });
                }
            }

            if (batch) {
                self.stopBatching(true);
            }

        };

        var transport = this._config.authTransport.toLowerCase();
        if (transport === "ajax") {
            this._ajax(this._config.authEndpoint, this._config.authParams, this._config.authHeaders, data, cb);
        } else if (transport === "jsonp") {
            this._jsonp(this._config.authEndpoint, this._config.authParams, this._config.authHeaders, data, cb);
        } else {
            throw 'Unknown auth transport ' + transport;
        }
    };

    centrifugeProto.subscribe = function (channel, events) {
        if (arguments.length < 1) {
            throw 'Illegal arguments number: required 1, got ' + arguments.length;
        }
        if (!isString(channel)) {
            throw 'Illegal argument type: channel must be a string';
        }
        if (!this._config.resubscribe && !this.isConnected()) {
            throw 'Can not only subscribe in connected state when resubscribe option is off';
        }

        var currentSub = this._getSub(channel);

        if (currentSub !== null) {
            currentSub._setEvents(events);
            return currentSub;
        } else {
            var sub = new Sub(this, channel, events);
            this._subs[channel] = sub;
            sub.subscribe();
            return sub;
        }
    };

    var _STATE_NEW = 0;
    var _STATE_SUBSCRIBING = 1;
    var _STATE_SUCCESS = 2;
    var _STATE_ERROR = 3;
    var _STATE_UNSUBSCRIBED = 4;

    function Sub(centrifuge, channel, events) {
        this._status = _STATE_NEW;
        this._error = null;
        this._centrifuge = centrifuge;
        this.channel = channel;
        this._setEvents(events);
        this._isResubscribe = false;
        this._ready = false;
        this._promise = null;
        this._initializePromise();
    }

    extend(Sub, EventEmitter);

    var subProto = Sub.prototype;

    subProto._initializePromise = function() {
        this._ready = false;
        var self = this;
        this._promise = new Promise(function(resolve, reject) {
            self._resolve = function(value) {
                self._ready = true;
                resolve(value);
            };
            self._reject = function(err) {
                self._ready = true;
                reject(err);
            };
        });
    };

    subProto._setEvents = function(events) {
        if (!events) {
            return;
        }
        if (isFunction(events)) {
            this.on("message", events);
        } else if (Object.prototype.toString.call(events) === Object.prototype.toString.call({})) {
            var knownEvents = [
                "message", "join", "leave", "unsubscribe",
                "subscribe", "error"
            ];
            for (var i in knownEvents) {
                var ev = knownEvents[i];
                if (ev in events) {
                    this.on(ev, events[ev]);
                }
            }
        }
    };

    subProto._isNew = function() {
        return this._status === _STATE_NEW;
    };

    subProto._isUnsubscribed = function() {
        return this._status === _STATE_UNSUBSCRIBED;
    };

    subProto._isSubscribing = function() {
        return this._status === _STATE_SUBSCRIBING;
    };

    subProto._isReady = function() {
        return this._status === _STATE_SUCCESS || this._status === _STATE_ERROR;
    };

    subProto._isSuccess = function() {
        return this._status === _STATE_SUCCESS;
    };

    subProto._isError = function() {
        return this._status === _STATE_ERROR;
    };

    subProto._setNew = function() {
        this._status = _STATE_NEW;
    };

    subProto._setSubscribing = function() {
        if (this._ready === true) {
            // new promise for this subscription
            this._initializePromise();
            this._isResubscribe = true;
        }
        this._status = _STATE_SUBSCRIBING;
    };

    subProto._setSubscribeSuccess = function() {
        if (this._status == _STATE_SUCCESS) {
            return;
        }
        this._status = _STATE_SUCCESS;
        var successContext = this._getSubscribeSuccessContext();
        this.trigger("subscribe", [successContext]);
        this._resolve(successContext);
    };

    subProto._setSubscribeError = function(err) {
        if (this._status == _STATE_ERROR) {
            return;
        }
        this._status = _STATE_ERROR;
        this._error = err;
        var errContext = this._getSubscribeErrorContext();
        this.trigger("error", [errContext]);
        this._reject(errContext);
    };

    subProto._triggerUnsubscribe = function() {
        var unsubscribeContext = {
            "channel": this.channel
        };
        this.trigger("unsubscribe", [unsubscribeContext]);
    };

    subProto._setUnsubscribed = function() {
        if (this._status == _STATE_UNSUBSCRIBED) {
            return;
        }
        this._status = _STATE_UNSUBSCRIBED;
        this._triggerUnsubscribe();
    };

    subProto._getSubscribeSuccessContext = function() {
        return {
            "channel": this.channel,
            "isResubscribe": this._isResubscribe
        };
    };

    subProto._getSubscribeErrorContext = function() {
        var subscribeErrorContext = this._error;
        subscribeErrorContext["channel"] = this.channel;
        subscribeErrorContext["isResubscribe"] = this._isResubscribe;
        return subscribeErrorContext;
    };

    subProto.ready = function(callback, errback) {
        if (this._ready) {
            if (this._isSuccess()) {
                callback(this._getSubscribeSuccessContext());
            } else {
                errback(this._getSubscribeErrorContext());
            }
        }
    };

    subProto.subscribe = function() {
        if (this._status == _STATE_SUCCESS) {
            return;
        }
        this._centrifuge._subscribe(this);
        return this;
    };

    subProto.unsubscribe = function () {
        this._setUnsubscribed();
        this._centrifuge._unsubscribe(this);
    };

    subProto.publish = function (data) {
        var self = this;
        return new Promise(function(resolve, reject) {
            if (self._isUnsubscribed()) {
                reject(self._centrifuge._createErrorObject("subscription unsubscribed", "fix"));
                return;
            }
            self._promise.then(function(){
                if (!self._centrifuge.isConnected()) {
                    reject(self._centrifuge._createErrorObject("disconnected", "retry"));
                    return;
                }
                var msg = {
                    "method": "publish",
                    "params": {
                        "channel": self.channel,
                        "data": data
                    }
                };
                var uid = self._centrifuge._addMessage(msg);
                self._centrifuge._registerCall(uid, resolve, reject);
            }, function(err){
                reject(err);
            });
        });
    };

    subProto.presence = function() {
        var self = this;
        return new Promise(function(resolve, reject) {
            if (self._isUnsubscribed()) {
                reject(self._centrifuge._createErrorObject("subscription unsubscribed", "fix"));
                return;
            }
            self._promise.then(function(){
                if (!self._centrifuge.isConnected()) {
                    reject(self._centrifuge._createErrorObject("disconnected", "retry"));
                    return;
                }
                var msg = {
                    "method": "presence",
                    "params": {
                        "channel": self.channel
                    }
                };
                var uid = self._centrifuge._addMessage(msg);
                self._centrifuge._registerCall(uid, resolve, reject);
            }, function(err){
                reject(err);
            });
        });
    };

    subProto.history = function() {
        var self = this;
        return new Promise(function(resolve, reject) {
            if (self._isUnsubscribed()) {
                reject(self._centrifuge._createErrorObject("subscription unsubscribed", "fix"));
                return;
            }
            self._promise.then(function(){
                if (!self._centrifuge.isConnected()) {
                    reject(self._centrifuge._createErrorObject("disconnected", "retry"));
                    return;
                }
                var msg = {
                    "method": "history",
                    "params": {
                        "channel": self.channel
                    }
                };
                var uid = self._centrifuge._addMessage(msg);
                self._centrifuge._registerCall(uid, resolve, reject);
            }, function(err){
                reject(err);
            });
        });
    };

    // Expose the class either via AMD, CommonJS or the global object
    if (typeof define === 'function' && define.amd) {
        define(function () {
            return Centrifuge;
        });
    } else if (typeof module === 'object' && module.exports) {
        //noinspection JSUnresolvedVariable
        module.exports = Centrifuge;
    } else {
        //noinspection JSUnusedGlobalSymbols
        this.Centrifuge = Centrifuge;
    }

}.call(this));

}).call(this,require('_process'),typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

},{"_process":3}],2:[function(require,module,exports){
var Centrifuge = require('centrifuge')

var ts = Math.round((new Date()).getTime() / 1000);

var centrifuge = new Centrifuge({
    url: 'ws://localhost:8080/connection/websocket',
    user: "alfred",
    timestamp: "" + ts,
    token: "SHA-256 HMAC TOKEN",
    debug: true
});

//    centrifuge.subscribe("news", function(message) {
//        console.log(message);
//    });

//    centrifuge.connect();


},{"centrifuge":1}],3:[function(require,module,exports){
// shim for using process in browser

var process = module.exports = {};
var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
    draining = false;
    if (currentQueue.length) {
        queue = currentQueue.concat(queue);
    } else {
        queueIndex = -1;
    }
    if (queue.length) {
        drainQueue();
    }
}

function drainQueue() {
    if (draining) {
        return;
    }
    var timeout = setTimeout(cleanUpNextTick);
    draining = true;

    var len = queue.length;
    while(len) {
        currentQueue = queue;
        queue = [];
        while (++queueIndex < len) {
            if (currentQueue) {
                currentQueue[queueIndex].run();
            }
        }
        queueIndex = -1;
        len = queue.length;
    }
    currentQueue = null;
    draining = false;
    clearTimeout(timeout);
}

process.nextTick = function (fun) {
    var args = new Array(arguments.length - 1);
    if (arguments.length > 1) {
        for (var i = 1; i < arguments.length; i++) {
            args[i - 1] = arguments[i];
        }
    }
    queue.push(new Item(fun, args));
    if (queue.length === 1 && !draining) {
        setTimeout(drainQueue, 0);
    }
};

// v8 likes predictible objects
function Item(fun, array) {
    this.fun = fun;
    this.array = array;
}
Item.prototype.run = function () {
    this.fun.apply(null, this.array);
};
process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues
process.versions = {};

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};
process.umask = function() { return 0; };

},{}]},{},[2])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL25vZGVqcy9ub2RlLXY0LjEuMS1saW51eC14NjQvbGliL25vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJub2RlX21vZHVsZXMvY2VudHJpZnVnZS9jZW50cmlmdWdlLmpzIiwidGVzdC5qcyIsIi4uLy4uL25vZGVqcy9ub2RlLXY0LjEuMS1saW51eC14NjQvbGliL25vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9wcm9jZXNzL2Jyb3dzZXIuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7O0FDQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7O0FDbi9DQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNsQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCI7KGZ1bmN0aW9uICgpIHtcbiAgICAndXNlIHN0cmljdCc7XG5cbiAgICAvKiFcbiAgICAgKiBAb3ZlcnZpZXcgZXM2LXByb21pc2UgLSBhIHRpbnkgaW1wbGVtZW50YXRpb24gb2YgUHJvbWlzZXMvQSsuXG4gICAgICogQGNvcHlyaWdodCBDb3B5cmlnaHQgKGMpIDIwMTQgWWVodWRhIEthdHosIFRvbSBEYWxlLCBTdGVmYW4gUGVubmVyIGFuZCBjb250cmlidXRvcnMgKENvbnZlcnNpb24gdG8gRVM2IEFQSSBieSBKYWtlIEFyY2hpYmFsZClcbiAgICAgKiBAbGljZW5zZSAgIExpY2Vuc2VkIHVuZGVyIE1JVCBsaWNlbnNlXG4gICAgICogICAgICAgICAgICBTZWUgaHR0cHM6Ly9yYXcuZ2l0aHVidXNlcmNvbnRlbnQuY29tL2pha2VhcmNoaWJhbGQvZXM2LXByb21pc2UvbWFzdGVyL0xJQ0VOU0VcbiAgICAgKiBAdmVyc2lvbiAgIDMuMC4yXG4gICAgICovXG4gICAgKGZ1bmN0aW9uKCl7XCJ1c2Ugc3RyaWN0XCI7ZnVuY3Rpb24gbGliJGVzNiRwcm9taXNlJHV0aWxzJCRvYmplY3RPckZ1bmN0aW9uKHgpe3JldHVybiB0eXBlb2YgeD09PVwiZnVuY3Rpb25cInx8dHlwZW9mIHg9PT1cIm9iamVjdFwiJiZ4IT09bnVsbH1mdW5jdGlvbiBsaWIkZXM2JHByb21pc2UkdXRpbHMkJGlzRnVuY3Rpb24oeCl7cmV0dXJuIHR5cGVvZiB4PT09XCJmdW5jdGlvblwifWZ1bmN0aW9uIGxpYiRlczYkcHJvbWlzZSR1dGlscyQkaXNNYXliZVRoZW5hYmxlKHgpe3JldHVybiB0eXBlb2YgeD09PVwib2JqZWN0XCImJnghPT1udWxsfXZhciBsaWIkZXM2JHByb21pc2UkdXRpbHMkJF9pc0FycmF5O2lmKCFBcnJheS5pc0FycmF5KXtsaWIkZXM2JHByb21pc2UkdXRpbHMkJF9pc0FycmF5PWZ1bmN0aW9uKHgpe3JldHVybiBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwoeCk9PT1cIltvYmplY3QgQXJyYXldXCJ9fWVsc2V7bGliJGVzNiRwcm9taXNlJHV0aWxzJCRfaXNBcnJheT1BcnJheS5pc0FycmF5fXZhciBsaWIkZXM2JHByb21pc2UkdXRpbHMkJGlzQXJyYXk9bGliJGVzNiRwcm9taXNlJHV0aWxzJCRfaXNBcnJheTt2YXIgbGliJGVzNiRwcm9taXNlJGFzYXAkJGxlbj0wO3ZhciBsaWIkZXM2JHByb21pc2UkYXNhcCQkdG9TdHJpbmc9e30udG9TdHJpbmc7dmFyIGxpYiRlczYkcHJvbWlzZSRhc2FwJCR2ZXJ0eE5leHQ7dmFyIGxpYiRlczYkcHJvbWlzZSRhc2FwJCRjdXN0b21TY2hlZHVsZXJGbjt2YXIgbGliJGVzNiRwcm9taXNlJGFzYXAkJGFzYXA9ZnVuY3Rpb24gYXNhcChjYWxsYmFjayxhcmcpe2xpYiRlczYkcHJvbWlzZSRhc2FwJCRxdWV1ZVtsaWIkZXM2JHByb21pc2UkYXNhcCQkbGVuXT1jYWxsYmFjaztsaWIkZXM2JHByb21pc2UkYXNhcCQkcXVldWVbbGliJGVzNiRwcm9taXNlJGFzYXAkJGxlbisxXT1hcmc7bGliJGVzNiRwcm9taXNlJGFzYXAkJGxlbis9MjtpZihsaWIkZXM2JHByb21pc2UkYXNhcCQkbGVuPT09Mil7aWYobGliJGVzNiRwcm9taXNlJGFzYXAkJGN1c3RvbVNjaGVkdWxlckZuKXtsaWIkZXM2JHByb21pc2UkYXNhcCQkY3VzdG9tU2NoZWR1bGVyRm4obGliJGVzNiRwcm9taXNlJGFzYXAkJGZsdXNoKX1lbHNle2xpYiRlczYkcHJvbWlzZSRhc2FwJCRzY2hlZHVsZUZsdXNoKCl9fX07ZnVuY3Rpb24gbGliJGVzNiRwcm9taXNlJGFzYXAkJHNldFNjaGVkdWxlcihzY2hlZHVsZUZuKXtsaWIkZXM2JHByb21pc2UkYXNhcCQkY3VzdG9tU2NoZWR1bGVyRm49c2NoZWR1bGVGbn1mdW5jdGlvbiBsaWIkZXM2JHByb21pc2UkYXNhcCQkc2V0QXNhcChhc2FwRm4pe2xpYiRlczYkcHJvbWlzZSRhc2FwJCRhc2FwPWFzYXBGbn12YXIgbGliJGVzNiRwcm9taXNlJGFzYXAkJGJyb3dzZXJXaW5kb3c9dHlwZW9mIHdpbmRvdyE9PVwidW5kZWZpbmVkXCI/d2luZG93OnVuZGVmaW5lZDt2YXIgbGliJGVzNiRwcm9taXNlJGFzYXAkJGJyb3dzZXJHbG9iYWw9bGliJGVzNiRwcm9taXNlJGFzYXAkJGJyb3dzZXJXaW5kb3d8fHt9O3ZhciBsaWIkZXM2JHByb21pc2UkYXNhcCQkQnJvd3Nlck11dGF0aW9uT2JzZXJ2ZXI9bGliJGVzNiRwcm9taXNlJGFzYXAkJGJyb3dzZXJHbG9iYWwuTXV0YXRpb25PYnNlcnZlcnx8bGliJGVzNiRwcm9taXNlJGFzYXAkJGJyb3dzZXJHbG9iYWwuV2ViS2l0TXV0YXRpb25PYnNlcnZlcjt2YXIgbGliJGVzNiRwcm9taXNlJGFzYXAkJGlzTm9kZT10eXBlb2YgcHJvY2VzcyE9PVwidW5kZWZpbmVkXCImJnt9LnRvU3RyaW5nLmNhbGwocHJvY2Vzcyk9PT1cIltvYmplY3QgcHJvY2Vzc11cIjt2YXIgbGliJGVzNiRwcm9taXNlJGFzYXAkJGlzV29ya2VyPXR5cGVvZiBVaW50OENsYW1wZWRBcnJheSE9PVwidW5kZWZpbmVkXCImJnR5cGVvZiBpbXBvcnRTY3JpcHRzIT09XCJ1bmRlZmluZWRcIiYmdHlwZW9mIE1lc3NhZ2VDaGFubmVsIT09XCJ1bmRlZmluZWRcIjtmdW5jdGlvbiBsaWIkZXM2JHByb21pc2UkYXNhcCQkdXNlTmV4dFRpY2soKXtyZXR1cm4gZnVuY3Rpb24oKXtwcm9jZXNzLm5leHRUaWNrKGxpYiRlczYkcHJvbWlzZSRhc2FwJCRmbHVzaCl9fWZ1bmN0aW9uIGxpYiRlczYkcHJvbWlzZSRhc2FwJCR1c2VWZXJ0eFRpbWVyKCl7cmV0dXJuIGZ1bmN0aW9uKCl7bGliJGVzNiRwcm9taXNlJGFzYXAkJHZlcnR4TmV4dChsaWIkZXM2JHByb21pc2UkYXNhcCQkZmx1c2gpfX1mdW5jdGlvbiBsaWIkZXM2JHByb21pc2UkYXNhcCQkdXNlTXV0YXRpb25PYnNlcnZlcigpe3ZhciBpdGVyYXRpb25zPTA7dmFyIG9ic2VydmVyPW5ldyBsaWIkZXM2JHByb21pc2UkYXNhcCQkQnJvd3Nlck11dGF0aW9uT2JzZXJ2ZXIobGliJGVzNiRwcm9taXNlJGFzYXAkJGZsdXNoKTt2YXIgbm9kZT1kb2N1bWVudC5jcmVhdGVUZXh0Tm9kZShcIlwiKTtvYnNlcnZlci5vYnNlcnZlKG5vZGUse2NoYXJhY3RlckRhdGE6dHJ1ZX0pO3JldHVybiBmdW5jdGlvbigpe25vZGUuZGF0YT1pdGVyYXRpb25zPSsraXRlcmF0aW9ucyUyfX1mdW5jdGlvbiBsaWIkZXM2JHByb21pc2UkYXNhcCQkdXNlTWVzc2FnZUNoYW5uZWwoKXt2YXIgY2hhbm5lbD1uZXcgTWVzc2FnZUNoYW5uZWw7Y2hhbm5lbC5wb3J0MS5vbm1lc3NhZ2U9bGliJGVzNiRwcm9taXNlJGFzYXAkJGZsdXNoO3JldHVybiBmdW5jdGlvbigpe2NoYW5uZWwucG9ydDIucG9zdE1lc3NhZ2UoMCl9fWZ1bmN0aW9uIGxpYiRlczYkcHJvbWlzZSRhc2FwJCR1c2VTZXRUaW1lb3V0KCl7cmV0dXJuIGZ1bmN0aW9uKCl7c2V0VGltZW91dChsaWIkZXM2JHByb21pc2UkYXNhcCQkZmx1c2gsMSl9fXZhciBsaWIkZXM2JHByb21pc2UkYXNhcCQkcXVldWU9bmV3IEFycmF5KDFlMyk7ZnVuY3Rpb24gbGliJGVzNiRwcm9taXNlJGFzYXAkJGZsdXNoKCl7Zm9yKHZhciBpPTA7aTxsaWIkZXM2JHByb21pc2UkYXNhcCQkbGVuO2krPTIpe3ZhciBjYWxsYmFjaz1saWIkZXM2JHByb21pc2UkYXNhcCQkcXVldWVbaV07dmFyIGFyZz1saWIkZXM2JHByb21pc2UkYXNhcCQkcXVldWVbaSsxXTtjYWxsYmFjayhhcmcpO2xpYiRlczYkcHJvbWlzZSRhc2FwJCRxdWV1ZVtpXT11bmRlZmluZWQ7bGliJGVzNiRwcm9taXNlJGFzYXAkJHF1ZXVlW2krMV09dW5kZWZpbmVkfWxpYiRlczYkcHJvbWlzZSRhc2FwJCRsZW49MH1mdW5jdGlvbiBsaWIkZXM2JHByb21pc2UkYXNhcCQkYXR0ZW1wdFZlcnR4KCl7dHJ5e3ZhciByPXJlcXVpcmU7dmFyIHZlcnR4PXIoXCJ2ZXJ0eFwiKTtsaWIkZXM2JHByb21pc2UkYXNhcCQkdmVydHhOZXh0PXZlcnR4LnJ1bk9uTG9vcHx8dmVydHgucnVuT25Db250ZXh0O3JldHVybiBsaWIkZXM2JHByb21pc2UkYXNhcCQkdXNlVmVydHhUaW1lcigpfWNhdGNoKGUpe3JldHVybiBsaWIkZXM2JHByb21pc2UkYXNhcCQkdXNlU2V0VGltZW91dCgpfX12YXIgbGliJGVzNiRwcm9taXNlJGFzYXAkJHNjaGVkdWxlRmx1c2g7aWYobGliJGVzNiRwcm9taXNlJGFzYXAkJGlzTm9kZSl7bGliJGVzNiRwcm9taXNlJGFzYXAkJHNjaGVkdWxlRmx1c2g9bGliJGVzNiRwcm9taXNlJGFzYXAkJHVzZU5leHRUaWNrKCl9ZWxzZSBpZihsaWIkZXM2JHByb21pc2UkYXNhcCQkQnJvd3Nlck11dGF0aW9uT2JzZXJ2ZXIpe2xpYiRlczYkcHJvbWlzZSRhc2FwJCRzY2hlZHVsZUZsdXNoPWxpYiRlczYkcHJvbWlzZSRhc2FwJCR1c2VNdXRhdGlvbk9ic2VydmVyKCl9ZWxzZSBpZihsaWIkZXM2JHByb21pc2UkYXNhcCQkaXNXb3JrZXIpe2xpYiRlczYkcHJvbWlzZSRhc2FwJCRzY2hlZHVsZUZsdXNoPWxpYiRlczYkcHJvbWlzZSRhc2FwJCR1c2VNZXNzYWdlQ2hhbm5lbCgpfWVsc2UgaWYobGliJGVzNiRwcm9taXNlJGFzYXAkJGJyb3dzZXJXaW5kb3c9PT11bmRlZmluZWQmJnR5cGVvZiByZXF1aXJlPT09XCJmdW5jdGlvblwiKXtsaWIkZXM2JHByb21pc2UkYXNhcCQkc2NoZWR1bGVGbHVzaD1saWIkZXM2JHByb21pc2UkYXNhcCQkYXR0ZW1wdFZlcnR4KCl9ZWxzZXtsaWIkZXM2JHByb21pc2UkYXNhcCQkc2NoZWR1bGVGbHVzaD1saWIkZXM2JHByb21pc2UkYXNhcCQkdXNlU2V0VGltZW91dCgpfWZ1bmN0aW9uIGxpYiRlczYkcHJvbWlzZSQkaW50ZXJuYWwkJG5vb3AoKXt9dmFyIGxpYiRlczYkcHJvbWlzZSQkaW50ZXJuYWwkJFBFTkRJTkc9dm9pZCAwO3ZhciBsaWIkZXM2JHByb21pc2UkJGludGVybmFsJCRGVUxGSUxMRUQ9MTt2YXIgbGliJGVzNiRwcm9taXNlJCRpbnRlcm5hbCQkUkVKRUNURUQ9Mjt2YXIgbGliJGVzNiRwcm9taXNlJCRpbnRlcm5hbCQkR0VUX1RIRU5fRVJST1I9bmV3IGxpYiRlczYkcHJvbWlzZSQkaW50ZXJuYWwkJEVycm9yT2JqZWN0O2Z1bmN0aW9uIGxpYiRlczYkcHJvbWlzZSQkaW50ZXJuYWwkJHNlbGZGdWxmaWxsbWVudCgpe3JldHVybiBuZXcgVHlwZUVycm9yKFwiWW91IGNhbm5vdCByZXNvbHZlIGEgcHJvbWlzZSB3aXRoIGl0c2VsZlwiKX1mdW5jdGlvbiBsaWIkZXM2JHByb21pc2UkJGludGVybmFsJCRjYW5ub3RSZXR1cm5Pd24oKXtyZXR1cm4gbmV3IFR5cGVFcnJvcihcIkEgcHJvbWlzZXMgY2FsbGJhY2sgY2Fubm90IHJldHVybiB0aGF0IHNhbWUgcHJvbWlzZS5cIil9ZnVuY3Rpb24gbGliJGVzNiRwcm9taXNlJCRpbnRlcm5hbCQkZ2V0VGhlbihwcm9taXNlKXt0cnl7cmV0dXJuIHByb21pc2UudGhlbn1jYXRjaChlcnJvcil7bGliJGVzNiRwcm9taXNlJCRpbnRlcm5hbCQkR0VUX1RIRU5fRVJST1IuZXJyb3I9ZXJyb3I7cmV0dXJuIGxpYiRlczYkcHJvbWlzZSQkaW50ZXJuYWwkJEdFVF9USEVOX0VSUk9SfX1mdW5jdGlvbiBsaWIkZXM2JHByb21pc2UkJGludGVybmFsJCR0cnlUaGVuKHRoZW4sdmFsdWUsZnVsZmlsbG1lbnRIYW5kbGVyLHJlamVjdGlvbkhhbmRsZXIpe3RyeXt0aGVuLmNhbGwodmFsdWUsZnVsZmlsbG1lbnRIYW5kbGVyLHJlamVjdGlvbkhhbmRsZXIpfWNhdGNoKGUpe3JldHVybiBlfX1mdW5jdGlvbiBsaWIkZXM2JHByb21pc2UkJGludGVybmFsJCRoYW5kbGVGb3JlaWduVGhlbmFibGUocHJvbWlzZSx0aGVuYWJsZSx0aGVuKXtsaWIkZXM2JHByb21pc2UkYXNhcCQkYXNhcChmdW5jdGlvbihwcm9taXNlKXt2YXIgc2VhbGVkPWZhbHNlO3ZhciBlcnJvcj1saWIkZXM2JHByb21pc2UkJGludGVybmFsJCR0cnlUaGVuKHRoZW4sdGhlbmFibGUsZnVuY3Rpb24odmFsdWUpe2lmKHNlYWxlZCl7cmV0dXJufXNlYWxlZD10cnVlO2lmKHRoZW5hYmxlIT09dmFsdWUpe2xpYiRlczYkcHJvbWlzZSQkaW50ZXJuYWwkJHJlc29sdmUocHJvbWlzZSx2YWx1ZSl9ZWxzZXtsaWIkZXM2JHByb21pc2UkJGludGVybmFsJCRmdWxmaWxsKHByb21pc2UsdmFsdWUpfX0sZnVuY3Rpb24ocmVhc29uKXtpZihzZWFsZWQpe3JldHVybn1zZWFsZWQ9dHJ1ZTtsaWIkZXM2JHByb21pc2UkJGludGVybmFsJCRyZWplY3QocHJvbWlzZSxyZWFzb24pfSxcIlNldHRsZTogXCIrKHByb21pc2UuX2xhYmVsfHxcIiB1bmtub3duIHByb21pc2VcIikpO2lmKCFzZWFsZWQmJmVycm9yKXtzZWFsZWQ9dHJ1ZTtsaWIkZXM2JHByb21pc2UkJGludGVybmFsJCRyZWplY3QocHJvbWlzZSxlcnJvcil9fSxwcm9taXNlKX1mdW5jdGlvbiBsaWIkZXM2JHByb21pc2UkJGludGVybmFsJCRoYW5kbGVPd25UaGVuYWJsZShwcm9taXNlLHRoZW5hYmxlKXtpZih0aGVuYWJsZS5fc3RhdGU9PT1saWIkZXM2JHByb21pc2UkJGludGVybmFsJCRGVUxGSUxMRUQpe2xpYiRlczYkcHJvbWlzZSQkaW50ZXJuYWwkJGZ1bGZpbGwocHJvbWlzZSx0aGVuYWJsZS5fcmVzdWx0KX1lbHNlIGlmKHRoZW5hYmxlLl9zdGF0ZT09PWxpYiRlczYkcHJvbWlzZSQkaW50ZXJuYWwkJFJFSkVDVEVEKXtsaWIkZXM2JHByb21pc2UkJGludGVybmFsJCRyZWplY3QocHJvbWlzZSx0aGVuYWJsZS5fcmVzdWx0KX1lbHNle2xpYiRlczYkcHJvbWlzZSQkaW50ZXJuYWwkJHN1YnNjcmliZSh0aGVuYWJsZSx1bmRlZmluZWQsZnVuY3Rpb24odmFsdWUpe2xpYiRlczYkcHJvbWlzZSQkaW50ZXJuYWwkJHJlc29sdmUocHJvbWlzZSx2YWx1ZSl9LGZ1bmN0aW9uKHJlYXNvbil7bGliJGVzNiRwcm9taXNlJCRpbnRlcm5hbCQkcmVqZWN0KHByb21pc2UscmVhc29uKX0pfX1mdW5jdGlvbiBsaWIkZXM2JHByb21pc2UkJGludGVybmFsJCRoYW5kbGVNYXliZVRoZW5hYmxlKHByb21pc2UsbWF5YmVUaGVuYWJsZSl7aWYobWF5YmVUaGVuYWJsZS5jb25zdHJ1Y3Rvcj09PXByb21pc2UuY29uc3RydWN0b3Ipe2xpYiRlczYkcHJvbWlzZSQkaW50ZXJuYWwkJGhhbmRsZU93blRoZW5hYmxlKHByb21pc2UsbWF5YmVUaGVuYWJsZSl9ZWxzZXt2YXIgdGhlbj1saWIkZXM2JHByb21pc2UkJGludGVybmFsJCRnZXRUaGVuKG1heWJlVGhlbmFibGUpO2lmKHRoZW49PT1saWIkZXM2JHByb21pc2UkJGludGVybmFsJCRHRVRfVEhFTl9FUlJPUil7bGliJGVzNiRwcm9taXNlJCRpbnRlcm5hbCQkcmVqZWN0KHByb21pc2UsbGliJGVzNiRwcm9taXNlJCRpbnRlcm5hbCQkR0VUX1RIRU5fRVJST1IuZXJyb3IpfWVsc2UgaWYodGhlbj09PXVuZGVmaW5lZCl7bGliJGVzNiRwcm9taXNlJCRpbnRlcm5hbCQkZnVsZmlsbChwcm9taXNlLG1heWJlVGhlbmFibGUpfWVsc2UgaWYobGliJGVzNiRwcm9taXNlJHV0aWxzJCRpc0Z1bmN0aW9uKHRoZW4pKXtsaWIkZXM2JHByb21pc2UkJGludGVybmFsJCRoYW5kbGVGb3JlaWduVGhlbmFibGUocHJvbWlzZSxtYXliZVRoZW5hYmxlLHRoZW4pfWVsc2V7bGliJGVzNiRwcm9taXNlJCRpbnRlcm5hbCQkZnVsZmlsbChwcm9taXNlLG1heWJlVGhlbmFibGUpfX19ZnVuY3Rpb24gbGliJGVzNiRwcm9taXNlJCRpbnRlcm5hbCQkcmVzb2x2ZShwcm9taXNlLHZhbHVlKXtpZihwcm9taXNlPT09dmFsdWUpe2xpYiRlczYkcHJvbWlzZSQkaW50ZXJuYWwkJHJlamVjdChwcm9taXNlLGxpYiRlczYkcHJvbWlzZSQkaW50ZXJuYWwkJHNlbGZGdWxmaWxsbWVudCgpKX1lbHNlIGlmKGxpYiRlczYkcHJvbWlzZSR1dGlscyQkb2JqZWN0T3JGdW5jdGlvbih2YWx1ZSkpe2xpYiRlczYkcHJvbWlzZSQkaW50ZXJuYWwkJGhhbmRsZU1heWJlVGhlbmFibGUocHJvbWlzZSx2YWx1ZSl9ZWxzZXtsaWIkZXM2JHByb21pc2UkJGludGVybmFsJCRmdWxmaWxsKHByb21pc2UsdmFsdWUpfX1mdW5jdGlvbiBsaWIkZXM2JHByb21pc2UkJGludGVybmFsJCRwdWJsaXNoUmVqZWN0aW9uKHByb21pc2Upe2lmKHByb21pc2UuX29uZXJyb3Ipe3Byb21pc2UuX29uZXJyb3IocHJvbWlzZS5fcmVzdWx0KX1saWIkZXM2JHByb21pc2UkJGludGVybmFsJCRwdWJsaXNoKHByb21pc2UpfWZ1bmN0aW9uIGxpYiRlczYkcHJvbWlzZSQkaW50ZXJuYWwkJGZ1bGZpbGwocHJvbWlzZSx2YWx1ZSl7aWYocHJvbWlzZS5fc3RhdGUhPT1saWIkZXM2JHByb21pc2UkJGludGVybmFsJCRQRU5ESU5HKXtyZXR1cm59cHJvbWlzZS5fcmVzdWx0PXZhbHVlO3Byb21pc2UuX3N0YXRlPWxpYiRlczYkcHJvbWlzZSQkaW50ZXJuYWwkJEZVTEZJTExFRDtpZihwcm9taXNlLl9zdWJzY3JpYmVycy5sZW5ndGghPT0wKXtsaWIkZXM2JHByb21pc2UkYXNhcCQkYXNhcChsaWIkZXM2JHByb21pc2UkJGludGVybmFsJCRwdWJsaXNoLHByb21pc2UpfX1mdW5jdGlvbiBsaWIkZXM2JHByb21pc2UkJGludGVybmFsJCRyZWplY3QocHJvbWlzZSxyZWFzb24pe2lmKHByb21pc2UuX3N0YXRlIT09bGliJGVzNiRwcm9taXNlJCRpbnRlcm5hbCQkUEVORElORyl7cmV0dXJufXByb21pc2UuX3N0YXRlPWxpYiRlczYkcHJvbWlzZSQkaW50ZXJuYWwkJFJFSkVDVEVEO3Byb21pc2UuX3Jlc3VsdD1yZWFzb247bGliJGVzNiRwcm9taXNlJGFzYXAkJGFzYXAobGliJGVzNiRwcm9taXNlJCRpbnRlcm5hbCQkcHVibGlzaFJlamVjdGlvbixwcm9taXNlKX1mdW5jdGlvbiBsaWIkZXM2JHByb21pc2UkJGludGVybmFsJCRzdWJzY3JpYmUocGFyZW50LGNoaWxkLG9uRnVsZmlsbG1lbnQsb25SZWplY3Rpb24pe3ZhciBzdWJzY3JpYmVycz1wYXJlbnQuX3N1YnNjcmliZXJzO3ZhciBsZW5ndGg9c3Vic2NyaWJlcnMubGVuZ3RoO3BhcmVudC5fb25lcnJvcj1udWxsO3N1YnNjcmliZXJzW2xlbmd0aF09Y2hpbGQ7c3Vic2NyaWJlcnNbbGVuZ3RoK2xpYiRlczYkcHJvbWlzZSQkaW50ZXJuYWwkJEZVTEZJTExFRF09b25GdWxmaWxsbWVudDtzdWJzY3JpYmVyc1tsZW5ndGgrbGliJGVzNiRwcm9taXNlJCRpbnRlcm5hbCQkUkVKRUNURURdPW9uUmVqZWN0aW9uO2lmKGxlbmd0aD09PTAmJnBhcmVudC5fc3RhdGUpe2xpYiRlczYkcHJvbWlzZSRhc2FwJCRhc2FwKGxpYiRlczYkcHJvbWlzZSQkaW50ZXJuYWwkJHB1Ymxpc2gscGFyZW50KX19ZnVuY3Rpb24gbGliJGVzNiRwcm9taXNlJCRpbnRlcm5hbCQkcHVibGlzaChwcm9taXNlKXt2YXIgc3Vic2NyaWJlcnM9cHJvbWlzZS5fc3Vic2NyaWJlcnM7dmFyIHNldHRsZWQ9cHJvbWlzZS5fc3RhdGU7aWYoc3Vic2NyaWJlcnMubGVuZ3RoPT09MCl7cmV0dXJufXZhciBjaGlsZCxjYWxsYmFjayxkZXRhaWw9cHJvbWlzZS5fcmVzdWx0O2Zvcih2YXIgaT0wO2k8c3Vic2NyaWJlcnMubGVuZ3RoO2krPTMpe2NoaWxkPXN1YnNjcmliZXJzW2ldO2NhbGxiYWNrPXN1YnNjcmliZXJzW2krc2V0dGxlZF07aWYoY2hpbGQpe2xpYiRlczYkcHJvbWlzZSQkaW50ZXJuYWwkJGludm9rZUNhbGxiYWNrKHNldHRsZWQsY2hpbGQsY2FsbGJhY2ssZGV0YWlsKX1lbHNle2NhbGxiYWNrKGRldGFpbCl9fXByb21pc2UuX3N1YnNjcmliZXJzLmxlbmd0aD0wfWZ1bmN0aW9uIGxpYiRlczYkcHJvbWlzZSQkaW50ZXJuYWwkJEVycm9yT2JqZWN0KCl7dGhpcy5lcnJvcj1udWxsfXZhciBsaWIkZXM2JHByb21pc2UkJGludGVybmFsJCRUUllfQ0FUQ0hfRVJST1I9bmV3IGxpYiRlczYkcHJvbWlzZSQkaW50ZXJuYWwkJEVycm9yT2JqZWN0O2Z1bmN0aW9uIGxpYiRlczYkcHJvbWlzZSQkaW50ZXJuYWwkJHRyeUNhdGNoKGNhbGxiYWNrLGRldGFpbCl7dHJ5e3JldHVybiBjYWxsYmFjayhkZXRhaWwpfWNhdGNoKGUpe2xpYiRlczYkcHJvbWlzZSQkaW50ZXJuYWwkJFRSWV9DQVRDSF9FUlJPUi5lcnJvcj1lO3JldHVybiBsaWIkZXM2JHByb21pc2UkJGludGVybmFsJCRUUllfQ0FUQ0hfRVJST1J9fWZ1bmN0aW9uIGxpYiRlczYkcHJvbWlzZSQkaW50ZXJuYWwkJGludm9rZUNhbGxiYWNrKHNldHRsZWQscHJvbWlzZSxjYWxsYmFjayxkZXRhaWwpe3ZhciBoYXNDYWxsYmFjaz1saWIkZXM2JHByb21pc2UkdXRpbHMkJGlzRnVuY3Rpb24oY2FsbGJhY2spLHZhbHVlLGVycm9yLHN1Y2NlZWRlZCxmYWlsZWQ7aWYoaGFzQ2FsbGJhY2spe3ZhbHVlPWxpYiRlczYkcHJvbWlzZSQkaW50ZXJuYWwkJHRyeUNhdGNoKGNhbGxiYWNrLGRldGFpbCk7aWYodmFsdWU9PT1saWIkZXM2JHByb21pc2UkJGludGVybmFsJCRUUllfQ0FUQ0hfRVJST1Ipe2ZhaWxlZD10cnVlO2Vycm9yPXZhbHVlLmVycm9yO3ZhbHVlPW51bGx9ZWxzZXtzdWNjZWVkZWQ9dHJ1ZX1pZihwcm9taXNlPT09dmFsdWUpe2xpYiRlczYkcHJvbWlzZSQkaW50ZXJuYWwkJHJlamVjdChwcm9taXNlLGxpYiRlczYkcHJvbWlzZSQkaW50ZXJuYWwkJGNhbm5vdFJldHVybk93bigpKTtyZXR1cm59fWVsc2V7dmFsdWU9ZGV0YWlsO3N1Y2NlZWRlZD10cnVlfWlmKHByb21pc2UuX3N0YXRlIT09bGliJGVzNiRwcm9taXNlJCRpbnRlcm5hbCQkUEVORElORyl7fWVsc2UgaWYoaGFzQ2FsbGJhY2smJnN1Y2NlZWRlZCl7bGliJGVzNiRwcm9taXNlJCRpbnRlcm5hbCQkcmVzb2x2ZShwcm9taXNlLHZhbHVlKX1lbHNlIGlmKGZhaWxlZCl7bGliJGVzNiRwcm9taXNlJCRpbnRlcm5hbCQkcmVqZWN0KHByb21pc2UsZXJyb3IpfWVsc2UgaWYoc2V0dGxlZD09PWxpYiRlczYkcHJvbWlzZSQkaW50ZXJuYWwkJEZVTEZJTExFRCl7bGliJGVzNiRwcm9taXNlJCRpbnRlcm5hbCQkZnVsZmlsbChwcm9taXNlLHZhbHVlKX1lbHNlIGlmKHNldHRsZWQ9PT1saWIkZXM2JHByb21pc2UkJGludGVybmFsJCRSRUpFQ1RFRCl7bGliJGVzNiRwcm9taXNlJCRpbnRlcm5hbCQkcmVqZWN0KHByb21pc2UsdmFsdWUpfX1mdW5jdGlvbiBsaWIkZXM2JHByb21pc2UkJGludGVybmFsJCRpbml0aWFsaXplUHJvbWlzZShwcm9taXNlLHJlc29sdmVyKXt0cnl7cmVzb2x2ZXIoZnVuY3Rpb24gcmVzb2x2ZVByb21pc2UodmFsdWUpe2xpYiRlczYkcHJvbWlzZSQkaW50ZXJuYWwkJHJlc29sdmUocHJvbWlzZSx2YWx1ZSl9LGZ1bmN0aW9uIHJlamVjdFByb21pc2UocmVhc29uKXtsaWIkZXM2JHByb21pc2UkJGludGVybmFsJCRyZWplY3QocHJvbWlzZSxyZWFzb24pfSl9Y2F0Y2goZSl7bGliJGVzNiRwcm9taXNlJCRpbnRlcm5hbCQkcmVqZWN0KHByb21pc2UsZSl9fWZ1bmN0aW9uIGxpYiRlczYkcHJvbWlzZSRlbnVtZXJhdG9yJCRFbnVtZXJhdG9yKENvbnN0cnVjdG9yLGlucHV0KXt2YXIgZW51bWVyYXRvcj10aGlzO2VudW1lcmF0b3IuX2luc3RhbmNlQ29uc3RydWN0b3I9Q29uc3RydWN0b3I7ZW51bWVyYXRvci5wcm9taXNlPW5ldyBDb25zdHJ1Y3RvcihsaWIkZXM2JHByb21pc2UkJGludGVybmFsJCRub29wKTtpZihlbnVtZXJhdG9yLl92YWxpZGF0ZUlucHV0KGlucHV0KSl7ZW51bWVyYXRvci5faW5wdXQ9aW5wdXQ7ZW51bWVyYXRvci5sZW5ndGg9aW5wdXQubGVuZ3RoO2VudW1lcmF0b3IuX3JlbWFpbmluZz1pbnB1dC5sZW5ndGg7ZW51bWVyYXRvci5faW5pdCgpO2lmKGVudW1lcmF0b3IubGVuZ3RoPT09MCl7bGliJGVzNiRwcm9taXNlJCRpbnRlcm5hbCQkZnVsZmlsbChlbnVtZXJhdG9yLnByb21pc2UsZW51bWVyYXRvci5fcmVzdWx0KX1lbHNle2VudW1lcmF0b3IubGVuZ3RoPWVudW1lcmF0b3IubGVuZ3RofHwwO2VudW1lcmF0b3IuX2VudW1lcmF0ZSgpO2lmKGVudW1lcmF0b3IuX3JlbWFpbmluZz09PTApe2xpYiRlczYkcHJvbWlzZSQkaW50ZXJuYWwkJGZ1bGZpbGwoZW51bWVyYXRvci5wcm9taXNlLGVudW1lcmF0b3IuX3Jlc3VsdCl9fX1lbHNle2xpYiRlczYkcHJvbWlzZSQkaW50ZXJuYWwkJHJlamVjdChlbnVtZXJhdG9yLnByb21pc2UsZW51bWVyYXRvci5fdmFsaWRhdGlvbkVycm9yKCkpfX1saWIkZXM2JHByb21pc2UkZW51bWVyYXRvciQkRW51bWVyYXRvci5wcm90b3R5cGUuX3ZhbGlkYXRlSW5wdXQ9ZnVuY3Rpb24oaW5wdXQpe3JldHVybiBsaWIkZXM2JHByb21pc2UkdXRpbHMkJGlzQXJyYXkoaW5wdXQpfTtsaWIkZXM2JHByb21pc2UkZW51bWVyYXRvciQkRW51bWVyYXRvci5wcm90b3R5cGUuX3ZhbGlkYXRpb25FcnJvcj1mdW5jdGlvbigpe3JldHVybiBuZXcgRXJyb3IoXCJBcnJheSBNZXRob2RzIG11c3QgYmUgcHJvdmlkZWQgYW4gQXJyYXlcIil9O2xpYiRlczYkcHJvbWlzZSRlbnVtZXJhdG9yJCRFbnVtZXJhdG9yLnByb3RvdHlwZS5faW5pdD1mdW5jdGlvbigpe3RoaXMuX3Jlc3VsdD1uZXcgQXJyYXkodGhpcy5sZW5ndGgpfTt2YXIgbGliJGVzNiRwcm9taXNlJGVudW1lcmF0b3IkJGRlZmF1bHQ9bGliJGVzNiRwcm9taXNlJGVudW1lcmF0b3IkJEVudW1lcmF0b3I7bGliJGVzNiRwcm9taXNlJGVudW1lcmF0b3IkJEVudW1lcmF0b3IucHJvdG90eXBlLl9lbnVtZXJhdGU9ZnVuY3Rpb24oKXt2YXIgZW51bWVyYXRvcj10aGlzO3ZhciBsZW5ndGg9ZW51bWVyYXRvci5sZW5ndGg7dmFyIHByb21pc2U9ZW51bWVyYXRvci5wcm9taXNlO3ZhciBpbnB1dD1lbnVtZXJhdG9yLl9pbnB1dDtmb3IodmFyIGk9MDtwcm9taXNlLl9zdGF0ZT09PWxpYiRlczYkcHJvbWlzZSQkaW50ZXJuYWwkJFBFTkRJTkcmJmk8bGVuZ3RoO2krKyl7ZW51bWVyYXRvci5fZWFjaEVudHJ5KGlucHV0W2ldLGkpfX07bGliJGVzNiRwcm9taXNlJGVudW1lcmF0b3IkJEVudW1lcmF0b3IucHJvdG90eXBlLl9lYWNoRW50cnk9ZnVuY3Rpb24oZW50cnksaSl7dmFyIGVudW1lcmF0b3I9dGhpczt2YXIgYz1lbnVtZXJhdG9yLl9pbnN0YW5jZUNvbnN0cnVjdG9yO2lmKGxpYiRlczYkcHJvbWlzZSR1dGlscyQkaXNNYXliZVRoZW5hYmxlKGVudHJ5KSl7aWYoZW50cnkuY29uc3RydWN0b3I9PT1jJiZlbnRyeS5fc3RhdGUhPT1saWIkZXM2JHByb21pc2UkJGludGVybmFsJCRQRU5ESU5HKXtlbnRyeS5fb25lcnJvcj1udWxsO2VudW1lcmF0b3IuX3NldHRsZWRBdChlbnRyeS5fc3RhdGUsaSxlbnRyeS5fcmVzdWx0KX1lbHNle2VudW1lcmF0b3IuX3dpbGxTZXR0bGVBdChjLnJlc29sdmUoZW50cnkpLGkpfX1lbHNle2VudW1lcmF0b3IuX3JlbWFpbmluZy0tO2VudW1lcmF0b3IuX3Jlc3VsdFtpXT1lbnRyeX19O2xpYiRlczYkcHJvbWlzZSRlbnVtZXJhdG9yJCRFbnVtZXJhdG9yLnByb3RvdHlwZS5fc2V0dGxlZEF0PWZ1bmN0aW9uKHN0YXRlLGksdmFsdWUpe3ZhciBlbnVtZXJhdG9yPXRoaXM7dmFyIHByb21pc2U9ZW51bWVyYXRvci5wcm9taXNlO2lmKHByb21pc2UuX3N0YXRlPT09bGliJGVzNiRwcm9taXNlJCRpbnRlcm5hbCQkUEVORElORyl7ZW51bWVyYXRvci5fcmVtYWluaW5nLS07aWYoc3RhdGU9PT1saWIkZXM2JHByb21pc2UkJGludGVybmFsJCRSRUpFQ1RFRCl7bGliJGVzNiRwcm9taXNlJCRpbnRlcm5hbCQkcmVqZWN0KHByb21pc2UsdmFsdWUpfWVsc2V7ZW51bWVyYXRvci5fcmVzdWx0W2ldPXZhbHVlfX1pZihlbnVtZXJhdG9yLl9yZW1haW5pbmc9PT0wKXtsaWIkZXM2JHByb21pc2UkJGludGVybmFsJCRmdWxmaWxsKHByb21pc2UsZW51bWVyYXRvci5fcmVzdWx0KX19O2xpYiRlczYkcHJvbWlzZSRlbnVtZXJhdG9yJCRFbnVtZXJhdG9yLnByb3RvdHlwZS5fd2lsbFNldHRsZUF0PWZ1bmN0aW9uKHByb21pc2UsaSl7dmFyIGVudW1lcmF0b3I9dGhpcztsaWIkZXM2JHByb21pc2UkJGludGVybmFsJCRzdWJzY3JpYmUocHJvbWlzZSx1bmRlZmluZWQsZnVuY3Rpb24odmFsdWUpe2VudW1lcmF0b3IuX3NldHRsZWRBdChsaWIkZXM2JHByb21pc2UkJGludGVybmFsJCRGVUxGSUxMRUQsaSx2YWx1ZSl9LGZ1bmN0aW9uKHJlYXNvbil7ZW51bWVyYXRvci5fc2V0dGxlZEF0KGxpYiRlczYkcHJvbWlzZSQkaW50ZXJuYWwkJFJFSkVDVEVELGkscmVhc29uKX0pfTtmdW5jdGlvbiBsaWIkZXM2JHByb21pc2UkcHJvbWlzZSRhbGwkJGFsbChlbnRyaWVzKXtyZXR1cm4gbmV3IGxpYiRlczYkcHJvbWlzZSRlbnVtZXJhdG9yJCRkZWZhdWx0KHRoaXMsZW50cmllcykucHJvbWlzZX12YXIgbGliJGVzNiRwcm9taXNlJHByb21pc2UkYWxsJCRkZWZhdWx0PWxpYiRlczYkcHJvbWlzZSRwcm9taXNlJGFsbCQkYWxsO2Z1bmN0aW9uIGxpYiRlczYkcHJvbWlzZSRwcm9taXNlJHJhY2UkJHJhY2UoZW50cmllcyl7dmFyIENvbnN0cnVjdG9yPXRoaXM7dmFyIHByb21pc2U9bmV3IENvbnN0cnVjdG9yKGxpYiRlczYkcHJvbWlzZSQkaW50ZXJuYWwkJG5vb3ApO2lmKCFsaWIkZXM2JHByb21pc2UkdXRpbHMkJGlzQXJyYXkoZW50cmllcykpe2xpYiRlczYkcHJvbWlzZSQkaW50ZXJuYWwkJHJlamVjdChwcm9taXNlLG5ldyBUeXBlRXJyb3IoXCJZb3UgbXVzdCBwYXNzIGFuIGFycmF5IHRvIHJhY2UuXCIpKTtyZXR1cm4gcHJvbWlzZX12YXIgbGVuZ3RoPWVudHJpZXMubGVuZ3RoO2Z1bmN0aW9uIG9uRnVsZmlsbG1lbnQodmFsdWUpe2xpYiRlczYkcHJvbWlzZSQkaW50ZXJuYWwkJHJlc29sdmUocHJvbWlzZSx2YWx1ZSl9ZnVuY3Rpb24gb25SZWplY3Rpb24ocmVhc29uKXtsaWIkZXM2JHByb21pc2UkJGludGVybmFsJCRyZWplY3QocHJvbWlzZSxyZWFzb24pfWZvcih2YXIgaT0wO3Byb21pc2UuX3N0YXRlPT09bGliJGVzNiRwcm9taXNlJCRpbnRlcm5hbCQkUEVORElORyYmaTxsZW5ndGg7aSsrKXtsaWIkZXM2JHByb21pc2UkJGludGVybmFsJCRzdWJzY3JpYmUoQ29uc3RydWN0b3IucmVzb2x2ZShlbnRyaWVzW2ldKSx1bmRlZmluZWQsb25GdWxmaWxsbWVudCxvblJlamVjdGlvbil9cmV0dXJuIHByb21pc2V9dmFyIGxpYiRlczYkcHJvbWlzZSRwcm9taXNlJHJhY2UkJGRlZmF1bHQ9bGliJGVzNiRwcm9taXNlJHByb21pc2UkcmFjZSQkcmFjZTtmdW5jdGlvbiBsaWIkZXM2JHByb21pc2UkcHJvbWlzZSRyZXNvbHZlJCRyZXNvbHZlKG9iamVjdCl7dmFyIENvbnN0cnVjdG9yPXRoaXM7aWYob2JqZWN0JiZ0eXBlb2Ygb2JqZWN0PT09XCJvYmplY3RcIiYmb2JqZWN0LmNvbnN0cnVjdG9yPT09Q29uc3RydWN0b3Ipe3JldHVybiBvYmplY3R9dmFyIHByb21pc2U9bmV3IENvbnN0cnVjdG9yKGxpYiRlczYkcHJvbWlzZSQkaW50ZXJuYWwkJG5vb3ApO2xpYiRlczYkcHJvbWlzZSQkaW50ZXJuYWwkJHJlc29sdmUocHJvbWlzZSxvYmplY3QpO3JldHVybiBwcm9taXNlfXZhciBsaWIkZXM2JHByb21pc2UkcHJvbWlzZSRyZXNvbHZlJCRkZWZhdWx0PWxpYiRlczYkcHJvbWlzZSRwcm9taXNlJHJlc29sdmUkJHJlc29sdmU7ZnVuY3Rpb24gbGliJGVzNiRwcm9taXNlJHByb21pc2UkcmVqZWN0JCRyZWplY3QocmVhc29uKXt2YXIgQ29uc3RydWN0b3I9dGhpczt2YXIgcHJvbWlzZT1uZXcgQ29uc3RydWN0b3IobGliJGVzNiRwcm9taXNlJCRpbnRlcm5hbCQkbm9vcCk7bGliJGVzNiRwcm9taXNlJCRpbnRlcm5hbCQkcmVqZWN0KHByb21pc2UscmVhc29uKTtyZXR1cm4gcHJvbWlzZX12YXIgbGliJGVzNiRwcm9taXNlJHByb21pc2UkcmVqZWN0JCRkZWZhdWx0PWxpYiRlczYkcHJvbWlzZSRwcm9taXNlJHJlamVjdCQkcmVqZWN0O3ZhciBsaWIkZXM2JHByb21pc2UkcHJvbWlzZSQkY291bnRlcj0wO2Z1bmN0aW9uIGxpYiRlczYkcHJvbWlzZSRwcm9taXNlJCRuZWVkc1Jlc29sdmVyKCl7dGhyb3cgbmV3IFR5cGVFcnJvcihcIllvdSBtdXN0IHBhc3MgYSByZXNvbHZlciBmdW5jdGlvbiBhcyB0aGUgZmlyc3QgYXJndW1lbnQgdG8gdGhlIHByb21pc2UgY29uc3RydWN0b3JcIil9ZnVuY3Rpb24gbGliJGVzNiRwcm9taXNlJHByb21pc2UkJG5lZWRzTmV3KCl7dGhyb3cgbmV3IFR5cGVFcnJvcihcIkZhaWxlZCB0byBjb25zdHJ1Y3QgJ1Byb21pc2UnOiBQbGVhc2UgdXNlIHRoZSAnbmV3JyBvcGVyYXRvciwgdGhpcyBvYmplY3QgY29uc3RydWN0b3IgY2Fubm90IGJlIGNhbGxlZCBhcyBhIGZ1bmN0aW9uLlwiKX12YXIgbGliJGVzNiRwcm9taXNlJHByb21pc2UkJGRlZmF1bHQ9bGliJGVzNiRwcm9taXNlJHByb21pc2UkJFByb21pc2U7ZnVuY3Rpb24gbGliJGVzNiRwcm9taXNlJHByb21pc2UkJFByb21pc2UocmVzb2x2ZXIpe3RoaXMuX2lkPWxpYiRlczYkcHJvbWlzZSRwcm9taXNlJCRjb3VudGVyKys7dGhpcy5fc3RhdGU9dW5kZWZpbmVkO3RoaXMuX3Jlc3VsdD11bmRlZmluZWQ7dGhpcy5fc3Vic2NyaWJlcnM9W107aWYobGliJGVzNiRwcm9taXNlJCRpbnRlcm5hbCQkbm9vcCE9PXJlc29sdmVyKXtpZighbGliJGVzNiRwcm9taXNlJHV0aWxzJCRpc0Z1bmN0aW9uKHJlc29sdmVyKSl7bGliJGVzNiRwcm9taXNlJHByb21pc2UkJG5lZWRzUmVzb2x2ZXIoKX1pZighKHRoaXMgaW5zdGFuY2VvZiBsaWIkZXM2JHByb21pc2UkcHJvbWlzZSQkUHJvbWlzZSkpe2xpYiRlczYkcHJvbWlzZSRwcm9taXNlJCRuZWVkc05ldygpfWxpYiRlczYkcHJvbWlzZSQkaW50ZXJuYWwkJGluaXRpYWxpemVQcm9taXNlKHRoaXMscmVzb2x2ZXIpfX1saWIkZXM2JHByb21pc2UkcHJvbWlzZSQkUHJvbWlzZS5hbGw9bGliJGVzNiRwcm9taXNlJHByb21pc2UkYWxsJCRkZWZhdWx0O2xpYiRlczYkcHJvbWlzZSRwcm9taXNlJCRQcm9taXNlLnJhY2U9bGliJGVzNiRwcm9taXNlJHByb21pc2UkcmFjZSQkZGVmYXVsdDtsaWIkZXM2JHByb21pc2UkcHJvbWlzZSQkUHJvbWlzZS5yZXNvbHZlPWxpYiRlczYkcHJvbWlzZSRwcm9taXNlJHJlc29sdmUkJGRlZmF1bHQ7bGliJGVzNiRwcm9taXNlJHByb21pc2UkJFByb21pc2UucmVqZWN0PWxpYiRlczYkcHJvbWlzZSRwcm9taXNlJHJlamVjdCQkZGVmYXVsdDtsaWIkZXM2JHByb21pc2UkcHJvbWlzZSQkUHJvbWlzZS5fc2V0U2NoZWR1bGVyPWxpYiRlczYkcHJvbWlzZSRhc2FwJCRzZXRTY2hlZHVsZXI7bGliJGVzNiRwcm9taXNlJHByb21pc2UkJFByb21pc2UuX3NldEFzYXA9bGliJGVzNiRwcm9taXNlJGFzYXAkJHNldEFzYXA7bGliJGVzNiRwcm9taXNlJHByb21pc2UkJFByb21pc2UuX2FzYXA9bGliJGVzNiRwcm9taXNlJGFzYXAkJGFzYXA7bGliJGVzNiRwcm9taXNlJHByb21pc2UkJFByb21pc2UucHJvdG90eXBlPXtjb25zdHJ1Y3RvcjpsaWIkZXM2JHByb21pc2UkcHJvbWlzZSQkUHJvbWlzZSx0aGVuOmZ1bmN0aW9uKG9uRnVsZmlsbG1lbnQsb25SZWplY3Rpb24pe3ZhciBwYXJlbnQ9dGhpczt2YXIgc3RhdGU9cGFyZW50Ll9zdGF0ZTtpZihzdGF0ZT09PWxpYiRlczYkcHJvbWlzZSQkaW50ZXJuYWwkJEZVTEZJTExFRCYmIW9uRnVsZmlsbG1lbnR8fHN0YXRlPT09bGliJGVzNiRwcm9taXNlJCRpbnRlcm5hbCQkUkVKRUNURUQmJiFvblJlamVjdGlvbil7cmV0dXJuIHRoaXN9dmFyIGNoaWxkPW5ldyB0aGlzLmNvbnN0cnVjdG9yKGxpYiRlczYkcHJvbWlzZSQkaW50ZXJuYWwkJG5vb3ApO3ZhciByZXN1bHQ9cGFyZW50Ll9yZXN1bHQ7aWYoc3RhdGUpe3ZhciBjYWxsYmFjaz1hcmd1bWVudHNbc3RhdGUtMV07bGliJGVzNiRwcm9taXNlJGFzYXAkJGFzYXAoZnVuY3Rpb24oKXtsaWIkZXM2JHByb21pc2UkJGludGVybmFsJCRpbnZva2VDYWxsYmFjayhzdGF0ZSxjaGlsZCxjYWxsYmFjayxyZXN1bHQpfSl9ZWxzZXtsaWIkZXM2JHByb21pc2UkJGludGVybmFsJCRzdWJzY3JpYmUocGFyZW50LGNoaWxkLG9uRnVsZmlsbG1lbnQsb25SZWplY3Rpb24pfXJldHVybiBjaGlsZH0sXCJjYXRjaFwiOmZ1bmN0aW9uKG9uUmVqZWN0aW9uKXtyZXR1cm4gdGhpcy50aGVuKG51bGwsb25SZWplY3Rpb24pfX07ZnVuY3Rpb24gbGliJGVzNiRwcm9taXNlJHBvbHlmaWxsJCRwb2x5ZmlsbCgpe3ZhciBsb2NhbDtpZih0eXBlb2YgZ2xvYmFsIT09XCJ1bmRlZmluZWRcIil7bG9jYWw9Z2xvYmFsfWVsc2UgaWYodHlwZW9mIHNlbGYhPT1cInVuZGVmaW5lZFwiKXtsb2NhbD1zZWxmfWVsc2V7dHJ5e2xvY2FsPUZ1bmN0aW9uKFwicmV0dXJuIHRoaXNcIikoKX1jYXRjaChlKXt0aHJvdyBuZXcgRXJyb3IoXCJwb2x5ZmlsbCBmYWlsZWQgYmVjYXVzZSBnbG9iYWwgb2JqZWN0IGlzIHVuYXZhaWxhYmxlIGluIHRoaXMgZW52aXJvbm1lbnRcIil9fXZhciBQPWxvY2FsLlByb21pc2U7aWYoUCYmT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKFAucmVzb2x2ZSgpKT09PVwiW29iamVjdCBQcm9taXNlXVwiJiYhUC5jYXN0KXtyZXR1cm59bG9jYWwuUHJvbWlzZT1saWIkZXM2JHByb21pc2UkcHJvbWlzZSQkZGVmYXVsdH12YXIgbGliJGVzNiRwcm9taXNlJHBvbHlmaWxsJCRkZWZhdWx0PWxpYiRlczYkcHJvbWlzZSRwb2x5ZmlsbCQkcG9seWZpbGw7dmFyIGxpYiRlczYkcHJvbWlzZSR1bWQkJEVTNlByb21pc2U9e1Byb21pc2U6bGliJGVzNiRwcm9taXNlJHByb21pc2UkJGRlZmF1bHQscG9seWZpbGw6bGliJGVzNiRwcm9taXNlJHBvbHlmaWxsJCRkZWZhdWx0fTtpZih0eXBlb2YgZGVmaW5lPT09XCJmdW5jdGlvblwiJiZkZWZpbmVbXCJhbWRcIl0pe2RlZmluZShmdW5jdGlvbigpe3JldHVybiBsaWIkZXM2JHByb21pc2UkdW1kJCRFUzZQcm9taXNlfSl9ZWxzZSBpZih0eXBlb2YgbW9kdWxlIT09XCJ1bmRlZmluZWRcIiYmbW9kdWxlW1wiZXhwb3J0c1wiXSl7bW9kdWxlW1wiZXhwb3J0c1wiXT1saWIkZXM2JHByb21pc2UkdW1kJCRFUzZQcm9taXNlfWVsc2UgaWYodHlwZW9mIHRoaXMhPT1cInVuZGVmaW5lZFwiKXt0aGlzW1wiRVM2UHJvbWlzZVwiXT1saWIkZXM2JHByb21pc2UkdW1kJCRFUzZQcm9taXNlfWxpYiRlczYkcHJvbWlzZSRwb2x5ZmlsbCQkZGVmYXVsdCgpfSkuY2FsbCh0aGlzKTtcblxuICAgIC8qIVxuICAgICAqIEV2ZW50RW1pdHRlciB2NC4yLjExIC0gZ2l0LmlvL2VlXG4gICAgICogVW5saWNlbnNlIC0gaHR0cDovL3VubGljZW5zZS5vcmcvXG4gICAgICogT2xpdmVyIENhbGR3ZWxsIC0gaHR0cDovL29saS5tZS51ay9cbiAgICAgKiBAcHJlc2VydmVcbiAgICAgKi9cbiAgICAoZnVuY3Rpb24oKXtcInVzZSBzdHJpY3RcIjtmdW5jdGlvbiB0KCl7fWZ1bmN0aW9uIGkodCxuKXtmb3IodmFyIGU9dC5sZW5ndGg7ZS0tOylpZih0W2VdLmxpc3RlbmVyPT09bilyZXR1cm4gZTtyZXR1cm4tMX1mdW5jdGlvbiBuKGUpe3JldHVybiBmdW5jdGlvbigpe3JldHVybiB0aGlzW2VdLmFwcGx5KHRoaXMsYXJndW1lbnRzKX19dmFyIGU9dC5wcm90b3R5cGUscj10aGlzLHM9ci5FdmVudEVtaXR0ZXI7ZS5nZXRMaXN0ZW5lcnM9ZnVuY3Rpb24obil7dmFyIHIsZSx0PXRoaXMuX2dldEV2ZW50cygpO2lmKG4gaW5zdGFuY2VvZiBSZWdFeHApe3I9e307Zm9yKGUgaW4gdCl0Lmhhc093blByb3BlcnR5KGUpJiZuLnRlc3QoZSkmJihyW2VdPXRbZV0pfWVsc2Ugcj10W25dfHwodFtuXT1bXSk7cmV0dXJuIHJ9LGUuZmxhdHRlbkxpc3RlbmVycz1mdW5jdGlvbih0KXt2YXIgZSxuPVtdO2ZvcihlPTA7ZTx0Lmxlbmd0aDtlKz0xKW4ucHVzaCh0W2VdLmxpc3RlbmVyKTtyZXR1cm4gbn0sZS5nZXRMaXN0ZW5lcnNBc09iamVjdD1mdW5jdGlvbihuKXt2YXIgZSx0PXRoaXMuZ2V0TGlzdGVuZXJzKG4pO3JldHVybiB0IGluc3RhbmNlb2YgQXJyYXkmJihlPXt9LGVbbl09dCksZXx8dH0sZS5hZGRMaXN0ZW5lcj1mdW5jdGlvbihyLGUpe3ZhciB0LG49dGhpcy5nZXRMaXN0ZW5lcnNBc09iamVjdChyKSxzPVwib2JqZWN0XCI9PXR5cGVvZiBlO2Zvcih0IGluIG4pbi5oYXNPd25Qcm9wZXJ0eSh0KSYmLTE9PT1pKG5bdF0sZSkmJm5bdF0ucHVzaChzP2U6e2xpc3RlbmVyOmUsb25jZTohMX0pO3JldHVybiB0aGlzfSxlLm9uPW4oXCJhZGRMaXN0ZW5lclwiKSxlLmFkZE9uY2VMaXN0ZW5lcj1mdW5jdGlvbihlLHQpe3JldHVybiB0aGlzLmFkZExpc3RlbmVyKGUse2xpc3RlbmVyOnQsb25jZTohMH0pfSxlLm9uY2U9bihcImFkZE9uY2VMaXN0ZW5lclwiKSxlLmRlZmluZUV2ZW50PWZ1bmN0aW9uKGUpe3JldHVybiB0aGlzLmdldExpc3RlbmVycyhlKSx0aGlzfSxlLmRlZmluZUV2ZW50cz1mdW5jdGlvbih0KXtmb3IodmFyIGU9MDtlPHQubGVuZ3RoO2UrPTEpdGhpcy5kZWZpbmVFdmVudCh0W2VdKTtyZXR1cm4gdGhpc30sZS5yZW1vdmVMaXN0ZW5lcj1mdW5jdGlvbihyLHMpe3ZhciBuLGUsdD10aGlzLmdldExpc3RlbmVyc0FzT2JqZWN0KHIpO2ZvcihlIGluIHQpdC5oYXNPd25Qcm9wZXJ0eShlKSYmKG49aSh0W2VdLHMpLC0xIT09biYmdFtlXS5zcGxpY2UobiwxKSk7cmV0dXJuIHRoaXN9LGUub2ZmPW4oXCJyZW1vdmVMaXN0ZW5lclwiKSxlLmFkZExpc3RlbmVycz1mdW5jdGlvbihlLHQpe3JldHVybiB0aGlzLm1hbmlwdWxhdGVMaXN0ZW5lcnMoITEsZSx0KX0sZS5yZW1vdmVMaXN0ZW5lcnM9ZnVuY3Rpb24oZSx0KXtyZXR1cm4gdGhpcy5tYW5pcHVsYXRlTGlzdGVuZXJzKCEwLGUsdCl9LGUubWFuaXB1bGF0ZUxpc3RlbmVycz1mdW5jdGlvbihyLHQsaSl7dmFyIGUsbixzPXI/dGhpcy5yZW1vdmVMaXN0ZW5lcjp0aGlzLmFkZExpc3RlbmVyLG89cj90aGlzLnJlbW92ZUxpc3RlbmVyczp0aGlzLmFkZExpc3RlbmVycztpZihcIm9iamVjdFwiIT10eXBlb2YgdHx8dCBpbnN0YW5jZW9mIFJlZ0V4cClmb3IoZT1pLmxlbmd0aDtlLS07KXMuY2FsbCh0aGlzLHQsaVtlXSk7ZWxzZSBmb3IoZSBpbiB0KXQuaGFzT3duUHJvcGVydHkoZSkmJihuPXRbZV0pJiYoXCJmdW5jdGlvblwiPT10eXBlb2Ygbj9zLmNhbGwodGhpcyxlLG4pOm8uY2FsbCh0aGlzLGUsbikpO3JldHVybiB0aGlzfSxlLnJlbW92ZUV2ZW50PWZ1bmN0aW9uKGUpe3ZhciB0LHI9dHlwZW9mIGUsbj10aGlzLl9nZXRFdmVudHMoKTtpZihcInN0cmluZ1wiPT09cilkZWxldGUgbltlXTtlbHNlIGlmKGUgaW5zdGFuY2VvZiBSZWdFeHApZm9yKHQgaW4gbiluLmhhc093blByb3BlcnR5KHQpJiZlLnRlc3QodCkmJmRlbGV0ZSBuW3RdO2Vsc2UgZGVsZXRlIHRoaXMuX2V2ZW50cztyZXR1cm4gdGhpc30sZS5yZW1vdmVBbGxMaXN0ZW5lcnM9bihcInJlbW92ZUV2ZW50XCIpLGUuZW1pdEV2ZW50PWZ1bmN0aW9uKHQsdSl7dmFyIG4sZSxyLGksbyxzPXRoaXMuZ2V0TGlzdGVuZXJzQXNPYmplY3QodCk7Zm9yKGkgaW4gcylpZihzLmhhc093blByb3BlcnR5KGkpKWZvcihuPXNbaV0uc2xpY2UoMCkscj1uLmxlbmd0aDtyLS07KWU9bltyXSxlLm9uY2U9PT0hMCYmdGhpcy5yZW1vdmVMaXN0ZW5lcih0LGUubGlzdGVuZXIpLG89ZS5saXN0ZW5lci5hcHBseSh0aGlzLHV8fFtdKSxvPT09dGhpcy5fZ2V0T25jZVJldHVyblZhbHVlKCkmJnRoaXMucmVtb3ZlTGlzdGVuZXIodCxlLmxpc3RlbmVyKTtyZXR1cm4gdGhpc30sZS50cmlnZ2VyPW4oXCJlbWl0RXZlbnRcIiksZS5lbWl0PWZ1bmN0aW9uKGUpe3ZhciB0PUFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKGFyZ3VtZW50cywxKTtyZXR1cm4gdGhpcy5lbWl0RXZlbnQoZSx0KX0sZS5zZXRPbmNlUmV0dXJuVmFsdWU9ZnVuY3Rpb24oZSl7cmV0dXJuIHRoaXMuX29uY2VSZXR1cm5WYWx1ZT1lLHRoaXN9LGUuX2dldE9uY2VSZXR1cm5WYWx1ZT1mdW5jdGlvbigpe3JldHVybiB0aGlzLmhhc093blByb3BlcnR5KFwiX29uY2VSZXR1cm5WYWx1ZVwiKT90aGlzLl9vbmNlUmV0dXJuVmFsdWU6ITB9LGUuX2dldEV2ZW50cz1mdW5jdGlvbigpe3JldHVybiB0aGlzLl9ldmVudHN8fCh0aGlzLl9ldmVudHM9e30pfSx0Lm5vQ29uZmxpY3Q9ZnVuY3Rpb24oKXtyZXR1cm4gci5FdmVudEVtaXR0ZXI9cyx0fSxcImZ1bmN0aW9uXCI9PXR5cGVvZiBkZWZpbmUmJmRlZmluZS5hbWQ/ZGVmaW5lKGZ1bmN0aW9uKCl7cmV0dXJuIHR9KTpcIm9iamVjdFwiPT10eXBlb2YgbW9kdWxlJiZtb2R1bGUuZXhwb3J0cz9tb2R1bGUuZXhwb3J0cz10OnIuRXZlbnRFbWl0dGVyPXR9KS5jYWxsKHRoaXMpO1xuXG4gICAgLyoqXG4gICAgICogT2xpdmVyIENhbGR3ZWxsXG4gICAgICogaHR0cDovL29saS5tZS51ay8yMDEzLzA2LzAxL3Byb3RvdHlwaWNhbC1pbmhlcml0YW5jZS1kb25lLXJpZ2h0L1xuICAgICAqL1xuICAgIGlmICghT2JqZWN0LmNyZWF0ZSkge1xuICAgICAgICBPYmplY3QuY3JlYXRlID0gKGZ1bmN0aW9uKCl7XG4gICAgICAgICAgICBmdW5jdGlvbiBGKCl7fVxuICAgICAgICAgICAgcmV0dXJuIGZ1bmN0aW9uKG8pe1xuICAgICAgICAgICAgICAgIGlmIChhcmd1bWVudHMubGVuZ3RoICE9IDEpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdPYmplY3QuY3JlYXRlIGltcGxlbWVudGF0aW9uIG9ubHkgYWNjZXB0cyBvbmUgcGFyYW1ldGVyLicpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBGLnByb3RvdHlwZSA9IG87XG4gICAgICAgICAgICAgICAgcmV0dXJuIG5ldyBGKClcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSkoKVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIGV4dGVuZChkZXN0aW5hdGlvbiwgc291cmNlKSB7XG4gICAgICAgIGRlc3RpbmF0aW9uLnByb3RvdHlwZSA9IE9iamVjdC5jcmVhdGUoc291cmNlLnByb3RvdHlwZSk7XG4gICAgICAgIGRlc3RpbmF0aW9uLnByb3RvdHlwZS5jb25zdHJ1Y3RvciA9IGRlc3RpbmF0aW9uO1xuICAgICAgICByZXR1cm4gc291cmNlLnByb3RvdHlwZTtcbiAgICB9XG5cbiAgICBpZiAoIUFycmF5LnByb3RvdHlwZS5pbmRleE9mKSB7XG4gICAgICAgIEFycmF5LnByb3RvdHlwZS5pbmRleE9mPWZ1bmN0aW9uKHIpe2lmKG51bGw9PXRoaXMpdGhyb3cgbmV3IFR5cGVFcnJvcjt2YXIgdCxlLG49T2JqZWN0KHRoaXMpLGE9bi5sZW5ndGg+Pj4wO2lmKDA9PT1hKXJldHVybi0xO2lmKHQ9MCxhcmd1bWVudHMubGVuZ3RoPjEmJih0PU51bWJlcihhcmd1bWVudHNbMV0pLHQhPXQ/dD0wOjAhPXQmJjEvMCE9dCYmdCE9LTEvMCYmKHQ9KHQ+MHx8LTEpKk1hdGguZmxvb3IoTWF0aC5hYnModCkpKSksdD49YSlyZXR1cm4tMTtmb3IoZT10Pj0wP3Q6TWF0aC5tYXgoYS1NYXRoLmFicyh0KSwwKTthPmU7ZSsrKWlmKGUgaW4gbiYmbltlXT09PXIpcmV0dXJuIGU7cmV0dXJuLTF9O1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGZpZWxkVmFsdWUob2JqZWN0LCBuYW1lKSB7XG4gICAgICAgIHRyeSB7cmV0dXJuIG9iamVjdFtuYW1lXTt9IGNhdGNoICh4KSB7cmV0dXJuIHVuZGVmaW5lZDt9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogTWl4ZXMgaW4gdGhlIGdpdmVuIG9iamVjdHMgaW50byB0aGUgdGFyZ2V0IG9iamVjdCBieSBjb3B5aW5nIHRoZSBwcm9wZXJ0aWVzLlxuICAgICAqIEBwYXJhbSBkZWVwIGlmIHRoZSBjb3B5IG11c3QgYmUgZGVlcFxuICAgICAqIEBwYXJhbSB0YXJnZXQgdGhlIHRhcmdldCBvYmplY3RcbiAgICAgKiBAcGFyYW0gb2JqZWN0cyB0aGUgb2JqZWN0cyB3aG9zZSBwcm9wZXJ0aWVzIGFyZSBjb3BpZWQgaW50byB0aGUgdGFyZ2V0XG4gICAgICovXG4gICAgZnVuY3Rpb24gbWl4aW4oZGVlcCwgdGFyZ2V0LCBvYmplY3RzKSB7XG4gICAgICAgIHZhciByZXN1bHQgPSB0YXJnZXQgfHwge307XG4gICAgICAgIGZvciAodmFyIGkgPSAyOyBpIDwgYXJndW1lbnRzLmxlbmd0aDsgKytpKSB7IC8vIFNraXAgZmlyc3QgMiBwYXJhbWV0ZXJzIChkZWVwIGFuZCB0YXJnZXQpLCBhbmQgbG9vcCBvdmVyIHRoZSBvdGhlcnNcbiAgICAgICAgICAgIHZhciBvYmplY3QgPSBhcmd1bWVudHNbaV07XG4gICAgICAgICAgICBpZiAob2JqZWN0ID09PSB1bmRlZmluZWQgfHwgb2JqZWN0ID09PSBudWxsKSB7XG4gICAgICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBmb3IgKHZhciBwcm9wTmFtZSBpbiBvYmplY3QpIHtcbiAgICAgICAgICAgICAgICB2YXIgcHJvcCA9IGZpZWxkVmFsdWUob2JqZWN0LCBwcm9wTmFtZSk7XG4gICAgICAgICAgICAgICAgdmFyIHRhcmcgPSBmaWVsZFZhbHVlKHJlc3VsdCwgcHJvcE5hbWUpO1xuICAgICAgICAgICAgICAgIGlmIChwcm9wID09PSB0YXJnZXQpIHtcbiAgICAgICAgICAgICAgICAgICAgY29udGludWU7IC8vIEF2b2lkIGluZmluaXRlIGxvb3BzXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmIChwcm9wID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgY29udGludWU7IC8vIERvIG5vdCBtaXhpbiB1bmRlZmluZWQgdmFsdWVzXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmIChkZWVwICYmIHR5cGVvZiBwcm9wID09PSAnb2JqZWN0JyAmJiBwcm9wICE9PSBudWxsKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChwcm9wIGluc3RhbmNlb2YgQXJyYXkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlc3VsdFtwcm9wTmFtZV0gPSBtaXhpbihkZWVwLCB0YXJnIGluc3RhbmNlb2YgQXJyYXkgPyB0YXJnIDogW10sIHByb3ApO1xuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHNvdXJjZSA9IHR5cGVvZiB0YXJnID09PSAnb2JqZWN0JyAmJiAhKHRhcmcgaW5zdGFuY2VvZiBBcnJheSkgPyB0YXJnIDoge307XG4gICAgICAgICAgICAgICAgICAgICAgICByZXN1bHRbcHJvcE5hbWVdID0gbWl4aW4oZGVlcCwgc291cmNlLCBwcm9wKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHJlc3VsdFtwcm9wTmFtZV0gPSBwcm9wO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGVuZHNXaXRoKHZhbHVlLCBzdWZmaXgpIHtcbiAgICAgICAgcmV0dXJuIHZhbHVlLmluZGV4T2Yoc3VmZml4LCB2YWx1ZS5sZW5ndGggLSBzdWZmaXgubGVuZ3RoKSAhPT0gLTE7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gc3RhcnRzV2l0aCh2YWx1ZSwgcHJlZml4KSB7XG4gICAgICAgIHJldHVybiB2YWx1ZS5sYXN0SW5kZXhPZihwcmVmaXgsIDApID09PSAwO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIHN0cmlwU2xhc2godmFsdWUpIHtcbiAgICAgICAgaWYgKHZhbHVlLnN1YnN0cmluZyh2YWx1ZS5sZW5ndGggLSAxKSA9PSBcIi9cIikge1xuICAgICAgICAgICAgdmFsdWUgPSB2YWx1ZS5zdWJzdHJpbmcoMCwgdmFsdWUubGVuZ3RoIC0gMSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHZhbHVlO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGlzU3RyaW5nKHZhbHVlKSB7XG4gICAgICAgIGlmICh2YWx1ZSA9PT0gdW5kZWZpbmVkIHx8IHZhbHVlID09PSBudWxsKSB7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHR5cGVvZiB2YWx1ZSA9PT0gJ3N0cmluZycgfHwgdmFsdWUgaW5zdGFuY2VvZiBTdHJpbmc7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gaXNGdW5jdGlvbih2YWx1ZSkge1xuICAgICAgICBpZiAodmFsdWUgPT09IHVuZGVmaW5lZCB8fCB2YWx1ZSA9PT0gbnVsbCkge1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0eXBlb2YgdmFsdWUgPT09ICdmdW5jdGlvbic7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gbG9nKGxldmVsLCBhcmdzKSB7XG4gICAgICAgIGlmICh3aW5kb3cuY29uc29sZSkge1xuICAgICAgICAgICAgdmFyIGxvZ2dlciA9IHdpbmRvdy5jb25zb2xlW2xldmVsXTtcbiAgICAgICAgICAgIGlmIChpc0Z1bmN0aW9uKGxvZ2dlcikpIHtcbiAgICAgICAgICAgICAgICBsb2dnZXIuYXBwbHkod2luZG93LmNvbnNvbGUsIGFyZ3MpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gYmFja29mZihzdGVwLCBtaW4sIG1heCkge1xuICAgICAgICB2YXIgaml0dGVyID0gMC41ICogTWF0aC5yYW5kb20oKTtcbiAgICAgICAgdmFyIGludGVydmFsID0gbWluICogTWF0aC5wb3coMiwgc3RlcCsxKTtcbiAgICAgICAgaWYgKGludGVydmFsID4gbWF4KSB7XG4gICAgICAgICAgICBpbnRlcnZhbCA9IG1heFxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBNYXRoLmZsb29yKCgxLWppdHRlcikgKiBpbnRlcnZhbCk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gZXJyb3JFeGlzdHMoZGF0YSkge1xuICAgICAgICByZXR1cm4gXCJlcnJvclwiIGluIGRhdGEgJiYgZGF0YS5lcnJvciAhPT0gbnVsbCAmJiBkYXRhLmVycm9yICE9PSBcIlwiO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIENlbnRyaWZ1Z2Uob3B0aW9ucykge1xuICAgICAgICB0aGlzLl9zb2NranMgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5fc3RhdHVzID0gJ2Rpc2Nvbm5lY3RlZCc7XG4gICAgICAgIHRoaXMuX3JlY29ubmVjdCA9IHRydWU7XG4gICAgICAgIHRoaXMuX3JlY29ubmVjdGluZyA9IGZhbHNlO1xuICAgICAgICB0aGlzLl90cmFuc3BvcnQgPSBudWxsO1xuICAgICAgICB0aGlzLl90cmFuc3BvcnROYW1lID0gbnVsbDtcbiAgICAgICAgdGhpcy5fbWVzc2FnZUlkID0gMDtcbiAgICAgICAgdGhpcy5fY2xpZW50SUQgPSBudWxsO1xuICAgICAgICB0aGlzLl9zdWJzID0ge307XG4gICAgICAgIHRoaXMuX2xhc3RNZXNzYWdlSUQgPSB7fTtcbiAgICAgICAgdGhpcy5fbWVzc2FnZXMgPSBbXTtcbiAgICAgICAgdGhpcy5faXNCYXRjaGluZyA9IGZhbHNlO1xuICAgICAgICB0aGlzLl9pc0F1dGhCYXRjaGluZyA9IGZhbHNlO1xuICAgICAgICB0aGlzLl9hdXRoQ2hhbm5lbHMgPSB7fTtcbiAgICAgICAgdGhpcy5fcmVmcmVzaFRpbWVvdXQgPSBudWxsO1xuICAgICAgICB0aGlzLl9yZXRyaWVzID0gMDtcbiAgICAgICAgdGhpcy5fY2FsbGJhY2tzID0ge307XG4gICAgICAgIHRoaXMuX2xhdGVuY3kgPSBudWxsO1xuICAgICAgICB0aGlzLl9sYXRlbmN5U3RhcnQgPSBudWxsO1xuICAgICAgICB0aGlzLl9jb25maWcgPSB7XG4gICAgICAgICAgICByZXRyeTogMTAwMCxcbiAgICAgICAgICAgIG1heFJldHJ5OiAyMDAwMCxcbiAgICAgICAgICAgIHRpbWVvdXQ6IDUwMDAsXG4gICAgICAgICAgICBpbmZvOiBcIlwiLFxuICAgICAgICAgICAgcmVzdWJzY3JpYmU6IHRydWUsXG4gICAgICAgICAgICBkZWJ1ZzogZmFsc2UsXG4gICAgICAgICAgICBpbnNlY3VyZTogZmFsc2UsXG4gICAgICAgICAgICBzZXJ2ZXI6IG51bGwsXG4gICAgICAgICAgICBwcml2YXRlQ2hhbm5lbFByZWZpeDogXCIkXCIsXG4gICAgICAgICAgICB0cmFuc3BvcnRzOiBbXG4gICAgICAgICAgICAgICAgJ3dlYnNvY2tldCcsXG4gICAgICAgICAgICAgICAgJ3hkci1zdHJlYW1pbmcnLFxuICAgICAgICAgICAgICAgICd4aHItc3RyZWFtaW5nJyxcbiAgICAgICAgICAgICAgICAnZXZlbnRzb3VyY2UnLFxuICAgICAgICAgICAgICAgICdpZnJhbWUtZXZlbnRzb3VyY2UnLFxuICAgICAgICAgICAgICAgICdpZnJhbWUtaHRtbGZpbGUnLFxuICAgICAgICAgICAgICAgICd4ZHItcG9sbGluZycsXG4gICAgICAgICAgICAgICAgJ3hoci1wb2xsaW5nJyxcbiAgICAgICAgICAgICAgICAnaWZyYW1lLXhoci1wb2xsaW5nJyxcbiAgICAgICAgICAgICAgICAnanNvbnAtcG9sbGluZydcbiAgICAgICAgICAgIF0sXG4gICAgICAgICAgICByZWZyZXNoRW5kcG9pbnQ6IFwiL2NlbnRyaWZ1Z2UvcmVmcmVzaC9cIixcbiAgICAgICAgICAgIHJlZnJlc2hIZWFkZXJzOiB7fSxcbiAgICAgICAgICAgIHJlZnJlc2hQYXJhbXM6IHt9LFxuICAgICAgICAgICAgcmVmcmVzaFRyYW5zcG9ydDogXCJhamF4XCIsXG4gICAgICAgICAgICBhdXRoRW5kcG9pbnQ6IFwiL2NlbnRyaWZ1Z2UvYXV0aC9cIixcbiAgICAgICAgICAgIGF1dGhIZWFkZXJzOiB7fSxcbiAgICAgICAgICAgIGF1dGhQYXJhbXM6IHt9LFxuICAgICAgICAgICAgYXV0aFRyYW5zcG9ydDogXCJhamF4XCJcbiAgICAgICAgfTtcbiAgICAgICAgaWYgKG9wdGlvbnMpIHtcbiAgICAgICAgICAgIHRoaXMuY29uZmlndXJlKG9wdGlvbnMpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgZXh0ZW5kKENlbnRyaWZ1Z2UsIEV2ZW50RW1pdHRlcik7XG5cbiAgICBDZW50cmlmdWdlLl9hdXRoQ2FsbGJhY2tzID0ge307XG4gICAgQ2VudHJpZnVnZS5fbmV4dEF1dGhDYWxsYmFja0lEID0gMTtcblxuICAgIHZhciBjZW50cmlmdWdlUHJvdG8gPSBDZW50cmlmdWdlLnByb3RvdHlwZTtcblxuICAgIGNlbnRyaWZ1Z2VQcm90by5fanNvbnAgPSBmdW5jdGlvbiAodXJsLCBwYXJhbXMsIGhlYWRlcnMsIGRhdGEsIGNhbGxiYWNrKSB7XG4gICAgICAgIGlmIChoZWFkZXJzLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgIHRoaXMuX2xvZyhcIk9ubHkgQUpBWCByZXF1ZXN0IGFsbG93cyB0byBzZW5kIGN1c3RvbSBoZWFkZXJzLCBpdCdzIG5vdCBwb3NzaWJsZSB3aXRoIEpTT05QLlwiKTtcbiAgICAgICAgfVxuICAgICAgICBzZWxmLl9kZWJ1ZyhcInNlbmRpbmcgSlNPTlAgcmVxdWVzdCB0b1wiLCB1cmwpO1xuXG4gICAgICAgIHZhciBjYWxsYmFja05hbWUgPSBDZW50cmlmdWdlLl9uZXh0QXV0aENhbGxiYWNrSUQudG9TdHJpbmcoKTtcbiAgICAgICAgQ2VudHJpZnVnZS5fbmV4dEF1dGhDYWxsYmFja0lEKys7XG5cbiAgICAgICAgdmFyIGRvY3VtZW50ID0gd2luZG93LmRvY3VtZW50O1xuICAgICAgICB2YXIgc2NyaXB0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInNjcmlwdFwiKTtcbiAgICAgICAgQ2VudHJpZnVnZS5fYXV0aENhbGxiYWNrc1tjYWxsYmFja05hbWVdID0gZnVuY3Rpb24gKGRhdGEpIHtcbiAgICAgICAgICAgIGNhbGxiYWNrKGZhbHNlLCBkYXRhKTtcbiAgICAgICAgICAgIGRlbGV0ZSBDZW50cmlmdWdlW2NhbGxiYWNrTmFtZV07XG4gICAgICAgIH07XG5cbiAgICAgICAgdmFyIHF1ZXJ5ID0gXCJcIjtcbiAgICAgICAgZm9yICh2YXIgaSBpbiBwYXJhbXMpIHtcbiAgICAgICAgICAgIGlmIChxdWVyeS5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICAgICAgcXVlcnkgKz0gXCImXCI7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBxdWVyeSArPSBlbmNvZGVVUklDb21wb25lbnQoaSkgKyBcIj1cIiArIGVuY29kZVVSSUNvbXBvbmVudChwYXJhbXNbaV0pO1xuICAgICAgICB9XG5cbiAgICAgICAgdmFyIGNhbGxiYWNrX25hbWUgPSBcIkNlbnRyaWZ1Z2UuX2F1dGhDYWxsYmFja3NbJ1wiICsgY2FsbGJhY2tOYW1lICsgXCInXVwiO1xuICAgICAgICBzY3JpcHQuc3JjID0gdGhpcy5fY29uZmlnLmF1dGhFbmRwb2ludCArXG4gICAgICAgICAgICAnP2NhbGxiYWNrPScgKyBlbmNvZGVVUklDb21wb25lbnQoY2FsbGJhY2tfbmFtZSkgK1xuICAgICAgICAgICAgJyZkYXRhPScgKyBlbmNvZGVVUklDb21wb25lbnQoSlNPTi5zdHJpbmdpZnkoZGF0YSkpICtcbiAgICAgICAgICAgICcmJyArIHF1ZXJ5O1xuXG4gICAgICAgIHZhciBoZWFkID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeVRhZ05hbWUoXCJoZWFkXCIpWzBdIHx8IGRvY3VtZW50LmRvY3VtZW50RWxlbWVudDtcbiAgICAgICAgaGVhZC5pbnNlcnRCZWZvcmUoc2NyaXB0LCBoZWFkLmZpcnN0Q2hpbGQpO1xuICAgIH07XG5cbiAgICBjZW50cmlmdWdlUHJvdG8uX2FqYXggPSBmdW5jdGlvbiAodXJsLCBwYXJhbXMsIGhlYWRlcnMsIGRhdGEsIGNhbGxiYWNrKSB7XG4gICAgICAgIHZhciBzZWxmID0gdGhpcztcbiAgICAgICAgc2VsZi5fZGVidWcoXCJzZW5kaW5nIEFKQVggcmVxdWVzdCB0b1wiLCB1cmwpO1xuXG4gICAgICAgIHZhciB4aHIgPSAod2luZG93LlhNTEh0dHBSZXF1ZXN0ID8gbmV3IHdpbmRvdy5YTUxIdHRwUmVxdWVzdCgpIDogbmV3IEFjdGl2ZVhPYmplY3QoXCJNaWNyb3NvZnQuWE1MSFRUUFwiKSk7XG5cbiAgICAgICAgdmFyIHF1ZXJ5ID0gXCJcIjtcbiAgICAgICAgZm9yICh2YXIgaSBpbiBwYXJhbXMpIHtcbiAgICAgICAgICAgIGlmIChxdWVyeS5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICAgICAgcXVlcnkgKz0gXCImXCI7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBxdWVyeSArPSBlbmNvZGVVUklDb21wb25lbnQoaSkgKyBcIj1cIiArIGVuY29kZVVSSUNvbXBvbmVudChwYXJhbXNbaV0pO1xuICAgICAgICB9XG4gICAgICAgIGlmIChxdWVyeS5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICBxdWVyeSA9IFwiP1wiICsgcXVlcnk7XG4gICAgICAgIH1cbiAgICAgICAgeGhyLm9wZW4oXCJQT1NUXCIsIHVybCArIHF1ZXJ5LCB0cnVlKTtcblxuICAgICAgICAvLyBhZGQgcmVxdWVzdCBoZWFkZXJzXG4gICAgICAgIHhoci5zZXRSZXF1ZXN0SGVhZGVyKFwiWC1SZXF1ZXN0ZWQtV2l0aFwiLCBcIlhNTEh0dHBSZXF1ZXN0XCIpO1xuICAgICAgICB4aHIuc2V0UmVxdWVzdEhlYWRlcihcIkNvbnRlbnQtVHlwZVwiLCBcImFwcGxpY2F0aW9uL2pzb25cIik7XG4gICAgICAgIGZvciAodmFyIGhlYWRlck5hbWUgaW4gaGVhZGVycykge1xuICAgICAgICAgICAgeGhyLnNldFJlcXVlc3RIZWFkZXIoaGVhZGVyTmFtZSwgaGVhZGVyc1toZWFkZXJOYW1lXSk7XG4gICAgICAgIH1cblxuICAgICAgICB4aHIub25yZWFkeXN0YXRlY2hhbmdlID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgaWYgKHhoci5yZWFkeVN0YXRlID09PSA0KSB7XG4gICAgICAgICAgICAgICAgaWYgKHhoci5zdGF0dXMgPT09IDIwMCkge1xuICAgICAgICAgICAgICAgICAgICB2YXIgZGF0YSwgcGFyc2VkID0gZmFsc2U7XG5cbiAgICAgICAgICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGRhdGEgPSBKU09OLnBhcnNlKHhoci5yZXNwb25zZVRleHQpO1xuICAgICAgICAgICAgICAgICAgICAgICAgcGFyc2VkID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgY2FsbGJhY2sodHJ1ZSwgJ0pTT04gcmV0dXJuZWQgd2FzIGludmFsaWQsIHlldCBzdGF0dXMgY29kZSB3YXMgMjAwLiBEYXRhIHdhczogJyArIHhoci5yZXNwb25zZVRleHQpO1xuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgaWYgKHBhcnNlZCkgeyAvLyBwcmV2ZW50cyBkb3VibGUgZXhlY3V0aW9uLlxuICAgICAgICAgICAgICAgICAgICAgICAgY2FsbGJhY2soZmFsc2UsIGRhdGEpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgc2VsZi5fbG9nKFwiQ291bGRuJ3QgZ2V0IGF1dGggaW5mbyBmcm9tIGFwcGxpY2F0aW9uXCIsIHhoci5zdGF0dXMpO1xuICAgICAgICAgICAgICAgICAgICBjYWxsYmFjayh0cnVlLCB4aHIuc3RhdHVzKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG5cbiAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIC8vIG1ldGhvZCA9PSAnZ2V0JyA/IHNlbGYueGhyLnNlbmQoKSA6IHNlbGYueGhyLnNlbmQoSlNPTi5zdHJpbmdpZnkob3BzLmRhdGEpKTtcbiAgICAgICAgICAgIHhoci5zZW5kKEpTT04uc3RyaW5naWZ5KGRhdGEpKTtcbiAgICAgICAgfSwgMjApO1xuICAgICAgICByZXR1cm4geGhyO1xuICAgIH07XG5cbiAgICBjZW50cmlmdWdlUHJvdG8uX2xvZyA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgbG9nKFwiaW5mb1wiLCBhcmd1bWVudHMpO1xuICAgIH07XG5cbiAgICBjZW50cmlmdWdlUHJvdG8uX2RlYnVnID0gZnVuY3Rpb24gKCkge1xuICAgICAgICBpZiAodGhpcy5fY29uZmlnLmRlYnVnID09PSB0cnVlKSB7XG4gICAgICAgICAgICBsb2coXCJkZWJ1Z1wiLCBhcmd1bWVudHMpO1xuICAgICAgICB9XG4gICAgfTtcblxuICAgIGNlbnRyaWZ1Z2VQcm90by5fY29uZmlndXJlID0gZnVuY3Rpb24gKGNvbmZpZ3VyYXRpb24pIHtcbiAgICAgICAgdGhpcy5fZGVidWcoJ0NvbmZpZ3VyaW5nIGNlbnRyaWZ1Z2Ugb2JqZWN0IHdpdGgnLCBjb25maWd1cmF0aW9uKTtcblxuICAgICAgICBpZiAoIWNvbmZpZ3VyYXRpb24pIHtcbiAgICAgICAgICAgIGNvbmZpZ3VyYXRpb24gPSB7fTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuX2NvbmZpZyA9IG1peGluKGZhbHNlLCB0aGlzLl9jb25maWcsIGNvbmZpZ3VyYXRpb24pO1xuXG4gICAgICAgIGlmICghdGhpcy5fY29uZmlnLnVybCkge1xuICAgICAgICAgICAgdGhyb3cgJ01pc3NpbmcgcmVxdWlyZWQgY29uZmlndXJhdGlvbiBwYXJhbWV0ZXIgXFwndXJsXFwnIHNwZWNpZnlpbmcgc2VydmVyIFVSTCc7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoIXRoaXMuX2NvbmZpZy51c2VyICYmIHRoaXMuX2NvbmZpZy51c2VyICE9PSAnJykge1xuICAgICAgICAgICAgaWYgKCF0aGlzLl9jb25maWcuaW5zZWN1cmUpIHtcbiAgICAgICAgICAgICAgICB0aHJvdyAnTWlzc2luZyByZXF1aXJlZCBjb25maWd1cmF0aW9uIHBhcmFtZXRlciBcXCd1c2VyXFwnIHNwZWNpZnlpbmcgdXNlclxcJ3MgdW5pcXVlIElEIGluIHlvdXIgYXBwbGljYXRpb24nO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICB0aGlzLl9kZWJ1ZyhcInVzZXIgbm90IGZvdW5kIGJ1dCB0aGlzIGlzIE9LIGZvciBpbnNlY3VyZSBtb2RlIC0gYW5vbnltb3VzIGFjY2VzcyB3aWxsIGJlIHVzZWRcIik7XG4gICAgICAgICAgICAgICAgdGhpcy5fY29uZmlnLnVzZXIgPSBcIlwiO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgaWYgKCF0aGlzLl9jb25maWcudGltZXN0YW1wKSB7XG4gICAgICAgICAgICBpZiAoIXRoaXMuX2NvbmZpZy5pbnNlY3VyZSkge1xuICAgICAgICAgICAgICAgIHRocm93ICdNaXNzaW5nIHJlcXVpcmVkIGNvbmZpZ3VyYXRpb24gcGFyYW1ldGVyIFxcJ3RpbWVzdGFtcFxcJyc7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHRoaXMuX2RlYnVnKFwidG9rZW4gbm90IGZvdW5kIGJ1dCB0aGlzIGlzIE9LIGZvciBpbnNlY3VyZSBtb2RlXCIpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgaWYgKCF0aGlzLl9jb25maWcudG9rZW4pIHtcbiAgICAgICAgICAgIGlmICghdGhpcy5fY29uZmlnLmluc2VjdXJlKSB7XG4gICAgICAgICAgICAgICAgdGhyb3cgJ01pc3NpbmcgcmVxdWlyZWQgY29uZmlndXJhdGlvbiBwYXJhbWV0ZXIgXFwndG9rZW5cXCcgc3BlY2lmeWluZyB0aGUgc2lnbiBvZiBhdXRob3JpemF0aW9uIHJlcXVlc3QnO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICB0aGlzLl9kZWJ1ZyhcInRpbWVzdGFtcCBub3QgZm91bmQgYnV0IHRoaXMgaXMgT0sgZm9yIGluc2VjdXJlIG1vZGVcIik7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLl9jb25maWcudXJsID0gc3RyaXBTbGFzaCh0aGlzLl9jb25maWcudXJsKTtcblxuICAgICAgICBpZiAoZW5kc1dpdGgodGhpcy5fY29uZmlnLnVybCwgJ2Nvbm5lY3Rpb24nKSkge1xuICAgICAgICAgICAgdGhpcy5fZGVidWcoXCJjbGllbnQgd2lsbCBjb25uZWN0IHRvIFNvY2tKUyBlbmRwb2ludFwiKTtcbiAgICAgICAgICAgIGlmICh0eXBlb2YgU29ja0pTID09PSAndW5kZWZpbmVkJykge1xuICAgICAgICAgICAgICAgIHRocm93ICdpbmNsdWRlIFNvY2tKUyBjbGllbnQgbGlicmFyeSBiZWZvcmUgQ2VudHJpZnVnZSBqYXZhc2NyaXB0IGNsaWVudCBsaWJyYXJ5IG9yIHVzZSByYXcgV2Vic29ja2V0IGNvbm5lY3Rpb24gZW5kcG9pbnQnO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy5fc29ja2pzID0gdHJ1ZTtcbiAgICAgICAgfSBlbHNlIGlmIChlbmRzV2l0aCh0aGlzLl9jb25maWcudXJsLCAnY29ubmVjdGlvbi93ZWJzb2NrZXQnKSkge1xuICAgICAgICAgICAgdGhpcy5fZGVidWcoXCJjbGllbnQgd2lsbCBjb25uZWN0IHRvIHJhdyBXZWJzb2NrZXQgZW5kcG9pbnRcIik7XG4gICAgICAgICAgICB0aGlzLl9jb25maWcudXJsID0gdGhpcy5fY29uZmlnLnVybC5yZXBsYWNlKFwiaHR0cDovL1wiLCBcIndzOi8vXCIpO1xuICAgICAgICAgICAgdGhpcy5fY29uZmlnLnVybCA9IHRoaXMuX2NvbmZpZy51cmwucmVwbGFjZShcImh0dHBzOi8vXCIsIFwid3NzOi8vXCIpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5fZGVidWcoXCJjbGllbnQgd2lsbCBkZXRlY3QgY29ubmVjdGlvbiBlbmRwb2ludCBpdHNlbGZcIik7XG4gICAgICAgICAgICBpZiAodHlwZW9mIFNvY2tKUyA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgICAgICAgICB0aGlzLl9kZWJ1ZyhcIm5vIFNvY2tKUyBmb3VuZCwgY2xpZW50IHdpbGwgY29ubmVjdCB0byByYXcgV2Vic29ja2V0IGVuZHBvaW50XCIpO1xuICAgICAgICAgICAgICAgIHRoaXMuX2NvbmZpZy51cmwgKz0gXCIvY29ubmVjdGlvbi93ZWJzb2NrZXRcIjtcbiAgICAgICAgICAgICAgICB0aGlzLl9jb25maWcudXJsID0gdGhpcy5fY29uZmlnLnVybC5yZXBsYWNlKFwiaHR0cDovL1wiLCBcIndzOi8vXCIpO1xuICAgICAgICAgICAgICAgIHRoaXMuX2NvbmZpZy51cmwgPSB0aGlzLl9jb25maWcudXJsLnJlcGxhY2UoXCJodHRwczovL1wiLCBcIndzczovL1wiKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgdGhpcy5fZGVidWcoXCJTb2NrSlMgZm91bmQsIGNsaWVudCB3aWxsIGNvbm5lY3QgdG8gU29ja0pTIGVuZHBvaW50XCIpO1xuICAgICAgICAgICAgICAgIHRoaXMuX2NvbmZpZy51cmwgKz0gXCIvY29ubmVjdGlvblwiO1xuICAgICAgICAgICAgICAgIHRoaXMuX3NvY2tqcyA9IHRydWU7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9O1xuXG4gICAgY2VudHJpZnVnZVByb3RvLl9zZXRTdGF0dXMgPSBmdW5jdGlvbiAobmV3U3RhdHVzKSB7XG4gICAgICAgIGlmICh0aGlzLl9zdGF0dXMgIT09IG5ld1N0YXR1cykge1xuICAgICAgICAgICAgdGhpcy5fZGVidWcoJ1N0YXR1cycsIHRoaXMuX3N0YXR1cywgJy0+JywgbmV3U3RhdHVzKTtcbiAgICAgICAgICAgIHRoaXMuX3N0YXR1cyA9IG5ld1N0YXR1cztcbiAgICAgICAgfVxuICAgIH07XG5cbiAgICBjZW50cmlmdWdlUHJvdG8uX2lzRGlzY29ubmVjdGVkID0gZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fc3RhdHVzID09PSAnZGlzY29ubmVjdGVkJztcbiAgICB9O1xuXG4gICAgY2VudHJpZnVnZVByb3RvLl9pc0Nvbm5lY3RpbmcgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3N0YXR1cyA9PT0gJ2Nvbm5lY3RpbmcnO1xuICAgIH07XG5cbiAgICBjZW50cmlmdWdlUHJvdG8uX2lzQ29ubmVjdGVkID0gZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fc3RhdHVzID09PSAnY29ubmVjdGVkJztcbiAgICB9O1xuXG4gICAgY2VudHJpZnVnZVByb3RvLl9uZXh0TWVzc2FnZUlkID0gZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gKyt0aGlzLl9tZXNzYWdlSWQ7XG4gICAgfTtcblxuICAgIGNlbnRyaWZ1Z2VQcm90by5fcmVzZXRSZXRyeSA9IGZ1bmN0aW9uKCkge1xuICAgICAgICB0aGlzLl9kZWJ1ZyhcInJlc2V0IHJldHJpZXMgY291bnQgdG8gMFwiKTtcbiAgICAgICAgdGhpcy5fcmV0cmllcyA9IDA7XG4gICAgfTtcblxuICAgIGNlbnRyaWZ1Z2VQcm90by5fZ2V0UmV0cnlJbnRlcnZhbCA9IGZ1bmN0aW9uKCkge1xuICAgICAgICB2YXIgaW50ZXJ2YWwgPSBiYWNrb2ZmKHRoaXMuX3JldHJpZXMsIHRoaXMuX2NvbmZpZy5yZXRyeSwgdGhpcy5fY29uZmlnLm1heFJldHJ5KTtcbiAgICAgICAgdGhpcy5fcmV0cmllcyArPSAxO1xuICAgICAgICByZXR1cm4gaW50ZXJ2YWw7XG4gICAgfTtcblxuICAgIGNlbnRyaWZ1Z2VQcm90by5fY2xlYXJDb25uZWN0ZWRTdGF0ZSA9IGZ1bmN0aW9uIChyZWNvbm5lY3QpIHtcbiAgICAgICAgc2VsZi5fY2xpZW50SUQgPSBudWxsO1xuXG4gICAgICAgIC8vIGZpcmUgZXJyYmFja3Mgb2YgcmVnaXN0ZXJlZCBjYWxscy5cbiAgICAgICAgZm9yICh2YXIgdWlkIGluIHRoaXMuX2NhbGxiYWNrcykge1xuICAgICAgICAgICAgdmFyIGNhbGxiYWNrcyA9IHRoaXMuX2NhbGxiYWNrc1t1aWRdO1xuICAgICAgICAgICAgdmFyIGVycmJhY2sgPSBjYWxsYmFja3NbXCJlcnJiYWNrXCJdO1xuICAgICAgICAgICAgaWYgKCFlcnJiYWNrKSB7XG4gICAgICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlcnJiYWNrKHRoaXMuX2NyZWF0ZUVycm9yT2JqZWN0KFwiZGlzY29ubmVjdGVkXCIsIFwicmV0cnlcIikpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuX2NhbGxiYWNrcyA9IHt9O1xuXG4gICAgICAgIC8vIGZpcmUgdW5zdWJzY3JpYmUgZXZlbnRzXG4gICAgICAgIGZvciAodmFyIGNoYW5uZWwgaW4gdGhpcy5fc3Vicykge1xuICAgICAgICAgICAgdmFyIHN1YiA9IHRoaXMuX3N1YnNbY2hhbm5lbF07XG4gICAgICAgICAgICBpZiAocmVjb25uZWN0KSB7XG4gICAgICAgICAgICAgICAgaWYgKHN1Yi5faXNTdWNjZXNzKCkpIHtcbiAgICAgICAgICAgICAgICAgICAgc3ViLl90cmlnZ2VyVW5zdWJzY3JpYmUoKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgc3ViLl9zZXRTdWJzY3JpYmluZygpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBzdWIuX3NldFVuc3Vic2NyaWJlZCgpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgaWYgKCF0aGlzLl9jb25maWcucmVzdWJzY3JpYmUgfHwgIXRoaXMuX3JlY29ubmVjdCkge1xuICAgICAgICAgICAgLy8gY29tcGxldGVseSBjbGVhciBjb25uZWN0ZWQgc3RhdGVcbiAgICAgICAgICAgIHRoaXMuX3N1YnMgPSB7fTtcbiAgICAgICAgfVxuICAgIH07XG5cbiAgICBjZW50cmlmdWdlUHJvdG8uX3NlbmQgPSBmdW5jdGlvbiAobWVzc2FnZXMpIHtcbiAgICAgICAgaWYgKG1lc3NhZ2VzLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuX2RlYnVnKCdTZW5kJywgbWVzc2FnZXMpO1xuICAgICAgICB0aGlzLl90cmFuc3BvcnQuc2VuZChKU09OLnN0cmluZ2lmeShtZXNzYWdlcykpO1xuICAgIH07XG5cbiAgICBjZW50cmlmdWdlUHJvdG8uX2Nvbm5lY3QgPSBmdW5jdGlvbiAoY2FsbGJhY2spIHtcblxuICAgICAgICBpZiAodGhpcy5pc0Nvbm5lY3RlZCgpKSB7XG4gICAgICAgICAgICB0aGlzLl9kZWJ1ZyhcImNvbm5lY3QgY2FsbGVkIHdoZW4gYWxyZWFkeSBjb25uZWN0ZWRcIik7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLl9zZXRTdGF0dXMoJ2Nvbm5lY3RpbmcnKTtcbiAgICAgICAgdGhpcy5fY2xpZW50SUQgPSBudWxsO1xuICAgICAgICB0aGlzLl9yZWNvbm5lY3QgPSB0cnVlO1xuXG4gICAgICAgIHZhciBzZWxmID0gdGhpcztcblxuICAgICAgICBpZiAoY2FsbGJhY2spIHtcbiAgICAgICAgICAgIHRoaXMub24oJ2Nvbm5lY3QnLCBjYWxsYmFjayk7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBkZXRlY3QgdHJhbnNwb3J0IHRvIHVzZSAtIFNvY2tKUyBvciByYXcgV2Vic29ja2V0XG4gICAgICAgIGlmICh0aGlzLl9zb2NranMgPT09IHRydWUpIHtcbiAgICAgICAgICAgIHZhciBzb2NranNPcHRpb25zID0ge1xuICAgICAgICAgICAgICAgIFwidHJhbnNwb3J0c1wiOiB0aGlzLl9jb25maWcudHJhbnNwb3J0c1xuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIGlmICh0aGlzLl9jb25maWcuc2VydmVyICE9PSBudWxsKSB7XG4gICAgICAgICAgICAgICAgc29ja2pzT3B0aW9uc1snc2VydmVyJ10gPSB0aGlzLl9jb25maWcuc2VydmVyO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy5fdHJhbnNwb3J0ID0gbmV3IFNvY2tKUyh0aGlzLl9jb25maWcudXJsLCBudWxsLCBzb2NranNPcHRpb25zKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuX3RyYW5zcG9ydCA9IG5ldyBXZWJTb2NrZXQodGhpcy5fY29uZmlnLnVybCk7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLl90cmFuc3BvcnQub25vcGVuID0gZnVuY3Rpb24gKCkge1xuXG4gICAgICAgICAgICBzZWxmLl9yZWNvbm5lY3RpbmcgPSBmYWxzZTtcblxuICAgICAgICAgICAgaWYgKHNlbGYuX3NvY2tqcykge1xuICAgICAgICAgICAgICAgIHNlbGYuX3RyYW5zcG9ydE5hbWUgPSBzZWxmLl90cmFuc3BvcnQuX3RyYW5zcG9ydC50cmFuc3BvcnROYW1lO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBzZWxmLl90cmFuc3BvcnROYW1lID0gXCJyYXctd2Vic29ja2V0XCI7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHNlbGYuX3Jlc2V0UmV0cnkoKTtcblxuICAgICAgICAgICAgaWYgKCFpc1N0cmluZyhzZWxmLl9jb25maWcudXNlcikpIHtcbiAgICAgICAgICAgICAgICBzZWxmLl9sb2coXCJ1c2VyIGV4cGVjdGVkIHRvIGJlIHN0cmluZ1wiKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmICghaXNTdHJpbmcoc2VsZi5fY29uZmlnLmluZm8pKSB7XG4gICAgICAgICAgICAgICAgc2VsZi5fbG9nKFwiaW5mbyBleHBlY3RlZCB0byBiZSBzdHJpbmdcIik7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHZhciBtc2cgPSB7XG4gICAgICAgICAgICAgICAgJ21ldGhvZCc6ICdjb25uZWN0JyxcbiAgICAgICAgICAgICAgICAncGFyYW1zJzoge1xuICAgICAgICAgICAgICAgICAgICAndXNlcic6IHNlbGYuX2NvbmZpZy51c2VyLFxuICAgICAgICAgICAgICAgICAgICAnaW5mbyc6IHNlbGYuX2NvbmZpZy5pbmZvXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgaWYgKCFzZWxmLl9jb25maWcuaW5zZWN1cmUpIHtcbiAgICAgICAgICAgICAgICAvLyBpbiBpbnNlY3VyZSBjbGllbnQgbW9kZSB3ZSBkb24ndCBuZWVkIHRpbWVzdGFtcCBhbmQgdG9rZW4uXG4gICAgICAgICAgICAgICAgbXNnW1wicGFyYW1zXCJdW1widGltZXN0YW1wXCJdID0gc2VsZi5fY29uZmlnLnRpbWVzdGFtcDtcbiAgICAgICAgICAgICAgICBtc2dbXCJwYXJhbXNcIl1bXCJ0b2tlblwiXSA9IHNlbGYuX2NvbmZpZy50b2tlbjtcbiAgICAgICAgICAgICAgICBpZiAoIWlzU3RyaW5nKHNlbGYuX2NvbmZpZy50aW1lc3RhbXApKSB7XG4gICAgICAgICAgICAgICAgICAgIHNlbGYuX2xvZyhcInRpbWVzdGFtcCBleHBlY3RlZCB0byBiZSBzdHJpbmdcIik7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmICghaXNTdHJpbmcoc2VsZi5fY29uZmlnLnRva2VuKSkge1xuICAgICAgICAgICAgICAgICAgICBzZWxmLl9sb2coXCJ0b2tlbiBleHBlY3RlZCB0byBiZSBzdHJpbmdcIik7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgc2VsZi5fYWRkTWVzc2FnZShtc2cpO1xuICAgICAgICAgICAgc2VsZi5fbGF0ZW5jeVN0YXJ0ID0gbmV3IERhdGUoKTtcbiAgICAgICAgfTtcblxuICAgICAgICB0aGlzLl90cmFuc3BvcnQub25lcnJvciA9IGZ1bmN0aW9uIChlcnJvcikge1xuICAgICAgICAgICAgc2VsZi5fZGVidWcoXCJ0cmFuc3BvcnQgbGV2ZWwgZXJyb3JcIiwgZXJyb3IpO1xuICAgICAgICB9O1xuXG4gICAgICAgIHRoaXMuX3RyYW5zcG9ydC5vbmNsb3NlID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgc2VsZi5fZGlzY29ubmVjdChcImNvbm5lY3Rpb24gY2xvc2VkXCIsIHRydWUsIGZhbHNlKTtcbiAgICAgICAgfTtcblxuICAgICAgICB0aGlzLl90cmFuc3BvcnQub25tZXNzYWdlID0gZnVuY3Rpb24gKGV2ZW50KSB7XG4gICAgICAgICAgICB2YXIgZGF0YTtcbiAgICAgICAgICAgIGRhdGEgPSBKU09OLnBhcnNlKGV2ZW50LmRhdGEpO1xuICAgICAgICAgICAgc2VsZi5fZGVidWcoJ1JlY2VpdmVkJywgZGF0YSk7XG4gICAgICAgICAgICBzZWxmLl9yZWNlaXZlKGRhdGEpO1xuICAgICAgICB9O1xuICAgIH07XG5cbiAgICBjZW50cmlmdWdlUHJvdG8uX2Rpc2Nvbm5lY3QgPSBmdW5jdGlvbiAocmVhc29uLCBzaG91bGRSZWNvbm5lY3QsIGNsb3NlVHJhbnNwb3J0KSB7XG4gICAgICAgIHRoaXMuX2RlYnVnKFwiZGlzY29ubmVjdGVkOlwiLCByZWFzb24sIHNob3VsZFJlY29ubmVjdCk7XG4gICAgICAgIHZhciByZWNvbm5lY3QgPSBzaG91bGRSZWNvbm5lY3QgfHwgZmFsc2U7XG4gICAgICAgIGlmIChyZWNvbm5lY3QgPT09IGZhbHNlKSB7XG4gICAgICAgICAgICB0aGlzLl9yZWNvbm5lY3QgPSBmYWxzZTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuX2NsZWFyQ29ubmVjdGVkU3RhdGUoc2hvdWxkUmVjb25uZWN0KTtcblxuICAgICAgICBpZiAoIXRoaXMuaXNEaXNjb25uZWN0ZWQoKSkge1xuICAgICAgICAgICAgdGhpcy5fc2V0U3RhdHVzKCdkaXNjb25uZWN0ZWQnKTtcbiAgICAgICAgICAgIHZhciBkaXNjb25uZWN0Q29udGV4dCA9IHtcbiAgICAgICAgICAgICAgICBcInJlYXNvblwiOiByZWFzb24sXG4gICAgICAgICAgICAgICAgXCJyZWNvbm5lY3RcIjogcmVjb25uZWN0XG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgaWYgKHRoaXMuX3JlY29ubmVjdGluZyA9PT0gZmFsc2UpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnRyaWdnZXIoJ2Rpc2Nvbm5lY3QnLCBbZGlzY29ubmVjdENvbnRleHRdKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChjbG9zZVRyYW5zcG9ydCkge1xuICAgICAgICAgICAgdGhpcy5fdHJhbnNwb3J0LmNsb3NlKCk7XG4gICAgICAgIH1cblxuICAgICAgICB2YXIgc2VsZiA9IHRoaXM7XG4gICAgICAgIGlmIChzaG91bGRSZWNvbm5lY3QgPT09IHRydWUgJiYgc2VsZi5fcmVjb25uZWN0ID09PSB0cnVlKSB7XG4gICAgICAgICAgICBzZWxmLl9yZWNvbm5lY3RpbmcgPSB0cnVlO1xuICAgICAgICAgICAgdmFyIGludGVydmFsID0gc2VsZi5fZ2V0UmV0cnlJbnRlcnZhbCgpO1xuICAgICAgICAgICAgc2VsZi5fZGVidWcoXCJyZWNvbm5lY3QgYWZ0ZXIgXCIgKyBpbnRlcnZhbCArIFwiIG1pbGxpc2Vjb25kc1wiKTtcbiAgICAgICAgICAgIHdpbmRvdy5zZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICBpZiAoc2VsZi5fcmVjb25uZWN0ID09PSB0cnVlKSB7XG4gICAgICAgICAgICAgICAgICAgIHNlbGYuX2Nvbm5lY3QuY2FsbChzZWxmKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LCBpbnRlcnZhbCk7XG4gICAgICAgIH1cbiAgICB9O1xuXG4gICAgY2VudHJpZnVnZVByb3RvLl9yZWZyZXNoID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAvLyBhc2sgd2ViIGFwcCBmb3IgY29ubmVjdGlvbiBwYXJhbWV0ZXJzIC0gdXNlciBJRCxcbiAgICAgICAgLy8gdGltZXN0YW1wLCBpbmZvIGFuZCB0b2tlblxuICAgICAgICB2YXIgc2VsZiA9IHRoaXM7XG4gICAgICAgIHRoaXMuX2RlYnVnKCdyZWZyZXNoIGNyZWRlbnRpYWxzJyk7XG5cbiAgICAgICAgdmFyIGNiID0gZnVuY3Rpb24oZXJyb3IsIGRhdGEpIHtcbiAgICAgICAgICAgIGlmIChlcnJvciA9PT0gdHJ1ZSkge1xuICAgICAgICAgICAgICAgIC8vIDQwMyBvciA1MDAgLSBkb2VzIG5vdCBtYXR0ZXIgLSBpZiBjb25uZWN0aW9uIGNoZWNrIGFjdGl2YXRlZCB0aGVuIENlbnRyaWZ1Z29cbiAgICAgICAgICAgICAgICAvLyB3aWxsIGRpc2Nvbm5lY3QgY2xpZW50IGV2ZW50dWFsbHlcbiAgICAgICAgICAgICAgICBzZWxmLl9kZWJ1ZyhcImVycm9yIGdldHRpbmcgY29ubmVjdCBwYXJhbWV0ZXJzXCIsIGRhdGEpO1xuICAgICAgICAgICAgICAgIGlmIChzZWxmLl9yZWZyZXNoVGltZW91dCkge1xuICAgICAgICAgICAgICAgICAgICB3aW5kb3cuY2xlYXJUaW1lb3V0KHNlbGYuX3JlZnJlc2hUaW1lb3V0KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgc2VsZi5fcmVmcmVzaFRpbWVvdXQgPSB3aW5kb3cuc2V0VGltZW91dChmdW5jdGlvbigpe1xuICAgICAgICAgICAgICAgICAgICBzZWxmLl9yZWZyZXNoLmNhbGwoc2VsZik7XG4gICAgICAgICAgICAgICAgfSwgMzAwMCk7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgc2VsZi5fY29uZmlnLnVzZXIgPSBkYXRhLnVzZXI7XG4gICAgICAgICAgICBzZWxmLl9jb25maWcudGltZXN0YW1wID0gZGF0YS50aW1lc3RhbXA7XG4gICAgICAgICAgICBzZWxmLl9jb25maWcuaW5mbyA9IGRhdGEuaW5mbztcbiAgICAgICAgICAgIHNlbGYuX2NvbmZpZy50b2tlbiA9IGRhdGEudG9rZW47XG4gICAgICAgICAgICBpZiAoc2VsZi5pc0Rpc2Nvbm5lY3RlZCgpKSB7XG4gICAgICAgICAgICAgICAgc2VsZi5fZGVidWcoXCJjcmVkZW50aWFscyByZWZyZXNoZWQsIGNvbm5lY3QgZnJvbSBzY3JhdGNoXCIpO1xuICAgICAgICAgICAgICAgIHNlbGYuX2Nvbm5lY3QoKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgc2VsZi5fZGVidWcoXCJzZW5kIHJlZnJlc2hlZCBjcmVkZW50aWFsc1wiKTtcbiAgICAgICAgICAgICAgICB2YXIgbXNnID0ge1xuICAgICAgICAgICAgICAgICAgICBcIm1ldGhvZFwiOiBcInJlZnJlc2hcIixcbiAgICAgICAgICAgICAgICAgICAgXCJwYXJhbXNcIjoge1xuICAgICAgICAgICAgICAgICAgICAgICAgJ3VzZXInOiBzZWxmLl9jb25maWcudXNlcixcbiAgICAgICAgICAgICAgICAgICAgICAgICd0aW1lc3RhbXAnOiBzZWxmLl9jb25maWcudGltZXN0YW1wLFxuICAgICAgICAgICAgICAgICAgICAgICAgJ2luZm8nOiBzZWxmLl9jb25maWcuaW5mbyxcbiAgICAgICAgICAgICAgICAgICAgICAgICd0b2tlbic6IHNlbGYuX2NvbmZpZy50b2tlblxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICBzZWxmLl9hZGRNZXNzYWdlKG1zZyk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG5cbiAgICAgICAgdmFyIHRyYW5zcG9ydCA9IHRoaXMuX2NvbmZpZy5yZWZyZXNoVHJhbnNwb3J0LnRvTG93ZXJDYXNlKCk7XG4gICAgICAgIGlmICh0cmFuc3BvcnQgPT09IFwiYWpheFwiKSB7XG4gICAgICAgICAgICB0aGlzLl9hamF4KHRoaXMuX2NvbmZpZy5yZWZyZXNoRW5kcG9pbnQsIHRoaXMuX2NvbmZpZy5yZWZyZXNoUGFyYW1zLCB0aGlzLl9jb25maWcucmVmcmVzaEhlYWRlcnMsIHt9LCBjYik7XG4gICAgICAgIH0gZWxzZSBpZiAodHJhbnNwb3J0ID09PSBcImpzb25wXCIpIHtcbiAgICAgICAgICAgIHRoaXMuX2pzb25wKHRoaXMuX2NvbmZpZy5yZWZyZXNoRW5kcG9pbnQsIHRoaXMuX2NvbmZpZy5yZWZyZXNoUGFyYW1zLCB0aGlzLl9jb25maWcucmVmcmVzaEhlYWRlcnMsIHt9LCBjYik7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aHJvdyAnVW5rbm93biByZWZyZXNoIHRyYW5zcG9ydCAnICsgdHJhbnNwb3J0O1xuICAgICAgICB9XG4gICAgfTtcblxuICAgIGNlbnRyaWZ1Z2VQcm90by5fc3Vic2NyaWJlID0gZnVuY3Rpb24oc3ViKSB7XG5cbiAgICAgICAgdmFyIGNoYW5uZWwgPSBzdWIuY2hhbm5lbDtcblxuICAgICAgICBpZiAoIShjaGFubmVsIGluIHRoaXMuX3N1YnMpKSB7XG4gICAgICAgICAgICB0aGlzLl9zdWJzW2NoYW5uZWxdID0gc3ViO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKCF0aGlzLmlzQ29ubmVjdGVkKCkpIHtcbiAgICAgICAgICAgIC8vIHN1YnNjcmliZSB3aWxsIGJlIGNhbGxlZCBsYXRlclxuICAgICAgICAgICAgc3ViLl9zZXROZXcoKTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIHN1Yi5fc2V0U3Vic2NyaWJpbmcoKTtcblxuICAgICAgICB2YXIgbXNnID0ge1xuICAgICAgICAgICAgXCJtZXRob2RcIjogXCJzdWJzY3JpYmVcIixcbiAgICAgICAgICAgIFwicGFyYW1zXCI6IHtcbiAgICAgICAgICAgICAgICBcImNoYW5uZWxcIjogY2hhbm5lbFxuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuXG4gICAgICAgIC8vIElmIGNoYW5uZWwgbmFtZSBkb2VzIG5vdCBzdGFydCB3aXRoIHByaXZhdGVDaGFubmVsUHJlZml4IC0gdGhlbiB3ZVxuICAgICAgICAvLyBjYW4ganVzdCBzZW5kIHN1YnNjcmlwdGlvbiBtZXNzYWdlIHRvIENlbnRyaWZ1Z2UuIElmIGNoYW5uZWwgbmFtZVxuICAgICAgICAvLyBzdGFydHMgd2l0aCBwcml2YXRlQ2hhbm5lbFByZWZpeCAtIHRoZW4gdGhpcyBpcyBhIHByaXZhdGUgY2hhbm5lbFxuICAgICAgICAvLyBhbmQgd2Ugc2hvdWxkIGFzayB3ZWIgYXBwbGljYXRpb24gYmFja2VuZCBmb3IgcGVybWlzc2lvbiBmaXJzdC5cbiAgICAgICAgaWYgKHN0YXJ0c1dpdGgoY2hhbm5lbCwgdGhpcy5fY29uZmlnLnByaXZhdGVDaGFubmVsUHJlZml4KSkge1xuICAgICAgICAgICAgLy8gcHJpdmF0ZSBjaGFubmVsXG4gICAgICAgICAgICBpZiAodGhpcy5faXNBdXRoQmF0Y2hpbmcpIHtcbiAgICAgICAgICAgICAgICB0aGlzLl9hdXRoQ2hhbm5lbHNbY2hhbm5lbF0gPSB0cnVlO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICB0aGlzLnN0YXJ0QXV0aEJhdGNoaW5nKCk7XG4gICAgICAgICAgICAgICAgdGhpcy5fc3Vic2NyaWJlKHN1Yik7XG4gICAgICAgICAgICAgICAgdGhpcy5zdG9wQXV0aEJhdGNoaW5nKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB2YXIgcmVjb3ZlciA9IHRoaXMuX3JlY292ZXIoY2hhbm5lbCk7XG4gICAgICAgICAgICBpZiAocmVjb3ZlciA9PT0gdHJ1ZSkge1xuICAgICAgICAgICAgICAgIG1zZ1tcInBhcmFtc1wiXVtcInJlY292ZXJcIl0gPSB0cnVlO1xuICAgICAgICAgICAgICAgIG1zZ1tcInBhcmFtc1wiXVtcImxhc3RcIl0gPSB0aGlzLl9nZXRMYXN0SUQoY2hhbm5lbCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLl9hZGRNZXNzYWdlKG1zZyk7XG4gICAgICAgIH1cbiAgICB9O1xuXG4gICAgY2VudHJpZnVnZVByb3RvLl91bnN1YnNjcmliZSA9IGZ1bmN0aW9uKHN1Yikge1xuICAgICAgICBpZiAodGhpcy5pc0Nvbm5lY3RlZCgpKSB7XG4gICAgICAgICAgICAvLyBObyBuZWVkIHRvIHVuc3Vic2NyaWJlIGluIGRpc2Nvbm5lY3RlZCBzdGF0ZSAtIGkuZS4gY2xpZW50IGFscmVhZHkgdW5zdWJzY3JpYmVkLlxuICAgICAgICAgICAgdmFyIG1zZyA9IHtcbiAgICAgICAgICAgICAgICBcIm1ldGhvZFwiOiBcInVuc3Vic2NyaWJlXCIsXG4gICAgICAgICAgICAgICAgXCJwYXJhbXNcIjoge1xuICAgICAgICAgICAgICAgICAgICBcImNoYW5uZWxcIjogc3ViLmNoYW5uZWxcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgdGhpcy5fYWRkTWVzc2FnZShtc2cpO1xuICAgICAgICB9XG4gICAgfTtcblxuICAgIGNlbnRyaWZ1Z2VQcm90by5fZ2V0U3ViID0gZnVuY3Rpb24oY2hhbm5lbCkge1xuICAgICAgICB2YXIgc3ViID0gdGhpcy5fc3Vic1tjaGFubmVsXTtcbiAgICAgICAgaWYgKCFzdWIpIHtcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBzdWI7XG4gICAgfTtcblxuICAgIGNlbnRyaWZ1Z2VQcm90by5fY29ubmVjdFJlc3BvbnNlID0gZnVuY3Rpb24gKG1lc3NhZ2UpIHtcblxuICAgICAgICBpZiAodGhpcy5pc0Nvbm5lY3RlZCgpKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoIWVycm9yRXhpc3RzKG1lc3NhZ2UpKSB7XG5cbiAgICAgICAgICAgIGlmICh0aGlzLl9sYXRlbmN5U3RhcnQgIT09IG51bGwpIHtcbiAgICAgICAgICAgICAgICB0aGlzLl9sYXRlbmN5ID0gKG5ldyBEYXRlKCkpLmdldFRpbWUoKSAtIHRoaXMuX2xhdGVuY3lTdGFydC5nZXRUaW1lKCk7XG4gICAgICAgICAgICAgICAgdGhpcy5fbGF0ZW5jeVN0YXJ0ID0gbnVsbDtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKCFtZXNzYWdlLmJvZHkpIHtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAobWVzc2FnZS5ib2R5LmV4cGlyZXMpIHtcbiAgICAgICAgICAgICAgICB2YXIgaXNFeHBpcmVkID0gbWVzc2FnZS5ib2R5LmV4cGlyZWQ7XG4gICAgICAgICAgICAgICAgaWYgKGlzRXhwaXJlZCkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLl9yZWZyZXNoKCk7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLl9jbGllbnRJRCA9IG1lc3NhZ2UuYm9keS5jbGllbnQ7XG4gICAgICAgICAgICB0aGlzLl9zZXRTdGF0dXMoJ2Nvbm5lY3RlZCcpO1xuXG4gICAgICAgICAgICBpZiAodGhpcy5fcmVmcmVzaFRpbWVvdXQpIHtcbiAgICAgICAgICAgICAgICB3aW5kb3cuY2xlYXJUaW1lb3V0KHRoaXMuX3JlZnJlc2hUaW1lb3V0KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChtZXNzYWdlLmJvZHkuZXhwaXJlcykge1xuICAgICAgICAgICAgICAgIHZhciBzZWxmID0gdGhpcztcbiAgICAgICAgICAgICAgICB0aGlzLl9yZWZyZXNoVGltZW91dCA9IHdpbmRvdy5zZXRUaW1lb3V0KGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgICAgICBzZWxmLl9yZWZyZXNoLmNhbGwoc2VsZik7XG4gICAgICAgICAgICAgICAgfSwgbWVzc2FnZS5ib2R5LnR0bCAqIDEwMDApO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAodGhpcy5fY29uZmlnLnJlc3Vic2NyaWJlKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5zdGFydEJhdGNoaW5nKCk7XG4gICAgICAgICAgICAgICAgdGhpcy5zdGFydEF1dGhCYXRjaGluZygpO1xuICAgICAgICAgICAgICAgIGZvciAodmFyIGNoYW5uZWwgaW4gdGhpcy5fc3Vicykge1xuICAgICAgICAgICAgICAgICAgICB2YXIgc3ViID0gdGhpcy5fc3Vic1tjaGFubmVsXTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fc3Vic2NyaWJlKHN1Yik7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHRoaXMuc3RvcEF1dGhCYXRjaGluZygpO1xuICAgICAgICAgICAgICAgIHRoaXMuc3RvcEJhdGNoaW5nKHRydWUpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB2YXIgY29ubmVjdENvbnRleHQgPSB7XG4gICAgICAgICAgICAgICAgXCJjbGllbnRcIjogbWVzc2FnZS5ib2R5LmNsaWVudCxcbiAgICAgICAgICAgICAgICBcInRyYW5zcG9ydFwiOiB0aGlzLl90cmFuc3BvcnROYW1lLFxuICAgICAgICAgICAgICAgIFwibGF0ZW5jeVwiOiB0aGlzLl9sYXRlbmN5XG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgdGhpcy50cmlnZ2VyKCdjb25uZWN0JywgW2Nvbm5lY3RDb250ZXh0XSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLnRyaWdnZXIoJ2Vycm9yJywgW3tcIm1lc3NhZ2VcIjogbWVzc2FnZX1dKTtcbiAgICAgICAgfVxuICAgIH07XG5cbiAgICBjZW50cmlmdWdlUHJvdG8uX2Rpc2Nvbm5lY3RSZXNwb25zZSA9IGZ1bmN0aW9uIChtZXNzYWdlKSB7XG4gICAgICAgIGlmICghZXJyb3JFeGlzdHMobWVzc2FnZSkpIHtcbiAgICAgICAgICAgIHZhciBzaG91bGRSZWNvbm5lY3QgPSBmYWxzZTtcbiAgICAgICAgICAgIGlmIChcInJlY29ubmVjdFwiIGluIG1lc3NhZ2UuYm9keSkge1xuICAgICAgICAgICAgICAgIHNob3VsZFJlY29ubmVjdCA9IG1lc3NhZ2UuYm9keVtcInJlY29ubmVjdFwiXTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHZhciByZWFzb24gPSBcIlwiO1xuICAgICAgICAgICAgaWYgKFwicmVhc29uXCIgaW4gbWVzc2FnZS5ib2R5KSB7XG4gICAgICAgICAgICAgICAgcmVhc29uID0gbWVzc2FnZS5ib2R5W1wicmVhc29uXCJdO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy5fZGlzY29ubmVjdChyZWFzb24sIHNob3VsZFJlY29ubmVjdCwgdHJ1ZSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLnRyaWdnZXIoJ2Vycm9yJywgW3tcIm1lc3NhZ2VcIjogbWVzc2FnZX1dKTtcbiAgICAgICAgfVxuICAgIH07XG5cbiAgICBjZW50cmlmdWdlUHJvdG8uX3N1YnNjcmliZVJlc3BvbnNlID0gZnVuY3Rpb24gKG1lc3NhZ2UpIHtcbiAgICAgICAgdmFyIGJvZHkgPSBtZXNzYWdlLmJvZHk7XG4gICAgICAgIGlmIChib2R5ID09PSBudWxsKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgdmFyIGNoYW5uZWwgPSBib2R5LmNoYW5uZWw7XG5cbiAgICAgICAgdmFyIHN1YiA9IHRoaXMuX2dldFN1YihjaGFubmVsKTtcbiAgICAgICAgaWYgKCFzdWIpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICghc3ViLl9pc1N1YnNjcmliaW5nKCkpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICghZXJyb3JFeGlzdHMobWVzc2FnZSkpIHtcbiAgICAgICAgICAgIHN1Yi5fc2V0U3Vic2NyaWJlU3VjY2VzcygpO1xuICAgICAgICAgICAgdmFyIG1lc3NhZ2VzID0gYm9keVtcIm1lc3NhZ2VzXCJdO1xuICAgICAgICAgICAgaWYgKG1lc3NhZ2VzICYmIG1lc3NhZ2VzLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgICAgICAvLyBoYW5kbGUgbWlzc2VkIG1lc3NhZ2VzXG4gICAgICAgICAgICAgICAgZm9yICh2YXIgaSBpbiBtZXNzYWdlcy5yZXZlcnNlKCkpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fbWVzc2FnZVJlc3BvbnNlKHtib2R5OiBtZXNzYWdlc1tpXX0pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgaWYgKFwibGFzdFwiIGluIGJvZHkpIHtcbiAgICAgICAgICAgICAgICAgICAgLy8gbm8gbWlzc2VkIG1lc3NhZ2VzIGZvdW5kIHNvIHNldCBsYXN0IG1lc3NhZ2UgaWQgZnJvbSBib2R5LlxuICAgICAgICAgICAgICAgICAgICB0aGlzLl9sYXN0TWVzc2FnZUlEW2NoYW5uZWxdID0gYm9keVtcImxhc3RcIl07XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy50cmlnZ2VyKCdlcnJvcicsIFt7XCJtZXNzYWdlXCI6IG1lc3NhZ2V9XSk7XG4gICAgICAgICAgICBzdWIuX3NldFN1YnNjcmliZUVycm9yKHRoaXMuX2Vycm9yT2JqZWN0RnJvbU1lc3NhZ2UobWVzc2FnZSkpO1xuICAgICAgICB9XG4gICAgfTtcblxuICAgIGNlbnRyaWZ1Z2VQcm90by5fdW5zdWJzY3JpYmVSZXNwb25zZSA9IGZ1bmN0aW9uIChtZXNzYWdlKSB7XG4gICAgICAgIHZhciB1aWQgPSBtZXNzYWdlLnVpZDtcbiAgICAgICAgdmFyIGJvZHkgPSBtZXNzYWdlLmJvZHk7XG4gICAgICAgIHZhciBjaGFubmVsID0gYm9keS5jaGFubmVsO1xuXG4gICAgICAgIHZhciBzdWIgPSB0aGlzLl9nZXRTdWIoY2hhbm5lbCk7XG4gICAgICAgIGlmICghc3ViKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoIWVycm9yRXhpc3RzKG1lc3NhZ2UpKSB7XG4gICAgICAgICAgICBpZiAoIXVpZCkge1xuICAgICAgICAgICAgICAgIC8vIHVuc3Vic2NyaWJlIGNvbW1hbmQgZnJvbSBzZXJ2ZXIg4oCTIHVuc3Vic2NyaWJlIGFsbCBjdXJyZW50IHN1YnNcbiAgICAgICAgICAgICAgICBzdWIuX3NldFVuc3Vic2NyaWJlZCgpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgLy8gaWdub3JlIGNsaWVudCBpbml0aWF0ZWQgc3VjY2Vzc2Z1bCB1bnN1YnNjcmliZSByZXNwb25zZXMgYXMgd2VcbiAgICAgICAgICAgIC8vIGFscmVhZHkgdW5zdWJzY3JpYmVkIG9uIGNsaWVudCBsZXZlbC5cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMudHJpZ2dlcignZXJyb3InLCBbe1wibWVzc2FnZVwiOiBtZXNzYWdlfV0pO1xuICAgICAgICB9XG4gICAgfTtcblxuICAgIGNlbnRyaWZ1Z2VQcm90by5fcHVibGlzaFJlc3BvbnNlID0gZnVuY3Rpb24gKG1lc3NhZ2UpIHtcbiAgICAgICAgdmFyIHVpZCA9IG1lc3NhZ2UudWlkO1xuICAgICAgICB2YXIgYm9keSA9IG1lc3NhZ2UuYm9keTtcbiAgICAgICAgaWYgKCEodWlkIGluIHRoaXMuX2NhbGxiYWNrcykpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICB2YXIgY2FsbGJhY2tzID0gdGhpcy5fY2FsbGJhY2tzW3VpZF07XG4gICAgICAgIGRlbGV0ZSB0aGlzLl9jYWxsYmFja3NbdWlkXTtcbiAgICAgICAgaWYgKCFlcnJvckV4aXN0cyhtZXNzYWdlKSkge1xuICAgICAgICAgICAgdmFyIGNhbGxiYWNrID0gY2FsbGJhY2tzW1wiY2FsbGJhY2tcIl07XG4gICAgICAgICAgICBpZiAoIWNhbGxiYWNrKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY2FsbGJhY2soYm9keSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB2YXIgZXJyYmFjayA9IGNhbGxiYWNrc1tcImVycmJhY2tcIl07XG4gICAgICAgICAgICBpZiAoIWVycmJhY2spIHtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlcnJiYWNrKHRoaXMuX2Vycm9yT2JqZWN0RnJvbU1lc3NhZ2UobWVzc2FnZSkpO1xuICAgICAgICAgICAgdGhpcy50cmlnZ2VyKCdlcnJvcicsIFt7XCJtZXNzYWdlXCI6IG1lc3NhZ2V9XSk7XG4gICAgICAgIH1cbiAgICB9O1xuXG4gICAgY2VudHJpZnVnZVByb3RvLl9wcmVzZW5jZVJlc3BvbnNlID0gZnVuY3Rpb24gKG1lc3NhZ2UpIHtcbiAgICAgICAgdmFyIHVpZCA9IG1lc3NhZ2UudWlkO1xuICAgICAgICB2YXIgYm9keSA9IG1lc3NhZ2UuYm9keTtcbiAgICAgICAgaWYgKCEodWlkIGluIHRoaXMuX2NhbGxiYWNrcykpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICB2YXIgY2FsbGJhY2tzID0gdGhpcy5fY2FsbGJhY2tzW3VpZF07XG4gICAgICAgIGRlbGV0ZSB0aGlzLl9jYWxsYmFja3NbdWlkXTtcbiAgICAgICAgaWYgKCFlcnJvckV4aXN0cyhtZXNzYWdlKSkge1xuICAgICAgICAgICAgdmFyIGNhbGxiYWNrID0gY2FsbGJhY2tzW1wiY2FsbGJhY2tcIl07XG4gICAgICAgICAgICBpZiAoIWNhbGxiYWNrKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY2FsbGJhY2soYm9keSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB2YXIgZXJyYmFjayA9IGNhbGxiYWNrc1tcImVycmJhY2tcIl07XG4gICAgICAgICAgICBpZiAoIWVycmJhY2spIHtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlcnJiYWNrKHRoaXMuX2Vycm9yT2JqZWN0RnJvbU1lc3NhZ2UobWVzc2FnZSkpO1xuICAgICAgICAgICAgdGhpcy50cmlnZ2VyKCdlcnJvcicsIFt7XCJtZXNzYWdlXCI6IG1lc3NhZ2V9XSk7XG4gICAgICAgIH1cbiAgICB9O1xuXG4gICAgY2VudHJpZnVnZVByb3RvLl9oaXN0b3J5UmVzcG9uc2UgPSBmdW5jdGlvbiAobWVzc2FnZSkge1xuICAgICAgICB2YXIgdWlkID0gbWVzc2FnZS51aWQ7XG4gICAgICAgIHZhciBib2R5ID0gbWVzc2FnZS5ib2R5O1xuICAgICAgICBpZiAoISh1aWQgaW4gdGhpcy5fY2FsbGJhY2tzKSkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIHZhciBjYWxsYmFja3MgPSB0aGlzLl9jYWxsYmFja3NbdWlkXTtcbiAgICAgICAgZGVsZXRlIHRoaXMuX2NhbGxiYWNrc1t1aWRdO1xuICAgICAgICBpZiAoIWVycm9yRXhpc3RzKG1lc3NhZ2UpKSB7XG4gICAgICAgICAgICB2YXIgY2FsbGJhY2sgPSBjYWxsYmFja3NbXCJjYWxsYmFja1wiXTtcbiAgICAgICAgICAgIGlmICghY2FsbGJhY2spIHtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjYWxsYmFjayhib2R5KTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHZhciBlcnJiYWNrID0gY2FsbGJhY2tzW1wiZXJyYmFja1wiXTtcbiAgICAgICAgICAgIGlmICghZXJyYmFjaykge1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVycmJhY2sodGhpcy5fZXJyb3JPYmplY3RGcm9tTWVzc2FnZShtZXNzYWdlKSk7XG4gICAgICAgICAgICB0aGlzLnRyaWdnZXIoJ2Vycm9yJywgW3tcIm1lc3NhZ2VcIjogbWVzc2FnZX1dKTtcbiAgICAgICAgfVxuICAgIH07XG5cbiAgICBjZW50cmlmdWdlUHJvdG8uX2pvaW5SZXNwb25zZSA9IGZ1bmN0aW9uKG1lc3NhZ2UpIHtcbiAgICAgICAgdmFyIGJvZHkgPSBtZXNzYWdlLmJvZHk7XG4gICAgICAgIHZhciBjaGFubmVsID0gYm9keS5jaGFubmVsO1xuXG4gICAgICAgIHZhciBzdWIgPSB0aGlzLl9nZXRTdWIoY2hhbm5lbCk7XG4gICAgICAgIGlmICghc3ViKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgc3ViLnRyaWdnZXIoJ2pvaW4nLCBbYm9keV0pO1xuICAgIH07XG5cbiAgICBjZW50cmlmdWdlUHJvdG8uX2xlYXZlUmVzcG9uc2UgPSBmdW5jdGlvbihtZXNzYWdlKSB7XG4gICAgICAgIHZhciBib2R5ID0gbWVzc2FnZS5ib2R5O1xuICAgICAgICB2YXIgY2hhbm5lbCA9IGJvZHkuY2hhbm5lbDtcblxuICAgICAgICB2YXIgc3ViID0gdGhpcy5fZ2V0U3ViKGNoYW5uZWwpO1xuICAgICAgICBpZiAoIXN1Yikge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIHN1Yi50cmlnZ2VyKCdsZWF2ZScsIFtib2R5XSk7XG4gICAgfTtcblxuICAgIGNlbnRyaWZ1Z2VQcm90by5fbWVzc2FnZVJlc3BvbnNlID0gZnVuY3Rpb24gKG1lc3NhZ2UpIHtcbiAgICAgICAgdmFyIGJvZHkgPSBtZXNzYWdlLmJvZHk7XG4gICAgICAgIHZhciBjaGFubmVsID0gYm9keS5jaGFubmVsO1xuXG4gICAgICAgIC8vIGtlZXAgbGFzdCB1aWQgcmVjZWl2ZWQgZnJvbSBjaGFubmVsLlxuICAgICAgICB0aGlzLl9sYXN0TWVzc2FnZUlEW2NoYW5uZWxdID0gYm9keVtcInVpZFwiXTtcblxuICAgICAgICB2YXIgc3ViID0gdGhpcy5fZ2V0U3ViKGNoYW5uZWwpO1xuICAgICAgICBpZiAoIXN1Yikge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIHN1Yi50cmlnZ2VyKCdtZXNzYWdlJywgW2JvZHldKTtcbiAgICB9O1xuXG4gICAgY2VudHJpZnVnZVByb3RvLl9yZWZyZXNoUmVzcG9uc2UgPSBmdW5jdGlvbiAobWVzc2FnZSkge1xuICAgICAgICBpZiAodGhpcy5fcmVmcmVzaFRpbWVvdXQpIHtcbiAgICAgICAgICAgIHdpbmRvdy5jbGVhclRpbWVvdXQodGhpcy5fcmVmcmVzaFRpbWVvdXQpO1xuICAgICAgICB9XG4gICAgICAgIGlmICghZXJyb3JFeGlzdHMobWVzc2FnZSkpIHtcbiAgICAgICAgICAgIGlmIChtZXNzYWdlLmJvZHkuZXhwaXJlcykge1xuICAgICAgICAgICAgICAgIHZhciBzZWxmID0gdGhpcztcbiAgICAgICAgICAgICAgICB2YXIgaXNFeHBpcmVkID0gbWVzc2FnZS5ib2R5LmV4cGlyZWQ7XG4gICAgICAgICAgICAgICAgaWYgKGlzRXhwaXJlZCkge1xuICAgICAgICAgICAgICAgICAgICBzZWxmLl9yZWZyZXNoVGltZW91dCA9IHdpbmRvdy5zZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYuX3JlZnJlc2guY2FsbChzZWxmKTtcbiAgICAgICAgICAgICAgICAgICAgfSwgMzAwMCArIE1hdGgucm91bmQoTWF0aC5yYW5kb20oKSAqIDEwMDApKTtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB0aGlzLl9jbGllbnRJRCA9IG1lc3NhZ2UuYm9keS5jbGllbnQ7XG4gICAgICAgICAgICAgICAgc2VsZi5fcmVmcmVzaFRpbWVvdXQgPSB3aW5kb3cuc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgICAgIHNlbGYuX3JlZnJlc2guY2FsbChzZWxmKTtcbiAgICAgICAgICAgICAgICB9LCBtZXNzYWdlLmJvZHkudHRsICogMTAwMCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLnRyaWdnZXIoJ2Vycm9yJywgW3tcIm1lc3NhZ2VcIjogbWVzc2FnZX1dKTtcbiAgICAgICAgfVxuICAgIH07XG5cbiAgICBjZW50cmlmdWdlUHJvdG8uX2Rpc3BhdGNoTWVzc2FnZSA9IGZ1bmN0aW9uKG1lc3NhZ2UpIHtcbiAgICAgICAgaWYgKG1lc3NhZ2UgPT09IHVuZGVmaW5lZCB8fCBtZXNzYWdlID09PSBudWxsKSB7XG4gICAgICAgICAgICB0aGlzLl9kZWJ1ZyhcImRpc3BhdGNoOiBnb3QgdW5kZWZpbmVkIG9yIG51bGwgbWVzc2FnZVwiKTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIHZhciBtZXRob2QgPSBtZXNzYWdlLm1ldGhvZDtcblxuICAgICAgICBpZiAoIW1ldGhvZCkge1xuICAgICAgICAgICAgdGhpcy5fZGVidWcoXCJkaXNwYXRjaDogZ290IG1lc3NhZ2Ugd2l0aCBlbXB0eSBtZXRob2RcIik7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBzd2l0Y2ggKG1ldGhvZCkge1xuICAgICAgICAgICAgY2FzZSAnY29ubmVjdCc6XG4gICAgICAgICAgICAgICAgdGhpcy5fY29ubmVjdFJlc3BvbnNlKG1lc3NhZ2UpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSAnZGlzY29ubmVjdCc6XG4gICAgICAgICAgICAgICAgdGhpcy5fZGlzY29ubmVjdFJlc3BvbnNlKG1lc3NhZ2UpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSAnc3Vic2NyaWJlJzpcbiAgICAgICAgICAgICAgICB0aGlzLl9zdWJzY3JpYmVSZXNwb25zZShtZXNzYWdlKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgJ3Vuc3Vic2NyaWJlJzpcbiAgICAgICAgICAgICAgICB0aGlzLl91bnN1YnNjcmliZVJlc3BvbnNlKG1lc3NhZ2UpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSAncHVibGlzaCc6XG4gICAgICAgICAgICAgICAgdGhpcy5fcHVibGlzaFJlc3BvbnNlKG1lc3NhZ2UpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSAncHJlc2VuY2UnOlxuICAgICAgICAgICAgICAgIHRoaXMuX3ByZXNlbmNlUmVzcG9uc2UobWVzc2FnZSk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlICdoaXN0b3J5JzpcbiAgICAgICAgICAgICAgICB0aGlzLl9oaXN0b3J5UmVzcG9uc2UobWVzc2FnZSk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlICdqb2luJzpcbiAgICAgICAgICAgICAgICB0aGlzLl9qb2luUmVzcG9uc2UobWVzc2FnZSk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlICdsZWF2ZSc6XG4gICAgICAgICAgICAgICAgdGhpcy5fbGVhdmVSZXNwb25zZShtZXNzYWdlKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgJ3BpbmcnOlxuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSAncmVmcmVzaCc6XG4gICAgICAgICAgICAgICAgdGhpcy5fcmVmcmVzaFJlc3BvbnNlKG1lc3NhZ2UpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSAnbWVzc2FnZSc6XG4gICAgICAgICAgICAgICAgdGhpcy5fbWVzc2FnZVJlc3BvbnNlKG1lc3NhZ2UpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICB0aGlzLl9kZWJ1ZyhcImRpc3BhdGNoOiBnb3QgbWVzc2FnZSB3aXRoIHVua25vd24gbWV0aG9kXCIgKyBtZXRob2QpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgfTtcblxuICAgIGNlbnRyaWZ1Z2VQcm90by5fcmVjZWl2ZSA9IGZ1bmN0aW9uIChkYXRhKSB7XG4gICAgICAgIGlmIChPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwoZGF0YSkgPT09IE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbChbXSkpIHtcbiAgICAgICAgICAgIC8vIGFycmF5IG9mIHJlc3BvbnNlcyByZWNlaXZlZFxuICAgICAgICAgICAgZm9yICh2YXIgaSBpbiBkYXRhKSB7XG4gICAgICAgICAgICAgICAgaWYgKGRhdGEuaGFzT3duUHJvcGVydHkoaSkpIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIG1zZyA9IGRhdGFbaV07XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX2Rpc3BhdGNoTWVzc2FnZShtc2cpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIGlmIChPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwoZGF0YSkgPT09IE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbCh7fSkpIHtcbiAgICAgICAgICAgIC8vIG9uZSByZXNwb25zZSByZWNlaXZlZFxuICAgICAgICAgICAgdGhpcy5fZGlzcGF0Y2hNZXNzYWdlKGRhdGEpO1xuICAgICAgICB9XG4gICAgfTtcblxuICAgIGNlbnRyaWZ1Z2VQcm90by5fZmx1c2ggPSBmdW5jdGlvbigpIHtcbiAgICAgICAgdmFyIG1lc3NhZ2VzID0gdGhpcy5fbWVzc2FnZXMuc2xpY2UoMCk7XG4gICAgICAgIHRoaXMuX21lc3NhZ2VzID0gW107XG4gICAgICAgIHRoaXMuX3NlbmQobWVzc2FnZXMpO1xuICAgIH07XG5cbiAgICBjZW50cmlmdWdlUHJvdG8uX3BpbmcgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBtc2cgPSB7XG4gICAgICAgICAgICBcIm1ldGhvZFwiOiBcInBpbmdcIixcbiAgICAgICAgICAgIFwicGFyYW1zXCI6IHt9XG4gICAgICAgIH07XG4gICAgICAgIHRoaXMuX2FkZE1lc3NhZ2UobXNnKTtcbiAgICB9O1xuXG4gICAgY2VudHJpZnVnZVByb3RvLl9yZWNvdmVyID0gZnVuY3Rpb24oY2hhbm5lbCkge1xuICAgICAgICByZXR1cm4gY2hhbm5lbCBpbiB0aGlzLl9sYXN0TWVzc2FnZUlEO1xuICAgIH07XG5cbiAgICBjZW50cmlmdWdlUHJvdG8uX2dldExhc3RJRCA9IGZ1bmN0aW9uKGNoYW5uZWwpIHtcbiAgICAgICAgdmFyIGxhc3RVSUQgPSB0aGlzLl9sYXN0TWVzc2FnZUlEW2NoYW5uZWxdO1xuICAgICAgICBpZiAobGFzdFVJRCkge1xuICAgICAgICAgICAgdGhpcy5fZGVidWcoXCJsYXN0IHVpZCBmb3VuZCBhbmQgc2VudCBmb3IgY2hhbm5lbFwiLCBjaGFubmVsKTtcbiAgICAgICAgICAgIHJldHVybiBsYXN0VUlEO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5fZGVidWcoXCJubyBsYXN0IHVpZCBmb3VuZCBmb3IgY2hhbm5lbFwiLCBjaGFubmVsKTtcbiAgICAgICAgICAgIHJldHVybiBcIlwiO1xuICAgICAgICB9XG4gICAgfTtcblxuICAgIGNlbnRyaWZ1Z2VQcm90by5fY3JlYXRlRXJyb3JPYmplY3QgPSBmdW5jdGlvbihlcnIsIGFkdmljZSkge1xuICAgICAgICB2YXIgZXJyT2JqZWN0ID0ge1xuICAgICAgICAgICAgXCJlcnJvclwiOiBlcnJcbiAgICAgICAgfTtcbiAgICAgICAgaWYgKGFkdmljZSkge1xuICAgICAgICAgICBlcnJPYmplY3RbXCJhZHZpY2VcIl0gPSBhZHZpY2U7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGVyck9iamVjdDtcbiAgICB9O1xuXG4gICAgY2VudHJpZnVnZVByb3RvLl9lcnJvck9iamVjdEZyb21NZXNzYWdlID0gZnVuY3Rpb24obWVzc2FnZSkge1xuICAgICAgICB2YXIgZXJyID0gbWVzc2FnZS5lcnJvcjtcbiAgICAgICAgdmFyIGFkdmljZSA9IG1lc3NhZ2VbXCJhZHZpY2VcIl07XG4gICAgICAgIHJldHVybiB0aGlzLl9jcmVhdGVFcnJvck9iamVjdChlcnIsIGFkdmljZSk7XG4gICAgfTtcblxuICAgIGNlbnRyaWZ1Z2VQcm90by5fcmVnaXN0ZXJDYWxsID0gZnVuY3Rpb24odWlkLCBjYWxsYmFjaywgZXJyYmFjaykge1xuICAgICAgICB2YXIgc2VsZiA9IHRoaXM7XG4gICAgICAgIHRoaXMuX2NhbGxiYWNrc1t1aWRdID0ge1xuICAgICAgICAgICAgXCJjYWxsYmFja1wiOiBjYWxsYmFjayxcbiAgICAgICAgICAgIFwiZXJyYmFja1wiOiBlcnJiYWNrXG4gICAgICAgIH07XG4gICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICBkZWxldGUgc2VsZi5fY2FsbGJhY2tzW3VpZF07XG4gICAgICAgICAgICBpZiAoaXNGdW5jdGlvbihlcnJiYWNrKSkge1xuICAgICAgICAgICAgICAgIGVycmJhY2soc2VsZi5fY3JlYXRlRXJyb3JPYmplY3QoXCJ0aW1lb3V0XCIsIFwicmV0cnlcIikpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9LCB0aGlzLl9jb25maWcudGltZW91dCk7XG4gICAgfTtcblxuICAgIGNlbnRyaWZ1Z2VQcm90by5fYWRkTWVzc2FnZSA9IGZ1bmN0aW9uIChtZXNzYWdlKSB7XG4gICAgICAgIHZhciB1aWQgPSAnJyArIHRoaXMuX25leHRNZXNzYWdlSWQoKTtcbiAgICAgICAgbWVzc2FnZS51aWQgPSB1aWQ7XG4gICAgICAgIGlmICh0aGlzLl9pc0JhdGNoaW5nID09PSB0cnVlKSB7XG4gICAgICAgICAgICB0aGlzLl9tZXNzYWdlcy5wdXNoKG1lc3NhZ2UpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5fc2VuZChbbWVzc2FnZV0pO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB1aWQ7XG4gICAgfTtcblxuICAgIGNlbnRyaWZ1Z2VQcm90by5nZXRDbGllbnRJZCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2NsaWVudElEO1xuICAgIH07XG5cbiAgICBjZW50cmlmdWdlUHJvdG8uaXNDb25uZWN0ZWQgPSBjZW50cmlmdWdlUHJvdG8uX2lzQ29ubmVjdGVkO1xuXG4gICAgY2VudHJpZnVnZVByb3RvLmlzRGlzY29ubmVjdGVkID0gY2VudHJpZnVnZVByb3RvLl9pc0Rpc2Nvbm5lY3RlZDtcblxuICAgIGNlbnRyaWZ1Z2VQcm90by5jb25maWd1cmUgPSBmdW5jdGlvbiAoY29uZmlndXJhdGlvbikge1xuICAgICAgICB0aGlzLl9jb25maWd1cmUuY2FsbCh0aGlzLCBjb25maWd1cmF0aW9uKTtcbiAgICB9O1xuXG4gICAgY2VudHJpZnVnZVByb3RvLmNvbm5lY3QgPSBjZW50cmlmdWdlUHJvdG8uX2Nvbm5lY3Q7XG5cbiAgICBjZW50cmlmdWdlUHJvdG8uZGlzY29ubmVjdCA9IGZ1bmN0aW9uKCkge1xuICAgICAgICB0aGlzLl9kaXNjb25uZWN0KFwiY2xpZW50XCIsIGZhbHNlLCB0cnVlKTtcbiAgICB9O1xuXG4gICAgY2VudHJpZnVnZVByb3RvLnBpbmcgPSBjZW50cmlmdWdlUHJvdG8uX3Bpbmc7XG5cbiAgICBjZW50cmlmdWdlUHJvdG8uc3RhcnRCYXRjaGluZyA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgLy8gc3RhcnQgY29sbGVjdGluZyBtZXNzYWdlcyB3aXRob3V0IHNlbmRpbmcgdGhlbSB0byBDZW50cmlmdWdlIHVudGlsIGZsdXNoXG4gICAgICAgIC8vIG1ldGhvZCBjYWxsZWRcbiAgICAgICAgdGhpcy5faXNCYXRjaGluZyA9IHRydWU7XG4gICAgfTtcblxuICAgIGNlbnRyaWZ1Z2VQcm90by5zdG9wQmF0Y2hpbmcgPSBmdW5jdGlvbihmbHVzaCkge1xuICAgICAgICAvLyBzdG9wIGNvbGxlY3RpbmcgbWVzc2FnZXNcbiAgICAgICAgZmx1c2ggPSBmbHVzaCB8fCBmYWxzZTtcbiAgICAgICAgdGhpcy5faXNCYXRjaGluZyA9IGZhbHNlO1xuICAgICAgICBpZiAoZmx1c2ggPT09IHRydWUpIHtcbiAgICAgICAgICAgIHRoaXMuZmx1c2goKTtcbiAgICAgICAgfVxuICAgIH07XG5cbiAgICBjZW50cmlmdWdlUHJvdG8uZmx1c2ggPSBmdW5jdGlvbigpIHtcbiAgICAgICAgLy8gc2VuZCBiYXRjaGVkIG1lc3NhZ2VzIHRvIENlbnRyaWZ1Z2VcbiAgICAgICAgdGhpcy5fZmx1c2goKTtcbiAgICB9O1xuXG4gICAgY2VudHJpZnVnZVByb3RvLnN0YXJ0QXV0aEJhdGNoaW5nID0gZnVuY3Rpb24oKSB7XG4gICAgICAgIC8vIHN0YXJ0IGNvbGxlY3RpbmcgcHJpdmF0ZSBjaGFubmVscyB0byBjcmVhdGUgYnVsayBhdXRoZW50aWNhdGlvblxuICAgICAgICAvLyByZXF1ZXN0IHRvIGF1dGhFbmRwb2ludCB3aGVuIHN0b3BBdXRoQmF0Y2hpbmcgd2lsbCBiZSBjYWxsZWRcbiAgICAgICAgdGhpcy5faXNBdXRoQmF0Y2hpbmcgPSB0cnVlO1xuICAgIH07XG5cbiAgICBjZW50cmlmdWdlUHJvdG8uc3RvcEF1dGhCYXRjaGluZyA9IGZ1bmN0aW9uKCkge1xuICAgICAgICAvLyBjcmVhdGUgcmVxdWVzdCB0byBhdXRoRW5kcG9pbnQgd2l0aCBjb2xsZWN0ZWQgcHJpdmF0ZSBjaGFubmVsc1xuICAgICAgICAvLyB0byBhc2sgaWYgdGhpcyBjbGllbnQgY2FuIHN1YnNjcmliZSBvbiBlYWNoIGNoYW5uZWxcbiAgICAgICAgdGhpcy5faXNBdXRoQmF0Y2hpbmcgPSBmYWxzZTtcbiAgICAgICAgdmFyIGF1dGhDaGFubmVscyA9IHRoaXMuX2F1dGhDaGFubmVscztcbiAgICAgICAgdGhpcy5fYXV0aENoYW5uZWxzID0ge307XG4gICAgICAgIHZhciBjaGFubmVscyA9IFtdO1xuXG4gICAgICAgIGZvciAodmFyIGNoYW5uZWwgaW4gYXV0aENoYW5uZWxzKSB7XG4gICAgICAgICAgICB2YXIgc3ViID0gdGhpcy5fZ2V0U3ViKGNoYW5uZWwpO1xuICAgICAgICAgICAgaWYgKCFzdWIpIHtcbiAgICAgICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNoYW5uZWxzLnB1c2goY2hhbm5lbCk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoY2hhbm5lbHMubGVuZ3RoID09IDApIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIHZhciBkYXRhID0ge1xuICAgICAgICAgICAgXCJjbGllbnRcIjogdGhpcy5nZXRDbGllbnRJZCgpLFxuICAgICAgICAgICAgXCJjaGFubmVsc1wiOiBjaGFubmVsc1xuICAgICAgICB9O1xuXG4gICAgICAgIHZhciBzZWxmID0gdGhpcztcblxuICAgICAgICB2YXIgY2IgPSBmdW5jdGlvbihlcnJvciwgZGF0YSkge1xuICAgICAgICAgICAgaWYgKGVycm9yID09PSB0cnVlKSB7XG4gICAgICAgICAgICAgICAgc2VsZi5fZGVidWcoXCJhdXRob3JpemF0aW9uIHJlcXVlc3QgZmFpbGVkXCIpO1xuICAgICAgICAgICAgICAgIGZvciAodmFyIGkgaW4gY2hhbm5lbHMpIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIGNoYW5uZWwgPSBjaGFubmVsc1tpXTtcbiAgICAgICAgICAgICAgICAgICAgc2VsZi5fc3Vic2NyaWJlUmVzcG9uc2Uoe1xuICAgICAgICAgICAgICAgICAgICAgICAgXCJlcnJvclwiOiBcImF1dGhvcml6YXRpb24gcmVxdWVzdCBmYWlsZWRcIixcbiAgICAgICAgICAgICAgICAgICAgICAgIFwiYWR2aWNlXCI6IFwiZml4XCIsXG4gICAgICAgICAgICAgICAgICAgICAgICBcImJvZHlcIjoge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiY2hhbm5lbFwiOiBjaGFubmVsXG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIC8vIHRyeSB0byBzZW5kIGFsbCBzdWJzY3JpcHRpb25zIGluIG9uZSByZXF1ZXN0LlxuICAgICAgICAgICAgdmFyIGJhdGNoID0gZmFsc2U7XG4gICAgICAgICAgICBpZiAoIXNlbGYuX2lzQmF0Y2hpbmcpIHtcbiAgICAgICAgICAgICAgICBzZWxmLnN0YXJ0QmF0Y2hpbmcoKTtcbiAgICAgICAgICAgICAgICBiYXRjaCA9IHRydWU7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGZvciAodmFyIGkgaW4gY2hhbm5lbHMpIHtcbiAgICAgICAgICAgICAgICB2YXIgY2hhbm5lbCA9IGNoYW5uZWxzW2ldO1xuICAgICAgICAgICAgICAgIHZhciBjaGFubmVsUmVzcG9uc2UgPSBkYXRhW2NoYW5uZWxdO1xuICAgICAgICAgICAgICAgIGlmICghY2hhbm5lbFJlc3BvbnNlKSB7XG4gICAgICAgICAgICAgICAgICAgIC8vIHN1YnNjcmlwdGlvbjplcnJvclxuICAgICAgICAgICAgICAgICAgICBzZWxmLl9zdWJzY3JpYmVSZXNwb25zZSh7XG4gICAgICAgICAgICAgICAgICAgICAgICBcImVycm9yXCI6IFwiY2hhbm5lbCBub3QgZm91bmQgaW4gYXV0aG9yaXphdGlvbiByZXNwb25zZVwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgXCJhZHZpY2VcIjogXCJmaXhcIixcbiAgICAgICAgICAgICAgICAgICAgICAgIFwiYm9keVwiOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJjaGFubmVsXCI6IGNoYW5uZWxcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZiAoIWNoYW5uZWxSZXNwb25zZS5zdGF0dXMgfHwgY2hhbm5lbFJlc3BvbnNlLnN0YXR1cyA9PT0gMjAwKSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciBtc2cgPSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBcIm1ldGhvZFwiOiBcInN1YnNjcmliZVwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgXCJwYXJhbXNcIjoge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiY2hhbm5lbFwiOiBjaGFubmVsLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiY2xpZW50XCI6IHNlbGYuZ2V0Q2xpZW50SWQoKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImluZm9cIjogY2hhbm5lbFJlc3BvbnNlLmluZm8sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJzaWduXCI6IGNoYW5uZWxSZXNwb25zZS5zaWduXG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgICAgIHZhciByZWNvdmVyID0gc2VsZi5fcmVjb3ZlcihjaGFubmVsKTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHJlY292ZXIgPT09IHRydWUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIG1zZ1tcInBhcmFtc1wiXVtcInJlY292ZXJcIl0gPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICAgICAgbXNnW1wicGFyYW1zXCJdW1wibGFzdFwiXSA9IHNlbGYuX2dldExhc3RJRChjaGFubmVsKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBzZWxmLl9hZGRNZXNzYWdlKG1zZyk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgc2VsZi5fc3Vic2NyaWJlUmVzcG9uc2Uoe1xuICAgICAgICAgICAgICAgICAgICAgICAgXCJlcnJvclwiOiBjaGFubmVsUmVzcG9uc2Uuc3RhdHVzLFxuICAgICAgICAgICAgICAgICAgICAgICAgXCJib2R5XCI6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImNoYW5uZWxcIjogY2hhbm5lbFxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmIChiYXRjaCkge1xuICAgICAgICAgICAgICAgIHNlbGYuc3RvcEJhdGNoaW5nKHRydWUpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgIH07XG5cbiAgICAgICAgdmFyIHRyYW5zcG9ydCA9IHRoaXMuX2NvbmZpZy5hdXRoVHJhbnNwb3J0LnRvTG93ZXJDYXNlKCk7XG4gICAgICAgIGlmICh0cmFuc3BvcnQgPT09IFwiYWpheFwiKSB7XG4gICAgICAgICAgICB0aGlzLl9hamF4KHRoaXMuX2NvbmZpZy5hdXRoRW5kcG9pbnQsIHRoaXMuX2NvbmZpZy5hdXRoUGFyYW1zLCB0aGlzLl9jb25maWcuYXV0aEhlYWRlcnMsIGRhdGEsIGNiKTtcbiAgICAgICAgfSBlbHNlIGlmICh0cmFuc3BvcnQgPT09IFwianNvbnBcIikge1xuICAgICAgICAgICAgdGhpcy5fanNvbnAodGhpcy5fY29uZmlnLmF1dGhFbmRwb2ludCwgdGhpcy5fY29uZmlnLmF1dGhQYXJhbXMsIHRoaXMuX2NvbmZpZy5hdXRoSGVhZGVycywgZGF0YSwgY2IpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhyb3cgJ1Vua25vd24gYXV0aCB0cmFuc3BvcnQgJyArIHRyYW5zcG9ydDtcbiAgICAgICAgfVxuICAgIH07XG5cbiAgICBjZW50cmlmdWdlUHJvdG8uc3Vic2NyaWJlID0gZnVuY3Rpb24gKGNoYW5uZWwsIGV2ZW50cykge1xuICAgICAgICBpZiAoYXJndW1lbnRzLmxlbmd0aCA8IDEpIHtcbiAgICAgICAgICAgIHRocm93ICdJbGxlZ2FsIGFyZ3VtZW50cyBudW1iZXI6IHJlcXVpcmVkIDEsIGdvdCAnICsgYXJndW1lbnRzLmxlbmd0aDtcbiAgICAgICAgfVxuICAgICAgICBpZiAoIWlzU3RyaW5nKGNoYW5uZWwpKSB7XG4gICAgICAgICAgICB0aHJvdyAnSWxsZWdhbCBhcmd1bWVudCB0eXBlOiBjaGFubmVsIG11c3QgYmUgYSBzdHJpbmcnO1xuICAgICAgICB9XG4gICAgICAgIGlmICghdGhpcy5fY29uZmlnLnJlc3Vic2NyaWJlICYmICF0aGlzLmlzQ29ubmVjdGVkKCkpIHtcbiAgICAgICAgICAgIHRocm93ICdDYW4gbm90IG9ubHkgc3Vic2NyaWJlIGluIGNvbm5lY3RlZCBzdGF0ZSB3aGVuIHJlc3Vic2NyaWJlIG9wdGlvbiBpcyBvZmYnO1xuICAgICAgICB9XG5cbiAgICAgICAgdmFyIGN1cnJlbnRTdWIgPSB0aGlzLl9nZXRTdWIoY2hhbm5lbCk7XG5cbiAgICAgICAgaWYgKGN1cnJlbnRTdWIgIT09IG51bGwpIHtcbiAgICAgICAgICAgIGN1cnJlbnRTdWIuX3NldEV2ZW50cyhldmVudHMpO1xuICAgICAgICAgICAgcmV0dXJuIGN1cnJlbnRTdWI7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB2YXIgc3ViID0gbmV3IFN1Yih0aGlzLCBjaGFubmVsLCBldmVudHMpO1xuICAgICAgICAgICAgdGhpcy5fc3Vic1tjaGFubmVsXSA9IHN1YjtcbiAgICAgICAgICAgIHN1Yi5zdWJzY3JpYmUoKTtcbiAgICAgICAgICAgIHJldHVybiBzdWI7XG4gICAgICAgIH1cbiAgICB9O1xuXG4gICAgdmFyIF9TVEFURV9ORVcgPSAwO1xuICAgIHZhciBfU1RBVEVfU1VCU0NSSUJJTkcgPSAxO1xuICAgIHZhciBfU1RBVEVfU1VDQ0VTUyA9IDI7XG4gICAgdmFyIF9TVEFURV9FUlJPUiA9IDM7XG4gICAgdmFyIF9TVEFURV9VTlNVQlNDUklCRUQgPSA0O1xuXG4gICAgZnVuY3Rpb24gU3ViKGNlbnRyaWZ1Z2UsIGNoYW5uZWwsIGV2ZW50cykge1xuICAgICAgICB0aGlzLl9zdGF0dXMgPSBfU1RBVEVfTkVXO1xuICAgICAgICB0aGlzLl9lcnJvciA9IG51bGw7XG4gICAgICAgIHRoaXMuX2NlbnRyaWZ1Z2UgPSBjZW50cmlmdWdlO1xuICAgICAgICB0aGlzLmNoYW5uZWwgPSBjaGFubmVsO1xuICAgICAgICB0aGlzLl9zZXRFdmVudHMoZXZlbnRzKTtcbiAgICAgICAgdGhpcy5faXNSZXN1YnNjcmliZSA9IGZhbHNlO1xuICAgICAgICB0aGlzLl9yZWFkeSA9IGZhbHNlO1xuICAgICAgICB0aGlzLl9wcm9taXNlID0gbnVsbDtcbiAgICAgICAgdGhpcy5faW5pdGlhbGl6ZVByb21pc2UoKTtcbiAgICB9XG5cbiAgICBleHRlbmQoU3ViLCBFdmVudEVtaXR0ZXIpO1xuXG4gICAgdmFyIHN1YlByb3RvID0gU3ViLnByb3RvdHlwZTtcblxuICAgIHN1YlByb3RvLl9pbml0aWFsaXplUHJvbWlzZSA9IGZ1bmN0aW9uKCkge1xuICAgICAgICB0aGlzLl9yZWFkeSA9IGZhbHNlO1xuICAgICAgICB2YXIgc2VsZiA9IHRoaXM7XG4gICAgICAgIHRoaXMuX3Byb21pc2UgPSBuZXcgUHJvbWlzZShmdW5jdGlvbihyZXNvbHZlLCByZWplY3QpIHtcbiAgICAgICAgICAgIHNlbGYuX3Jlc29sdmUgPSBmdW5jdGlvbih2YWx1ZSkge1xuICAgICAgICAgICAgICAgIHNlbGYuX3JlYWR5ID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICByZXNvbHZlKHZhbHVlKTtcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICBzZWxmLl9yZWplY3QgPSBmdW5jdGlvbihlcnIpIHtcbiAgICAgICAgICAgICAgICBzZWxmLl9yZWFkeSA9IHRydWU7XG4gICAgICAgICAgICAgICAgcmVqZWN0KGVycik7XG4gICAgICAgICAgICB9O1xuICAgICAgICB9KTtcbiAgICB9O1xuXG4gICAgc3ViUHJvdG8uX3NldEV2ZW50cyA9IGZ1bmN0aW9uKGV2ZW50cykge1xuICAgICAgICBpZiAoIWV2ZW50cykge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGlmIChpc0Z1bmN0aW9uKGV2ZW50cykpIHtcbiAgICAgICAgICAgIHRoaXMub24oXCJtZXNzYWdlXCIsIGV2ZW50cyk7XG4gICAgICAgIH0gZWxzZSBpZiAoT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKGV2ZW50cykgPT09IE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbCh7fSkpIHtcbiAgICAgICAgICAgIHZhciBrbm93bkV2ZW50cyA9IFtcbiAgICAgICAgICAgICAgICBcIm1lc3NhZ2VcIiwgXCJqb2luXCIsIFwibGVhdmVcIiwgXCJ1bnN1YnNjcmliZVwiLFxuICAgICAgICAgICAgICAgIFwic3Vic2NyaWJlXCIsIFwiZXJyb3JcIlxuICAgICAgICAgICAgXTtcbiAgICAgICAgICAgIGZvciAodmFyIGkgaW4ga25vd25FdmVudHMpIHtcbiAgICAgICAgICAgICAgICB2YXIgZXYgPSBrbm93bkV2ZW50c1tpXTtcbiAgICAgICAgICAgICAgICBpZiAoZXYgaW4gZXZlbnRzKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMub24oZXYsIGV2ZW50c1tldl0pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH07XG5cbiAgICBzdWJQcm90by5faXNOZXcgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3N0YXR1cyA9PT0gX1NUQVRFX05FVztcbiAgICB9O1xuXG4gICAgc3ViUHJvdG8uX2lzVW5zdWJzY3JpYmVkID0gZnVuY3Rpb24oKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9zdGF0dXMgPT09IF9TVEFURV9VTlNVQlNDUklCRUQ7XG4gICAgfTtcblxuICAgIHN1YlByb3RvLl9pc1N1YnNjcmliaW5nID0gZnVuY3Rpb24oKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9zdGF0dXMgPT09IF9TVEFURV9TVUJTQ1JJQklORztcbiAgICB9O1xuXG4gICAgc3ViUHJvdG8uX2lzUmVhZHkgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3N0YXR1cyA9PT0gX1NUQVRFX1NVQ0NFU1MgfHwgdGhpcy5fc3RhdHVzID09PSBfU1RBVEVfRVJST1I7XG4gICAgfTtcblxuICAgIHN1YlByb3RvLl9pc1N1Y2Nlc3MgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3N0YXR1cyA9PT0gX1NUQVRFX1NVQ0NFU1M7XG4gICAgfTtcblxuICAgIHN1YlByb3RvLl9pc0Vycm9yID0gZnVuY3Rpb24oKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9zdGF0dXMgPT09IF9TVEFURV9FUlJPUjtcbiAgICB9O1xuXG4gICAgc3ViUHJvdG8uX3NldE5ldyA9IGZ1bmN0aW9uKCkge1xuICAgICAgICB0aGlzLl9zdGF0dXMgPSBfU1RBVEVfTkVXO1xuICAgIH07XG5cbiAgICBzdWJQcm90by5fc2V0U3Vic2NyaWJpbmcgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgaWYgKHRoaXMuX3JlYWR5ID09PSB0cnVlKSB7XG4gICAgICAgICAgICAvLyBuZXcgcHJvbWlzZSBmb3IgdGhpcyBzdWJzY3JpcHRpb25cbiAgICAgICAgICAgIHRoaXMuX2luaXRpYWxpemVQcm9taXNlKCk7XG4gICAgICAgICAgICB0aGlzLl9pc1Jlc3Vic2NyaWJlID0gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLl9zdGF0dXMgPSBfU1RBVEVfU1VCU0NSSUJJTkc7XG4gICAgfTtcblxuICAgIHN1YlByb3RvLl9zZXRTdWJzY3JpYmVTdWNjZXNzID0gZnVuY3Rpb24oKSB7XG4gICAgICAgIGlmICh0aGlzLl9zdGF0dXMgPT0gX1NUQVRFX1NVQ0NFU1MpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLl9zdGF0dXMgPSBfU1RBVEVfU1VDQ0VTUztcbiAgICAgICAgdmFyIHN1Y2Nlc3NDb250ZXh0ID0gdGhpcy5fZ2V0U3Vic2NyaWJlU3VjY2Vzc0NvbnRleHQoKTtcbiAgICAgICAgdGhpcy50cmlnZ2VyKFwic3Vic2NyaWJlXCIsIFtzdWNjZXNzQ29udGV4dF0pO1xuICAgICAgICB0aGlzLl9yZXNvbHZlKHN1Y2Nlc3NDb250ZXh0KTtcbiAgICB9O1xuXG4gICAgc3ViUHJvdG8uX3NldFN1YnNjcmliZUVycm9yID0gZnVuY3Rpb24oZXJyKSB7XG4gICAgICAgIGlmICh0aGlzLl9zdGF0dXMgPT0gX1NUQVRFX0VSUk9SKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5fc3RhdHVzID0gX1NUQVRFX0VSUk9SO1xuICAgICAgICB0aGlzLl9lcnJvciA9IGVycjtcbiAgICAgICAgdmFyIGVyckNvbnRleHQgPSB0aGlzLl9nZXRTdWJzY3JpYmVFcnJvckNvbnRleHQoKTtcbiAgICAgICAgdGhpcy50cmlnZ2VyKFwiZXJyb3JcIiwgW2VyckNvbnRleHRdKTtcbiAgICAgICAgdGhpcy5fcmVqZWN0KGVyckNvbnRleHQpO1xuICAgIH07XG5cbiAgICBzdWJQcm90by5fdHJpZ2dlclVuc3Vic2NyaWJlID0gZnVuY3Rpb24oKSB7XG4gICAgICAgIHZhciB1bnN1YnNjcmliZUNvbnRleHQgPSB7XG4gICAgICAgICAgICBcImNoYW5uZWxcIjogdGhpcy5jaGFubmVsXG4gICAgICAgIH07XG4gICAgICAgIHRoaXMudHJpZ2dlcihcInVuc3Vic2NyaWJlXCIsIFt1bnN1YnNjcmliZUNvbnRleHRdKTtcbiAgICB9O1xuXG4gICAgc3ViUHJvdG8uX3NldFVuc3Vic2NyaWJlZCA9IGZ1bmN0aW9uKCkge1xuICAgICAgICBpZiAodGhpcy5fc3RhdHVzID09IF9TVEFURV9VTlNVQlNDUklCRUQpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLl9zdGF0dXMgPSBfU1RBVEVfVU5TVUJTQ1JJQkVEO1xuICAgICAgICB0aGlzLl90cmlnZ2VyVW5zdWJzY3JpYmUoKTtcbiAgICB9O1xuXG4gICAgc3ViUHJvdG8uX2dldFN1YnNjcmliZVN1Y2Nlc3NDb250ZXh0ID0gZnVuY3Rpb24oKSB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBcImNoYW5uZWxcIjogdGhpcy5jaGFubmVsLFxuICAgICAgICAgICAgXCJpc1Jlc3Vic2NyaWJlXCI6IHRoaXMuX2lzUmVzdWJzY3JpYmVcbiAgICAgICAgfTtcbiAgICB9O1xuXG4gICAgc3ViUHJvdG8uX2dldFN1YnNjcmliZUVycm9yQ29udGV4dCA9IGZ1bmN0aW9uKCkge1xuICAgICAgICB2YXIgc3Vic2NyaWJlRXJyb3JDb250ZXh0ID0gdGhpcy5fZXJyb3I7XG4gICAgICAgIHN1YnNjcmliZUVycm9yQ29udGV4dFtcImNoYW5uZWxcIl0gPSB0aGlzLmNoYW5uZWw7XG4gICAgICAgIHN1YnNjcmliZUVycm9yQ29udGV4dFtcImlzUmVzdWJzY3JpYmVcIl0gPSB0aGlzLl9pc1Jlc3Vic2NyaWJlO1xuICAgICAgICByZXR1cm4gc3Vic2NyaWJlRXJyb3JDb250ZXh0O1xuICAgIH07XG5cbiAgICBzdWJQcm90by5yZWFkeSA9IGZ1bmN0aW9uKGNhbGxiYWNrLCBlcnJiYWNrKSB7XG4gICAgICAgIGlmICh0aGlzLl9yZWFkeSkge1xuICAgICAgICAgICAgaWYgKHRoaXMuX2lzU3VjY2VzcygpKSB7XG4gICAgICAgICAgICAgICAgY2FsbGJhY2sodGhpcy5fZ2V0U3Vic2NyaWJlU3VjY2Vzc0NvbnRleHQoKSk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGVycmJhY2sodGhpcy5fZ2V0U3Vic2NyaWJlRXJyb3JDb250ZXh0KCkpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfTtcblxuICAgIHN1YlByb3RvLnN1YnNjcmliZSA9IGZ1bmN0aW9uKCkge1xuICAgICAgICBpZiAodGhpcy5fc3RhdHVzID09IF9TVEFURV9TVUNDRVNTKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5fY2VudHJpZnVnZS5fc3Vic2NyaWJlKHRoaXMpO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9O1xuXG4gICAgc3ViUHJvdG8udW5zdWJzY3JpYmUgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHRoaXMuX3NldFVuc3Vic2NyaWJlZCgpO1xuICAgICAgICB0aGlzLl9jZW50cmlmdWdlLl91bnN1YnNjcmliZSh0aGlzKTtcbiAgICB9O1xuXG4gICAgc3ViUHJvdG8ucHVibGlzaCA9IGZ1bmN0aW9uIChkYXRhKSB7XG4gICAgICAgIHZhciBzZWxmID0gdGhpcztcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uKHJlc29sdmUsIHJlamVjdCkge1xuICAgICAgICAgICAgaWYgKHNlbGYuX2lzVW5zdWJzY3JpYmVkKCkpIHtcbiAgICAgICAgICAgICAgICByZWplY3Qoc2VsZi5fY2VudHJpZnVnZS5fY3JlYXRlRXJyb3JPYmplY3QoXCJzdWJzY3JpcHRpb24gdW5zdWJzY3JpYmVkXCIsIFwiZml4XCIpKTtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBzZWxmLl9wcm9taXNlLnRoZW4oZnVuY3Rpb24oKXtcbiAgICAgICAgICAgICAgICBpZiAoIXNlbGYuX2NlbnRyaWZ1Z2UuaXNDb25uZWN0ZWQoKSkge1xuICAgICAgICAgICAgICAgICAgICByZWplY3Qoc2VsZi5fY2VudHJpZnVnZS5fY3JlYXRlRXJyb3JPYmplY3QoXCJkaXNjb25uZWN0ZWRcIiwgXCJyZXRyeVwiKSk7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgdmFyIG1zZyA9IHtcbiAgICAgICAgICAgICAgICAgICAgXCJtZXRob2RcIjogXCJwdWJsaXNoXCIsXG4gICAgICAgICAgICAgICAgICAgIFwicGFyYW1zXCI6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIFwiY2hhbm5lbFwiOiBzZWxmLmNoYW5uZWwsXG4gICAgICAgICAgICAgICAgICAgICAgICBcImRhdGFcIjogZGF0YVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICB2YXIgdWlkID0gc2VsZi5fY2VudHJpZnVnZS5fYWRkTWVzc2FnZShtc2cpO1xuICAgICAgICAgICAgICAgIHNlbGYuX2NlbnRyaWZ1Z2UuX3JlZ2lzdGVyQ2FsbCh1aWQsIHJlc29sdmUsIHJlamVjdCk7XG4gICAgICAgICAgICB9LCBmdW5jdGlvbihlcnIpe1xuICAgICAgICAgICAgICAgIHJlamVjdChlcnIpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgIH07XG5cbiAgICBzdWJQcm90by5wcmVzZW5jZSA9IGZ1bmN0aW9uKCkge1xuICAgICAgICB2YXIgc2VsZiA9IHRoaXM7XG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbihyZXNvbHZlLCByZWplY3QpIHtcbiAgICAgICAgICAgIGlmIChzZWxmLl9pc1Vuc3Vic2NyaWJlZCgpKSB7XG4gICAgICAgICAgICAgICAgcmVqZWN0KHNlbGYuX2NlbnRyaWZ1Z2UuX2NyZWF0ZUVycm9yT2JqZWN0KFwic3Vic2NyaXB0aW9uIHVuc3Vic2NyaWJlZFwiLCBcImZpeFwiKSk7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgc2VsZi5fcHJvbWlzZS50aGVuKGZ1bmN0aW9uKCl7XG4gICAgICAgICAgICAgICAgaWYgKCFzZWxmLl9jZW50cmlmdWdlLmlzQ29ubmVjdGVkKCkpIHtcbiAgICAgICAgICAgICAgICAgICAgcmVqZWN0KHNlbGYuX2NlbnRyaWZ1Z2UuX2NyZWF0ZUVycm9yT2JqZWN0KFwiZGlzY29ubmVjdGVkXCIsIFwicmV0cnlcIikpO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHZhciBtc2cgPSB7XG4gICAgICAgICAgICAgICAgICAgIFwibWV0aG9kXCI6IFwicHJlc2VuY2VcIixcbiAgICAgICAgICAgICAgICAgICAgXCJwYXJhbXNcIjoge1xuICAgICAgICAgICAgICAgICAgICAgICAgXCJjaGFubmVsXCI6IHNlbGYuY2hhbm5lbFxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICB2YXIgdWlkID0gc2VsZi5fY2VudHJpZnVnZS5fYWRkTWVzc2FnZShtc2cpO1xuICAgICAgICAgICAgICAgIHNlbGYuX2NlbnRyaWZ1Z2UuX3JlZ2lzdGVyQ2FsbCh1aWQsIHJlc29sdmUsIHJlamVjdCk7XG4gICAgICAgICAgICB9LCBmdW5jdGlvbihlcnIpe1xuICAgICAgICAgICAgICAgIHJlamVjdChlcnIpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgIH07XG5cbiAgICBzdWJQcm90by5oaXN0b3J5ID0gZnVuY3Rpb24oKSB7XG4gICAgICAgIHZhciBzZWxmID0gdGhpcztcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uKHJlc29sdmUsIHJlamVjdCkge1xuICAgICAgICAgICAgaWYgKHNlbGYuX2lzVW5zdWJzY3JpYmVkKCkpIHtcbiAgICAgICAgICAgICAgICByZWplY3Qoc2VsZi5fY2VudHJpZnVnZS5fY3JlYXRlRXJyb3JPYmplY3QoXCJzdWJzY3JpcHRpb24gdW5zdWJzY3JpYmVkXCIsIFwiZml4XCIpKTtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBzZWxmLl9wcm9taXNlLnRoZW4oZnVuY3Rpb24oKXtcbiAgICAgICAgICAgICAgICBpZiAoIXNlbGYuX2NlbnRyaWZ1Z2UuaXNDb25uZWN0ZWQoKSkge1xuICAgICAgICAgICAgICAgICAgICByZWplY3Qoc2VsZi5fY2VudHJpZnVnZS5fY3JlYXRlRXJyb3JPYmplY3QoXCJkaXNjb25uZWN0ZWRcIiwgXCJyZXRyeVwiKSk7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgdmFyIG1zZyA9IHtcbiAgICAgICAgICAgICAgICAgICAgXCJtZXRob2RcIjogXCJoaXN0b3J5XCIsXG4gICAgICAgICAgICAgICAgICAgIFwicGFyYW1zXCI6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIFwiY2hhbm5lbFwiOiBzZWxmLmNoYW5uZWxcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgdmFyIHVpZCA9IHNlbGYuX2NlbnRyaWZ1Z2UuX2FkZE1lc3NhZ2UobXNnKTtcbiAgICAgICAgICAgICAgICBzZWxmLl9jZW50cmlmdWdlLl9yZWdpc3RlckNhbGwodWlkLCByZXNvbHZlLCByZWplY3QpO1xuICAgICAgICAgICAgfSwgZnVuY3Rpb24oZXJyKXtcbiAgICAgICAgICAgICAgICByZWplY3QoZXJyKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICB9O1xuXG4gICAgLy8gRXhwb3NlIHRoZSBjbGFzcyBlaXRoZXIgdmlhIEFNRCwgQ29tbW9uSlMgb3IgdGhlIGdsb2JhbCBvYmplY3RcbiAgICBpZiAodHlwZW9mIGRlZmluZSA9PT0gJ2Z1bmN0aW9uJyAmJiBkZWZpbmUuYW1kKSB7XG4gICAgICAgIGRlZmluZShmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICByZXR1cm4gQ2VudHJpZnVnZTtcbiAgICAgICAgfSk7XG4gICAgfSBlbHNlIGlmICh0eXBlb2YgbW9kdWxlID09PSAnb2JqZWN0JyAmJiBtb2R1bGUuZXhwb3J0cykge1xuICAgICAgICAvL25vaW5zcGVjdGlvbiBKU1VucmVzb2x2ZWRWYXJpYWJsZVxuICAgICAgICBtb2R1bGUuZXhwb3J0cyA9IENlbnRyaWZ1Z2U7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgLy9ub2luc3BlY3Rpb24gSlNVbnVzZWRHbG9iYWxTeW1ib2xzXG4gICAgICAgIHRoaXMuQ2VudHJpZnVnZSA9IENlbnRyaWZ1Z2U7XG4gICAgfVxuXG59LmNhbGwodGhpcykpO1xuIiwidmFyIENlbnRyaWZ1Z2UgPSByZXF1aXJlKCdjZW50cmlmdWdlJylcblxudmFyIHRzID0gTWF0aC5yb3VuZCgobmV3IERhdGUoKSkuZ2V0VGltZSgpIC8gMTAwMCk7XG5cbnZhciBjZW50cmlmdWdlID0gbmV3IENlbnRyaWZ1Z2Uoe1xuICAgIHVybDogJ3dzOi8vbG9jYWxob3N0OjgwODAvY29ubmVjdGlvbi93ZWJzb2NrZXQnLFxuICAgIHVzZXI6IFwiYWxmcmVkXCIsXG4gICAgdGltZXN0YW1wOiBcIlwiICsgdHMsXG4gICAgdG9rZW46IFwiU0hBLTI1NiBITUFDIFRPS0VOXCIsXG4gICAgZGVidWc6IHRydWVcbn0pO1xuXG4vLyAgICBjZW50cmlmdWdlLnN1YnNjcmliZShcIm5ld3NcIiwgZnVuY3Rpb24obWVzc2FnZSkge1xuLy8gICAgICAgIGNvbnNvbGUubG9nKG1lc3NhZ2UpO1xuLy8gICAgfSk7XG5cbi8vICAgIGNlbnRyaWZ1Z2UuY29ubmVjdCgpO1xuXG4iLCIvLyBzaGltIGZvciB1c2luZyBwcm9jZXNzIGluIGJyb3dzZXJcblxudmFyIHByb2Nlc3MgPSBtb2R1bGUuZXhwb3J0cyA9IHt9O1xudmFyIHF1ZXVlID0gW107XG52YXIgZHJhaW5pbmcgPSBmYWxzZTtcbnZhciBjdXJyZW50UXVldWU7XG52YXIgcXVldWVJbmRleCA9IC0xO1xuXG5mdW5jdGlvbiBjbGVhblVwTmV4dFRpY2soKSB7XG4gICAgZHJhaW5pbmcgPSBmYWxzZTtcbiAgICBpZiAoY3VycmVudFF1ZXVlLmxlbmd0aCkge1xuICAgICAgICBxdWV1ZSA9IGN1cnJlbnRRdWV1ZS5jb25jYXQocXVldWUpO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIHF1ZXVlSW5kZXggPSAtMTtcbiAgICB9XG4gICAgaWYgKHF1ZXVlLmxlbmd0aCkge1xuICAgICAgICBkcmFpblF1ZXVlKCk7XG4gICAgfVxufVxuXG5mdW5jdGlvbiBkcmFpblF1ZXVlKCkge1xuICAgIGlmIChkcmFpbmluZykge1xuICAgICAgICByZXR1cm47XG4gICAgfVxuICAgIHZhciB0aW1lb3V0ID0gc2V0VGltZW91dChjbGVhblVwTmV4dFRpY2spO1xuICAgIGRyYWluaW5nID0gdHJ1ZTtcblxuICAgIHZhciBsZW4gPSBxdWV1ZS5sZW5ndGg7XG4gICAgd2hpbGUobGVuKSB7XG4gICAgICAgIGN1cnJlbnRRdWV1ZSA9IHF1ZXVlO1xuICAgICAgICBxdWV1ZSA9IFtdO1xuICAgICAgICB3aGlsZSAoKytxdWV1ZUluZGV4IDwgbGVuKSB7XG4gICAgICAgICAgICBpZiAoY3VycmVudFF1ZXVlKSB7XG4gICAgICAgICAgICAgICAgY3VycmVudFF1ZXVlW3F1ZXVlSW5kZXhdLnJ1bigpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHF1ZXVlSW5kZXggPSAtMTtcbiAgICAgICAgbGVuID0gcXVldWUubGVuZ3RoO1xuICAgIH1cbiAgICBjdXJyZW50UXVldWUgPSBudWxsO1xuICAgIGRyYWluaW5nID0gZmFsc2U7XG4gICAgY2xlYXJUaW1lb3V0KHRpbWVvdXQpO1xufVxuXG5wcm9jZXNzLm5leHRUaWNrID0gZnVuY3Rpb24gKGZ1bikge1xuICAgIHZhciBhcmdzID0gbmV3IEFycmF5KGFyZ3VtZW50cy5sZW5ndGggLSAxKTtcbiAgICBpZiAoYXJndW1lbnRzLmxlbmd0aCA+IDEpIHtcbiAgICAgICAgZm9yICh2YXIgaSA9IDE7IGkgPCBhcmd1bWVudHMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGFyZ3NbaSAtIDFdID0gYXJndW1lbnRzW2ldO1xuICAgICAgICB9XG4gICAgfVxuICAgIHF1ZXVlLnB1c2gobmV3IEl0ZW0oZnVuLCBhcmdzKSk7XG4gICAgaWYgKHF1ZXVlLmxlbmd0aCA9PT0gMSAmJiAhZHJhaW5pbmcpIHtcbiAgICAgICAgc2V0VGltZW91dChkcmFpblF1ZXVlLCAwKTtcbiAgICB9XG59O1xuXG4vLyB2OCBsaWtlcyBwcmVkaWN0aWJsZSBvYmplY3RzXG5mdW5jdGlvbiBJdGVtKGZ1biwgYXJyYXkpIHtcbiAgICB0aGlzLmZ1biA9IGZ1bjtcbiAgICB0aGlzLmFycmF5ID0gYXJyYXk7XG59XG5JdGVtLnByb3RvdHlwZS5ydW4gPSBmdW5jdGlvbiAoKSB7XG4gICAgdGhpcy5mdW4uYXBwbHkobnVsbCwgdGhpcy5hcnJheSk7XG59O1xucHJvY2Vzcy50aXRsZSA9ICdicm93c2VyJztcbnByb2Nlc3MuYnJvd3NlciA9IHRydWU7XG5wcm9jZXNzLmVudiA9IHt9O1xucHJvY2Vzcy5hcmd2ID0gW107XG5wcm9jZXNzLnZlcnNpb24gPSAnJzsgLy8gZW1wdHkgc3RyaW5nIHRvIGF2b2lkIHJlZ2V4cCBpc3N1ZXNcbnByb2Nlc3MudmVyc2lvbnMgPSB7fTtcblxuZnVuY3Rpb24gbm9vcCgpIHt9XG5cbnByb2Nlc3Mub24gPSBub29wO1xucHJvY2Vzcy5hZGRMaXN0ZW5lciA9IG5vb3A7XG5wcm9jZXNzLm9uY2UgPSBub29wO1xucHJvY2Vzcy5vZmYgPSBub29wO1xucHJvY2Vzcy5yZW1vdmVMaXN0ZW5lciA9IG5vb3A7XG5wcm9jZXNzLnJlbW92ZUFsbExpc3RlbmVycyA9IG5vb3A7XG5wcm9jZXNzLmVtaXQgPSBub29wO1xuXG5wcm9jZXNzLmJpbmRpbmcgPSBmdW5jdGlvbiAobmFtZSkge1xuICAgIHRocm93IG5ldyBFcnJvcigncHJvY2Vzcy5iaW5kaW5nIGlzIG5vdCBzdXBwb3J0ZWQnKTtcbn07XG5cbnByb2Nlc3MuY3dkID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gJy8nIH07XG5wcm9jZXNzLmNoZGlyID0gZnVuY3Rpb24gKGRpcikge1xuICAgIHRocm93IG5ldyBFcnJvcigncHJvY2Vzcy5jaGRpciBpcyBub3Qgc3VwcG9ydGVkJyk7XG59O1xucHJvY2Vzcy51bWFzayA9IGZ1bmN0aW9uKCkgeyByZXR1cm4gMDsgfTtcbiJdfQ==
