
/**
 * @author Priyadharshini Murugan(V2E12515)
 * @class RLS service
 * @description Fetch API and subscription of Data
 * @version 1.0.0
 */
import { Inject, Injectable } from '@angular/core';
import { APP_CONFIG, IAppConfig } from '../app.config';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class RlsService {
    category;
    constructor(@Inject(APP_CONFIG) private config: IAppConfig, private http: HttpClient) {
        this.category = [];
    }

    updateRlsData(requestData) {
        return this.http.post(`${this.config.apiEndPoint}/record/save`,requestData,
            { observe: 'response' });
    }

    getRlsList(pageCount) {
        return this.http.get(`${this.config.apiEndPoint}/record/list?page=${pageCount}&page_size=5`,
            { observe: 'response' });
    }

    getDemandRoles() {
        return this.http.get(`${this.config.apiEndPoint}/master/get-demand`,
            { observe: 'response' });
    }

    getCustomerRoleList() {
        return this.http.get(`${this.config.apiEndPoint}/master/get-customer`,
            { observe: 'response' });
    }

    getskills() {
        return this.http.get(`${this.config.apiEndPoint}/master/get-skills`,
            { observe: 'response' });
    }

    getCities() {
        return this.http.get(`${this.config.apiEndPoint}/master/get-city`,
            { observe: 'response' });

    }

    getLanguages() {
        return this.http.get(`${this.config.apiEndPoint}/master/get-language`,
            { observe: 'response' });

    }
}
