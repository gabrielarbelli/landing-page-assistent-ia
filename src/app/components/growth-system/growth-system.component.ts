import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AnimateOnScrollDirective } from '../../shared/directives/animate-on-scroll.directive';

@Component({
    selector: 'app-growth-system',
    standalone: true,
    imports: [CommonModule, AnimateOnScrollDirective],
    templateUrl: './growth-system.component.html',
    styleUrls: ['./growth-system.component.scss'],
})
export class GrowthSystemComponent {}
