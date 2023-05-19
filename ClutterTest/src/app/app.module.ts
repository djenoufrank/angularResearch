import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { MainComponent } from './main/main.component';
import { RightSideComponent } from './main/right-side/rightSide.component';
import { LeftSideComponent } from './main/left-side/leftSide.component';
import { InformationComponent } from './main/information/information.component';
import { QuestionsComponent } from './main/questions/questions.component';
import { GoogleMapsModule } from '@angular/google-maps';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    MainComponent,
    RightSideComponent,
    LeftSideComponent,
    InformationComponent,
    QuestionsComponent
  ],
  imports: [
    BrowserModule,
    NgbModule,
    GoogleMapsModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
