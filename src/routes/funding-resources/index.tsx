import {createFileRoute} from '@tanstack/react-router'
import {useState} from "react";
import {Box, Card, Container, Flex, Heading, IconButton, Separator, Table} from "@radix-ui/themes";
import {Pencil1Icon, TrashIcon} from "@radix-ui/react-icons";
import {removeFundingSource, useFundingSource} from "../../services/fouding-sources.service.ts";
import type {FundingSource} from "../../infraestructure/database/db.ts";
import FundingSourcesForm from "../../components/funding-sources/funding-sources.form.tsx";

export const Route = createFileRoute('/funding-resources/')({
	component: RouteComponent,
})

function RouteComponent() {
	const {fundingSources} = useFundingSource()
	const [fsTemp, setFsTemp] = useState<FundingSource | null>(null);

	return (
			<Container>
				<Box className="min-h-full">
					<Box className="my-8">
						<Flex direction="row" justify="between" align="center">
							<Box>
								<Heading>Your funding sources</Heading>
							</Box>
						</Flex>
					</Box>

					<Separator my="3" size="4"/>

					<Flex direction="row" justify="between" gap="3" className="my-8">
						<Card className="w-4/12 h-full">
							<FundingSourcesForm fundingSourceTemp={fsTemp}/>
						</Card>


						<Table.Root variant="surface" className="w-full">
							<Table.Header>
								<Table.Row>
									<Table.ColumnHeaderCell>Currency</Table.ColumnHeaderCell>
									<Table.ColumnHeaderCell>Amount</Table.ColumnHeaderCell>
									<Table.ColumnHeaderCell>Description</Table.ColumnHeaderCell>
									<Table.ColumnHeaderCell justify="end">Ops.</Table.ColumnHeaderCell>
								</Table.Row>
							</Table.Header>

							<Table.Body>
								{fundingSources?.length ? fundingSources.map((fs) => (
										<Table.Row key={fs.id}>
											<Table.RowHeaderCell>{fs.currency}</Table.RowHeaderCell>
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
					</Flex>
				</Box>
			</Container>
	)
}
