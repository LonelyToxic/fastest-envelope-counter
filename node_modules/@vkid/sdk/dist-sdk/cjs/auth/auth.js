'use strict';

require('./../lib/@vkontakte/vkjs/lib/es6/detections.js');
var querystring = require('./../lib/@vkontakte/vkjs/lib/es6/querystring.js');
var AuthStatsCollector = require('./analytics/AuthStatsCollector.js');
var authDataService = require('./authDataService.js');
require('../core/config/config.js');
var types = require('../core/config/types.js');
var cookie = require('../utils/cookie.js');
var domain = require('../utils/domain.js');
var oauth = require('../utils/oauth.js');
var url = require('../utils/url/url.js');
var uuid = require('../utils/uuid.js');
require('../widgets/oauthList/oauthList.js');
var types$2 = require('../widgets/oauthList/types.js');
require('../widgets/oauthList/events.js');
var constants = require('./constants.js');
var types$1 = require('./types.js');

function _array_like_to_array(arr, len) {
    if (len == null || len > arr.length) len = arr.length;
    for(var i = 0, arr2 = new Array(len); i < len; i++)arr2[i] = arr[i];
    return arr2;
}
function _array_without_holes(arr) {
    if (Array.isArray(arr)) return _array_like_to_array(arr);
}
function _class_call_check(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
        throw new TypeError("Cannot call a class as a function");
    }
}
function _defineProperties(target, props) {
    for(var i = 0; i < props.length; i++){
        var descriptor = props[i];
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ("value" in descriptor) descriptor.writable = true;
        Object.defineProperty(target, descriptor.key, descriptor);
    }
}
function _create_class(Constructor, protoProps, staticProps) {
    if (protoProps) _defineProperties(Constructor.prototype, protoProps);
    if (staticProps) _defineProperties(Constructor, staticProps);
    return Constructor;
}
function _define_property(obj, key, value) {
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
function _iterable_to_array(iter) {
    if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter);
}
function _non_iterable_spread() {
    throw new TypeError("Invalid attempt to spread non-iterable instance.\\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function _to_consumable_array(arr) {
    return _array_without_holes(arr) || _iterable_to_array(arr) || _unsupported_iterable_to_array(arr) || _non_iterable_spread();
}
function _unsupported_iterable_to_array(o, minLen) {
    if (!o) return;
    if (typeof o === "string") return _array_like_to_array(o, minLen);
    var n = Object.prototype.toString.call(o).slice(8, -1);
    if (n === "Object" && o.constructor) n = o.constructor.name;
    if (n === "Map" || n === "Set") return Array.from(n);
    if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _array_like_to_array(o, minLen);
}
var CODE_CHALLENGE_METHOD = "s256";
var Auth = /*#__PURE__*/ function() {
    function Auth() {
        var _this = this;
        _class_call_check(this, Auth);
        _define_property(this, "dataService", void 0);
        _define_property(this, "opener", void 0);
        _define_property(this, "interval", void 0);
        _define_property(this, "id", uuid.uuid());
        _define_property(this, "analytics", void 0);
        _define_property(this, "state", void 0);
        _define_property(this, "close", function() {
            _this.opener && _this.opener.close();
        });
        _define_property(this, "handleMessage", function(param) {
            var origin = param.origin, source = param.source, data = param.data;
            if (source !== _this.opener || !_this.opener || !domain.isDomainAllowed(origin)) {
                return;
            }
            _this.unsubscribe();
            if (data.payload.error) {
                _this.dataService.sendAuthorizationFailed(data.payload.error);
                return;
            }
            // eslint-disable-next-line @typescript-eslint/restrict-plus-operands
            if (data.action === constants.OAUTH2_RESPONSE + _this.state) {
                if (_this.state !== data.payload.state) {
                    _this.dataService.sendStateMismatchError();
                } else {
                    cookie.setExtIdCookie(data.payload.ext_id);
                    delete data.payload.ext_id;
                    // Сбрасываем после проверки
                    cookie.clearStateCookie();
                    _this.state = "";
                    var responseMode = Auth.config.get().responseMode;
                    if (responseMode === types.ConfigResponseMode.Redirect) {
                        _this.redirectWithPayload(data.payload);
                        _this.close();
                    } else {
                        _this.dataService.sendSuccessData(data.payload);
                    }
                }
                return;
            }
            _this.dataService.sendEventNotSupported();
        });
        _define_property(this, "handleInterval", function() {
            var _this_opener;
            if ((_this_opener = _this.opener) === null || _this_opener === void 0 ? void 0 : _this_opener.closed) {
                _this.unsubscribe();
                _this.dataService.sendNewTabHasBeenClosed();
            }
        });
        _define_property(this, "subscribe", function() {
            _this.interval = window.setInterval(_this.handleInterval, 1000);
            window.addEventListener("message", _this.handleMessage);
            _this.dataService.removeCallback();
        });
        _define_property(this, "unsubscribe", function() {
            window.removeEventListener("message", _this.handleMessage);
            clearInterval(_this.interval);
            _this.dataService.setCallback(_this.close);
        });
        _define_property(this, "loginInNewTab", function(url) {
            var opener = window.open(url, "_blank");
            return _this.handleWindowOpen(opener);
        });
        _define_property(this, "loginInNewWindow", function(url) {
            var width = 800;
            var height = 800;
            var top = screen.height / 2 - height / 2;
            var left = screen.width / 2 - width / 2;
            var windowFeatures = "top=".concat(top, ",left=").concat(left, ",width=").concat(width, ",height=").concat(height, ",location");
            var opener = window.open(url, "_blank", windowFeatures);
            return _this.handleWindowOpen(opener);
        });
        _define_property(this, "handleWindowOpen", function(opener) {
            _this.dataService = new authDataService.AuthDataService();
            _this.opener = opener;
            if (_this.opener) {
                _this.subscribe();
            } else {
                _this.dataService.sendCannotCreateNewTab();
            }
            return _this.dataService.value;
        });
        _define_property(this, "loginByRedirect", function(url) {
            location.assign(url);
            return Promise.resolve();
        });
        _define_property(this, "login", function(params) {
            var _params, _params1, _params2, _params3, _params4, _params5, _params6;
            var config = Auth.config.get();
            var scope = config.scope, app = config.app, codeChallenge = config.codeChallenge, prompt = config.prompt;
            var flowSource = ((_params = params) === null || _params === void 0 ? void 0 : _params.statsFlowSource) || types$1.AuthStatsFlowSource.AUTH;
            var sessionId = ((_params1 = params) === null || _params1 === void 0 ? void 0 : _params1.uniqueSessionId) || _this.id;
            if (flowSource === types$1.AuthStatsFlowSource.AUTH) {
                _this.analytics.setUniqueSessionId(sessionId);
            }
            cookie.codeVerifier(config.codeVerifier);
            _this.state = cookie.state(config.state);
            var authorizePrompt = _to_consumable_array(prompt);
            // Если открыто из 3-в-1, добавляем login в начало
            var hasProvider = Object.values(types$2.ExternalOAuthName).includes((_params2 = params) === null || _params2 === void 0 ? void 0 : _params2.provider);
            if (hasProvider) {
                authorizePrompt.unshift(types.Prompt.Login);
            }
            var queryParams = {
                lang_id: (_params3 = params) === null || _params3 === void 0 ? void 0 : _params3.lang,
                scheme: (_params4 = params) === null || _params4 === void 0 ? void 0 : _params4.scheme,
                code_challenge: codeChallenge || oauth.generateCodeChallenge(cookie.codeVerifier()),
                code_challenge_method: CODE_CHALLENGE_METHOD,
                client_id: app,
                response_type: constants.OAUTH2_RESPONSE_TYPE,
                scope: scope,
                state: _this.state,
                provider: (_params5 = params) === null || _params5 === void 0 ? void 0 : _params5.provider,
                prompt: authorizePrompt.join(" ").trim(),
                stats_info: url.encodeStatsInfo({
                    flow_source: flowSource,
                    session_id: sessionId
                })
            };
            if (config.mode !== types.ConfigAuthMode.Redirect) {
                if (flowSource === types$1.AuthStatsFlowSource.AUTH) {
                    var _params7;
                    void _this.analytics.sendCustomAuthStart((_params7 = params) === null || _params7 === void 0 ? void 0 : _params7.provider);
                }
                queryParams.origin = location.protocol + "//" + location.hostname;
            }
            var url$1 = url.getVKIDUrl("authorize", queryParams, config);
            if ((_params6 = params) === null || _params6 === void 0 ? void 0 : _params6.screen) {
                var _params8;
                Object.assign(queryParams, {
                    oauth_version: 2,
                    screen: (_params8 = params) === null || _params8 === void 0 ? void 0 : _params8.screen,
                    redirect_state: _this.state
                });
                url$1 = url.getVKIDUrl("auth", queryParams, config);
            }
            switch(config.mode){
                case types.ConfigAuthMode.InNewWindow:
                    return _this.loginInNewWindow(url$1);
                case types.ConfigAuthMode.InNewTab:
                    return _this.loginInNewTab(url$1);
                default:
                    {
                        if (flowSource === types$1.AuthStatsFlowSource.AUTH) {
                            var _params9;
                            return _this.analytics.sendCustomAuthStart((_params9 = params) === null || _params9 === void 0 ? void 0 : _params9.provider).finally(function() {
                                void _this.loginByRedirect(url$1);
                            });
                        }
                        return _this.loginByRedirect(url$1);
                    }
            }
        });
        this.analytics = new AuthStatsCollector.AuthStatsCollector(Auth.config);
    }
    _create_class(Auth, [
        {
            key: "checkState",
            value: function checkState(stateToCheck) {
                if (this.state !== stateToCheck) {
                    return {
                        code: types$1.AuthErrorCode.StateMismatch,
                        error: constants.AUTH_ERROR_TEXT[types$1.AuthErrorCode.StateMismatch],
                        state: stateToCheck
                    };
                }
                cookie.clearStateCookie();
                this.state = "";
            }
        },
        {
            key: "exchangeCode",
            value: function exchangeCode(code, deviceId) {
                var _this = this;
                var config = Auth.config.get();
                this.state = cookie.state(config.state);
                var queryParams = {
                    grant_type: "authorization_code",
                    redirect_uri: config.redirectUrl,
                    client_id: config.app,
                    code_verifier: cookie.codeVerifier(),
                    state: this.state,
                    device_id: deviceId
                };
                var queryParamsString = querystring.querystring.stringify(queryParams);
                return fetch("https://".concat(config.__vkidDomain, "/oauth2/auth?").concat(queryParamsString), {
                    method: "POST",
                    body: new URLSearchParams({
                        code: code
                    })
                }).then(function(res) {
                    return _this.oauthSectionFetchHandler(res);
                }).then(function(res) {
                    var checkStateError = _this.checkState(res.state);
                    if (checkStateError) {
                        throw checkStateError;
                    }
                    // Сбрасываем динамические параметры после обмена кода
                    cookie.clearCodeVerifierCookie();
                    return res;
                });
            }
        },
        {
            key: "refreshToken",
            value: function refreshToken(refreshToken, deviceId) {
                var _this = this;
                var config = Auth.config.get();
                this.state = cookie.state(config.state);
                var queryParams = {
                    grant_type: "refresh_token",
                    redirect_uri: config.redirectUrl,
                    client_id: config.app,
                    device_id: deviceId,
                    state: this.state
                };
                var queryParamsString = querystring.querystring.stringify(queryParams);
                return fetch("https://".concat(config.__vkidDomain, "/oauth2/auth?").concat(queryParamsString), {
                    method: "POST",
                    body: new URLSearchParams({
                        refresh_token: refreshToken
                    })
                }).then(function(res) {
                    return _this.oauthSectionFetchHandler(res);
                }).then(function(res) {
                    var checkStateError = _this.checkState(res.state);
                    if (checkStateError) {
                        throw checkStateError;
                    }
                    Auth.config.update({
                        state: config.state
                    });
                    return res;
                });
            }
        },
        {
            key: "logout",
            value: function logout(accessToken) {
                var _this = this;
                var config = Auth.config.get();
                var queryParams = {
                    client_id: config.app
                };
                var queryParamsString = querystring.querystring.stringify(queryParams);
                return fetch("https://".concat(config.__vkidDomain, "/oauth2/logout?").concat(queryParamsString), {
                    method: "POST",
                    body: new URLSearchParams({
                        access_token: accessToken
                    })
                }).then(function(res) {
                    return _this.oauthSectionFetchHandler(res);
                });
            }
        },
        {
            key: "userInfo",
            value: function userInfo(accessToken) {
                var _this = this;
                var config = Auth.config.get();
                var queryParams = {
                    client_id: config.app
                };
                var queryParamsString = querystring.querystring.stringify(queryParams);
                return fetch("https://".concat(config.__vkidDomain, "/oauth2/user_info?").concat(queryParamsString), {
                    method: "POST",
                    body: new URLSearchParams({
                        access_token: accessToken
                    })
                }).then(function(res) {
                    return _this.oauthSectionFetchHandler(res);
                });
            }
        },
        {
            key: "publicInfo",
            value: function publicInfo(idToken) {
                var _this = this;
                var config = Auth.config.get();
                var queryParams = {
                    client_id: config.app
                };
                var queryParamsString = querystring.querystring.stringify(queryParams);
                return fetch("https://".concat(config.__vkidDomain, "/oauth2/public_info?").concat(queryParamsString), {
                    method: "POST",
                    body: new URLSearchParams({
                        id_token: idToken
                    })
                }).then(function(res) {
                    return _this.oauthSectionFetchHandler(res);
                });
            }
        },
        {
            key: "oauthSectionFetchHandler",
            value: function oauthSectionFetchHandler(res) {
                return res.json().then(function(resJson) {
                    if ("error" in resJson) {
                        throw resJson;
                    }
                    return resJson;
                });
            }
        },
        {
            key: "redirectWithPayload",
            value: function redirectWithPayload(payload) {
                location.assign(url.getRedirectWithPayloadUrl(payload, Auth.config));
            }
        }
    ]);
    return Auth;
}();
/**
   * @ignore
   */ _define_property(Auth, "config", void 0);

exports.Auth = Auth;
