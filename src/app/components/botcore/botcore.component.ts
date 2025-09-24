import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AnimateOnScrollDirective } from '../../shared/directives/animate-on-scroll.directive';

@Component({
    selector: 'app-botcore',
    standalone: true,
    imports: [CommonModule, AnimateOnScrollDirective],
    templateUrl: './botcore.component.html',
    styleUrls: ['./botcore.component.scss'],
})
export class BotcoreComponent {}
