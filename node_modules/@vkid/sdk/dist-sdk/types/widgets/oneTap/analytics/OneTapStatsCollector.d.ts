import { Config } from "../../../core/config";
import { OneTapStatsButtonType, ScreenProceedParams } from './types';
export declare class OneTapStatsCollector {
    private readonly registrationStatsCollector;
    private uniqueSessionId;
    constructor(config: Config);
    setUniqueSessionId(id: string): void;
    private getFields;
    sendFrameLoadingFailed(): void;
    sendNoSessionFound(): void;
    sendOneTapButtonNoUserShow(buttonType?: OneTapStatsButtonType): void;
    sendOneTapButtonNoUserTap(buttonType?: OneTapStatsButtonType): Promise<unknown>;
    sendScreenProceed(params: ScreenProceedParams): void;
}
