import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HeadlineIaComponent } from './headline-ia.component';
import { AnimateOnScrollDirective } from '../../shared/directives/animate-on-scroll.directive';

describe('HeadlineIaComponent', () => {
    let component: HeadlineIaComponent;
    let fixture: ComponentFixture<HeadlineIaComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [HeadlineIaComponent],
            declarations: [],
        }).compileComponents();

        fixture = TestBed.createComponent(HeadlineIaComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
