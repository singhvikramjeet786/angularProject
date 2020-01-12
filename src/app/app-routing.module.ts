/**
 * @author Priyadharshini Murugan(V2E12515)
 * @module AppRoutingModule
 * @description declare a routes
 * @version 1.0.0
 */
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {RlsComponent} from './rls/rls.component';

const routes: Routes = [
  { path: 'rls', component: RlsComponent}
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

// export const AppRoutingModule = RouterModule.forRoot(routes);
