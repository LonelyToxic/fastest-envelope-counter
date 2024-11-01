'use strict';

var types = require('../../../types.js');
var types$1 = require('../types.js');

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
var SIGN_IN_SHORT = (_obj = {}, _define_property(_obj, types.Languages.RUS, "Продолжить"), _define_property(_obj, types.Languages.UKR, "Продовжити"), _define_property(_obj, types.Languages.BEL, "Працягнуць"), _define_property(_obj, types.Languages.KAZ, "Жалғастыру"), _define_property(_obj, types.Languages.UZB, "Davom etish"), _define_property(_obj, types.Languages.ENG, "Continue"), _define_property(_obj, types.Languages.SPA, "Continuar"), _define_property(_obj, types.Languages.GERMAN, "Fortfahren"), _define_property(_obj, types.Languages.POL, "Kontynuuj"), _define_property(_obj, types.Languages.FRA, "Continuer"), _define_property(_obj, types.Languages.TURKEY, "Devam"), _obj);
var _obj1;
var SIGN_UP_SHORT = (_obj1 = {}, _define_property(_obj1, types.Languages.RUS, "Записаться"), _define_property(_obj1, types.Languages.UKR, "Записатися"), _define_property(_obj1, types.Languages.BEL, "Запісацца"), _define_property(_obj1, types.Languages.KAZ, "Жазылу"), _define_property(_obj1, types.Languages.UZB, "Yozilish"), _define_property(_obj1, types.Languages.ENG, "Sign up"), _define_property(_obj1, types.Languages.SPA, "Registrarse"), _define_property(_obj1, types.Languages.GERMAN, "Anmelden"), _define_property(_obj1, types.Languages.POL, "Zapisz się"), _define_property(_obj1, types.Languages.FRA, "Prendre RDV"), _define_property(_obj1, types.Languages.TURKEY, "Kaydol"), _obj1);
var _obj2;
var GET_SHORT = (_obj2 = {}, _define_property(_obj2, types.Languages.RUS, "Получить"), _define_property(_obj2, types.Languages.UKR, "Отримати"), _define_property(_obj2, types.Languages.BEL, "Атрымаць"), _define_property(_obj2, types.Languages.KAZ, "Алу"), _define_property(_obj2, types.Languages.UZB, "Olish"), _define_property(_obj2, types.Languages.ENG, "Get"), _define_property(_obj2, types.Languages.SPA, "Obtener"), _define_property(_obj2, types.Languages.GERMAN, "Erhalten"), _define_property(_obj2, types.Languages.POL, "Otrzymaj"), _define_property(_obj2, types.Languages.FRA, "Obtenir"), _define_property(_obj2, types.Languages.TURKEY, "Al"), _obj2);
var _obj3;
var OPEN_SHORT = (_obj3 = {}, _define_property(_obj3, types.Languages.RUS, "Открыть"), _define_property(_obj3, types.Languages.UKR, "Відкрити"), _define_property(_obj3, types.Languages.BEL, "Адкрыць"), _define_property(_obj3, types.Languages.KAZ, "Ашу"), _define_property(_obj3, types.Languages.UZB, "Ochish"), _define_property(_obj3, types.Languages.ENG, "Open"), _define_property(_obj3, types.Languages.SPA, "Abrir"), _define_property(_obj3, types.Languages.GERMAN, "\xd6ffnen"), _define_property(_obj3, types.Languages.POL, "Otw\xf3rz"), _define_property(_obj3, types.Languages.FRA, "Ouvrir"), _define_property(_obj3, types.Languages.TURKEY, "A\xe7"), _obj3);
var _obj4;
var CALCULATE_SHORT = (_obj4 = {}, _define_property(_obj4, types.Languages.RUS, "Рассчитать"), _define_property(_obj4, types.Languages.UKR, "Розрахувати"), _define_property(_obj4, types.Languages.BEL, "Разлічыць"), _define_property(_obj4, types.Languages.KAZ, "Есептеу"), _define_property(_obj4, types.Languages.UZB, "Hisoblash"), _define_property(_obj4, types.Languages.ENG, "Calculate"), _define_property(_obj4, types.Languages.SPA, "Calcular"), _define_property(_obj4, types.Languages.GERMAN, "Berechnen"), _define_property(_obj4, types.Languages.POL, "Oblicz"), _define_property(_obj4, types.Languages.FRA, "Calculer"), _define_property(_obj4, types.Languages.TURKEY, "Hesapla"), _obj4);
var _obj5;
var ORDER_SHORT = (_obj5 = {}, _define_property(_obj5, types.Languages.RUS, "Заказать"), _define_property(_obj5, types.Languages.UKR, "Замовити"), _define_property(_obj5, types.Languages.BEL, "Заказаць"), _define_property(_obj5, types.Languages.KAZ, "Тапсырыс беру"), _define_property(_obj5, types.Languages.UZB, "Buyurtma berish"), _define_property(_obj5, types.Languages.ENG, "Order"), _define_property(_obj5, types.Languages.SPA, "Pedir"), _define_property(_obj5, types.Languages.GERMAN, "Bestellen"), _define_property(_obj5, types.Languages.POL, "Zam\xf3w"), _define_property(_obj5, types.Languages.FRA, "Commander"), _define_property(_obj5, types.Languages.TURKEY, "Sipariş ver"), _obj5);
var _obj6;
var PLACE_ORDER_SHORT = (_obj6 = {}, _define_property(_obj6, types.Languages.RUS, "Оформить заказ"), _define_property(_obj6, types.Languages.UKR, "Оформити замовлення"), _define_property(_obj6, types.Languages.BEL, "Аформіць заказ"), _define_property(_obj6, types.Languages.KAZ, "Тапсырысты рәсімдеу"), _define_property(_obj6, types.Languages.UZB, "Buyurtmani shakllantirish"), _define_property(_obj6, types.Languages.ENG, "Place order"), _define_property(_obj6, types.Languages.SPA, "Hacer pedido"), _define_property(_obj6, types.Languages.GERMAN, "Bestellung aufgeben"), _define_property(_obj6, types.Languages.POL, "Wypełnij zam\xf3wienie"), _define_property(_obj6, types.Languages.FRA, "Passer commande"), _define_property(_obj6, types.Languages.TURKEY, "Siparişi tamamlar"), _obj6);
var _obj7;
var SUBMIT_REQUEST_SHORT = (_obj7 = {}, _define_property(_obj7, types.Languages.RUS, "Оставить заявку"), _define_property(_obj7, types.Languages.UKR, "Залишити запит"), _define_property(_obj7, types.Languages.BEL, "Пакінуць заяўку"), _define_property(_obj7, types.Languages.KAZ, "Өтінім қалдыру"), _define_property(_obj7, types.Languages.UZB, "Talabnoma qoldirish"), _define_property(_obj7, types.Languages.ENG, "Send request"), _define_property(_obj7, types.Languages.SPA, "Enviar solicitud"), _define_property(_obj7, types.Languages.GERMAN, "Anfrage stellen"), _define_property(_obj7, types.Languages.POL, "Pozostaw wniosek"), _define_property(_obj7, types.Languages.FRA, "Envoyer demande"), _define_property(_obj7, types.Languages.TURKEY, "Başvuru bırak"), _obj7);
var _obj8;
var PARTICIPATE_SHORT = (_obj8 = {}, _define_property(_obj8, types.Languages.RUS, "Участвовать"), _define_property(_obj8, types.Languages.UKR, "Брати участь"), _define_property(_obj8, types.Languages.BEL, "Удзельнічаць"), _define_property(_obj8, types.Languages.KAZ, "Қатысу"), _define_property(_obj8, types.Languages.UZB, "Ishtirok etish"), _define_property(_obj8, types.Languages.ENG, "Participate"), _define_property(_obj8, types.Languages.SPA, "Participar"), _define_property(_obj8, types.Languages.GERMAN, "Teilnehmen"), _define_property(_obj8, types.Languages.POL, "Uczestnicz"), _define_property(_obj8, types.Languages.FRA, "Participer"), _define_property(_obj8, types.Languages.TURKEY, "Katıl"), _obj8);
var _obj9;
var texts = (_obj9 = {}, _define_property(_obj9, types$1.OneTapContentId.SIGN_IN, SIGN_IN_SHORT), _define_property(_obj9, types$1.OneTapContentId.SIGN_UP, SIGN_UP_SHORT), _define_property(_obj9, types$1.OneTapContentId.GET, GET_SHORT), _define_property(_obj9, types$1.OneTapContentId.OPEN, OPEN_SHORT), _define_property(_obj9, types$1.OneTapContentId.CALCULATE, CALCULATE_SHORT), _define_property(_obj9, types$1.OneTapContentId.ORDER, ORDER_SHORT), _define_property(_obj9, types$1.OneTapContentId.PLACE_ORDER, PLACE_ORDER_SHORT), _define_property(_obj9, types$1.OneTapContentId.SUBMIT_REQUEST, SUBMIT_REQUEST_SHORT), _define_property(_obj9, types$1.OneTapContentId.PARTICIPATE, PARTICIPATE_SHORT), _obj9);
var getShortLang = function(contentId, lang) {
    var content = texts[contentId] || texts[types$1.OneTapContentId.SIGN_IN];
    return content[lang] || content[types.Languages.RUS];
};

exports.getShortLang = getShortLang;
