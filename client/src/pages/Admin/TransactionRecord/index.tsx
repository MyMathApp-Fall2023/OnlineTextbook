import React, {useEffect, useState} from "react";
import {
    Table,
    Icon,
    Grid,
    GridColumn,
    Container,
    Loader, Dimmer
} from "semantic-ui-react";
import AdminMenu from "../../../components/AdminMenu";
import {getAllUserData, getTransactionRecordData} from "../../../api/admin";
import {useHistory} from "react-router-dom";


interface TransactionRecord {
    [x: string]: any;
    readonly id: number;
    readonly item_id: number;
    readonly code_id: number;
    readonly user_id: number;
    createdAt: string;
    price: number;
}

interface localUser {
    role: number;
}

const formatDate = (dateTime:string):string =>{
    const date= new Date(new Date(dateTime).toLocaleString())
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const day = date.getDate().toString().padStart(2, "0");
    const formattedDate = `${year}-${month}-${day}`;
    const hour = date.getHours().toString().padStart(2, "0");
    const minute = date.getMinutes().toString().padStart(2, "0");
    const second = date.getSeconds().toString().padStart(2, "0");
    const formattedTime = `${hour}:${minute}:${second}`;
    const formattedDateTime = `${formattedDate} ${formattedTime}`;
    return formattedDateTime;
}

const AdminTransInfo: React.FC = (props): JSX.Element | null => {
    const history = useHistory()
    const user: localUser | null = JSON.parse(localStorage.getItem('user') || 'null');

    if (!user || user.role !== 1) {
        // Redirect to main page
        history.push('/');
        return null;
    }

    const [transactionData, setTransactionData] = useState<TransactionRecord[]>([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);
        getTransactionRecordData()
            .then(res => {
                setTransactionData(res.data)
                setLoading(false)
            })
            .catch(error => {
                console.error(error)
                setLoading(false)
            });
    }, []);

    return (

        <Container className="container-fluid" fluid style={{padding: "2"}}>
            <Grid columns={2}>
                <Grid.Row>
                    <GridColumn width={3}>
                        <AdminMenu/>
                    </GridColumn>

                    <GridColumn width={12}>
                        <div style={{height:'80vh',overflowY:'auto'}}>
                            {loading==true?<Dimmer active inverted>
                                <Loader inverted>Loading Transactions</Loader>
                            </Dimmer>:<div></div>
                            }

                            <Table>
                                <Table.Header>
                                    <Table.Row>
                                        <Table.HeaderCell>ID</Table.HeaderCell>
                                        <Table.HeaderCell>Item name</Table.HeaderCell>
                                        <Table.HeaderCell>Purchase Code</Table.HeaderCell>
                                        <Table.HeaderCell>User</Table.HeaderCell>
                                        <Table.HeaderCell>Amount</Table.HeaderCell>
                                        <Table.HeaderCell>Purchase Time</Table.HeaderCell>
                                    </Table.Row>
                                </Table.Header>
                                <Table.Body>
                                    {transactionData.map(transactionRecord => (
                                        <Table.Row key={transactionRecord.id}>
                                            <Table.Cell>{transactionRecord.id}</Table.Cell>
                                            <Table.Cell>{transactionRecord.item.name} - {transactionRecord.item.length} Months </Table.Cell>
                                            {transactionRecord.purchasecode == null ?<Table.Cell></Table.Cell>:<Table.Cell>{transactionRecord.purchasecode.name}  (-{transactionRecord.purchasecode.priceOff}%)</Table.Cell>
                                            }
                                            <Table.Cell>{transactionRecord.user.name} - {transactionRecord.user.email}</Table.Cell>
                                            <Table.Cell>${transactionRecord.price}</Table.Cell>
                                            <Table.Cell>{formatDate(transactionRecord.createdAt)}</Table.Cell>
                                            {/*<Table.Cell>*/}
                                            {/*    {user.activatedAccount?*/}
                                            {/*        <Icon color='green' name='checkmark' size='large' />:*/}
                                            {/*        <div></div>}*/}
                                            {/*</Table.Cell>*/}
                                        </Table.Row>
                                    ))}
                                </Table.Body>
                            </Table>
                        </div>
                    </GridColumn>
                </Grid.Row>
            </Grid>
        </Container>
    );
};

export default AdminTransInfo;
