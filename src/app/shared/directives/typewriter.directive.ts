import { Directive, ElementRef, Input, OnDestroy, OnInit, Renderer2 } from '@angular/core';

@Directive({
    selector: '[appTypewriter]',
    standalone: true,
})
export class TypewriterDirective implements OnInit, OnDestroy {
    @Input() public speed: number = 24; // ms por caractere
    @Input() public startDelay: number = 0; // ms
    @Input() public once: boolean = true;
    @Input() public cursor: boolean = true;
    @Input() public cursorChar: string = '▍';
    @Input() public reveal: boolean = true; // quando true, só revela com fade sem caret

    private originalText: string = '';
    private originalHTML: string = '';
    private observer?: IntersectionObserver;
    private typingTimer?: any;
    private cursorTimer?: any;
    private caretEl?: HTMLElement;
    private hasTyped: boolean = false;

    constructor(
        private host: ElementRef<HTMLElement>,
        private renderer: Renderer2,
    ) {}

    ngOnInit(): void {
        const el = this.host.nativeElement;
        this.originalText = el.textContent ?? '';
        this.originalHTML = el.innerHTML;
        // Prepara conteúdo conforme modo
        if (this.reveal) {
            // Se contém tags, faz parsing para revelar só texto, mantendo tags
            if (/<\/?[a-z][\s\S]*>/i.test(this.originalHTML)) {
                if (this.originalHTML.trim().length === 0) {
                    // Se não há texto, não faz nada
                    return;
                }
                el.innerHTML = '';
                this.prepareHTMLReveal(this.originalHTML, el);
                // Se não criou nada, mostra o texto imediatamente
                if (!el.childNodes.length) {
                    el.innerHTML = this.originalHTML;
                }
            } else {
                // Monta spans para manter layout sem "pular"
                const text = this.originalText;
                el.textContent = '';
                if (text.length === 0) {
                    return;
                }
                for (let i = 0; i < text.length; i++) {
                    const ch = text.charAt(i);
                    const span = this.renderer.createElement('span') as HTMLSpanElement;
                    span.textContent = ch;
                    this.renderer.setStyle(span, 'opacity', '0');
                    this.renderer.setStyle(span, 'transition', 'opacity .28s ease');
                    this.renderer.setStyle(span, 'white-space', 'pre');
                    this.renderer.appendChild(el, span);
                }
                // Cria o observer para texto simples também
                this.setupObserver();
            }
        } else {
            // Limpa texto até entrar no viewport para modo "type"
            el.textContent = '';
            // Cria o observer para modo type também
            this.setupObserver();
        }
    }

    private setupObserver(): void {
        this.observer = new IntersectionObserver(
            (entries) => {
                for (const entry of entries) {
                    if (entry.isIntersecting) {
                        this.beginTyping();
                        if (this.once) {
                            this.observer?.disconnect();
                        }
                    }
                }
            },
            { threshold: 0.2 },
        );

        this.observer.observe(this.host.nativeElement);
    }

    // Função para preparar spans mantendo tags HTML
    private prepareHTMLReveal(html: string, parent: HTMLElement) {
        // Cria um container temporário para parsear HTML
        const temp = document.createElement('div');
        temp.innerHTML = html;
        const walk = (node: ChildNode, parentEl: HTMLElement) => {
            if (node.nodeType === Node.TEXT_NODE) {
                const text = node.textContent || '';
                for (let i = 0; i < text.length; i++) {
                    const span = this.renderer.createElement('span') as HTMLSpanElement;
                    span.textContent = text.charAt(i);
                    this.renderer.setStyle(span, 'opacity', '0');
                    this.renderer.setStyle(span, 'transition', 'opacity .28s ease');
                    this.renderer.setStyle(span, 'white-space', 'pre');
                    this.renderer.appendChild(parentEl, span);
                }
            } else if (node.nodeType === Node.ELEMENT_NODE) {
                const el = this.renderer.createElement((node as Element).tagName.toLowerCase());
                // Copia atributos
                for (const attr of Array.from((node as Element).attributes)) {
                    this.renderer.setAttribute(el, attr.name, attr.value);
                }
                parentEl.appendChild(el);
                for (const child of Array.from(node.childNodes)) {
                    walk(child, el);
                }
            }
        };
        for (const child of Array.from(temp.childNodes)) {
            walk(child, parent);
        }

        // Cria o observer após preparar o HTML
        this.setupObserver();
    }

    ngOnDestroy(): void {
        this.observer?.disconnect();
        if (this.typingTimer) clearInterval(this.typingTimer);
        if (this.cursorTimer) clearInterval(this.cursorTimer);
    }

    private beginTyping(): void {
        if (this.hasTyped && this.once) return;
        this.hasTyped = true;

        const element = this.host.nativeElement;
        const text = this.originalText;
        let index = 0;

        const start = () => {
            if (this.reveal) {
                // revela spans já existentes, inclusive dentro de tags
                const allSpans: HTMLElement[] = [];
                const collectSpans = (el: HTMLElement) => {
                    for (const child of Array.from(el.childNodes)) {
                        if (
                            child.nodeType === Node.ELEMENT_NODE &&
                            (child as HTMLElement).tagName === 'SPAN' &&
                            (child as HTMLElement).style.opacity === '0'
                        ) {
                            allSpans.push(child as HTMLElement);
                        } else if (child.nodeType === Node.ELEMENT_NODE) {
                            collectSpans(child as HTMLElement);
                        }
                    }
                };
                collectSpans(element);
                this.typingTimer = setInterval(
                    () => {
                        if (index < allSpans.length) {
                            const node = allSpans[index] as HTMLElement;
                            if (node && node.style) node.style.opacity = '1';
                            index += 1;
                        } else {
                            clearInterval(this.typingTimer);
                        }
                    },
                    Math.max(6, this.speed),
                );
                return;
            }
            // Modo digitação com caret
            if (this.cursor) {
                const caret = this.renderer.createElement('span') as HTMLElement;
                this.caretEl = caret;
                this.renderer.setAttribute(caret, 'aria-hidden', 'true');
                this.renderer.setStyle(caret, 'display', 'inline-block');
                this.renderer.setStyle(caret, 'margin-left', '2px');
                this.renderer.setStyle(caret, 'opacity', '1');
                caret.innerText = this.cursorChar;
                this.renderer.appendChild(element, caret);
                this.cursorTimer = setInterval(() => {
                    if (this.caretEl) {
                        const visible = this.caretEl.style.opacity !== '0';
                        this.caretEl.style.opacity = visible ? '0' : '1';
                    }
                }, 500);
            }

            this.typingTimer = setInterval(
                () => {
                    if (index < text.length) {
                        element.insertBefore(
                            document.createTextNode(text.charAt(index)),
                            this.caretEl ?? null,
                        );
                        index += 1;
                    } else {
                        clearInterval(this.typingTimer);
                        if (this.caretEl) this.caretEl.style.opacity = '0.4';
                    }
                },
                Math.max(6, this.speed),
            );
        };

        if (this.startDelay > 0) {
            setTimeout(start, this.startDelay);
        } else {
            start();
        }
    }
}
