// db.ts
import Dexie, {type EntityTable} from 'dexie';

interface FundingSource {
	id: number;
	amount: number;
	description: string;
	currency: "GTQ";
}

type NewFundingSource = Omit<FundingSource, 'id'>;

interface Expense {
	id: number;
	amount: number;
	description: string;
	currency: "GTQ";
}

const db = new Dexie('v3') as Dexie & {
	funding_source: EntityTable<
			FundingSource,
			'id'
	>;
	expense: EntityTable<Expense, 'id'>
};

// Schema declaration:
db.version(1).stores({
	funding_source: "++id, amount, description, currency",
	expense: "++id, amount, description, currency",
});

export type {FundingSource, Expense, NewFundingSource};
export {db};