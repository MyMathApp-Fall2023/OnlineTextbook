import React, { useCallback, useState, useContext, useReducer, Reducer } from "react";
import { Form, Button, FormProps, Message, Loader, Segment, Icon, Header } from "semantic-ui-react";
import CryptoJS from "crypto-js";
import {useHistory, useLocation} from "react-router-dom";
import { ApplicationContext } from "../../context";
import { User } from "../../entities";
import {localLoginApi} from "../../api/auth";

type LocationState = {
	prevPath?:string
};

type FormValues = {
	email: string;
	password: string;
};

type FormAction = {
	type: "ERROR" | "LOADING";
	payload?: boolean | string;
};

type FormActionState = {
	error?: string;
	loading: boolean;
};

const formReducer = (state: FormActionState, action: FormAction): FormActionState => {
	switch (action.type) {
		case "ERROR":
			return { ...state, error: action.payload as string, loading: false };
		case "LOADING":
			return { ...state, error: undefined, loading: (action.payload as boolean) ?? true };
		default:
			throw new Error(`Unknown action: ${action.type}`);
	}
};

const LocalLoginForm: React.FC = (): JSX.Element => {
	const [formState, formStateDispatch] = useReducer<Reducer<FormActionState, FormAction>>(
		formReducer,
		{
			loading: false
		}
	);
	const [formValues, setFormValues] = useState<FormValues>({ email: "", password: "" });
	const ctx = useContext(ApplicationContext);
	const history = useHistory();
	const location = useLocation<LocationState>();

	const onSubmit = useCallback(
		(data: FormProps) => {
			formStateDispatch({ type: "LOADING" });
			localLoginApi({
				email:formValues.email,
				password: formValues.password
			}).then(async (res) => {
				const user = res.data.user
				const token = res.data.access_token
				localStorage.setItem('user', JSON.stringify(user));
				localStorage.setItem('token', token);
				ctx.setUser!(user);
				history.replace(location.state?.prevPath || '/');

				})
				.catch((err) => {
						if(err.response.status == 403) {
							formStateDispatch({
								type: "ERROR",
								payload:
									"Account is not activated. Please check your email to confirm your account."
							})
						}
						if (err.response.status == 401) {
							formStateDispatch({
								type: "ERROR",
								payload:
									"Incorrect email or password. Please ensure your email and password are correct and try again."
							})
						}

				});
		},
		[formStateDispatch, ctx.setUser, formValues, history]
	);

	return (
		<Form
			error={formState.error !== undefined}
			loading={formState.loading}
			onSubmit={(event, data) => onSubmit(data)}
		>

			<Form.Input
				id="email"
				label="Email"
				onChange={(event, data) => setFormValues({ ...formValues, email: data.value })}
				required
				type="email"
			/>
			<Form.Input
				id="password"
				label="Password"
				onChange={(event, data) => setFormValues({ ...formValues, password: data.value })}
				required
				type="password"
			/>
			<Message content={formState.error} error />
			<Button color="green" fluid type="submit">
				{formState.loading ? <Loader active inline="centered" /> : "Login"}
			</Button>
		</Form>
	);
};

export default LocalLoginForm;
