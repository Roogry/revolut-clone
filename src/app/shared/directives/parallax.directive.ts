import {
  Directive,
  ElementRef,
  inject,
  Input,
  NgZone,
  OnDestroy,
  OnInit,
  PLATFORM_ID,
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Directive({
  selector: '[appParallax]',
  standalone: true,
})
export class ParallaxDirective implements OnInit, OnDestroy {
  @Input() parallaxSpeed = 0.1;

  private readonly elementRef = inject(ElementRef<HTMLElement>);
  private readonly platformId = inject(PLATFORM_ID);
  private readonly ngZone = inject(NgZone);

  private scrollListener: (() => void) | null = null;

  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      this.ngZone.runOutsideAngular(() => {
        this.scrollListener = () => {
          const element = this.elementRef.nativeElement;
          const rect = element.parentElement?.getBoundingClientRect();

          if (rect) {
            // Calculate offset based on parent's position relative to viewport top
            // When parent top is at viewport top (0), offset is 0.
            const offset = rect.top * -1 * this.parallaxSpeed;
            // Apply transform
            element.style.transform = `translateY(${offset}px) scale(1.1)`;
          }
        };

        window.addEventListener('scroll', this.scrollListener, { passive: true });
        // Initial calculation
        this.scrollListener();
      });
    }
  }

  ngOnDestroy() {
    if (this.scrollListener && isPlatformBrowser(this.platformId)) {
      window.removeEventListener('scroll', this.scrollListener);
    }
  }
}
