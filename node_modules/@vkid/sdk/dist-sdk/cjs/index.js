'use strict';

var auth = require('./auth/auth.js');
var types$1 = require('./auth/types.js');
var config = require('./core/config/config.js');
var types = require('./core/config/types.js');
var widget = require('./core/widget/widget.js');
var events = require('./core/widget/events.js');
var types$2 = require('./types.js');
var oneTap = require('./widgets/oneTap/oneTap.js');
var types$3 = require('./widgets/oneTap/types.js');
var events$1 = require('./widgets/oneTap/events.js');
var floatingOneTap = require('./widgets/floatingOneTap/floatingOneTap.js');
var types$4 = require('./widgets/floatingOneTap/types.js');
var events$2 = require('./widgets/floatingOneTap/events.js');
var oauthList = require('./widgets/oauthList/oauthList.js');
var types$5 = require('./widgets/oauthList/types.js');
var events$3 = require('./widgets/oauthList/events.js');

var globalConfig = new config.Config();
/** Export Auth */ auth.Auth.config = globalConfig;
var globalAuth = new auth.Auth();
/** Export Core Widget */ widget.Widget.config = globalConfig;
widget.Widget.auth = globalAuth;

Object.defineProperty(exports, 'AuthErrorCode', {
  enumerable: true,
  get: function () { return types$1.AuthErrorCode; }
});
Object.defineProperty(exports, 'ConfigAuthMode', {
  enumerable: true,
  get: function () { return types.ConfigAuthMode; }
});
Object.defineProperty(exports, 'ConfigResponseMode', {
  enumerable: true,
  get: function () { return types.ConfigResponseMode; }
});
Object.defineProperty(exports, 'ConfigSource', {
  enumerable: true,
  get: function () { return types.ConfigSource; }
});
Object.defineProperty(exports, 'Prompt', {
  enumerable: true,
  get: function () { return types.Prompt; }
});
Object.defineProperty(exports, 'WidgetEvents', {
  enumerable: true,
  get: function () { return events.WidgetEvents; }
});
Object.defineProperty(exports, 'Languages', {
  enumerable: true,
  get: function () { return types$2.Languages; }
});
Object.defineProperty(exports, 'Scheme', {
  enumerable: true,
  get: function () { return types$2.Scheme; }
});
exports.OneTap = oneTap.OneTap;
Object.defineProperty(exports, 'OneTapContentId', {
  enumerable: true,
  get: function () { return types$3.OneTapContentId; }
});
Object.defineProperty(exports, 'OneTapSkin', {
  enumerable: true,
  get: function () { return types$3.OneTapSkin; }
});
Object.defineProperty(exports, 'OneTapInternalEvents', {
  enumerable: true,
  get: function () { return events$1.OneTapInternalEvents; }
});
exports.FloatingOneTap = floatingOneTap.FloatingOneTap;
Object.defineProperty(exports, 'FloatingOneTapContentId', {
  enumerable: true,
  get: function () { return types$4.FloatingOneTapContentId; }
});
Object.defineProperty(exports, 'FloatingOneTapInternalEvents', {
  enumerable: true,
  get: function () { return events$2.FloatingOneTapInternalEvents; }
});
exports.OAuthList = oauthList.OAuthList;
Object.defineProperty(exports, 'OAuthName', {
  enumerable: true,
  get: function () { return types$5.OAuthName; }
});
Object.defineProperty(exports, 'OAuthListInternalEvents', {
  enumerable: true,
  get: function () { return events$3.OAuthListInternalEvents; }
});
exports.Auth = globalAuth;
exports.Config = globalConfig;
