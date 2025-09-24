import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TestimonialsComponent } from './testimonials.component';
import { AnimateOnScrollDirective } from '../../shared/directives/animate-on-scroll.directive';

describe('TestimonialsComponent', () => {
    let component: TestimonialsComponent;
    let fixture: ComponentFixture<TestimonialsComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [TestimonialsComponent, AnimateOnScrollDirective],
        }).compileComponents();

        fixture = TestBed.createComponent(TestimonialsComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should render all testimonial cards', () => {
        const compiled = fixture.nativeElement as HTMLElement;
        const testimonialCards = compiled.querySelectorAll('.testimonial-card');
        expect(testimonialCards.length).toBeGreaterThan(0);
    });

    it('should display testimonial content correctly', () => {
        const compiled = fixture.nativeElement as HTMLElement;
        const firstCard = compiled.querySelector('.testimonial-card');
        expect(firstCard).toBeTruthy();

        if (firstCard) {
            const name = firstCard.querySelector('.testimonial-card__name');
            const text = firstCard.querySelector('.testimonial-card__text');
            expect(name).toBeTruthy();
            expect(text).toBeTruthy();
        }
    });
});
