import React, { useContext, useEffect, useState, useCallback } from "react";
import { Header, Divider, Form, Table, Label, Menu, Icon, Grid,GridColumn,Container,Pagination} from "semantic-ui-react";
import * as libphonenumber from "libphonenumber-js";
import { ApplicationContext } from "../../../context";
import Page from "../../../components/Page";
import PropTypes from 'prop-types';
import axios from "axios";
import AdminMenu from "../../../components/AdminMenu";
//const [APIData, setAPIData] = useState([]);

// useEffect(() => {
//     axios.get(`https://60fbca4591156a0017b4c8a7.mockapi.io/fakeData`)
//         .then((response) => {
//             setAPIData(response.data);
//         })
// }, [])


// function TableRow({ row }) {
//   return (
//     <Table.Row>
//       <Table.Cell>{row.name}</Table.Cell>
//       <Table.Cell>{row.email}</Table.Cell>
//     </Table.Row>
//   );
// }

// TableRow.propTypes = {
//     row: PropTypes.object.isRequired,
//     // name: PropTypes.string.isRequired,
//     // email: PropTypes.string.isRequired
// };
const AdminUserInfo: React.FC = (props): JSX.Element => {
	const ctx = useContext(ApplicationContext);
	const [name, setName] = useState<string>(ctx.user?.name ?? "");
	const userName = ctx.user?.name;
	const userEmail = ctx.user?.email;

    const APIData = [{"name":"ncc","email":"ncc@me.com"},
                {"name":"yushuang","email":"yushuang@me.com"},
                {"name":"yasskin","email":"yasskin@me.com"},
                {"name":"3","email":"3@me.com"},
                {"name":"yasskin","email":"yasskin@me.com"},
                {"name":"yasskin","email":"yasskin@me.com"},
                {"name":"yasskin","email":"yasskin@me.com"},
                {"name":"yasskin","email":"yasskin@me.com"},
                {"name":"yasskin","email":"yasskin@me.com"},
                {"name":"yasskin","email":"yasskin@me.com"},
                {"name":"yasskin","email":"yasskin@me.com"},
                {"name":"yasskin","email":"yasskin@me.com"},
                {"name":"yasskin","email":"yasskin@me.com"},
                {"name":"yasskin","email":"yasskin@me.com"},
                {"name":"yasskin","email":"yasskin@me.com"},
                {"name":"yasskin","email":"yasskin@me.com"},
                {"name":"yasskin","email":"yasskin@me.com"},
                {"name":"yasskin","email":"yasskin@me.com"},
                {"name":"yasskin","email":"yasskin@me.com"},
                {"name":"yasskin","email":"yasskin@me.com"},
                {"name":"3","email":"3@me.com"},
                {"name":"3","email":"3@me.com"}
            
            ];

	return (
        
		<Container className="container-fluid" fluid style={{ padding: "2" }}>
        <Grid columns={2}>
			<Grid.Row>
				<GridColumn width={3}>
                <AdminMenu />
				</GridColumn>

				<GridColumn  width={12}>
                <Table celled>
    <Table.Header>
      <Table.Row>
        <Table.HeaderCell>User Name</Table.HeaderCell>
        <Table.HeaderCell>Email</Table.HeaderCell>
      </Table.Row>
    </Table.Header>


    <Table.Body>
      {APIData.map((data) => {
     return (
        <>
       <Table.Row>
          <Table.Cell >{data.name}</Table.Cell>
           <Table.Cell>{data.email}</Table.Cell>
        </Table.Row>
        </>
   )})}
</Table.Body>

    <Table.Footer>

      <Table.Row>
      <Table.HeaderCell colSpan='3'>
      <Pagination
    boundaryRange={0}
    defaultActivePage={1}
    ellipsisItem={10}
    firstItem={null}
    lastItem={null}
    siblingRange={1}
    totalPages={10}
  />
  </Table.HeaderCell>
        {/* <Table.HeaderCell colSpan='3'>
          <Menu floated='right' pagination>
            <Menu.Item as='a' icon>
              <Icon name='chevron left' />
            </Menu.Item>
            <Menu.Item as='a'>1</Menu.Item>
            <Menu.Item as='a'>2</Menu.Item>
            <Menu.Item as='a'>3</Menu.Item>
            <Menu.Item as='a'>4</Menu.Item>
            <Menu.Item as='a' icon>
              <Icon name='chevron right' />
            </Menu.Item>
          </Menu>
        </Table.HeaderCell> */}
      </Table.Row>
    </Table.Footer>
                </Table>
				</GridColumn>
			</Grid.Row>
		</Grid>
		</Container>
	);
};

export default AdminUserInfo;
