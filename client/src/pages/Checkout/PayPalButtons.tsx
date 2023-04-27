/* eslint-disable @typescript-eslint/ban-ts-comment */

import React, { useEffect, useState, useContext } from "react";
import { v4 as uuidv4 } from "uuid";
import { formatter } from "../../utils";
import { ApplicationContext } from "../../context";
import {Helmet} from "react-helmet";


type PayPalButtonsProps = {
	purchaseCode: string;
	sku: string;
	amount: number;
};

const PayPalButtons: React.FC<PayPalButtonsProps> = (
	props
): JSX.Element => {
	
	useEffect(() => {

        let purchaseCode = props.purchaseCode;
        if (props.purchaseCode == '') {
            purchaseCode = 'None';
        }

        console.log('purchasecode', purchaseCode, 'sku', props.sku, 'amount', props.amount, typeof(props.amount));

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
                            sku: props.sku,
                            purchaseCode: purchaseCode,
                            amount: props.amount
                        },
                    ],
                }),
                })
                .then((response) => response.json())
                .then((order) => order.id);
            },
            // Finalize the transaction after payer approval
            // @ts-ignore
            onApprove: function (data) {
                return fetch("/api/payment/capture-paypal-order", {
                method: "post",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    orderID: data.orderID,
                    cart: [
                        {
                            sku: props.sku,
                            purchaseCode: purchaseCode,
                            amount: props.amount,
                            
                        },
                    ],
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
                    // var element = document.getElementById('paypal-button-container');
                    // element.innerHTML = '<h3>Thank you for your payment!</h3>';
                    // Or go to another URL:  actions.redirect('thank_you.html');
                });
            },
        }).render("#paypal-button-container");
    
	}, []);

	return (
		<>
			<script defer src="https://www.paypal.com/sdk/js?client-id=AWuJ4TbTs8TF4PCyNsC3nZo-gJNpUTvebNbns0AvJWuAirsC3BRoTs4lW4_okNlpb0OQNtSZmada8Qtm&currency=USD"></script>
            <div id="paypal-button-container"></div>
		</>
	);
};

export default PayPalButtons;