import React, {useEffect, useState} from "react";
import { Segment, Loader } from "semantic-ui-react";
import {useHistory, useLocation} from "react-router-dom";
import useSWR from "swr";
import Page from "../../components/Page";
import {activateUser} from "../../api/auth";


interface UserData {
	user_id: number;
	email: string;
	name: string;
}

interface localUser {
	role: number;
}

const AccountActivation: React.FC = (): JSX.Element | null => {
	const location = useLocation();
	const params = new URLSearchParams(location.search);
	const activationCode = params.get("activationCode");
	const [activationResult, setActivationResult] = useState<string | null>(null);

	const history = useHistory()
	const user: localUser | null = JSON.parse(localStorage.getItem('user') || 'null');

	if (user) {
		// Redirect to main page
		history.push('/');
		return null;
	}

	useEffect(()=> {
		setActivationResult("loading");
		activateUser({
			activationCode
		}).then((res)=>{
			setActivationResult("success");
		}).catch((res)=> {
			setActivationResult("error")
		})

	},[activationCode])

	if (activationCode === null) {
		return (
			<Page>
				<Segment>
					Check the email associated with your account for an email with instructions for activating
					your account.
				</Segment>
			</Page>
		);
	}

	if (activationResult === "error") {
		return (
			<Page>
				<Segment>
					This activation code is not associated with any account. Please sign up.
				</Segment>
			</Page>
		);
	}

	if (activationResult === "success") {
		return (
			<Page>
				<Segment>
					Your account has been activated. Please login with the email and password of your account.
				</Segment>
			</Page>
		);
	}
	else {
		return (
			<Page>
				<Segment>
					Activating your account <Loader active inline />
				</Segment>
			</Page>
		)
	}

};

export default AccountActivation;
