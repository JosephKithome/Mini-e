export interface LoanAmortization {
  _id: string;
  loanId: string;
  month: number;
  dueDate: Date;
  principalAtStart: number;
  interest: number;
  interestRate: number;
  totalDue: number;
  paymentMade: number;
  newPrincipal: number;
}
