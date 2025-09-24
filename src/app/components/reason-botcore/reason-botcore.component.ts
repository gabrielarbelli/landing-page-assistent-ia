import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AnimateOnScrollDirective } from '../../shared/directives/animate-on-scroll.directive';

interface ReasonCard {
  title: string;
  text: string;
  iconSrc: string;
}

@Component({
  selector: 'app-reason-botcore',
  standalone: true,
  imports: [CommonModule, AnimateOnScrollDirective],
  templateUrl: './reason-botcore.component.html',
  styleUrl: './reason-botcore.component.scss'
})
export class ReasonBotcoreComponent {
  reasonCards: ReasonCard[] = [
    {
      title: 'Abordagem Inovadora',
      text: 'Nossas soluções de IA se adaptam ao seu negócio, sem fórmulas prontas. Cada detalhe é pensado para gerar valor no seu contexto.',
      iconSrc: 'images/brain.gif'
    },
    {
      title: 'Resultados Reais',
      text: 'Focando nos resultados, não entregamos apenas tecnologia, entregamos impacto: mais eficiência, mais vendas e clientes mais satisfeitos.',
      iconSrc: 'images/brain.gif'
    },
    {
      title: 'Crescimento Escalável',
      text: 'Nossos serviços evoluem junto com a sua empresa — da automação básica até estratégias avançadas de inteligência artificial.',
      iconSrc: 'images/brain.gif'
    }
  ];
}