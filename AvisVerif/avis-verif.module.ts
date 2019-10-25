
import { DynamicModule, Module, Provider, HttpModule } from '@nestjs/common';
import { AvisVerifService } from './services/avis-verif.service';
import { AV_VERIF_CONNECT_OPTIONS } from './constants';
import { IAVisVerifConnectAsyncOptions } from './interfaces/AVisVerifConnectAsyncOptions.interface';

@Module({
})
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
