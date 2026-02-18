export type Transaction = {
  id?: string;
  amount: number;
  type: 'income' | 'outcome';
  description: string;
  executionDate?: Date;
  createdAt?: Date;
  updatedAt?: Date;
};
