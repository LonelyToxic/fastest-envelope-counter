'use strict';

var types = require('../types.js');

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
var _obj;
var TEXT_TYPE = (_obj = {}, _define_property(_obj, types.OneTapContentId.SIGN_IN, "default"), _define_property(_obj, types.OneTapContentId.SIGN_UP, "appoint"), _define_property(_obj, types.OneTapContentId.GET, "receive"), _define_property(_obj, types.OneTapContentId.OPEN, "open"), _define_property(_obj, types.OneTapContentId.CALCULATE, "calculate"), _define_property(_obj, types.OneTapContentId.ORDER, "order"), _define_property(_obj, types.OneTapContentId.PLACE_ORDER, "service_order_placing"), _define_property(_obj, types.OneTapContentId.SUBMIT_REQUEST, "request"), _define_property(_obj, types.OneTapContentId.PARTICIPATE, "take_part"), _obj);

exports.TEXT_TYPE = TEXT_TYPE;
