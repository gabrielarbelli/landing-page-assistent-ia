import { Directive, ElementRef, Input, OnDestroy, OnInit, Renderer2 } from '@angular/core';

@Directive({
    selector: '[appAnimateOnScroll]',
    standalone: true,
})
export class AnimateOnScrollDirective implements OnInit, OnDestroy {
    @Input('appAnimateOnScroll') public animationClass: string | string[] = 'anim-up';
    @Input() public animDelay?: number; // ms
    @Input() public once: boolean = true;

    private observer?: IntersectionObserver;

    constructor(
        private host: ElementRef<HTMLElement>,
        private renderer: Renderer2,
    ) {}

    ngOnInit(): void {
        // Esconde inicialmente
        this.renderer.setStyle(this.host.nativeElement, 'opacity', '0');

        this.observer = new IntersectionObserver(
            (entries) => {
                for (const entry of entries) {
                    if (entry.isIntersecting) {
                        this.applyAnimation();
                        if (this.once && this.observer) {
                            this.observer.unobserve(this.host.nativeElement);
                            this.observer.disconnect();
                            this.observer = undefined;
                        }
                    }
                }
            },
            { rootMargin: '0px 0px -10% 0px', threshold: 0.1 },
        );
        this.observer.observe(this.host.nativeElement);
    }

    ngOnDestroy(): void {
        this.observer?.disconnect();
    }

    private applyAnimation(): void {
        const element = this.host.nativeElement;

        const run = () => {
            // Garante visibilidade
            this.renderer.removeStyle(element, 'opacity');

            const classes = Array.isArray(this.animationClass)
                ? this.animationClass
                : String(this.animationClass).split(/\s+/).filter(Boolean);

            for (const cls of classes) {
                this.renderer.addClass(element, cls);
            }
        };

        if (typeof this.animDelay === 'number' && this.animDelay > 0) {
            setTimeout(run, this.animDelay);
        } else {
            run();
        }
    }
}
