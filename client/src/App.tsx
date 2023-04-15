import React, { useState, useEffect } from "react";
import { useCookies } from "react-cookie";
import { SWRConfig } from "swr";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import "./App.css";
import { ApplicationContext } from "./context/application.context";
import Header from "./components/Header";
import About from "./pages/About";
import Contact from "./pages/Contact";
import MYMACalc1 from "./pages/MYMACalc1";
import MYMACalc3 from "./pages/MYMACalc3";
import MYMACalc2 from "./pages/MYMACalc2";
import FinancePreview from "./pages/FinancePreview";
import Checkout from "./pages/Checkout";
import Products from "./pages/Products";
import User from "./entities/user";
import Subscription from "./entities/subscription";
import Home from "./pages/Home";
import AccountActivation from "./pages/AccountActivation";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import RequestPasswordReset from "./pages/RequestPasswordReset";
import ResetPassword from "./pages/ResetPassword";
import ReadBook from "./pages/Book/index"

import AdminUserInfo from "./pages/Admin/UserInfo"
import AdminPurchaseCode from "./pages/Admin/PurchaseCode"
import Records from "./pages/Records";




const App: React.FC = (): JSX.Element => {
	// eslint-disable-next-line
	const [user, setUser] = useState<User | undefined>();
	const [cart, setCart] = useState<Subscription[]>([]);

	useEffect(() => {
		const storedUser = localStorage.getItem('user');
		const storedToken = localStorage.getItem('token');

		if (storedUser && storedToken) {
			setUser(JSON.parse(storedUser));
		}
	}, []);

	return (
		<BrowserRouter>
			<SWRConfig
				value={{
					refreshWhenHidden: false,
					refreshWhenOffline: false,
					revalidateOnFocus: false,
					revalidateOnReconnect: false
				}}
			>
				<ApplicationContext.Provider value={{ user, setUser, cart, setCart }}>
					<div className="App" style={{ display: "flex", flexDirection: "column" }}>
						<Header />
						<br></br>
						<main style={{ flexGrow: 1 }}>
							<Switch>
								<Route exact path="/">
									<Home />
								</Route>
								<Route exact path="/login">
									<Login />
								</Route>
								<Route exact path="/sign-up">
									<SignUp />
								</Route>
								<Route exact path="/about">
									<About />
								</Route>
								<Route exact path="/products">
									<Products />
								</Route>
								<Route exact path="/products/MYMACalc1">
									<MYMACalc1 />
								</Route>
								<Route exact path="/products/MYMACalc2">
									<MYMACalc2 />
								</Route>
								<Route exact path="/products/MYMACalc3">
									<MYMACalc3 />
								</Route>
								<Route exact path="/products/finance-with-maple">
									<FinancePreview />
								</Route>
								<Route exact path="/checkout">
									<Checkout />
								</Route>
								<Route exact path="/contact">
									<Contact />
								</Route>
								<Route exact path="/activate">
									<AccountActivation />
								</Route>
								<Route exact path="/reset-password">
									<ResetPassword />
								</Route>
								<Route exact path="/request-password-reset">
									<RequestPasswordReset />
								</Route>
								<Route exact path="/admin/user">
									<AdminUserInfo />
								</Route>
								<Route exact path="/admin/purchase-code">
									<AdminPurchaseCode />
								</Route>
								<Route exact path="/read">
									<ReadBook />
								</Route>
								<Route exact path="/records">
									<Records />
								</Route>
							</Switch>
						</main>
					</div>
				</ApplicationContext.Provider>
			</SWRConfig>
		</BrowserRouter>
	);
};

export default App;
