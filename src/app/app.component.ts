import { Component } from "@angular/core";
import { ActionSectionComponent } from "./components/action-section.component";
import { CampaignSplashComponent } from "./components/campaign-splash.component";
import { ContactSectionComponent } from "./components/contact-section.component";
import { GoalSectionComponent } from "./components/goal-section.component";
import { HeroSectionComponent } from "./components/hero-section.component";
import { IssueSectionComponent } from "./components/issue-section.component";
import { ProgressSectionComponent } from "./components/progress-section.component";
import { SiteFooterComponent } from "./components/site-footer.component";
import { SiteHeaderComponent } from "./components/site-header.component";

@Component({
  selector: "app-root",
  standalone: true,
  templateUrl: "./app.component.html",
  imports: [
    ActionSectionComponent,
    CampaignSplashComponent,
    ContactSectionComponent,
    GoalSectionComponent,
    HeroSectionComponent,
    IssueSectionComponent,
    ProgressSectionComponent,
    SiteFooterComponent,
    SiteHeaderComponent,
  ],
})
export class AppComponent {}
