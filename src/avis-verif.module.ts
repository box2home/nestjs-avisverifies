import { DynamicModule, Module, Provider, HttpModule } from '@nestjs/common';
import { AvisVerifService } from './services/avis-verif.service';
import { AV_VERIF_CONNECT_OPTIONS } from './constants';
import { IAVisVerifConnectAsyncOptions } from './interfaces/avis-verif-connect-async-options.interface';
import { AvVerifLogger } from './services/avis-verif-logger.service';

@Module({})
export class AvisVerifModule {
    static forRootAsync(
        connectOptions: IAVisVerifConnectAsyncOptions,
    ): DynamicModule {
        return {
            module: AvisVerifModule,
            imports: [HttpModule],
            providers: [
                this._createConnectProviders(connectOptions),
                AvisVerifService,
                AvVerifLogger,
            ],
            exports: [AvisVerifService],
        };
    }

    private static _createConnectProviders(
        options: IAVisVerifConnectAsyncOptions,
    ): Provider {
        if (options.useFactory) {
            return {
                provide: AV_VERIF_CONNECT_OPTIONS,
                useFactory: options.useFactory,
                inject: options.inject || [],
            };
        }
    }
}
