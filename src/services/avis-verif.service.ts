import { HttpService, Inject, Injectable } from '@nestjs/common';
import { AV_VERIF_CONNECT_OPTIONS } from '../constants';
import { IAvisVerifConfigOptions, IAvisVerifServiceOrderParams } from '..';
import * as SHA1 from 'sha1';
import * as querystring from 'querystring';
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
        this._idWebsite = this._options.ID_WEBSITE;
        this._secureKey = this._options.SECURE_KEY;
        this._urlAv = this._options.URL_AV;
    }

    /**
     * @param  {IAvisVerifServiceOrderParams} configParams
     */
    send(configParams: IAvisVerifServiceOrderParams) {
        this._sign = SHA1(
            configParams.query +
            configParams.order_ref +
            configParams.email +
            configParams.lastname +
            configParams.firstname +
            configParams.order_date +
            (configParams.delay ? configParams.delay : '') +
            this._secureKey,
        );

        const obj = {
            sign: this._sign,
            ...configParams,
        };

        const finalObj = {
            idWebsite: this._idWebsite,
            message: JSON.stringify(obj),
        };

        const headers = {
            'Content-Type': 'application/x-www-form-urlencoded',
        };
        return this._http.post(
            this._urlAv + '?action=act_api_notification_sha1&type=json2',
            querystring.stringify(finalObj),
            { headers },
        );
    }
}
