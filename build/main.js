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
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var express = __webpack_require__(2);
var line = __webpack_require__(3);
var geoip = __webpack_require__(7);

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

function getCurrentLocation() {
    app.get('/', function (req, res) {
        var ip = req.ip;
        var geo = geoip.lookup(ip);
        console.log('==============current location==================');
        console.log(ip);
        console.log(geo);
        console.log('================================================');
    });
}

function handleMessageEvent(event) {
    var msg = {
        type: 'text',
        text: 'สวัสดีครัช'
    };

    var eventText = event.message.text.toLowerCase();

    if (eventText === 'image') {
        msg = {
            'type': 'image',
            'originalContentUrl': 'https://www.thesun.co.uk/wp-content/uploads/2017/03/fifa-17-2.jpg?strip=all&w=742&quality=100',
            'previewImageUrl': 'https://images.performgroup.com/di/library/GOAL/a6/bb/fifa-18-ronaldo_lx3r88bpjpk91re36ukdgomrj.jpg?t=2027563652&w=620&h=430'
        };
    } else if (eventText === 'location' || 'อยู่ไหน') {
        getCurrentLocation();
        msg = {
            "type": "location",
            "title": "my location",
            "address": "〒150-0002 東京都渋谷区渋谷２丁目２１−１",
            "latitude": 35.65910807942215,
            "longitude": 139.70372892916203
        };
    } else if (eventText === 'template button') {
        msg = {
            "type": "template",
            "altText": "this is a buttons template",
            "template": {
                "type": "buttons",
                "thumbnailImageUrl": "https://www.thesun.co.uk/wp-content/uploads/2017/03/fifa-17-2.jpg?strip=all&w=742&quality=100",
                "title": "Menu",
                "text": "Please select",
                "actions": [{
                    "type": "postback",
                    "label": "Buy",
                    "data": "action=buy&itemid=123"
                }, {
                    "type": "postback",
                    "label": "Add to cart",
                    "data": "action=add&itemid=123"
                }, {
                    "type": "uri",
                    "label": "View detail",
                    "uri": "http://example.com/page/123"
                }]
            }
        };
    } else if (eventText === 'template confirm') {
        msg = {
            "type": "template",
            "altText": "this is a confirm template",
            "template": {
                "type": "confirm",
                "text": "Are you sure?",
                "actions": [{
                    "type": "message",
                    "label": "Yes",
                    "text": "yes"
                }, {
                    "type": "message",
                    "label": "No",
                    "text": "no"
                }]
            }
        };
    } else if (eventText === 'carousel') {
        msg = {
            "type": "template",
            "altText": "this is a carousel template",
            "template": {
                "type": "carousel",
                "columns": [{
                    "thumbnailImageUrl": "https://www.thesun.co.uk/wp-content/uploads/2017/03/fifa-17-2.jpg?strip=all&w=742&quality=100",
                    "title": "this is menu",
                    "text": "description",
                    "actions": [{
                        "type": "postback",
                        "label": "Buy",
                        "data": "action=buy&itemid=111"
                    }, {
                        "type": "postback",
                        "label": "Add to cart",
                        "data": "action=add&itemid=111"
                    }, {
                        "type": "uri",
                        "label": "View detail",
                        "uri": "http://example.com/page/111"
                    }]
                }, {
                    "thumbnailImageUrl": "https://www.thesun.co.uk/wp-content/uploads/2017/03/fifa-17-2.jpg?strip=all&w=742&quality=100",
                    "title": "this is menu",
                    "text": "description",
                    "actions": [{
                        "type": "postback",
                        "label": "Buy",
                        "data": "action=buy&itemid=222"
                    }, {
                        "type": "postback",
                        "label": "Add to cart",
                        "data": "action=add&itemid=222"
                    }, {
                        "type": "uri",
                        "label": "View detail",
                        "uri": "http://example.com/page/222"
                    }]
                }]
            }
        };
    }

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

/***/ }),
/* 5 */
/***/ (function(module, exports) {

module.exports = require("fs");

/***/ }),
/* 6 */
/***/ (function(module, exports) {

module.exports = require("path");

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(__dirname) {var fs = __webpack_require__(5);
var net = __webpack_require__(8);
var path = __webpack_require__(6);

fs.existsSync = fs.existsSync || path.existsSync;

var utils = __webpack_require__(9);
var fsWatcher = __webpack_require__(10);
var async = __webpack_require__(11);

var watcherName = 'dataWatcher';


var geodatadir;

if (typeof global.geodatadir === 'undefined'){
	geodatadir = path.join(__dirname, '/../data/');
} else {
	geodatadir = global.geodatadir;
}

var dataFiles = {
	city: path.join(geodatadir, 'geoip-city.dat'),
	city6: path.join(geodatadir, 'geoip-city6.dat'),
	cityNames: path.join(geodatadir, 'geoip-city-names.dat'),
	country: path.join(geodatadir, 'geoip-country.dat'),
	country6: path.join(geodatadir, 'geoip-country6.dat')
};

var privateRange4 = [
		[utils.aton4('10.0.0.0'), utils.aton4('10.255.255.255')],
		[utils.aton4('172.16.0.0'), utils.aton4('172.31.255.255')],
		[utils.aton4('192.168.0.0'), utils.aton4('192.168.255.255')]
	]

var cache4 = {
	firstIP: null,
	lastIP: null,
	lastLine: 0,
	locationBuffer: null,
	locationRecordSize: 64,
	mainBuffer: null,
	recordSize: 12
};

var cache6 = {
	firstIP: null,
	lastIP: null,
	lastLine: 0,
	mainBuffer: null,
	recordSize: 58
};

var RECORD_SIZE = 10;
var RECORD_SIZE6 = 34

function lookup4(ip) {
	var fline = 0;
	var floor = cache4.lastIP;
	var cline = cache4.lastLine;
	var ceil = cache4.firstIP;
	var line;
	var locId;

	var buffer = cache4.mainBuffer;
	var locBuffer = cache4.locationBuffer;
	var privateRange = privateRange4;
	var recordSize = cache4.recordSize;
	var locRecordSize = cache4.locationRecordSize;

	var i;

	var geodata = {
		range: '',
		country: '',
		region: '',
		city: '',
		ll: [0, 0]
	};

	// outside IPv4 range
	if (ip > cache4.lastIP || ip < cache4.firstIP) {
		return null;
	}

	// private IP
	for (i = 0; i < privateRange.length; i++) {
		if (ip >= privateRange[i][0] && ip <= privateRange[i][1]) {
			return null;
		}
	}

	do {
		line = Math.round((cline - fline) / 2) + fline;
		floor = buffer.readUInt32BE(line * recordSize);
		ceil  = buffer.readUInt32BE((line * recordSize) + 4);

		if (floor <= ip && ceil >= ip) {
			geodata.range = [floor, ceil];

			if (recordSize === RECORD_SIZE) {
				geodata.country = buffer.toString('utf8', (line * recordSize) + 8, (line * recordSize) + 10);
			} else {
				locId = buffer.readUInt32BE((line * recordSize) + 8) - 1;

				geodata.country = locBuffer.toString('utf8', (locId * locRecordSize) + 0, (locId * locRecordSize) + 2).replace(/\u0000.*/, '');
				geodata.region = locBuffer.toString('utf8', (locId * locRecordSize) + 2, (locId * locRecordSize) + 4).replace(/\u0000.*/, '');
				geodata.ll = [locBuffer.readInt32BE((locId * locRecordSize) + 4) / 10000, locBuffer.readInt32BE((locId * locRecordSize) + 8) / 10000];
				geodata.metro = locBuffer.readInt32BE((locId * locRecordSize) + 12);
				geodata.zip = locBuffer.readInt32BE((locId * locRecordSize) + 16);
				geodata.city = locBuffer.toString('utf8', (locId * locRecordSize) + 20, (locId * locRecordSize) + locRecordSize).replace(/\u0000.*/, '');
			}

			return geodata;
		} else if (fline === cline) {
			return null;
		} else if (fline === (cline - 1)) {
			if (line === fline) {
				fline = cline;
			} else {
				cline = fline;
			}
		} else if (floor > ip) {
			cline = line;
		} else if (ceil < ip) {
			fline = line;
		}
	} while(1);
}

function lookup6(ip) {
	var buffer = cache6.mainBuffer;
	var recordSize = cache6.recordSize;

	var geodata = {
		range: '',
		country: '',
		region: '',
		city: '',
		ll: [0, 0]
	};

	// XXX We only use the first 8 bytes of an IPv6 address
	// This identifies the network, but not the host within
	// the network.  Unless at some point of time we have a
	// global peace treaty and single subnets span multiple
	// countries, this should not be a problem.
	function readip(line, offset) {
		var ii = 0;
		var ip = [];

		for (ii = 0; ii < 2; ii++) {
			ip.push(buffer.readUInt32BE((line * recordSize) + (offset * 16) + (ii * 4)));
		}

		return ip;
	}

	cache6.lastIP = readip(cache6.lastLine, 1);
	cache6.firstIP = readip(0, 0);

	var fline = 0;
	var floor = cache6.lastIP;
	var cline = cache6.lastLine;
	var ceil = cache6.firstIP;
	var line;

	if (utils.cmp6(ip, cache6.lastIP) > 0 || utils.cmp6(ip, cache6.firstIP) < 0) {
		return null;
	}

	do {
		line = Math.round((cline - fline) / 2) + fline;
		floor = readip(line, 0);
		ceil  = readip(line, 1);

		if (utils.cmp6(floor, ip) <= 0 && utils.cmp6(ceil, ip) >= 0) {
			if (recordSize === RECORD_SIZE6) {
				geodata.country = buffer.toString('utf8', (line * recordSize) + 32, (line * recordSize) + 34).replace(/\u0000.*/, '');
			} else {
				geodata.range = [floor, ceil];
				geodata.country = buffer.toString('utf8', (line * recordSize) + 32, (line * recordSize) + 34).replace(/\u0000.*/, '');
				geodata.region = buffer.toString('utf8', (line * recordSize) + 34, (line * recordSize) + 36).replace(/\u0000.*/, '');
				geodata.ll = [buffer.readInt32BE((line * recordSize) + 36) / 10000, buffer.readInt32BE((line * recordSize) + 40) / 10000];
				geodata.city = buffer.toString('utf8', (line * recordSize) + 44, (line * recordSize) + recordSize).replace(/\u0000.*/, '');
			}

			// We do not currently have detailed region/city info for IPv6, but finally have coords
			return geodata;
		} else if (fline === cline) {
			return null;
		} else if (fline === (cline - 1)) {
			if (line === fline) {
				fline = cline;
			} else {
				cline = fline;
			}
		} else if (utils.cmp6(floor, ip) > 0) {
			cline = line;
		} else if (utils.cmp6(ceil, ip) < 0) {
			fline = line;
		}
	} while(1);
}

function get4mapped(ip) {
    var ipv6 = ip.toUpperCase();
    var v6prefixes = ['0:0:0:0:0:FFFF:', '::FFFF:'];
    for (var i = 0; i < v6prefixes.length; i++) {
        var v6prefix = v6prefixes[i];
        if (ipv6.indexOf(v6prefix) == 0) {
            return ipv6.substring(v6prefix.length);
        }
    }
    return null;
}

function preload(callback) {
	var datFile;
	var datSize;
	var asyncCache = {
		firstIP: null,
		lastIP: null,
		lastLine: 0,
		locationBuffer: null,
		locationRecordSize: 64,
		mainBuffer: null,
		recordSize: 12
	};

	//when the preload function receives a callback, do the task asynchronously
	if (typeof arguments[0] === 'function') {
		async.series([
			function (cb) {
				async.series([
					function (cb2) {
						fs.open(dataFiles.cityNames, 'r', function (err, file) {
							datFile = file;
							cb2(err);
						});
					},
					function (cb2) {
						fs.fstat(datFile, function (err, stats) {
							datSize = stats.size;
							asyncCache.locationBuffer = new Buffer(datSize);
							cb2(err);
						});
					},
					function (cb2) {
						fs.read(datFile, asyncCache.locationBuffer, 0, datSize, 0, cb2);
					},
					function (cb2) {
						fs.close(datFile, cb2);
					},
					function (cb2) {
						fs.open(dataFiles.city, 'r', function (err, file) {
							datFile = file;
							cb2(err);
						});
					},
					function (cb2) {
						fs.fstat(datFile, function (err, stats) {
							datSize = stats.size;
							cb2(err);
						});
					}
				], function (err) {
					if (err) {
						if (err.code !== 'ENOENT' && err.code !== 'EBADF') {
							throw err;
						}

						fs.open(dataFiles.country, 'r', function (err, file) {
							if (err) {
								cb(err);
							} else {
								datFile = file;
								fs.fstat(datFile, function (err, stats) {
									datSize = stats.size;
									asyncCache.recordSize = RECORD_SIZE;

									cb();
								});
							}
						});
						
					} else {
						cb();
					}
				});
			},
			function () {
				asyncCache.mainBuffer = new Buffer(datSize);
				
				async.series([
					function (cb2) {
						fs.read(datFile, asyncCache.mainBuffer, 0, datSize, 0, cb2);
					},
					function (cb2) {
						fs.close(datFile, cb2);
					}
				], function (err) {
					if (err) {
						//keep old cache
					} else {
						asyncCache.lastLine = (datSize / asyncCache.recordSize) - 1;
						asyncCache.lastIP = asyncCache.mainBuffer.readUInt32BE((asyncCache.lastLine * asyncCache.recordSize) + 4);
						cache4 = asyncCache;
					}
					callback(err);
				});
			}
		]);
	} else {
		try {
			datFile = fs.openSync(dataFiles.cityNames, 'r');
			datSize = fs.fstatSync(datFile).size;

			if (datSize === 0) {
				throw {
					code: 'EMPTY_FILE'
				};
			}

			cache4.locationBuffer = new Buffer(datSize);
			fs.readSync(datFile, cache4.locationBuffer, 0, datSize, 0);
			fs.closeSync(datFile);

			datFile = fs.openSync(dataFiles.city, 'r');
			datSize = fs.fstatSync(datFile).size;
		} catch(err) {
			if (err.code !== 'ENOENT' && err.code !== 'EBADF' && err.code !== 'EMPTY_FILE') {
				throw err;
			}

			datFile = fs.openSync(dataFiles.country, 'r');
			datSize = fs.fstatSync(datFile).size;
			cache4.recordSize = RECORD_SIZE;
		}

		cache4.mainBuffer = new Buffer(datSize);
		fs.readSync(datFile, cache4.mainBuffer, 0, datSize, 0);

		fs.closeSync(datFile);

		cache4.lastLine = (datSize / cache4.recordSize) - 1;
		cache4.lastIP = cache4.mainBuffer.readUInt32BE((cache4.lastLine * cache4.recordSize) + 4);
		cache4.firstIP = cache4.mainBuffer.readUInt32BE(0);
	}
}

function preload6(callback) {
	var datFile;
	var datSize;
	var asyncCache6 = {
		firstIP: null,
		lastIP: null,
		lastLine: 0,
		mainBuffer: null,
		recordSize: 58
	};

	//when the preload function receives a callback, do the task asynchronously
	if (typeof arguments[0] === 'function') {
		async.series([
			function (cb) {
				async.series([
					function (cb2) {
						fs.open(dataFiles.city6, 'r', function (err, file) {
							datFile = file;
							cb2(err);
						});
					},
					function (cb2) {
						fs.fstat(datFile, function (err, stats) {
							datSize = stats.size;
							cb2(err);
						});
					}
				], function (err) {
					if (err) {
						if (err.code !== 'ENOENT' && err.code !== 'EBADF') {
							throw err;
						}

						fs.open(dataFiles.country6, 'r', function (err, file) {
							if (err) {
								cb(err);
							} else {
								datFile = file;
								fs.fstat(datFile, function (err, stats) {
									datSize = stats.size;
									asyncCache6.recordSize = RECORD_SIZE6;

									cb();
								});
							}
						});
					} else {
						cb();
					}
				});
			},
			function () {
				asyncCache6.mainBuffer = new Buffer(datSize);
				
				async.series([
					function (cb2) {
						fs.read(datFile, asyncCache6.mainBuffer, 0, datSize, 0, cb2);
					},
					function (cb2) {
						fs.close(datFile, cb2);
					}
				], function (err) {
					if (err) {
						//keep old cache
					} else {
						asyncCache6.lastLine = (datSize / asyncCache6.recordSize) - 1;
						cache6 = asyncCache6;
					}
					callback(err);
				});
			}
		]);
	} else {
		try {
			datFile = fs.openSync(dataFiles.city6, 'r');
			datSize = fs.fstatSync(datFile).size;

			if (datSize === 0) {
				throw {
					code: 'EMPTY_FILE'
				};
			}
		} catch(err) {
			if (err.code !== 'ENOENT' && err.code !== 'EBADF' && err.code !== 'EMPTY_FILE') {
				throw err;
			}

			datFile = fs.openSync(dataFiles.country6, 'r');
			datSize = fs.fstatSync(datFile).size;
			cache6.recordSize = RECORD_SIZE6;
		}

		cache6.mainBuffer = new Buffer(datSize);
		fs.readSync(datFile, cache6.mainBuffer, 0, datSize, 0);

		fs.closeSync(datFile);

		cache6.lastLine = (datSize / cache6.recordSize) - 1;
	}
}

module.exports = {
	cmp: utils.cmp,

	lookup: function(ip) {
		if (!ip) {
			return null;
		} else if (typeof ip === 'number') {
			return lookup4(ip);
		} else if (net.isIP(ip) === 4) {
			return lookup4(utils.aton4(ip));
		} else if (net.isIP(ip) === 6) {
			var ipv4 = get4mapped(ip);
			if (ipv4) {
				return lookup4(utils.aton4(ipv4));
			} else {
				return lookup6(utils.aton6(ip));
			}
		}

		return null;
	},

	pretty: function(n) {
		if (typeof n === 'string') {
			return n;
		} else if (typeof n === 'number') {
			return utils.ntoa4(n);
		} else if (n instanceof Array) {
			return utils.ntoa6(n);
		}

		return n;
	},

	// Start watching for data updates. The watcher waits one minute for file transfer to 
	// completete before triggering the callback.
	startWatchingDataUpdate: function (callback) {
		fsWatcher.makeFsWatchFilter(watcherName, geodatadir, 60*1000, function () {
			//Reload data
			async.series([
				function (cb) {
					preload(cb);
				},
				function (cb) {
					preload6(cb);
				}
			], callback);
		});
	},

	// Stop watching for data updates.
	stopWatchingDataUpdate: function () {
		fsWatcher.stopWatching(watcherName);
	}
};

preload();
preload6();

//lookup4 = gen_lookup('geoip-country.dat', 4);
//lookup6 = gen_lookup('geoip-country6.dat', 16);

/* WEBPACK VAR INJECTION */}.call(exports, "node_modules/geoip-lite/lib"))

/***/ }),
/* 8 */
/***/ (function(module, exports) {

module.exports = require("net");

/***/ }),
/* 9 */
/***/ (function(module, exports) {

var utils = module.exports = {};

utils.aton4 = function(a) {
  a = a.split(/\./);
  return ((parseInt(a[0], 10)<<24)>>>0) + ((parseInt(a[1], 10)<<16)>>>0) + ((parseInt(a[2], 10)<<8)>>>0) + (parseInt(a[3], 10)>>>0);
};

utils.aton6 = function(a) {
  a = a.replace(/"/g, '').split(/:/);

  var l = a.length - 1;
  var i;

  if (a[l] === '') {
    a[l] = 0;
  }

  if (l < 7) {
    a.length = 8;

    for (i = l; i >= 0 && a[i] !== ''; i--) {
      a[7-l+i] = a[i];
    }
  }

  for (i = 0; i < 8; i++) {
    if (!a[i]) {
      a[i]=0;
    } else {
      a[i] = parseInt(a[i], 16);
    }
  }

  var r = [];
  for (i = 0; i<4; i++) {
    r.push(((a[2*i]<<16) + a[2*i+1])>>>0);
  }

  return r;
};


utils.cmp = function(a, b) {
  if (typeof a === 'number' && typeof b === 'number') {
    return (a < b ? -1 : (a > b ? 1 : 0));
  }

  if (a instanceof Array && b instanceof Array) {
    return this.cmp6(a, b);
  }

  return null;
};

utils.cmp6 = function(a, b) {
  for (var ii = 0; ii < 2; ii++) {
    if (a[ii] < b[ii]) {
      return -1;
    }

    if (a[ii] > b[ii]) {
      return 1;
    }
  }

  return 0;
};

utils.isPrivateIP = function(addr) {
  addr = addr.toString();

  return addr.match(/^10\.([0-9]{1,3})\.([0-9]{1,3})\.([0-9]{1,3})/) != null ||
    addr.match(/^192\.168\.([0-9]{1,3})\.([0-9]{1,3})/) != null ||
    addr.match(/^172\.16\.([0-9]{1,3})\.([0-9]{1,3})/) != null ||
    addr.match(/^127\.([0-9]{1,3})\.([0-9]{1,3})\.([0-9]{1,3})/) != null ||
    addr.match(/^169\.254\.([0-9]{1,3})\.([0-9]{1,3})/) != null ||
    addr.match(/^fc00:/) != null || addr.match(/^fe80:/) != null;
};

utils.ntoa4 = function(n) {
  n = n.toString();
  n = '' + (n>>>24&0xff) + '.' + (n>>>16&0xff) + '.' + (n>>>8&0xff) + '.' + (n&0xff);

  return n;
};

utils.ntoa6 = function(n) {
  var a = "[";

  for (var i = 0; i<n.length; i++) {
    a += (n[i]>>>16).toString(16) + ':';
    a += (n[i]&0xffff).toString(16) + ':';
  }

  a = a.replace(/:$/, ']').replace(/:0+/g, ':').replace(/::+/, '::');

  return a;
};

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

var fs = __webpack_require__(5),
    path = __webpack_require__(6),
    FSWatcher = {};

/**
 * Takes a directory/file and watch for change. Upon change, call the
 * callback.
 *
 * @param {String} name: name of this watcher
 * @param {String} directory: path to the directory to watch
 * @param {String} [filename]: (optional) specific filename to watch for,
 *     watches for all files in the directory if unspecified
 * @param {Integer} cooldownDelay: delay to wait before triggering the callback
 * @param {Function} callback: function () : called when changes are detected
**/
function makeFsWatchFilter(name, directory, filename, cooldownDelay, callback) {
	var cooldownId = null;

	//Delete the cooldownId and callback the outer function
	function timeoutCallback() {
		cooldownId = null;
		callback();
	}

	//This function is called when there is a change in the data directory
	//It sets a timer to wait for the change to be completed
	function onWatchEvent(event, changedFile) {
		var filePath = path.join(directory, changedFile);

		if (!filename || filename === changedFile) {
			fs.exists(filePath, function onExists(exists) {
				if (!exists) {
					// if the changed file no longer exists, it was a deletion.
					// we ignore deleted files
					return;
				}

				//At this point, a new file system activity has been detected,
				//We have to wait for file transfert to be finished before moving on.

				//If a cooldownId already exists, we delete it
				if (cooldownId !== null) {
					clearTimeout(cooldownId);
					cooldownId = null;
				}

				//Once the cooldownDelay has passed, the timeoutCallback function will be called
				cooldownId = setTimeout(timeoutCallback, cooldownDelay);
			});
		}
	}

	//Manage the case where filename is missing (because it's optionnal)
	if (typeof cooldownDelay === 'function') {
		callback = cooldownDelay;
		cooldownDelay = filename;
		filename = null;
	}

	if (FSWatcher[name]) {
		stopWatching(name);
	}

	FSWatcher[name] = fs.watch(directory, onWatchEvent);
}

/**
 * Take a FSWatcher object and close it.
 *
 * @param {string} name: name of the watcher to close
 *
**/
function stopWatching(name) {
	FSWatcher[name].close();
}

module.exports.makeFsWatchFilter = makeFsWatchFilter;
module.exports.stopWatching = stopWatching;


/***/ }),
/* 11 */
/***/ (function(module, exports) {

module.exports = require("async");

/***/ })
/******/ ]);
//# sourceMappingURL=main.map