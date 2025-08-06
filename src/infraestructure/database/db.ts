// db.ts
import Dexie, { type EntityTable } from 'dexie';

interface FundingSource {
	id: number;
	amount: number;
	name: string;
	description: string;
	currency: "GTQ";
	isActive?: boolean;
	createdAt?: string | null;
	updatedAt?: string | null;
}

type NewFundingSource = Omit<FundingSource, 'id'>;
type Frequency = "daily" | "weekly" | "biweekly" | "monthly" | "yearly" | "once";

interface Expense {
	id: number;
	amount: number;
	name: string;
	description: string;
	currency: "GTQ";
	frequency: Frequency;
	nextDueDate?: string | null;
	startDate?: string | null;
	isRecurring: boolean;
	endDate?: string | null;
	fundingSourceId?: number | null;
}

type NewExpense = Omit<Expense, 'id'>;

const db = new Dexie('v3') as Dexie & {
	funding_source: EntityTable<
		FundingSource,
		'id'
	>;
	expense: EntityTable<Expense, 'id'>
};

// Schema declaration:
db.version(1).stores({
	funding_source: "++id, amount, description, currency, name, isActive, createdAt, updatedAt",
	expense: "++id, amount, description, currency, frequency, nextDueDate, startDate, isRecurring, endDate, name, fundingSourceId",
});

export type { FundingSource, Expense, NewFundingSource, NewExpense, Frequency };
export { db };