import { db, type FundingSource, type NewFundingSource } from "../infraestructure/database/db.ts";
import { useLiveQuery } from "dexie-react-hooks";

async function addFundingSource(source: NewFundingSource) {
	return db.funding_source.add(source)
}

async function removeFundingSource(sourceId: number) {
	return db.funding_source.delete(sourceId)
}

async function updateFundingSource(sourceId: number, source: Partial<FundingSource>) {
	return db.funding_source.update(sourceId, {
		...source,
		updatedAt: new Date().toISOString()
	})
}

async function updateActiveStatus(sourceId: number, isActive: boolean) {
	return db.funding_source.update(sourceId, { isActive, updatedAt: new Date().toISOString() });
}

function useFundingSource() {
	const fundingSources = useLiveQuery(() => db.funding_source.toArray());
	return {
		fundingSources
	}
}

export {
	addFundingSource,
	removeFundingSource,
	updateFundingSource,
	useFundingSource,
	updateActiveStatus
}