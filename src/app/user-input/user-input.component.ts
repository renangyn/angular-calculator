import { InvestmentService } from './../investment.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-user-input',
  templateUrl: './user-input.component.html',
  styleUrls: ['./user-input.component.css']
})
export class UserInputComponent {
  enteredInitialInvestment = '0';
  enteredAnnualInvestment = '0';
  enteredMonthlyContribution = '0';
  enteredExpectedReturn = '5';
  enteredDuration = '10';
  enteredIncomeTax = '0'; // porcentagem de IR

  constructor(private investmentService: InvestmentService){};

  onSubmit(){
    this.investmentService.calculateInvestmentResults({
      initialInvestment: +this.enteredInitialInvestment,
      duration: +this.enteredDuration,
      expectedReturn: +this.enteredExpectedReturn,
      annualInvestment: +this.enteredAnnualInvestment,
      monthlyContribution: +this.enteredMonthlyContribution,
      incomeTax: +this.enteredIncomeTax
    });
  }
}
