import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AnimateColorFadeDirective } from '../../shared/directives/animate-color-fade.directive';
import { AnimateOnScrollDirective } from '../../shared/directives/animate-on-scroll.directive';

@Component({
    selector: 'app-highlight',
    standalone: true,
    imports: [CommonModule, AnimateColorFadeDirective, AnimateOnScrollDirective],
    templateUrl: './highlight.component.html',
    styleUrls: ['./highlight.component.scss'],
})
export class HighlightComponent {}
