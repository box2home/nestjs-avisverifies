import { Injectable, Inject, HttpService } from '@nestjs/common';
import { AV_VERIF_CONNECT_OPTIONS } from '../constants';
import { IAvisVerifConfigOptions } from '../interfaces/AvisVerifConfigOptions.interface';
import * as SHA1 from 'sha1';
import { IAvisVerifServiceOrderParams } from '../interfaces/AvisVerifServiceOrderParams.interface';
import * as querystring from 'querystring';
@Injectable()
export class AvisVerifService {
   private _idWebsite: string;
   private _secureKey: string;
   private _urlAv: string;
   private _configParams: IAvisVerifServiceOrderParams;
   private _sign: any;
  constructor(@Inject(AV_VERIF_CONNECT_OPTIONS) private _options: IAvisVerifConfigOptions, private readonly _http: HttpService) {
                console.log('initialising Avis Verif Module ...');
                this._idWebsite = this._options.ID_WEBSITE;
                this._secureKey = this._options.SECURE_KEY;
                this._urlAv = this._options.URL_AV;
                }
   /**
    * @param  {IAvisVerifServiceOrderParams} configParams
    */
    send(configParams: IAvisVerifServiceOrderParams) {

    this._configParams = configParams;

    if (this._configParams.delay !== undefined) {

      this._sign = SHA1(this._configParams.query + this._configParams.order_ref + this._configParams.email + this._configParams.lastname
             + this._configParams.firstname + this._configParams.order_date + this._configParams.delay + this._secureKey);

    } else {

    this._sign = SHA1(this._configParams.query + this._configParams.order_ref + this._configParams.email + this._configParams.lastname
      + this._configParams.firstname + this._configParams.order_date + this._secureKey); }

    const obj = {
          sign : this._sign,
         ...this._configParams,
         delay : this._configParams.delay.toString(),
        };

    const finalObj = {
      idWebsite : this._idWebsite,
      message : JSON.stringify(obj),
    };

    const headers = {
   'Content-Type': 'application/x-www-form-urlencoded',
    };
    return this._http.post(this._urlAv + '?action=act_api_notification_sha1&type=json2',
    querystring.stringify(finalObj), {headers});
  }
}
