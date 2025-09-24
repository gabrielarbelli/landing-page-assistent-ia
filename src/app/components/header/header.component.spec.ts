import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderComponent } from './header.component';

describe('HeaderComponent', () => {
    let component: HeaderComponent;
    let fixture: ComponentFixture<HeaderComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [HeaderComponent],
        }).compileComponents();

        fixture = TestBed.createComponent(HeaderComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should toggle menu when hamburger is clicked', () => {
        expect(component.isMenuOpen).toBeFalse();
        component.toggleMenu();
        expect(component.isMenuOpen).toBeTrue();
        component.toggleMenu();
        expect(component.isMenuOpen).toBeFalse();
    });
});
