import { Injectable } from "@angular/core";
import { InvestmentInput } from "./investment-input.model";
import { InvestmentResults } from "./investment-results.model";

@Injectable({ providedIn: 'root' })
export class InvestmentService { 
  resultData?: InvestmentResults[];

  calculateInvestmentResults(data: InvestmentInput) {
    const {
      initialInvestment,
      duration,
      expectedReturn,
      annualInvestment = 0,
      monthlyContribution = 0,
      incomeTax = 0
    } = data;

    const annualData: InvestmentResults[] = [];
    let investmentValue = initialInvestment;

    // taxa mensal equivalente para capitalização mensal dentro do ano
    const monthlyRate = Math.pow(1 + expectedReturn / 100, 1 / 12) - 1;

    for (let year = 1; year <= duration; year++) {
      let interestThisYear = 0;

      // loop pelos 12 meses do ano
      for (let month = 1; month <= 12; month++) {
        // juros do mês sobre saldo atual
        const monthlyInterest = investmentValue * monthlyRate;
        interestThisYear += monthlyInterest;

        // atualiza saldo com juros do mês
        investmentValue += monthlyInterest;

        // adiciona aporte mensal
        investmentValue += monthlyContribution;
      }

      // adiciona aporte anual extra no final do ano
      investmentValue += annualInvestment;

      // total investido até agora
      const totalInvested = initialInvestment 
                            + monthlyContribution * 12 * year
                            + annualInvestment * year;

      // juros totais
      const totalInterest = investmentValue - totalInvested;

      // valor líquido após imposto de renda sobre os juros
      const valueAfterTax = investmentValue - totalInterest * (incomeTax / 100);

      annualData.push({
        year,
        interest: interestThisYear,
        valueEndOfYear: investmentValue,
        annualInvestment,
        totalInterest,
        totalAmountInvested: totalInvested,
        valueAfterTax
      });
    }

    this.resultData = annualData;
  }
}
