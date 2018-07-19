import { ModuleWithProviders } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { HomepageComponent } from '../app/homepage/homepage.component';
import { GoogleppComponent } from '../app/googlepp/googlepp.component';
import { AppleppComponent } from '../app/applepp/applepp.component';


export const router: Routes = [
    { path: '', redirectTo: 'home', pathMatch: 'full'},
    { path: 'home', component: HomepageComponent },
    { path: 'google-privacy-policy', component: GoogleppComponent },
    { path: 'apple-privacy-policy', component: AppleppComponent }
   
]


export const routes: ModuleWithProviders = RouterModule.forRoot(router)
