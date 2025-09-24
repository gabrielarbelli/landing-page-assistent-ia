import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BotcoreComponent } from './botcore.component';
import { AnimateOnScrollDirective } from '../../shared/directives/animate-on-scroll.directive';

describe('BotcoreComponent', () => {
    let component: BotcoreComponent;
    let fixture: ComponentFixture<BotcoreComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [BotcoreComponent, AnimateOnScrollDirective],
        }).compileComponents();

        fixture = TestBed.createComponent(BotcoreComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should have botcore text', () => {
        const compiled = fixture.nativeElement as HTMLElement;
        expect(compiled.querySelector('.botcore__text')?.textContent).toContain('BotCore');
    });
});
