/**
 * @author Priyadharshini Murugan(V2E12515)
 * @class RlsComponent
 * @description functionalities of RLS
 * @version 1.0.0
 */
import { Component, OnInit } from '@angular/core';
import { RlsService } from "../services/rls.service";
import { UpdateEffort } from '../models/updateEffortsData';
import { Effort } from '../models/effort';
// import { Rls } from "../models/rls.model";

@Component({
    selector: 'rls',
    templateUrl: './rls.component.html',
    styleUrls: ['./rls.component.scss'],
})
export class RlsComponent implements OnInit {

    // createRlsData : Rls[] = [];

    demandRolesList: Object[] = [];
    customerRolesList: Object[] = [];
    skillsList: Object[] = [];
    secondarySkillsList: Object[] = [];
    citiesList: Object[] = [];
    languagesList: Object[] = [];
    rlsData = [];
    plannedEffort = [];
    rlsDataId: number;



    demand_role_id: number;
    billabilityId: string;
    service_offeringId: string;
    shiftId: string;

    customer_role_id: number;
    city_id: number;
    primarySkills: number[];
    additionalSkills: number[];
    tempArrayPrimary = [];
    tempArrayAdditional = [];
    billability: String = "";
    shift: String = "";
    service_offering: String = "";
    rlsList: any;
    plannedReportsData:any;
    tempArrays = [];
    billabilityList = [];
    serviceOfferingList = [];
    shiftList = [];

    selectedDemandItems = [];
    selectedCustomerItems = [];
    selectedPrimaryskillItems = [];
    selectedSecondaryskillItems = [];
    selectedCityItems = [];
    selectedLanguageItems = [];
    selectedBillabilityItems = [];
    selectedServiceOfferingItems = [];
    selectedShiftItems = [];

    dropdownSettingsMultiple = {};
    dropdownSettingsSingle = {};
    standardRate = 200000;
    afterDiscountRate = 0;
    standardCost = 200000;
    dcExpense = 200000;
    pageCount = 1;

    savePlaneEffortData:UpdateEffort= new UpdateEffort;
    currentRecordTotalPlanEfforts:number=0;
    currentRecordTotalConsumedEfforts:number=0;
    currentRecordTotalBalancedEfforts:number=0;

    totalPlanEfforts:number=0;
    totalConsumedEfforts:number=0;
    totalBalancedEfforts:number=0;


    constructor(private rlsService: RlsService) {}

    ngOnInit() {

        this.getRLSList(this.pageCount);
        this.getDemandRoles();
        this.getCustomerList();
        this.getSkills();
        this.getCitites();
        this.getLanguages();
        
        this.dropdownSettingsSingle = {
            singleSelection: true,
            text: 'Search...',
            enableSearchFilter: true,
            classes: 'myclass custom-class',
        };
        this.dropdownSettingsMultiple = {
            singleSelection: false,
            text: 'Search...',
            enableSearchFilter: true,
            classes: 'myclass custom-class',
        };

        this.billabilityList = [
            {id: "NonBillable/Billable/Support", itemName: "Non Billable/Billable/Support" },
            {id: "Non Billable", itemName: "Non Billable" },
            {id: "Billable", itemName: "Billable" },
            {id: "Support", itemName: "Support" }]
    
        this.shiftList = [
        {id: "Normal NightShift DayShift", itemName: "Normal / Night Shift / Day Shift" },
        {id: "Normal", itemName: "Normal" },
        {id: "Night Shift", itemName: "Night Shift" },
        {id: "Day Shift", itemName: "Day Shift" }
    ]
    this.serviceOfferingList = [
        {id: "Service Offering", itemName: "Service Offering" },
        {id: "Cloud Service", itemName: "Cloud Service" },
        {id: "IOT Service", itemName: "IOT Service" },
        {id: "System Service", itemName: "System Service" }
    ]
}

    createRLS() {
         
            let requestData;
            requestData = {
              demand_role_id: this['demandId'],
              customer_role_id: 2,
              city_id: 3,
              billability: this.billabilityId,
              shift: this.shiftId,
              service_offering: this.service_offeringId,
              standard_billing_amt: '10000USD',
              rate_after_discount: '1000USD',
              primary_skills: this['primarySkillsId'],
              additional_skills: this['additionalSkillsId'],
              
            }

            this.rlsService.updateRlsData(requestData).subscribe((response: any) => {
                console.log(response)
                
            });

    }

    
    updateRLS() {
         
        let requestData;
        requestData = {
            id: this.rlsDataId,
          demand_role_id: this['demandId'],
          customer_role_id: 2,
          city_id: 3,
          billability: this.billabilityId,
          shift: this.shiftId,
          service_offering: this.service_offeringId,
          standard_billing_amt: '10000USD',
          rate_after_discount: '1000USD',
          primary_skills: this['primarySkillsId'],
          additional_skills: this['additionalSkillsId'],
          
        }

        this.rlsService.updateRlsData(requestData).subscribe((response: any) => {
            console.log(response)
            
        });

}



    getRLSList(pageCount) {
        this.rlsService.getRlsList(pageCount).subscribe((response: any) => {
            this.tempArrays = response.body.content;
            this.rlsData =  this.rlsData.concat(this.tempArrays)
            this.fetchingEffortsForAllRecords();
          });
    }

    effortBUpdate(event){

    }

    editRls(data, value){

        this.selectedCustomerItems.push({
            id: value.customerRole.id,
            itemName: value.customerRole.name
        });

        this.selectedDemandItems.push({
            id: value.demandrole.id,
            itemName: value.demandrole.name
        });

        this.selectedCityItems.push({
            id: value.city.id,
            itemName: value.city.name
        });

        this.selectedLanguageItems.push({
            id: value.language.id,
            itemName: value.language.name
        });

        this.selectedPrimaryskillItems.push({
            id: value.assignedskills.id,
            itemName: value.assignedskills.name
        });

        this.service_offering = value.service_offering;
        this.standardRate = value.standard_billing_amt;
        this.afterDiscountRate = value.rate_after_discount;
        this.billability = value.billability;
        this.rlsDataId = value.id;






    }

   getDemandRoles() {
        this.rlsService.getDemandRoles().subscribe((response: any) => {
            let demandsList = response.body.content;
            for (let index = 0; index < demandsList.demandRole.length; index++) {
                this.demandRolesList.push({
                    id: demandsList.demandRole[index].id,
                    itemName: demandsList.demandRole[index].name
                })
                
            }
        });
    }

    getCustomerList() {
        this.rlsService.getCustomerRoleList().subscribe((response: any) => {
                let customerList = response.body.content;
                for (let index = 0; index < customerList.customer.length; index++) {
                    this.customerRolesList.push({
                        id: customerList.customer[index].id,
                        itemName: customerList.customer[index].name
                    })
                    
                }
        });
    }
    getSkills() {
        this.rlsService.getskills().subscribe((response: any) => {
            let skillsList = response.body.content;
            for (let index = 0; index < skillsList.skills.length; index++) {
                this.skillsList.push({
                    id: skillsList.skills[index].id,
                    itemName: skillsList.skills[index].name
                })
                
            }
        });
    }

    getCitites() {
        this.rlsService.getCities().subscribe((response: any) => {
            let citiesList = response.body.content;
            for (let index = 0; index < citiesList.city.length; index++) {
                this.citiesList.push({
                    id: citiesList.city[index].id,
                    itemName: citiesList.city[index].name
                })
                
            }
        });
    }

    getLanguages() {
        this.rlsService.getLanguages().subscribe((response: any) => {
            let languagesList = response.body.content;
            for (let index = 0; index < languagesList.language.length; index++) {
                this.languagesList.push({
                    id: languagesList.language[index].id,
                    itemName: languagesList.language[index].name
                })
                
            }
        });
    }

    calculateDiscount(event){
        this.afterDiscountRate =this.standardRate -(this.standardRate * event/100)
    }


    onItemSelect(item: any, type: string) {
        if(type === 'additionalSkills'){
            this.tempArrayAdditional.push(item['id'])
            this[type + 'Id'] = this.tempArrayAdditional;
        }else if(type === 'primarySkills' ){
            this.tempArrayPrimary.push( item['id'])
            this[type + 'Id'] = this.tempArrayPrimary;
        } else {
            this[type + 'Id'] = item['id'];
        }
       
        
    }
    OnItemDeSelect(item: any, type: string) {
        this[type + 'Id'] = item['id'];
    }
    onSelectAll(item: any, type: string) {
        this[type + 'Id'] = item['id'];
    }
    onDeSelectAll(item: any, type: string) {
        this[type + 'Id'] = item['id'];
    }



    loadMore(){
        this.pageCount = this.pageCount+1;
        this.getRLSList(this.pageCount);
    }


    /**
     * method to save list of all updated plan effort records
     * @param recordId current selected record
     * @param EffortTypeId current Effort type
     * @param month current updated month
     * @param value current value to update
     */
    effortUpdate(recordId: number, EffortTypeId: number, month: number, year: number, value: number) {

        this.savePlaneEffortData.record_id = recordId;
        let effort: Effort = new Effort();
        effort.effort_type = EffortTypeId;
        effort.month = month + 1;
        effort.year = year;
        effort.value = (+value);
        if (this.savePlaneEffortData.effort.length > 0) {
            this.savePlaneEffortData.effort = this.savePlaneEffortData.effort.filter(data => data.month !== (month + 1));
        }
        this.savePlaneEffortData.effort.push(effort);
        this.savePlaneEffortData.effort.sort((a, b) => a.effort_type - b.effort_type);
    }

    /**
     * method to count total efforts for current selected record
     */
    calculateTotalEffort() {

        this.resetCurrentRecordTotalEfforts();
        this.rlsData.forEach(data => {
            if (data.id == this.savePlaneEffortData.record_id) {
                if (data.planefforts.length > 0) {
                    data.planefforts = data.planefforts.sort((a, b) => a.effort_type - b.effort_type);
                    data = this.setEfforts(data);
                }
                else {
                    this.savePlaneEffortData.effort.forEach(updatedeffort => {
                        let month: number;
                        let year: number;
                        let effort: Effort = new Effort();
                        effort.effort_type = updatedeffort.effort_type;
                        effort.month = updatedeffort.month;
                        month = updatedeffort.month;
                        effort.year = updatedeffort.year;
                        year = updatedeffort.year;
                        effort.value = updatedeffort.value;
                        data.planefforts.push(effort);

                        let type: number[] = [2, 3];
                        type.forEach(typeId => {
                            let effort: Effort = new Effort();
                            effort.effort_type = typeId;
                            effort.month = month;
                            effort.year = year;
                            effort.value = 0;
                            data.planefforts.push(effort);
                        });
                    });
                    data = this.setEfforts(data);
                }
                this.fetchTotalEffortsForCurrentRecord(data);
            }
        })
    }

    /**
     * method to updates plan and balanced efforts for current selected record after user updates plan efforts
     * @param rslData current selected RSL record
     */
    setEfforts(rslData: any) {
        let oldPlanedEffort: number = 0;
        let updatedPlanedEffort: number = 0;
        rslData.planefforts.forEach(element => {
            this.savePlaneEffortData.effort.forEach(updatedeffort => {
                let monthFound=true;
                monthFound=rslData.planefforts.find((data)=>data.month==updatedeffort.month);
                if (updatedeffort.month == element.month) {
                    if (element.effort_type == 1) {
                        oldPlanedEffort = element.value;
                        updatedPlanedEffort = updatedeffort.value;
                        element.value = updatedeffort.value;
                    }
                    if (element.effort_type == 3) {
                        element.value = element.value + (updatedPlanedEffort - oldPlanedEffort);
                    }
                }
                if(!monthFound){
                 
                    let effort:any={};
                    effort.record_id=rslData.id;
                    effort.month=updatedeffort.month;
                    effort.effort_type=updatedeffort.effort_type
                    effort.year=updatedeffort.year;
                    if (effort.effort_type == 1) {
                        effort.value = updatedeffort.value;
                    }
                    rslData.planefforts.push(effort);
                    let effort2:any={};
                    effort2.record_id=rslData.id;
                    effort2.month=updatedeffort.month;
                    effort2.effort_type=3
                    effort2.year=updatedeffort.year;
                    effort2.value = updatedeffort.value;
                    rslData.planefforts.push(effort2);
                }
            });

        });
        return rslData;

    }


    /**
     * method to fetch final totalEfforts for given RSL record.
     * @param rslData current RSL recorded Data
     */
    fetchTotalEffortsForCurrentRecord(rslData: any) {
        rslData.planefforts.forEach(element => {
            if (element.effort_type == 1) {
                this.currentRecordTotalPlanEfforts = this.currentRecordTotalPlanEfforts + element.value;
            }
            if (element.effort_type == 2) {
                this.currentRecordTotalConsumedEfforts += element.value;
            }
            if (element.effort_type == 3) {
                this.currentRecordTotalBalancedEfforts += element.value;
            }
        });
        let totalEffortList = new Map();
        totalEffortList.set("totalPlanEfforts", this.currentRecordTotalPlanEfforts);
        totalEffortList.set("totalConsumedEfforts", this.currentRecordTotalConsumedEfforts);
        totalEffortList.set("totalBalancedEfforts", this.currentRecordTotalBalancedEfforts);
        
        return totalEffortList;
    }

    /**
     * method to reset global variables for whole record total efforts
     */
    resetTotalEfforts() {
        this.totalPlanEfforts = 0;
        this.totalConsumedEfforts = 0;
        this.totalBalancedEfforts = 0;
    }

    /**
     * method to reset current selected record total efforts
     */
    resetCurrentRecordTotalEfforts() {
        this.currentRecordTotalPlanEfforts = 0;
        this.currentRecordTotalConsumedEfforts = 0;
        this.currentRecordTotalBalancedEfforts = 0;
    }

    /**
     * Fetching Total Efforts for all RSL records
     */
    fetchingEffortsForAllRecords(){
        this.resetTotalEfforts();
        this.rlsData.forEach(rslRecords=>{
            this.resetCurrentRecordTotalEfforts();
            let totalEffortList= new Map();
            totalEffortList=this.fetchTotalEffortsForCurrentRecord(rslRecords);
            this.totalPlanEfforts += totalEffortList.get("totalPlanEfforts");
            this.totalConsumedEfforts += totalEffortList.get('totalConsumedEfforts');
            this.totalBalancedEfforts += totalEffortList.get("totalBalancedEfforts");
        });
        this.resetCurrentRecordTotalEfforts();
    }
}

