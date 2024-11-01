'use strict';

exports.ConfigAuthMode = void 0;
(function(ConfigAuthMode) {
    ConfigAuthMode["Redirect"] = "redirect";
    ConfigAuthMode["InNewTab"] = "new_tab";
    ConfigAuthMode["InNewWindow"] = "new_window";
})(exports.ConfigAuthMode || (exports.ConfigAuthMode = {}));
exports.ConfigResponseMode = void 0;
(function(ConfigResponseMode) {
    ConfigResponseMode["Redirect"] = "redirect";
    ConfigResponseMode["Callback"] = "callback";
})(exports.ConfigResponseMode || (exports.ConfigResponseMode = {}));
exports.ConfigSource = void 0;
(function(ConfigSource) {
    ConfigSource["LOWCODE"] = "lowcode";
})(exports.ConfigSource || (exports.ConfigSource = {}));
exports.Prompt = void 0;
(function(Prompt) {
    Prompt["Default"] = "";
    Prompt["None"] = "none";
    Prompt["Login"] = "login";
    Prompt["Consent"] = "consent";
    Prompt["SelectAccount"] = "select_account";
})(exports.Prompt || (exports.Prompt = {}));
