import { EvntPriority } from '../enum/evnt-priority.enum';
import { EvntStatus } from '../enum/evnt-status.enum';
export declare class GetEvntFilterDto {
    status?: EvntStatus;
    priority?: EvntPriority;
    search?: string;
}
