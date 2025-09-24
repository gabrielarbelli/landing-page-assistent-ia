import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TypewriterDirective } from '../../shared/directives/typewriter.directive';
import { AnimateOnScrollDirective } from '../../shared/directives/animate-on-scroll.directive';

@Component({
    selector: 'app-assistent',
    standalone: true,
    imports: [CommonModule, TypewriterDirective, AnimateOnScrollDirective],
    templateUrl: './assistent.component.html',
    styleUrls: ['./assistent.component.scss'],
})
export class AssistentComponent {}
