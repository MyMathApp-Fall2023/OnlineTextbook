import React, { useContext } from "react";
import { Menu, Dropdown, Icon} from "semantic-ui-react";
import { Link } from "react-router-dom";
import { ApplicationContext } from "../context";
import Cart from "./Header/Cart";
import Profile from "./Header/Profile";
import LoginSignUp from "./Header/LoginSignUp";

const AdminMenu: React.FC = (): JSX.Element => {
	const ctx = useContext(ApplicationContext);

	return (
	<div
	style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}

	>
		<Menu pointing vertical>
			<Menu.Item as={Link} header to="/admin/user" name="Users"/>
			<Menu.Item as={Link} header to="/admin/transaction" name="Transactions"/>
			<Menu.Item as={Link} header to="/admin/products" name="Products"/>
			<Menu.Item as={Link} header to="/admin/purchase-code" name="Purchase Codes"/>
			<Menu.Item as={Link} header to="/admin/free-subscription" name="Free Subscriptions"/>
			<Menu.Item as={Link} header to="/admin/paid-subscription" name="All Paid Subscriptions"/>
		</Menu>
	</div>
	);
};

export default AdminMenu;
