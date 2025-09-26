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
            image: 'https://plus.unsplash.com/premium_photo-1688350808212-4e6908a03925?q=80&w=869&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
            text: 'O assistente superou minhas expectativas. Ele cuida de tarefas administrativas, responde clientes e ainda organiza meus compromissos.',
            rating: 5,
        },
        {
            name: 'André P.',
            role: 'CEO e Dono',
            image: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=580&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
            text: 'Muito útil e fácil de usar. Automatizou processos que tomavam horas da equipe. É como ter um funcionário extra que nunca para.',
            rating: 5,
        },
        {
            name: 'Marina R.',
            role: 'Dona de Salão',
            image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
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
