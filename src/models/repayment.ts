export interface Repayment {
    systemRef: string;
    loanId: string;
    loanAccount: string;
    borrowerId: string;
    amount: number;
    amountDue: number,
    username: string;
    dueDate: Date;
    status: string;
    paymentMode: string;
    paymentDate?: Date;
    createdAt: Date;
    updatedAt: Date;
    createdBy: string;
    updatedBy: string;
  }

  export class RepaymentModel implements Repayment{
      username: string;
      systemRef: string;
      loanId: string;
      loanAccount: string;
      borrowerId: string;
      amount: number;
      amountDue: number;
      dueDate: Date;
      status: string;
      paymentMode: string;
      paymentDate?: Date | undefined;
      createdAt: Date;
      updatedAt: Date;
      createdBy: string;
      updatedBy: string;
    
  }