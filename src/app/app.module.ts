import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { HttpClientModule } from "@angular/common/http"; // Import HttpClientModule
import { AppComponent } from "./app.component";
import { BrowserModule } from "@angular/platform-browser";
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
    imports: [
        CommonModule,
        HttpClientModule,
        BrowserModule,
        DialogModule,
        ButtonModule,
        BrowserAnimationsModule,
        ReactiveFormsModule
    ],
    declarations: [AppComponent],
    bootstrap: [AppComponent],
})

export class AppModule {}
