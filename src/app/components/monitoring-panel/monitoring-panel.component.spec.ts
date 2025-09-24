import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MonitoringPanelComponent } from './monitoring-panel.component';
import { AnimateOnScrollDirective } from '../../shared/directives/animate-on-scroll.directive';

describe('MonitoringPanelComponent', () => {
    let component: MonitoringPanelComponent;
    let fixture: ComponentFixture<MonitoringPanelComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [MonitoringPanelComponent, AnimateOnScrollDirective],
        }).compileComponents();

        fixture = TestBed.createComponent(MonitoringPanelComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should contain monitoring panel title', () => {
        const compiled = fixture.nativeElement as HTMLElement;
        expect(compiled.querySelector('.title')?.textContent).toContain('Painel De Monitoramento');
    });

    it('should render all monitoring features', () => {
        const compiled = fixture.nativeElement as HTMLElement;
        const features = compiled.querySelectorAll('.monitoring-panel__list-column');
        expect(features.length).toBe(7); // There are 7 features listed
    });
});
