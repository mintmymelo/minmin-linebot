require('source-map-support/register')
module.exports =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(1);


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

var express = __webpack_require__(2);
var line = __webpack_require__(3);

__webpack_require__(4).config();

var app = express();

var config = {
    channelAccessToken: 'iz4jrqAaHmI4hRueYLq/inHkuUtK3GEK8+1tJ7DDLPLq4KV4lDkm61klM2o59UpF7Gx+tv5kJ+7DfJZHKfQAuS051Uw2f9JaFAJe1+z+AkuCoJ53d0TGi+8/HlAas7X055k+3Q//EoBfM1sRPts64QdB04t89/1O/w1cDnyilFU=',
    channelSecret: '811a41c998754baaff7e2c39f6ffd20f'
};

var client = new line.Client(config);

app.post('/webhook', line.middleware(config), function (req, res) {
    Promise.all(req.body.events.map(handleEvent)).then(function (result) {
        return res.json(result);
    });
});

app.get('/', function (req, res) {
    res.send('minmin server');
});

function handleEvent(event) {

    console.log(event);
    if (event.type === 'message' && event.message.type === 'text') {
        handleMessageEvent(event);
    } else {
        return Promise.resolve(null);
    }
}

function handleMessageEvent(event) {
    var msg = {
        type: 'text',
        text: 'สวัสดีครัช'
    };

    return client.replyMessage(event.replyToken, msg);
}

app.set('port', process.env.PORT || 5000);

app.listen(app.get('port'), function () {
    console.log('run at port', app.get('port'));
});

/***/ }),
/* 2 */
/***/ (function(module, exports) {

module.exports = require("express");

/***/ }),
/* 3 */
/***/ (function(module, exports) {

module.exports = require("@line/bot-sdk");

/***/ }),
/* 4 */
/***/ (function(module, exports) {

module.exports = require("dotenv");

/***/ })
/******/ ]);
//# sourceMappingURL=main.map