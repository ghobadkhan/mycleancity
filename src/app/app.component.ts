import {
  AfterViewInit,
  Component,
  ElementRef,
  HostListener,
  OnDestroy,
  OnInit,
  QueryList,
  ViewChild,
  ViewChildren,
} from "@angular/core";

type ThemePreference = "system" | "light" | "dark";

@Component({
  selector: "app-root",
  standalone: true,
  templateUrl: "./app.component.html",
})
export class AppComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild("campaignSplash") campaignSplash!: ElementRef<HTMLDialogElement>;
  @ViewChild("splashOptout") splashOptout!: ElementRef<HTMLInputElement>;
  @ViewChildren("navLink") navLinks!: QueryList<ElementRef<HTMLAnchorElement>>;

  readonly themePreferences: ThemePreference[] = ["system", "light", "dark"];
  readonly splashSlides = [
    { src: "assets/splash1.webp", alt: "A littered sidewalk around a public waste bin." },
    { src: "assets/splash2.jpg", alt: "Bags, packaging, and cups scattered in grass beside a roadside fence." },
    { src: "assets/splash3.jpg", alt: "Discarded packaging and cups scattered beneath trees around a shopping cart." },
  ];
  readonly splashCharacters = [..."right now!"];
  preference: ThemePreference = "system";
  activeSlide = 0;
  activeNavIndex = 0;
  isHeadlineTransformed = false;
  prefersReducedMotion = false;

  private readonly savedPreferenceKey = "my-clean-city-theme";
  private readonly splashSeenKey = "my-clean-city-splash-dismissed";
  private slideTimer?: number;
  private headlineTimer?: number;

  ngOnInit(): void {
    this.prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    try {
      const savedPreference = localStorage.getItem(this.savedPreferenceKey);
      if (this.isThemePreference(savedPreference)) {
        this.preference = savedPreference;
      }
    } catch {
      // The default system preference still applies when storage is unavailable.
    }
    this.applyPreference();
  }

  ngAfterViewInit(): void {
    this.updateActiveNav();
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

  @HostListener("window:scroll")
  @HostListener("window:resize")
  updateActiveNav(): void {
    if (!this.navLinks) return;

    const links = this.navLinks.toArray();
    const sections = links
      .map(({ nativeElement }) => document.querySelector<HTMLElement>(nativeElement.getAttribute("href") ?? ""))
      .filter((section): section is HTMLElement => section !== null);
    const activeIndex = sections.reduce((current, section, index) => {
      return section.getBoundingClientRect().top <= window.innerHeight * 0.35 ? index : current;
    }, 0);
    this.activeNavIndex =
      window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 2
        ? sections.length - 1
        : activeIndex;

    const nav = links[0]?.nativeElement.parentElement;
    const activeLink = links[this.activeNavIndex]?.nativeElement;
    if (nav && activeLink && nav.scrollWidth > nav.clientWidth) {
      nav.scrollLeft = activeLink.offsetLeft - (nav.clientWidth - activeLink.offsetWidth) / 2;
    }
  }

  setTheme(preference: ThemePreference): void {
    this.preference = preference;
    this.applyPreference();
    try {
      localStorage.setItem(this.savedPreferenceKey, preference);
    } catch {
      // The selected theme still applies for this page view.
    }
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
      this.isHeadlineTransformed = true;
      return;
    }

    this.headlineTimer = window.setTimeout(() => {
      this.isHeadlineTransformed = true;
    }, 2000);
    this.slideTimer = window.setInterval(() => {
      this.activeSlide = (this.activeSlide + 1) % this.splashSlides.length;
    }, 3000);
  }

  private applyPreference(): void {
    if (this.preference === "system") {
      document.documentElement.removeAttribute("data-theme");
    } else {
      document.documentElement.dataset["theme"] = this.preference;
    }
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

  private isThemePreference(value: string | null): value is ThemePreference {
    return value === "system" || value === "light" || value === "dark";
  }
}
