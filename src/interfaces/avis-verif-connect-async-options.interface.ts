import { ModuleMetadata } from '@nestjs/common/interfaces';

import { IAvisVerifConfigOptions } from './avis-verif-config-options.interface';

export interface IAVisVerifConnectAsyncOptions extends Pick<ModuleMetadata, 'imports'> {
    useFactory: (...args: any[]) => Promise<IAvisVerifConfigOptions> | IAvisVerifConfigOptions;
    inject: any[];
}
