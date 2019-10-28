import { IAvisVerifConfigOptions } from './avis-verif-config-options.interface';
import { ModuleMetadata } from '@nestjs/common/interfaces';

export interface IAVisVerifConnectAsyncOptions
    extends Pick<ModuleMetadata, 'imports'> {
    inject: any[];
    useFactory: (
        ...args: any[]
    ) => Promise<IAvisVerifConfigOptions> | IAvisVerifConfigOptions;
}
