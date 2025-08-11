import type { FundingSource } from "../../infraestructure/database/db.ts";
import './funding-source.styles.css';
import { FundingSourceCard } from "./funding-source.card.tsx";

export default function FundingSourcesGrid(props: {
	fundingSources: FundingSource[] | undefined,
	removeFundingSource: (id: number) => void,
	onEdit: (fs: FundingSource) => void,
	selectFundingSource: (fs: FundingSource) => void,
}) {
	const { fundingSources, ...propsComponent } = props;
	return (
		<div className="flex justify-start gap-4 flex-wrap">
			{props.fundingSources?.length ? props.fundingSources?.map((fs) => (
				<FundingSourceCard key={fs.id} fundingSource={fs} {...propsComponent} />
			)) : <p className="text-gray-500">No funding sources found</p>}
		</div>
	)
}