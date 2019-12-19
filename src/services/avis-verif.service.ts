import { HttpService, Inject, Injectable } from '@nestjs/common';
import * as querystring from 'querystring';
import { map } from 'rxjs/operators';
import * as SHA1 from 'sha1';

import { AV_VERIF_CONNECT_OPTIONS } from '../constants';

import { IAvisVerifConfigOptions, IAvisVerifServiceOrderParams } from '..';

import { AvVerifLogger } from './avis-verif-logger.service';

@Injectable()
export class AvisVerifService {
    private _idWebsite: string;
    private _secureKey: string;
    private _urlAv: string;
    private _sign: any;

    constructor(
        @Inject(AV_VERIF_CONNECT_OPTIONS)
        private _options: IAvisVerifConfigOptions,
        private readonly _http: HttpService,
        private readonly _logger: AvVerifLogger,
    ) {
        this._logger.log('initialising Avis Verifies Module', 'AvisVerifModule');
        this._idWebsite = this._options.idWebsite;
        this._secureKey = this._options.secureKey;
        this._urlAv = this._options.urlAv;
    }

    /**
     * @param  {IAvisVerifServiceOrderParams} configParams
     */
    async send(configParams: IAvisVerifServiceOrderParams): Promise<any> {
        this._sign = SHA1(
            configParams.query +
            configParams.order_ref +
            configParams.email +
            configParams.lastname +
            configParams.firstname +
            configParams.order_date +
            (configParams.delay !== undefined ? configParams.delay : '') +
            this._secureKey,
        );

        const obj = { sign: this._sign, ...configParams };

        const finalObj = { idWebsite: this._idWebsite, message: JSON.stringify(obj) };

        const headers = {
            'Content-Type': 'application/x-www-form-urlencoded',
        };
        return this._http.post(
            `${this._urlAv}?action=act_api_notification_sha1&type=json2`,
            querystring.stringify(finalObj),
            { headers },
            )
            .pipe(map((response) => response.data))
            .toPromise();
    }
}
