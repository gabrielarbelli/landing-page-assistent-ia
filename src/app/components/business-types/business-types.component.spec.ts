import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BusinessTypesComponent } from './business-types.component';

describe('BusinessTypesComponent', () => {
    let component: BusinessTypesComponent;
    let fixture: ComponentFixture<BusinessTypesComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [BusinessTypesComponent],
        }).compileComponents();

        fixture = TestBed.createComponent(BusinessTypesComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should toggle active tab when setActiveTab is called', () => {
        // Initially no tab is active
        expect(component.activeTabId).toBeNull();

        // Set tab 1 as active
        component.setActiveTab(1);
        expect(component.activeTabId).toBe(1);

        // Toggle same tab - should deactivate
        component.setActiveTab(1);
        expect(component.activeTabId).toBeNull();

        // Set different tab as active
        component.setActiveTab(2);
        expect(component.activeTabId).toBe(2);
    });

    it('should correctly check if tab is active', () => {
        component.activeTabId = 1;
        expect(component.isTabActive(1)).toBeTrue();
        expect(component.isTabActive(2)).toBeFalse();
    });

    it('should have business types defined', () => {
        expect(component.businessTypes).toBeDefined();
        expect(component.businessTypes.length).toBeGreaterThan(0);
    });
});
