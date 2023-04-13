import React, { useContext } from "react";
import { Table, Container, Header, Button,Input, Icon } from "semantic-ui-react";
import { formatter } from "../../utils";
import { ApplicationContext } from "../../context";
import PayPalButtons from "./PayPalButtons";
import { title } from "process";

const Checkout: React.FC = (): JSX.Element => {
	const ctx = useContext(ApplicationContext);

	const total = formatter.format(
		ctx.cart.map((value) => value.cost).reduce((accum, value) => accum + value, 0) / 100
	);

	return (
		<Container>
			<Table>
				<Table.Header>
					<Table.Row>
						<Table.HeaderCell width={2}>Product</Table.HeaderCell>
						<Table.HeaderCell width={2}>Publisher</Table.HeaderCell>
						<Table.HeaderCell collapsing width={2}>Length (days)</Table.HeaderCell>
						<Table.HeaderCell collapsing width={2}>Original Price (USD)</Table.HeaderCell>
						<Table.HeaderCell collapsing width={2}>Purchase Code</Table.HeaderCell>
						<Table.HeaderCell collapsing width={2}></Table.HeaderCell>
					</Table.Row>
				</Table.Header>
				<Table.Body>
					<Table.Row >
						<Table.Cell>Calculus 1</Table.Cell>
						<Table.Cell>name</Table.Cell>
						<Table.Cell>5 months</Table.Cell>
						<Table.Cell>20</Table.Cell>
						<Table.Cell>
							<Input type="text" placeholder=""></Input>
						</Table.Cell>
						<Table.Cell>
						<button className="positive ui button">Apply</button>
						</Table.Cell>
					</Table.Row>
				</Table.Body>
				<Table.Footer>
					<Table.Row>
						<Table.HeaderCell colSpan={3}>
							<b>Total</b>
						</Table.HeaderCell>
						<Table.HeaderCell colSpan={2} collapsing>
							<b>{total}</b>
						</Table.HeaderCell>
						<Table.HeaderCell>
						{/* <button className="positive ui button"> */}
						{/* <i className="credit card icon"></i> */}
						{/* Pay */}
						{/* </button> */}
						</Table.HeaderCell>
						
					</Table.Row>
				</Table.Footer>
			</Table>
			{ctx.user === undefined ? (
				<Header as="h3">You must be signed in to complete your purchase.</Header>
			) : (
				<PayPalButtons purchaseCode={0} sku={'Calculus1'} amount={total} />
			)}
		</Container>
	);
};

export default Checkout;
