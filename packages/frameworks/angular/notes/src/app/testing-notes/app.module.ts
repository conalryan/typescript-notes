import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { ExternalComponent } from './external/external.component';
import { InlineComponent } from './inline/inline.component';
import { TwainComponent } from './twain/twain.component';
import { TwainService } from './twain/twain.service';
import { UserService } from './user/user.service';
import { WelcomeComponent } from './welcome/welcome.component';

import { AppRoutingModule } from './app-routing.module';
import { FormComponent } from './form/form.component';
import { HttpServiceService } from './http-service/http-service.service';
import { NgbComponent } from './ngb/ngb.component';

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
    AppRoutingModule
  ],
  providers: [UserService, TwainService, HttpServiceService],
})
export class AppModule {
}
