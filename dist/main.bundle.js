/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./node_modules/core-js/internals/a-function.js":
/*!******************************************************!*\
  !*** ./node_modules/core-js/internals/a-function.js ***!
  \******************************************************/
/***/ ((module) => {

module.exports = function (it) {
  if (typeof it != 'function') {
    throw TypeError(String(it) + ' is not a function');
  } return it;
};


/***/ }),

/***/ "./node_modules/core-js/internals/an-object.js":
/*!*****************************************************!*\
  !*** ./node_modules/core-js/internals/an-object.js ***!
  \*****************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var isObject = __webpack_require__(/*! ../internals/is-object */ "./node_modules/core-js/internals/is-object.js");

module.exports = function (it) {
  if (!isObject(it)) {
    throw TypeError(String(it) + ' is not an object');
  } return it;
};


/***/ }),

/***/ "./node_modules/core-js/internals/array-for-each.js":
/*!**********************************************************!*\
  !*** ./node_modules/core-js/internals/array-for-each.js ***!
  \**********************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var $forEach = __webpack_require__(/*! ../internals/array-iteration */ "./node_modules/core-js/internals/array-iteration.js").forEach;
var arrayMethodIsStrict = __webpack_require__(/*! ../internals/array-method-is-strict */ "./node_modules/core-js/internals/array-method-is-strict.js");

var STRICT_METHOD = arrayMethodIsStrict('forEach');

// `Array.prototype.forEach` method implementation
// https://tc39.es/ecma262/#sec-array.prototype.foreach
module.exports = !STRICT_METHOD ? function forEach(callbackfn /* , thisArg */) {
  return $forEach(this, callbackfn, arguments.length > 1 ? arguments[1] : undefined);
} : [].forEach;


/***/ }),

/***/ "./node_modules/core-js/internals/array-iteration.js":
/*!***********************************************************!*\
  !*** ./node_modules/core-js/internals/array-iteration.js ***!
  \***********************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var bind = __webpack_require__(/*! ../internals/function-bind-context */ "./node_modules/core-js/internals/function-bind-context.js");
var IndexedObject = __webpack_require__(/*! ../internals/indexed-object */ "./node_modules/core-js/internals/indexed-object.js");
var toObject = __webpack_require__(/*! ../internals/to-object */ "./node_modules/core-js/internals/to-object.js");
var toLength = __webpack_require__(/*! ../internals/to-length */ "./node_modules/core-js/internals/to-length.js");
var arraySpeciesCreate = __webpack_require__(/*! ../internals/array-species-create */ "./node_modules/core-js/internals/array-species-create.js");

var push = [].push;

// `Array.prototype.{ forEach, map, filter, some, every, find, findIndex, filterOut }` methods implementation
var createMethod = function (TYPE) {
  var IS_MAP = TYPE == 1;
  var IS_FILTER = TYPE == 2;
  var IS_SOME = TYPE == 3;
  var IS_EVERY = TYPE == 4;
  var IS_FIND_INDEX = TYPE == 6;
  var IS_FILTER_OUT = TYPE == 7;
  var NO_HOLES = TYPE == 5 || IS_FIND_INDEX;
  return function ($this, callbackfn, that, specificCreate) {
    var O = toObject($this);
    var self = IndexedObject(O);
    var boundFunction = bind(callbackfn, that, 3);
    var length = toLength(self.length);
    var index = 0;
    var create = specificCreate || arraySpeciesCreate;
    var target = IS_MAP ? create($this, length) : IS_FILTER || IS_FILTER_OUT ? create($this, 0) : undefined;
    var value, result;
    for (;length > index; index++) if (NO_HOLES || index in self) {
      value = self[index];
      result = boundFunction(value, index, O);
      if (TYPE) {
        if (IS_MAP) target[index] = result; // map
        else if (result) switch (TYPE) {
          case 3: return true;              // some
          case 5: return value;             // find
          case 6: return index;             // findIndex
          case 2: push.call(target, value); // filter
        } else switch (TYPE) {
          case 4: return false;             // every
          case 7: push.call(target, value); // filterOut
        }
      }
    }
    return IS_FIND_INDEX ? -1 : IS_SOME || IS_EVERY ? IS_EVERY : target;
  };
};

module.exports = {
  // `Array.prototype.forEach` method
  // https://tc39.es/ecma262/#sec-array.prototype.foreach
  forEach: createMethod(0),
  // `Array.prototype.map` method
  // https://tc39.es/ecma262/#sec-array.prototype.map
  map: createMethod(1),
  // `Array.prototype.filter` method
  // https://tc39.es/ecma262/#sec-array.prototype.filter
  filter: createMethod(2),
  // `Array.prototype.some` method
  // https://tc39.es/ecma262/#sec-array.prototype.some
  some: createMethod(3),
  // `Array.prototype.every` method
  // https://tc39.es/ecma262/#sec-array.prototype.every
  every: createMethod(4),
  // `Array.prototype.find` method
  // https://tc39.es/ecma262/#sec-array.prototype.find
  find: createMethod(5),
  // `Array.prototype.findIndex` method
  // https://tc39.es/ecma262/#sec-array.prototype.findIndex
  findIndex: createMethod(6),
  // `Array.prototype.filterOut` method
  // https://github.com/tc39/proposal-array-filtering
  filterOut: createMethod(7)
};


/***/ }),

/***/ "./node_modules/core-js/internals/array-method-is-strict.js":
/*!******************************************************************!*\
  !*** ./node_modules/core-js/internals/array-method-is-strict.js ***!
  \******************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var fails = __webpack_require__(/*! ../internals/fails */ "./node_modules/core-js/internals/fails.js");

module.exports = function (METHOD_NAME, argument) {
  var method = [][METHOD_NAME];
  return !!method && fails(function () {
    // eslint-disable-next-line no-useless-call,no-throw-literal -- required for testing
    method.call(null, argument || function () { throw 1; }, 1);
  });
};


/***/ }),

/***/ "./node_modules/core-js/internals/array-species-create.js":
/*!****************************************************************!*\
  !*** ./node_modules/core-js/internals/array-species-create.js ***!
  \****************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var isObject = __webpack_require__(/*! ../internals/is-object */ "./node_modules/core-js/internals/is-object.js");
var isArray = __webpack_require__(/*! ../internals/is-array */ "./node_modules/core-js/internals/is-array.js");
var wellKnownSymbol = __webpack_require__(/*! ../internals/well-known-symbol */ "./node_modules/core-js/internals/well-known-symbol.js");

var SPECIES = wellKnownSymbol('species');

// `ArraySpeciesCreate` abstract operation
// https://tc39.es/ecma262/#sec-arrayspeciescreate
module.exports = function (originalArray, length) {
  var C;
  if (isArray(originalArray)) {
    C = originalArray.constructor;
    // cross-realm fallback
    if (typeof C == 'function' && (C === Array || isArray(C.prototype))) C = undefined;
    else if (isObject(C)) {
      C = C[SPECIES];
      if (C === null) C = undefined;
    }
  } return new (C === undefined ? Array : C)(length === 0 ? 0 : length);
};


/***/ }),

/***/ "./node_modules/core-js/internals/classof-raw.js":
/*!*******************************************************!*\
  !*** ./node_modules/core-js/internals/classof-raw.js ***!
  \*******************************************************/
/***/ ((module) => {

var toString = {}.toString;

module.exports = function (it) {
  return toString.call(it).slice(8, -1);
};


/***/ }),

/***/ "./node_modules/core-js/internals/create-non-enumerable-property.js":
/*!**************************************************************************!*\
  !*** ./node_modules/core-js/internals/create-non-enumerable-property.js ***!
  \**************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var DESCRIPTORS = __webpack_require__(/*! ../internals/descriptors */ "./node_modules/core-js/internals/descriptors.js");
var definePropertyModule = __webpack_require__(/*! ../internals/object-define-property */ "./node_modules/core-js/internals/object-define-property.js");
var createPropertyDescriptor = __webpack_require__(/*! ../internals/create-property-descriptor */ "./node_modules/core-js/internals/create-property-descriptor.js");

module.exports = DESCRIPTORS ? function (object, key, value) {
  return definePropertyModule.f(object, key, createPropertyDescriptor(1, value));
} : function (object, key, value) {
  object[key] = value;
  return object;
};


/***/ }),

/***/ "./node_modules/core-js/internals/create-property-descriptor.js":
/*!**********************************************************************!*\
  !*** ./node_modules/core-js/internals/create-property-descriptor.js ***!
  \**********************************************************************/
/***/ ((module) => {

module.exports = function (bitmap, value) {
  return {
    enumerable: !(bitmap & 1),
    configurable: !(bitmap & 2),
    writable: !(bitmap & 4),
    value: value
  };
};


/***/ }),

/***/ "./node_modules/core-js/internals/descriptors.js":
/*!*******************************************************!*\
  !*** ./node_modules/core-js/internals/descriptors.js ***!
  \*******************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var fails = __webpack_require__(/*! ../internals/fails */ "./node_modules/core-js/internals/fails.js");

// Detect IE8's incomplete defineProperty implementation
module.exports = !fails(function () {
  return Object.defineProperty({}, 1, { get: function () { return 7; } })[1] != 7;
});


/***/ }),

/***/ "./node_modules/core-js/internals/document-create-element.js":
/*!*******************************************************************!*\
  !*** ./node_modules/core-js/internals/document-create-element.js ***!
  \*******************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var global = __webpack_require__(/*! ../internals/global */ "./node_modules/core-js/internals/global.js");
var isObject = __webpack_require__(/*! ../internals/is-object */ "./node_modules/core-js/internals/is-object.js");

var document = global.document;
// typeof document.createElement is 'object' in old IE
var EXISTS = isObject(document) && isObject(document.createElement);

module.exports = function (it) {
  return EXISTS ? document.createElement(it) : {};
};


/***/ }),

/***/ "./node_modules/core-js/internals/dom-iterables.js":
/*!*********************************************************!*\
  !*** ./node_modules/core-js/internals/dom-iterables.js ***!
  \*********************************************************/
/***/ ((module) => {

// iterable DOM collections
// flag - `iterable` interface - 'entries', 'keys', 'values', 'forEach' methods
module.exports = {
  CSSRuleList: 0,
  CSSStyleDeclaration: 0,
  CSSValueList: 0,
  ClientRectList: 0,
  DOMRectList: 0,
  DOMStringList: 0,
  DOMTokenList: 1,
  DataTransferItemList: 0,
  FileList: 0,
  HTMLAllCollection: 0,
  HTMLCollection: 0,
  HTMLFormElement: 0,
  HTMLSelectElement: 0,
  MediaList: 0,
  MimeTypeArray: 0,
  NamedNodeMap: 0,
  NodeList: 1,
  PaintRequestList: 0,
  Plugin: 0,
  PluginArray: 0,
  SVGLengthList: 0,
  SVGNumberList: 0,
  SVGPathSegList: 0,
  SVGPointList: 0,
  SVGStringList: 0,
  SVGTransformList: 0,
  SourceBufferList: 0,
  StyleSheetList: 0,
  TextTrackCueList: 0,
  TextTrackList: 0,
  TouchList: 0
};


/***/ }),

/***/ "./node_modules/core-js/internals/engine-is-node.js":
/*!**********************************************************!*\
  !*** ./node_modules/core-js/internals/engine-is-node.js ***!
  \**********************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var classof = __webpack_require__(/*! ../internals/classof-raw */ "./node_modules/core-js/internals/classof-raw.js");
var global = __webpack_require__(/*! ../internals/global */ "./node_modules/core-js/internals/global.js");

module.exports = classof(global.process) == 'process';


/***/ }),

/***/ "./node_modules/core-js/internals/engine-user-agent.js":
/*!*************************************************************!*\
  !*** ./node_modules/core-js/internals/engine-user-agent.js ***!
  \*************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var getBuiltIn = __webpack_require__(/*! ../internals/get-built-in */ "./node_modules/core-js/internals/get-built-in.js");

module.exports = getBuiltIn('navigator', 'userAgent') || '';


/***/ }),

/***/ "./node_modules/core-js/internals/engine-v8-version.js":
/*!*************************************************************!*\
  !*** ./node_modules/core-js/internals/engine-v8-version.js ***!
  \*************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var global = __webpack_require__(/*! ../internals/global */ "./node_modules/core-js/internals/global.js");
var userAgent = __webpack_require__(/*! ../internals/engine-user-agent */ "./node_modules/core-js/internals/engine-user-agent.js");

var process = global.process;
var versions = process && process.versions;
var v8 = versions && versions.v8;
var match, version;

if (v8) {
  match = v8.split('.');
  version = match[0] + match[1];
} else if (userAgent) {
  match = userAgent.match(/Edge\/(\d+)/);
  if (!match || match[1] >= 74) {
    match = userAgent.match(/Chrome\/(\d+)/);
    if (match) version = match[1];
  }
}

module.exports = version && +version;


/***/ }),

/***/ "./node_modules/core-js/internals/fails.js":
/*!*************************************************!*\
  !*** ./node_modules/core-js/internals/fails.js ***!
  \*************************************************/
/***/ ((module) => {

module.exports = function (exec) {
  try {
    return !!exec();
  } catch (error) {
    return true;
  }
};


/***/ }),

/***/ "./node_modules/core-js/internals/function-bind-context.js":
/*!*****************************************************************!*\
  !*** ./node_modules/core-js/internals/function-bind-context.js ***!
  \*****************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var aFunction = __webpack_require__(/*! ../internals/a-function */ "./node_modules/core-js/internals/a-function.js");

// optional / simple context binding
module.exports = function (fn, that, length) {
  aFunction(fn);
  if (that === undefined) return fn;
  switch (length) {
    case 0: return function () {
      return fn.call(that);
    };
    case 1: return function (a) {
      return fn.call(that, a);
    };
    case 2: return function (a, b) {
      return fn.call(that, a, b);
    };
    case 3: return function (a, b, c) {
      return fn.call(that, a, b, c);
    };
  }
  return function (/* ...args */) {
    return fn.apply(that, arguments);
  };
};


/***/ }),

/***/ "./node_modules/core-js/internals/get-built-in.js":
/*!********************************************************!*\
  !*** ./node_modules/core-js/internals/get-built-in.js ***!
  \********************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var path = __webpack_require__(/*! ../internals/path */ "./node_modules/core-js/internals/path.js");
var global = __webpack_require__(/*! ../internals/global */ "./node_modules/core-js/internals/global.js");

var aFunction = function (variable) {
  return typeof variable == 'function' ? variable : undefined;
};

module.exports = function (namespace, method) {
  return arguments.length < 2 ? aFunction(path[namespace]) || aFunction(global[namespace])
    : path[namespace] && path[namespace][method] || global[namespace] && global[namespace][method];
};


/***/ }),

/***/ "./node_modules/core-js/internals/global.js":
/*!**************************************************!*\
  !*** ./node_modules/core-js/internals/global.js ***!
  \**************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var check = function (it) {
  return it && it.Math == Math && it;
};

// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
module.exports =
  /* global globalThis -- safe */
  check(typeof globalThis == 'object' && globalThis) ||
  check(typeof window == 'object' && window) ||
  check(typeof self == 'object' && self) ||
  check(typeof __webpack_require__.g == 'object' && __webpack_require__.g) ||
  // eslint-disable-next-line no-new-func -- fallback
  (function () { return this; })() || Function('return this')();


/***/ }),

/***/ "./node_modules/core-js/internals/has.js":
/*!***********************************************!*\
  !*** ./node_modules/core-js/internals/has.js ***!
  \***********************************************/
/***/ ((module) => {

var hasOwnProperty = {}.hasOwnProperty;

module.exports = function (it, key) {
  return hasOwnProperty.call(it, key);
};


/***/ }),

/***/ "./node_modules/core-js/internals/ie8-dom-define.js":
/*!**********************************************************!*\
  !*** ./node_modules/core-js/internals/ie8-dom-define.js ***!
  \**********************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var DESCRIPTORS = __webpack_require__(/*! ../internals/descriptors */ "./node_modules/core-js/internals/descriptors.js");
var fails = __webpack_require__(/*! ../internals/fails */ "./node_modules/core-js/internals/fails.js");
var createElement = __webpack_require__(/*! ../internals/document-create-element */ "./node_modules/core-js/internals/document-create-element.js");

// Thank's IE8 for his funny defineProperty
module.exports = !DESCRIPTORS && !fails(function () {
  return Object.defineProperty(createElement('div'), 'a', {
    get: function () { return 7; }
  }).a != 7;
});


/***/ }),

/***/ "./node_modules/core-js/internals/indexed-object.js":
/*!**********************************************************!*\
  !*** ./node_modules/core-js/internals/indexed-object.js ***!
  \**********************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var fails = __webpack_require__(/*! ../internals/fails */ "./node_modules/core-js/internals/fails.js");
var classof = __webpack_require__(/*! ../internals/classof-raw */ "./node_modules/core-js/internals/classof-raw.js");

var split = ''.split;

// fallback for non-array-like ES3 and non-enumerable old V8 strings
module.exports = fails(function () {
  // throws an error in rhino, see https://github.com/mozilla/rhino/issues/346
  // eslint-disable-next-line no-prototype-builtins -- safe
  return !Object('z').propertyIsEnumerable(0);
}) ? function (it) {
  return classof(it) == 'String' ? split.call(it, '') : Object(it);
} : Object;


/***/ }),

/***/ "./node_modules/core-js/internals/is-array.js":
/*!****************************************************!*\
  !*** ./node_modules/core-js/internals/is-array.js ***!
  \****************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var classof = __webpack_require__(/*! ../internals/classof-raw */ "./node_modules/core-js/internals/classof-raw.js");

// `IsArray` abstract operation
// https://tc39.es/ecma262/#sec-isarray
module.exports = Array.isArray || function isArray(arg) {
  return classof(arg) == 'Array';
};


/***/ }),

/***/ "./node_modules/core-js/internals/is-object.js":
/*!*****************************************************!*\
  !*** ./node_modules/core-js/internals/is-object.js ***!
  \*****************************************************/
/***/ ((module) => {

module.exports = function (it) {
  return typeof it === 'object' ? it !== null : typeof it === 'function';
};


/***/ }),

/***/ "./node_modules/core-js/internals/is-pure.js":
/*!***************************************************!*\
  !*** ./node_modules/core-js/internals/is-pure.js ***!
  \***************************************************/
/***/ ((module) => {

module.exports = false;


/***/ }),

/***/ "./node_modules/core-js/internals/native-symbol.js":
/*!*********************************************************!*\
  !*** ./node_modules/core-js/internals/native-symbol.js ***!
  \*********************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var IS_NODE = __webpack_require__(/*! ../internals/engine-is-node */ "./node_modules/core-js/internals/engine-is-node.js");
var V8_VERSION = __webpack_require__(/*! ../internals/engine-v8-version */ "./node_modules/core-js/internals/engine-v8-version.js");
var fails = __webpack_require__(/*! ../internals/fails */ "./node_modules/core-js/internals/fails.js");

module.exports = !!Object.getOwnPropertySymbols && !fails(function () {
  /* global Symbol -- required for testing */
  return !Symbol.sham &&
    // Chrome 38 Symbol has incorrect toString conversion
    // Chrome 38-40 symbols are not inherited from DOM collections prototypes to instances
    (IS_NODE ? V8_VERSION === 38 : V8_VERSION > 37 && V8_VERSION < 41);
});


/***/ }),

/***/ "./node_modules/core-js/internals/object-define-property.js":
/*!******************************************************************!*\
  !*** ./node_modules/core-js/internals/object-define-property.js ***!
  \******************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

var DESCRIPTORS = __webpack_require__(/*! ../internals/descriptors */ "./node_modules/core-js/internals/descriptors.js");
var IE8_DOM_DEFINE = __webpack_require__(/*! ../internals/ie8-dom-define */ "./node_modules/core-js/internals/ie8-dom-define.js");
var anObject = __webpack_require__(/*! ../internals/an-object */ "./node_modules/core-js/internals/an-object.js");
var toPrimitive = __webpack_require__(/*! ../internals/to-primitive */ "./node_modules/core-js/internals/to-primitive.js");

var nativeDefineProperty = Object.defineProperty;

// `Object.defineProperty` method
// https://tc39.es/ecma262/#sec-object.defineproperty
exports.f = DESCRIPTORS ? nativeDefineProperty : function defineProperty(O, P, Attributes) {
  anObject(O);
  P = toPrimitive(P, true);
  anObject(Attributes);
  if (IE8_DOM_DEFINE) try {
    return nativeDefineProperty(O, P, Attributes);
  } catch (error) { /* empty */ }
  if ('get' in Attributes || 'set' in Attributes) throw TypeError('Accessors not supported');
  if ('value' in Attributes) O[P] = Attributes.value;
  return O;
};


/***/ }),

/***/ "./node_modules/core-js/internals/path.js":
/*!************************************************!*\
  !*** ./node_modules/core-js/internals/path.js ***!
  \************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var global = __webpack_require__(/*! ../internals/global */ "./node_modules/core-js/internals/global.js");

module.exports = global;


/***/ }),

/***/ "./node_modules/core-js/internals/require-object-coercible.js":
/*!********************************************************************!*\
  !*** ./node_modules/core-js/internals/require-object-coercible.js ***!
  \********************************************************************/
/***/ ((module) => {

// `RequireObjectCoercible` abstract operation
// https://tc39.es/ecma262/#sec-requireobjectcoercible
module.exports = function (it) {
  if (it == undefined) throw TypeError("Can't call method on " + it);
  return it;
};


/***/ }),

/***/ "./node_modules/core-js/internals/set-global.js":
/*!******************************************************!*\
  !*** ./node_modules/core-js/internals/set-global.js ***!
  \******************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var global = __webpack_require__(/*! ../internals/global */ "./node_modules/core-js/internals/global.js");
var createNonEnumerableProperty = __webpack_require__(/*! ../internals/create-non-enumerable-property */ "./node_modules/core-js/internals/create-non-enumerable-property.js");

module.exports = function (key, value) {
  try {
    createNonEnumerableProperty(global, key, value);
  } catch (error) {
    global[key] = value;
  } return value;
};


/***/ }),

/***/ "./node_modules/core-js/internals/shared-store.js":
/*!********************************************************!*\
  !*** ./node_modules/core-js/internals/shared-store.js ***!
  \********************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var global = __webpack_require__(/*! ../internals/global */ "./node_modules/core-js/internals/global.js");
var setGlobal = __webpack_require__(/*! ../internals/set-global */ "./node_modules/core-js/internals/set-global.js");

var SHARED = '__core-js_shared__';
var store = global[SHARED] || setGlobal(SHARED, {});

module.exports = store;


/***/ }),

/***/ "./node_modules/core-js/internals/shared.js":
/*!**************************************************!*\
  !*** ./node_modules/core-js/internals/shared.js ***!
  \**************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var IS_PURE = __webpack_require__(/*! ../internals/is-pure */ "./node_modules/core-js/internals/is-pure.js");
var store = __webpack_require__(/*! ../internals/shared-store */ "./node_modules/core-js/internals/shared-store.js");

(module.exports = function (key, value) {
  return store[key] || (store[key] = value !== undefined ? value : {});
})('versions', []).push({
  version: '3.9.1',
  mode: IS_PURE ? 'pure' : 'global',
  copyright: '© 2021 Denis Pushkarev (zloirock.ru)'
});


/***/ }),

/***/ "./node_modules/core-js/internals/to-integer.js":
/*!******************************************************!*\
  !*** ./node_modules/core-js/internals/to-integer.js ***!
  \******************************************************/
/***/ ((module) => {

var ceil = Math.ceil;
var floor = Math.floor;

// `ToInteger` abstract operation
// https://tc39.es/ecma262/#sec-tointeger
module.exports = function (argument) {
  return isNaN(argument = +argument) ? 0 : (argument > 0 ? floor : ceil)(argument);
};


/***/ }),

/***/ "./node_modules/core-js/internals/to-length.js":
/*!*****************************************************!*\
  !*** ./node_modules/core-js/internals/to-length.js ***!
  \*****************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var toInteger = __webpack_require__(/*! ../internals/to-integer */ "./node_modules/core-js/internals/to-integer.js");

var min = Math.min;

// `ToLength` abstract operation
// https://tc39.es/ecma262/#sec-tolength
module.exports = function (argument) {
  return argument > 0 ? min(toInteger(argument), 0x1FFFFFFFFFFFFF) : 0; // 2 ** 53 - 1 == 9007199254740991
};


/***/ }),

/***/ "./node_modules/core-js/internals/to-object.js":
/*!*****************************************************!*\
  !*** ./node_modules/core-js/internals/to-object.js ***!
  \*****************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var requireObjectCoercible = __webpack_require__(/*! ../internals/require-object-coercible */ "./node_modules/core-js/internals/require-object-coercible.js");

// `ToObject` abstract operation
// https://tc39.es/ecma262/#sec-toobject
module.exports = function (argument) {
  return Object(requireObjectCoercible(argument));
};


/***/ }),

/***/ "./node_modules/core-js/internals/to-primitive.js":
/*!********************************************************!*\
  !*** ./node_modules/core-js/internals/to-primitive.js ***!
  \********************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var isObject = __webpack_require__(/*! ../internals/is-object */ "./node_modules/core-js/internals/is-object.js");

// `ToPrimitive` abstract operation
// https://tc39.es/ecma262/#sec-toprimitive
// instead of the ES6 spec version, we didn't implement @@toPrimitive case
// and the second argument - flag - preferred type is a string
module.exports = function (input, PREFERRED_STRING) {
  if (!isObject(input)) return input;
  var fn, val;
  if (PREFERRED_STRING && typeof (fn = input.toString) == 'function' && !isObject(val = fn.call(input))) return val;
  if (typeof (fn = input.valueOf) == 'function' && !isObject(val = fn.call(input))) return val;
  if (!PREFERRED_STRING && typeof (fn = input.toString) == 'function' && !isObject(val = fn.call(input))) return val;
  throw TypeError("Can't convert object to primitive value");
};


/***/ }),

/***/ "./node_modules/core-js/internals/uid.js":
/*!***********************************************!*\
  !*** ./node_modules/core-js/internals/uid.js ***!
  \***********************************************/
/***/ ((module) => {

var id = 0;
var postfix = Math.random();

module.exports = function (key) {
  return 'Symbol(' + String(key === undefined ? '' : key) + ')_' + (++id + postfix).toString(36);
};


/***/ }),

/***/ "./node_modules/core-js/internals/use-symbol-as-uid.js":
/*!*************************************************************!*\
  !*** ./node_modules/core-js/internals/use-symbol-as-uid.js ***!
  \*************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var NATIVE_SYMBOL = __webpack_require__(/*! ../internals/native-symbol */ "./node_modules/core-js/internals/native-symbol.js");

module.exports = NATIVE_SYMBOL
  /* global Symbol -- safe */
  && !Symbol.sham
  && typeof Symbol.iterator == 'symbol';


/***/ }),

/***/ "./node_modules/core-js/internals/well-known-symbol.js":
/*!*************************************************************!*\
  !*** ./node_modules/core-js/internals/well-known-symbol.js ***!
  \*************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var global = __webpack_require__(/*! ../internals/global */ "./node_modules/core-js/internals/global.js");
var shared = __webpack_require__(/*! ../internals/shared */ "./node_modules/core-js/internals/shared.js");
var has = __webpack_require__(/*! ../internals/has */ "./node_modules/core-js/internals/has.js");
var uid = __webpack_require__(/*! ../internals/uid */ "./node_modules/core-js/internals/uid.js");
var NATIVE_SYMBOL = __webpack_require__(/*! ../internals/native-symbol */ "./node_modules/core-js/internals/native-symbol.js");
var USE_SYMBOL_AS_UID = __webpack_require__(/*! ../internals/use-symbol-as-uid */ "./node_modules/core-js/internals/use-symbol-as-uid.js");

var WellKnownSymbolsStore = shared('wks');
var Symbol = global.Symbol;
var createWellKnownSymbol = USE_SYMBOL_AS_UID ? Symbol : Symbol && Symbol.withoutSetter || uid;

module.exports = function (name) {
  if (!has(WellKnownSymbolsStore, name) || !(NATIVE_SYMBOL || typeof WellKnownSymbolsStore[name] == 'string')) {
    if (NATIVE_SYMBOL && has(Symbol, name)) {
      WellKnownSymbolsStore[name] = Symbol[name];
    } else {
      WellKnownSymbolsStore[name] = createWellKnownSymbol('Symbol.' + name);
    }
  } return WellKnownSymbolsStore[name];
};


/***/ }),

/***/ "./node_modules/core-js/modules/web.dom-collections.for-each.js":
/*!**********************************************************************!*\
  !*** ./node_modules/core-js/modules/web.dom-collections.for-each.js ***!
  \**********************************************************************/
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

var global = __webpack_require__(/*! ../internals/global */ "./node_modules/core-js/internals/global.js");
var DOMIterables = __webpack_require__(/*! ../internals/dom-iterables */ "./node_modules/core-js/internals/dom-iterables.js");
var forEach = __webpack_require__(/*! ../internals/array-for-each */ "./node_modules/core-js/internals/array-for-each.js");
var createNonEnumerableProperty = __webpack_require__(/*! ../internals/create-non-enumerable-property */ "./node_modules/core-js/internals/create-non-enumerable-property.js");

for (var COLLECTION_NAME in DOMIterables) {
  var Collection = global[COLLECTION_NAME];
  var CollectionPrototype = Collection && Collection.prototype;
  // some Chrome versions have non-configurable methods on DOMTokenList
  if (CollectionPrototype && CollectionPrototype.forEach !== forEach) try {
    createNonEnumerableProperty(CollectionPrototype, 'forEach', forEach);
  } catch (error) {
    CollectionPrototype.forEach = forEach;
  }
}


/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js!./node_modules/sass-loader/dist/cjs.js!./src/assets/styles/style.scss":
/*!*******************************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./node_modules/sass-loader/dist/cjs.js!./src/assets/styles/style.scss ***!
  \*******************************************************************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_cssWithMappingToString_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../node_modules/css-loader/dist/runtime/cssWithMappingToString.js */ "./node_modules/css-loader/dist/runtime/cssWithMappingToString.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_cssWithMappingToString_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_cssWithMappingToString_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
// Imports


var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_cssWithMappingToString_js__WEBPACK_IMPORTED_MODULE_0___default()));
// Module
___CSS_LOADER_EXPORT___.push([module.id, "* {\n  font-size: 62.5%;\n  margin: 0;\n  padding: 0;\n  box-sizing: border-box;\n  background: var(--white); }\n\n/* Landscape phones and down */\n/* Landscape phone to portrait tablet */\n/* Portrait tablet to landscape and desktop */\n/* Large desktop */\n:root {\n  font-family: var(--font-familly);\n  color: var(--text-black); }\n\nbody {\n  display: flex;\n  flex-direction: column;\n  max-height: 100vh;\n  min-height: 100vh; }\n  @media (max-width: 480px) {\n    body {\n      max-height: min-content; } }\n\na {\n  text-decoration: none;\n  font-size: 1.5rem; }\n  @media (max-width: 480px) {\n    a {\n      font-size: 1.2rem; } }\n\nli {\n  list-style: none; }\n\nmain {\n  display: flex;\n  flex-grow: 1;\n  max-width: 100%; }\n  @media (max-width: 480px) {\n    main {\n      margin: 1px 0rem;\n      line-height: initial;\n      font-size: 1.2rem; } }\n  @media (max-width: 767px) {\n    main {\n      margin: 1px 0rem;\n      line-height: initial;\n      font-size: 1.2rem; } }\n  @media (min-width: 768px) and (max-width: 979px) {\n    main {\n      margin: 1px 0rem;\n      line-height: initial;\n      font-size: 1.2rem; } }\n\nh2 {\n  font-size: 2.5rem;\n  font-weight: 700; }\n  @media (max-width: 480px) {\n    h2 {\n      font-size: 1.8rem; } }\n  @media (max-width: 767px) {\n    h2 {\n      font-size: 2rem; } }\n\np {\n  font-size: 1.5rem; }\n  @media (max-width: 480px) {\n    p {\n      font-size: 1.2rem; } }\n  @media (max-width: 767px) {\n    p {\n      font-size: 1.4rem; } }\n\ni {\n  font-size: 1.5rem;\n  color: var(--gray);\n  margin-right: 2rem; }\n  @media (max-width: 480px) {\n    i {\n      margin-right: 0.5rem;\n      font-size: 1.2rem; } }\n\n:root {\n  --text-black: #1e272e;\n  --gray: #b2bec3;\n  --white: white;\n  --red: #d63031;\n  --font-familly: \"Mulish\", sans-serif;\n  --font-cursive: \"Shadows Into Light\", cursive;\n  --font-label: \"New Tegomin\", serif;\n  --box-shadow: 0 1px 2px 0 rgba(60, 64, 67, 0.3),\r\n    0 1px 3px 1px rgba(60, 64, 67, 0.15); }\n\n/* Landscape phones and down */\n/* Landscape phone to portrait tablet */\n/* Portrait tablet to landscape and desktop */\n/* Large desktop */\n.theme-container {\n  display: flex;\n  flex-grow: 1;\n  justify-content: space-between;\n  margin: 0 -0.3rem; }\n  @media (max-width: 480px) {\n    .theme-container {\n      display: block;\n      flex: auto;\n      margin: 0 0.2rem; } }\n  @media (max-width: 767px) {\n    .theme-container {\n      display: block;\n      margin: 0 0.2rem; } }\n  @media (min-width: 768px) and (max-width: 979px) {\n    .theme-container {\n      display: block;\n      margin: 0 0.2rem; } }\n  .theme-container .content-themes {\n    flex-grow: 1;\n    flex: 1;\n    margin: 0 0.5rem;\n    border: 1px solid var(--gray);\n    box-shadow: var(--box-shadow); }\n    @media (max-width: 480px) {\n      .theme-container .content-themes {\n        margin: 0 0 0.5rem 0; } }\n    @media (max-width: 767px) {\n      .theme-container .content-themes {\n        margin: 0 0 0.5rem 0; } }\n    @media (min-width: 768px) and (max-width: 979px) {\n      .theme-container .content-themes {\n        margin: 0 0 0.5rem 0; } }\n    .theme-container .content-themes h2 {\n      text-align: center;\n      padding: 2rem 0;\n      border-bottom: 1px solid var(--gray);\n      box-shadow: var(--box-shadow);\n      text-shadow: 1px 1px 2px var(--gray); }\n      @media (max-width: 480px) {\n        .theme-container .content-themes h2 {\n          padding: 0.5rem 0; } }\n      @media (max-width: 767px) {\n        .theme-container .content-themes h2 {\n          padding: 0.5rem 0; } }\n\n/* Landscape phones and down */\n/* Landscape phone to portrait tablet */\n/* Portrait tablet to landscape and desktop */\n/* Large desktop */\n@keyframes imageBanner {\n  0% {\n    opacity: 20%; }\n  100% {\n    opacity: 100%; } }\n\n.scrollable {\n  display: flex;\n  flex-grow: 1;\n  flex-direction: column;\n  font-size: 1.5rem;\n  overflow: scroll;\n  overflow-x: hidden; }\n  .scrollable header {\n    margin: 1.5rem 0.2rem 0.2rem 0.2rem;\n    font-family: var(--font-label); }\n    @media (max-width: 480px) {\n      .scrollable header {\n        margin: 0.2rem; } }\n    .scrollable header .header-container {\n      display: flex;\n      min-width: 100%; }\n      .scrollable header .header-container .header-nav {\n        display: flex;\n        flex: 1; }\n        @media (max-width: 480px) {\n          .scrollable header .header-container .header-nav {\n            display: none; } }\n        .scrollable header .header-container .header-nav .nav {\n          display: flex;\n          justify-content: center;\n          align-items: center;\n          width: 100%;\n          font-size: 2rem;\n          text-align: center;\n          color: var(--gray);\n          border: 1px solid var(--gray);\n          box-shadow: var(--box-shadow); }\n          @media (min-width: 768px) and (max-width: 979px) {\n            .scrollable header .header-container .header-nav .nav {\n              font-size: 1.5rem; } }\n          @media (max-width: 767px) {\n            .scrollable header .header-container .header-nav .nav {\n              font-size: 1.5rem; } }\n          .scrollable header .header-container .header-nav .nav:hover {\n            font-weight: 700; }\n        .scrollable header .header-container .header-nav .active {\n          border-radius: 10px 10px 0 0;\n          color: var(--white);\n          background: var(--gray);\n          z-index: 1;\n          width: 100%;\n          height: calc(100% + 10px);\n          position: relative;\n          bottom: 10px;\n          overflow: visible; }\n          .scrollable header .header-container .header-nav .active:hover {\n            font-weight: 700; }\n      .scrollable header .header-container .header-menu-icon {\n        display: none; }\n        @media (max-width: 480px) {\n          .scrollable header .header-container .header-menu-icon {\n            display: flex;\n            width: 100%; } }\n        .scrollable header .header-container .header-menu-icon .header-title {\n          display: flex;\n          justify-content: left;\n          margin-left: 3rem;\n          font-size: 3rem; }\n        @media (max-width: 480px) {\n          .scrollable header .header-container .header-menu-icon i {\n            display: flex;\n            justify-content: flex-end;\n            align-items: center;\n            margin: 1rem 2rem 1rem 1rem;\n            width: 100%;\n            font-size: 3rem; } }\n      .scrollable header .header-container .mobile-menu {\n        display: none;\n        position: absolute;\n        z-index: 1;\n        top: 72px;\n        right: 1rem;\n        padding: 1rem 1.5rem;\n        width: 200px;\n        border-radius: 3px;\n        box-shadow: var(--box-shadow);\n        background: var(--white); }\n        .scrollable header .header-container .mobile-menu .nav {\n          display: flex;\n          font-size: 1.5rem;\n          color: var(--gray); }\n        .scrollable header .header-container .mobile-menu .active {\n          text-decoration: underline;\n          font-weight: 700; }\n      .scrollable header .header-container .mobile-menu.open {\n        display: block; }\n  .scrollable .banner {\n    max-width: 100%;\n    margin: 0 0.2rem; }\n    .scrollable .banner .img-banner {\n      display: flex;\n      align-content: center;\n      max-width: 100%;\n      animation: imageBanner 3s 0s; }\n\nfooter {\n  min-width: 100%; }\n  footer .foot-container {\n    display: flex;\n    flex-flow: row wrap;\n    border: 2px solid var(--gray);\n    margin: 0.2rem 0.2rem 0.5rem 0.2rem;\n    padding: 0.5rem;\n    background: var(--gray);\n    box-shadow: var(--box-shadow);\n    border: 1px solid var(--text-black); }\n    footer .foot-container .copyright {\n      display: flex;\n      align-items: center;\n      justify-content: flex-start;\n      flex: 1;\n      background: var(--gray); }\n      footer .foot-container .copyright p {\n        color: var(--text-black);\n        background: var(--gray);\n        font-weight: 700;\n        text-shadow: 1px 1px 2px white; }\n    footer .foot-container .contact {\n      display: flex;\n      align-items: center;\n      justify-content: center;\n      flex: 1;\n      background: var(--gray); }\n      footer .foot-container .contact a {\n        margin-left: 1rem;\n        color: var(--text-black);\n        text-shadow: 1px 1px 2px white;\n        background: var(--gray); }\n        @media (max-width: 480px) {\n          footer .foot-container .contact a {\n            margin: 0 1rem; } }\n        footer .foot-container .contact a i {\n          color: var(--text-black);\n          font-size: 3rem;\n          margin: 0 1rem;\n          background: var(--gray);\n          text-shadow: 1px 1px 2px white; }\n          @media (max-width: 480px) {\n            footer .foot-container .contact a i {\n              font-size: 2rem;\n              margin: 0; } }\n    footer .foot-container .link-to-top {\n      display: flex;\n      align-items: center;\n      justify-content: flex-end;\n      flex: 1;\n      font-size: 2.5rem;\n      background: var(--gray); }\n      @media (max-width: 480px) {\n        footer .foot-container .link-to-top {\n          display: none;\n          margin: 0;\n          padding: 0;\n          justify-content: flex-end; } }\n      footer .foot-container .link-to-top a {\n        color: var(--text-black);\n        background: var(--gray);\n        text-shadow: 1px 1px 2px white; }\n        footer .foot-container .link-to-top a i {\n          font-size: 3rem;\n          margin: 0;\n          color: var(--text-black);\n          background: var(--gray);\n          text-shadow: 1px 1px 2px white; }\n    footer .foot-container .link-to-top-mobile {\n      display: none;\n      align-items: center;\n      justify-content: flex-end;\n      flex: 1;\n      font-size: 2.5rem;\n      background: var(--gray); }\n      @media (max-width: 480px) {\n        footer .foot-container .link-to-top-mobile {\n          display: flex;\n          margin: 0;\n          padding: 0;\n          justify-content: flex-end; } }\n      footer .foot-container .link-to-top-mobile a {\n        color: var(--text-black);\n        background: var(--gray);\n        text-shadow: 1px 1px 2px white; }\n        footer .foot-container .link-to-top-mobile a i {\n          font-size: 3rem;\n          margin: 0;\n          color: var(--text-black);\n          background: var(--gray);\n          text-shadow: 1px 1px 2px white; }\n", "",{"version":3,"sources":["webpack://./src/assets/styles/_reset.scss","webpack://./src/assets/styles/_media_queries.scss","webpack://./src/assets/styles/_base.scss","webpack://./src/assets/styles/_variables.scss","webpack://./src/assets/styles/_utiles.scss","webpack://./src/assets/styles/_keyframes.scss","webpack://./src/assets/styles/style.scss"],"names":[],"mappings":"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","sourcesContent":["* {\r\n  font-size: 62.5%;\r\n  margin: 0;\r\n  padding: 0;\r\n  box-sizing: border-box;\r\n  background: var(--white);\r\n}\r\n","/* Landscape phones and down */\r\n@mixin xs {\r\n  @media (max-width: 480px) {\r\n    @content;\r\n  }\r\n}\r\n\r\n/* Landscape phone to portrait tablet */\r\n@mixin sm {\r\n  @media (max-width: 767px) {\r\n    @content;\r\n  }\r\n}\r\n\r\n/* Portrait tablet to landscape and desktop */\r\n@mixin md {\r\n  @media (min-width: 768px) and (max-width: 979px) {\r\n    @content;\r\n  }\r\n}\r\n\r\n/* Large desktop */\r\n@mixin xl {\r\n  @media (min-width: 1200px) {\r\n    @content;\r\n  }\r\n}\r\n","@import \"./media_queries\";\r\n\r\n:root {\r\n  font-family: var(--font-familly);\r\n  color: var(--text-black);\r\n}\r\n\r\nbody {\r\n  display: flex;\r\n  flex-direction: column;\r\n  max-height: 100vh;\r\n  min-height: 100vh;\r\n  @include xs {\r\n    max-height: min-content;\r\n  }\r\n}\r\n\r\na {\r\n  text-decoration: none;\r\n  font-size: 1.5rem;\r\n  @include xs {\r\n    font-size: 1.2rem;\r\n  }\r\n}\r\n\r\nli {\r\n  list-style: none;\r\n}\r\n\r\nmain {\r\n  display: flex;\r\n  flex-grow: 1;\r\n  max-width: 100%;\r\n  @include xs {\r\n    margin: 1px 0rem;\r\n    line-height: initial;\r\n    font-size: 1.2rem;\r\n  }\r\n  @include sm {\r\n    margin: 1px 0rem;\r\n    line-height: initial;\r\n    font-size: 1.2rem;\r\n  }\r\n  @include md {\r\n    margin: 1px 0rem;\r\n    line-height: initial;\r\n    font-size: 1.2rem;\r\n  }\r\n}\r\n\r\n// h1 {\r\n//   max-width: 100%;\r\n//   font-size: 3rem;\r\n//   font-weight: 700;\r\n//   text-decoration: underline overline var(--gray);\r\n//   font-style: oblique;\r\n//   text-align: center;\r\n//   padding-bottom: 2rem;\r\n//   @include xs {\r\n//     font-size: 2rem;\r\n//   }\r\n//   @include sm {\r\n//     font-size: 2.2rem;\r\n//   }\r\n// }\r\n\r\nh2 {\r\n  font-size: 2.5rem;\r\n  font-weight: 700;\r\n  @include xs {\r\n    font-size: 1.8rem;\r\n  }\r\n  @include sm {\r\n    font-size: 2rem;\r\n  }\r\n}\r\n\r\np {\r\n  font-size: 1.5rem;\r\n  @include xs {\r\n    font-size: 1.2rem;\r\n  }\r\n  @include sm {\r\n    font-size: 1.4rem;\r\n  }\r\n}\r\n\r\ni {\r\n  font-size: 1.5rem;\r\n  color: var(--gray);\r\n  margin-right: 2rem;\r\n  @include xs {\r\n    margin-right: 0.5rem;\r\n    font-size: 1.2rem;\r\n  }\r\n}\r\n",":root {\r\n  --text-black: #1e272e;\r\n  --gray: #b2bec3;\r\n  --white: white;\r\n  --red: #d63031;\r\n  --font-familly: \"Mulish\", sans-serif;\r\n  --font-cursive: \"Shadows Into Light\", cursive;\r\n  --font-label: \"New Tegomin\", serif;\r\n  --box-shadow: 0 1px 2px 0 rgba(60, 64, 67, 0.3),\r\n    0 1px 3px 1px rgba(60, 64, 67, 0.15);\r\n}\r\n","@import \"./media_queries\";\r\n\r\n.theme-container {\r\n  display: flex;\r\n  flex-grow: 1;\r\n  justify-content: space-between;\r\n  margin: 0 -0.3rem;\r\n  @include xs {\r\n    display: block;\r\n    flex: auto;\r\n    margin: 0 0.2rem;\r\n  }\r\n  @include sm {\r\n    display: block;\r\n    margin: 0 0.2rem;\r\n  }\r\n  @include md {\r\n    display: block;\r\n    margin: 0 0.2rem;\r\n  }\r\n  .content-themes {\r\n    flex-grow: 1;\r\n    flex: 1;\r\n    margin: 0 0.5rem;\r\n    border: 1px solid var(--gray);\r\n    box-shadow: var(--box-shadow);\r\n    @include xs {\r\n      margin: 0 0 0.5rem 0;\r\n    }\r\n    @include sm {\r\n      margin: 0 0 0.5rem 0;\r\n    }\r\n    @include md {\r\n      margin: 0 0 0.5rem 0;\r\n    }\r\n    h2 {\r\n      text-align: center;\r\n      padding: 2rem 0;\r\n      border-bottom: 1px solid var(--gray);\r\n      box-shadow: var(--box-shadow);\r\n      text-shadow: 1px 1px 2px var(--gray);\r\n      @include xs {\r\n        padding: 0.5rem 0;\r\n      }\r\n      @include sm {\r\n        padding: 0.5rem 0;\r\n      }\r\n    }\r\n  }\r\n}\r\n","@keyframes imageBanner {\r\n  0% {\r\n    opacity: 20%;\r\n  }\r\n  100% {\r\n    opacity: 100%;\r\n  }\r\n}\r\n","@import \"./reset\";\r\n@import \"./base\";\r\n@import \"./variables\";\r\n@import \"./utiles\";\r\n@import \"./media_queries\";\r\n@import \"./keyframes\";\r\n\r\n.scrollable {\r\n  display: flex;\r\n  flex-grow: 1;\r\n  flex-direction: column;\r\n  font-size: 1.5rem;\r\n  overflow: scroll;\r\n  overflow-x: hidden;\r\n\r\n  header {\r\n    margin: 1.5rem 0.2rem 0.2rem 0.2rem;\r\n    font-family: var(--font-label);\r\n    @include xs {\r\n      margin: 0.2rem;\r\n    }\r\n\r\n    .header-container {\r\n      display: flex;\r\n      min-width: 100%;\r\n      .header-nav {\r\n        display: flex;\r\n        flex: 1;\r\n        @include xs {\r\n          display: none;\r\n        }\r\n\r\n        .nav {\r\n          display: flex;\r\n          justify-content: center;\r\n          align-items: center;\r\n          width: 100%;\r\n          font-size: 2rem;\r\n          text-align: center;\r\n          color: var(--gray);\r\n          border: 1px solid var(--gray);\r\n          box-shadow: var(--box-shadow);\r\n          @include md {\r\n            font-size: 1.5rem;\r\n          }\r\n          @include sm {\r\n            font-size: 1.5rem;\r\n          }\r\n          &:hover {\r\n            font-weight: 700;\r\n          }\r\n        }\r\n\r\n        .active {\r\n          border-radius: 10px 10px 0 0;\r\n          color: var(--white);\r\n          background: var(--gray);\r\n          z-index: 1;\r\n          width: 100%;\r\n          height: calc(100% + 10px);\r\n          position: relative;\r\n          bottom: 10px;\r\n          overflow: visible;\r\n          &:hover {\r\n            font-weight: 700;\r\n          }\r\n        }\r\n      }\r\n      .header-menu-icon {\r\n        display: none;\r\n        @include xs {\r\n          display: flex;\r\n          width: 100%;\r\n        }\r\n        .header-title {\r\n          display: flex;\r\n          justify-content: left;\r\n          margin-left: 3rem;\r\n          font-size: 3rem;\r\n        }\r\n        i {\r\n          @include xs {\r\n            display: flex;\r\n            justify-content: flex-end;\r\n            align-items: center;\r\n            margin: 1rem 2rem 1rem 1rem;\r\n            width: 100%;\r\n            font-size: 3rem;\r\n          }\r\n        }\r\n      }\r\n      .mobile-menu {\r\n        display: none;\r\n        position: absolute;\r\n        z-index: 1;\r\n        top: 72px;\r\n        right: 1rem;\r\n        padding: 1rem 1.5rem;\r\n        width: 200px;\r\n        border-radius: 3px;\r\n        box-shadow: var(--box-shadow);\r\n        background: var(--white);\r\n\r\n        .nav {\r\n          display: flex;\r\n          font-size: 1.5rem;\r\n          color: var(--gray);\r\n        }\r\n        .active {\r\n          text-decoration: underline;\r\n          font-weight: 700;\r\n        }\r\n      }\r\n      .mobile-menu.open {\r\n        display: block;\r\n      }\r\n    }\r\n  }\r\n\r\n  .banner {\r\n    max-width: 100%;\r\n    margin: 0 0.2rem;\r\n    .img-banner {\r\n      display: flex;\r\n      align-content: center;\r\n      max-width: 100%;\r\n      animation: imageBanner 3s 0s;\r\n    }\r\n  }\r\n}\r\n\r\nfooter {\r\n  min-width: 100%;\r\n\r\n  .foot-container {\r\n    display: flex;\r\n    flex-flow: row wrap;\r\n    border: 2px solid var(--gray);\r\n    margin: 0.2rem 0.2rem 0.5rem 0.2rem;\r\n    padding: 0.5rem;\r\n    background: var(--gray);\r\n    box-shadow: var(--box-shadow);\r\n    border: 1px solid var(--text-black);\r\n\r\n    .copyright {\r\n      display: flex;\r\n      align-items: center;\r\n      justify-content: flex-start;\r\n      flex: 1;\r\n      background: var(--gray);\r\n      p {\r\n        color: var(--text-black);\r\n        background: var(--gray);\r\n        font-weight: 700;\r\n        text-shadow: 1px 1px 2px white;\r\n        @include xs {\r\n        }\r\n      }\r\n    }\r\n\r\n    .contact {\r\n      display: flex;\r\n      align-items: center;\r\n      justify-content: center;\r\n      flex: 1;\r\n      background: var(--gray);\r\n\r\n      a {\r\n        margin-left: 1rem;\r\n        color: var(--text-black);\r\n        text-shadow: 1px 1px 2px white;\r\n        background: var(--gray);\r\n        @include xs {\r\n          margin: 0 1rem;\r\n        }\r\n        i {\r\n          color: var(--text-black);\r\n          font-size: 3rem;\r\n          margin: 0 1rem;\r\n          background: var(--gray);\r\n          text-shadow: 1px 1px 2px white;\r\n          @include xs {\r\n            font-size: 2rem;\r\n            margin: 0;\r\n          }\r\n        }\r\n      }\r\n    }\r\n\r\n    .link-to-top {\r\n      display: flex;\r\n      align-items: center;\r\n      justify-content: flex-end;\r\n      flex: 1;\r\n      font-size: 2.5rem;\r\n      background: var(--gray);\r\n      @include xs {\r\n        display: none;\r\n        margin: 0;\r\n        padding: 0;\r\n        justify-content: flex-end;\r\n      }\r\n      a {\r\n        color: var(--text-black);\r\n        background: var(--gray);\r\n        text-shadow: 1px 1px 2px white;\r\n        i {\r\n          font-size: 3rem;\r\n          margin: 0;\r\n          color: var(--text-black);\r\n          background: var(--gray);\r\n          text-shadow: 1px 1px 2px white;\r\n        }\r\n      }\r\n    }\r\n    .link-to-top-mobile {\r\n      display: none;\r\n      align-items: center;\r\n      justify-content: flex-end;\r\n      flex: 1;\r\n      font-size: 2.5rem;\r\n      background: var(--gray);\r\n      @include xs {\r\n        display: flex;\r\n        margin: 0;\r\n        padding: 0;\r\n        justify-content: flex-end;\r\n      }\r\n      a {\r\n        color: var(--text-black);\r\n        background: var(--gray);\r\n        text-shadow: 1px 1px 2px white;\r\n        i {\r\n          font-size: 3rem;\r\n          margin: 0;\r\n          color: var(--text-black);\r\n          background: var(--gray);\r\n          text-shadow: 1px 1px 2px white;\r\n        }\r\n      }\r\n    }\r\n  }\r\n}\r\n"],"sourceRoot":""}]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js!./node_modules/sass-loader/dist/cjs.js!./src/index.scss":
/*!*****************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./node_modules/sass-loader/dist/cjs.js!./src/index.scss ***!
  \*****************************************************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_cssWithMappingToString_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../node_modules/css-loader/dist/runtime/cssWithMappingToString.js */ "./node_modules/css-loader/dist/runtime/cssWithMappingToString.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_cssWithMappingToString_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_cssWithMappingToString_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
// Imports


var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_cssWithMappingToString_js__WEBPACK_IMPORTED_MODULE_0___default()));
// Module
___CSS_LOADER_EXPORT___.push([module.id, "/* Landscape phones and down */\n/* Landscape phone to portrait tablet */\n/* Portrait tablet to landscape and desktop */\n/* Large desktop */\nmain {\n  margin: 0 0.2rem;\n  padding: 2rem;\n  flex-direction: column;\n  border: 1px solid var(--gray);\n  box-shadow: var(--box-shadow);\n  line-height: 3rem; }\n  @media (max-width: 480px) {\n    main {\n      line-height: 1; } }\n  main li {\n    display: flex;\n    flex-direction: row nowrap;\n    align-items: center;\n    font-size: 3rem; }\n    @media (max-width: 480px) {\n      main li {\n        font-size: 1.5rem;\n        margin-bottom: 0.5rem; } }\n    main li .fa-minus {\n      display: flex; }\n      @media (max-width: 480px) {\n        main li .fa-minus {\n          padding-right: 0;\n          margin-right: 0; } }\n    main li p {\n      font-size: 2rem; }\n      @media (max-width: 480px) {\n        main li p {\n          border-left: 1px solid var(--gray);\n          padding-left: 0.5rem;\n          font-size: 1.5rem; } }\n      @media (max-width: 767px) {\n        main li p {\n          font-size: 1.5rem; } }\n      @media (min-width: 768px) and (max-width: 979px) {\n        main li p {\n          font-size: 1.7rem; } }\n\n.important {\n  color: var(--red); }\n  .important i {\n    font-size: 2.2rem;\n    color: var(--red); }\n    @media (max-width: 480px) {\n      .important i {\n        font-size: 1.6rem; } }\n    @media (max-width: 767px) {\n      .important i {\n        font-size: 1.6rem; } }\n  .important p {\n    font-size: 2.2rem; }\n    @media (max-width: 480px) {\n      .important p {\n        border-left: 1px solid var(--red);\n        font-size: 1.6rem; } }\n    @media (max-width: 767px) {\n      .important p {\n        font-size: 1.6rem; } }\n\n.add-remove-red {\n  cursor: pointer;\n  display: flex;\n  flex: 1;\n  min-height: max-content;\n  justify-content: flex-end;\n  align-items: start; }\n", "",{"version":3,"sources":["webpack://./src/assets/styles/_media_queries.scss","webpack://./src/index.scss"],"names":[],"mappings":"AAAA,8BAAA;AAOA,uCAAA;AAOA,6CAAA;AAOA,kBAAA;ACnBA;EACE,gBAAgB;EAChB,aAAa;EACb,sBAAsB;EACtB,6BAA6B;EAC7B,6BAA6B;EAC7B,iBAAiB,EAAA;EDNjB;ICAF;MAQI,cAAc,EAAA,EAiCjB;EAzCD;IAWI,aAAa;IACb,0BAA0B;IAC1B,mBAAmB;IACnB,eAAe,EAAA;IDdjB;MCAF;QAgBM,iBAAiB;QACjB,qBAAqB,EAAA,EAuBxB;IAxCH;MAoBM,aAAa,EAAA;MDpBjB;QCAF;UAsBQ,gBAAgB;UAChB,eAAe,EAAA,EAElB;IAzBL;MA2BM,eAAe,EAAA;MD3BnB;QCAF;UA6BQ,kCAAkC;UAClC,oBAAoB;UACpB,iBAAiB,EAAA,EAQpB;MDhCH;QCPF;UAkCQ,iBAAiB,EAAA,EAKpB;MDzBH;QCdF;UAqCQ,iBAAiB,EAAA,EAEpB;;AAIL;EACE,iBAAiB,EAAA;EADnB;IAII,iBAAiB;IACjB,iBAAiB,EAAA;IDhDnB;MC2CF;QAOM,iBAAiB,EAAA,EAKpB;IDhDD;MCoCF;QAUM,iBAAiB,EAAA,EAEpB;EAZH;IAcI,iBAAiB,EAAA;IDzDnB;MC2CF;QAgBM,iCAAiC;QACjC,iBAAiB,EAAA,EAKpB;ID1DD;MCoCF;QAoBM,iBAAiB,EAAA,EAEpB;;AAGH;EACE,eAAe;EACf,aAAa;EACb,OAAO;EACP,uBAAuB;EACvB,yBAAyB;EACzB,kBAAkB,EAAA","sourcesContent":["/* Landscape phones and down */\r\n@mixin xs {\r\n  @media (max-width: 480px) {\r\n    @content;\r\n  }\r\n}\r\n\r\n/* Landscape phone to portrait tablet */\r\n@mixin sm {\r\n  @media (max-width: 767px) {\r\n    @content;\r\n  }\r\n}\r\n\r\n/* Portrait tablet to landscape and desktop */\r\n@mixin md {\r\n  @media (min-width: 768px) and (max-width: 979px) {\r\n    @content;\r\n  }\r\n}\r\n\r\n/* Large desktop */\r\n@mixin xl {\r\n  @media (min-width: 1200px) {\r\n    @content;\r\n  }\r\n}\r\n","@import \"./assets/styles/media_queries\";\r\n\r\nmain {\r\n  margin: 0 0.2rem;\r\n  padding: 2rem;\r\n  flex-direction: column;\r\n  border: 1px solid var(--gray);\r\n  box-shadow: var(--box-shadow);\r\n  line-height: 3rem;\r\n  @include xs {\r\n    line-height: 1;\r\n  }\r\n  li {\r\n    display: flex;\r\n    flex-direction: row nowrap;\r\n    align-items: center;\r\n    font-size: 3rem;\r\n    @include xs {\r\n      font-size: 1.5rem;\r\n      margin-bottom: 0.5rem;\r\n    }\r\n    .fa-minus {\r\n      display: flex;\r\n      @include xs {\r\n        padding-right: 0;\r\n        margin-right: 0;\r\n      }\r\n    }\r\n    p {\r\n      font-size: 2rem;\r\n      @include xs {\r\n        border-left: 1px solid var(--gray);\r\n        padding-left: 0.5rem;\r\n        font-size: 1.5rem;\r\n      }\r\n      @include sm {\r\n        font-size: 1.5rem;\r\n      }\r\n      @include md {\r\n        font-size: 1.7rem;\r\n      }\r\n    }\r\n  }\r\n}\r\n\r\n.important {\r\n  color: var(--red);\r\n\r\n  i {\r\n    font-size: 2.2rem;\r\n    color: var(--red);\r\n    @include xs {\r\n      font-size: 1.6rem;\r\n    }\r\n    @include sm {\r\n      font-size: 1.6rem;\r\n    }\r\n  }\r\n  p {\r\n    font-size: 2.2rem;\r\n    @include xs {\r\n      border-left: 1px solid var(--red);\r\n      font-size: 1.6rem;\r\n    }\r\n    @include sm {\r\n      font-size: 1.6rem;\r\n    }\r\n  }\r\n}\r\n\r\n.add-remove-red {\r\n  cursor: pointer;\r\n  display: flex;\r\n  flex: 1;\r\n  min-height: max-content;\r\n  justify-content: flex-end;\r\n  align-items: start;\r\n}\r\n"],"sourceRoot":""}]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "./node_modules/css-loader/dist/runtime/api.js":
/*!*****************************************************!*\
  !*** ./node_modules/css-loader/dist/runtime/api.js ***!
  \*****************************************************/
/***/ ((module) => {

"use strict";


/*
  MIT License http://www.opensource.org/licenses/mit-license.php
  Author Tobias Koppers @sokra
*/
// css base code, injected by the css-loader
// eslint-disable-next-line func-names
module.exports = function (cssWithMappingToString) {
  var list = []; // return the list of modules as css string

  list.toString = function toString() {
    return this.map(function (item) {
      var content = cssWithMappingToString(item);

      if (item[2]) {
        return "@media ".concat(item[2], " {").concat(content, "}");
      }

      return content;
    }).join("");
  }; // import a list of modules into the list
  // eslint-disable-next-line func-names


  list.i = function (modules, mediaQuery, dedupe) {
    if (typeof modules === "string") {
      // eslint-disable-next-line no-param-reassign
      modules = [[null, modules, ""]];
    }

    var alreadyImportedModules = {};

    if (dedupe) {
      for (var i = 0; i < this.length; i++) {
        // eslint-disable-next-line prefer-destructuring
        var id = this[i][0];

        if (id != null) {
          alreadyImportedModules[id] = true;
        }
      }
    }

    for (var _i = 0; _i < modules.length; _i++) {
      var item = [].concat(modules[_i]);

      if (dedupe && alreadyImportedModules[item[0]]) {
        // eslint-disable-next-line no-continue
        continue;
      }

      if (mediaQuery) {
        if (!item[2]) {
          item[2] = mediaQuery;
        } else {
          item[2] = "".concat(mediaQuery, " and ").concat(item[2]);
        }
      }

      list.push(item);
    }
  };

  return list;
};

/***/ }),

/***/ "./node_modules/css-loader/dist/runtime/cssWithMappingToString.js":
/*!************************************************************************!*\
  !*** ./node_modules/css-loader/dist/runtime/cssWithMappingToString.js ***!
  \************************************************************************/
/***/ ((module) => {

"use strict";


function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

module.exports = function cssWithMappingToString(item) {
  var _item = _slicedToArray(item, 4),
      content = _item[1],
      cssMapping = _item[3];

  if (typeof btoa === "function") {
    // eslint-disable-next-line no-undef
    var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(cssMapping))));
    var data = "sourceMappingURL=data:application/json;charset=utf-8;base64,".concat(base64);
    var sourceMapping = "/*# ".concat(data, " */");
    var sourceURLs = cssMapping.sources.map(function (source) {
      return "/*# sourceURL=".concat(cssMapping.sourceRoot || "").concat(source, " */");
    });
    return [content].concat(sourceURLs).concat([sourceMapping]).join("\n");
  }

  return [content].join("\n");
};

/***/ }),

/***/ "./src/assets/styles/style.scss":
/*!**************************************!*\
  !*** ./src/assets/styles/style.scss ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !../../../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_node_modules_sass_loader_dist_cjs_js_style_scss__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !!../../../node_modules/css-loader/dist/cjs.js!../../../node_modules/sass-loader/dist/cjs.js!./style.scss */ "./node_modules/css-loader/dist/cjs.js!./node_modules/sass-loader/dist/cjs.js!./src/assets/styles/style.scss");

            

var options = {};

options.insert = "head";
options.singleton = false;

var update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_node_modules_sass_loader_dist_cjs_js_style_scss__WEBPACK_IMPORTED_MODULE_1__.default, options);



/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_css_loader_dist_cjs_js_node_modules_sass_loader_dist_cjs_js_style_scss__WEBPACK_IMPORTED_MODULE_1__.default.locals || {});

/***/ }),

/***/ "./src/index.scss":
/*!************************!*\
  !*** ./src/index.scss ***!
  \************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_node_modules_sass_loader_dist_cjs_js_index_scss__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !!../node_modules/css-loader/dist/cjs.js!../node_modules/sass-loader/dist/cjs.js!./index.scss */ "./node_modules/css-loader/dist/cjs.js!./node_modules/sass-loader/dist/cjs.js!./src/index.scss");

            

var options = {};

options.insert = "head";
options.singleton = false;

var update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_node_modules_sass_loader_dist_cjs_js_index_scss__WEBPACK_IMPORTED_MODULE_1__.default, options);



/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_css_loader_dist_cjs_js_node_modules_sass_loader_dist_cjs_js_index_scss__WEBPACK_IMPORTED_MODULE_1__.default.locals || {});

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js":
/*!****************************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js ***!
  \****************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var isOldIE = function isOldIE() {
  var memo;
  return function memorize() {
    if (typeof memo === 'undefined') {
      // Test for IE <= 9 as proposed by Browserhacks
      // @see http://browserhacks.com/#hack-e71d8692f65334173fee715c222cb805
      // Tests for existence of standard globals is to allow style-loader
      // to operate correctly into non-standard environments
      // @see https://github.com/webpack-contrib/style-loader/issues/177
      memo = Boolean(window && document && document.all && !window.atob);
    }

    return memo;
  };
}();

var getTarget = function getTarget() {
  var memo = {};
  return function memorize(target) {
    if (typeof memo[target] === 'undefined') {
      var styleTarget = document.querySelector(target); // Special case to return head of iframe instead of iframe itself

      if (window.HTMLIFrameElement && styleTarget instanceof window.HTMLIFrameElement) {
        try {
          // This will throw an exception if access to iframe is blocked
          // due to cross-origin restrictions
          styleTarget = styleTarget.contentDocument.head;
        } catch (e) {
          // istanbul ignore next
          styleTarget = null;
        }
      }

      memo[target] = styleTarget;
    }

    return memo[target];
  };
}();

var stylesInDom = [];

function getIndexByIdentifier(identifier) {
  var result = -1;

  for (var i = 0; i < stylesInDom.length; i++) {
    if (stylesInDom[i].identifier === identifier) {
      result = i;
      break;
    }
  }

  return result;
}

function modulesToDom(list, options) {
  var idCountMap = {};
  var identifiers = [];

  for (var i = 0; i < list.length; i++) {
    var item = list[i];
    var id = options.base ? item[0] + options.base : item[0];
    var count = idCountMap[id] || 0;
    var identifier = "".concat(id, " ").concat(count);
    idCountMap[id] = count + 1;
    var index = getIndexByIdentifier(identifier);
    var obj = {
      css: item[1],
      media: item[2],
      sourceMap: item[3]
    };

    if (index !== -1) {
      stylesInDom[index].references++;
      stylesInDom[index].updater(obj);
    } else {
      stylesInDom.push({
        identifier: identifier,
        updater: addStyle(obj, options),
        references: 1
      });
    }

    identifiers.push(identifier);
  }

  return identifiers;
}

function insertStyleElement(options) {
  var style = document.createElement('style');
  var attributes = options.attributes || {};

  if (typeof attributes.nonce === 'undefined') {
    var nonce =  true ? __webpack_require__.nc : 0;

    if (nonce) {
      attributes.nonce = nonce;
    }
  }

  Object.keys(attributes).forEach(function (key) {
    style.setAttribute(key, attributes[key]);
  });

  if (typeof options.insert === 'function') {
    options.insert(style);
  } else {
    var target = getTarget(options.insert || 'head');

    if (!target) {
      throw new Error("Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.");
    }

    target.appendChild(style);
  }

  return style;
}

function removeStyleElement(style) {
  // istanbul ignore if
  if (style.parentNode === null) {
    return false;
  }

  style.parentNode.removeChild(style);
}
/* istanbul ignore next  */


var replaceText = function replaceText() {
  var textStore = [];
  return function replace(index, replacement) {
    textStore[index] = replacement;
    return textStore.filter(Boolean).join('\n');
  };
}();

function applyToSingletonTag(style, index, remove, obj) {
  var css = remove ? '' : obj.media ? "@media ".concat(obj.media, " {").concat(obj.css, "}") : obj.css; // For old IE

  /* istanbul ignore if  */

  if (style.styleSheet) {
    style.styleSheet.cssText = replaceText(index, css);
  } else {
    var cssNode = document.createTextNode(css);
    var childNodes = style.childNodes;

    if (childNodes[index]) {
      style.removeChild(childNodes[index]);
    }

    if (childNodes.length) {
      style.insertBefore(cssNode, childNodes[index]);
    } else {
      style.appendChild(cssNode);
    }
  }
}

function applyToTag(style, options, obj) {
  var css = obj.css;
  var media = obj.media;
  var sourceMap = obj.sourceMap;

  if (media) {
    style.setAttribute('media', media);
  } else {
    style.removeAttribute('media');
  }

  if (sourceMap && typeof btoa !== 'undefined') {
    css += "\n/*# sourceMappingURL=data:application/json;base64,".concat(btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))), " */");
  } // For old IE

  /* istanbul ignore if  */


  if (style.styleSheet) {
    style.styleSheet.cssText = css;
  } else {
    while (style.firstChild) {
      style.removeChild(style.firstChild);
    }

    style.appendChild(document.createTextNode(css));
  }
}

var singleton = null;
var singletonCounter = 0;

function addStyle(obj, options) {
  var style;
  var update;
  var remove;

  if (options.singleton) {
    var styleIndex = singletonCounter++;
    style = singleton || (singleton = insertStyleElement(options));
    update = applyToSingletonTag.bind(null, style, styleIndex, false);
    remove = applyToSingletonTag.bind(null, style, styleIndex, true);
  } else {
    style = insertStyleElement(options);
    update = applyToTag.bind(null, style, options);

    remove = function remove() {
      removeStyleElement(style);
    };
  }

  update(obj);
  return function updateStyle(newObj) {
    if (newObj) {
      if (newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap) {
        return;
      }

      update(obj = newObj);
    } else {
      remove();
    }
  };
}

module.exports = function (list, options) {
  options = options || {}; // Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
  // tags it will allow on a page

  if (!options.singleton && typeof options.singleton !== 'boolean') {
    options.singleton = isOldIE();
  }

  list = list || [];
  var lastIdentifiers = modulesToDom(list, options);
  return function update(newList) {
    newList = newList || [];

    if (Object.prototype.toString.call(newList) !== '[object Array]') {
      return;
    }

    for (var i = 0; i < lastIdentifiers.length; i++) {
      var identifier = lastIdentifiers[i];
      var index = getIndexByIdentifier(identifier);
      stylesInDom[index].references--;
    }

    var newLastIdentifiers = modulesToDom(newList, options);

    for (var _i = 0; _i < lastIdentifiers.length; _i++) {
      var _identifier = lastIdentifiers[_i];

      var _index = getIndexByIdentifier(_identifier);

      if (stylesInDom[_index].references === 0) {
        stylesInDom[_index].updater();

        stylesInDom.splice(_index, 1);
      }
    }

    lastIdentifiers = newLastIdentifiers;
  };
};

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			id: moduleId,
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/global */
/******/ 	(() => {
/******/ 		__webpack_require__.g = (function() {
/******/ 			if (typeof globalThis === 'object') return globalThis;
/******/ 			try {
/******/ 				return this || new Function('return this')();
/******/ 			} catch (e) {
/******/ 				if (typeof window === 'object') return window;
/******/ 			}
/******/ 		})();
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be in strict mode.
(() => {
"use strict";
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var core_js_modules_web_dom_collections_for_each_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! core-js/modules/web.dom-collections.for-each.js */ "./node_modules/core-js/modules/web.dom-collections.for-each.js");
/* harmony import */ var core_js_modules_web_dom_collections_for_each_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_web_dom_collections_for_each_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _assets_styles_style_scss__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./assets/styles/style.scss */ "./src/assets/styles/style.scss");
/* harmony import */ var _index_scss__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./index.scss */ "./src/index.scss");



var list = document.querySelectorAll('li');
var iconClick;
var NumberClassList;
var onClickNumberClassList; // Add EventListener on all icon exclamation circle by list element

list.forEach(function (li) {
  console.log(li.childNodes[5]);
  iconClick = li.childNodes[5];
  NumberClassList = li.classList.length;
  iconClick.addEventListener("click", function (event) {
    event.stopPropagation();
    onClickNumberClassList = li.classList.length; // Compare number of class on li element before and after click on icon

    if (onClickNumberClassList == NumberClassList) {
      addClass(li);
    } else {
      removeClass(li);
    }
  });
}); // function add & remove class .important

var addClass = function addClass(li) {
  li.classList.add('important');
};

var removeClass = function removeClass(li) {
  li.classList.remove('important');
};
})();

/******/ })()
;
//# sourceMappingURL=main.bundle.js.map