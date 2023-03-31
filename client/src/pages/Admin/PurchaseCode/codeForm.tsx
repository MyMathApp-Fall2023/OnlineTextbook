import React, { useState, useCallback, useReducer, Reducer } from "react";
import {Form, FormProps, Button, Message, Loader, Container} from "semantic-ui-react";
import CryptoJS from "crypto-js";
import { addCodeApi } from "../../../api/admin";
type FormValues = {
	name: string;
	priceOff: string;
};

type FormAction = {
	type: "LOADING" | "SUCCESS" | "ALREADY_EXIST_ERROR" | "REQUEST_ERROR";
	payload?: boolean | string;
};

type FormActionState = {
	loading: boolean;
	alreadyExistError?: string;
	requestError?: string;
	success: boolean;
};

const formStateReducer = (state: FormActionState, action: FormAction): FormActionState => {
	switch (action.type) {
		case "ALREADY_EXIST_ERROR":
			return { ...state, alreadyExistError: action.payload as string, loading: false };
		case "LOADING":
			return {
				loading: (action.payload as boolean) ?? true,
				success: false,
				alreadyExistError: undefined,
				requestError: undefined
			};
		case "SUCCESS":
			return {
				loading: false,
				success: (action.payload as boolean) ?? true,
				alreadyExistError: undefined,
				requestError: undefined
			};
		default:
			throw new Error(`Unknown action: ${action.type}`);
	}
};

const CodeForm: React.FC = (props): JSX.Element => {
	const [formValues, setFormValues] = useState<FormValues>({
		name: "",
		priceOff: ""
	});
	const [formState, formStateDispatch] = useReducer<Reducer<FormActionState, FormAction>>(
		formStateReducer,
		{ loading: false, success: false, alreadyExistError: undefined }
	);

	const onSubmit = useCallback(
		(data: FormProps) => {
            formStateDispatch({ type: "LOADING" });
			addCodeApi ({
				name:formValues.name,
				priceOff: Number(formValues.priceOff)
			}).then(async (res) => {
				const purchaseCode = res.data.purchaseCode
				localStorage.setItem('purchaseCode', JSON.stringify(purchaseCode));
                formStateDispatch({type: "SUCCESS"})
				})
                .catch((err) =>
					formStateDispatch({
						type: "ALREADY_EXIST_ERROR",
						payload:
							"This code is used for another purchase code. Please use a new code."
					})
				);
                
		},
		[formStateDispatch, formValues]
	);

	return (
		<Container>
			<Form
				error={formState.alreadyExistError !== undefined}
				loading={formState.loading}
				onSubmit={(event, data) => onSubmit(data)}
				success={formState.success}
			>
				<Form.Input
					id="name"
					label="Name"
					onChange={(event, data) => setFormValues({ ...formValues, name: data.value })}
					required
				/>
				<Form.Input
                    type="number"
					id="priceOff"
					label="Percent Off"
					onChange={(event, data) => setFormValues({ ...formValues, priceOff: data.value })}
					required
				/>
				<Message
					content="The purchase code has already added to the database."
					header="SUCCESS"
					success
				/>
				<Message content={formState.alreadyExistError} error header="Error" />
				<Button
					active={
						!formState.success && !formState.alreadyExistError 
					}
					color="green"
					fluid
					type="submit"
				>
					{formState.loading ? <Loader active inline="centered" /> : "Add Code"}
				</Button>
			</Form>
		</Container>

	);
};

export default CodeForm;
