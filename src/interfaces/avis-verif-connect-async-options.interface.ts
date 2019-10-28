import { IAvisVerifConfigOptions } from './avis-verif-config-options.interface';
import { ModuleMetadata } from '@nestjs/common/interfaces';

export interface IAVisVerifConnectAsyncOptions extends Pick<ModuleMetadata, 'imports'> {
    useFactory: (...args: any[]) => Promise<IAvisVerifConfigOptions> | IAvisVerifConfigOptions;
    inject: any[];
}
