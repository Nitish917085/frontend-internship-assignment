import { NgModule,CUSTOM_ELEMENTS_SCHEMA ,NO_ERRORS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { TrendingSubjectsComponent } from '../app/components/trending-subjects/trending-subjects.component';
import { HomeComponent } from '../app/components/home/home.component';
import { AppRoutingModule } from './app-routing.module';
import { SharedModule } from './shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';
import {MatSidenavModule} from '@angular/material/sidenav';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LayoutModule } from '@angular/cdk/layout';
import { SubjectsComponent } from './components/subjects/subjects.component';
import {NgxPaginationModule} from 'ngx-pagination';
import { CacheInterceptor } from './core/services/api-interceptor.service';
import {HTTP_INTERCEPTORS} from '@angular/common/http';

import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {
  NgxUiLoaderModule,
  NgxUiLoaderConfig,
  SPINNER,
  POSITION,
  PB_DIRECTION,
} from "ngx-ui-loader";

const ngxUiLoaderConfig: NgxUiLoaderConfig = {
  bgsColor: "blue",
  bgsPosition: POSITION.centerCenter,
  bgsSize: 100,
  bgsType: SPINNER.circle, // background spinner type
  pbDirection: PB_DIRECTION.leftToRight, // progress bar direction
  pbThickness: 20, // progress bar thickness
};



@NgModule({
  declarations: [AppComponent, TrendingSubjectsComponent, HomeComponent,SubjectsComponent],
  imports: [
    BrowserModule,
    RouterModule,
    AppRoutingModule,
    HttpClientModule,
    SharedModule,
    ReactiveFormsModule,
    MatSidenavModule,
    BrowserAnimationsModule,
    NgxPaginationModule,
    LayoutModule,
    NgxUiLoaderModule.forRoot(ngxUiLoaderConfig),
  ],
  providers: [{provide:HTTP_INTERCEPTORS,useClass:CacheInterceptor,multi:true}],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA,NO_ERRORS_SCHEMA],
  bootstrap: [AppComponent],
})
export class AppModule {}
