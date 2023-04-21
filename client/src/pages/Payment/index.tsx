import React, { useContext } from "react";
import { Table, Container, Header, Button,Input, Icon, ModalActions } from "semantic-ui-react";
import { formatter } from "../../utils";
import { ApplicationContext } from "../../context";


const Payment: React.FC = (props): JSX.Element => {
	const ctx = useContext(ApplicationContext);

    // const queryParams = new URLSearchParams(window.location.search)
	// const purchaseCode = queryParams.get("purchaseCode");
	// const sku = queryParams.get("sku");
	// const amount = queryParams.get("amount");

    const purchaseCode = '123';
	const sku = '123';
	const amount = 50;


	// const total = formatter.format(
	// 	ctx.cart.map((value) => value.cost).reduce((accum, value) => accum + value, 0) / 100
	// );

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
	paypal.Buttons({
		// style: {
		// 	layout: "horizontal"
		// },
		// Sets up the transaction when a payment button is clicked
		createOrder: function () {
			return fetch("/api/payment/create-paypal-order", {
			method: "post",
			headers: {
				"Content-Type": "application/json",
			},
			// use the "body" param to optionally pass additional order information
			// like product skus and quantities
			body: JSON.stringify({
				cart: [
					{
						sku: sku,
						purchaseCode: purchaseCode,
						amount: amount,
					},
				],
			}),
			})
			.then((response) => response.json())
			.then((order) => order.id);
		},
		// Finalize the transaction after payer approval

        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        onApprove: function (data) {
			return fetch("/api/payment/capture-paypal-order", {
			method: "post",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				orderID: data.orderID,
			}),
			})
			.then((response) => response.json())
			.then((orderData) => {
				// Successful capture! For dev/demo purposes:
				console.log(
				"Capture result",
				orderData,
				JSON.stringify(orderData, null, 2)
				);
				const transaction = orderData.purchase_units[0].payments.captures[0];
				alert(
				"Transaction " +
					transaction.status +
					": " +
					transaction.id +
					"\n\nSee console for all available details"
				);
				// When ready to go live, remove the alert and show a success message within this page. For example:
				// const element = document.getElementById('paypal-button-container');
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-ignore
				// element.innerHTML = '<h3>Thank you for your payment!</h3>';
				// Or go to another URL:  actions.redirect('thank_you.html');
			});
		},
	}).render("#paypal-button-container");
	// });
	

	return (
		<>
			<script src="https://www.paypal.com/sdk/js?client-id=AWuJ4TbTs8TF4PCyNsC3nZo-gJNpUTvebNbns0AvJWuAirsC3BRoTs4lW4_okNlpb0OQNtSZmada8Qtm&currency=USD"></script>
            <div id="paypal-button-container"></div>
		</>
	);
};

export default Payment;