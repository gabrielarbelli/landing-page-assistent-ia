import { Component, ElementRef, NgZone, Renderer2 } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AnimateOnScrollDirective } from '../../shared/directives/animate-on-scroll.directive';

@Component({
    selector: 'app-success-stories',
    standalone: true,
    imports: [CommonModule, AnimateOnScrollDirective],
    templateUrl: './success-stories.component.html',
    styleUrls: ['./success-stories.component.scss'],
})
export class SuccessStoriesComponent {
    activeStory: 'movitta' | 'mexicanissimo' | 'blacksheep' = 'movitta';

    constructor(
        private el: ElementRef,
        private renderer: Renderer2,
        private ngZone: NgZone,
    ) {
        this.setupTabsAndMetrics();
    }

    private setupTabsAndMetrics() {
        // Wait for DOM to be ready
        setTimeout(() => {
            this.setupAccordion();
        });
    }

    private setupAccordion() {
        // Quando um item do accordion é clicado, atualizamos a imagem correspondente
        const accordionButtons = document.querySelectorAll('.accordion-button');
        accordionButtons.forEach((button: Element, index) => {
            button.addEventListener('click', () => {
                // Identifica qual case foi clicado e atualiza a imagem
                setTimeout(() => {
                    if (!button.classList.contains('collapsed')) {
                        if (index === 0) {
                            this.activeStory = 'movitta';
                        } else if (index === 1) {
                            this.activeStory = 'mexicanissimo';
                        } else if (index === 2) {
                            this.activeStory = 'blacksheep';
                        }
                    }
                }, 10);
            });
        });
    }
}
