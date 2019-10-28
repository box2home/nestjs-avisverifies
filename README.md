<h1 align="center"></h1>

<div align="center">
  <a href="http://nestjs.com/" target="_blank">
    <img src="https://nestjs.com/img/logo_text.svg" width="150" alt="Nest Logo" />
  </a>
</div>

<h3 align="center">A Module for Utilizing AvisVerifiés with NestJS</h3>

<div align="center">
  <a href="https://nestjs.com" target="_blank">
    <img src="https://img.shields.io/badge/license-MIT-brightgreen.svg" alt="License" />
    <img src="https://badge.fury.io/js/%40nestjsplus%2Fmassive.svg" alt="npm version" height="18">    <img src="https://img.shields.io/badge/built%20with-NestJs-red.svg" alt="Built with NestJS">
  </a>
</div>

### Installation

> // TODO

(or yarn equivalent)

### About Avis Vérfiés

This module is a thin layer on top of the [Avis Vérifiés API](https://www.avis-verifies.com/index.php?page=mod_inscription/).



### Quick Start

To configure your API connection, import the `AvVerif` module using `forRootAsync()` pattern.Basically, you configure the module with a `AvisVerifServiceOrderParams` object. To see the documentation of Avis Vérifiés create an account on https://www.avis-verifies.com/index.php?page=mod_inscription.

For example, your `AppModule` might look like this :

```typescript
// src/app.module.ts
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from './config/config.module';
import { ConfigService } from './config/config.service';
import { AvisVerifModule } from // 'TODO';

@Module({
  imports: [
    AvisVerifModule.forRootAsync(
            {
                inject: [ConfigService],
                useFactory: async (config: ConfigService) => {
                    return {
                        ID_WEBSITE: config.avVerifConfig.ID_WEBSITE,
                        SECURE_KEY: config.avVerifConfig.SECURE_KEY,
                        URL_AV: config.avVerifConfig.URL_AV,
                    };
                },
            },
        ),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
```

Now you have access to a `send` service that is associated with the Avis Vérifiés API, which you can inject into any provider. For example, you might do this:

```typescript
// src/app.service.ts
import { Inject, Injectable } from '@nestjs/common';
import { AvisVerifService } from //'TODO';

@Injectable()
export class AppService {
  constructor(private readonly _avVerifService: AvisVerifService) {}

  async send(data) {
     const response = await this._avVerifService.send({
        query: data.query,
        order_ref: data.order_ref,
        email: data.email,
        order_date: data.order_date,
        firstname: data.firstname,
        lastname: data.lastname,
        type: data.type,
        id_shop: data.id_shop,
        name_shop: data.name_shop,
        delay: data.delay,
        PRODUCTS : [{id_product : data.id_product, name_product : data.name_product}] // table product could contain from 0 to n products.
        });
     response.subscribe((data) => {
            console.log(data);
        });
  }
  
```

### To Do

- [x] Tests

### Change Log

See [Changelog](CHANGELOG.md) for more information.

### Author

**Oussama Abdallah**

### License

Licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
