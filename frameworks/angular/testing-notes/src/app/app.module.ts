import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

import {AppComponent} from './app.component';
import {InlineComponent} from './inline/inline.component';
import {ExternalComponent} from './external/external.component';
import {WelcomeComponent} from './welcome/welcome.component';
import {UserService} from './user/user.service';
import {TwainComponent} from './twain/twain.component';
import {TwainService} from './twain/twain.service';

import {FormComponent} from './form/form.component';
import {NgbComponent} from './ngb/ngb.component';
import {AppRoutingModule} from './app-routing.module';
import {HttpServiceService} from './http-service/http-service.service';

@NgModule({
  declarations: [
    AppComponent,
    InlineComponent,
    ExternalComponent,
    WelcomeComponent,
    TwainComponent,
    FormComponent,
    NgbComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    NgbModule.forRoot(),
    AppRoutingModule
  ],
  providers: [UserService, TwainService, HttpServiceService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
