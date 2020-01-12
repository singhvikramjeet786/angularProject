import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {AngularMultiSelectModule} from 'angular4-multiselect-dropdown/angular4-multiselect-dropdown';
import {FormsModule} from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import {AppComponent} from './app.component';
import { AppRoutingModule } from './app-routing.module'
import { RlsComponent } from "./rls/rls.component";
import { RlsService } from './services/rls.service';
import {APP_CONFIG, IAppConfig} from './app.config';


@NgModule({
  declarations: [AppComponent,RlsComponent],
  imports: [BrowserModule, AppRoutingModule,AngularMultiSelectModule, FormsModule,HttpClientModule],
  providers: [{provide: APP_CONFIG, useValue: IAppConfig}, RlsService],
  bootstrap: [AppComponent],
})
export class AppModule {}
