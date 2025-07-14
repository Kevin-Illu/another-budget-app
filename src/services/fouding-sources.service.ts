import {db, type FundingSource, type NewFundingSource} from "../infraestructure/database/db.ts";
import {useLiveQuery} from "dexie-react-hooks";

async function addFundingSource(source: NewFundingSource) {
	return db.funding_source.add(source)
}

async function removeFundingSource(sourceId: number) {
	return db.funding_source.delete(sourceId)
}

async function updateFundingSource(sourceId: number, source: Partial<FundingSource>) {
	return db.funding_source.update(sourceId, source)
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
}