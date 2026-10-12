import {
  AfterViewInit,
  Component,
  ElementRef,
  HostListener,
  OnInit,
  QueryList,
  ViewChildren,
} from "@angular/core";

type ThemePreference = "system" | "light" | "dark";

@Component({
  selector: "app-site-header",
  standalone: true,
  templateUrl: "./site-header.component.html",
})
export class SiteHeaderComponent implements OnInit, AfterViewInit {
  @ViewChildren("navLink") navLinks!: QueryList<ElementRef<HTMLAnchorElement>>;

  preference: ThemePreference = "system";
  activeNavIndex = 0;

  private readonly savedPreferenceKey = "my-clean-city-theme";

  ngOnInit(): void {
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

  private applyPreference(): void {
    if (this.preference === "system") {
      document.documentElement.removeAttribute("data-theme");
    } else {
      document.documentElement.dataset["theme"] = this.preference;
    }
  }

  private isThemePreference(value: string | null): value is ThemePreference {
    return value === "system" || value === "light" || value === "dark";
  }
}
