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
import {getAllUserData} from "../../../api/admin";


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
        getAllUserData()
            .then(res => {
                setUserData(res.data)
            })
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
