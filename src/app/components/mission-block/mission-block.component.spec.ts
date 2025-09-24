import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MissionBlockComponent } from './mission-block.component';
import { TypewriterDirective } from '../../shared/directives/typewriter.directive';
import { AnimateOnScrollDirective } from '../../shared/directives/animate-on-scroll.directive';

describe('MissionBlockComponent', () => {
    let component: MissionBlockComponent;
    let fixture: ComponentFixture<MissionBlockComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [MissionBlockComponent],
            declarations: [],
        }).compileComponents();

        fixture = TestBed.createComponent(MissionBlockComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
