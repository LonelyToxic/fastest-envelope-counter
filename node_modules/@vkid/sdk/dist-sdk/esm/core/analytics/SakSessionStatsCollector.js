import { ProductionStatsTypeActions, ProductionStatsEventScreen } from './types.js';

class SakSessionStatsCollector {
    actionStatsCollector;
    constructor(actionStatsCollector){
        this.actionStatsCollector = actionStatsCollector;
    }
    logEvent(event) {
        const statsEvent = {
            type: ProductionStatsTypeActions.TYPE_SAK_SESSION_EVENT_ITEM,
            [ProductionStatsTypeActions.TYPE_SAK_SESSION_EVENT_ITEM]: event
        };
        return this.actionStatsCollector.logEvent({
            screen: ProductionStatsEventScreen.NOWHERE,
            event: statsEvent
        });
    }
    sendSdkInit(additionalInfo) {
        void this.logEvent({
            step: 'vkid_sdk_init',
            additional_info: additionalInfo
        });
    }
}

export { SakSessionStatsCollector };
