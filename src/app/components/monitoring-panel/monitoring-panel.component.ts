import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AnimateOnScrollDirective } from '../../shared/directives/animate-on-scroll.directive';

@Component({
    selector: 'app-monitoring-panel',
    standalone: true,
    imports: [CommonModule, AnimateOnScrollDirective],
    templateUrl: './monitoring-panel.component.html',
    styleUrls: ['./monitoring-panel.component.scss'],
})
export class MonitoringPanelComponent {}
