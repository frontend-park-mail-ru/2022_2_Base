(self["webpackChunkreazon"] = self["webpackChunkreazon"] || []).push([[179],{

/***/ 827:
/***/ ((__unused_webpack_module, __unused_webpack___webpack_exports__, __webpack_require__) => {

"use strict";

;// CONCATENATED MODULE: ./public/src/modules/ajax.js
function _typeof(obj) {
  "@babel/helpers - typeof";

  return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) {
    return typeof obj;
  } : function (obj) {
    return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
  }, _typeof(obj);
}
function _regeneratorRuntime() {
  "use strict";

  /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */
  _regeneratorRuntime = function _regeneratorRuntime() {
    return exports;
  };
  var exports = {},
    Op = Object.prototype,
    hasOwn = Op.hasOwnProperty,
    defineProperty = Object.defineProperty || function (obj, key, desc) {
      obj[key] = desc.value;
    },
    $Symbol = "function" == typeof Symbol ? Symbol : {},
    iteratorSymbol = $Symbol.iterator || "@@iterator",
    asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator",
    toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag";
  function define(obj, key, value) {
    return Object.defineProperty(obj, key, {
      value: value,
      enumerable: !0,
      configurable: !0,
      writable: !0
    }), obj[key];
  }
  try {
    define({}, "");
  } catch (err) {
    define = function define(obj, key, value) {
      return obj[key] = value;
    };
  }
  function wrap(innerFn, outerFn, self, tryLocsList) {
    var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator,
      generator = Object.create(protoGenerator.prototype),
      context = new Context(tryLocsList || []);
    return defineProperty(generator, "_invoke", {
      value: makeInvokeMethod(innerFn, self, context)
    }), generator;
  }
  function tryCatch(fn, obj, arg) {
    try {
      return {
        type: "normal",
        arg: fn.call(obj, arg)
      };
    } catch (err) {
      return {
        type: "throw",
        arg: err
      };
    }
  }
  exports.wrap = wrap;
  var ContinueSentinel = {};
  function Generator() {}
  function GeneratorFunction() {}
  function GeneratorFunctionPrototype() {}
  var IteratorPrototype = {};
  define(IteratorPrototype, iteratorSymbol, function () {
    return this;
  });
  var getProto = Object.getPrototypeOf,
    NativeIteratorPrototype = getProto && getProto(getProto(values([])));
  NativeIteratorPrototype && NativeIteratorPrototype !== Op && hasOwn.call(NativeIteratorPrototype, iteratorSymbol) && (IteratorPrototype = NativeIteratorPrototype);
  var Gp = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(IteratorPrototype);
  function defineIteratorMethods(prototype) {
    ["next", "throw", "return"].forEach(function (method) {
      define(prototype, method, function (arg) {
        return this._invoke(method, arg);
      });
    });
  }
  function AsyncIterator(generator, PromiseImpl) {
    function invoke(method, arg, resolve, reject) {
      var record = tryCatch(generator[method], generator, arg);
      if ("throw" !== record.type) {
        var result = record.arg,
          value = result.value;
        return value && "object" == _typeof(value) && hasOwn.call(value, "__await") ? PromiseImpl.resolve(value.__await).then(function (value) {
          invoke("next", value, resolve, reject);
        }, function (err) {
          invoke("throw", err, resolve, reject);
        }) : PromiseImpl.resolve(value).then(function (unwrapped) {
          result.value = unwrapped, resolve(result);
        }, function (error) {
          return invoke("throw", error, resolve, reject);
        });
      }
      reject(record.arg);
    }
    var previousPromise;
    defineProperty(this, "_invoke", {
      value: function value(method, arg) {
        function callInvokeWithMethodAndArg() {
          return new PromiseImpl(function (resolve, reject) {
            invoke(method, arg, resolve, reject);
          });
        }
        return previousPromise = previousPromise ? previousPromise.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg();
      }
    });
  }
  function makeInvokeMethod(innerFn, self, context) {
    var state = "suspendedStart";
    return function (method, arg) {
      if ("executing" === state) throw new Error("Generator is already running");
      if ("completed" === state) {
        if ("throw" === method) throw arg;
        return doneResult();
      }
      for (context.method = method, context.arg = arg;;) {
        var delegate = context.delegate;
        if (delegate) {
          var delegateResult = maybeInvokeDelegate(delegate, context);
          if (delegateResult) {
            if (delegateResult === ContinueSentinel) continue;
            return delegateResult;
          }
        }
        if ("next" === context.method) context.sent = context._sent = context.arg;else if ("throw" === context.method) {
          if ("suspendedStart" === state) throw state = "completed", context.arg;
          context.dispatchException(context.arg);
        } else "return" === context.method && context.abrupt("return", context.arg);
        state = "executing";
        var record = tryCatch(innerFn, self, context);
        if ("normal" === record.type) {
          if (state = context.done ? "completed" : "suspendedYield", record.arg === ContinueSentinel) continue;
          return {
            value: record.arg,
            done: context.done
          };
        }
        "throw" === record.type && (state = "completed", context.method = "throw", context.arg = record.arg);
      }
    };
  }
  function maybeInvokeDelegate(delegate, context) {
    var method = delegate.iterator[context.method];
    if (undefined === method) {
      if (context.delegate = null, "throw" === context.method) {
        if (delegate.iterator["return"] && (context.method = "return", context.arg = undefined, maybeInvokeDelegate(delegate, context), "throw" === context.method)) return ContinueSentinel;
        context.method = "throw", context.arg = new TypeError("The iterator does not provide a 'throw' method");
      }
      return ContinueSentinel;
    }
    var record = tryCatch(method, delegate.iterator, context.arg);
    if ("throw" === record.type) return context.method = "throw", context.arg = record.arg, context.delegate = null, ContinueSentinel;
    var info = record.arg;
    return info ? info.done ? (context[delegate.resultName] = info.value, context.next = delegate.nextLoc, "return" !== context.method && (context.method = "next", context.arg = undefined), context.delegate = null, ContinueSentinel) : info : (context.method = "throw", context.arg = new TypeError("iterator result is not an object"), context.delegate = null, ContinueSentinel);
  }
  function pushTryEntry(locs) {
    var entry = {
      tryLoc: locs[0]
    };
    1 in locs && (entry.catchLoc = locs[1]), 2 in locs && (entry.finallyLoc = locs[2], entry.afterLoc = locs[3]), this.tryEntries.push(entry);
  }
  function resetTryEntry(entry) {
    var record = entry.completion || {};
    record.type = "normal", delete record.arg, entry.completion = record;
  }
  function Context(tryLocsList) {
    this.tryEntries = [{
      tryLoc: "root"
    }], tryLocsList.forEach(pushTryEntry, this), this.reset(!0);
  }
  function values(iterable) {
    if (iterable) {
      var iteratorMethod = iterable[iteratorSymbol];
      if (iteratorMethod) return iteratorMethod.call(iterable);
      if ("function" == typeof iterable.next) return iterable;
      if (!isNaN(iterable.length)) {
        var i = -1,
          next = function next() {
            for (; ++i < iterable.length;) {
              if (hasOwn.call(iterable, i)) return next.value = iterable[i], next.done = !1, next;
            }
            return next.value = undefined, next.done = !0, next;
          };
        return next.next = next;
      }
    }
    return {
      next: doneResult
    };
  }
  function doneResult() {
    return {
      value: undefined,
      done: !0
    };
  }
  return GeneratorFunction.prototype = GeneratorFunctionPrototype, defineProperty(Gp, "constructor", {
    value: GeneratorFunctionPrototype,
    configurable: !0
  }), defineProperty(GeneratorFunctionPrototype, "constructor", {
    value: GeneratorFunction,
    configurable: !0
  }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, toStringTagSymbol, "GeneratorFunction"), exports.isGeneratorFunction = function (genFun) {
    var ctor = "function" == typeof genFun && genFun.constructor;
    return !!ctor && (ctor === GeneratorFunction || "GeneratorFunction" === (ctor.displayName || ctor.name));
  }, exports.mark = function (genFun) {
    return Object.setPrototypeOf ? Object.setPrototypeOf(genFun, GeneratorFunctionPrototype) : (genFun.__proto__ = GeneratorFunctionPrototype, define(genFun, toStringTagSymbol, "GeneratorFunction")), genFun.prototype = Object.create(Gp), genFun;
  }, exports.awrap = function (arg) {
    return {
      __await: arg
    };
  }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, asyncIteratorSymbol, function () {
    return this;
  }), exports.AsyncIterator = AsyncIterator, exports.async = function (innerFn, outerFn, self, tryLocsList, PromiseImpl) {
    void 0 === PromiseImpl && (PromiseImpl = Promise);
    var iter = new AsyncIterator(wrap(innerFn, outerFn, self, tryLocsList), PromiseImpl);
    return exports.isGeneratorFunction(outerFn) ? iter : iter.next().then(function (result) {
      return result.done ? result.value : iter.next();
    });
  }, defineIteratorMethods(Gp), define(Gp, toStringTagSymbol, "Generator"), define(Gp, iteratorSymbol, function () {
    return this;
  }), define(Gp, "toString", function () {
    return "[object Generator]";
  }), exports.keys = function (val) {
    var object = Object(val),
      keys = [];
    for (var key in object) {
      keys.push(key);
    }
    return keys.reverse(), function next() {
      for (; keys.length;) {
        var key = keys.pop();
        if (key in object) return next.value = key, next.done = !1, next;
      }
      return next.done = !0, next;
    };
  }, exports.values = values, Context.prototype = {
    constructor: Context,
    reset: function reset(skipTempReset) {
      if (this.prev = 0, this.next = 0, this.sent = this._sent = undefined, this.done = !1, this.delegate = null, this.method = "next", this.arg = undefined, this.tryEntries.forEach(resetTryEntry), !skipTempReset) for (var name in this) {
        "t" === name.charAt(0) && hasOwn.call(this, name) && !isNaN(+name.slice(1)) && (this[name] = undefined);
      }
    },
    stop: function stop() {
      this.done = !0;
      var rootRecord = this.tryEntries[0].completion;
      if ("throw" === rootRecord.type) throw rootRecord.arg;
      return this.rval;
    },
    dispatchException: function dispatchException(exception) {
      if (this.done) throw exception;
      var context = this;
      function handle(loc, caught) {
        return record.type = "throw", record.arg = exception, context.next = loc, caught && (context.method = "next", context.arg = undefined), !!caught;
      }
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i],
          record = entry.completion;
        if ("root" === entry.tryLoc) return handle("end");
        if (entry.tryLoc <= this.prev) {
          var hasCatch = hasOwn.call(entry, "catchLoc"),
            hasFinally = hasOwn.call(entry, "finallyLoc");
          if (hasCatch && hasFinally) {
            if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0);
            if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc);
          } else if (hasCatch) {
            if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0);
          } else {
            if (!hasFinally) throw new Error("try statement without catch or finally");
            if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc);
          }
        }
      }
    },
    abrupt: function abrupt(type, arg) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.tryLoc <= this.prev && hasOwn.call(entry, "finallyLoc") && this.prev < entry.finallyLoc) {
          var finallyEntry = entry;
          break;
        }
      }
      finallyEntry && ("break" === type || "continue" === type) && finallyEntry.tryLoc <= arg && arg <= finallyEntry.finallyLoc && (finallyEntry = null);
      var record = finallyEntry ? finallyEntry.completion : {};
      return record.type = type, record.arg = arg, finallyEntry ? (this.method = "next", this.next = finallyEntry.finallyLoc, ContinueSentinel) : this.complete(record);
    },
    complete: function complete(record, afterLoc) {
      if ("throw" === record.type) throw record.arg;
      return "break" === record.type || "continue" === record.type ? this.next = record.arg : "return" === record.type ? (this.rval = this.arg = record.arg, this.method = "return", this.next = "end") : "normal" === record.type && afterLoc && (this.next = afterLoc), ContinueSentinel;
    },
    finish: function finish(finallyLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.finallyLoc === finallyLoc) return this.complete(entry.completion, entry.afterLoc), resetTryEntry(entry), ContinueSentinel;
      }
    },
    "catch": function _catch(tryLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.tryLoc === tryLoc) {
          var record = entry.completion;
          if ("throw" === record.type) {
            var thrown = record.arg;
            resetTryEntry(entry);
          }
          return thrown;
        }
      }
      throw new Error("illegal catch attempt");
    },
    delegateYield: function delegateYield(iterable, resultName, nextLoc) {
      return this.delegate = {
        iterator: values(iterable),
        resultName: resultName,
        nextLoc: nextLoc
      }, "next" === this.method && (this.arg = undefined), ContinueSentinel;
    }
  }, exports;
}
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {
  try {
    var info = gen[key](arg);
    var value = info.value;
  } catch (error) {
    reject(error);
    return;
  }
  if (info.done) {
    resolve(value);
  } else {
    Promise.resolve(value).then(_next, _throw);
  }
}
function _asyncToGenerator(fn) {
  return function () {
    var self = this,
      args = arguments;
    return new Promise(function (resolve, reject) {
      var gen = fn.apply(self, args);
      function _next(value) {
        asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);
      }
      function _throw(err) {
        asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);
      }
      _next(undefined);
    });
  };
}
function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}
function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  Object.defineProperty(Constructor, "prototype", {
    writable: false
  });
  return Constructor;
}
function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}
function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }
  return obj;
}
function _classPrivateFieldInitSpec(obj, privateMap, value) {
  _checkPrivateRedeclaration(obj, privateMap);
  privateMap.set(obj, value);
}
function _checkPrivateRedeclaration(obj, privateCollection) {
  if (privateCollection.has(obj)) {
    throw new TypeError("Cannot initialize the same private elements twice on an object");
  }
}
function _classPrivateFieldGet(receiver, privateMap) {
  var descriptor = _classExtractFieldDescriptor(receiver, privateMap, "get");
  return _classApplyDescriptorGet(receiver, descriptor);
}
function _classExtractFieldDescriptor(receiver, privateMap, action) {
  if (!privateMap.has(receiver)) {
    throw new TypeError("attempted to " + action + " private field on non-instance");
  }
  return privateMap.get(receiver);
}
function _classApplyDescriptorGet(receiver, descriptor) {
  if (descriptor.get) {
    return descriptor.get.call(receiver);
  }
  return descriptor.value;
}
var _baseURL = /*#__PURE__*/new WeakMap();
var _headers = /*#__PURE__*/new WeakMap();
/**
 * Класс, реализующий работу с запросами.
 */
var Request = /*#__PURE__*/_createClass(function Request() {
  var _this = this;
  _classCallCheck(this, Request);
  _classPrivateFieldInitSpec(this, _baseURL, {
    writable: true,
    value: 'https://www.reazon.ru'
  });
  _classPrivateFieldInitSpec(this, _headers, {
    writable: true,
    value: {
      'Content-Type': 'application/json',
      'accept': 'application/json',
      'Origin': 'https://www.reazon.ru'
    }
  });
  _defineProperty(this, "makeRequest", function (url, options) {
    return fetch(url, options).then(function (response) {
      return response.ok ? response.json().then(function (data) {
        return [response.status, data];
      }) : [response.status, response.body];
    })["catch"](function (error) {
      return [500, error];
    });
  });
  _defineProperty(this, "makeGetRequest", /*#__PURE__*/function () {
    var _ref = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee(url) {
      var options;
      return _regeneratorRuntime().wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              options = {
                method: 'get',
                mode: 'cors',
                credentials: 'include',
                headers: _classPrivateFieldGet(_this, _headers)
              };
              return _context.abrupt("return", _this.makeRequest("".concat(_classPrivateFieldGet(_this, _baseURL), "/").concat(url), options));
            case 2:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    }));
    return function (_x) {
      return _ref.apply(this, arguments);
    };
  }());
  _defineProperty(this, "makePostRequest", /*#__PURE__*/function () {
    var _ref2 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee2(url, data) {
      var options;
      return _regeneratorRuntime().wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              options = {
                method: 'post',
                mode: 'cors',
                credentials: 'include',
                headers: _classPrivateFieldGet(_this, _headers),
                body: JSON.stringify(data)
              };
              return _context2.abrupt("return", _this.makeRequest("".concat(_classPrivateFieldGet(_this, _baseURL), "/").concat(url), options));
            case 2:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2);
    }));
    return function (_x2, _x3) {
      return _ref2.apply(this, arguments);
    };
  }());
  _defineProperty(this, "makeDeleteRequest", /*#__PURE__*/function () {
    var _ref3 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee3(url) {
      var options;
      return _regeneratorRuntime().wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              options = {
                method: 'delete',
                mode: 'cors',
                credentials: 'include',
                headers: _classPrivateFieldGet(_this, _headers)
              };
              return _context3.abrupt("return", _this.makeRequest("".concat(_classPrivateFieldGet(_this, _baseURL), "/").concat(url), options));
            case 2:
            case "end":
              return _context3.stop();
          }
        }
      }, _callee3);
    }));
    return function (_x4) {
      return _ref3.apply(this, arguments);
    };
  }());
});
/* harmony default export */ const ajax = (new Request());
// EXTERNAL MODULE: ./public/src/components/Header/header.hbs
var header = __webpack_require__(677);
var header_default = /*#__PURE__*/__webpack_require__.n(header);
;// CONCATENATED MODULE: ./public/src/components/BaseComponent.js
function BaseComponent_classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}
function BaseComponent_defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}
function BaseComponent_createClass(Constructor, protoProps, staticProps) {
  if (protoProps) BaseComponent_defineProperties(Constructor.prototype, protoProps);
  if (staticProps) BaseComponent_defineProperties(Constructor, staticProps);
  Object.defineProperty(Constructor, "prototype", {
    writable: false
  });
  return Constructor;
}
function BaseComponent_defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }
  return obj;
}
/**
 * Базовый класс для реализации компонентов.
 */
var BaseComponent = /*#__PURE__*/function () {
  /**
   * Конструктор, создающий базовый класс реализации компонента.
   * @param {Element} parent HTML-элемент, в который будет
   * осуществлена отрисовка
   */
  function BaseComponent(parent) {
    BaseComponent_classCallCheck(this, BaseComponent);
    BaseComponent_defineProperty(this, "_parent", void 0);
    this._parent = parent;
  }

  /**
   * Метод, удаляющий слушатели.
   */
  BaseComponent_createClass(BaseComponent, [{
    key: "removeEventListener",
    value: function removeEventListener() {}

    /**
     * Метод, отрисовывающий компонент.
     * @param {any} context контекст данных для компонента
     * @param {HandlebarsTemplateDelegate} templateName скомпилированный шаблон шаблона
     */
  }, {
    key: "render",
    value: function render(context, templateName) {
      this._parent.insertAdjacentHTML('afterbegin', templateName(context));
    }

    /**
     * Метод, подготавливающий к отрисовки компонента.
     * @param {any} context контекст данных для компонента
     */
  }, {
    key: "prepareCategory",
    value: function prepareCategory(context) {}
  }]);
  return BaseComponent;
}();

;// CONCATENATED MODULE: ./public/src/components/Header/Header.js
function Header_typeof(obj) {
  "@babel/helpers - typeof";

  return Header_typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) {
    return typeof obj;
  } : function (obj) {
    return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
  }, Header_typeof(obj);
}
function Header_regeneratorRuntime() {
  "use strict";

  /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */
  Header_regeneratorRuntime = function _regeneratorRuntime() {
    return exports;
  };
  var exports = {},
    Op = Object.prototype,
    hasOwn = Op.hasOwnProperty,
    defineProperty = Object.defineProperty || function (obj, key, desc) {
      obj[key] = desc.value;
    },
    $Symbol = "function" == typeof Symbol ? Symbol : {},
    iteratorSymbol = $Symbol.iterator || "@@iterator",
    asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator",
    toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag";
  function define(obj, key, value) {
    return Object.defineProperty(obj, key, {
      value: value,
      enumerable: !0,
      configurable: !0,
      writable: !0
    }), obj[key];
  }
  try {
    define({}, "");
  } catch (err) {
    define = function define(obj, key, value) {
      return obj[key] = value;
    };
  }
  function wrap(innerFn, outerFn, self, tryLocsList) {
    var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator,
      generator = Object.create(protoGenerator.prototype),
      context = new Context(tryLocsList || []);
    return defineProperty(generator, "_invoke", {
      value: makeInvokeMethod(innerFn, self, context)
    }), generator;
  }
  function tryCatch(fn, obj, arg) {
    try {
      return {
        type: "normal",
        arg: fn.call(obj, arg)
      };
    } catch (err) {
      return {
        type: "throw",
        arg: err
      };
    }
  }
  exports.wrap = wrap;
  var ContinueSentinel = {};
  function Generator() {}
  function GeneratorFunction() {}
  function GeneratorFunctionPrototype() {}
  var IteratorPrototype = {};
  define(IteratorPrototype, iteratorSymbol, function () {
    return this;
  });
  var getProto = Object.getPrototypeOf,
    NativeIteratorPrototype = getProto && getProto(getProto(values([])));
  NativeIteratorPrototype && NativeIteratorPrototype !== Op && hasOwn.call(NativeIteratorPrototype, iteratorSymbol) && (IteratorPrototype = NativeIteratorPrototype);
  var Gp = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(IteratorPrototype);
  function defineIteratorMethods(prototype) {
    ["next", "throw", "return"].forEach(function (method) {
      define(prototype, method, function (arg) {
        return this._invoke(method, arg);
      });
    });
  }
  function AsyncIterator(generator, PromiseImpl) {
    function invoke(method, arg, resolve, reject) {
      var record = tryCatch(generator[method], generator, arg);
      if ("throw" !== record.type) {
        var result = record.arg,
          value = result.value;
        return value && "object" == Header_typeof(value) && hasOwn.call(value, "__await") ? PromiseImpl.resolve(value.__await).then(function (value) {
          invoke("next", value, resolve, reject);
        }, function (err) {
          invoke("throw", err, resolve, reject);
        }) : PromiseImpl.resolve(value).then(function (unwrapped) {
          result.value = unwrapped, resolve(result);
        }, function (error) {
          return invoke("throw", error, resolve, reject);
        });
      }
      reject(record.arg);
    }
    var previousPromise;
    defineProperty(this, "_invoke", {
      value: function value(method, arg) {
        function callInvokeWithMethodAndArg() {
          return new PromiseImpl(function (resolve, reject) {
            invoke(method, arg, resolve, reject);
          });
        }
        return previousPromise = previousPromise ? previousPromise.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg();
      }
    });
  }
  function makeInvokeMethod(innerFn, self, context) {
    var state = "suspendedStart";
    return function (method, arg) {
      if ("executing" === state) throw new Error("Generator is already running");
      if ("completed" === state) {
        if ("throw" === method) throw arg;
        return doneResult();
      }
      for (context.method = method, context.arg = arg;;) {
        var delegate = context.delegate;
        if (delegate) {
          var delegateResult = maybeInvokeDelegate(delegate, context);
          if (delegateResult) {
            if (delegateResult === ContinueSentinel) continue;
            return delegateResult;
          }
        }
        if ("next" === context.method) context.sent = context._sent = context.arg;else if ("throw" === context.method) {
          if ("suspendedStart" === state) throw state = "completed", context.arg;
          context.dispatchException(context.arg);
        } else "return" === context.method && context.abrupt("return", context.arg);
        state = "executing";
        var record = tryCatch(innerFn, self, context);
        if ("normal" === record.type) {
          if (state = context.done ? "completed" : "suspendedYield", record.arg === ContinueSentinel) continue;
          return {
            value: record.arg,
            done: context.done
          };
        }
        "throw" === record.type && (state = "completed", context.method = "throw", context.arg = record.arg);
      }
    };
  }
  function maybeInvokeDelegate(delegate, context) {
    var method = delegate.iterator[context.method];
    if (undefined === method) {
      if (context.delegate = null, "throw" === context.method) {
        if (delegate.iterator["return"] && (context.method = "return", context.arg = undefined, maybeInvokeDelegate(delegate, context), "throw" === context.method)) return ContinueSentinel;
        context.method = "throw", context.arg = new TypeError("The iterator does not provide a 'throw' method");
      }
      return ContinueSentinel;
    }
    var record = tryCatch(method, delegate.iterator, context.arg);
    if ("throw" === record.type) return context.method = "throw", context.arg = record.arg, context.delegate = null, ContinueSentinel;
    var info = record.arg;
    return info ? info.done ? (context[delegate.resultName] = info.value, context.next = delegate.nextLoc, "return" !== context.method && (context.method = "next", context.arg = undefined), context.delegate = null, ContinueSentinel) : info : (context.method = "throw", context.arg = new TypeError("iterator result is not an object"), context.delegate = null, ContinueSentinel);
  }
  function pushTryEntry(locs) {
    var entry = {
      tryLoc: locs[0]
    };
    1 in locs && (entry.catchLoc = locs[1]), 2 in locs && (entry.finallyLoc = locs[2], entry.afterLoc = locs[3]), this.tryEntries.push(entry);
  }
  function resetTryEntry(entry) {
    var record = entry.completion || {};
    record.type = "normal", delete record.arg, entry.completion = record;
  }
  function Context(tryLocsList) {
    this.tryEntries = [{
      tryLoc: "root"
    }], tryLocsList.forEach(pushTryEntry, this), this.reset(!0);
  }
  function values(iterable) {
    if (iterable) {
      var iteratorMethod = iterable[iteratorSymbol];
      if (iteratorMethod) return iteratorMethod.call(iterable);
      if ("function" == typeof iterable.next) return iterable;
      if (!isNaN(iterable.length)) {
        var i = -1,
          next = function next() {
            for (; ++i < iterable.length;) {
              if (hasOwn.call(iterable, i)) return next.value = iterable[i], next.done = !1, next;
            }
            return next.value = undefined, next.done = !0, next;
          };
        return next.next = next;
      }
    }
    return {
      next: doneResult
    };
  }
  function doneResult() {
    return {
      value: undefined,
      done: !0
    };
  }
  return GeneratorFunction.prototype = GeneratorFunctionPrototype, defineProperty(Gp, "constructor", {
    value: GeneratorFunctionPrototype,
    configurable: !0
  }), defineProperty(GeneratorFunctionPrototype, "constructor", {
    value: GeneratorFunction,
    configurable: !0
  }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, toStringTagSymbol, "GeneratorFunction"), exports.isGeneratorFunction = function (genFun) {
    var ctor = "function" == typeof genFun && genFun.constructor;
    return !!ctor && (ctor === GeneratorFunction || "GeneratorFunction" === (ctor.displayName || ctor.name));
  }, exports.mark = function (genFun) {
    return Object.setPrototypeOf ? Object.setPrototypeOf(genFun, GeneratorFunctionPrototype) : (genFun.__proto__ = GeneratorFunctionPrototype, define(genFun, toStringTagSymbol, "GeneratorFunction")), genFun.prototype = Object.create(Gp), genFun;
  }, exports.awrap = function (arg) {
    return {
      __await: arg
    };
  }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, asyncIteratorSymbol, function () {
    return this;
  }), exports.AsyncIterator = AsyncIterator, exports.async = function (innerFn, outerFn, self, tryLocsList, PromiseImpl) {
    void 0 === PromiseImpl && (PromiseImpl = Promise);
    var iter = new AsyncIterator(wrap(innerFn, outerFn, self, tryLocsList), PromiseImpl);
    return exports.isGeneratorFunction(outerFn) ? iter : iter.next().then(function (result) {
      return result.done ? result.value : iter.next();
    });
  }, defineIteratorMethods(Gp), define(Gp, toStringTagSymbol, "Generator"), define(Gp, iteratorSymbol, function () {
    return this;
  }), define(Gp, "toString", function () {
    return "[object Generator]";
  }), exports.keys = function (val) {
    var object = Object(val),
      keys = [];
    for (var key in object) {
      keys.push(key);
    }
    return keys.reverse(), function next() {
      for (; keys.length;) {
        var key = keys.pop();
        if (key in object) return next.value = key, next.done = !1, next;
      }
      return next.done = !0, next;
    };
  }, exports.values = values, Context.prototype = {
    constructor: Context,
    reset: function reset(skipTempReset) {
      if (this.prev = 0, this.next = 0, this.sent = this._sent = undefined, this.done = !1, this.delegate = null, this.method = "next", this.arg = undefined, this.tryEntries.forEach(resetTryEntry), !skipTempReset) for (var name in this) {
        "t" === name.charAt(0) && hasOwn.call(this, name) && !isNaN(+name.slice(1)) && (this[name] = undefined);
      }
    },
    stop: function stop() {
      this.done = !0;
      var rootRecord = this.tryEntries[0].completion;
      if ("throw" === rootRecord.type) throw rootRecord.arg;
      return this.rval;
    },
    dispatchException: function dispatchException(exception) {
      if (this.done) throw exception;
      var context = this;
      function handle(loc, caught) {
        return record.type = "throw", record.arg = exception, context.next = loc, caught && (context.method = "next", context.arg = undefined), !!caught;
      }
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i],
          record = entry.completion;
        if ("root" === entry.tryLoc) return handle("end");
        if (entry.tryLoc <= this.prev) {
          var hasCatch = hasOwn.call(entry, "catchLoc"),
            hasFinally = hasOwn.call(entry, "finallyLoc");
          if (hasCatch && hasFinally) {
            if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0);
            if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc);
          } else if (hasCatch) {
            if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0);
          } else {
            if (!hasFinally) throw new Error("try statement without catch or finally");
            if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc);
          }
        }
      }
    },
    abrupt: function abrupt(type, arg) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.tryLoc <= this.prev && hasOwn.call(entry, "finallyLoc") && this.prev < entry.finallyLoc) {
          var finallyEntry = entry;
          break;
        }
      }
      finallyEntry && ("break" === type || "continue" === type) && finallyEntry.tryLoc <= arg && arg <= finallyEntry.finallyLoc && (finallyEntry = null);
      var record = finallyEntry ? finallyEntry.completion : {};
      return record.type = type, record.arg = arg, finallyEntry ? (this.method = "next", this.next = finallyEntry.finallyLoc, ContinueSentinel) : this.complete(record);
    },
    complete: function complete(record, afterLoc) {
      if ("throw" === record.type) throw record.arg;
      return "break" === record.type || "continue" === record.type ? this.next = record.arg : "return" === record.type ? (this.rval = this.arg = record.arg, this.method = "return", this.next = "end") : "normal" === record.type && afterLoc && (this.next = afterLoc), ContinueSentinel;
    },
    finish: function finish(finallyLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.finallyLoc === finallyLoc) return this.complete(entry.completion, entry.afterLoc), resetTryEntry(entry), ContinueSentinel;
      }
    },
    "catch": function _catch(tryLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.tryLoc === tryLoc) {
          var record = entry.completion;
          if ("throw" === record.type) {
            var thrown = record.arg;
            resetTryEntry(entry);
          }
          return thrown;
        }
      }
      throw new Error("illegal catch attempt");
    },
    delegateYield: function delegateYield(iterable, resultName, nextLoc) {
      return this.delegate = {
        iterator: values(iterable),
        resultName: resultName,
        nextLoc: nextLoc
      }, "next" === this.method && (this.arg = undefined), ContinueSentinel;
    }
  }, exports;
}
function Header_asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {
  try {
    var info = gen[key](arg);
    var value = info.value;
  } catch (error) {
    reject(error);
    return;
  }
  if (info.done) {
    resolve(value);
  } else {
    Promise.resolve(value).then(_next, _throw);
  }
}
function Header_asyncToGenerator(fn) {
  return function () {
    var self = this,
      args = arguments;
    return new Promise(function (resolve, reject) {
      var gen = fn.apply(self, args);
      function _next(value) {
        Header_asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);
      }
      function _throw(err) {
        Header_asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);
      }
      _next(undefined);
    });
  };
}
function Header_classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}
function Header_defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}
function Header_createClass(Constructor, protoProps, staticProps) {
  if (protoProps) Header_defineProperties(Constructor.prototype, protoProps);
  if (staticProps) Header_defineProperties(Constructor, staticProps);
  Object.defineProperty(Constructor, "prototype", {
    writable: false
  });
  return Constructor;
}
function _get() {
  if (typeof Reflect !== "undefined" && Reflect.get) {
    _get = Reflect.get.bind();
  } else {
    _get = function _get(target, property, receiver) {
      var base = _superPropBase(target, property);
      if (!base) return;
      var desc = Object.getOwnPropertyDescriptor(base, property);
      if (desc.get) {
        return desc.get.call(arguments.length < 3 ? target : receiver);
      }
      return desc.value;
    };
  }
  return _get.apply(this, arguments);
}
function _superPropBase(object, property) {
  while (!Object.prototype.hasOwnProperty.call(object, property)) {
    object = _getPrototypeOf(object);
    if (object === null) break;
  }
  return object;
}
function _inherits(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function");
  }
  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      writable: true,
      configurable: true
    }
  });
  Object.defineProperty(subClass, "prototype", {
    writable: false
  });
  if (superClass) _setPrototypeOf(subClass, superClass);
}
function _setPrototypeOf(o, p) {
  _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) {
    o.__proto__ = p;
    return o;
  };
  return _setPrototypeOf(o, p);
}
function _createSuper(Derived) {
  var hasNativeReflectConstruct = _isNativeReflectConstruct();
  return function _createSuperInternal() {
    var Super = _getPrototypeOf(Derived),
      result;
    if (hasNativeReflectConstruct) {
      var NewTarget = _getPrototypeOf(this).constructor;
      result = Reflect.construct(Super, arguments, NewTarget);
    } else {
      result = Super.apply(this, arguments);
    }
    return _possibleConstructorReturn(this, result);
  };
}
function _possibleConstructorReturn(self, call) {
  if (call && (Header_typeof(call) === "object" || typeof call === "function")) {
    return call;
  } else if (call !== void 0) {
    throw new TypeError("Derived constructors may only return object or undefined");
  }
  return _assertThisInitialized(self);
}
function _assertThisInitialized(self) {
  if (self === void 0) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }
  return self;
}
function _isNativeReflectConstruct() {
  if (typeof Reflect === "undefined" || !Reflect.construct) return false;
  if (Reflect.construct.sham) return false;
  if (typeof Proxy === "function") return true;
  try {
    Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {}));
    return true;
  } catch (e) {
    return false;
  }
}
function _getPrototypeOf(o) {
  _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf(o) {
    return o.__proto__ || Object.getPrototypeOf(o);
  };
  return _getPrototypeOf(o);
}




/**
 * Класс для реализации компонента Header
 */
var Header = /*#__PURE__*/function (_BaseComponent) {
  _inherits(Header, _BaseComponent);
  var _super = _createSuper(Header);
  /**
   * Конструктор, создающий класс компонента Header
   * @param {Element} parent HTML-элемент, в который будет
   * осуществлена отрисовка
   */
  function Header(parent) {
    Header_classCallCheck(this, Header);
    return _super.call(this, parent);
  }

  /**
   * Функция для передачи в слушателе mouseover.
   */
  Header_createClass(Header, [{
    key: "listenMouseOverProfile",
    value: function () {
      var _listenMouseOverProfile = Header_asyncToGenerator( /*#__PURE__*/Header_regeneratorRuntime().mark(function _callee() {
        var headerPopUp;
        return Header_regeneratorRuntime().wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                headerPopUp = document.querySelector('.profile__pop-up');
                headerPopUp.style.display = 'block';
              case 2:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }));
      function listenMouseOverProfile() {
        return _listenMouseOverProfile.apply(this, arguments);
      }
      return listenMouseOverProfile;
    }()
    /**
     * Функция для передачи в слушателе mouseout.
     */
  }, {
    key: "listenMouseOutProfile",
    value: function () {
      var _listenMouseOutProfile = Header_asyncToGenerator( /*#__PURE__*/Header_regeneratorRuntime().mark(function _callee2() {
        var headerPopUp;
        return Header_regeneratorRuntime().wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                headerPopUp = document.querySelector('.profile__pop-up');
                headerPopUp.style.display = 'none';
              case 2:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2);
      }));
      function listenMouseOutProfile() {
        return _listenMouseOutProfile.apply(this, arguments);
      }
      return listenMouseOutProfile;
    }()
    /**
     * Метод, добавляющий слушатели.
     */
  }, {
    key: "startEventListener",
    value: function startEventListener() {
      var headerProfile = document.querySelector('.header__profile');
      if (headerProfile) {
        headerProfile.addEventListener('mouseover', this.listenMouseOverProfile);
        headerProfile.addEventListener('mouseout', this.listenMouseOutProfile);
      } else {
        console.log('element not found', headerProfile);
      }
    }

    /**
     * Метод, удаляющий слушатели.
     */
  }, {
    key: "removeEventListener",
    value: function removeEventListener() {
      var headerProfile = document.querySelector('.header__profile');
      if (headerProfile) {
        headerProfile.removeEventListener('mouseover', this.listenMouseOverProfile);
        headerProfile.removeEventListener('mouseout', this.listenMouseOutProfile);
      }
    }

    /**
     * Метод, отрисовывающий компонент в родительский HTML-элемент по заданному шаблону,
     * импортированному из templates.js
     * @param {Boolean} session контекст отрисовки шаблона, содержащий информацию об авторизации
     */
  }, {
    key: "render",
    value: function render(session) {
      _get(_getPrototypeOf(Header.prototype), "render", this).call(this, this.prepareRenderData(session), (header_default()));
    }

    /**
     * Метод, подготавливавающий наполнение для формы, исходя из контекста
     * @param {Object} context контекст отрисовки шаблона
     * @return {Object} значение категории из контекста отрисовки
     */
  }, {
    key: "prepareRenderData",
    value: function prepareRenderData(context) {
      return {
        session: context
      };
    }
  }]);
  return Header;
}(BaseComponent);

// EXTERNAL MODULE: ./public/src/components/Footer/footer.hbs
var footer = __webpack_require__(956);
var footer_default = /*#__PURE__*/__webpack_require__.n(footer);
;// CONCATENATED MODULE: ./public/src/components/Footer/Footer.js
function Footer_typeof(obj) {
  "@babel/helpers - typeof";

  return Footer_typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) {
    return typeof obj;
  } : function (obj) {
    return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
  }, Footer_typeof(obj);
}
function Footer_classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}
function Footer_defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}
function Footer_createClass(Constructor, protoProps, staticProps) {
  if (protoProps) Footer_defineProperties(Constructor.prototype, protoProps);
  if (staticProps) Footer_defineProperties(Constructor, staticProps);
  Object.defineProperty(Constructor, "prototype", {
    writable: false
  });
  return Constructor;
}
function Footer_get() {
  if (typeof Reflect !== "undefined" && Reflect.get) {
    Footer_get = Reflect.get.bind();
  } else {
    Footer_get = function _get(target, property, receiver) {
      var base = Footer_superPropBase(target, property);
      if (!base) return;
      var desc = Object.getOwnPropertyDescriptor(base, property);
      if (desc.get) {
        return desc.get.call(arguments.length < 3 ? target : receiver);
      }
      return desc.value;
    };
  }
  return Footer_get.apply(this, arguments);
}
function Footer_superPropBase(object, property) {
  while (!Object.prototype.hasOwnProperty.call(object, property)) {
    object = Footer_getPrototypeOf(object);
    if (object === null) break;
  }
  return object;
}
function Footer_inherits(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function");
  }
  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      writable: true,
      configurable: true
    }
  });
  Object.defineProperty(subClass, "prototype", {
    writable: false
  });
  if (superClass) Footer_setPrototypeOf(subClass, superClass);
}
function Footer_setPrototypeOf(o, p) {
  Footer_setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) {
    o.__proto__ = p;
    return o;
  };
  return Footer_setPrototypeOf(o, p);
}
function Footer_createSuper(Derived) {
  var hasNativeReflectConstruct = Footer_isNativeReflectConstruct();
  return function _createSuperInternal() {
    var Super = Footer_getPrototypeOf(Derived),
      result;
    if (hasNativeReflectConstruct) {
      var NewTarget = Footer_getPrototypeOf(this).constructor;
      result = Reflect.construct(Super, arguments, NewTarget);
    } else {
      result = Super.apply(this, arguments);
    }
    return Footer_possibleConstructorReturn(this, result);
  };
}
function Footer_possibleConstructorReturn(self, call) {
  if (call && (Footer_typeof(call) === "object" || typeof call === "function")) {
    return call;
  } else if (call !== void 0) {
    throw new TypeError("Derived constructors may only return object or undefined");
  }
  return Footer_assertThisInitialized(self);
}
function Footer_assertThisInitialized(self) {
  if (self === void 0) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }
  return self;
}
function Footer_isNativeReflectConstruct() {
  if (typeof Reflect === "undefined" || !Reflect.construct) return false;
  if (Reflect.construct.sham) return false;
  if (typeof Proxy === "function") return true;
  try {
    Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {}));
    return true;
  } catch (e) {
    return false;
  }
}
function Footer_getPrototypeOf(o) {
  Footer_getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf(o) {
    return o.__proto__ || Object.getPrototypeOf(o);
  };
  return Footer_getPrototypeOf(o);
}




/**
 * Класс для реализации компонента Footer
 */
var Footer_Header = /*#__PURE__*/function (_BaseComponent) {
  Footer_inherits(Header, _BaseComponent);
  var _super = Footer_createSuper(Header);
  /**
   * Конструктор, создающий класс компонента Footer
   * @param {Element} parent HTML-элемент, в который будет
   * осуществлена отрисовка
   */
  function Header(parent) {
    Footer_classCallCheck(this, Header);
    return _super.call(this, parent);
  }

  /**
   * Метод, отрисовывающий компонент в родительский HTML-элемент по заданному шаблону,
   * импортированному из templates.js
   */
  Footer_createClass(Header, [{
    key: "render",
    value: function render() {
      Footer_get(Footer_getPrototypeOf(Header.prototype), "render", this).call(this, null, (footer_default()));
    }
  }]);
  return Header;
}(BaseComponent);

;// CONCATENATED MODULE: ./public/src/modules/refreshElements.js
function refreshElements_classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}
function refreshElements_defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}
function refreshElements_createClass(Constructor, protoProps, staticProps) {
  if (protoProps) refreshElements_defineProperties(Constructor.prototype, protoProps);
  if (staticProps) refreshElements_defineProperties(Constructor, staticProps);
  Object.defineProperty(Constructor, "prototype", {
    writable: false
  });
  return Constructor;
}



/**
 * Класс, реализующий перерендеринг элементов
 */
var RefreshEl = /*#__PURE__*/function () {
  /**
   * Создает каркас страницы
   * @param {HTMLElement} root - корневой элемент
   */
  function RefreshEl(root) {
    refreshElements_classCallCheck(this, RefreshEl);
    var page = document.createElement('div');
    page.classList.add('page');
    page.appendChild(this.createElementWithId('header'));
    page.appendChild(this.createElementWithId('main'));
    page.appendChild(this.createElementWithId('footer'));
    root.appendChild(page);
  }

  /**
   * Метод, реализующий перерендеринг компонента Header
   * @param {object} config - контекст отрисовки компонента
   */
  refreshElements_createClass(RefreshEl, [{
    key: "createElementWithId",
    value:
    /**
     * Метод, реализующий создание тега с id
     * @param {string} tag - тег элемента для создания
     * @param {string} id - идентификатор тега
     * @return{HTMLElement} - элемент с тегом
     */
    function createElementWithId(tag) {
      var id = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : tag;
      var element = document.createElement(tag);
      element.id = id;
      return element;
    }
  }, {
    key: "refreshHeader",
    value: function refreshHeader(config) {
      var header = document.getElementById('header');
      header.innerHTML = '';
      var headerComponent = new Header(header);
      headerComponent.render(config.auth.authorised);
      config.auth.authorised ? headerComponent.startEventListener() : headerComponent.removeEventListener();
    }
  }, {
    key: "refreshFooter",
    value:
    /**
     * Метод, реализующий перерендеринг компонента Footer
     */
    function refreshFooter() {
      var footer = document.getElementById('footer');
      footer.innerHTML = '';
      var footerComponent = new Footer_Header(footer);
      footerComponent.render();
    }
  }]);
  return RefreshEl;
}();

// EXTERNAL MODULE: ./public/src/pages/LoginPage/LoginPage.hbs
var LoginPage_LoginPage = __webpack_require__(917);
var LoginPage_default = /*#__PURE__*/__webpack_require__.n(LoginPage_LoginPage);
;// CONCATENATED MODULE: ./public/src/pages/BasePage.js
function BasePage_classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}
function BasePage_defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}
function BasePage_createClass(Constructor, protoProps, staticProps) {
  if (protoProps) BasePage_defineProperties(Constructor.prototype, protoProps);
  if (staticProps) BasePage_defineProperties(Constructor, staticProps);
  Object.defineProperty(Constructor, "prototype", {
    writable: false
  });
  return Constructor;
}
function BasePage_classPrivateFieldInitSpec(obj, privateMap, value) {
  BasePage_checkPrivateRedeclaration(obj, privateMap);
  privateMap.set(obj, value);
}
function BasePage_checkPrivateRedeclaration(obj, privateCollection) {
  if (privateCollection.has(obj)) {
    throw new TypeError("Cannot initialize the same private elements twice on an object");
  }
}
function BasePage_classPrivateFieldGet(receiver, privateMap) {
  var descriptor = BasePage_classExtractFieldDescriptor(receiver, privateMap, "get");
  return BasePage_classApplyDescriptorGet(receiver, descriptor);
}
function BasePage_classApplyDescriptorGet(receiver, descriptor) {
  if (descriptor.get) {
    return descriptor.get.call(receiver);
  }
  return descriptor.value;
}
function _classPrivateFieldSet(receiver, privateMap, value) {
  var descriptor = BasePage_classExtractFieldDescriptor(receiver, privateMap, "set");
  _classApplyDescriptorSet(receiver, descriptor, value);
  return value;
}
function BasePage_classExtractFieldDescriptor(receiver, privateMap, action) {
  if (!privateMap.has(receiver)) {
    throw new TypeError("attempted to " + action + " private field on non-instance");
  }
  return privateMap.get(receiver);
}
function _classApplyDescriptorSet(receiver, descriptor, value) {
  if (descriptor.set) {
    descriptor.set.call(receiver, value);
  } else {
    if (!descriptor.writable) {
      throw new TypeError("attempted to set read only private field");
    }
    descriptor.value = value;
  }
}
var _parent = /*#__PURE__*/new WeakMap();
var _template = /*#__PURE__*/new WeakMap();
/**
 * Базовый класс для реализации страницы.
 */
var BasePage = /*#__PURE__*/function () {
  /**
   * Конструктор, создающий базовый класс реализации страницы.
   * @param {Element} parent HTML-элемент, в который будет
   * осуществлена отрисовка
   * @param {HandlebarsTemplateDelegate} template шаблон для отрисовки
   */
  function BasePage(parent, template) {
    BasePage_classCallCheck(this, BasePage);
    BasePage_classPrivateFieldInitSpec(this, _parent, {
      writable: true,
      value: void 0
    });
    BasePage_classPrivateFieldInitSpec(this, _template, {
      writable: true,
      value: void 0
    });
    _classPrivateFieldSet(this, _parent, parent);
    _classPrivateFieldSet(this, _template, template);
  }

  /**
   * Метод, добавляющий слушатели.
   * @param {any} context контекст данных для страницы
   */
  BasePage_createClass(BasePage, [{
    key: "startEventListener",
    value: function startEventListener(context) {}

    /**
     * Метод, удаляющий слушатели.
     * @param {any} context контекст данных для страницы
     */
  }, {
    key: "removeEventListener",
    value: function removeEventListener(context) {}

    /**
     * Метод, отрисовывающий страницу.
     * @param {any} data контекст данных для страницы
     */
  }, {
    key: "render",
    value: function render(data) {
      BasePage_classPrivateFieldGet(this, _parent).innerHTML = BasePage_classPrivateFieldGet(this, _template).call(this, data);
    }
  }]);
  return BasePage;
}();

// EXTERNAL MODULE: ./public/src/components/Form/form.hbs
var Form_form = __webpack_require__(547);
var form_default = /*#__PURE__*/__webpack_require__.n(Form_form);
;// CONCATENATED MODULE: ./public/src/components/Form/Form.js
function Form_typeof(obj) {
  "@babel/helpers - typeof";

  return Form_typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) {
    return typeof obj;
  } : function (obj) {
    return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
  }, Form_typeof(obj);
}
function ownKeys(object, enumerableOnly) {
  var keys = Object.keys(object);
  if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(object);
    enumerableOnly && (symbols = symbols.filter(function (sym) {
      return Object.getOwnPropertyDescriptor(object, sym).enumerable;
    })), keys.push.apply(keys, symbols);
  }
  return keys;
}
function _objectSpread(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = null != arguments[i] ? arguments[i] : {};
    i % 2 ? ownKeys(Object(source), !0).forEach(function (key) {
      Form_defineProperty(target, key, source[key]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) {
      Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
    });
  }
  return target;
}
function Form_defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }
  return obj;
}
function Form_classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}
function Form_defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}
function Form_createClass(Constructor, protoProps, staticProps) {
  if (protoProps) Form_defineProperties(Constructor.prototype, protoProps);
  if (staticProps) Form_defineProperties(Constructor, staticProps);
  Object.defineProperty(Constructor, "prototype", {
    writable: false
  });
  return Constructor;
}
function Form_get() {
  if (typeof Reflect !== "undefined" && Reflect.get) {
    Form_get = Reflect.get.bind();
  } else {
    Form_get = function _get(target, property, receiver) {
      var base = Form_superPropBase(target, property);
      if (!base) return;
      var desc = Object.getOwnPropertyDescriptor(base, property);
      if (desc.get) {
        return desc.get.call(arguments.length < 3 ? target : receiver);
      }
      return desc.value;
    };
  }
  return Form_get.apply(this, arguments);
}
function Form_superPropBase(object, property) {
  while (!Object.prototype.hasOwnProperty.call(object, property)) {
    object = Form_getPrototypeOf(object);
    if (object === null) break;
  }
  return object;
}
function Form_inherits(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function");
  }
  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      writable: true,
      configurable: true
    }
  });
  Object.defineProperty(subClass, "prototype", {
    writable: false
  });
  if (superClass) Form_setPrototypeOf(subClass, superClass);
}
function Form_setPrototypeOf(o, p) {
  Form_setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) {
    o.__proto__ = p;
    return o;
  };
  return Form_setPrototypeOf(o, p);
}
function Form_createSuper(Derived) {
  var hasNativeReflectConstruct = Form_isNativeReflectConstruct();
  return function _createSuperInternal() {
    var Super = Form_getPrototypeOf(Derived),
      result;
    if (hasNativeReflectConstruct) {
      var NewTarget = Form_getPrototypeOf(this).constructor;
      result = Reflect.construct(Super, arguments, NewTarget);
    } else {
      result = Super.apply(this, arguments);
    }
    return Form_possibleConstructorReturn(this, result);
  };
}
function Form_possibleConstructorReturn(self, call) {
  if (call && (Form_typeof(call) === "object" || typeof call === "function")) {
    return call;
  } else if (call !== void 0) {
    throw new TypeError("Derived constructors may only return object or undefined");
  }
  return Form_assertThisInitialized(self);
}
function Form_assertThisInitialized(self) {
  if (self === void 0) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }
  return self;
}
function Form_isNativeReflectConstruct() {
  if (typeof Reflect === "undefined" || !Reflect.construct) return false;
  if (Reflect.construct.sham) return false;
  if (typeof Proxy === "function") return true;
  try {
    Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {}));
    return true;
  } catch (e) {
    return false;
  }
}
function Form_getPrototypeOf(o) {
  Form_getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf(o) {
    return o.__proto__ || Object.getPrototypeOf(o);
  };
  return Form_getPrototypeOf(o);
}




/**
 * Класс для реализации компонента Form
 */
var Form = /*#__PURE__*/function (_BaseComponent) {
  Form_inherits(Form, _BaseComponent);
  var _super = Form_createSuper(Form);
  /**
   * Конструктор, создающий класс компонента Form
   * @param {Element} parent HTML-элемент, в который будет
   * осуществлена отрисовка
   */
  function Form(parent) {
    Form_classCallCheck(this, Form);
    return _super.call(this, parent);
  }

  /**
   * Метод, отрисовывающий компонент в родительский HTML-элемент по заданному шаблону и контексту
   * @param {Object} context контекст отрисовки шаблона
   */
  Form_createClass(Form, [{
    key: "render",
    value: function render(context) {
      Form_get(Form_getPrototypeOf(Form.prototype), "render", this).call(this, this.prepareRenderData(context), (form_default()));
    }

    /**
     * Метод, подготавливавающий наполнение для формы, исходя из контекста
     * @param {Object} context контекст отрисовки шаблона
     * @return {Object} наполнение для формы
     */
  }, {
    key: "prepareRenderData",
    value: function prepareRenderData(context) {
      return {
        field: _objectSpread({}, context.fields),
        button: context.button.buttonValue
      };
    }
  }]);
  return Form;
}(BaseComponent);

;// CONCATENATED MODULE: ./public/src/modules/validation.js
function validation_classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}
function validation_defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}
function validation_createClass(Constructor, protoProps, staticProps) {
  if (protoProps) validation_defineProperties(Constructor.prototype, protoProps);
  if (staticProps) validation_defineProperties(Constructor, staticProps);
  Object.defineProperty(Constructor, "prototype", {
    writable: false
  });
  return Constructor;
}
function validation_defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }
  return obj;
}
var emailRegex = /@/;

/**
 * Класс, реализующий валидацию форм.
 */
var Validation = /*#__PURE__*/function () {
  function Validation() {
    var _this = this;
    validation_classCallCheck(this, Validation);
    validation_defineProperty(this, "validatePassword", function (data) {
      var checkEmpty = _this.checkEmptyField(data);
      if (!checkEmpty.status) {
        return checkEmpty;
      }
      if (data.length < 6) {
        return {
          status: false,
          message: 'Должен содержать минимум 6 символов'
        };
      }
      return {
        status: true,
        message: ''
      };
    });
  }
  validation_createClass(Validation, [{
    key: "validateEMail",
    value:
    /**
     * Метод, валидирующий e-mail.
     * @param {string} data - e-mail для валидации
     * @return {{status: boolean, message: String}} - объект с полем статуса проверки status
     * и полем сообщением ошибки message
     */
    function validateEMail(data) {
      var checkEmpty = this.checkEmptyField(data);
      if (!checkEmpty.status) {
        return checkEmpty;
      }
      if (!emailRegex.test(data)) {
        return {
          status: false,
          message: 'Неверный формат почты'
        };
      }
      return {
        status: true,
        message: ''
      };
    }
  }, {
    key: "validateRepeatPassword",
    value:
    /**
     * Метод, валидирующий повторный ввод пароля.
     * @param {boolean} isValid - совпадают ли пароли
     * @return {{status: boolean, message: String}} - объект с полем статуса проверки status
     * и полем сообщением ошибки message
     */
    function validateRepeatPassword(isValid) {
      return isValid ? {
        status: true,
        message: ''
      } : {
        status: false,
        message: 'Введенные пароли не совпадают'
      };
    }
  }, {
    key: "checkEmptyField",
    value:
    /**
     * Метод, проверяющий пустые поля.
     * @param {string} data - данные для валидации
     * @return {{status: boolean, message: String}} - объект с полем статуса проверки status
     * и полем сообщением ошибки message
     */
    function checkEmptyField(data) {
      if (data.length === 0) {
        return {
          status: false,
          message: 'Поле обязательно должно быть заполнено'
        };
      }
      return {
        status: true,
        message: ''
      };
    }
  }]);
  return Validation;
}();
/* harmony default export */ const validation = (new Validation());
;// CONCATENATED MODULE: ./public/src/modules/ErrorMessage.js
function ErrorMessage_classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}
function ErrorMessage_defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}
function ErrorMessage_createClass(Constructor, protoProps, staticProps) {
  if (protoProps) ErrorMessage_defineProperties(Constructor.prototype, protoProps);
  if (staticProps) ErrorMessage_defineProperties(Constructor, staticProps);
  Object.defineProperty(Constructor, "prototype", {
    writable: false
  });
  return Constructor;
}
/**
 * Класс, реализующий отрисовку ошибок.
 */
var ErrorMessage = /*#__PURE__*/function () {
  function ErrorMessage() {
    ErrorMessage_classCallCheck(this, ErrorMessage);
  }
  ErrorMessage_createClass(ErrorMessage, [{
    key: "getErrorMessage",
    value:
    /**
     * Метод, который отрисовывает сообщение об ошибке ввода
     * @param {object} target - HTML-элемент, после которого будет осуществлена отрисовка
     * @param {string} nameId - id HTML-элемента, который будет отрисован
     * @param {string} message - сообщение для отрисовки
     */
    function getErrorMessage(target, nameId, message) {
      var div = document.createElement('div');
      div.id = nameId;
      var span = document.createElement('span');
      div.appendChild(span);
      div.classList.add('input-field-error');
      span.classList.add('input-field-error__text');
      span.innerHTML = message;
      target.after(div);
    }
  }, {
    key: "deleteErrorMessage",
    value:
    /**
     * Метод, удаляющий сообщение об ошибке при фокусе на поле ввода
     * @param {object} nameId название поля
     */
    function deleteErrorMessage(nameId) {
      if (document.getElementById(nameId + 'Error')) {
        document.getElementById(nameId + 'Error').remove();
      }
    }
  }, {
    key: "getServerMessage",
    value:
    /**
     * Метод, который отрисовывает сообщение об ошибке сервера.
     * @param {object} target - HTML-элемент, после которого будет осуществлена отрисовка
     * @param {string} nameId - id HTML-элемента, который будет отрисован
     * @param {string} message - сообщение для отрисовки
     */
    function getServerMessage(target, nameId, message) {
      var div = document.createElement('div');
      div.id = nameId;
      var span = document.createElement('span');
      div.appendChild(span);
      div.classList.add('server-error');
      span.classList.add('server-error__text');
      span.innerHTML = message;
      target.before(div);
    }

    /**
     * Метод, который проверяет результат валидации данных.
     * @param {{status: boolean, message: String}} valData - объект с полем статуса проверки status
     * и полем сообщением ошибки message
     * @param {object} element - элемент, который валидируем
     * @return {boolean} - статус валидации
     */
  }, {
    key: "validateFiled",
    value: function validateFiled(valData, element) {
      if (!valData.status) {
        this.getErrorMessage(document.getElementById(element.name), element.errorID, valData.message);
        return false;
      }
      return true;
    }
  }]);
  return ErrorMessage;
}();
/* harmony default export */ const modules_ErrorMessage = (new ErrorMessage());
;// CONCATENATED MODULE: ./public/src/pages/LoginPage/LoginPage.js
function LoginPage_typeof(obj) {
  "@babel/helpers - typeof";

  return LoginPage_typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) {
    return typeof obj;
  } : function (obj) {
    return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
  }, LoginPage_typeof(obj);
}
function _slicedToArray(arr, i) {
  return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();
}
function _nonIterableRest() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function _unsupportedIterableToArray(o, minLen) {
  if (!o) return;
  if (typeof o === "string") return _arrayLikeToArray(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
}
function _arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length) len = arr.length;
  for (var i = 0, arr2 = new Array(len); i < len; i++) {
    arr2[i] = arr[i];
  }
  return arr2;
}
function _iterableToArrayLimit(arr, i) {
  var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"];
  if (_i == null) return;
  var _arr = [];
  var _n = true;
  var _d = false;
  var _s, _e;
  try {
    for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) {
      _arr.push(_s.value);
      if (i && _arr.length === i) break;
    }
  } catch (err) {
    _d = true;
    _e = err;
  } finally {
    try {
      if (!_n && _i["return"] != null) _i["return"]();
    } finally {
      if (_d) throw _e;
    }
  }
  return _arr;
}
function _arrayWithHoles(arr) {
  if (Array.isArray(arr)) return arr;
}
function LoginPage_regeneratorRuntime() {
  "use strict";

  /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */
  LoginPage_regeneratorRuntime = function _regeneratorRuntime() {
    return exports;
  };
  var exports = {},
    Op = Object.prototype,
    hasOwn = Op.hasOwnProperty,
    defineProperty = Object.defineProperty || function (obj, key, desc) {
      obj[key] = desc.value;
    },
    $Symbol = "function" == typeof Symbol ? Symbol : {},
    iteratorSymbol = $Symbol.iterator || "@@iterator",
    asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator",
    toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag";
  function define(obj, key, value) {
    return Object.defineProperty(obj, key, {
      value: value,
      enumerable: !0,
      configurable: !0,
      writable: !0
    }), obj[key];
  }
  try {
    define({}, "");
  } catch (err) {
    define = function define(obj, key, value) {
      return obj[key] = value;
    };
  }
  function wrap(innerFn, outerFn, self, tryLocsList) {
    var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator,
      generator = Object.create(protoGenerator.prototype),
      context = new Context(tryLocsList || []);
    return defineProperty(generator, "_invoke", {
      value: makeInvokeMethod(innerFn, self, context)
    }), generator;
  }
  function tryCatch(fn, obj, arg) {
    try {
      return {
        type: "normal",
        arg: fn.call(obj, arg)
      };
    } catch (err) {
      return {
        type: "throw",
        arg: err
      };
    }
  }
  exports.wrap = wrap;
  var ContinueSentinel = {};
  function Generator() {}
  function GeneratorFunction() {}
  function GeneratorFunctionPrototype() {}
  var IteratorPrototype = {};
  define(IteratorPrototype, iteratorSymbol, function () {
    return this;
  });
  var getProto = Object.getPrototypeOf,
    NativeIteratorPrototype = getProto && getProto(getProto(values([])));
  NativeIteratorPrototype && NativeIteratorPrototype !== Op && hasOwn.call(NativeIteratorPrototype, iteratorSymbol) && (IteratorPrototype = NativeIteratorPrototype);
  var Gp = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(IteratorPrototype);
  function defineIteratorMethods(prototype) {
    ["next", "throw", "return"].forEach(function (method) {
      define(prototype, method, function (arg) {
        return this._invoke(method, arg);
      });
    });
  }
  function AsyncIterator(generator, PromiseImpl) {
    function invoke(method, arg, resolve, reject) {
      var record = tryCatch(generator[method], generator, arg);
      if ("throw" !== record.type) {
        var result = record.arg,
          value = result.value;
        return value && "object" == LoginPage_typeof(value) && hasOwn.call(value, "__await") ? PromiseImpl.resolve(value.__await).then(function (value) {
          invoke("next", value, resolve, reject);
        }, function (err) {
          invoke("throw", err, resolve, reject);
        }) : PromiseImpl.resolve(value).then(function (unwrapped) {
          result.value = unwrapped, resolve(result);
        }, function (error) {
          return invoke("throw", error, resolve, reject);
        });
      }
      reject(record.arg);
    }
    var previousPromise;
    defineProperty(this, "_invoke", {
      value: function value(method, arg) {
        function callInvokeWithMethodAndArg() {
          return new PromiseImpl(function (resolve, reject) {
            invoke(method, arg, resolve, reject);
          });
        }
        return previousPromise = previousPromise ? previousPromise.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg();
      }
    });
  }
  function makeInvokeMethod(innerFn, self, context) {
    var state = "suspendedStart";
    return function (method, arg) {
      if ("executing" === state) throw new Error("Generator is already running");
      if ("completed" === state) {
        if ("throw" === method) throw arg;
        return doneResult();
      }
      for (context.method = method, context.arg = arg;;) {
        var delegate = context.delegate;
        if (delegate) {
          var delegateResult = maybeInvokeDelegate(delegate, context);
          if (delegateResult) {
            if (delegateResult === ContinueSentinel) continue;
            return delegateResult;
          }
        }
        if ("next" === context.method) context.sent = context._sent = context.arg;else if ("throw" === context.method) {
          if ("suspendedStart" === state) throw state = "completed", context.arg;
          context.dispatchException(context.arg);
        } else "return" === context.method && context.abrupt("return", context.arg);
        state = "executing";
        var record = tryCatch(innerFn, self, context);
        if ("normal" === record.type) {
          if (state = context.done ? "completed" : "suspendedYield", record.arg === ContinueSentinel) continue;
          return {
            value: record.arg,
            done: context.done
          };
        }
        "throw" === record.type && (state = "completed", context.method = "throw", context.arg = record.arg);
      }
    };
  }
  function maybeInvokeDelegate(delegate, context) {
    var method = delegate.iterator[context.method];
    if (undefined === method) {
      if (context.delegate = null, "throw" === context.method) {
        if (delegate.iterator["return"] && (context.method = "return", context.arg = undefined, maybeInvokeDelegate(delegate, context), "throw" === context.method)) return ContinueSentinel;
        context.method = "throw", context.arg = new TypeError("The iterator does not provide a 'throw' method");
      }
      return ContinueSentinel;
    }
    var record = tryCatch(method, delegate.iterator, context.arg);
    if ("throw" === record.type) return context.method = "throw", context.arg = record.arg, context.delegate = null, ContinueSentinel;
    var info = record.arg;
    return info ? info.done ? (context[delegate.resultName] = info.value, context.next = delegate.nextLoc, "return" !== context.method && (context.method = "next", context.arg = undefined), context.delegate = null, ContinueSentinel) : info : (context.method = "throw", context.arg = new TypeError("iterator result is not an object"), context.delegate = null, ContinueSentinel);
  }
  function pushTryEntry(locs) {
    var entry = {
      tryLoc: locs[0]
    };
    1 in locs && (entry.catchLoc = locs[1]), 2 in locs && (entry.finallyLoc = locs[2], entry.afterLoc = locs[3]), this.tryEntries.push(entry);
  }
  function resetTryEntry(entry) {
    var record = entry.completion || {};
    record.type = "normal", delete record.arg, entry.completion = record;
  }
  function Context(tryLocsList) {
    this.tryEntries = [{
      tryLoc: "root"
    }], tryLocsList.forEach(pushTryEntry, this), this.reset(!0);
  }
  function values(iterable) {
    if (iterable) {
      var iteratorMethod = iterable[iteratorSymbol];
      if (iteratorMethod) return iteratorMethod.call(iterable);
      if ("function" == typeof iterable.next) return iterable;
      if (!isNaN(iterable.length)) {
        var i = -1,
          next = function next() {
            for (; ++i < iterable.length;) {
              if (hasOwn.call(iterable, i)) return next.value = iterable[i], next.done = !1, next;
            }
            return next.value = undefined, next.done = !0, next;
          };
        return next.next = next;
      }
    }
    return {
      next: doneResult
    };
  }
  function doneResult() {
    return {
      value: undefined,
      done: !0
    };
  }
  return GeneratorFunction.prototype = GeneratorFunctionPrototype, defineProperty(Gp, "constructor", {
    value: GeneratorFunctionPrototype,
    configurable: !0
  }), defineProperty(GeneratorFunctionPrototype, "constructor", {
    value: GeneratorFunction,
    configurable: !0
  }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, toStringTagSymbol, "GeneratorFunction"), exports.isGeneratorFunction = function (genFun) {
    var ctor = "function" == typeof genFun && genFun.constructor;
    return !!ctor && (ctor === GeneratorFunction || "GeneratorFunction" === (ctor.displayName || ctor.name));
  }, exports.mark = function (genFun) {
    return Object.setPrototypeOf ? Object.setPrototypeOf(genFun, GeneratorFunctionPrototype) : (genFun.__proto__ = GeneratorFunctionPrototype, define(genFun, toStringTagSymbol, "GeneratorFunction")), genFun.prototype = Object.create(Gp), genFun;
  }, exports.awrap = function (arg) {
    return {
      __await: arg
    };
  }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, asyncIteratorSymbol, function () {
    return this;
  }), exports.AsyncIterator = AsyncIterator, exports.async = function (innerFn, outerFn, self, tryLocsList, PromiseImpl) {
    void 0 === PromiseImpl && (PromiseImpl = Promise);
    var iter = new AsyncIterator(wrap(innerFn, outerFn, self, tryLocsList), PromiseImpl);
    return exports.isGeneratorFunction(outerFn) ? iter : iter.next().then(function (result) {
      return result.done ? result.value : iter.next();
    });
  }, defineIteratorMethods(Gp), define(Gp, toStringTagSymbol, "Generator"), define(Gp, iteratorSymbol, function () {
    return this;
  }), define(Gp, "toString", function () {
    return "[object Generator]";
  }), exports.keys = function (val) {
    var object = Object(val),
      keys = [];
    for (var key in object) {
      keys.push(key);
    }
    return keys.reverse(), function next() {
      for (; keys.length;) {
        var key = keys.pop();
        if (key in object) return next.value = key, next.done = !1, next;
      }
      return next.done = !0, next;
    };
  }, exports.values = values, Context.prototype = {
    constructor: Context,
    reset: function reset(skipTempReset) {
      if (this.prev = 0, this.next = 0, this.sent = this._sent = undefined, this.done = !1, this.delegate = null, this.method = "next", this.arg = undefined, this.tryEntries.forEach(resetTryEntry), !skipTempReset) for (var name in this) {
        "t" === name.charAt(0) && hasOwn.call(this, name) && !isNaN(+name.slice(1)) && (this[name] = undefined);
      }
    },
    stop: function stop() {
      this.done = !0;
      var rootRecord = this.tryEntries[0].completion;
      if ("throw" === rootRecord.type) throw rootRecord.arg;
      return this.rval;
    },
    dispatchException: function dispatchException(exception) {
      if (this.done) throw exception;
      var context = this;
      function handle(loc, caught) {
        return record.type = "throw", record.arg = exception, context.next = loc, caught && (context.method = "next", context.arg = undefined), !!caught;
      }
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i],
          record = entry.completion;
        if ("root" === entry.tryLoc) return handle("end");
        if (entry.tryLoc <= this.prev) {
          var hasCatch = hasOwn.call(entry, "catchLoc"),
            hasFinally = hasOwn.call(entry, "finallyLoc");
          if (hasCatch && hasFinally) {
            if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0);
            if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc);
          } else if (hasCatch) {
            if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0);
          } else {
            if (!hasFinally) throw new Error("try statement without catch or finally");
            if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc);
          }
        }
      }
    },
    abrupt: function abrupt(type, arg) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.tryLoc <= this.prev && hasOwn.call(entry, "finallyLoc") && this.prev < entry.finallyLoc) {
          var finallyEntry = entry;
          break;
        }
      }
      finallyEntry && ("break" === type || "continue" === type) && finallyEntry.tryLoc <= arg && arg <= finallyEntry.finallyLoc && (finallyEntry = null);
      var record = finallyEntry ? finallyEntry.completion : {};
      return record.type = type, record.arg = arg, finallyEntry ? (this.method = "next", this.next = finallyEntry.finallyLoc, ContinueSentinel) : this.complete(record);
    },
    complete: function complete(record, afterLoc) {
      if ("throw" === record.type) throw record.arg;
      return "break" === record.type || "continue" === record.type ? this.next = record.arg : "return" === record.type ? (this.rval = this.arg = record.arg, this.method = "return", this.next = "end") : "normal" === record.type && afterLoc && (this.next = afterLoc), ContinueSentinel;
    },
    finish: function finish(finallyLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.finallyLoc === finallyLoc) return this.complete(entry.completion, entry.afterLoc), resetTryEntry(entry), ContinueSentinel;
      }
    },
    "catch": function _catch(tryLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.tryLoc === tryLoc) {
          var record = entry.completion;
          if ("throw" === record.type) {
            var thrown = record.arg;
            resetTryEntry(entry);
          }
          return thrown;
        }
      }
      throw new Error("illegal catch attempt");
    },
    delegateYield: function delegateYield(iterable, resultName, nextLoc) {
      return this.delegate = {
        iterator: values(iterable),
        resultName: resultName,
        nextLoc: nextLoc
      }, "next" === this.method && (this.arg = undefined), ContinueSentinel;
    }
  }, exports;
}
function LoginPage_asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {
  try {
    var info = gen[key](arg);
    var value = info.value;
  } catch (error) {
    reject(error);
    return;
  }
  if (info.done) {
    resolve(value);
  } else {
    Promise.resolve(value).then(_next, _throw);
  }
}
function LoginPage_asyncToGenerator(fn) {
  return function () {
    var self = this,
      args = arguments;
    return new Promise(function (resolve, reject) {
      var gen = fn.apply(self, args);
      function _next(value) {
        LoginPage_asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);
      }
      function _throw(err) {
        LoginPage_asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);
      }
      _next(undefined);
    });
  };
}
function LoginPage_classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}
function LoginPage_defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}
function LoginPage_createClass(Constructor, protoProps, staticProps) {
  if (protoProps) LoginPage_defineProperties(Constructor.prototype, protoProps);
  if (staticProps) LoginPage_defineProperties(Constructor, staticProps);
  Object.defineProperty(Constructor, "prototype", {
    writable: false
  });
  return Constructor;
}
function LoginPage_get() {
  if (typeof Reflect !== "undefined" && Reflect.get) {
    LoginPage_get = Reflect.get.bind();
  } else {
    LoginPage_get = function _get(target, property, receiver) {
      var base = LoginPage_superPropBase(target, property);
      if (!base) return;
      var desc = Object.getOwnPropertyDescriptor(base, property);
      if (desc.get) {
        return desc.get.call(arguments.length < 3 ? target : receiver);
      }
      return desc.value;
    };
  }
  return LoginPage_get.apply(this, arguments);
}
function LoginPage_superPropBase(object, property) {
  while (!Object.prototype.hasOwnProperty.call(object, property)) {
    object = LoginPage_getPrototypeOf(object);
    if (object === null) break;
  }
  return object;
}
function LoginPage_inherits(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function");
  }
  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      writable: true,
      configurable: true
    }
  });
  Object.defineProperty(subClass, "prototype", {
    writable: false
  });
  if (superClass) LoginPage_setPrototypeOf(subClass, superClass);
}
function LoginPage_setPrototypeOf(o, p) {
  LoginPage_setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) {
    o.__proto__ = p;
    return o;
  };
  return LoginPage_setPrototypeOf(o, p);
}
function LoginPage_createSuper(Derived) {
  var hasNativeReflectConstruct = LoginPage_isNativeReflectConstruct();
  return function _createSuperInternal() {
    var Super = LoginPage_getPrototypeOf(Derived),
      result;
    if (hasNativeReflectConstruct) {
      var NewTarget = LoginPage_getPrototypeOf(this).constructor;
      result = Reflect.construct(Super, arguments, NewTarget);
    } else {
      result = Super.apply(this, arguments);
    }
    return LoginPage_possibleConstructorReturn(this, result);
  };
}
function LoginPage_possibleConstructorReturn(self, call) {
  if (call && (LoginPage_typeof(call) === "object" || typeof call === "function")) {
    return call;
  } else if (call !== void 0) {
    throw new TypeError("Derived constructors may only return object or undefined");
  }
  return LoginPage_assertThisInitialized(self);
}
function LoginPage_assertThisInitialized(self) {
  if (self === void 0) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }
  return self;
}
function LoginPage_isNativeReflectConstruct() {
  if (typeof Reflect === "undefined" || !Reflect.construct) return false;
  if (Reflect.construct.sham) return false;
  if (typeof Proxy === "function") return true;
  try {
    Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {}));
    return true;
  } catch (e) {
    return false;
  }
}
function LoginPage_getPrototypeOf(o) {
  LoginPage_getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf(o) {
    return o.__proto__ || Object.getPrototypeOf(o);
  };
  return LoginPage_getPrototypeOf(o);
}
function LoginPage_defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }
  return obj;
}








var ERROR_400_MESSAGE = 'Ошибка. Попробуйте еще раз';
var ERROR_401_MESSAGE = 'Неверная почта или пароль';
var SERVER_ERROR_MESSAGE = 'Ошибка сервера. Попробуйте позже';

/**
 * Класс, реализующий страницу входа.
 */
var LoginPage = /*#__PURE__*/function (_BasePage) {
  LoginPage_inherits(LoginPage, _BasePage);
  var _super = LoginPage_createSuper(LoginPage);
  /**
   * Конструктор, создающий конструктор базовой страницы с нужными параметрами
   * @param {Element} parent HTML-элемент, в который будет осуществлена отрисовка
   */
  function LoginPage(parent) {
    var _this;
    LoginPage_classCallCheck(this, LoginPage);
    _this = _super.call(this, parent, (LoginPage_default()));
    LoginPage_defineProperty(LoginPage_assertThisInitialized(_this), "context", {
      fields: {
        email: {
          title: 'Почта',
          type: 'email',
          name: 'email',
          placeholder: 'mail@website.com',
          maxLength: '30',
          errorID: 'emailError'
        },
        password: {
          title: 'Пароль',
          type: 'password',
          name: 'password',
          placeholder: 'Введите пароль',
          maxLength: '16',
          errorID: 'passwordError'
        }
      },
      button: {
        buttonValue: 'Войти'
      }
    });
    return _this;
  }

  /**
   * Метод, удаляющий слушатели.
   * @param {any} context контекст данных для страницы
   */
  LoginPage_createClass(LoginPage, [{
    key: "removeEventListener",
    value: function removeEventListener(context) {
      var form = document.getElementById('login-form');
      form.removeEventListener('focusin', this.onFocusinHandler);
      form.removeEventListener('submit', this.onSubmitHandler);
    }

    /**
     * Метод, обрабатывающий получение фокуса полем.
     * @param {object} event событие получения фокуса полем
     */
  }, {
    key: "onFocusinHandler",
    value: function () {
      var _onFocusinHandler = LoginPage_asyncToGenerator( /*#__PURE__*/LoginPage_regeneratorRuntime().mark(function _callee(event) {
        return LoginPage_regeneratorRuntime().wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                modules_ErrorMessage.deleteErrorMessage(event.target.name);
              case 1:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }));
      function onFocusinHandler(_x) {
        return _onFocusinHandler.apply(this, arguments);
      }
      return onFocusinHandler;
    }()
  }, {
    key: "onSubmitHandler",
    value:
    /**
     * Метод, обрабатывающий отсылку формы.
     * @param {object} config глобальный контекст
     * @param {object} form поля формы
     * @param {object} event событие отправки формы
     */
    function () {
      var _onSubmitHandler = LoginPage_asyncToGenerator( /*#__PURE__*/LoginPage_regeneratorRuntime().mark(function _callee2(config, form, event) {
        var data, fields, key, email, password, _yield$request$makePo, _yield$request$makePo2, status;
        return LoginPage_regeneratorRuntime().wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                event.preventDefault();

                /* Сохранить данные из формы в переменную */
                data = {};
                fields = this.context.fields;
                Object.keys(fields).forEach(function (page) {
                  var element = form.querySelector("[name=".concat(fields[page].name, "]"));
                  data[fields[page].name] = element.value;
                });
                data.email = data.email.trim();
                /* Удаление отрисованных ошибок */
                for (key in data) {
                  if (data.hasOwnProperty(key)) {
                    modules_ErrorMessage.deleteErrorMessage(key);
                  }
                }

                /* Проверка почты и пароля и отрисовка ошибок на странице */
                if (!this.validate(data)) {
                  _context2.next = 30;
                  break;
                }
                email = data.email, password = data.password;
                _context2.next = 10;
                return ajax.makePostRequest(config.api.login, {
                  password: password,
                  email: email
                })["catch"](function (err) {
                  return console.log(err);
                });
              case 10:
                _yield$request$makePo = _context2.sent;
                _yield$request$makePo2 = _slicedToArray(_yield$request$makePo, 1);
                status = _yield$request$makePo2[0];
                _context2.t0 = status;
                _context2.next = _context2.t0 === 201 ? 16 : _context2.t0 === 400 ? 23 : _context2.t0 === 401 ? 25 : 28;
                break;
              case 16:
                console.log('auth');
                config.auth.authorised = true;
                modules_Router.remove(config.header.login.href);
                modules_Router.remove(config.header.signup.href);
                window.dispatchEvent(config.auth.event);
                modules_Router.openPage(config.header.main.href, config);
                return _context2.abrupt("break", 30);
              case 23:
                !document.getElementById('Error400Message') ? modules_ErrorMessage.getServerMessage(document.getElementById('inForm'), 'Error400Message', ERROR_400_MESSAGE) : console.log('bad request: ', status);
                return _context2.abrupt("break", 30);
              case 25:
                modules_ErrorMessage.getErrorMessage(document.getElementById(fields.email.name), 'emailError', ERROR_401_MESSAGE);
                console.log('no auth: ', status);
                return _context2.abrupt("break", 30);
              case 28:
                !document.getElementById('serverErrorMessage') ? modules_ErrorMessage.getServerMessage(document.getElementById('inForm'), 'serverErrorMessage', SERVER_ERROR_MESSAGE) : console.log('server error: ', status);
                return _context2.abrupt("break", 30);
              case 30:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));
      function onSubmitHandler(_x2, _x3, _x4) {
        return _onSubmitHandler.apply(this, arguments);
      }
      return onSubmitHandler;
    }()
  }, {
    key: "render",
    value:
    /**
     * Метод, отрисовывающий страницу.
     * @param {object} config контекст отрисовки страницы
     */
    function render(config) {
      LoginPage_get(LoginPage_getPrototypeOf(LoginPage.prototype), "render", this).call(this, this.context);

      /* Создание и отрисовка компонента Form */
      this.formComponent = new Form(document.getElementById('login-form'));
      this.formComponent.render(this.context);
      var form = document.getElementById('login-form');
      document.getElementById(this.context.fields.email.name).focus();
      form.addEventListener('focusin', this.onFocusinHandler);
      form.addEventListener('submit', this.onSubmitHandler.bind(this, config, form));
    }

    /**
     * Метод, осуществляющий валидацию данных из формы.
     * @param {object} data - объект, содержащий данные из формы
     * @return {boolean} статус валидации
     */
  }, {
    key: "validate",
    value: function validate(data) {
      var _this2 = this;
      var isValid = true;
      Object.entries(data).forEach(function (_ref) {
        var _ref2 = _slicedToArray(_ref, 2),
          key = _ref2[0],
          value = _ref2[1];
        switch (key) {
          case _this2.context.fields.email.name:
            isValid &= modules_ErrorMessage.validateFiled(validation.validateEMail(value), _this2.context.fields.email);
            break;
          case _this2.context.fields.password.name:
            isValid &= modules_ErrorMessage.validateFiled(validation.validatePassword(value), _this2.context.fields.password);
            break;
        }
      });
      return isValid;
    }
  }]);
  return LoginPage;
}(BasePage);

// EXTERNAL MODULE: ./public/src/pages/MainPage/MainPage.hbs
var MainPage_MainPage = __webpack_require__(718);
var MainPage_default = /*#__PURE__*/__webpack_require__.n(MainPage_MainPage);
// EXTERNAL MODULE: ./public/src/components/TopCategory/topCategory.hbs
var topCategory = __webpack_require__(450);
var topCategory_default = /*#__PURE__*/__webpack_require__.n(topCategory);
;// CONCATENATED MODULE: ./public/src/components/TopCategory/TopCategory.js
function TopCategory_typeof(obj) {
  "@babel/helpers - typeof";

  return TopCategory_typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) {
    return typeof obj;
  } : function (obj) {
    return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
  }, TopCategory_typeof(obj);
}
function TopCategory_ownKeys(object, enumerableOnly) {
  var keys = Object.keys(object);
  if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(object);
    enumerableOnly && (symbols = symbols.filter(function (sym) {
      return Object.getOwnPropertyDescriptor(object, sym).enumerable;
    })), keys.push.apply(keys, symbols);
  }
  return keys;
}
function TopCategory_objectSpread(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = null != arguments[i] ? arguments[i] : {};
    i % 2 ? TopCategory_ownKeys(Object(source), !0).forEach(function (key) {
      TopCategory_defineProperty(target, key, source[key]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : TopCategory_ownKeys(Object(source)).forEach(function (key) {
      Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
    });
  }
  return target;
}
function TopCategory_defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }
  return obj;
}
function TopCategory_classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}
function TopCategory_defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}
function TopCategory_createClass(Constructor, protoProps, staticProps) {
  if (protoProps) TopCategory_defineProperties(Constructor.prototype, protoProps);
  if (staticProps) TopCategory_defineProperties(Constructor, staticProps);
  Object.defineProperty(Constructor, "prototype", {
    writable: false
  });
  return Constructor;
}
function TopCategory_get() {
  if (typeof Reflect !== "undefined" && Reflect.get) {
    TopCategory_get = Reflect.get.bind();
  } else {
    TopCategory_get = function _get(target, property, receiver) {
      var base = TopCategory_superPropBase(target, property);
      if (!base) return;
      var desc = Object.getOwnPropertyDescriptor(base, property);
      if (desc.get) {
        return desc.get.call(arguments.length < 3 ? target : receiver);
      }
      return desc.value;
    };
  }
  return TopCategory_get.apply(this, arguments);
}
function TopCategory_superPropBase(object, property) {
  while (!Object.prototype.hasOwnProperty.call(object, property)) {
    object = TopCategory_getPrototypeOf(object);
    if (object === null) break;
  }
  return object;
}
function TopCategory_inherits(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function");
  }
  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      writable: true,
      configurable: true
    }
  });
  Object.defineProperty(subClass, "prototype", {
    writable: false
  });
  if (superClass) TopCategory_setPrototypeOf(subClass, superClass);
}
function TopCategory_setPrototypeOf(o, p) {
  TopCategory_setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) {
    o.__proto__ = p;
    return o;
  };
  return TopCategory_setPrototypeOf(o, p);
}
function TopCategory_createSuper(Derived) {
  var hasNativeReflectConstruct = TopCategory_isNativeReflectConstruct();
  return function _createSuperInternal() {
    var Super = TopCategory_getPrototypeOf(Derived),
      result;
    if (hasNativeReflectConstruct) {
      var NewTarget = TopCategory_getPrototypeOf(this).constructor;
      result = Reflect.construct(Super, arguments, NewTarget);
    } else {
      result = Super.apply(this, arguments);
    }
    return TopCategory_possibleConstructorReturn(this, result);
  };
}
function TopCategory_possibleConstructorReturn(self, call) {
  if (call && (TopCategory_typeof(call) === "object" || typeof call === "function")) {
    return call;
  } else if (call !== void 0) {
    throw new TypeError("Derived constructors may only return object or undefined");
  }
  return TopCategory_assertThisInitialized(self);
}
function TopCategory_assertThisInitialized(self) {
  if (self === void 0) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }
  return self;
}
function TopCategory_isNativeReflectConstruct() {
  if (typeof Reflect === "undefined" || !Reflect.construct) return false;
  if (Reflect.construct.sham) return false;
  if (typeof Proxy === "function") return true;
  try {
    Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {}));
    return true;
  } catch (e) {
    return false;
  }
}
function TopCategory_getPrototypeOf(o) {
  TopCategory_getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf(o) {
    return o.__proto__ || Object.getPrototypeOf(o);
  };
  return TopCategory_getPrototypeOf(o);
}




/**
 * Класс для реализации компонента TopCategory
 */
var TopCategory = /*#__PURE__*/function (_BaseComponent) {
  TopCategory_inherits(TopCategory, _BaseComponent);
  var _super = TopCategory_createSuper(TopCategory);
  /**
   * Конструктор, создающий класс компонента TopCategory
   * @param {Element} parent HTML-элемент, в который будет
   * осуществлена отрисовка
   */
  function TopCategory(parent) {
    TopCategory_classCallCheck(this, TopCategory);
    return _super.call(this, parent);
  }

  /**
   * Метод, отрисовывающий компонент в родительский HTML-элемент по заданному шаблону и контексту
   * @param {Object} context контекст отрисовки шаблона
   */
  TopCategory_createClass(TopCategory, [{
    key: "render",
    value: function render(context) {
      TopCategory_get(TopCategory_getPrototypeOf(TopCategory.prototype), "render", this).call(this, this.prepareRenderData(context), (topCategory_default()));
    }

    /**
     * Метод, подготавливавающий наполнение для формы, исходя из контекста
     * @param {Object} context контекст отрисовки шаблона
     * @return {Object} значение категории из контекста отрисовки
     */
  }, {
    key: "prepareRenderData",
    value: function prepareRenderData(context) {
      return {
        category: TopCategory_objectSpread({}, context)
      };
    }
  }]);
  return TopCategory;
}(BaseComponent);

// EXTERNAL MODULE: ./public/src/components/ItemCard/itemCard.hbs
var itemCard = __webpack_require__(96);
var itemCard_default = /*#__PURE__*/__webpack_require__.n(itemCard);
;// CONCATENATED MODULE: ./public/src/components/ItemCard/ItemCard.js
function ItemCard_typeof(obj) {
  "@babel/helpers - typeof";

  return ItemCard_typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) {
    return typeof obj;
  } : function (obj) {
    return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
  }, ItemCard_typeof(obj);
}
function ItemCard_classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}
function ItemCard_defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}
function ItemCard_createClass(Constructor, protoProps, staticProps) {
  if (protoProps) ItemCard_defineProperties(Constructor.prototype, protoProps);
  if (staticProps) ItemCard_defineProperties(Constructor, staticProps);
  Object.defineProperty(Constructor, "prototype", {
    writable: false
  });
  return Constructor;
}
function ItemCard_get() {
  if (typeof Reflect !== "undefined" && Reflect.get) {
    ItemCard_get = Reflect.get.bind();
  } else {
    ItemCard_get = function _get(target, property, receiver) {
      var base = ItemCard_superPropBase(target, property);
      if (!base) return;
      var desc = Object.getOwnPropertyDescriptor(base, property);
      if (desc.get) {
        return desc.get.call(arguments.length < 3 ? target : receiver);
      }
      return desc.value;
    };
  }
  return ItemCard_get.apply(this, arguments);
}
function ItemCard_superPropBase(object, property) {
  while (!Object.prototype.hasOwnProperty.call(object, property)) {
    object = ItemCard_getPrototypeOf(object);
    if (object === null) break;
  }
  return object;
}
function ItemCard_inherits(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function");
  }
  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      writable: true,
      configurable: true
    }
  });
  Object.defineProperty(subClass, "prototype", {
    writable: false
  });
  if (superClass) ItemCard_setPrototypeOf(subClass, superClass);
}
function ItemCard_setPrototypeOf(o, p) {
  ItemCard_setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) {
    o.__proto__ = p;
    return o;
  };
  return ItemCard_setPrototypeOf(o, p);
}
function ItemCard_createSuper(Derived) {
  var hasNativeReflectConstruct = ItemCard_isNativeReflectConstruct();
  return function _createSuperInternal() {
    var Super = ItemCard_getPrototypeOf(Derived),
      result;
    if (hasNativeReflectConstruct) {
      var NewTarget = ItemCard_getPrototypeOf(this).constructor;
      result = Reflect.construct(Super, arguments, NewTarget);
    } else {
      result = Super.apply(this, arguments);
    }
    return ItemCard_possibleConstructorReturn(this, result);
  };
}
function ItemCard_possibleConstructorReturn(self, call) {
  if (call && (ItemCard_typeof(call) === "object" || typeof call === "function")) {
    return call;
  } else if (call !== void 0) {
    throw new TypeError("Derived constructors may only return object or undefined");
  }
  return ItemCard_assertThisInitialized(self);
}
function ItemCard_assertThisInitialized(self) {
  if (self === void 0) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }
  return self;
}
function ItemCard_isNativeReflectConstruct() {
  if (typeof Reflect === "undefined" || !Reflect.construct) return false;
  if (Reflect.construct.sham) return false;
  if (typeof Proxy === "function") return true;
  try {
    Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {}));
    return true;
  } catch (e) {
    return false;
  }
}
function ItemCard_getPrototypeOf(o) {
  ItemCard_getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf(o) {
    return o.__proto__ || Object.getPrototypeOf(o);
  };
  return ItemCard_getPrototypeOf(o);
}




/**
 * Класс для реализации компонента ItemCard
 */
var ItemCard = /*#__PURE__*/function (_BaseComponent) {
  ItemCard_inherits(ItemCard, _BaseComponent);
  var _super = ItemCard_createSuper(ItemCard);
  /**
   * Конструктор, создающий класс компонента ItemCard
   * @param {Element} parent HTML-элемент, в который будет
   * осуществлена отрисовка
   */
  function ItemCard(parent) {
    ItemCard_classCallCheck(this, ItemCard);
    return _super.call(this, parent);
  }

  /**
   * Метод, отрисовывающий компонент в родительский HTML-элемент по заданному шаблону и контексту
   * @param {Object} context контекст отрисовки шаблона
   */
  ItemCard_createClass(ItemCard, [{
    key: "render",
    value: function render(context) {
      ItemCard_get(ItemCard_getPrototypeOf(ItemCard.prototype), "render", this).call(this, context, (itemCard_default()));
    }
  }]);
  return ItemCard;
}(BaseComponent);

;// CONCATENATED MODULE: ./public/src/pages/MainPage/MainPage.js
function MainPage_typeof(obj) {
  "@babel/helpers - typeof";

  return MainPage_typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) {
    return typeof obj;
  } : function (obj) {
    return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
  }, MainPage_typeof(obj);
}
function MainPage_regeneratorRuntime() {
  "use strict";

  /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */
  MainPage_regeneratorRuntime = function _regeneratorRuntime() {
    return exports;
  };
  var exports = {},
    Op = Object.prototype,
    hasOwn = Op.hasOwnProperty,
    defineProperty = Object.defineProperty || function (obj, key, desc) {
      obj[key] = desc.value;
    },
    $Symbol = "function" == typeof Symbol ? Symbol : {},
    iteratorSymbol = $Symbol.iterator || "@@iterator",
    asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator",
    toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag";
  function define(obj, key, value) {
    return Object.defineProperty(obj, key, {
      value: value,
      enumerable: !0,
      configurable: !0,
      writable: !0
    }), obj[key];
  }
  try {
    define({}, "");
  } catch (err) {
    define = function define(obj, key, value) {
      return obj[key] = value;
    };
  }
  function wrap(innerFn, outerFn, self, tryLocsList) {
    var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator,
      generator = Object.create(protoGenerator.prototype),
      context = new Context(tryLocsList || []);
    return defineProperty(generator, "_invoke", {
      value: makeInvokeMethod(innerFn, self, context)
    }), generator;
  }
  function tryCatch(fn, obj, arg) {
    try {
      return {
        type: "normal",
        arg: fn.call(obj, arg)
      };
    } catch (err) {
      return {
        type: "throw",
        arg: err
      };
    }
  }
  exports.wrap = wrap;
  var ContinueSentinel = {};
  function Generator() {}
  function GeneratorFunction() {}
  function GeneratorFunctionPrototype() {}
  var IteratorPrototype = {};
  define(IteratorPrototype, iteratorSymbol, function () {
    return this;
  });
  var getProto = Object.getPrototypeOf,
    NativeIteratorPrototype = getProto && getProto(getProto(values([])));
  NativeIteratorPrototype && NativeIteratorPrototype !== Op && hasOwn.call(NativeIteratorPrototype, iteratorSymbol) && (IteratorPrototype = NativeIteratorPrototype);
  var Gp = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(IteratorPrototype);
  function defineIteratorMethods(prototype) {
    ["next", "throw", "return"].forEach(function (method) {
      define(prototype, method, function (arg) {
        return this._invoke(method, arg);
      });
    });
  }
  function AsyncIterator(generator, PromiseImpl) {
    function invoke(method, arg, resolve, reject) {
      var record = tryCatch(generator[method], generator, arg);
      if ("throw" !== record.type) {
        var result = record.arg,
          value = result.value;
        return value && "object" == MainPage_typeof(value) && hasOwn.call(value, "__await") ? PromiseImpl.resolve(value.__await).then(function (value) {
          invoke("next", value, resolve, reject);
        }, function (err) {
          invoke("throw", err, resolve, reject);
        }) : PromiseImpl.resolve(value).then(function (unwrapped) {
          result.value = unwrapped, resolve(result);
        }, function (error) {
          return invoke("throw", error, resolve, reject);
        });
      }
      reject(record.arg);
    }
    var previousPromise;
    defineProperty(this, "_invoke", {
      value: function value(method, arg) {
        function callInvokeWithMethodAndArg() {
          return new PromiseImpl(function (resolve, reject) {
            invoke(method, arg, resolve, reject);
          });
        }
        return previousPromise = previousPromise ? previousPromise.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg();
      }
    });
  }
  function makeInvokeMethod(innerFn, self, context) {
    var state = "suspendedStart";
    return function (method, arg) {
      if ("executing" === state) throw new Error("Generator is already running");
      if ("completed" === state) {
        if ("throw" === method) throw arg;
        return doneResult();
      }
      for (context.method = method, context.arg = arg;;) {
        var delegate = context.delegate;
        if (delegate) {
          var delegateResult = maybeInvokeDelegate(delegate, context);
          if (delegateResult) {
            if (delegateResult === ContinueSentinel) continue;
            return delegateResult;
          }
        }
        if ("next" === context.method) context.sent = context._sent = context.arg;else if ("throw" === context.method) {
          if ("suspendedStart" === state) throw state = "completed", context.arg;
          context.dispatchException(context.arg);
        } else "return" === context.method && context.abrupt("return", context.arg);
        state = "executing";
        var record = tryCatch(innerFn, self, context);
        if ("normal" === record.type) {
          if (state = context.done ? "completed" : "suspendedYield", record.arg === ContinueSentinel) continue;
          return {
            value: record.arg,
            done: context.done
          };
        }
        "throw" === record.type && (state = "completed", context.method = "throw", context.arg = record.arg);
      }
    };
  }
  function maybeInvokeDelegate(delegate, context) {
    var method = delegate.iterator[context.method];
    if (undefined === method) {
      if (context.delegate = null, "throw" === context.method) {
        if (delegate.iterator["return"] && (context.method = "return", context.arg = undefined, maybeInvokeDelegate(delegate, context), "throw" === context.method)) return ContinueSentinel;
        context.method = "throw", context.arg = new TypeError("The iterator does not provide a 'throw' method");
      }
      return ContinueSentinel;
    }
    var record = tryCatch(method, delegate.iterator, context.arg);
    if ("throw" === record.type) return context.method = "throw", context.arg = record.arg, context.delegate = null, ContinueSentinel;
    var info = record.arg;
    return info ? info.done ? (context[delegate.resultName] = info.value, context.next = delegate.nextLoc, "return" !== context.method && (context.method = "next", context.arg = undefined), context.delegate = null, ContinueSentinel) : info : (context.method = "throw", context.arg = new TypeError("iterator result is not an object"), context.delegate = null, ContinueSentinel);
  }
  function pushTryEntry(locs) {
    var entry = {
      tryLoc: locs[0]
    };
    1 in locs && (entry.catchLoc = locs[1]), 2 in locs && (entry.finallyLoc = locs[2], entry.afterLoc = locs[3]), this.tryEntries.push(entry);
  }
  function resetTryEntry(entry) {
    var record = entry.completion || {};
    record.type = "normal", delete record.arg, entry.completion = record;
  }
  function Context(tryLocsList) {
    this.tryEntries = [{
      tryLoc: "root"
    }], tryLocsList.forEach(pushTryEntry, this), this.reset(!0);
  }
  function values(iterable) {
    if (iterable) {
      var iteratorMethod = iterable[iteratorSymbol];
      if (iteratorMethod) return iteratorMethod.call(iterable);
      if ("function" == typeof iterable.next) return iterable;
      if (!isNaN(iterable.length)) {
        var i = -1,
          next = function next() {
            for (; ++i < iterable.length;) {
              if (hasOwn.call(iterable, i)) return next.value = iterable[i], next.done = !1, next;
            }
            return next.value = undefined, next.done = !0, next;
          };
        return next.next = next;
      }
    }
    return {
      next: doneResult
    };
  }
  function doneResult() {
    return {
      value: undefined,
      done: !0
    };
  }
  return GeneratorFunction.prototype = GeneratorFunctionPrototype, defineProperty(Gp, "constructor", {
    value: GeneratorFunctionPrototype,
    configurable: !0
  }), defineProperty(GeneratorFunctionPrototype, "constructor", {
    value: GeneratorFunction,
    configurable: !0
  }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, toStringTagSymbol, "GeneratorFunction"), exports.isGeneratorFunction = function (genFun) {
    var ctor = "function" == typeof genFun && genFun.constructor;
    return !!ctor && (ctor === GeneratorFunction || "GeneratorFunction" === (ctor.displayName || ctor.name));
  }, exports.mark = function (genFun) {
    return Object.setPrototypeOf ? Object.setPrototypeOf(genFun, GeneratorFunctionPrototype) : (genFun.__proto__ = GeneratorFunctionPrototype, define(genFun, toStringTagSymbol, "GeneratorFunction")), genFun.prototype = Object.create(Gp), genFun;
  }, exports.awrap = function (arg) {
    return {
      __await: arg
    };
  }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, asyncIteratorSymbol, function () {
    return this;
  }), exports.AsyncIterator = AsyncIterator, exports.async = function (innerFn, outerFn, self, tryLocsList, PromiseImpl) {
    void 0 === PromiseImpl && (PromiseImpl = Promise);
    var iter = new AsyncIterator(wrap(innerFn, outerFn, self, tryLocsList), PromiseImpl);
    return exports.isGeneratorFunction(outerFn) ? iter : iter.next().then(function (result) {
      return result.done ? result.value : iter.next();
    });
  }, defineIteratorMethods(Gp), define(Gp, toStringTagSymbol, "Generator"), define(Gp, iteratorSymbol, function () {
    return this;
  }), define(Gp, "toString", function () {
    return "[object Generator]";
  }), exports.keys = function (val) {
    var object = Object(val),
      keys = [];
    for (var key in object) {
      keys.push(key);
    }
    return keys.reverse(), function next() {
      for (; keys.length;) {
        var key = keys.pop();
        if (key in object) return next.value = key, next.done = !1, next;
      }
      return next.done = !0, next;
    };
  }, exports.values = values, Context.prototype = {
    constructor: Context,
    reset: function reset(skipTempReset) {
      if (this.prev = 0, this.next = 0, this.sent = this._sent = undefined, this.done = !1, this.delegate = null, this.method = "next", this.arg = undefined, this.tryEntries.forEach(resetTryEntry), !skipTempReset) for (var name in this) {
        "t" === name.charAt(0) && hasOwn.call(this, name) && !isNaN(+name.slice(1)) && (this[name] = undefined);
      }
    },
    stop: function stop() {
      this.done = !0;
      var rootRecord = this.tryEntries[0].completion;
      if ("throw" === rootRecord.type) throw rootRecord.arg;
      return this.rval;
    },
    dispatchException: function dispatchException(exception) {
      if (this.done) throw exception;
      var context = this;
      function handle(loc, caught) {
        return record.type = "throw", record.arg = exception, context.next = loc, caught && (context.method = "next", context.arg = undefined), !!caught;
      }
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i],
          record = entry.completion;
        if ("root" === entry.tryLoc) return handle("end");
        if (entry.tryLoc <= this.prev) {
          var hasCatch = hasOwn.call(entry, "catchLoc"),
            hasFinally = hasOwn.call(entry, "finallyLoc");
          if (hasCatch && hasFinally) {
            if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0);
            if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc);
          } else if (hasCatch) {
            if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0);
          } else {
            if (!hasFinally) throw new Error("try statement without catch or finally");
            if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc);
          }
        }
      }
    },
    abrupt: function abrupt(type, arg) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.tryLoc <= this.prev && hasOwn.call(entry, "finallyLoc") && this.prev < entry.finallyLoc) {
          var finallyEntry = entry;
          break;
        }
      }
      finallyEntry && ("break" === type || "continue" === type) && finallyEntry.tryLoc <= arg && arg <= finallyEntry.finallyLoc && (finallyEntry = null);
      var record = finallyEntry ? finallyEntry.completion : {};
      return record.type = type, record.arg = arg, finallyEntry ? (this.method = "next", this.next = finallyEntry.finallyLoc, ContinueSentinel) : this.complete(record);
    },
    complete: function complete(record, afterLoc) {
      if ("throw" === record.type) throw record.arg;
      return "break" === record.type || "continue" === record.type ? this.next = record.arg : "return" === record.type ? (this.rval = this.arg = record.arg, this.method = "return", this.next = "end") : "normal" === record.type && afterLoc && (this.next = afterLoc), ContinueSentinel;
    },
    finish: function finish(finallyLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.finallyLoc === finallyLoc) return this.complete(entry.completion, entry.afterLoc), resetTryEntry(entry), ContinueSentinel;
      }
    },
    "catch": function _catch(tryLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.tryLoc === tryLoc) {
          var record = entry.completion;
          if ("throw" === record.type) {
            var thrown = record.arg;
            resetTryEntry(entry);
          }
          return thrown;
        }
      }
      throw new Error("illegal catch attempt");
    },
    delegateYield: function delegateYield(iterable, resultName, nextLoc) {
      return this.delegate = {
        iterator: values(iterable),
        resultName: resultName,
        nextLoc: nextLoc
      }, "next" === this.method && (this.arg = undefined), ContinueSentinel;
    }
  }, exports;
}
function MainPage_slicedToArray(arr, i) {
  return MainPage_arrayWithHoles(arr) || MainPage_iterableToArrayLimit(arr, i) || MainPage_unsupportedIterableToArray(arr, i) || MainPage_nonIterableRest();
}
function MainPage_nonIterableRest() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function MainPage_unsupportedIterableToArray(o, minLen) {
  if (!o) return;
  if (typeof o === "string") return MainPage_arrayLikeToArray(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return MainPage_arrayLikeToArray(o, minLen);
}
function MainPage_arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length) len = arr.length;
  for (var i = 0, arr2 = new Array(len); i < len; i++) {
    arr2[i] = arr[i];
  }
  return arr2;
}
function MainPage_iterableToArrayLimit(arr, i) {
  var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"];
  if (_i == null) return;
  var _arr = [];
  var _n = true;
  var _d = false;
  var _s, _e;
  try {
    for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) {
      _arr.push(_s.value);
      if (i && _arr.length === i) break;
    }
  } catch (err) {
    _d = true;
    _e = err;
  } finally {
    try {
      if (!_n && _i["return"] != null) _i["return"]();
    } finally {
      if (_d) throw _e;
    }
  }
  return _arr;
}
function MainPage_arrayWithHoles(arr) {
  if (Array.isArray(arr)) return arr;
}
function MainPage_asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {
  try {
    var info = gen[key](arg);
    var value = info.value;
  } catch (error) {
    reject(error);
    return;
  }
  if (info.done) {
    resolve(value);
  } else {
    Promise.resolve(value).then(_next, _throw);
  }
}
function MainPage_asyncToGenerator(fn) {
  return function () {
    var self = this,
      args = arguments;
    return new Promise(function (resolve, reject) {
      var gen = fn.apply(self, args);
      function _next(value) {
        MainPage_asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);
      }
      function _throw(err) {
        MainPage_asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);
      }
      _next(undefined);
    });
  };
}
function MainPage_classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}
function MainPage_defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}
function MainPage_createClass(Constructor, protoProps, staticProps) {
  if (protoProps) MainPage_defineProperties(Constructor.prototype, protoProps);
  if (staticProps) MainPage_defineProperties(Constructor, staticProps);
  Object.defineProperty(Constructor, "prototype", {
    writable: false
  });
  return Constructor;
}
function MainPage_get() {
  if (typeof Reflect !== "undefined" && Reflect.get) {
    MainPage_get = Reflect.get.bind();
  } else {
    MainPage_get = function _get(target, property, receiver) {
      var base = MainPage_superPropBase(target, property);
      if (!base) return;
      var desc = Object.getOwnPropertyDescriptor(base, property);
      if (desc.get) {
        return desc.get.call(arguments.length < 3 ? target : receiver);
      }
      return desc.value;
    };
  }
  return MainPage_get.apply(this, arguments);
}
function MainPage_superPropBase(object, property) {
  while (!Object.prototype.hasOwnProperty.call(object, property)) {
    object = MainPage_getPrototypeOf(object);
    if (object === null) break;
  }
  return object;
}
function MainPage_inherits(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function");
  }
  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      writable: true,
      configurable: true
    }
  });
  Object.defineProperty(subClass, "prototype", {
    writable: false
  });
  if (superClass) MainPage_setPrototypeOf(subClass, superClass);
}
function MainPage_setPrototypeOf(o, p) {
  MainPage_setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) {
    o.__proto__ = p;
    return o;
  };
  return MainPage_setPrototypeOf(o, p);
}
function MainPage_createSuper(Derived) {
  var hasNativeReflectConstruct = MainPage_isNativeReflectConstruct();
  return function _createSuperInternal() {
    var Super = MainPage_getPrototypeOf(Derived),
      result;
    if (hasNativeReflectConstruct) {
      var NewTarget = MainPage_getPrototypeOf(this).constructor;
      result = Reflect.construct(Super, arguments, NewTarget);
    } else {
      result = Super.apply(this, arguments);
    }
    return MainPage_possibleConstructorReturn(this, result);
  };
}
function MainPage_possibleConstructorReturn(self, call) {
  if (call && (MainPage_typeof(call) === "object" || typeof call === "function")) {
    return call;
  } else if (call !== void 0) {
    throw new TypeError("Derived constructors may only return object or undefined");
  }
  return MainPage_assertThisInitialized(self);
}
function MainPage_assertThisInitialized(self) {
  if (self === void 0) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }
  return self;
}
function MainPage_isNativeReflectConstruct() {
  if (typeof Reflect === "undefined" || !Reflect.construct) return false;
  if (Reflect.construct.sham) return false;
  if (typeof Proxy === "function") return true;
  try {
    Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {}));
    return true;
  } catch (e) {
    return false;
  }
}
function MainPage_getPrototypeOf(o) {
  MainPage_getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf(o) {
    return o.__proto__ || Object.getPrototypeOf(o);
  };
  return MainPage_getPrototypeOf(o);
}
function MainPage_classPrivateFieldInitSpec(obj, privateMap, value) {
  MainPage_checkPrivateRedeclaration(obj, privateMap);
  privateMap.set(obj, value);
}
function MainPage_checkPrivateRedeclaration(obj, privateCollection) {
  if (privateCollection.has(obj)) {
    throw new TypeError("Cannot initialize the same private elements twice on an object");
  }
}
function MainPage_classPrivateFieldGet(receiver, privateMap) {
  var descriptor = MainPage_classExtractFieldDescriptor(receiver, privateMap, "get");
  return MainPage_classApplyDescriptorGet(receiver, descriptor);
}
function MainPage_classExtractFieldDescriptor(receiver, privateMap, action) {
  if (!privateMap.has(receiver)) {
    throw new TypeError("attempted to " + action + " private field on non-instance");
  }
  return privateMap.get(receiver);
}
function MainPage_classApplyDescriptorGet(receiver, descriptor) {
  if (descriptor.get) {
    return descriptor.get.call(receiver);
  }
  return descriptor.value;
}







/**
 * Класс, реализующий главную страницу
 */
var _topCategory = /*#__PURE__*/new WeakMap();
var MainPage = /*#__PURE__*/function (_BasePage) {
  MainPage_inherits(MainPage, _BasePage);
  var _super = MainPage_createSuper(MainPage);
  /**
   * Конструктор, создающий конструктор базовой страницы с нужными параметрами
   * @param {Element} parent HTML-элемент, в который будет осуществлена отрисовка
   */
  function MainPage(parent) {
    var _this;
    MainPage_classCallCheck(this, MainPage);
    _this = _super.call(this, parent, (MainPage_default()));
    MainPage_classPrivateFieldInitSpec(MainPage_assertThisInitialized(_this), _topCategory, {
      writable: true,
      value: {
        Smartphone: {
          nameCategory: 'Телефоны',
          img: './img/Smartphone.png'
        },
        Computer: {
          nameCategory: 'Компьютеры',
          img: './img/Computer.png'
        },
        Headphones: {
          nameCategory: 'Наушники',
          img: './img/Headphones.png'
        },
        TV: {
          nameCategory: 'Телевизоры',
          img: './img/TV.png'
        },
        Watch: {
          nameCategory: 'Часы',
          img: './img/Watch.png'
        },
        Tablet: {
          nameCategory: 'Планшеты',
          img: './img/Tablet.png'
        },
        Accessories: {
          nameCategory: 'Аксессуары',
          img: './img/Accessories.png'
        }
      }
    });
    return _this;
  }

  /**
   * Метод, загружающий карты.
   * @param {string} classToGet имя класса, в который надо вставить карту
   * @param {string} reqPath путь для api запроса к беку
   */
  MainPage_createClass(MainPage, [{
    key: "loadCards",
    value: function () {
      var _loadCards = MainPage_asyncToGenerator( /*#__PURE__*/MainPage_regeneratorRuntime().mark(function _callee(classToGet, reqPath) {
        var _this2 = this;
        var _yield$request$makeGe, _yield$request$makeGe2, status, outD, rootElement, itemCards, div, span;
        return MainPage_regeneratorRuntime().wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return ajax.makeGetRequest(reqPath)["catch"](function (err) {
                  return console.log(err);
                });
              case 2:
                _yield$request$makeGe = _context.sent;
                _yield$request$makeGe2 = MainPage_slicedToArray(_yield$request$makeGe, 2);
                status = _yield$request$makeGe2[0];
                outD = _yield$request$makeGe2[1];
                rootElement = document.getElementById(classToGet + '__right-arrow');
                if (status === 200) {
                  itemCards = outD.body;
                  itemCards.forEach(function (card, num) {
                    var discount = null;
                    card.price === card.lowprice ? card.price = discount : discount = 100 - Math.round(card.lowprice / card.price * 100);
                    var newCard = {
                      imgsrc: card.imgsrc,
                      discount: discount,
                      price: card.lowprice,
                      salePrice: card.price,
                      cardTitle: card.name,
                      rating: card.rating
                    };
                    /* creating div to add */
                    var cardElement = document.createElement('div');
                    cardElement.id = "".concat(classToGet).concat(String(num));
                    cardElement.classList.add('item-card');
                    rootElement.before(cardElement);
                    /* rendering card itself */
                    _this2.itemCard = new ItemCard(cardElement);
                    _this2.itemCard.render(newCard);
                  });
                } else if (!document.getElementById('ServerLoadError')) {
                  div = document.createElement('div');
                  div.id = 'ServerLoadError';
                  span = document.createElement('span');
                  div.appendChild(span);
                  div.classList.add('server-error');
                  span.classList.add('server-error__text');
                  span.innerHTML = 'Возникла ошибка при загрузке товаров. Попробуйте позже';
                  document.getElementById('catalog').after(div);
                }
              case 8:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }));
      function loadCards(_x, _x2) {
        return _loadCards.apply(this, arguments);
      }
      return loadCards;
    }()
    /**
     * Метод, отрисовывающий страницу.
     * @param {object} config контекст отрисовки страницы
     */
  }, {
    key: "render",
    value: function () {
      var _render = MainPage_asyncToGenerator( /*#__PURE__*/MainPage_regeneratorRuntime().mark(function _callee2(config) {
        return MainPage_regeneratorRuntime().wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                MainPage_get(MainPage_getPrototypeOf(MainPage.prototype), "render", this).call(this, config);
                this.topComponent = new TopCategory(document.getElementById('catalog'));
                this.topComponent.render(MainPage_classPrivateFieldGet(this, _topCategory));
                _context2.next = 5;
                return this.loadCards('salesCard', config.api.products);
              case 5:
                _context2.next = 7;
                return this.loadCards('popularCard', config.api.products);
              case 7:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));
      function render(_x3) {
        return _render.apply(this, arguments);
      }
      return render;
    }()
  }]);
  return MainPage;
}(BasePage);

// EXTERNAL MODULE: ./public/src/pages/RegisterPage/RegisterPage.hbs
var RegisterPage_RegisterPage = __webpack_require__(124);
var RegisterPage_default = /*#__PURE__*/__webpack_require__.n(RegisterPage_RegisterPage);
;// CONCATENATED MODULE: ./public/src/pages/RegisterPage/RegisterPage.js
function RegisterPage_typeof(obj) {
  "@babel/helpers - typeof";

  return RegisterPage_typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) {
    return typeof obj;
  } : function (obj) {
    return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
  }, RegisterPage_typeof(obj);
}
function RegisterPage_slicedToArray(arr, i) {
  return RegisterPage_arrayWithHoles(arr) || RegisterPage_iterableToArrayLimit(arr, i) || RegisterPage_unsupportedIterableToArray(arr, i) || RegisterPage_nonIterableRest();
}
function RegisterPage_nonIterableRest() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function RegisterPage_unsupportedIterableToArray(o, minLen) {
  if (!o) return;
  if (typeof o === "string") return RegisterPage_arrayLikeToArray(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return RegisterPage_arrayLikeToArray(o, minLen);
}
function RegisterPage_arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length) len = arr.length;
  for (var i = 0, arr2 = new Array(len); i < len; i++) {
    arr2[i] = arr[i];
  }
  return arr2;
}
function RegisterPage_iterableToArrayLimit(arr, i) {
  var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"];
  if (_i == null) return;
  var _arr = [];
  var _n = true;
  var _d = false;
  var _s, _e;
  try {
    for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) {
      _arr.push(_s.value);
      if (i && _arr.length === i) break;
    }
  } catch (err) {
    _d = true;
    _e = err;
  } finally {
    try {
      if (!_n && _i["return"] != null) _i["return"]();
    } finally {
      if (_d) throw _e;
    }
  }
  return _arr;
}
function RegisterPage_arrayWithHoles(arr) {
  if (Array.isArray(arr)) return arr;
}
function RegisterPage_regeneratorRuntime() {
  "use strict";

  /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */
  RegisterPage_regeneratorRuntime = function _regeneratorRuntime() {
    return exports;
  };
  var exports = {},
    Op = Object.prototype,
    hasOwn = Op.hasOwnProperty,
    defineProperty = Object.defineProperty || function (obj, key, desc) {
      obj[key] = desc.value;
    },
    $Symbol = "function" == typeof Symbol ? Symbol : {},
    iteratorSymbol = $Symbol.iterator || "@@iterator",
    asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator",
    toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag";
  function define(obj, key, value) {
    return Object.defineProperty(obj, key, {
      value: value,
      enumerable: !0,
      configurable: !0,
      writable: !0
    }), obj[key];
  }
  try {
    define({}, "");
  } catch (err) {
    define = function define(obj, key, value) {
      return obj[key] = value;
    };
  }
  function wrap(innerFn, outerFn, self, tryLocsList) {
    var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator,
      generator = Object.create(protoGenerator.prototype),
      context = new Context(tryLocsList || []);
    return defineProperty(generator, "_invoke", {
      value: makeInvokeMethod(innerFn, self, context)
    }), generator;
  }
  function tryCatch(fn, obj, arg) {
    try {
      return {
        type: "normal",
        arg: fn.call(obj, arg)
      };
    } catch (err) {
      return {
        type: "throw",
        arg: err
      };
    }
  }
  exports.wrap = wrap;
  var ContinueSentinel = {};
  function Generator() {}
  function GeneratorFunction() {}
  function GeneratorFunctionPrototype() {}
  var IteratorPrototype = {};
  define(IteratorPrototype, iteratorSymbol, function () {
    return this;
  });
  var getProto = Object.getPrototypeOf,
    NativeIteratorPrototype = getProto && getProto(getProto(values([])));
  NativeIteratorPrototype && NativeIteratorPrototype !== Op && hasOwn.call(NativeIteratorPrototype, iteratorSymbol) && (IteratorPrototype = NativeIteratorPrototype);
  var Gp = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(IteratorPrototype);
  function defineIteratorMethods(prototype) {
    ["next", "throw", "return"].forEach(function (method) {
      define(prototype, method, function (arg) {
        return this._invoke(method, arg);
      });
    });
  }
  function AsyncIterator(generator, PromiseImpl) {
    function invoke(method, arg, resolve, reject) {
      var record = tryCatch(generator[method], generator, arg);
      if ("throw" !== record.type) {
        var result = record.arg,
          value = result.value;
        return value && "object" == RegisterPage_typeof(value) && hasOwn.call(value, "__await") ? PromiseImpl.resolve(value.__await).then(function (value) {
          invoke("next", value, resolve, reject);
        }, function (err) {
          invoke("throw", err, resolve, reject);
        }) : PromiseImpl.resolve(value).then(function (unwrapped) {
          result.value = unwrapped, resolve(result);
        }, function (error) {
          return invoke("throw", error, resolve, reject);
        });
      }
      reject(record.arg);
    }
    var previousPromise;
    defineProperty(this, "_invoke", {
      value: function value(method, arg) {
        function callInvokeWithMethodAndArg() {
          return new PromiseImpl(function (resolve, reject) {
            invoke(method, arg, resolve, reject);
          });
        }
        return previousPromise = previousPromise ? previousPromise.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg();
      }
    });
  }
  function makeInvokeMethod(innerFn, self, context) {
    var state = "suspendedStart";
    return function (method, arg) {
      if ("executing" === state) throw new Error("Generator is already running");
      if ("completed" === state) {
        if ("throw" === method) throw arg;
        return doneResult();
      }
      for (context.method = method, context.arg = arg;;) {
        var delegate = context.delegate;
        if (delegate) {
          var delegateResult = maybeInvokeDelegate(delegate, context);
          if (delegateResult) {
            if (delegateResult === ContinueSentinel) continue;
            return delegateResult;
          }
        }
        if ("next" === context.method) context.sent = context._sent = context.arg;else if ("throw" === context.method) {
          if ("suspendedStart" === state) throw state = "completed", context.arg;
          context.dispatchException(context.arg);
        } else "return" === context.method && context.abrupt("return", context.arg);
        state = "executing";
        var record = tryCatch(innerFn, self, context);
        if ("normal" === record.type) {
          if (state = context.done ? "completed" : "suspendedYield", record.arg === ContinueSentinel) continue;
          return {
            value: record.arg,
            done: context.done
          };
        }
        "throw" === record.type && (state = "completed", context.method = "throw", context.arg = record.arg);
      }
    };
  }
  function maybeInvokeDelegate(delegate, context) {
    var method = delegate.iterator[context.method];
    if (undefined === method) {
      if (context.delegate = null, "throw" === context.method) {
        if (delegate.iterator["return"] && (context.method = "return", context.arg = undefined, maybeInvokeDelegate(delegate, context), "throw" === context.method)) return ContinueSentinel;
        context.method = "throw", context.arg = new TypeError("The iterator does not provide a 'throw' method");
      }
      return ContinueSentinel;
    }
    var record = tryCatch(method, delegate.iterator, context.arg);
    if ("throw" === record.type) return context.method = "throw", context.arg = record.arg, context.delegate = null, ContinueSentinel;
    var info = record.arg;
    return info ? info.done ? (context[delegate.resultName] = info.value, context.next = delegate.nextLoc, "return" !== context.method && (context.method = "next", context.arg = undefined), context.delegate = null, ContinueSentinel) : info : (context.method = "throw", context.arg = new TypeError("iterator result is not an object"), context.delegate = null, ContinueSentinel);
  }
  function pushTryEntry(locs) {
    var entry = {
      tryLoc: locs[0]
    };
    1 in locs && (entry.catchLoc = locs[1]), 2 in locs && (entry.finallyLoc = locs[2], entry.afterLoc = locs[3]), this.tryEntries.push(entry);
  }
  function resetTryEntry(entry) {
    var record = entry.completion || {};
    record.type = "normal", delete record.arg, entry.completion = record;
  }
  function Context(tryLocsList) {
    this.tryEntries = [{
      tryLoc: "root"
    }], tryLocsList.forEach(pushTryEntry, this), this.reset(!0);
  }
  function values(iterable) {
    if (iterable) {
      var iteratorMethod = iterable[iteratorSymbol];
      if (iteratorMethod) return iteratorMethod.call(iterable);
      if ("function" == typeof iterable.next) return iterable;
      if (!isNaN(iterable.length)) {
        var i = -1,
          next = function next() {
            for (; ++i < iterable.length;) {
              if (hasOwn.call(iterable, i)) return next.value = iterable[i], next.done = !1, next;
            }
            return next.value = undefined, next.done = !0, next;
          };
        return next.next = next;
      }
    }
    return {
      next: doneResult
    };
  }
  function doneResult() {
    return {
      value: undefined,
      done: !0
    };
  }
  return GeneratorFunction.prototype = GeneratorFunctionPrototype, defineProperty(Gp, "constructor", {
    value: GeneratorFunctionPrototype,
    configurable: !0
  }), defineProperty(GeneratorFunctionPrototype, "constructor", {
    value: GeneratorFunction,
    configurable: !0
  }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, toStringTagSymbol, "GeneratorFunction"), exports.isGeneratorFunction = function (genFun) {
    var ctor = "function" == typeof genFun && genFun.constructor;
    return !!ctor && (ctor === GeneratorFunction || "GeneratorFunction" === (ctor.displayName || ctor.name));
  }, exports.mark = function (genFun) {
    return Object.setPrototypeOf ? Object.setPrototypeOf(genFun, GeneratorFunctionPrototype) : (genFun.__proto__ = GeneratorFunctionPrototype, define(genFun, toStringTagSymbol, "GeneratorFunction")), genFun.prototype = Object.create(Gp), genFun;
  }, exports.awrap = function (arg) {
    return {
      __await: arg
    };
  }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, asyncIteratorSymbol, function () {
    return this;
  }), exports.AsyncIterator = AsyncIterator, exports.async = function (innerFn, outerFn, self, tryLocsList, PromiseImpl) {
    void 0 === PromiseImpl && (PromiseImpl = Promise);
    var iter = new AsyncIterator(wrap(innerFn, outerFn, self, tryLocsList), PromiseImpl);
    return exports.isGeneratorFunction(outerFn) ? iter : iter.next().then(function (result) {
      return result.done ? result.value : iter.next();
    });
  }, defineIteratorMethods(Gp), define(Gp, toStringTagSymbol, "Generator"), define(Gp, iteratorSymbol, function () {
    return this;
  }), define(Gp, "toString", function () {
    return "[object Generator]";
  }), exports.keys = function (val) {
    var object = Object(val),
      keys = [];
    for (var key in object) {
      keys.push(key);
    }
    return keys.reverse(), function next() {
      for (; keys.length;) {
        var key = keys.pop();
        if (key in object) return next.value = key, next.done = !1, next;
      }
      return next.done = !0, next;
    };
  }, exports.values = values, Context.prototype = {
    constructor: Context,
    reset: function reset(skipTempReset) {
      if (this.prev = 0, this.next = 0, this.sent = this._sent = undefined, this.done = !1, this.delegate = null, this.method = "next", this.arg = undefined, this.tryEntries.forEach(resetTryEntry), !skipTempReset) for (var name in this) {
        "t" === name.charAt(0) && hasOwn.call(this, name) && !isNaN(+name.slice(1)) && (this[name] = undefined);
      }
    },
    stop: function stop() {
      this.done = !0;
      var rootRecord = this.tryEntries[0].completion;
      if ("throw" === rootRecord.type) throw rootRecord.arg;
      return this.rval;
    },
    dispatchException: function dispatchException(exception) {
      if (this.done) throw exception;
      var context = this;
      function handle(loc, caught) {
        return record.type = "throw", record.arg = exception, context.next = loc, caught && (context.method = "next", context.arg = undefined), !!caught;
      }
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i],
          record = entry.completion;
        if ("root" === entry.tryLoc) return handle("end");
        if (entry.tryLoc <= this.prev) {
          var hasCatch = hasOwn.call(entry, "catchLoc"),
            hasFinally = hasOwn.call(entry, "finallyLoc");
          if (hasCatch && hasFinally) {
            if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0);
            if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc);
          } else if (hasCatch) {
            if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0);
          } else {
            if (!hasFinally) throw new Error("try statement without catch or finally");
            if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc);
          }
        }
      }
    },
    abrupt: function abrupt(type, arg) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.tryLoc <= this.prev && hasOwn.call(entry, "finallyLoc") && this.prev < entry.finallyLoc) {
          var finallyEntry = entry;
          break;
        }
      }
      finallyEntry && ("break" === type || "continue" === type) && finallyEntry.tryLoc <= arg && arg <= finallyEntry.finallyLoc && (finallyEntry = null);
      var record = finallyEntry ? finallyEntry.completion : {};
      return record.type = type, record.arg = arg, finallyEntry ? (this.method = "next", this.next = finallyEntry.finallyLoc, ContinueSentinel) : this.complete(record);
    },
    complete: function complete(record, afterLoc) {
      if ("throw" === record.type) throw record.arg;
      return "break" === record.type || "continue" === record.type ? this.next = record.arg : "return" === record.type ? (this.rval = this.arg = record.arg, this.method = "return", this.next = "end") : "normal" === record.type && afterLoc && (this.next = afterLoc), ContinueSentinel;
    },
    finish: function finish(finallyLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.finallyLoc === finallyLoc) return this.complete(entry.completion, entry.afterLoc), resetTryEntry(entry), ContinueSentinel;
      }
    },
    "catch": function _catch(tryLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.tryLoc === tryLoc) {
          var record = entry.completion;
          if ("throw" === record.type) {
            var thrown = record.arg;
            resetTryEntry(entry);
          }
          return thrown;
        }
      }
      throw new Error("illegal catch attempt");
    },
    delegateYield: function delegateYield(iterable, resultName, nextLoc) {
      return this.delegate = {
        iterator: values(iterable),
        resultName: resultName,
        nextLoc: nextLoc
      }, "next" === this.method && (this.arg = undefined), ContinueSentinel;
    }
  }, exports;
}
function RegisterPage_asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {
  try {
    var info = gen[key](arg);
    var value = info.value;
  } catch (error) {
    reject(error);
    return;
  }
  if (info.done) {
    resolve(value);
  } else {
    Promise.resolve(value).then(_next, _throw);
  }
}
function RegisterPage_asyncToGenerator(fn) {
  return function () {
    var self = this,
      args = arguments;
    return new Promise(function (resolve, reject) {
      var gen = fn.apply(self, args);
      function _next(value) {
        RegisterPage_asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);
      }
      function _throw(err) {
        RegisterPage_asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);
      }
      _next(undefined);
    });
  };
}
function RegisterPage_classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}
function RegisterPage_defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}
function RegisterPage_createClass(Constructor, protoProps, staticProps) {
  if (protoProps) RegisterPage_defineProperties(Constructor.prototype, protoProps);
  if (staticProps) RegisterPage_defineProperties(Constructor, staticProps);
  Object.defineProperty(Constructor, "prototype", {
    writable: false
  });
  return Constructor;
}
function RegisterPage_get() {
  if (typeof Reflect !== "undefined" && Reflect.get) {
    RegisterPage_get = Reflect.get.bind();
  } else {
    RegisterPage_get = function _get(target, property, receiver) {
      var base = RegisterPage_superPropBase(target, property);
      if (!base) return;
      var desc = Object.getOwnPropertyDescriptor(base, property);
      if (desc.get) {
        return desc.get.call(arguments.length < 3 ? target : receiver);
      }
      return desc.value;
    };
  }
  return RegisterPage_get.apply(this, arguments);
}
function RegisterPage_superPropBase(object, property) {
  while (!Object.prototype.hasOwnProperty.call(object, property)) {
    object = RegisterPage_getPrototypeOf(object);
    if (object === null) break;
  }
  return object;
}
function RegisterPage_inherits(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function");
  }
  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      writable: true,
      configurable: true
    }
  });
  Object.defineProperty(subClass, "prototype", {
    writable: false
  });
  if (superClass) RegisterPage_setPrototypeOf(subClass, superClass);
}
function RegisterPage_setPrototypeOf(o, p) {
  RegisterPage_setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) {
    o.__proto__ = p;
    return o;
  };
  return RegisterPage_setPrototypeOf(o, p);
}
function RegisterPage_createSuper(Derived) {
  var hasNativeReflectConstruct = RegisterPage_isNativeReflectConstruct();
  return function _createSuperInternal() {
    var Super = RegisterPage_getPrototypeOf(Derived),
      result;
    if (hasNativeReflectConstruct) {
      var NewTarget = RegisterPage_getPrototypeOf(this).constructor;
      result = Reflect.construct(Super, arguments, NewTarget);
    } else {
      result = Super.apply(this, arguments);
    }
    return RegisterPage_possibleConstructorReturn(this, result);
  };
}
function RegisterPage_possibleConstructorReturn(self, call) {
  if (call && (RegisterPage_typeof(call) === "object" || typeof call === "function")) {
    return call;
  } else if (call !== void 0) {
    throw new TypeError("Derived constructors may only return object or undefined");
  }
  return RegisterPage_assertThisInitialized(self);
}
function RegisterPage_assertThisInitialized(self) {
  if (self === void 0) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }
  return self;
}
function RegisterPage_isNativeReflectConstruct() {
  if (typeof Reflect === "undefined" || !Reflect.construct) return false;
  if (Reflect.construct.sham) return false;
  if (typeof Proxy === "function") return true;
  try {
    Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {}));
    return true;
  } catch (e) {
    return false;
  }
}
function RegisterPage_getPrototypeOf(o) {
  RegisterPage_getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf(o) {
    return o.__proto__ || Object.getPrototypeOf(o);
  };
  return RegisterPage_getPrototypeOf(o);
}
function RegisterPage_defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }
  return obj;
}








var RegisterPage_ERROR_400_MESSAGE = 'Ошибка. Попробуйте еще раз';
var RegisterPage_ERROR_401_MESSAGE = 'Неверная почта или пароль';
var RegisterPage_SERVER_ERROR_MESSAGE = 'Ошибка сервера. Попробуйте позже';

/**
 * Класс, реализующий страницу с регистрации.
 */
var RegisterPage = /*#__PURE__*/function (_BasePage) {
  RegisterPage_inherits(RegisterPage, _BasePage);
  var _super = RegisterPage_createSuper(RegisterPage);
  /**
   * Конструктор, создающий конструктор базовой страницы с нужными параметрами
   * @param {Element} parent HTML-элемент, в который будет осуществлена отрисовка
   */
  function RegisterPage(parent) {
    var _this;
    RegisterPage_classCallCheck(this, RegisterPage);
    _this = _super.call(this, parent, (RegisterPage_default()));
    RegisterPage_defineProperty(RegisterPage_assertThisInitialized(_this), "context", {
      fields: {
        name: {
          title: 'Имя',
          type: 'text',
          name: 'name',
          placeholder: 'Введите имя',
          maxLength: '30',
          errorID: 'nameError'
        },
        email: {
          title: 'Почта',
          type: 'email',
          name: 'email',
          placeholder: 'mail@website.com',
          maxLength: '30',
          errorID: 'emailError'
        },
        password: {
          title: 'Пароль',
          type: 'password',
          name: 'password',
          placeholder: 'Придумайте пароль',
          maxLength: '16',
          errorID: 'passwordError'
        },
        repeatPassword: {
          title: 'Повторить пароль',
          type: 'password',
          name: 'repeatPassword',
          placeholder: 'Повторите пароль',
          maxLength: '16',
          errorID: 'repeatPasswordError'
        }
      },
      button: {
        buttonValue: 'Зарегистрироваться'
      }
    });
    return _this;
  }

  /**
   * Метод, удаляющий слушатели.
   * @param {any} context контекст данных для страницы
   */
  RegisterPage_createClass(RegisterPage, [{
    key: "removeEventListener",
    value: function removeEventListener(context) {
      var form = document.getElementById('signup__form');
      form.removeEventListener('focusin', this.onFocusinHandler);
      form.removeEventListener('submit', this.onSubmitHandler);
    }

    /**
     * Метод, обрабатывающий получение фокуса полем.
     * @param {object} event событие получения фокуса полем
     */
  }, {
    key: "onFocusinHandler",
    value: function () {
      var _onFocusinHandler = RegisterPage_asyncToGenerator( /*#__PURE__*/RegisterPage_regeneratorRuntime().mark(function _callee(event) {
        return RegisterPage_regeneratorRuntime().wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                modules_ErrorMessage.deleteErrorMessage(event.target.name);
              case 1:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }));
      function onFocusinHandler(_x) {
        return _onFocusinHandler.apply(this, arguments);
      }
      return onFocusinHandler;
    }()
  }, {
    key: "onSubmitHandler",
    value:
    /**
     * Функция, обрабатывающая посылку формы.
     * @param {object} config глобальный контекст
     * @param {object} form поля формы
     * @param {object} event событие отправки формы
     */
    function () {
      var _onSubmitHandler = RegisterPage_asyncToGenerator( /*#__PURE__*/RegisterPage_regeneratorRuntime().mark(function _callee2(config, form, event) {
        var data, fields, key, username, email, password, _yield$request$makePo, _yield$request$makePo2, status;
        return RegisterPage_regeneratorRuntime().wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                event.preventDefault();

                /* Сохранить данные из формы в переменную */
                data = {};
                fields = this.context.fields;
                Object.keys(fields).forEach(function (page) {
                  var element = form.querySelector("[name=".concat(fields[page].name, "]"));
                  data[fields[page].name] = element.value;
                });

                // timing email
                data.email = data.email.trim();

                // Удаление отрисованных ошибок
                for (key in data) {
                  if (data.hasOwnProperty(key)) {
                    modules_ErrorMessage.deleteErrorMessage(key);
                  }
                }

                /* Проверка почты и пароля и отрисовка ошибок на странице */
                if (!this.validate(data)) {
                  _context2.next = 30;
                  break;
                }
                username = data.username, email = data.email, password = data.password;
                _context2.next = 10;
                return ajax.makePostRequest(config.api.signup, {
                  password: password,
                  email: email,
                  username: username
                })["catch"](function (err) {
                  return console.log(err);
                });
              case 10:
                _yield$request$makePo = _context2.sent;
                _yield$request$makePo2 = RegisterPage_slicedToArray(_yield$request$makePo, 1);
                status = _yield$request$makePo2[0];
                _context2.t0 = status;
                _context2.next = _context2.t0 === 201 ? 16 : _context2.t0 === 400 ? 23 : _context2.t0 === 401 ? 25 : 28;
                break;
              case 16:
                console.log('auth');
                config.auth.authorised = true;
                modules_Router.remove(config.header.login.href);
                modules_Router.remove(config.header.signup.href);
                window.dispatchEvent(config.auth.event);
                modules_Router.openPage(config.header.main.href, config);
                return _context2.abrupt("break", 30);
              case 23:
                document.getElementById('Error400Message') === null ? modules_ErrorMessage.getServerMessage(document.getElementById('inForm'), 'Error400Message', RegisterPage_ERROR_400_MESSAGE) : console.log('bad request: ', status);
                return _context2.abrupt("break", 30);
              case 25:
                modules_ErrorMessage.getErrorMessage(document.getElementById(fields.email.name), 'emailError', RegisterPage_ERROR_401_MESSAGE);
                console.log('no auth: ', status);
                return _context2.abrupt("break", 30);
              case 28:
                !document.getElementById('serverErrorMessage') ? modules_ErrorMessage.getServerMessage(document.getElementById('inForm'), 'serverErrorMessage', RegisterPage_SERVER_ERROR_MESSAGE) : console.log('server error: ', status);
                return _context2.abrupt("break", 30);
              case 30:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));
      function onSubmitHandler(_x2, _x3, _x4) {
        return _onSubmitHandler.apply(this, arguments);
      }
      return onSubmitHandler;
    }()
  }, {
    key: "render",
    value:
    /**
     * Метод, отрисовывающий страницу.
     * @param {object} config контекст отрисовки страницы
     */
    function render(config) {
      RegisterPage_get(RegisterPage_getPrototypeOf(RegisterPage.prototype), "render", this).call(this, this.context);

      /* Создание и отрисовка компонента Form */
      this.formComponent = new Form(document.getElementById('signup__form'));
      this.formComponent.render(this.context);
      var form = document.getElementById('signup__form');
      document.getElementById(this.context.fields.name.name).focus();
      form.addEventListener('focusin', this.onFocusinHandler);
      form.addEventListener('submit', this.onSubmitHandler.bind(this, config, form));
    }

    /**
     * Метод, осуществляющий валидацию данных из формы.
     * @param {object} data - объект, содержащий данные из формы
     * @return {boolean} статус валидации
     */
  }, {
    key: "validate",
    value: function validate(data) {
      var _this2 = this;
      var isValid = true;
      Object.entries(data).forEach(function (_ref) {
        var _ref2 = RegisterPage_slicedToArray(_ref, 2),
          key = _ref2[0],
          value = _ref2[1];
        switch (key) {
          case _this2.context.fields.name.name:
            isValid &= modules_ErrorMessage.validateFiled(validation.checkEmptyField(value), _this2.context.fields.name);
            break;
          case _this2.context.fields.email.name:
            isValid &= modules_ErrorMessage.validateFiled(validation.validateEMail(value), _this2.context.fields.email);
            break;
          case _this2.context.fields.password.name:
            isValid &= modules_ErrorMessage.validateFiled(validation.validatePassword(value), _this2.context.fields.password);
            break;
          case _this2.context.fields.repeatPassword.name:
            isValid &= modules_ErrorMessage.validateFiled(validation.validateRepeatPassword(data.password === data.repeatPassword), _this2.context.fields.repeatPassword);
            break;
        }
      });
      return isValid;
    }
  }]);
  return RegisterPage;
}(BasePage);

// EXTERNAL MODULE: ./public/src/pages/ErrorPage/errorPage.hbs
var errorPage = __webpack_require__(790);
var errorPage_default = /*#__PURE__*/__webpack_require__.n(errorPage);
;// CONCATENATED MODULE: ./public/src/pages/ErrorPage/ErrorPage.js
function ErrorPage_typeof(obj) {
  "@babel/helpers - typeof";

  return ErrorPage_typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) {
    return typeof obj;
  } : function (obj) {
    return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
  }, ErrorPage_typeof(obj);
}
function ErrorPage_classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}
function ErrorPage_defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}
function ErrorPage_createClass(Constructor, protoProps, staticProps) {
  if (protoProps) ErrorPage_defineProperties(Constructor.prototype, protoProps);
  if (staticProps) ErrorPage_defineProperties(Constructor, staticProps);
  Object.defineProperty(Constructor, "prototype", {
    writable: false
  });
  return Constructor;
}
function ErrorPage_get() {
  if (typeof Reflect !== "undefined" && Reflect.get) {
    ErrorPage_get = Reflect.get.bind();
  } else {
    ErrorPage_get = function _get(target, property, receiver) {
      var base = ErrorPage_superPropBase(target, property);
      if (!base) return;
      var desc = Object.getOwnPropertyDescriptor(base, property);
      if (desc.get) {
        return desc.get.call(arguments.length < 3 ? target : receiver);
      }
      return desc.value;
    };
  }
  return ErrorPage_get.apply(this, arguments);
}
function ErrorPage_superPropBase(object, property) {
  while (!Object.prototype.hasOwnProperty.call(object, property)) {
    object = ErrorPage_getPrototypeOf(object);
    if (object === null) break;
  }
  return object;
}
function ErrorPage_inherits(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function");
  }
  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      writable: true,
      configurable: true
    }
  });
  Object.defineProperty(subClass, "prototype", {
    writable: false
  });
  if (superClass) ErrorPage_setPrototypeOf(subClass, superClass);
}
function ErrorPage_setPrototypeOf(o, p) {
  ErrorPage_setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) {
    o.__proto__ = p;
    return o;
  };
  return ErrorPage_setPrototypeOf(o, p);
}
function ErrorPage_createSuper(Derived) {
  var hasNativeReflectConstruct = ErrorPage_isNativeReflectConstruct();
  return function _createSuperInternal() {
    var Super = ErrorPage_getPrototypeOf(Derived),
      result;
    if (hasNativeReflectConstruct) {
      var NewTarget = ErrorPage_getPrototypeOf(this).constructor;
      result = Reflect.construct(Super, arguments, NewTarget);
    } else {
      result = Super.apply(this, arguments);
    }
    return ErrorPage_possibleConstructorReturn(this, result);
  };
}
function ErrorPage_possibleConstructorReturn(self, call) {
  if (call && (ErrorPage_typeof(call) === "object" || typeof call === "function")) {
    return call;
  } else if (call !== void 0) {
    throw new TypeError("Derived constructors may only return object or undefined");
  }
  return ErrorPage_assertThisInitialized(self);
}
function ErrorPage_assertThisInitialized(self) {
  if (self === void 0) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }
  return self;
}
function ErrorPage_isNativeReflectConstruct() {
  if (typeof Reflect === "undefined" || !Reflect.construct) return false;
  if (Reflect.construct.sham) return false;
  if (typeof Proxy === "function") return true;
  try {
    Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {}));
    return true;
  } catch (e) {
    return false;
  }
}
function ErrorPage_getPrototypeOf(o) {
  ErrorPage_getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf(o) {
    return o.__proto__ || Object.getPrototypeOf(o);
  };
  return ErrorPage_getPrototypeOf(o);
}



/**
 * Класс, реализующий страницу входа.
 */
var ErrorPage = /*#__PURE__*/function (_BasePage) {
  ErrorPage_inherits(ErrorPage, _BasePage);
  var _super = ErrorPage_createSuper(ErrorPage);
  /**
   * Конструктор, создающий конструктор базовой страницы с нужными параметрами
   * @param {Element} parent HTML-элемент, в который будет осуществлена отрисовка
   */
  function ErrorPage(parent) {
    ErrorPage_classCallCheck(this, ErrorPage);
    return _super.call(this, parent, (errorPage_default()));
  }
  /**
   * Метод, отрисовывающий страницу.
   * @param {object} config контекст отрисовки страницы
   */
  ErrorPage_createClass(ErrorPage, [{
    key: "render",
    value: function render(config) {
      ErrorPage_get(ErrorPage_getPrototypeOf(ErrorPage.prototype), "render", this).call(this, this.context);
    }
  }]);
  return ErrorPage;
}(BasePage);

;// CONCATENATED MODULE: ./public/src/modules/Router.js
function Router_classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}
function Router_defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}
function Router_createClass(Constructor, protoProps, staticProps) {
  if (protoProps) Router_defineProperties(Constructor.prototype, protoProps);
  if (staticProps) Router_defineProperties(Constructor, staticProps);
  Object.defineProperty(Constructor, "prototype", {
    writable: false
  });
  return Constructor;
}
function Router_classPrivateFieldInitSpec(obj, privateMap, value) {
  Router_checkPrivateRedeclaration(obj, privateMap);
  privateMap.set(obj, value);
}
function Router_checkPrivateRedeclaration(obj, privateCollection) {
  if (privateCollection.has(obj)) {
    throw new TypeError("Cannot initialize the same private elements twice on an object");
  }
}
function Router_classPrivateFieldGet(receiver, privateMap) {
  var descriptor = Router_classExtractFieldDescriptor(receiver, privateMap, "get");
  return Router_classApplyDescriptorGet(receiver, descriptor);
}
function Router_classApplyDescriptorGet(receiver, descriptor) {
  if (descriptor.get) {
    return descriptor.get.call(receiver);
  }
  return descriptor.value;
}
function Router_classPrivateFieldSet(receiver, privateMap, value) {
  var descriptor = Router_classExtractFieldDescriptor(receiver, privateMap, "set");
  Router_classApplyDescriptorSet(receiver, descriptor, value);
  return value;
}
function Router_classExtractFieldDescriptor(receiver, privateMap, action) {
  if (!privateMap.has(receiver)) {
    throw new TypeError("attempted to " + action + " private field on non-instance");
  }
  return privateMap.get(receiver);
}
function Router_classApplyDescriptorSet(receiver, descriptor, value) {
  if (descriptor.set) {
    descriptor.set.call(receiver, value);
  } else {
    if (!descriptor.writable) {
      throw new TypeError("attempted to set read only private field");
    }
    descriptor.value = value;
  }
}





/**
 * Класс, реализующий переход между страницами SPA.
 */
var _pathToPage = /*#__PURE__*/new WeakMap();
var _mainElement = /*#__PURE__*/new WeakMap();
var _currentPage = /*#__PURE__*/new WeakMap();
var Router = /*#__PURE__*/function () {
  /**
   * Конструктор роутера.
   */
  function Router() {
    Router_classCallCheck(this, Router);
    Router_classPrivateFieldInitSpec(this, _pathToPage, {
      writable: true,
      value: void 0
    });
    Router_classPrivateFieldInitSpec(this, _mainElement, {
      writable: true,
      value: void 0
    });
    Router_classPrivateFieldInitSpec(this, _currentPage, {
      writable: true,
      value: void 0
    });
    Router_classPrivateFieldSet(this, _pathToPage, new Map());
  }

  /**
   * Функция отрисовки страницы
   * @param {object} PageConstructor конструктор класса страницы
   * @return {object} класс страницы
   */
  Router_createClass(Router, [{
    key: "renderPage",
    value: function renderPage(PageConstructor) {
      if (PageConstructor instanceof Function && typeof PageConstructor === 'function') {
        var page = new PageConstructor(Router_classPrivateFieldGet(this, _mainElement));
        return function (context) {
          page.render(context);
          return page;
        };
      }
    }
  }, {
    key: "register",
    value:
    /**
     * Регистрирует страницу.
     * @param {string} path - путь к странице
     * @param {object} view - страница
     */
    function register(path, view) {
      Router_classPrivateFieldGet(this, _pathToPage).set(path, this.renderPage(view));
    }

    /**
     * Удаляет страницу.
     * @param {string} path - путь к странице
     */
  }, {
    key: "remove",
    value: function remove(path) {
      Router_classPrivateFieldGet(this, _pathToPage)["delete"](path);
    }

    /**
     * Обновляет страницу.
     * @param {object} config - данные для отображения страницы
     */
  }, {
    key: "refresh",
    value: function refresh(config) {
      this.go(document.location.pathname, config);
    }

    /**
     * Функция для рендера страницы при переходе по истории браузера.
     * @param {object} config - данные для отображения страницы
     * @param {object} event - событие на которое запустилась функция
     */
  }, {
    key: "onPopState",
    value: function onPopState(config, event) {
      this.go(document.location.pathname, config);
    }

    /**
     * Запускает роутер.
     * @param {object} config - данные для отображения страницы
     */
  }, {
    key: "start",
    value: function start(config) {
      Router_classPrivateFieldSet(this, _mainElement, document.getElementById('main'));
      this.register(config.header.main.href, MainPage);
      this.register(config.header.notFound.href, ErrorPage);
      this.register(config.header.login.href, LoginPage);
      this.register(config.header.signup.href, RegisterPage);
      Router_classPrivateFieldSet(this, _currentPage, new MainPage(Router_classPrivateFieldGet(this, _mainElement)));
    }

    /**
     * Переходит на страницу.
     * @param {string} path - путь к странице
     * @param {object} config - данные для отображения страницы
     * @return {boolean} - зарегистрирована ли такая страница
     */
  }, {
    key: "go",
    value: function go(path, config) {
      if (Router_classPrivateFieldGet(this, _pathToPage).has(path)) {
        Router_classPrivateFieldGet(this, _currentPage).removeEventListener();
        Router_classPrivateFieldSet(this, _currentPage, Router_classPrivateFieldGet(this, _pathToPage).get(path)(config));
        return true;
      }
      this.go(config.header.notFound.href, config);
      return false;
    }

    /**
     * Переходит на страницу и добавляет в историю браузера.
     * @param {string} path - путь к странице
     * @param {object} config - данные для отображения страницы
     */
  }, {
    key: "openPage",
    value: function openPage(path, config) {
      var _this = this;
      if (this.go(path, config)) {
        window.history.pushState({
          page: path + (window.history.length + 1).toString()
        }, path, path);
        window.onpopstate = function (event) {
          return _this.onPopState(config, event);
        };
      }
    }
  }]);
  return Router;
}();
/* harmony default export */ const modules_Router = (new Router());
;// CONCATENATED MODULE: ./public/src/index.js


function src_typeof(obj) {
  "@babel/helpers - typeof";

  return src_typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) {
    return typeof obj;
  } : function (obj) {
    return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
  }, src_typeof(obj);
}
function src_regeneratorRuntime() {
  "use strict";

  /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */
  src_regeneratorRuntime = function _regeneratorRuntime() {
    return exports;
  };
  var exports = {},
    Op = Object.prototype,
    hasOwn = Op.hasOwnProperty,
    defineProperty = Object.defineProperty || function (obj, key, desc) {
      obj[key] = desc.value;
    },
    $Symbol = "function" == typeof Symbol ? Symbol : {},
    iteratorSymbol = $Symbol.iterator || "@@iterator",
    asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator",
    toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag";
  function define(obj, key, value) {
    return Object.defineProperty(obj, key, {
      value: value,
      enumerable: !0,
      configurable: !0,
      writable: !0
    }), obj[key];
  }
  try {
    define({}, "");
  } catch (err) {
    define = function define(obj, key, value) {
      return obj[key] = value;
    };
  }
  function wrap(innerFn, outerFn, self, tryLocsList) {
    var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator,
      generator = Object.create(protoGenerator.prototype),
      context = new Context(tryLocsList || []);
    return defineProperty(generator, "_invoke", {
      value: makeInvokeMethod(innerFn, self, context)
    }), generator;
  }
  function tryCatch(fn, obj, arg) {
    try {
      return {
        type: "normal",
        arg: fn.call(obj, arg)
      };
    } catch (err) {
      return {
        type: "throw",
        arg: err
      };
    }
  }
  exports.wrap = wrap;
  var ContinueSentinel = {};
  function Generator() {}
  function GeneratorFunction() {}
  function GeneratorFunctionPrototype() {}
  var IteratorPrototype = {};
  define(IteratorPrototype, iteratorSymbol, function () {
    return this;
  });
  var getProto = Object.getPrototypeOf,
    NativeIteratorPrototype = getProto && getProto(getProto(values([])));
  NativeIteratorPrototype && NativeIteratorPrototype !== Op && hasOwn.call(NativeIteratorPrototype, iteratorSymbol) && (IteratorPrototype = NativeIteratorPrototype);
  var Gp = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(IteratorPrototype);
  function defineIteratorMethods(prototype) {
    ["next", "throw", "return"].forEach(function (method) {
      define(prototype, method, function (arg) {
        return this._invoke(method, arg);
      });
    });
  }
  function AsyncIterator(generator, PromiseImpl) {
    function invoke(method, arg, resolve, reject) {
      var record = tryCatch(generator[method], generator, arg);
      if ("throw" !== record.type) {
        var result = record.arg,
          value = result.value;
        return value && "object" == src_typeof(value) && hasOwn.call(value, "__await") ? PromiseImpl.resolve(value.__await).then(function (value) {
          invoke("next", value, resolve, reject);
        }, function (err) {
          invoke("throw", err, resolve, reject);
        }) : PromiseImpl.resolve(value).then(function (unwrapped) {
          result.value = unwrapped, resolve(result);
        }, function (error) {
          return invoke("throw", error, resolve, reject);
        });
      }
      reject(record.arg);
    }
    var previousPromise;
    defineProperty(this, "_invoke", {
      value: function value(method, arg) {
        function callInvokeWithMethodAndArg() {
          return new PromiseImpl(function (resolve, reject) {
            invoke(method, arg, resolve, reject);
          });
        }
        return previousPromise = previousPromise ? previousPromise.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg();
      }
    });
  }
  function makeInvokeMethod(innerFn, self, context) {
    var state = "suspendedStart";
    return function (method, arg) {
      if ("executing" === state) throw new Error("Generator is already running");
      if ("completed" === state) {
        if ("throw" === method) throw arg;
        return doneResult();
      }
      for (context.method = method, context.arg = arg;;) {
        var delegate = context.delegate;
        if (delegate) {
          var delegateResult = maybeInvokeDelegate(delegate, context);
          if (delegateResult) {
            if (delegateResult === ContinueSentinel) continue;
            return delegateResult;
          }
        }
        if ("next" === context.method) context.sent = context._sent = context.arg;else if ("throw" === context.method) {
          if ("suspendedStart" === state) throw state = "completed", context.arg;
          context.dispatchException(context.arg);
        } else "return" === context.method && context.abrupt("return", context.arg);
        state = "executing";
        var record = tryCatch(innerFn, self, context);
        if ("normal" === record.type) {
          if (state = context.done ? "completed" : "suspendedYield", record.arg === ContinueSentinel) continue;
          return {
            value: record.arg,
            done: context.done
          };
        }
        "throw" === record.type && (state = "completed", context.method = "throw", context.arg = record.arg);
      }
    };
  }
  function maybeInvokeDelegate(delegate, context) {
    var method = delegate.iterator[context.method];
    if (undefined === method) {
      if (context.delegate = null, "throw" === context.method) {
        if (delegate.iterator["return"] && (context.method = "return", context.arg = undefined, maybeInvokeDelegate(delegate, context), "throw" === context.method)) return ContinueSentinel;
        context.method = "throw", context.arg = new TypeError("The iterator does not provide a 'throw' method");
      }
      return ContinueSentinel;
    }
    var record = tryCatch(method, delegate.iterator, context.arg);
    if ("throw" === record.type) return context.method = "throw", context.arg = record.arg, context.delegate = null, ContinueSentinel;
    var info = record.arg;
    return info ? info.done ? (context[delegate.resultName] = info.value, context.next = delegate.nextLoc, "return" !== context.method && (context.method = "next", context.arg = undefined), context.delegate = null, ContinueSentinel) : info : (context.method = "throw", context.arg = new TypeError("iterator result is not an object"), context.delegate = null, ContinueSentinel);
  }
  function pushTryEntry(locs) {
    var entry = {
      tryLoc: locs[0]
    };
    1 in locs && (entry.catchLoc = locs[1]), 2 in locs && (entry.finallyLoc = locs[2], entry.afterLoc = locs[3]), this.tryEntries.push(entry);
  }
  function resetTryEntry(entry) {
    var record = entry.completion || {};
    record.type = "normal", delete record.arg, entry.completion = record;
  }
  function Context(tryLocsList) {
    this.tryEntries = [{
      tryLoc: "root"
    }], tryLocsList.forEach(pushTryEntry, this), this.reset(!0);
  }
  function values(iterable) {
    if (iterable) {
      var iteratorMethod = iterable[iteratorSymbol];
      if (iteratorMethod) return iteratorMethod.call(iterable);
      if ("function" == typeof iterable.next) return iterable;
      if (!isNaN(iterable.length)) {
        var i = -1,
          next = function next() {
            for (; ++i < iterable.length;) {
              if (hasOwn.call(iterable, i)) return next.value = iterable[i], next.done = !1, next;
            }
            return next.value = undefined, next.done = !0, next;
          };
        return next.next = next;
      }
    }
    return {
      next: doneResult
    };
  }
  function doneResult() {
    return {
      value: undefined,
      done: !0
    };
  }
  return GeneratorFunction.prototype = GeneratorFunctionPrototype, defineProperty(Gp, "constructor", {
    value: GeneratorFunctionPrototype,
    configurable: !0
  }), defineProperty(GeneratorFunctionPrototype, "constructor", {
    value: GeneratorFunction,
    configurable: !0
  }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, toStringTagSymbol, "GeneratorFunction"), exports.isGeneratorFunction = function (genFun) {
    var ctor = "function" == typeof genFun && genFun.constructor;
    return !!ctor && (ctor === GeneratorFunction || "GeneratorFunction" === (ctor.displayName || ctor.name));
  }, exports.mark = function (genFun) {
    return Object.setPrototypeOf ? Object.setPrototypeOf(genFun, GeneratorFunctionPrototype) : (genFun.__proto__ = GeneratorFunctionPrototype, define(genFun, toStringTagSymbol, "GeneratorFunction")), genFun.prototype = Object.create(Gp), genFun;
  }, exports.awrap = function (arg) {
    return {
      __await: arg
    };
  }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, asyncIteratorSymbol, function () {
    return this;
  }), exports.AsyncIterator = AsyncIterator, exports.async = function (innerFn, outerFn, self, tryLocsList, PromiseImpl) {
    void 0 === PromiseImpl && (PromiseImpl = Promise);
    var iter = new AsyncIterator(wrap(innerFn, outerFn, self, tryLocsList), PromiseImpl);
    return exports.isGeneratorFunction(outerFn) ? iter : iter.next().then(function (result) {
      return result.done ? result.value : iter.next();
    });
  }, defineIteratorMethods(Gp), define(Gp, toStringTagSymbol, "Generator"), define(Gp, iteratorSymbol, function () {
    return this;
  }), define(Gp, "toString", function () {
    return "[object Generator]";
  }), exports.keys = function (val) {
    var object = Object(val),
      keys = [];
    for (var key in object) {
      keys.push(key);
    }
    return keys.reverse(), function next() {
      for (; keys.length;) {
        var key = keys.pop();
        if (key in object) return next.value = key, next.done = !1, next;
      }
      return next.done = !0, next;
    };
  }, exports.values = values, Context.prototype = {
    constructor: Context,
    reset: function reset(skipTempReset) {
      if (this.prev = 0, this.next = 0, this.sent = this._sent = undefined, this.done = !1, this.delegate = null, this.method = "next", this.arg = undefined, this.tryEntries.forEach(resetTryEntry), !skipTempReset) for (var name in this) {
        "t" === name.charAt(0) && hasOwn.call(this, name) && !isNaN(+name.slice(1)) && (this[name] = undefined);
      }
    },
    stop: function stop() {
      this.done = !0;
      var rootRecord = this.tryEntries[0].completion;
      if ("throw" === rootRecord.type) throw rootRecord.arg;
      return this.rval;
    },
    dispatchException: function dispatchException(exception) {
      if (this.done) throw exception;
      var context = this;
      function handle(loc, caught) {
        return record.type = "throw", record.arg = exception, context.next = loc, caught && (context.method = "next", context.arg = undefined), !!caught;
      }
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i],
          record = entry.completion;
        if ("root" === entry.tryLoc) return handle("end");
        if (entry.tryLoc <= this.prev) {
          var hasCatch = hasOwn.call(entry, "catchLoc"),
            hasFinally = hasOwn.call(entry, "finallyLoc");
          if (hasCatch && hasFinally) {
            if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0);
            if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc);
          } else if (hasCatch) {
            if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0);
          } else {
            if (!hasFinally) throw new Error("try statement without catch or finally");
            if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc);
          }
        }
      }
    },
    abrupt: function abrupt(type, arg) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.tryLoc <= this.prev && hasOwn.call(entry, "finallyLoc") && this.prev < entry.finallyLoc) {
          var finallyEntry = entry;
          break;
        }
      }
      finallyEntry && ("break" === type || "continue" === type) && finallyEntry.tryLoc <= arg && arg <= finallyEntry.finallyLoc && (finallyEntry = null);
      var record = finallyEntry ? finallyEntry.completion : {};
      return record.type = type, record.arg = arg, finallyEntry ? (this.method = "next", this.next = finallyEntry.finallyLoc, ContinueSentinel) : this.complete(record);
    },
    complete: function complete(record, afterLoc) {
      if ("throw" === record.type) throw record.arg;
      return "break" === record.type || "continue" === record.type ? this.next = record.arg : "return" === record.type ? (this.rval = this.arg = record.arg, this.method = "return", this.next = "end") : "normal" === record.type && afterLoc && (this.next = afterLoc), ContinueSentinel;
    },
    finish: function finish(finallyLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.finallyLoc === finallyLoc) return this.complete(entry.completion, entry.afterLoc), resetTryEntry(entry), ContinueSentinel;
      }
    },
    "catch": function _catch(tryLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.tryLoc === tryLoc) {
          var record = entry.completion;
          if ("throw" === record.type) {
            var thrown = record.arg;
            resetTryEntry(entry);
          }
          return thrown;
        }
      }
      throw new Error("illegal catch attempt");
    },
    delegateYield: function delegateYield(iterable, resultName, nextLoc) {
      return this.delegate = {
        iterator: values(iterable),
        resultName: resultName,
        nextLoc: nextLoc
      }, "next" === this.method && (this.arg = undefined), ContinueSentinel;
    }
  }, exports;
}
function src_slicedToArray(arr, i) {
  return src_arrayWithHoles(arr) || src_iterableToArrayLimit(arr, i) || src_unsupportedIterableToArray(arr, i) || src_nonIterableRest();
}
function src_nonIterableRest() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function src_unsupportedIterableToArray(o, minLen) {
  if (!o) return;
  if (typeof o === "string") return src_arrayLikeToArray(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return src_arrayLikeToArray(o, minLen);
}
function src_arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length) len = arr.length;
  for (var i = 0, arr2 = new Array(len); i < len; i++) {
    arr2[i] = arr[i];
  }
  return arr2;
}
function src_iterableToArrayLimit(arr, i) {
  var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"];
  if (_i == null) return;
  var _arr = [];
  var _n = true;
  var _d = false;
  var _s, _e;
  try {
    for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) {
      _arr.push(_s.value);
      if (i && _arr.length === i) break;
    }
  } catch (err) {
    _d = true;
    _e = err;
  } finally {
    try {
      if (!_n && _i["return"] != null) _i["return"]();
    } finally {
      if (_d) throw _e;
    }
  }
  return _arr;
}
function src_arrayWithHoles(arr) {
  if (Array.isArray(arr)) return arr;
}
function src_asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {
  try {
    var info = gen[key](arg);
    var value = info.value;
  } catch (error) {
    reject(error);
    return;
  }
  if (info.done) {
    resolve(value);
  } else {
    Promise.resolve(value).then(_next, _throw);
  }
}
function src_asyncToGenerator(fn) {
  return function () {
    var self = this,
      args = arguments;
    return new Promise(function (resolve, reject) {
      var gen = fn.apply(self, args);
      function _next(value) {
        src_asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);
      }
      function _throw(err) {
        src_asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);
      }
      _next(undefined);
    });
  };
}






var refresh = new RefreshEl(document.getElementById('root'));
refresh.refreshFooter();
var authEvent = new CustomEvent('authEvent', {
  detail: 'trigger on auth'
});
var config = {
  header: {
    main: {
      href: '/'
    },
    login: {
      href: '/login'
    },
    signup: {
      href: '/signup'
    },
    notFound: {
      href: '/error404'
    },
    logout: {
      href: '/logout'
    }
  },
  auth: {
    authorised: false,
    event: authEvent
  },
  api: {
    login: 'api/v1/login',
    signup: 'api/v1/signup',
    logout: 'api/v1/logout',
    session: 'api/v1/session',
    products: 'api/v1/products'
  }
};
modules_Router.start(config);

/**
 * Функция перехода на новую страницу
 * @param {object} event - событие, произошедшее на странице
 */
var changePage = /*#__PURE__*/function () {
  var _ref = src_asyncToGenerator( /*#__PURE__*/src_regeneratorRuntime().mark(function _callee(event) {
    var target, href, _yield$request$makeDe, _yield$request$makeDe2, status;
    return src_regeneratorRuntime().wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            target = event.target;
            href = target.getAttribute('href');
            if (href === null) {
              href = target.parentElement.getAttribute('href');
            }
            Object.keys(config.header).forEach(function (page) {
              if (config.header[page].href === href) {
                event.preventDefault();
                modules_Router.openPage(href, config);
              }
            });
            if (!(href === config.header.logout.href)) {
              _context.next = 12;
              break;
            }
            event.preventDefault();
            _context.next = 8;
            return ajax.makeDeleteRequest(config.api.logout)["catch"](function (err) {
              return console.log(err);
            });
          case 8:
            _yield$request$makeDe = _context.sent;
            _yield$request$makeDe2 = src_slicedToArray(_yield$request$makeDe, 1);
            status = _yield$request$makeDe2[0];
            if (status === 200) {
              config.auth.authorised = false;
              modules_Router.register(config.header.login.href, LoginPage);
              modules_Router.register(config.header.signup.href, RegisterPage);
              modules_Router.refresh(config);
              window.dispatchEvent(config.auth.event);
            }
          case 12:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));
  return function changePage(_x) {
    return _ref.apply(this, arguments);
  };
}();
window.addEventListener('click', changePage);
var onAuthAndLogout = /*#__PURE__*/function () {
  var _ref2 = src_asyncToGenerator( /*#__PURE__*/src_regeneratorRuntime().mark(function _callee2() {
    return src_regeneratorRuntime().wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            refresh.refreshHeader(config);
          case 1:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));
  return function onAuthAndLogout() {
    return _ref2.apply(this, arguments);
  };
}();
window.addEventListener('authEvent', onAuthAndLogout);

/**
 * Функция для получения сессии
 */
var checkSession = /*#__PURE__*/function () {
  var _ref3 = src_asyncToGenerator( /*#__PURE__*/src_regeneratorRuntime().mark(function _callee3() {
    var _yield$request$makeGe, _yield$request$makeGe2, status;
    return src_regeneratorRuntime().wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.next = 2;
            return ajax.makeGetRequest(config.api.session)["catch"](function (err) {
              return console.log(err);
            });
          case 2:
            _yield$request$makeGe = _context3.sent;
            _yield$request$makeGe2 = src_slicedToArray(_yield$request$makeGe, 1);
            status = _yield$request$makeGe2[0];
            if (status === 200) {
              config.auth.authorised = true;
              modules_Router.remove(config.header.login.href);
              modules_Router.remove(config.header.signup.href);
            }
            window.dispatchEvent(config.auth.event);
            modules_Router.openPage(document.location.pathname, config);
          case 8:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3);
  }));
  return function checkSession() {
    return _ref3.apply(this, arguments);
  };
}();
window.addEventListener('DOMContentLoaded', checkSession, {
  once: true
});

/***/ }),

/***/ 195:
/***/ ((module, exports, __webpack_require__) => {

"use strict";


exports.__esModule = true;
// istanbul ignore next

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {
    'default': obj
  };
}

// istanbul ignore next

function _interopRequireWildcard(obj) {
  if (obj && obj.__esModule) {
    return obj;
  } else {
    var newObj = {};
    if (obj != null) {
      for (var key in obj) {
        if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key];
      }
    }
    newObj['default'] = obj;
    return newObj;
  }
}
var _handlebarsBase = __webpack_require__(343);
var base = _interopRequireWildcard(_handlebarsBase);

// Each of these augment the Handlebars object. No need to setup here.
// (This is done to easily share code between commonjs and browse envs)

var _handlebarsSafeString = __webpack_require__(212);
var _handlebarsSafeString2 = _interopRequireDefault(_handlebarsSafeString);
var _handlebarsException = __webpack_require__(541);
var _handlebarsException2 = _interopRequireDefault(_handlebarsException);
var _handlebarsUtils = __webpack_require__(553);
var Utils = _interopRequireWildcard(_handlebarsUtils);
var _handlebarsRuntime = __webpack_require__(576);
var runtime = _interopRequireWildcard(_handlebarsRuntime);
var _handlebarsNoConflict = __webpack_require__(704);
var _handlebarsNoConflict2 = _interopRequireDefault(_handlebarsNoConflict);

// For compatibility and usage outside of module systems, make the Handlebars object a namespace
function create() {
  var hb = new base.HandlebarsEnvironment();
  Utils.extend(hb, base);
  hb.SafeString = _handlebarsSafeString2['default'];
  hb.Exception = _handlebarsException2['default'];
  hb.Utils = Utils;
  hb.escapeExpression = Utils.escapeExpression;
  hb.VM = runtime;
  hb.template = function (spec) {
    return runtime.template(spec, hb);
  };
  return hb;
}
var inst = create();
inst.create = create;
_handlebarsNoConflict2['default'](inst);
inst['default'] = inst;
exports["default"] = inst;
module.exports = exports['default'];

/***/ }),

/***/ 343:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


exports.__esModule = true;
exports.HandlebarsEnvironment = HandlebarsEnvironment;
// istanbul ignore next

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {
    'default': obj
  };
}
var _utils = __webpack_require__(553);
var _exception = __webpack_require__(541);
var _exception2 = _interopRequireDefault(_exception);
var _helpers = __webpack_require__(938);
var _decorators = __webpack_require__(810);
var _logger = __webpack_require__(806);
var _logger2 = _interopRequireDefault(_logger);
var _internalProtoAccess = __webpack_require__(451);
var VERSION = '4.7.7';
exports.VERSION = VERSION;
var COMPILER_REVISION = 8;
exports.COMPILER_REVISION = COMPILER_REVISION;
var LAST_COMPATIBLE_COMPILER_REVISION = 7;
exports.LAST_COMPATIBLE_COMPILER_REVISION = LAST_COMPATIBLE_COMPILER_REVISION;
var REVISION_CHANGES = {
  1: '<= 1.0.rc.2',
  // 1.0.rc.2 is actually rev2 but doesn't report it
  2: '== 1.0.0-rc.3',
  3: '== 1.0.0-rc.4',
  4: '== 1.x.x',
  5: '== 2.0.0-alpha.x',
  6: '>= 2.0.0-beta.1',
  7: '>= 4.0.0 <4.3.0',
  8: '>= 4.3.0'
};
exports.REVISION_CHANGES = REVISION_CHANGES;
var objectType = '[object Object]';
function HandlebarsEnvironment(helpers, partials, decorators) {
  this.helpers = helpers || {};
  this.partials = partials || {};
  this.decorators = decorators || {};
  _helpers.registerDefaultHelpers(this);
  _decorators.registerDefaultDecorators(this);
}
HandlebarsEnvironment.prototype = {
  constructor: HandlebarsEnvironment,
  logger: _logger2['default'],
  log: _logger2['default'].log,
  registerHelper: function registerHelper(name, fn) {
    if (_utils.toString.call(name) === objectType) {
      if (fn) {
        throw new _exception2['default']('Arg not supported with multiple helpers');
      }
      _utils.extend(this.helpers, name);
    } else {
      this.helpers[name] = fn;
    }
  },
  unregisterHelper: function unregisterHelper(name) {
    delete this.helpers[name];
  },
  registerPartial: function registerPartial(name, partial) {
    if (_utils.toString.call(name) === objectType) {
      _utils.extend(this.partials, name);
    } else {
      if (typeof partial === 'undefined') {
        throw new _exception2['default']('Attempting to register a partial called "' + name + '" as undefined');
      }
      this.partials[name] = partial;
    }
  },
  unregisterPartial: function unregisterPartial(name) {
    delete this.partials[name];
  },
  registerDecorator: function registerDecorator(name, fn) {
    if (_utils.toString.call(name) === objectType) {
      if (fn) {
        throw new _exception2['default']('Arg not supported with multiple decorators');
      }
      _utils.extend(this.decorators, name);
    } else {
      this.decorators[name] = fn;
    }
  },
  unregisterDecorator: function unregisterDecorator(name) {
    delete this.decorators[name];
  },
  /**
   * Reset the memory of illegal property accesses that have already been logged.
   * @deprecated should only be used in handlebars test-cases
   */
  resetLoggedPropertyAccesses: function resetLoggedPropertyAccesses() {
    _internalProtoAccess.resetLoggedProperties();
  }
};
var log = _logger2['default'].log;
exports.log = log;
exports.createFrame = _utils.createFrame;
exports.logger = _logger2['default'];

/***/ }),

/***/ 810:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


exports.__esModule = true;
exports.registerDefaultDecorators = registerDefaultDecorators;
// istanbul ignore next

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {
    'default': obj
  };
}
var _decoratorsInline = __webpack_require__(992);
var _decoratorsInline2 = _interopRequireDefault(_decoratorsInline);
function registerDefaultDecorators(instance) {
  _decoratorsInline2['default'](instance);
}

/***/ }),

/***/ 992:
/***/ ((module, exports, __webpack_require__) => {

"use strict";


exports.__esModule = true;
var _utils = __webpack_require__(553);
exports["default"] = function (instance) {
  instance.registerDecorator('inline', function (fn, props, container, options) {
    var ret = fn;
    if (!props.partials) {
      props.partials = {};
      ret = function ret(context, options) {
        // Create a new partials stack frame prior to exec.
        var original = container.partials;
        container.partials = _utils.extend({}, original, props.partials);
        var ret = fn(context, options);
        container.partials = original;
        return ret;
      };
    }
    props.partials[options.args[0]] = options.fn;
    return ret;
  });
};
module.exports = exports['default'];

/***/ }),

/***/ 541:
/***/ ((module, exports) => {

"use strict";


exports.__esModule = true;
var errorProps = ['description', 'fileName', 'lineNumber', 'endLineNumber', 'message', 'name', 'number', 'stack'];
function Exception(message, node) {
  var loc = node && node.loc,
    line = undefined,
    endLineNumber = undefined,
    column = undefined,
    endColumn = undefined;
  if (loc) {
    line = loc.start.line;
    endLineNumber = loc.end.line;
    column = loc.start.column;
    endColumn = loc.end.column;
    message += ' - ' + line + ':' + column;
  }
  var tmp = Error.prototype.constructor.call(this, message);

  // Unfortunately errors are not enumerable in Chrome (at least), so `for prop in tmp` doesn't work.
  for (var idx = 0; idx < errorProps.length; idx++) {
    this[errorProps[idx]] = tmp[errorProps[idx]];
  }

  /* istanbul ignore else */
  if (Error.captureStackTrace) {
    Error.captureStackTrace(this, Exception);
  }
  try {
    if (loc) {
      this.lineNumber = line;
      this.endLineNumber = endLineNumber;

      // Work around issue under safari where we can't directly set the column value
      /* istanbul ignore next */
      if (Object.defineProperty) {
        Object.defineProperty(this, 'column', {
          value: column,
          enumerable: true
        });
        Object.defineProperty(this, 'endColumn', {
          value: endColumn,
          enumerable: true
        });
      } else {
        this.column = column;
        this.endColumn = endColumn;
      }
    }
  } catch (nop) {
    /* Ignore if the browser is very particular */
  }
}
Exception.prototype = new Error();
exports["default"] = Exception;
module.exports = exports['default'];

/***/ }),

/***/ 938:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


exports.__esModule = true;
exports.registerDefaultHelpers = registerDefaultHelpers;
exports.moveHelperToHooks = moveHelperToHooks;
// istanbul ignore next

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {
    'default': obj
  };
}
var _helpersBlockHelperMissing = __webpack_require__(761);
var _helpersBlockHelperMissing2 = _interopRequireDefault(_helpersBlockHelperMissing);
var _helpersEach = __webpack_require__(32);
var _helpersEach2 = _interopRequireDefault(_helpersEach);
var _helpersHelperMissing = __webpack_require__(558);
var _helpersHelperMissing2 = _interopRequireDefault(_helpersHelperMissing);
var _helpersIf = __webpack_require__(257);
var _helpersIf2 = _interopRequireDefault(_helpersIf);
var _helpersLog = __webpack_require__(878);
var _helpersLog2 = _interopRequireDefault(_helpersLog);
var _helpersLookup = __webpack_require__(31);
var _helpersLookup2 = _interopRequireDefault(_helpersLookup);
var _helpersWith = __webpack_require__(933);
var _helpersWith2 = _interopRequireDefault(_helpersWith);
function registerDefaultHelpers(instance) {
  _helpersBlockHelperMissing2['default'](instance);
  _helpersEach2['default'](instance);
  _helpersHelperMissing2['default'](instance);
  _helpersIf2['default'](instance);
  _helpersLog2['default'](instance);
  _helpersLookup2['default'](instance);
  _helpersWith2['default'](instance);
}
function moveHelperToHooks(instance, helperName, keepHelper) {
  if (instance.helpers[helperName]) {
    instance.hooks[helperName] = instance.helpers[helperName];
    if (!keepHelper) {
      delete instance.helpers[helperName];
    }
  }
}

/***/ }),

/***/ 761:
/***/ ((module, exports, __webpack_require__) => {

"use strict";


exports.__esModule = true;
var _utils = __webpack_require__(553);
exports["default"] = function (instance) {
  instance.registerHelper('blockHelperMissing', function (context, options) {
    var inverse = options.inverse,
      fn = options.fn;
    if (context === true) {
      return fn(this);
    } else if (context === false || context == null) {
      return inverse(this);
    } else if (_utils.isArray(context)) {
      if (context.length > 0) {
        if (options.ids) {
          options.ids = [options.name];
        }
        return instance.helpers.each(context, options);
      } else {
        return inverse(this);
      }
    } else {
      if (options.data && options.ids) {
        var data = _utils.createFrame(options.data);
        data.contextPath = _utils.appendContextPath(options.data.contextPath, options.name);
        options = {
          data: data
        };
      }
      return fn(context, options);
    }
  });
};
module.exports = exports['default'];

/***/ }),

/***/ 32:
/***/ ((module, exports, __webpack_require__) => {

"use strict";


function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
exports.__esModule = true;
// istanbul ignore next

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {
    'default': obj
  };
}
var _utils = __webpack_require__(553);
var _exception = __webpack_require__(541);
var _exception2 = _interopRequireDefault(_exception);
exports["default"] = function (instance) {
  instance.registerHelper('each', function (context, options) {
    if (!options) {
      throw new _exception2['default']('Must pass iterator to #each');
    }
    var fn = options.fn,
      inverse = options.inverse,
      i = 0,
      ret = '',
      data = undefined,
      contextPath = undefined;
    if (options.data && options.ids) {
      contextPath = _utils.appendContextPath(options.data.contextPath, options.ids[0]) + '.';
    }
    if (_utils.isFunction(context)) {
      context = context.call(this);
    }
    if (options.data) {
      data = _utils.createFrame(options.data);
    }
    function execIteration(field, index, last) {
      if (data) {
        data.key = field;
        data.index = index;
        data.first = index === 0;
        data.last = !!last;
        if (contextPath) {
          data.contextPath = contextPath + field;
        }
      }
      ret = ret + fn(context[field], {
        data: data,
        blockParams: _utils.blockParams([context[field], field], [contextPath + field, null])
      });
    }
    if (context && _typeof(context) === 'object') {
      if (_utils.isArray(context)) {
        for (var j = context.length; i < j; i++) {
          if (i in context) {
            execIteration(i, i, i === context.length - 1);
          }
        }
      } else if (__webpack_require__.g.Symbol && context[__webpack_require__.g.Symbol.iterator]) {
        var newContext = [];
        var iterator = context[__webpack_require__.g.Symbol.iterator]();
        for (var it = iterator.next(); !it.done; it = iterator.next()) {
          newContext.push(it.value);
        }
        context = newContext;
        for (var j = context.length; i < j; i++) {
          execIteration(i, i, i === context.length - 1);
        }
      } else {
        (function () {
          var priorKey = undefined;
          Object.keys(context).forEach(function (key) {
            // We're running the iterations one step out of sync so we can detect
            // the last iteration without have to scan the object twice and create
            // an itermediate keys array.
            if (priorKey !== undefined) {
              execIteration(priorKey, i - 1);
            }
            priorKey = key;
            i++;
          });
          if (priorKey !== undefined) {
            execIteration(priorKey, i - 1, true);
          }
        })();
      }
    }
    if (i === 0) {
      ret = inverse(this);
    }
    return ret;
  });
};
module.exports = exports['default'];

/***/ }),

/***/ 558:
/***/ ((module, exports, __webpack_require__) => {

"use strict";


exports.__esModule = true;
// istanbul ignore next

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {
    'default': obj
  };
}
var _exception = __webpack_require__(541);
var _exception2 = _interopRequireDefault(_exception);
exports["default"] = function (instance) {
  instance.registerHelper('helperMissing', function () /* [args, ]options */{
    if (arguments.length === 1) {
      // A missing field in a {{foo}} construct.
      return undefined;
    } else {
      // Someone is actually trying to call something, blow up.
      throw new _exception2['default']('Missing helper: "' + arguments[arguments.length - 1].name + '"');
    }
  });
};
module.exports = exports['default'];

/***/ }),

/***/ 257:
/***/ ((module, exports, __webpack_require__) => {

"use strict";


exports.__esModule = true;
// istanbul ignore next

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {
    'default': obj
  };
}
var _utils = __webpack_require__(553);
var _exception = __webpack_require__(541);
var _exception2 = _interopRequireDefault(_exception);
exports["default"] = function (instance) {
  instance.registerHelper('if', function (conditional, options) {
    if (arguments.length != 2) {
      throw new _exception2['default']('#if requires exactly one argument');
    }
    if (_utils.isFunction(conditional)) {
      conditional = conditional.call(this);
    }

    // Default behavior is to render the positive path if the value is truthy and not empty.
    // The `includeZero` option may be set to treat the condtional as purely not empty based on the
    // behavior of isEmpty. Effectively this determines if 0 is handled by the positive path or negative.
    if (!options.hash.includeZero && !conditional || _utils.isEmpty(conditional)) {
      return options.inverse(this);
    } else {
      return options.fn(this);
    }
  });
  instance.registerHelper('unless', function (conditional, options) {
    if (arguments.length != 2) {
      throw new _exception2['default']('#unless requires exactly one argument');
    }
    return instance.helpers['if'].call(this, conditional, {
      fn: options.inverse,
      inverse: options.fn,
      hash: options.hash
    });
  });
};
module.exports = exports['default'];

/***/ }),

/***/ 878:
/***/ ((module, exports) => {

"use strict";


exports.__esModule = true;
exports["default"] = function (instance) {
  instance.registerHelper('log', function () /* message, options */{
    var args = [undefined],
      options = arguments[arguments.length - 1];
    for (var i = 0; i < arguments.length - 1; i++) {
      args.push(arguments[i]);
    }
    var level = 1;
    if (options.hash.level != null) {
      level = options.hash.level;
    } else if (options.data && options.data.level != null) {
      level = options.data.level;
    }
    args[0] = level;
    instance.log.apply(instance, args);
  });
};
module.exports = exports['default'];

/***/ }),

/***/ 31:
/***/ ((module, exports) => {

"use strict";


exports.__esModule = true;
exports["default"] = function (instance) {
  instance.registerHelper('lookup', function (obj, field, options) {
    if (!obj) {
      // Note for 5.0: Change to "obj == null" in 5.0
      return obj;
    }
    return options.lookupProperty(obj, field);
  });
};
module.exports = exports['default'];

/***/ }),

/***/ 933:
/***/ ((module, exports, __webpack_require__) => {

"use strict";


exports.__esModule = true;
// istanbul ignore next

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {
    'default': obj
  };
}
var _utils = __webpack_require__(553);
var _exception = __webpack_require__(541);
var _exception2 = _interopRequireDefault(_exception);
exports["default"] = function (instance) {
  instance.registerHelper('with', function (context, options) {
    if (arguments.length != 2) {
      throw new _exception2['default']('#with requires exactly one argument');
    }
    if (_utils.isFunction(context)) {
      context = context.call(this);
    }
    var fn = options.fn;
    if (!_utils.isEmpty(context)) {
      var data = options.data;
      if (options.data && options.ids) {
        data = _utils.createFrame(options.data);
        data.contextPath = _utils.appendContextPath(options.data.contextPath, options.ids[0]);
      }
      return fn(context, {
        data: data,
        blockParams: _utils.blockParams([context], [data && data.contextPath])
      });
    } else {
      return options.inverse(this);
    }
  });
};
module.exports = exports['default'];

/***/ }),

/***/ 824:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


exports.__esModule = true;
exports.createNewLookupObject = createNewLookupObject;
var _utils = __webpack_require__(553);

/**
 * Create a new object with "null"-prototype to avoid truthy results on prototype properties.
 * The resulting object can be used with "object[property]" to check if a property exists
 * @param {...object} sources a varargs parameter of source objects that will be merged
 * @returns {object}
 */

function createNewLookupObject() {
  for (var _len = arguments.length, sources = Array(_len), _key = 0; _key < _len; _key++) {
    sources[_key] = arguments[_key];
  }
  return _utils.extend.apply(undefined, [Object.create(null)].concat(sources));
}

/***/ }),

/***/ 451:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


exports.__esModule = true;
exports.createProtoAccessControl = createProtoAccessControl;
exports.resultIsAllowed = resultIsAllowed;
exports.resetLoggedProperties = resetLoggedProperties;
// istanbul ignore next

function _interopRequireWildcard(obj) {
  if (obj && obj.__esModule) {
    return obj;
  } else {
    var newObj = {};
    if (obj != null) {
      for (var key in obj) {
        if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key];
      }
    }
    newObj['default'] = obj;
    return newObj;
  }
}
var _createNewLookupObject = __webpack_require__(824);
var _logger = __webpack_require__(806);
var logger = _interopRequireWildcard(_logger);
var loggedProperties = Object.create(null);
function createProtoAccessControl(runtimeOptions) {
  var defaultMethodWhiteList = Object.create(null);
  defaultMethodWhiteList['constructor'] = false;
  defaultMethodWhiteList['__defineGetter__'] = false;
  defaultMethodWhiteList['__defineSetter__'] = false;
  defaultMethodWhiteList['__lookupGetter__'] = false;
  var defaultPropertyWhiteList = Object.create(null);
  // eslint-disable-next-line no-proto
  defaultPropertyWhiteList['__proto__'] = false;
  return {
    properties: {
      whitelist: _createNewLookupObject.createNewLookupObject(defaultPropertyWhiteList, runtimeOptions.allowedProtoProperties),
      defaultValue: runtimeOptions.allowProtoPropertiesByDefault
    },
    methods: {
      whitelist: _createNewLookupObject.createNewLookupObject(defaultMethodWhiteList, runtimeOptions.allowedProtoMethods),
      defaultValue: runtimeOptions.allowProtoMethodsByDefault
    }
  };
}
function resultIsAllowed(result, protoAccessControl, propertyName) {
  if (typeof result === 'function') {
    return checkWhiteList(protoAccessControl.methods, propertyName);
  } else {
    return checkWhiteList(protoAccessControl.properties, propertyName);
  }
}
function checkWhiteList(protoAccessControlForType, propertyName) {
  if (protoAccessControlForType.whitelist[propertyName] !== undefined) {
    return protoAccessControlForType.whitelist[propertyName] === true;
  }
  if (protoAccessControlForType.defaultValue !== undefined) {
    return protoAccessControlForType.defaultValue;
  }
  logUnexpecedPropertyAccessOnce(propertyName);
  return false;
}
function logUnexpecedPropertyAccessOnce(propertyName) {
  if (loggedProperties[propertyName] !== true) {
    loggedProperties[propertyName] = true;
    logger.log('error', 'Handlebars: Access has been denied to resolve the property "' + propertyName + '" because it is not an "own property" of its parent.\n' + 'You can add a runtime option to disable the check or this warning:\n' + 'See https://handlebarsjs.com/api-reference/runtime-options.html#options-to-control-prototype-access for details');
  }
}
function resetLoggedProperties() {
  Object.keys(loggedProperties).forEach(function (propertyName) {
    delete loggedProperties[propertyName];
  });
}

/***/ }),

/***/ 326:
/***/ ((__unused_webpack_module, exports) => {

"use strict";


exports.__esModule = true;
exports.wrapHelper = wrapHelper;
function wrapHelper(helper, transformOptionsFn) {
  if (typeof helper !== 'function') {
    // This should not happen, but apparently it does in https://github.com/wycats/handlebars.js/issues/1639
    // We try to make the wrapper least-invasive by not wrapping it, if the helper is not a function.
    return helper;
  }
  var wrapper = function wrapper() /* dynamic arguments */{
    var options = arguments[arguments.length - 1];
    arguments[arguments.length - 1] = transformOptionsFn(options);
    return helper.apply(this, arguments);
  };
  return wrapper;
}

/***/ }),

/***/ 806:
/***/ ((module, exports, __webpack_require__) => {

"use strict";


exports.__esModule = true;
var _utils = __webpack_require__(553);
var logger = {
  methodMap: ['debug', 'info', 'warn', 'error'],
  level: 'info',
  // Maps a given level value to the `methodMap` indexes above.
  lookupLevel: function lookupLevel(level) {
    if (typeof level === 'string') {
      var levelMap = _utils.indexOf(logger.methodMap, level.toLowerCase());
      if (levelMap >= 0) {
        level = levelMap;
      } else {
        level = parseInt(level, 10);
      }
    }
    return level;
  },
  // Can be overridden in the host environment
  log: function log(level) {
    level = logger.lookupLevel(level);
    if (typeof console !== 'undefined' && logger.lookupLevel(logger.level) <= level) {
      var method = logger.methodMap[level];
      // eslint-disable-next-line no-console
      if (!console[method]) {
        method = 'log';
      }
      for (var _len = arguments.length, message = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        message[_key - 1] = arguments[_key];
      }
      console[method].apply(console, message); // eslint-disable-line no-console
    }
  }
};

exports["default"] = logger;
module.exports = exports['default'];

/***/ }),

/***/ 704:
/***/ ((module, exports, __webpack_require__) => {

"use strict";


exports.__esModule = true;
exports["default"] = function (Handlebars) {
  /* istanbul ignore next */
  var root = typeof __webpack_require__.g !== 'undefined' ? __webpack_require__.g : window,
    $Handlebars = root.Handlebars;
  /* istanbul ignore next */
  Handlebars.noConflict = function () {
    if (root.Handlebars === Handlebars) {
      root.Handlebars = $Handlebars;
    }
    return Handlebars;
  };
};
module.exports = exports['default'];

/***/ }),

/***/ 576:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
exports.__esModule = true;
exports.checkRevision = checkRevision;
exports.template = template;
exports.wrapProgram = wrapProgram;
exports.resolvePartial = resolvePartial;
exports.invokePartial = invokePartial;
exports.noop = noop;
// istanbul ignore next

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {
    'default': obj
  };
}

// istanbul ignore next

function _interopRequireWildcard(obj) {
  if (obj && obj.__esModule) {
    return obj;
  } else {
    var newObj = {};
    if (obj != null) {
      for (var key in obj) {
        if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key];
      }
    }
    newObj['default'] = obj;
    return newObj;
  }
}
var _utils = __webpack_require__(553);
var Utils = _interopRequireWildcard(_utils);
var _exception = __webpack_require__(541);
var _exception2 = _interopRequireDefault(_exception);
var _base = __webpack_require__(343);
var _helpers = __webpack_require__(938);
var _internalWrapHelper = __webpack_require__(326);
var _internalProtoAccess = __webpack_require__(451);
function checkRevision(compilerInfo) {
  var compilerRevision = compilerInfo && compilerInfo[0] || 1,
    currentRevision = _base.COMPILER_REVISION;
  if (compilerRevision >= _base.LAST_COMPATIBLE_COMPILER_REVISION && compilerRevision <= _base.COMPILER_REVISION) {
    return;
  }
  if (compilerRevision < _base.LAST_COMPATIBLE_COMPILER_REVISION) {
    var runtimeVersions = _base.REVISION_CHANGES[currentRevision],
      compilerVersions = _base.REVISION_CHANGES[compilerRevision];
    throw new _exception2['default']('Template was precompiled with an older version of Handlebars than the current runtime. ' + 'Please update your precompiler to a newer version (' + runtimeVersions + ') or downgrade your runtime to an older version (' + compilerVersions + ').');
  } else {
    // Use the embedded version info since the runtime doesn't know about this revision yet
    throw new _exception2['default']('Template was precompiled with a newer version of Handlebars than the current runtime. ' + 'Please update your runtime to a newer version (' + compilerInfo[1] + ').');
  }
}
function template(templateSpec, env) {
  /* istanbul ignore next */
  if (!env) {
    throw new _exception2['default']('No environment passed to template');
  }
  if (!templateSpec || !templateSpec.main) {
    throw new _exception2['default']('Unknown template object: ' + _typeof(templateSpec));
  }
  templateSpec.main.decorator = templateSpec.main_d;

  // Note: Using env.VM references rather than local var references throughout this section to allow
  // for external users to override these as pseudo-supported APIs.
  env.VM.checkRevision(templateSpec.compiler);

  // backwards compatibility for precompiled templates with compiler-version 7 (<4.3.0)
  var templateWasPrecompiledWithCompilerV7 = templateSpec.compiler && templateSpec.compiler[0] === 7;
  function invokePartialWrapper(partial, context, options) {
    if (options.hash) {
      context = Utils.extend({}, context, options.hash);
      if (options.ids) {
        options.ids[0] = true;
      }
    }
    partial = env.VM.resolvePartial.call(this, partial, context, options);
    var extendedOptions = Utils.extend({}, options, {
      hooks: this.hooks,
      protoAccessControl: this.protoAccessControl
    });
    var result = env.VM.invokePartial.call(this, partial, context, extendedOptions);
    if (result == null && env.compile) {
      options.partials[options.name] = env.compile(partial, templateSpec.compilerOptions, env);
      result = options.partials[options.name](context, extendedOptions);
    }
    if (result != null) {
      if (options.indent) {
        var lines = result.split('\n');
        for (var i = 0, l = lines.length; i < l; i++) {
          if (!lines[i] && i + 1 === l) {
            break;
          }
          lines[i] = options.indent + lines[i];
        }
        result = lines.join('\n');
      }
      return result;
    } else {
      throw new _exception2['default']('The partial ' + options.name + ' could not be compiled when running in runtime-only mode');
    }
  }

  // Just add water
  var container = {
    strict: function strict(obj, name, loc) {
      if (!obj || !(name in obj)) {
        throw new _exception2['default']('"' + name + '" not defined in ' + obj, {
          loc: loc
        });
      }
      return container.lookupProperty(obj, name);
    },
    lookupProperty: function lookupProperty(parent, propertyName) {
      var result = parent[propertyName];
      if (result == null) {
        return result;
      }
      if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
        return result;
      }
      if (_internalProtoAccess.resultIsAllowed(result, container.protoAccessControl, propertyName)) {
        return result;
      }
      return undefined;
    },
    lookup: function lookup(depths, name) {
      var len = depths.length;
      for (var i = 0; i < len; i++) {
        var result = depths[i] && container.lookupProperty(depths[i], name);
        if (result != null) {
          return depths[i][name];
        }
      }
    },
    lambda: function lambda(current, context) {
      return typeof current === 'function' ? current.call(context) : current;
    },
    escapeExpression: Utils.escapeExpression,
    invokePartial: invokePartialWrapper,
    fn: function fn(i) {
      var ret = templateSpec[i];
      ret.decorator = templateSpec[i + '_d'];
      return ret;
    },
    programs: [],
    program: function program(i, data, declaredBlockParams, blockParams, depths) {
      var programWrapper = this.programs[i],
        fn = this.fn(i);
      if (data || depths || blockParams || declaredBlockParams) {
        programWrapper = wrapProgram(this, i, fn, data, declaredBlockParams, blockParams, depths);
      } else if (!programWrapper) {
        programWrapper = this.programs[i] = wrapProgram(this, i, fn);
      }
      return programWrapper;
    },
    data: function data(value, depth) {
      while (value && depth--) {
        value = value._parent;
      }
      return value;
    },
    mergeIfNeeded: function mergeIfNeeded(param, common) {
      var obj = param || common;
      if (param && common && param !== common) {
        obj = Utils.extend({}, common, param);
      }
      return obj;
    },
    // An empty object to use as replacement for null-contexts
    nullContext: Object.seal({}),
    noop: env.VM.noop,
    compilerInfo: templateSpec.compiler
  };
  function ret(context) {
    var options = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];
    var data = options.data;
    ret._setup(options);
    if (!options.partial && templateSpec.useData) {
      data = initData(context, data);
    }
    var depths = undefined,
      blockParams = templateSpec.useBlockParams ? [] : undefined;
    if (templateSpec.useDepths) {
      if (options.depths) {
        depths = context != options.depths[0] ? [context].concat(options.depths) : options.depths;
      } else {
        depths = [context];
      }
    }
    function main(context /*, options*/) {
      return '' + templateSpec.main(container, context, container.helpers, container.partials, data, blockParams, depths);
    }
    main = executeDecorators(templateSpec.main, main, container, options.depths || [], data, blockParams);
    return main(context, options);
  }
  ret.isTop = true;
  ret._setup = function (options) {
    if (!options.partial) {
      var mergedHelpers = Utils.extend({}, env.helpers, options.helpers);
      wrapHelpersToPassLookupProperty(mergedHelpers, container);
      container.helpers = mergedHelpers;
      if (templateSpec.usePartial) {
        // Use mergeIfNeeded here to prevent compiling global partials multiple times
        container.partials = container.mergeIfNeeded(options.partials, env.partials);
      }
      if (templateSpec.usePartial || templateSpec.useDecorators) {
        container.decorators = Utils.extend({}, env.decorators, options.decorators);
      }
      container.hooks = {};
      container.protoAccessControl = _internalProtoAccess.createProtoAccessControl(options);
      var keepHelperInHelpers = options.allowCallsToHelperMissing || templateWasPrecompiledWithCompilerV7;
      _helpers.moveHelperToHooks(container, 'helperMissing', keepHelperInHelpers);
      _helpers.moveHelperToHooks(container, 'blockHelperMissing', keepHelperInHelpers);
    } else {
      container.protoAccessControl = options.protoAccessControl; // internal option
      container.helpers = options.helpers;
      container.partials = options.partials;
      container.decorators = options.decorators;
      container.hooks = options.hooks;
    }
  };
  ret._child = function (i, data, blockParams, depths) {
    if (templateSpec.useBlockParams && !blockParams) {
      throw new _exception2['default']('must pass block params');
    }
    if (templateSpec.useDepths && !depths) {
      throw new _exception2['default']('must pass parent depths');
    }
    return wrapProgram(container, i, templateSpec[i], data, 0, blockParams, depths);
  };
  return ret;
}
function wrapProgram(container, i, fn, data, declaredBlockParams, blockParams, depths) {
  function prog(context) {
    var options = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];
    var currentDepths = depths;
    if (depths && context != depths[0] && !(context === container.nullContext && depths[0] === null)) {
      currentDepths = [context].concat(depths);
    }
    return fn(container, context, container.helpers, container.partials, options.data || data, blockParams && [options.blockParams].concat(blockParams), currentDepths);
  }
  prog = executeDecorators(fn, prog, container, depths, data, blockParams);
  prog.program = i;
  prog.depth = depths ? depths.length : 0;
  prog.blockParams = declaredBlockParams || 0;
  return prog;
}

/**
 * This is currently part of the official API, therefore implementation details should not be changed.
 */

function resolvePartial(partial, context, options) {
  if (!partial) {
    if (options.name === '@partial-block') {
      partial = options.data['partial-block'];
    } else {
      partial = options.partials[options.name];
    }
  } else if (!partial.call && !options.name) {
    // This is a dynamic partial that returned a string
    options.name = partial;
    partial = options.partials[partial];
  }
  return partial;
}
function invokePartial(partial, context, options) {
  // Use the current closure context to save the partial-block if this partial
  var currentPartialBlock = options.data && options.data['partial-block'];
  options.partial = true;
  if (options.ids) {
    options.data.contextPath = options.ids[0] || options.data.contextPath;
  }
  var partialBlock = undefined;
  if (options.fn && options.fn !== noop) {
    (function () {
      options.data = _base.createFrame(options.data);
      // Wrapper function to get access to currentPartialBlock from the closure
      var fn = options.fn;
      partialBlock = options.data['partial-block'] = function partialBlockWrapper(context) {
        var options = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

        // Restore the partial-block from the closure for the execution of the block
        // i.e. the part inside the block of the partial call.
        options.data = _base.createFrame(options.data);
        options.data['partial-block'] = currentPartialBlock;
        return fn(context, options);
      };
      if (fn.partials) {
        options.partials = Utils.extend({}, options.partials, fn.partials);
      }
    })();
  }
  if (partial === undefined && partialBlock) {
    partial = partialBlock;
  }
  if (partial === undefined) {
    throw new _exception2['default']('The partial ' + options.name + ' could not be found');
  } else if (partial instanceof Function) {
    return partial(context, options);
  }
}
function noop() {
  return '';
}
function initData(context, data) {
  if (!data || !('root' in data)) {
    data = data ? _base.createFrame(data) : {};
    data.root = context;
  }
  return data;
}
function executeDecorators(fn, prog, container, depths, data, blockParams) {
  if (fn.decorator) {
    var props = {};
    prog = fn.decorator(prog, props, container, depths && depths[0], data, blockParams, depths);
    Utils.extend(prog, props);
  }
  return prog;
}
function wrapHelpersToPassLookupProperty(mergedHelpers, container) {
  Object.keys(mergedHelpers).forEach(function (helperName) {
    var helper = mergedHelpers[helperName];
    mergedHelpers[helperName] = passLookupPropertyOption(helper, container);
  });
}
function passLookupPropertyOption(helper, container) {
  var lookupProperty = container.lookupProperty;
  return _internalWrapHelper.wrapHelper(helper, function (options) {
    return Utils.extend({
      lookupProperty: lookupProperty
    }, options);
  });
}

/***/ }),

/***/ 212:
/***/ ((module, exports) => {

"use strict";
// Build out our basic SafeString type


exports.__esModule = true;
function SafeString(string) {
  this.string = string;
}
SafeString.prototype.toString = SafeString.prototype.toHTML = function () {
  return '' + this.string;
};
exports["default"] = SafeString;
module.exports = exports['default'];

/***/ }),

/***/ 553:
/***/ ((__unused_webpack_module, exports) => {

"use strict";


function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
exports.__esModule = true;
exports.extend = extend;
exports.indexOf = indexOf;
exports.escapeExpression = escapeExpression;
exports.isEmpty = isEmpty;
exports.createFrame = createFrame;
exports.blockParams = blockParams;
exports.appendContextPath = appendContextPath;
var escape = {
  '&': '&amp;',
  '<': '&lt;',
  '>': '&gt;',
  '"': '&quot;',
  "'": '&#x27;',
  '`': '&#x60;',
  '=': '&#x3D;'
};
var badChars = /[&<>"'`=]/g,
  possible = /[&<>"'`=]/;
function escapeChar(chr) {
  return escape[chr];
}
function extend(obj /* , ...source */) {
  for (var i = 1; i < arguments.length; i++) {
    for (var key in arguments[i]) {
      if (Object.prototype.hasOwnProperty.call(arguments[i], key)) {
        obj[key] = arguments[i][key];
      }
    }
  }
  return obj;
}
var toString = Object.prototype.toString;
exports.toString = toString;
// Sourced from lodash
// https://github.com/bestiejs/lodash/blob/master/LICENSE.txt
/* eslint-disable func-style */
var isFunction = function isFunction(value) {
  return typeof value === 'function';
};
// fallback for older versions of Chrome and Safari
/* istanbul ignore next */
if (isFunction(/x/)) {
  exports.isFunction = isFunction = function isFunction(value) {
    return typeof value === 'function' && toString.call(value) === '[object Function]';
  };
}
exports.isFunction = isFunction;

/* eslint-enable func-style */

/* istanbul ignore next */
var isArray = Array.isArray || function (value) {
  return value && _typeof(value) === 'object' ? toString.call(value) === '[object Array]' : false;
};
exports.isArray = isArray;
// Older IE versions do not directly support indexOf so we must implement our own, sadly.

function indexOf(array, value) {
  for (var i = 0, len = array.length; i < len; i++) {
    if (array[i] === value) {
      return i;
    }
  }
  return -1;
}
function escapeExpression(string) {
  if (typeof string !== 'string') {
    // don't escape SafeStrings, since they're already safe
    if (string && string.toHTML) {
      return string.toHTML();
    } else if (string == null) {
      return '';
    } else if (!string) {
      return string + '';
    }

    // Force a string conversion as this will be done by the append regardless and
    // the regex test will do this transparently behind the scenes, causing issues if
    // an object's to string has escaped characters in it.
    string = '' + string;
  }
  if (!possible.test(string)) {
    return string;
  }
  return string.replace(badChars, escapeChar);
}
function isEmpty(value) {
  if (!value && value !== 0) {
    return true;
  } else if (isArray(value) && value.length === 0) {
    return true;
  } else {
    return false;
  }
}
function createFrame(object) {
  var frame = extend({}, object);
  frame._parent = object;
  return frame;
}
function blockParams(params, ids) {
  params.path = ids;
  return params;
}
function appendContextPath(contextPath, id) {
  return (contextPath ? contextPath + '.' : '') + id;
}

/***/ }),

/***/ 168:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

// Create a simple path alias to allow browserify to resolve
// the runtime on a supported path.
module.exports = __webpack_require__(195)["default"];

/***/ }),

/***/ 956:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var Handlebars = __webpack_require__(168);
function __default(obj) { return obj && (obj.__esModule ? obj["default"] : obj); }
module.exports = (Handlebars["default"] || Handlebars).template({"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data) {
    return "<div class=\"footer__grid\">\n    <div>\n        <a href=\"/\">\n        <img src=\"img/Logo.png\" alt=\"FooterLogo\">\n        </a>\n    </div>\n    <div class=\"footer__members\">\n        <div class=\"footer__team-member\">\n            <div class=\"footer__member-name text-normal-large-normal\">Артем Колесников</div>\n            <div class=\"footer__member-contact\">\n                <a href=\"https://vk.com/sunbringer\"><img src=\"img/VK_logo.png\" class=\"footer__contact-logo\" alt=\"VKLogo\"></a>\n                <a href=\"https://t.me/EuphoriaAbsorber\"><img src=\"img/TG_logo.png\" class=\"footer__contact-logo footer__margin-contact-logo\" alt=\"TGLogo\"></a>\n                <a href=\"https://github.com/EuphoriaAbsorber\"><img src=\"img/Github_logo.png\" class=\"footer__contact-logo footer__margin-contact-logo\" alt=\"GitHubLogo\"></a>\n            </div>\n        </div>\n        <div class=\"footer__team-member\">\n            <div class=\"footer__member-name text-normal-large-normal\">Елизавета Максимова</div>\n            <div class=\"footer__member-contact\">\n                <a href=\"https://vk.com/liza1040\"><img src=\"img/VK_logo.png\" class=\"footer__contact-logo\" alt=\"VKLogo\"></a>\n                <a href=\"https://t.me/liza1040\"><img src=\"img/TG_logo.png\" class=\"footer__contact-logo footer__margin-contact-logo\" alt=\"TGLogo\"></a>\n                <a href=\"https://github.com/Liza1040\"><img src=\"img/Github_logo.png\" class=\"footer__contact-logo footer__margin-contact-logo\" alt=\"GitHubLogo\"></a>\n            </div>\n        </div>\n        <div class=\"footer__team-member\">\n            <div class=\"footer__member-name text-normal-large-normal\">Владислав Пиневич</div>\n            <div class=\"footer__member-contact\">\n                <a href=\"https://vk.com/tunknownlegend\"><img src=\"img/VK_logo.png\" class=\"footer__contact-logo\" alt=\"VKLogo\"></a>\n                <a href=\"https://t.me/tUnknownLegend\"><img src=\"img/TG_logo.png\" class=\"footer__contact-logo footer__margin-contact-logo\" alt=\"TGLogo\"></a>\n                <a href=\"https://github.com/tUnknownLegend\"><img src=\"img/Github_logo.png\" class=\"footer__contact-logo footer__margin-contact-logo\" alt=\"GitHubLogo\"></a>\n            </div>\n        </div>\n        <div class=\"footer__team-member\">\n            <div class=\"footer__member-name text-normal-large-normal\">Александр Федоров</div>\n            <div class=\"footer__member-contact\">\n                <a href=\"https://vk.com/thelvv\"><img src=\"img/VK_logo.png\" class=\"footer__contact-logo \" alt=\"VKLogo\"></a>\n                <a href=\"https://t.me/thelvv\"><img src=\"img/TG_logo.png\" class=\"footer__contact-logo footer__margin-contact-logo\" alt=\"TGLogo\"></a>\n                <a href=\"https://github.com/thelvv\"><img src=\"img/Github_logo.png\" class=\"footer__contact-logo footer__margin-contact-logo\" alt=\"GitHubLogo\"></a>\n            </div>\n        </div>\n    </div>\n</div>\n";
},"useData":true});

/***/ }),

/***/ 547:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var Handlebars = __webpack_require__(168);
function __default(obj) { return obj && (obj.__esModule ? obj["default"] : obj); }
module.exports = (Handlebars["default"] || Handlebars).template({"1":function(container,depth0,helpers,partials,data) {
    var alias1=container.lambda, alias2=container.escapeExpression, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "        <div class=\"form__field\">\n            <div class=\"form__name text-normal-default\">\n                "
    + alias2(alias1((depth0 != null ? lookupProperty(depth0,"title") : depth0), depth0))
    + "\n            </div>\n            <input class=\"form__input\" type="
    + alias2(alias1((depth0 != null ? lookupProperty(depth0,"type") : depth0), depth0))
    + " name="
    + alias2(alias1((depth0 != null ? lookupProperty(depth0,"name") : depth0), depth0))
    + " placeholder='"
    + alias2(alias1((depth0 != null ? lookupProperty(depth0,"placeholder") : depth0), depth0))
    + "'\n                maxlength="
    + alias2(alias1((depth0 != null ? lookupProperty(depth0,"maxLength") : depth0), depth0))
    + " id="
    + alias2(alias1((depth0 != null ? lookupProperty(depth0,"name") : depth0), depth0))
    + ">\n        </div>\n";
},"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "<form action=\"#\" method=\"post\" class=\"form\" novalidate>\n"
    + ((stack1 = lookupProperty(helpers,"each").call(alias1,(depth0 != null ? lookupProperty(depth0,"field") : depth0),{"name":"each","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":2,"column":4},"end":{"line":10,"column":13}}})) != null ? stack1 : "")
    + "    <input type=\"submit\" class=\"button-default form__submit\" value="
    + container.escapeExpression(((helper = (helper = lookupProperty(helpers,"button") || (depth0 != null ? lookupProperty(depth0,"button") : depth0)) != null ? helper : container.hooks.helperMissing),(typeof helper === "function" ? helper.call(alias1,{"name":"button","hash":{},"data":data,"loc":{"start":{"line":11,"column":67},"end":{"line":11,"column":77}}}) : helper)))
    + " id=\"submit-result\">\n</form>\n";
},"useData":true});

/***/ }),

/***/ 677:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var Handlebars = __webpack_require__(168);
function __default(obj) { return obj && (obj.__esModule ? obj["default"] : obj); }
module.exports = (Handlebars["default"] || Handlebars).template({"1":function(container,depth0,helpers,partials,data) {
    return "            <a href=\"\">\n                <img src=\"./img/Profile.svg\" alt=\"Profile\" class=\"disabled\">\n            </a>\n            <div class=\"profile__pop-up\">\n                <a href=\"/logout\">\n                    <img src=\"./img/LogOut.svg\" class=\"profile__logout\" alt=\"LogOut\">\n                </a>\n            </div>\n";
},"3":function(container,depth0,helpers,partials,data) {
    return "            <a href=\"/login\">\n                <img src=\"./img/ProfileLogIn.svg\" alt=\"LogIn\">\n            </a>\n";
},"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "<div class=\"header__left\">\n    <div class=\"header__logotip\">\n        <a href=\"/\">\n            <img src=\"img/Logo.png\" alt=\"LOGO\">\n        </a>\n    </div>\n    <div class=\"header__catalog\">\n        <a href=\"\" class=\"button-default header__button-catalog paint-purple-disabled\">\n            <img type=\"image\" src=\"./img/Catalog.svg\" class=\"header__catalog-img\" alt=\"Catalog\">\n            Каталог\n        </a>\n    </div>\n    <div class=\"header__search-line disabled\">\n        <input type=\"search\" class=\"header__form-search\" name=\"search-line\"\n               placeholder=\"Что Вас интересует?\" maxlength=\"75\">\n        <a href=\"\" class=\"header__button-search disabled paint-purple \">\n            <img type=\"image\" src=\"./img/Search.svg\" alt=\"Search\">\n        </a>\n    </div>\n</div>\n<div class=\"header__right\">\n    <div class=\"header__order\">\n        <a href=\"\" class=\"disabled\">\n            <img src=\"./img/Orders.svg\" alt=\"Orders\">\n        </a>\n    </div>\n    <div class=\"header__favourites\">\n        <a href=\"\" class=\"disabled\">\n            <img src=\"./img/Favourites.svg\" alt=\"Favourites\">\n        </a>\n    </div>\n    <div class=\"header__card\">\n        <a href=\"\" class=\"disabled\">\n            <img src=\"img/Cart.svg\" alt=\"Cart\">\n        </a>\n    </div>\n\n    <div class=\"header__profile\">\n"
    + ((stack1 = lookupProperty(helpers,"if").call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? lookupProperty(depth0,"session") : depth0),{"name":"if","hash":{},"fn":container.program(1, data, 0),"inverse":container.program(3, data, 0),"data":data,"loc":{"start":{"line":39,"column":8},"end":{"line":52,"column":15}}})) != null ? stack1 : "")
    + "    </div>\n</div>\n";
},"useData":true});

/***/ }),

/***/ 96:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var Handlebars = __webpack_require__(168);
function __default(obj) { return obj && (obj.__esModule ? obj["default"] : obj); }
module.exports = (Handlebars["default"] || Handlebars).template({"1":function(container,depth0,helpers,partials,data) {
    var helper, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "            <div class=\"content__sales-value\">\n               -"
    + container.escapeExpression(((helper = (helper = lookupProperty(helpers,"discount") || (depth0 != null ? lookupProperty(depth0,"discount") : depth0)) != null ? helper : container.hooks.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : (container.nullContext || {}),{"name":"discount","hash":{},"data":data,"loc":{"start":{"line":6,"column":16},"end":{"line":6,"column":28}}}) : helper)))
    + "%\n            </div>\n";
},"3":function(container,depth0,helpers,partials,data) {
    var helper, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "            <span class=\"text-normal-default item-card__text-strikethrough\">\n                    "
    + container.escapeExpression(((helper = (helper = lookupProperty(helpers,"salePrice") || (depth0 != null ? lookupProperty(depth0,"salePrice") : depth0)) != null ? helper : container.hooks.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : (container.nullContext || {}),{"name":"salePrice","hash":{},"data":data,"loc":{"start":{"line":18,"column":20},"end":{"line":18,"column":33}}}) : helper)))
    + "₽\n                </span>\n";
},"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=container.hooks.helperMissing, alias3="function", alias4=container.escapeExpression, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "<a href=\"\" class=\"item-card__top disabled\">\n    <div class=\"text-normal-small content__sales-image\">\n        <img src="
    + alias4(((helper = (helper = lookupProperty(helpers,"imgsrc") || (depth0 != null ? lookupProperty(depth0,"imgsrc") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"imgsrc","hash":{},"data":data,"loc":{"start":{"line":3,"column":17},"end":{"line":3,"column":27}}}) : helper)))
    + " class=\"item-card__image\" alt=\"iPhone 13\">\n"
    + ((stack1 = lookupProperty(helpers,"if").call(alias1,(depth0 != null ? lookupProperty(depth0,"salePrice") : depth0),{"name":"if","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":4,"column":8},"end":{"line":8,"column":15}}})) != null ? stack1 : "")
    + "    </div>\n</a>\n\n <div class=\"item-card__textbox\">\n                <span class=\"text-normal-large\">\n                    "
    + alias4(((helper = (helper = lookupProperty(helpers,"price") || (depth0 != null ? lookupProperty(depth0,"price") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"price","hash":{},"data":data,"loc":{"start":{"line":14,"column":20},"end":{"line":14,"column":29}}}) : helper)))
    + "₽\n                </span>\n"
    + ((stack1 = lookupProperty(helpers,"if").call(alias1,(depth0 != null ? lookupProperty(depth0,"salePrice") : depth0),{"name":"if","hash":{},"fn":container.program(3, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":16,"column":8},"end":{"line":20,"column":15}}})) != null ? stack1 : "")
    + "        <span class=\"text-normal-default item-card__title\">\n            "
    + alias4(((helper = (helper = lookupProperty(helpers,"cardTitle") || (depth0 != null ? lookupProperty(depth0,"cardTitle") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"cardTitle","hash":{},"data":data,"loc":{"start":{"line":22,"column":12},"end":{"line":22,"column":25}}}) : helper)))
    + "\n        </span>\n    </div>\n\n<div class=\"item-card__bottom\">\n    <button type=\"button\" class=\"button-default button_add-to-card paint-purple-disabled\" >В корзину\n    </button>\n    <button type=\"button\" class=\"item-card__rating\" disabled>\n        <img src=\"img/Star.svg\" alt=\"S\" class=\"rating-icon\">\n        <span class=\"text-normal-default-bold\">\n            "
    + alias4(((helper = (helper = lookupProperty(helpers,"rating") || (depth0 != null ? lookupProperty(depth0,"rating") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"rating","hash":{},"data":data,"loc":{"start":{"line":32,"column":12},"end":{"line":32,"column":22}}}) : helper)))
    + "\n        </span>\n    </button>\n</div>\n";
},"useData":true});

/***/ }),

/***/ 450:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var Handlebars = __webpack_require__(168);
function __default(obj) { return obj && (obj.__esModule ? obj["default"] : obj); }
module.exports = (Handlebars["default"] || Handlebars).template({"1":function(container,depth0,helpers,partials,data) {
    var alias1=container.lambda, alias2=container.escapeExpression, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "    <a class=\"item-top-cards text-normal-default disabled\" href=\"\" >\n        <img src="
    + alias2(alias1((depth0 != null ? lookupProperty(depth0,"img") : depth0), depth0))
    + " alt="
    + alias2(alias1((depth0 != null ? lookupProperty(depth0,"key") : depth0), depth0))
    + ">\n        <p>"
    + alias2(alias1((depth0 != null ? lookupProperty(depth0,"nameCategory") : depth0), depth0))
    + "</p>\n    </a>\n";
},"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return ((stack1 = lookupProperty(helpers,"each").call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? lookupProperty(depth0,"category") : depth0),{"name":"each","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":1,"column":0},"end":{"line":6,"column":9}}})) != null ? stack1 : "");
},"useData":true});

/***/ }),

/***/ 790:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var Handlebars = __webpack_require__(168);
function __default(obj) { return obj && (obj.__esModule ? obj["default"] : obj); }
module.exports = (Handlebars["default"] || Handlebars).template({"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data) {
    return "<div class=\"paint-background\"></div>\n<div class=\"content\" id=\"content\">\n    <div class=\"server-error\" id=\"404Error\">\n        <span class=\"server-error__text\">\n            404 Error. Страница не найдена\n        </span>\n    </div>\n</div>\n<div class=\"paint-background\"></div>\n";
},"useData":true});

/***/ }),

/***/ 917:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var Handlebars = __webpack_require__(168);
function __default(obj) { return obj && (obj.__esModule ? obj["default"] : obj); }
module.exports = (Handlebars["default"] || Handlebars).template({"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data) {
    return "<div class=\"paint-background\"></div>\n<div class=\"content_login\">\n    <div class=\"left_login paint-background\">\n        <div class=\"login\">\n            <div class=\"page-name_login text-normal-huge\" id=\"inForm\">Авторизация</div>\n            <div class=\"login-form\" id=\"login-form\">\n            </div>\n            <div class=\"signup__signin text-normal-default\">\n                Еще нет аккаунта?\n                <a href=\"/signup\" class=\"link\">Зарегистрироваться</a>\n            </div>\n        </div>\n    </div>\n    <div class=\"right paint-purple\">\n        <img type=\"image\" class=\"login-right-img\" src=\"./img/LoginRightImg.png\" alt=\"LoginRightImg\">\n    </div>\n</div>\n<div class=\"paint-purple\"></div>\n";
},"useData":true});

/***/ }),

/***/ 718:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var Handlebars = __webpack_require__(168);
function __default(obj) { return obj && (obj.__esModule ? obj["default"] : obj); }
module.exports = (Handlebars["default"] || Handlebars).template({"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data) {
    return "<div class=\"paint-background\"></div>\n<div class=\"content_main\">\n    <div class=\"content__catalog\" id=\"catalog\"></div>\n    <div class=\"content__sales-title text-normal-huge\">\n        Время скидок\n        <div class=\"content__popular-title__timer text-normal-large disabled\">\n            06:35\n        </div>\n    </div>\n    <div class=\"content__sales\">\n        <div type=\"left-arrow\">\n            <button type=\"button\" class=\"arrow-button arrow-button-left text-normal-default\">\n                <img src=\"../img/Left-arrow.png\" class=\"arrow\" alt=\"left arrow\">\n            </button>\n        </div>\n        <!--sales cards-->\n        <div type=\"right-arrow\" id=\"salesCard__right-arrow\">\n            <button type=\"button\" class=\"arrow-button arrow-button-right text-normal-default\">\n                <img src=\"img/Right-arrow.png\" class=\"arrow\" alt=\"right arrow\">\n            </button>\n        </div>\n    </div>\n\n    <div class=\"content__popular-title text-normal-huge\">\n        Популярное\n    </div>\n\n    <div class=\"content__popular\" id=\"itemCardsPopular\">\n        <div type=\"left-arrow\">\n            <button type=\"button\" class=\"arrow-button arrow-button-left text-normal-default\">\n                <img src=\"img/Left-arrow.png\" class=\"arrow\" alt=\"left-arrow\">\n            </button>\n        </div>\n        <!--popular cards-->\n        <div type=\"right-arrow\" id=\"popularCard__right-arrow\">\n            <button type=\"button\" class=\"arrow-button arrow-button-right text-normal-default\">\n                <img src=\"img/Right-arrow.png\" class=\"arrow\" alt=\"right-arrow\">\n            </button>\n        </div>\n    </div>\n</div>\n<div class=\"paint-background\"></div>\n";
},"useData":true});

/***/ }),

/***/ 124:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var Handlebars = __webpack_require__(168);
function __default(obj) { return obj && (obj.__esModule ? obj["default"] : obj); }
module.exports = (Handlebars["default"] || Handlebars).template({"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data) {
    return "<div class=\"paint-background\"></div>\n<div class=\"content_signup\">\n    <div class=\"left_signup paint-background\">\n        <div class=\"signup\">\n            <div class=\"page-name_signup text-normal-huge\" id=\"inForm\">Регистрация</div>\n            <div class=\"signup__form\" id=\"signup__form\">\n            </div>\n            <div class=\"signup__signin text-normal-default\">\n                Уже есть аккаунт?\n                <a href=\"/login\" class=\"link\">Войти</a>\n            </div>\n        </div>\n    </div>\n    <div class=\"paint-purple\">\n        <img type=\"image\" class=\"LoginRightImg\" src=\"./img/LoginRightImg.png\" alt=\"LoginRightImg\">\n    </div>\n</div>\n<div class=\"paint-purple\"></div>\n";
},"useData":true});

/***/ })

},
/******/ __webpack_require__ => { // webpackRuntimeModules
/******/ var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
/******/ var __webpack_exports__ = (__webpack_exec__(827));
/******/ }
]);