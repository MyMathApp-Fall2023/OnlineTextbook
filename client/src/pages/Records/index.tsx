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
import axios from "axios";
import { getItem, getProfileApi, getRecords } from "../../api/user";
import {useHistory} from "react-router-dom";



interface Records {
    [x: string]: any;
    record_id: number;
    item_name: string;
    expirationDate: string;
}

interface localUser {
    role: number;
}

const AdminUserInfo: React.FC = (props): JSX.Element | null => {
    // const ctx = useContext(ApplicationContext);
    // const [name, setName] = useState<string>(ctx.user?.name ?? "");
    // const userName = ctx.user?.name;
    // const userEmail = ctx.user?.email;
    // const history = useHistory()
    // const user: localUser | null = JSON.parse(localStorage.getItem('user') || 'null');

    const history = useHistory()
    const user: localUser | null = JSON.parse(localStorage.getItem('user') || 'null');

    if (!user) {
        // Redirect to main page
        history.push('/');
        return null;
    }

    const [Records, setRecords] = useState<Records[]>([]);
    // const userid = getProfileApi();
    useEffect(() => {
        getRecords()
            .then(res => {
                setRecords(res.data)
            })
            .catch((error: any) => console.error(error));
    }, []);

    return (

        <Container className="container-fluid" fluid style={{padding: "2"}}>
            <Grid columns={2}>
                <Grid.Row>

                    <GridColumn width={12}>
                        <Table>
                            <Table.Header>
                                <Table.Row>
                                    <Table.HeaderCell>Book Name</Table.HeaderCell>
                                    <Table.HeaderCell>Expiration Date</Table.HeaderCell>
                                </Table.Row>
                            </Table.Header>
                            <Table.Body>
                                {Records.map(record => (
                                    <Table.Row key={record.record_id}>
                                        <Table.Cell>{record.item_name}</Table.Cell>
                                        <Table.Cell>{record.expirationDate.split("T")[0]}</Table.Cell>
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
