import { ActionStatsCollector } from './ActionStatsCollector';
import { SakSessionAdditionalInfo, SakSessionStatsEventParams } from './types';
export declare class SakSessionStatsCollector {
    private readonly actionStatsCollector;
    constructor(actionStatsCollector: ActionStatsCollector);
    logEvent(event: SakSessionStatsEventParams): Promise<unknown>;
    sendSdkInit(additionalInfo?: SakSessionAdditionalInfo): void;
}
