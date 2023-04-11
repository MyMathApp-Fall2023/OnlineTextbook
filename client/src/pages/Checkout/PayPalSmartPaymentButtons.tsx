/* eslint-disable @typescript-eslint/ban-ts-comment */

import React, { useEffect, useState, useContext } from "react";
import { v4 as uuidv4 } from "uuid";
import { formatter } from "../../utils";
import { ApplicationContext } from "../../context";

type PayPalSmartPaymentButtonsProps = {
	total: string;
};

const PayPalSmartPaymentButtons: React.FC<PayPalSmartPaymentButtonsProps> = (
	props
): JSX.Element => {
	return (
	<div>
		<p>$0.01</p>
		<form action="https://www.paypal.com/cgi-bin/webscr" method="post" target="_top">
			<input type="hidden" name="cmd" value="_s-xclick" />
			<input type="hidden" name="encrypted" value="-----BEGIN PKCS7-----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-----END PKCS7-----" />
			<input type="image" src="https://www.paypalobjects.com/en_US/i/btn/btn_buynowCC_LG.gif" data-border="0" name="submit" alt="PayPal - The safer, easier way to pay online!" />
			<img alt="" data-border="0" src="https://www.paypalobjects.com/en_US/i/scr/pixel.gif" width="1" height="1" />
		</form>
		{/* <p>$20</p> */}
		{/* <form action="https://www.paypal.com/cgi-bin/webscr" method="post" target="_top">
			<input type="hidden" name="cmd" value="_s-xclick" />
			<input type="hidden" name="encrypted" value="-----BEGIN PKCS7-----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-----END PKCS7-----" />
			<input type="image" src="https://www.paypalobjects.com/en_US/i/btn/btn_buynowCC_LG.gif" data-border="0" name="submit" alt="PayPal - The safer, easier way to pay online!" / >
			<img alt="" data-border="0" src="https://www.paypalobjects.com/en_US/i/scr/pixel.gif" width="1" height="1" />
		</form> */}
	</div>
	);

// 	const ctx = useContext(ApplicationContext);
// 	const [rendered, setRendered] = useState<boolean>(false);

	// useEffect(() => {
	// 	if (!rendered) {
	// 		// paypal attribute gets loaded in public/index.html
	// 		// @ts-ignore
	// 		window.paypal
	// 			.Buttons({
	// 				// @ts-ignore
	// 				createOrder: (data, actions) => {
	// 					const parts = ctx.user!.name.split(" ");
	// 					const givenName = parts[0];
	// 					const surname = parts.length > 1 ? parts.slice(1) : "";
	// 					const invoiceId = uuidv4();
	// 					const formattedTotal = props.total.replace("$", "").replace(",", "");

	// 					return actions.order.create({
	// 						payer: {
	// 							given_name: givenName,
	// 							surname: surname,
	// 							email_address: ctx.user!.email
	// 						},
	// 						purchase_units: [
	// 							{
	// 								description: "MYMathApps Store transaction",
	// 								amount: {
	// 									currency_code: "USD",
	// 									value: formattedTotal,
	// 									breakdown: {
	// 										item_total: {
	// 											currency_code: "USD",
	// 											value: formattedTotal
	// 										}
	// 									}
	// 								},
	// 								invoice_id: invoiceId,
	// 								items: ctx.cart.map((value) => {
	// 									return {
	// 										name: value.product!.title,
	// 										description: `${value.length} day subscription`,
	// 										quantity: "1",
	// 										unit_amount: {
	// 											currency_code: "USD",
	// 											value: formatter
	// 												.format(value.cost / 100)
	// 												.replace("$", "")
	// 												.replace(",", "")
	// 										},
	// 										category: "DIGITAL_GOODS"
	// 									};
	// 								})
	// 							}
	// 						]
	// 					});
	// 				},
	// 				// @ts-ignore
	// 				onApprove: (data, actions) => {
	// 					// @ts-ignore
	// 					return actions.order.capture().then((details) => {
	// 						ctx.setCart!([]);
	// 					});
	// 				}
	// 			})
	// 			.render("#paypal-smart-payment-buttons-container");
	// 		setRendered(true);
	// 	}
	// }, [ctx.cart, ctx.setCart, ctx.user, props.total, rendered]);

	// return <div id="paypal-smart-payment-buttons-container"></div>;
};

export default PayPalSmartPaymentButtons;
