"use strict";

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

/**
 * Sacado de aqui. 
 * https://codereview.stackexchange.com/questions/147892/small-javascript-library-for-ecmascript-version-detection
 * 
 * Permite añadir compribaciones futuras que se detecten. 
 * TODO -> Se deberia cambiar eval por new Function por una mejor praxis.
 */
;

(function (root, name, factory) {
  'use strict';

  if ("function" === typeof define && define.amd) define([exports], factory);else if ((typeof exports === "undefined" ? "undefined" : _typeof(exports)) === 'object') factory(exports);else factory(root[name] = {});
})(void 0, 'esx', function (exports) {
  'use strict';

  var features = {
    "arrayComprehensions": "[for(_ of [0])_]",
    "arrowFunction": "(_=>_)",
    "class": "(class{})",
    "const": "const c=true",
    "defaultParams": "(function(a=false){})",
    "destructuring": "let {d}={a:true}",
    "forOf": "for(var b of [])",
    "generator": "(function*(){})",
    "getter": "({get a(){}})",
    "label": "l:0",
    "let": "let o",
    "reservedWords": "({catch:true})",
    "setter": "({set a(v){}})",
    "spread": "[...[]]",
    "stringInterpolation": "`$\{0}`",
    "stringLineBreak": "'\\\n'",
    "super": "({b(){super.a}})",
    "yield": "(function*(){yield true})"
  }; // exports.features = features;

  function evaluate(code) {
    try {
      eval(code);
      return true;
    } catch (e) {
      return false;
    }
  }
  /**
   * Check if a set of features are supported.
   */


  function supports() {
    var code = "(function(){";
    var i = 0,
        len = arguments.length;

    for (; i < len; ++i) {
      var feature = arguments[i].toString();
      if (features.hasOwnProperty(feature)) code += features[feature] + ';';
    }

    code += "})()";
    return evaluate(code);
  }

  exports.supports = supports;

  function checkES7() {
    return supports("arrayComprehensions");
  }

  function checkES6() {
    var methods = 'function' === typeof Object.assign && 'function' === typeof Object.freeze;
    var syntax = supports("arrowFunction", "class", "const", "forOf", "defaultParams", "destructuring", "super", "yield");
    return methods && syntax;
  }

  function checkES5() {
    var methods = 'function' === typeof [].filter && 'function' === typeof Function.prototype.bind && 'function' === typeof Object.defineProperty && 'function' === typeof ''.trim && 'object' === (typeof JSON === "undefined" ? "undefined" : _typeof(JSON));
    var syntax = supports("reservedWords");
    return methods && syntax;
  }

  function checkES3() {
    return "function" === typeof [].hasOwnProperty;
  }
  /**
   * Check for ECMAScript version.
   */


  exports.detectVersion = function () {
    return checkES7() ? 7 : checkES6() ? 6 : checkES5() ? 5 : checkES3() ? 3 : null;
  };
});
//# sourceMappingURL=checkECMS.js.map