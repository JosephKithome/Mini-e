 export interface LoanScheduleItem {
    month: number;
    dueDate: string;
    principalAtStart: number;
    interest: number;
    totalDue: number;
    paymentMade: number;
    newPrincipal: number;
  }