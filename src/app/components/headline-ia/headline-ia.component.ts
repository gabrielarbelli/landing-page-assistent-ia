import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { AnimateOnScrollDirective } from '../../shared/directives/animate-on-scroll.directive';

@Component({
    selector: 'app-headline-ia',
    standalone: true,
    imports: [CommonModule, AnimateOnScrollDirective],
    templateUrl: './headline-ia.component.html',
    styleUrl: './headline-ia.component.scss',
})
export class HeadlineIaComponent {}
