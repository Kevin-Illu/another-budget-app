import {createFileRoute} from '@tanstack/react-router'
import {useState} from "react";
import {Box, Card, Container, Flex, Heading, Separator} from "@radix-ui/themes";
import {removeFundingSource, useFundingSource} from "../../services/fouding-sources.service.ts";
import type {FundingSource} from "../../infraestructure/database/db.ts";
import FundingSourcesForm from "../../components/funding-sources/funding-sources.form.tsx";
import FundingSourcesTable from "../../components/funding-sources/funding-sources.table.tsx";
import ExpensesForm from "../../components/expenses/expenses.form.tsx";

export const Route = createFileRoute('/funding-sources/')({
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

						<FundingSourcesTable
								fundingSources={fundingSources}
								removeFundingSource={removeFundingSource}
								setFsTemp={setFsTemp}/>
					</Flex>

					<Flex>
						<Card className="w-4/12 h-full">
							<ExpensesForm expense={null}/>
						</Card>
					</Flex>
				</Box>
			</Container>
	)
}
