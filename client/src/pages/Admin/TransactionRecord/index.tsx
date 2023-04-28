import React, {useContext, useEffect, useState, useCallback,} from "react";
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
    Button,
    Pagination
} from "semantic-ui-react";
import * as libphonenumber from "libphonenumber-js";
import {ApplicationContext} from "../../../context";
import Page from "../../../components/Page";
import PropTypes from 'prop-types';
import axios from "axios";
import AdminMenu from "../../../components/AdminMenu";
import { getTransactionRecordData, getItem, getPurchaseCode } from "../../../api/admin";

interface TransactionRecord {
    [x: string]: any;
    readonly id: number;
    readonly item_id: number;
    readonly code_id: number;
    readonly user_id: number;
    createdAt: Date;
    price: number;
}


const AdminUserInfo: React.FC = (props): JSX.Element => {
    // const ctx = useContext(ApplicationContext);
    // const [name, setName] = useState<string>(ctx.user?.name ?? "");
    // const userName = ctx.user?.name;
    // const userEmail = ctx.user?.email;


    const [transactionData, setTransactionRecordData] = useState<TransactionRecord[]>([]);

    useEffect(() => {
        getTransactionRecordData()
            .then(res => {
                setTransactionRecordData(res.data)
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
                                    <Table.HeaderCell>Transaction ID</Table.HeaderCell>
                                    <Table.HeaderCell>Item name</Table.HeaderCell>
                                    <Table.HeaderCell>Purchase Code</Table.HeaderCell>
                                    <Table.HeaderCell>Username</Table.HeaderCell>
                                    <Table.HeaderCell>Created At</Table.HeaderCell>
                                    <Table.HeaderCell>Price</Table.HeaderCell>
                                </Table.Row>
                            </Table.Header>
                            <Table.Body>
                                {transactionData.map(transactionRecord => (
                                    <Table.Row key={transactionRecord.id}>
                                        <Table.Cell>{transactionRecord.id}</Table.Cell>
                                        <Table.Cell>{transactionRecord.item.name}</Table.Cell>
                                        <Table.Cell>{transactionRecord.purchasecode.name}</Table.Cell>
                                        <Table.Cell>{transactionRecord.user.name}</Table.Cell>
                                        <Table.Cell>{transactionRecord.createdAt}</Table.Cell>
                                        <Table.Cell>{transactionRecord.price}</Table.Cell>
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
