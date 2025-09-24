import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { AnimateOnScrollDirective } from '../../shared/directives/animate-on-scroll.directive';

interface Testimonial {
    name: string;
    role: string;
    image: string;
    text: string;
    rating: number;
}

@Component({
    selector: 'app-testimonials',
    standalone: true,
    imports: [CommonModule, AnimateOnScrollDirective],
    templateUrl: './testimonials.component.html',
    styleUrl: './testimonials.component.scss',
})
export class TestimonialsComponent {
    testimonials: Testimonial[] = [
        {
            name: 'Marcos M.',
            role: 'Agente de T.I',
            image: '/assets/images/avatar-marcos.jpg',
            text: 'O assistente superou minhas expectativas. Ele cuida de tarefas administrativas, responde clientes e ainda organiza meus compromissos.',
            rating: 5,
        },
        {
            name: 'André P.',
            role: 'CEO e Dono',
            image: '/assets/images/avatar-marcos.jpg',
            text: 'Muito útil e fácil de usar. Automatizou processos que tomavam horas da equipe. É como ter um funcionário extra que nunca para.',
            rating: 5,
        },
        {
            name: 'Marina R.',
            role: 'Dona de Salão',
            image: '/assets/images/avatar-marina.jpg',
            text: 'Uso para atendimento, organização de dados e até marketing. Ele se adapta rápido às necessidades e me faz ganhar tempo de verdade.',
            rating: 5,
        },
    ];

    getStars(rating: number): number[] {
        return Array(rating).fill(0);
    }

    getDelayForIndex(index: number): number {
        return 100 + index * 100;
    }
}
