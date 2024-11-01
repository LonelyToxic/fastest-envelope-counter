import { OneTapContentId } from '../types.js';

const TEXT_TYPE = {
    [OneTapContentId.SIGN_IN]: 'default',
    [OneTapContentId.SIGN_UP]: 'appoint',
    [OneTapContentId.GET]: 'receive',
    [OneTapContentId.OPEN]: 'open',
    [OneTapContentId.CALCULATE]: 'calculate',
    [OneTapContentId.ORDER]: 'order',
    [OneTapContentId.PLACE_ORDER]: 'service_order_placing',
    [OneTapContentId.SUBMIT_REQUEST]: 'request',
    [OneTapContentId.PARTICIPATE]: 'take_part'
};

export { TEXT_TYPE };
