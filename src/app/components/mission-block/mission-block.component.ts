import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { TypewriterDirective } from '../../shared/directives/typewriter.directive';
import { AnimateOnScrollDirective } from '../../shared/directives/animate-on-scroll.directive';

@Component({
    selector: 'app-mission-block',
    standalone: true,
    imports: [CommonModule, TypewriterDirective, AnimateOnScrollDirective],
    templateUrl: './mission-block.component.html',
    styleUrl: './mission-block.component.scss',
})
export class MissionBlockComponent {}
