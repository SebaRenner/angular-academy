import {environment} from './../environments/environment';
import {ComponentsModule} from './components/components.module';
import {BrowserModule} from '@angular/platform-browser';
import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import {MatButtonModule, MatToolbarModule} from '@angular/material';

import {AppRoutingModule} from './app-routing.module';

import {AppComponent} from './app.component';
import {FeaturesModule} from './features/features.module';
import {ServicesModule} from './services/services.module';

import {AngularFireModule} from 'angularfire2';
import {AngularFirestoreModule} from 'angularfire2/firestore';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    MatButtonModule,
    AppRoutingModule,
    FeaturesModule,
    MatToolbarModule,
    ServicesModule,
    ComponentsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
