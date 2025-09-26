import { Component, AfterViewInit, ElementRef, ViewChild, Renderer2, NgZone } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AnimateOnScrollDirective } from '../../shared/directives/animate-on-scroll.directive';
import { FooterComponent } from '../../components/footer/footer.component';
import { FaqComponent } from '../../components/faq/faq.component';
import { HeaderComponent } from '../../components/header/header.component';
import { AssistentComponent } from '../../components/assistent/assistent.component';
import { HighlightComponent } from '../../components/highlight/highlight.component';
import { BotcoreComponent } from '../../components/botcore/botcore.component';
import { MonitoringPanelComponent } from '../../components/monitoring-panel/monitoring-panel.component';
import { BusinessTypesComponent } from '../../components/business-types/business-types.component';
import { GrowthSystemComponent } from '../../components/growth-system/growth-system.component';
import { HeadlineIaComponent } from '../../components/headline-ia/headline-ia.component';
import { MissionBlockComponent } from '../../components/mission-block/mission-block.component';
import { TestimonialsComponent } from '../../components/testimonials/testimonials.component';
import { ReasonBotcoreComponent } from '../../components/reason-botcore/reason-botcore.component';
import { SuccessStoriesComponent } from '../../components/success-stories/success-stories.component';

@Component({
    selector: 'app-home',
    standalone: true,
    imports: [
        CommonModule,
        AnimateOnScrollDirective,
        FooterComponent,
        FaqComponent,
        BotcoreComponent,
        HeaderComponent,
        AssistentComponent,
        HighlightComponent,
        MonitoringPanelComponent,
        BusinessTypesComponent,
        HeadlineIaComponent,
        MissionBlockComponent,
        GrowthSystemComponent,
        TestimonialsComponent,
        ReasonBotcoreComponent,
        SuccessStoriesComponent,
    ],
    templateUrl: './home.component.html',
    styleUrl: './home.component.scss',
})
export class HomeComponent implements AfterViewInit {
    @ViewChild('videoPlayer') videoPlayer?: ElementRef<HTMLVideoElement>;

    isMenuOpen = false;
    activeStory = 'movitta';
    private hasInteracted = false;

    constructor(
        private el: ElementRef,
        private renderer: Renderer2,
        private ngZone: NgZone,
    ) {
        this.setupTabsAndMetrics();
    }

    ngAfterViewInit(): void {
        // Setup da animação do hero
        const hero = this.el.nativeElement.querySelector('.hero-animated');
        const bg = this.el.nativeElement.querySelector('.hero-animated__image-bg');
        if (hero && bg) {
            let maxWidth = window.innerWidth;
            const minWidth = 500;
            let lastWidth = minWidth;
            // O crescimento agora é mais rápido e proporcional em altura e largura
            const minHeight = 220;
            let maxHeight = window.innerHeight * 0.7;
            let lastHeight = minHeight;
            const onScroll = () => {
                const rect = hero.getBoundingClientRect();
                const windowH = window.innerHeight;
                // Calcula o quanto do bloco está visível
                let visible = (windowH - rect.top) / (rect.height || 1);
                visible = Math.max(0, Math.min(visible, 1.7));
                // Normaliza para 0~1
                const progress = Math.min(1, visible / 1.7);
                // Interpola width e height
                const targetWidth = minWidth + (maxWidth - minWidth) * progress;
                const targetHeight = minHeight + (maxHeight - minHeight) * progress;
                // Só aumenta, não diminui
                if (targetWidth > lastWidth) {
                    lastWidth = targetWidth;
                }
                if (targetHeight > lastHeight) {
                    lastHeight = targetHeight;
                }
                bg.style.width = `${lastWidth}px`;
                bg.style.height = `${lastHeight}px`;
                bg.style.maxWidth = '100vw';
                bg.style.minWidth = minWidth + 'px';
                bg.style.maxHeight = '100vh';
                bg.style.minHeight = minHeight + 'px';
                // Ativa textos quando visível
                if (progress > 0.25) {
                    this.renderer.addClass(hero, 'in-view');
                } else {
                    this.renderer.removeClass(hero, 'in-view');
                }
            };
            this.ngZone.runOutsideAngular(() => {
                window.addEventListener('scroll', onScroll);
                window.addEventListener('resize', () => {
                    maxWidth = window.innerWidth;
                    maxHeight = window.innerHeight * 0.7;
                    onScroll();
                });
                onScroll();
            });
            this.ngZone.runOutsideAngular(() => {
                window.addEventListener('scroll', onScroll);
                window.addEventListener('resize', () => {
                    maxWidth = window.innerWidth;
                    onScroll();
                });
                onScroll();
            });
        }
    }

    onVideoLoaded() {
        if (!this.videoPlayer) return;

        const video = this.videoPlayer.nativeElement;
        video.muted = true; // Garante que está mudo

        const attemptPlay = () => {
            if (!this.hasInteracted) {
                const playPromise = video.play();
                if (playPromise !== undefined) {
                    playPromise.catch((error) => {
                        console.log('Aguardando interação do usuário...');
                        this.setupUserInteractionListeners();
                    });
                }
            }
        };

        attemptPlay();
    }

    private setupUserInteractionListeners() {
        this.ngZone.runOutsideAngular(() => {
            const startPlayback = () => {
                if (!this.videoPlayer || this.hasInteracted) return;

                this.hasInteracted = true;
                const video = this.videoPlayer.nativeElement;
                video
                    .play()
                    .then(() => {
                        // Remove listeners após sucesso
                        this.removeListeners();
                    })
                    .catch(() => {
                        // Se ainda falhar, mantém os listeners
                        this.hasInteracted = false;
                    });
            };

            const events = ['click', 'touchstart', 'scroll', 'keydown'];
            events.forEach((event) => {
                document.addEventListener(event, startPlayback);
            });

            this.removeListeners = () => {
                events.forEach((event) => {
                    document.removeEventListener(event, startPlayback);
                });
            };
        });
    }

    private removeListeners: () => void = () => {};

    toggleMenu() {
        this.isMenuOpen = !this.isMenuOpen;
        document.body.style.overflow = this.isMenuOpen ? 'hidden' : '';
    }

    private setupTabsAndMetrics() {
        // Wait for DOM to be ready
        setTimeout(() => {
            this.setupTabs();
            this.setupMetrics();
        });
    }

    private setupTabs() {
        const tabs = document.querySelectorAll('.tab');

        // Set last tab as initially active
        if (tabs.length > 0) {
            tabs[tabs.length - 1].classList.add('active');
        }

        tabs.forEach((tab) => {
            tab.addEventListener('mouseenter', () => {
                // Remove active class from all other tabs
                tabs.forEach((t) => {
                    if (t !== tab) t.classList.remove('active');
                });
                // Add active class to hovered tab
                tab.classList.add('active');
            });
        });
    }

    private setupMetrics() {
        this.ngZone.runOutsideAngular(() => {
            const metrics = this.el.nativeElement.querySelectorAll('.metric');

            metrics.forEach((metric: HTMLElement) => {
                this.renderer.listen(metric, 'mousemove', (e: MouseEvent) => {
                    const rect = metric.getBoundingClientRect();
                    const x = ((e.clientX - rect.left) / rect.width) * 100;
                    const y = ((e.clientY - rect.top) / rect.height) * 100;
                    this.renderer.setStyle(
                        metric,
                        'background',
                        `radial-gradient(circle at ${x}% ${y}%, rgba(255,255,255,0.1) 0%, transparent 50%)`,
                    );
                });

                this.renderer.listen(metric, 'mouseleave', () => {
                    this.renderer.setStyle(
                        metric,
                        'background',
                        'linear-gradient(145deg, rgba(255, 255, 255, 0.05), rgba(255, 255, 255, 0.02))',
                    );
                });
            });
        });
    }
}
