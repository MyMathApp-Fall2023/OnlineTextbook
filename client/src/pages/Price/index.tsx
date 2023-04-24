import React, { useContext } from "react";
import useSWR from "swr";
import { Loader, Container, Divider, Header, Icon, Card } from "semantic-ui-react";
import { ApplicationContext } from "../../context";
import { ProductsResponse } from "../../responses";
import TextbookHeader from "../../components/TextbookHeader";
const Prices: React.FC = (): JSX.Element => {
	const ctx = useContext(ApplicationContext);


	// if (!data) {
	// 	return <Loader active inline="centered" />;
	// }

	return (
		<>
		<TextbookHeader></TextbookHeader>
		</>
	);
};

export default Prices;
