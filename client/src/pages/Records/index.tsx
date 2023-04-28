import React, {useEffect, useState} from "react";
import {
    Table,
    Icon,
    Grid,
    GridColumn,
    Container,
    Loader, Dimmer, Button
} from "semantic-ui-react";
import {useHistory} from "react-router-dom";
import {getRecords} from "../../api/user";


interface Records {
    [x: string]: any;
    record_id: number;
    item_name: string;
    expirationDate: string;
}

interface localUser {
    role: number;
    name: string;
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

const UserRecordInfo: React.FC = (props): JSX.Element | null => {
    const history = useHistory()
    const user: localUser | null = JSON.parse(localStorage.getItem('user') || 'null');


    if (!user) {
        // Redirect to main page
        history.push('/');
        return null;
    }


    const [Records, setRecords] = useState<Records[]>([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);
        getRecords()
            .then(res => {
                setRecords(res.data)
                setLoading(false)
            })
            .catch(error => {
                console.error(error)
                setLoading(false)
            });
    }, []);

    const readBook = ()=>{
        history.push('/read')
    }

    return (
        <Container style={{ marginTop: 10,marginBottom: 30 }}>
            <Grid columns={2}>
                <Grid.Row>
                    <GridColumn width={15}>
                        <div style={{height:'80vh',overflowY:'auto'}}>
                            {loading==true?<Dimmer active inverted>
                                <Loader inverted>Loading Records of {user.name}</Loader>
                            </Dimmer>:<div></div>
                            }

                            <Table>
                                <Table.Header>
                                    <Table.Row>
                                        <Table.HeaderCell>Book Name</Table.HeaderCell>
                                        <Table.HeaderCell>Expiration Date</Table.HeaderCell>
                                        <Table.HeaderCell>Operation</Table.HeaderCell>
                                    </Table.Row>
                                </Table.Header>
                                <Table.Body>
                                    {Records.map(record => (
                                        <Table.Row key={record.record_id}>
                                            <Table.Cell>{record.item_name}</Table.Cell>
                                            <Table.Cell>{formatDate(record.expirationDate)}</Table.Cell>
                                            <Table.Cell>
                                                <Button onClick={readBook} animated='fade'>
                                                    <Button.Content visible>Read</Button.Content>
                                                    <Button.Content hidden>  <Icon name='book' />
                                                    </Button.Content>
                                                </Button>
                                            </Table.Cell>
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

export default UserRecordInfo;
