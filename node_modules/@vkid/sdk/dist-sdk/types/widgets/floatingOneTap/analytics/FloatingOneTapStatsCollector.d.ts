import { Config } from "../../../core/config";
import { ScreenProceedParams } from './types';
export declare class FloatingOneTapStatsCollector {
    private readonly registrationStatsCollector;
    private uniqueSessionId;
    constructor(config: Config);
    setUniqueSessionId(id: string): void;
    private getFields;
    sendScreenProceed(params: ScreenProceedParams): void;
    sendIframeLoadingFailed(): void;
    sendNoUserButtonShow(): void;
    sendNoUserButtonTap(): Promise<unknown>;
}
