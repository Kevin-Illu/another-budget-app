import {Box, Flex, IconButton, Table} from "@radix-ui/themes";
import type {FundingSource} from "../../infraestructure/database/db.ts";
import {Pencil1Icon, TrashIcon} from "@radix-ui/react-icons";

export default function FundingSourcesTable({fundingSources, removeFundingSource, setFsTemp}: {
	fundingSources: FundingSource[] | undefined,
	removeFundingSource: (id: number) => void,
	setFsTemp: (fs: FundingSource) => void
}) {
	return (
			<Table.Root variant="surface" className="w-full">
				<Table.Header>
					<Table.Row>
						<Table.ColumnHeaderCell>Name</Table.ColumnHeaderCell>
						<Table.ColumnHeaderCell>Currency</Table.ColumnHeaderCell>
						<Table.ColumnHeaderCell>Amount</Table.ColumnHeaderCell>
						<Table.ColumnHeaderCell>Description</Table.ColumnHeaderCell>
						<Table.ColumnHeaderCell justify="end">Ops.</Table.ColumnHeaderCell>
					</Table.Row>
				</Table.Header>

				<Table.Body>
					{fundingSources?.length ? fundingSources.map((fs) => (
							<Table.Row key={fs.id}>
								<Table.RowHeaderCell>{fs.name}</Table.RowHeaderCell>
								<Table.Cell>{fs.currency}</Table.Cell>
								<Table.Cell>{fs.amount}</Table.Cell>
								<Table.Cell>{fs.description}</Table.Cell>
								<Table.Cell justify="end">
									<Flex gap="2" direction="row-reverse">
										<IconButton color="red" variant="soft" onClick={() => removeFundingSource(fs.id)}>
											<TrashIcon/>
										</IconButton>
										<IconButton color="indigo" variant="soft" onClick={() => setFsTemp(fs)}>
											<Pencil1Icon/>
										</IconButton>
									</Flex>
								</Table.Cell>
							</Table.Row>
					)) : (
							<Table.Row>
								<Table.Cell><Box>There are no sources yet</Box></Table.Cell>
							</Table.Row>
					)}
				</Table.Body>
			</Table.Root>
	)
}