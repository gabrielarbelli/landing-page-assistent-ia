import { ComponentFixture, TestBed } from '@angular/core/testing';
import { GrowthSystemComponent } from './growth-system.component';

describe('GrowthSystemComponent', () => {
    let component: GrowthSystemComponent;
    let fixture: ComponentFixture<GrowthSystemComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [GrowthSystemComponent],
        }).compileComponents();

        fixture = TestBed.createComponent(GrowthSystemComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should have cards defined', () => {
        expect(component.cards).toBeDefined();
        expect(component.cards.length).toBeGreaterThan(0);
    });

    it('should have features defined', () => {
        expect(component.features).toBeDefined();
        expect(component.features.length).toBeGreaterThan(0);
    });

    it('should render all cards', () => {
        const compiled = fixture.nativeElement as HTMLElement;
        const cardElements = compiled.querySelectorAll('.growth-system__card');
        expect(cardElements.length).toBe(component.cards.length);
    });

    it('should render all features', () => {
        const compiled = fixture.nativeElement as HTMLElement;
        const featureElements = compiled.querySelectorAll('.feature-btn');
        expect(featureElements.length).toBe(component.features.length);
    });
});
