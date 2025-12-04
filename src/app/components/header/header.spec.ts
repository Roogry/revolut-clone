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

    it('should hide header on scroll down and show on scroll up', async () => {
        const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

        // Mock window scroll
        Object.defineProperty(window, 'scrollY', { value: 0, writable: true });
        document.dispatchEvent(new Event('scroll'));
        await delay(50);
        fixture.detectChanges();
        // @ts-ignore
        expect(component.isHeaderHidden()).toBe(false);

        // Scroll down
        Object.defineProperty(window, 'scrollY', { value: 100, writable: true });
        document.dispatchEvent(new Event('scroll'));
        await delay(50);
        fixture.detectChanges();
        // @ts-ignore
        expect(component.isHeaderHidden()).toBe(true);

        // Scroll up
        Object.defineProperty(window, 'scrollY', { value: 50, writable: true });
        document.dispatchEvent(new Event('scroll'));
        await delay(50);
        fixture.detectChanges();
        // @ts-ignore
        expect(component.isHeaderHidden()).toBe(false);
    });
});
