import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HeaderComponent } from './header';

describe('HeaderComponent', () => {
    let component: HeaderComponent;
    let fixture: ComponentFixture<HeaderComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [HeaderComponent]
        })
            .compileComponents();

        fixture = TestBed.createComponent(HeaderComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should update isScrolled based on scroll position', async () => {
        const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

        // Initial state (scroll 0)
        Object.defineProperty(window, 'scrollY', { value: 0, writable: true });
        document.dispatchEvent(new Event('scroll'));
        await delay(50);
        fixture.detectChanges();
        // @ts-ignore
        expect(component.isScrolled()).toBe(false);

        // Scroll > 50
        Object.defineProperty(window, 'scrollY', { value: 51, writable: true });
        document.dispatchEvent(new Event('scroll'));
        await delay(50);
        fixture.detectChanges();
        // @ts-ignore
        expect(component.isScrolled()).toBe(true);

        // Scroll <= 50
        Object.defineProperty(window, 'scrollY', { value: 50, writable: true });
        document.dispatchEvent(new Event('scroll'));
        await delay(50);
        fixture.detectChanges();
        // @ts-ignore
        expect(component.isScrolled()).toBe(false);
    });
});
