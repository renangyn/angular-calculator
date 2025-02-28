import { Component, Input, input } from '@angular/core';
import { InvestmentResults } from '../investment-results.model';
import { InvestmentService } from '../investment.service';

@Component({
  selector: 'app-investment-results',
  standalone: true,
  imports: [],
  templateUrl: './investment-results.component.html',
  styleUrl: './investment-results.component.css'
})
export class InvestmentResultsComponent {
  constructor(private investmentService: InvestmentService) {};

  get results() {
    return this.investmentService.resultData;
  }
}
