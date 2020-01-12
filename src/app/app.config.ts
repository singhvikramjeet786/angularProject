
/**
 * @author Priyadharshini Murugan(V2E12515)
 * @class APP config 
 * @description base url for all the fetch API
 * @version 1.0.0
 */
import {InjectionToken} from '@angular/core';
export let APP_CONFIG = new InjectionToken('app.config');

export interface IAppConfig {
  apiEndPoint: string;
}
export const IAppConfig: IAppConfig = {
  // apiEndPoint: 'http://172.18.1.88:220/api/v1'
  apiEndPoint: 'http://localhost:93/api/v1'
};
