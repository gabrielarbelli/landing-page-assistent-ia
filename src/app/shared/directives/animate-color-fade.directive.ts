import { Directive, ElementRef, Renderer2, OnInit, OnDestroy, NgZone } from '@angular/core';

@Directive({
    selector: '[appAnimateColorFade]',
})
export class AnimateColorFadeDirective implements OnInit, OnDestroy {
    private hasAnimated = false;
    private observer: IntersectionObserver | null = null;
    private scrollListener: () => void;
    private letters: HTMLSpanElement[] = [];
    private scrollThreshold = 0.3; // Porcentagem da tela em que o efeito começa

    constructor(
        private el: ElementRef,
        private renderer: Renderer2,
        private ngZone: NgZone,
    ) {
        // Bind do listener de scroll
        this.scrollListener = () => this.handleScroll();
    }

    ngOnInit() {
        this.wrapLetters();
        this.setupIntersectionObserver();
    }

    ngOnDestroy() {
        if (this.observer) {
            this.observer.disconnect();
        }
        window.removeEventListener('scroll', this.scrollListener);
    }

    private wrapLetters() {
        const textElement = this.el.nativeElement.querySelector('.highlight__text');
        if (!textElement) return;

        const text = textElement.textContent || '';
        textElement.textContent = '';

        // Preserva palavras e espaços
        const words = text.split(' ');

        words.forEach((word: string, wordIndex: number) => {
            // Cria um wrapper para a palavra
            const wordWrapper = this.renderer.createElement('span');
            this.renderer.addClass(wordWrapper, 'word');

            // Adiciona as letras da palavra dentro do wrapper
            word.split('').forEach((char: string) => {
                const span = this.renderer.createElement('span');
                const text = this.renderer.createText(char);
                this.renderer.appendChild(span, text);
                this.renderer.appendChild(wordWrapper, span);
                this.letters.push(span);
            });

            // Adiciona o wrapper da palavra ao texto
            this.renderer.appendChild(textElement, wordWrapper);

            // Adiciona espaço entre as palavras (exceto após a última palavra)
            if (wordIndex < words.length - 1) {
                const spaceSpan = this.renderer.createElement('span');
                const space = this.renderer.createText(' ');
                this.renderer.appendChild(spaceSpan, space);
                this.renderer.appendChild(textElement, spaceSpan);
                this.letters.push(spaceSpan);
            }
        });
    }

    private setupIntersectionObserver() {
        this.observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting && !this.hasAnimated) {
                        this.renderer.addClass(this.el.nativeElement, 'anim-color-fade');
                        this.hasAnimated = true;

                        // Inicia o monitoramento do scroll quando o elemento fica visível
                        this.ngZone.runOutsideAngular(() => {
                            window.addEventListener('scroll', this.scrollListener, {
                                passive: true,
                            });
                        });

                        this.handleScroll(); // Chama uma vez inicialmente
                    }
                });
            },
            {
                threshold: 0.1,
                rootMargin: '0px',
            },
        );

        this.observer.observe(this.el.nativeElement);
    }

    private handleScroll() {
        if (!this.hasAnimated) return;

        const rect = this.el.nativeElement.getBoundingClientRect();
        const windowHeight = window.innerHeight;
        const scrollProgress = 1 - rect.top / (windowHeight * 0.7);

        // Calcula quantas letras devem estar coloridas baseado no scroll
        const lettersToColor = Math.floor(this.letters.length * scrollProgress);

        this.letters.forEach((letter, index) => {
            if (index < lettersToColor) {
                this.renderer.addClass(letter, 'colored');
            } else {
                this.renderer.removeClass(letter, 'colored');
            }
        });
    }
}
