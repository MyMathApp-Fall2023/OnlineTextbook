import React, {useContext, useEffect, useState, useCallback} from "react";
import {
    Header,
    Divider,
    Form,
    Table,
    Label,
    Menu,
    Icon,
    Grid,
    GridColumn,
    Container,
    Pagination
} from "semantic-ui-react";
import * as libphonenumber from "libphonenumber-js";
import {ApplicationContext} from "../../../context";
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

interface UserData {
    user_id: number;
    email: string;
    name: string;
}

const AdminUserInfo: React.FC = (props): JSX.Element => {
    const ctx = useContext(ApplicationContext);
    const [name, setName] = useState<string>(ctx.user?.name ?? "");
    const userName = ctx.user?.name;
    const userEmail = ctx.user?.email;


    const [userData, setUserData] = useState<UserData[]>([]);

    useEffect(() => {
        fetch('/api/admin/user/data')
            .then(response => response.json())
            .then(data => setUserData(data))
            .catch(error => console.error(error));
    }, []);



    return (

        <Container className="container-fluid" fluid style={{padding: "2"}}>
            <Grid columns={2}>
                <Grid.Row>
                    <GridColumn width={3}>
                        <AdminMenu/>
                    </GridColumn>

                    <GridColumn width={12}>
                        <Table>
                            <Table.Header>
                                <Table.Row>
                                    <Table.HeaderCell>Email</Table.HeaderCell>
                                    <Table.HeaderCell>Username</Table.HeaderCell>
                                </Table.Row>
                            </Table.Header>
                            <Table.Body>
                                {userData.map(user => (
                                    <Table.Row key={user.user_id}>
                                        <Table.Cell>{user.email}</Table.Cell>
                                        <Table.Cell>{user.name}</Table.Cell>
                                    </Table.Row>
                                ))}
                            </Table.Body>
                        </Table>
                    </GridColumn>
                </Grid.Row>
            </Grid>
        </Container>
    );
};

export default AdminUserInfo;
