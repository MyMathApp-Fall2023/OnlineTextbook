/* eslint-disable @typescript-eslint/ban-ts-comment */

import React, {useContext,useRef, useEffect, useLayoutEffect, useState, useCallback, useReducer,Reducer} from "react";
import ReactDOM from "react-dom"
import { Table, Container, Header, Button,Input, Icon, Item, Message , Form, ModalActions} from "semantic-ui-react";
import { ApplicationContext } from "../../context";
import {getCurrentItem, checkPurchaseCode, addRecord, addTransaction} from "../../api/checkout"

// @ts-ignore
const PayPalButton = paypal.Buttons.driver("react", { React, ReactDOM });
// import PayPalButtons from "./PayPalButtons"

import {
	BrowserRouter as Router,
	Switch,
	Route,
	useLocation,
	useParams
  } from "react-router-dom"
import {capturePaypalOrder, createPaypalOrder, finishPurchasing} from "../../api/payment";

interface Item {
    readonly item_id: number;
    name: string;
	length: number;
	price: number;
}

interface RouteParams {
	id: string
}

interface localUser {
    role: number;
	id: number;
}

const Checkout: React.FC = (props): JSX.Element => {
	const ctx = useContext(ApplicationContext);

	//Then inside your component
	// const queryParams = new URLSearchParams(window.location.search)
	// //const item_id = queryParams.get("id");
	const { id } = useParams<{ id: string }>();


	const item_id = id;
    const [ItemData, setItemData] = useState<Item[]>([]);
	//for purchase code
	const [currentCode, setcurrentCode] = useState('');
	const [totalPrice, settotalPrice] = useState(-1);
	const [currentCodeId, setCurrentCodeId] = useState(-1);
	const [purchaseFinished,setPurchaseFinished] = useState(false)

	const user: localUser = JSON.parse(localStorage.getItem('user') || 'null');

    useEffect(() => {
		// console.log("get id from url", id);

		getCurrentItem(item_id)
		.then(res => {
			setItemData([res.data]);
			settotalPrice(res.data.price);

		})
		.catch(error => console.error(error));

    }, []);

	const cart = [{
		sku: item_id,
		user_id: user.id,
		amount: totalPrice,
		purchaseCode: currentCodeId
	}];

	// Sets up the transaction when a payment button is clicked
	const createOrder = function (data: any, cart: any) {
		// console.log('createOrder data', data, 'cart', cart);
		return fetch("/api/payment/create-paypal-order", {
			method: "post",
			headers: {
				"Content-Type": "application/json",
			},
			// use the "body" param to optionally pass additional order information
			// like product skus and quantities
			body: JSON.stringify({
				cart: cart,
			}),
		})
			.then((response) => response.json())
			.then((order) => order.id);
	};

	// Finalize the transaction after payer approval
	const onApprove = function (data: any) {
		return fetch("/api/payment/capture-paypal-order", {
			method: "post",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				orderID: data.orderID,
				cart: [{
					sku: item_id,
					user_id: user.id,
					amount: totalPrice,
					purchaseCode: currentCodeId
				}
				],
			}),
		})
			.then((response) => response.json())
			// .then((orderData) => {
			// 	// Successful capture! For dev/demo purposes:
			// 	// console.log(
			// 	// 	"Capture result",
			// 	// 	orderData,
			// 	// 	JSON.stringify(orderData, null, 2)
			// 	// );
			// 	const transaction = orderData.purchase_units[0].payments.captures[0];
			// 	alert(
			// 		"Transaction " +
			// 		transaction.status +
			// 		": " +
			// 		transaction.id +
			// 		"\n\nSee console for all available details"
			// 	);
			// 	// When ready to go live, remove the alert and show a success message within this page. For example:
			// 	// var element = document.getElementById('paypal-button-container');
			// 	// element.innerHTML = '<h3>Thank you for your payment!</h3>';
			// 	// Or go to another URL:  actions.redirect('thank_you.html');
			// })
			.then(() => {
				setPurchaseFinished(true);
			});
	};



	const updateCode = (event: React.FormEvent<HTMLInputElement>) =>{
		setcurrentCode((event.target as HTMLInputElement).value)
	}
	const handleApply = () => {
		formStateDispatch({ type: "LOADING" });
		// console.log("current input");
		// console.log(currentCode);
		checkPurchaseCode(currentCode).then(
			async (res) => {
				// console.log(res);
				const discounted = (1 - res.data.priceOff.priceOff * 0.01) * ItemData[0].price;
				settotalPrice(discounted);
				setCurrentCodeId(res.data.priceOff.code_id);
				formStateDispatch({ type: "SUCCESS" });
				})
		.catch((err)=>{
			formStateDispatch({
				type: "REQUEST_ERROR",
				payload:"Unable to apply. The account has already been created."
			})
		})
	};

	//form
	const formStateReducer = (state: FormActionState, action: FormAction): FormActionState => {
		switch (action.type) {
			case "LOADING":
				return {
					loading: (action.payload as boolean) ?? true,
					success: false,
					requestError: undefined
				};
			case "SUCCESS":
				return {
					loading: false,
					success: (action.payload as boolean) ?? true,
					requestError: undefined
				};
			case "REQUEST_ERROR":
				return {
					loading: false,
					success: false,
					requestError: (action.payload as string)
				}
			default:
				throw new Error(`Unknown action: ${action.type}`);
		}
	};

	type FormAction = {
		type: "LOADING" | "SUCCESS" | "REQUEST_ERROR";
		payload?: boolean | string;
	};

	type FormActionState = {
		loading: boolean;
		requestError?: string;
		success: boolean;
		error?:string;
	};
	const [formState, formStateDispatch] = useReducer<Reducer<FormActionState, FormAction>>(
		formStateReducer,
		{ loading: false, success: false }
	);

	//const ItemData1 = [{item_id: 1, name: 'Calculus 1(5 months)', length: 0, price: 20}]

	// console.log('ctx.user', ctx.user, 'totalprice', totalPrice);

	const completePurchasing=(item_id:string, code_id:number) =>{
		finishPurchasing({
			item_id: item_id,
			code_id: code_id,
			price: 0
		}).then(r  => {
			setPurchaseFinished(true)
		})
	};
	if (purchaseFinished) {
		return (
			<Container>
				<Message icon='smile outline' size='huge' success header='Congratulations' content='You have successfully purchased the book. Click the "Read Book" at the top to start reading.'>
				</Message>
			</Container>
		)
	} else {
		return (
			<Container id="123">
				<Table>
					<Table.Header>
						<Table.Row>
							<Table.HeaderCell width={4}>Product</Table.HeaderCell>
							<Table.HeaderCell collapsing width={2}>Length (months)</Table.HeaderCell>
							<Table.HeaderCell collapsing width={2}>Original Price (USD)</Table.HeaderCell>
							<Table.HeaderCell collapsing width={2}>Purchase Code</Table.HeaderCell>
							<Table.HeaderCell collapsing width={2}></Table.HeaderCell>
						</Table.Row>
					</Table.Header>
					<Table.Body>
						{ItemData.map(item => (
							<Table.Row key={item.item_id}>
								<Table.Cell>{item.name}</Table.Cell>
								<Table.Cell>{item.length}</Table.Cell>
								<Table.Cell>{item.price}</Table.Cell>
								<Table.Cell>
									<Input type="text" name = "purchasecode" id = "purchasecode" onChange={updateCode} value = {currentCode}></Input>
								</Table.Cell>
								<Table.Cell>
									<button className="positive ui button" onClick={handleApply} >Apply</button>
								</Table.Cell>
							</Table.Row>
						))}
					</Table.Body>
					<Table.Footer>
						<Table.Row>
							<Table.HeaderCell colSpan={2}>
								<b>Total</b>
							</Table.HeaderCell>
							<Table.HeaderCell colSpan={2} collapsing>
								<b>{totalPrice}</b>
							</Table.HeaderCell>
							<Table.HeaderCell>

							</Table.HeaderCell>

						</Table.Row>
					</Table.Footer>
				</Table>

				<Form
					error={formState.requestError !== undefined}
					loading={formState.loading}
					success={formState.success}
				>

					<Message
						content="You have successfully applied current purchase code"
						header="SUCCESS"
						success
					/>

					<Message
						content="Current purchase code is invalid"
						header="ERROR"
						error
					/>

				</Form>

				{ctx.user === undefined ? (
					<Header as="h3">You must be signed in to complete your purchase.</Header>
				) : null }

				{ctx.user != undefined && totalPrice != 0 ? (
					<div>
						<script defer src="https://www.paypal.com/sdk/js?client-id=AWuJ4TbTs8TF4PCyNsC3nZo-gJNpUTvebNbns0AvJWuAirsC3BRoTs4lW4_okNlpb0OQNtSZmada8Qtm&currency=USD"></script>
						{/* <div id="paypal-button-container"></div> */}
						<PayPalButton
							createOrder={(data: any) => createOrder(data, cart)}
							onApprove={(data:any) => onApprove(data)}
						/>
					</div>
				) : null}

				{ctx.user != undefined && totalPrice == 0 ? (
					<div style={{textAlign: 'left'}}>
						<button className="positive ui button"
								onClick={() => completePurchasing(item_id, currentCodeId)}
						>Complete</button>
					</div>
				) : null}

			</Container>
		);
	}

};

export default Checkout;
