import dayjs from "dayjs";
import type { FundingSource } from "../../infraestructure/database/db";

export const FundingSourceCard = ({ fundingSource, removeFundingSource, onEdit }: {
  fundingSource: FundingSource,
  removeFundingSource: (id: number) => void,
  onEdit: (fs: FundingSource) => void
}) => {
  return (
    <div className="max-w-[540px] w-full bg-white p-4 border-gray-100 border-2 rounded flex flex-col justify-between">
      <div>
        <p className="text-gray-400">{fundingSource.name}</p>
        <small className="text-gray-400">{dayjs(fundingSource.createdAt).format('MMMM D, YYYY')}</small>
      </div>
      <div className="flex justify-between items-center mt-4">
        <div className="flex gap-2">
          <button onClick={() => onEdit(fundingSource)}>Edit</button>
          <button onClick={() => removeFundingSource(fundingSource.id)}>Remove</button>
        </div>
        <p className=" text-gray-800 text-4xl">{fundingSource.amount} {fundingSource.currency}</p>
      </div>
    </div>
  );
}
