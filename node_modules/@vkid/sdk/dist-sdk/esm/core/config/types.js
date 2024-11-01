var ConfigAuthMode;
(function(ConfigAuthMode) {
    ConfigAuthMode["Redirect"] = 'redirect';
    ConfigAuthMode["InNewTab"] = 'new_tab';
    ConfigAuthMode["InNewWindow"] = 'new_window';
})(ConfigAuthMode || (ConfigAuthMode = {}));
var ConfigResponseMode;
(function(ConfigResponseMode) {
    ConfigResponseMode["Redirect"] = 'redirect';
    ConfigResponseMode["Callback"] = 'callback';
})(ConfigResponseMode || (ConfigResponseMode = {}));
var ConfigSource;
(function(ConfigSource) {
    ConfigSource["LOWCODE"] = 'lowcode';
})(ConfigSource || (ConfigSource = {}));
var Prompt;
(function(Prompt) {
    Prompt["Default"] = '';
    Prompt["None"] = 'none';
    Prompt["Login"] = 'login';
    Prompt["Consent"] = 'consent';
    Prompt["SelectAccount"] = 'select_account';
})(Prompt || (Prompt = {}));

export { ConfigAuthMode, ConfigResponseMode, ConfigSource, Prompt };
