import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AnimateOnScrollDirective } from '../../shared/directives/animate-on-scroll.directive';

interface BusinessType {
    id: number;
    title: string;
    description: string;
    image: string;
    icon: string;
    footerText?: string;
}

@Component({
    selector: 'app-business-types',
    standalone: true,
    imports: [CommonModule, AnimateOnScrollDirective],
    templateUrl: './business-types.component.html',
    styleUrls: ['./business-types.component.scss'],
})
export class BusinessTypesComponent {
    businessTypes: BusinessType[] = [
        {
            id: 1,
            title: 'Varejo',
            description:
                'Impulsione suas vendas com atendimento automatizado 24/7, recomendações personalizadas e suporte instantâneo.',
            image: 'assets/images/business-types/retail.jpg',
            icon: 'shopping_cart',
            footerText: 'Explore soluções para varejo',
        },
        {
            id: 2,
            title: 'Saúde',
            description:
                'Melhore a experiência do paciente com agendamento automatizado, triagem inicial e acompanhamento personalizado.',
            image: 'assets/images/business-types/healthcare.jpg',
            icon: 'medical_services',
            footerText: 'Conheça soluções para saúde',
        },
        {
            id: 3,
            title: 'Educação',
            description:
                'Transforme o aprendizado com suporte 24/7 aos alunos, respostas instantâneas e orientação personalizada.',
            image: 'assets/images/business-types/education.jpg',
            icon: 'school',
            footerText: 'Veja soluções para educação',
        },
        {
            id: 4,
            title: 'Finanças',
            description:
                'Ofereça atendimento financeiro ágil, seguro e personalizado com automação inteligente.',
            image: 'assets/images/business-types/finance.jpg',
            icon: 'payments',
            footerText: 'Descubra soluções financeiras',
        },
    ];

    activeTabId: number | null = null;

    setActiveTab(id: number): void {
        this.activeTabId = this.activeTabId === id ? null : id;
    }

    isTabActive(id: number): boolean {
        return this.activeTabId === id;
    }
}
