export interface Loan {
  systemRef: string;
  borrowerId: string;
  amount: number;
  amountToBePaid: number;
  interestRate: number;
  durationMonths: number;
  investorIds: string[];
  status: string;
  createdAt: Date;
  updatedAt: Date;
  dueDate: Date;
  issuedAt: Date;
  showMore?: boolean; 
  username: string;
  description: string;
  loanAccount: string;
  }


  export class LoanModel implements Loan {
    issuedAt: Date;
    amountToBePaid: number;
    description: string;
    showMore?: boolean | undefined;
    username: string;
    systemRef: string;
    borrowerId: string;
    amount: number;
    interestRate: number;
    durationMonths: number;
    investorIds: string[];
    status: string;
    createdAt: Date;
    updatedAt: Date;
    dueDate: Date;
    loanAccount: string;
  
  }