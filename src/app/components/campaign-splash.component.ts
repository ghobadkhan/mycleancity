import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild, signal } from "@angular/core";

@Component({
  selector: "app-campaign-splash",
  standalone: true,
  templateUrl: "./campaign-splash.component.html",
})
export class CampaignSplashComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild("campaignSplash") campaignSplash!: ElementRef<HTMLDialogElement>;
  @ViewChild("splashOptout") splashOptout!: ElementRef<HTMLInputElement>;

  readonly splashSlides = [
    { src: "assets/splash1.webp", alt: "A littered sidewalk around a public waste bin." },
    { src: "assets/splash2.jpg", alt: "Bags, packaging, and cups scattered in grass beside a roadside fence." },
    { src: "assets/splash3.jpg", alt: "Discarded packaging and cups scattered beneath trees around a shopping cart." },
  ];
  readonly splashCharacters = [..."right now!"];
  readonly activeSlide = signal(0);
  readonly isHeadlineTransformed = signal(false);
  prefersReducedMotion = false;

  private readonly splashSeenKey = "my-clean-city-splash-dismissed";
  private slideTimer?: number;
  private headlineTimer?: number;

  ngOnInit(): void {
    this.prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  }

  ngAfterViewInit(): void {
    try {
      if (localStorage.getItem(this.splashSeenKey) !== "true") {
        this.openSplash();
      }
    } catch {
      this.openSplash();
    }
  }

  ngOnDestroy(): void {
    this.clearSplashTimers();
  }

  closeSplash(): void {
    if (this.campaignSplash.nativeElement.open) {
      this.campaignSplash.nativeElement.close();
    }
  }

  onSplashClosed(): void {
    this.clearSplashTimers();
    if (!this.splashOptout.nativeElement.checked) return;

    try {
      localStorage.setItem(this.splashSeenKey, "true");
    } catch {
      // The splash can still be dismissed for this page view.
    }
  }

  private openSplash(): void {
    const splash = this.campaignSplash.nativeElement;
    splash.showModal();

    if (this.prefersReducedMotion) {
      this.isHeadlineTransformed.set(true);
      return;
    }

    this.headlineTimer = window.setTimeout(() => {
      this.isHeadlineTransformed.set(true);
    }, 2000);
    this.slideTimer = window.setInterval(() => {
      this.activeSlide.update((activeSlide) => (activeSlide + 1) % this.splashSlides.length);
    }, 3000);
  }

  private clearSplashTimers(): void {
    if (this.headlineTimer !== undefined) {
      window.clearTimeout(this.headlineTimer);
      this.headlineTimer = undefined;
    }
    if (this.slideTimer !== undefined) {
      window.clearInterval(this.slideTimer);
      this.slideTimer = undefined;
    }
  }
}
