import React, {useEffect, useState} from "react";
import {
    Form,
    Table,
    Icon,
    Grid,
    GridColumn,
    Container,
    Button,
    Modal, Dimmer, Loader, Message
} from "semantic-ui-react";
import AdminMenu from "../../../components/AdminMenu";
import {
    addEmailSubApi,
    deleteEmailSubApi,
    getAllEmailSubscriptionData,
    updateEmailSubApi
} from "../../../api/admin";


interface EmailSubscription {
    readonly email_sub_id: number;
    suffix: string;
}

type FormValues = {
    email_sub_id: string,
    suffix: string;
};

type MessageValues = {
    type:string,
    message:string
}

const AdminEmailSubscriptionPage: React.FC = (props): JSX.Element => {

    const [formValues, setFormValues] = useState<FormValues>({
        email_sub_id: "",
        suffix:""
    });

    const [addModalOpen, setAddModalOpen] = useState(false);
    const [updateModalOpen, setUpdateModalOpen] = useState(false);
    const [emailSubscriptionData, setEmailSubscriptionData] = useState<EmailSubscription[]>([]);
    const [loading, setLoading] = useState(false);
    const [buttonLoading, setButtonLoading] = useState(false);


    const [message, setMessage] = useState<MessageValues>({
        type:'none',
        message:''
    });

    const getEmailSubscription = () => {
        setLoading(true)
        getAllEmailSubscriptionData()
            .then(res => {
                setEmailSubscriptionData(res.data)
                setLoading(false)
            })
            .catch(error => {
                console.error(error)
                setLoading(false)
            });
    }
    useEffect(() => {
        getEmailSubscription()
    }, []);

    const handleAdd = () => {
        setButtonLoading(true)
        addEmailSubApi({
            suffix: formValues.suffix,
        }).then(async (res) => {
            const emailSubscription = res.data.emailSubscription
            localStorage.setItem('emailSubscription', JSON.stringify(emailSubscription));
            setButtonLoading(false)
            setAddModalOpen(false)
            setMessage({type:'success',message:`Email Subscription with suffix ${formValues.suffix} has already added.`})
            getEmailSubscription()
        })
            .catch((err) => {
                console.log(err)
                setButtonLoading(false)
                setAddModalOpen(false)
                setMessage({type:'fail',message:`Email Subscription with suffix ${formValues.suffix} is already used for another purchase code. Please use a new code.`})
            });

    };

    const handleCancel = () => {
        setAddModalOpen(false)
        setUpdateModalOpen(false)
        setFormValues({ ...formValues, suffix: ''})
    }

    const handleDelete = (code: EmailSubscription) => {
        setButtonLoading(true)
        deleteEmailSubApi({email_sub_id: code.email_sub_id})
            .then(res => {
                setButtonLoading(false)
                getEmailSubscription()
                setMessage({type:'success',message:`Email Subscription with suffix ${code.suffix} is already deleted.`})

            })
            .catch(error => {
                setButtonLoading(false)
                console.error(error)
                setMessage({type:'fail',message:`Email Subscription with suffix ${code.suffix} delete failed. Please try again`})
            });
    };

    const handleEditOpen = (code: EmailSubscription) => {
        setFormValues({
            ...formValues,
            email_sub_id: code.email_sub_id.toString(),
            suffix:code.suffix
        })
        setUpdateModalOpen(true)
    };

    const handleEdit = () => {
        setButtonLoading(true)
        updateEmailSubApi({
            email_sub_id: formValues.email_sub_id,
            suffix: formValues.suffix
        }).then(async (res) => {
            const emailSubscription = res.data.emailSubscription
            localStorage.setItem('emailSubscription', JSON.stringify(emailSubscription));
            setButtonLoading(false)
            setUpdateModalOpen(false)
            setMessage({type:'success',message:`Email Subscription with suffix ${formValues.suffix} is already deleted.`})
            getEmailSubscription()
        })
            .catch((err) => {
                    console.log(err)
                    setButtonLoading(false)
                    setUpdateModalOpen(false)
                    setMessage({type:'fail',message:`Email Subscription with suffix ${formValues.suffix} delete failed. Please try again`})
                }
            );
    }

    return (
        <Container className="container-fluid" fluid style={{padding: "2"}}>
            <Grid columns={2}>
                <Grid.Row>
                    <GridColumn width={3}>
                        <AdminMenu/>
                    </GridColumn>
                    <GridColumn width={12}>
                        <div>
                            {message.type === 'none' && (
                                <></>
                            )}

                            {message.type === 'success' && (
                                <Message positive>
                                    <Message.Header>Success</Message.Header>
                                    <p>{message.message}</p>
                                </Message>
                            )}

                            {message.type === 'fail' && (
                                <Message negative>
                                    <Message.Header>Oops</Message.Header>
                                    <p>{message.message}</p>
                                </Message>
                            )}

                            <Button icon="add" labelPosition='left' primary onClick={() => setAddModalOpen(true)}>
                                <Icon name="add circle"/>Add New Email Subscription
                            </Button>
                        </div>


                        <div style={{marginTop: '10px', height: '80vh', overflowY: 'auto'}}>
                            {loading == true ? <Dimmer active inverted>
                                <Loader inverted>Loading Email Subscription</Loader>
                            </Dimmer> : <div></div>
                            }
                            <Table>
                                <Table.Header>
                                    <Table.Row>
                                        <Table.HeaderCell>ID</Table.HeaderCell>
                                        <Table.HeaderCell>Email Suffix</Table.HeaderCell>
                                        {/*<Table.HeaderCell>Begin Date</Table.HeaderCell>*/}
                                        {/*<Table.HeaderCell>End Date</Table.HeaderCell>*/}
                                        <Table.HeaderCell>Operation</Table.HeaderCell>
                                    </Table.Row>
                                </Table.Header>
                                <Table.Body>
                                    {emailSubscriptionData.map(emailSubscription => (
                                        <Table.Row key={emailSubscription.email_sub_id}>
                                            <Table.Cell>{emailSubscription.email_sub_id}</Table.Cell>
                                            <Table.Cell>{emailSubscription.suffix}</Table.Cell>
                                            {/*<Table.Cell></Table.Cell>*/}
                                            {/*<Table.Cell></Table.Cell>*/}
                                            <Table.Cell>
                                                <Button ui primary basic
                                                        onClick={() => handleEditOpen(emailSubscription)}
                                                >
                                                    EDIT
                                                </Button>
                                                <Button ui negative basic loading={buttonLoading}
                                                        onClick={() => handleDelete(emailSubscription)}
                                                >
                                                    DELETE
                                                </Button>
                                            </Table.Cell>
                                        </Table.Row>
                                    ))}
                                </Table.Body>
                            </Table>
                        </div>

                        <Modal
                            onClose={() => setAddModalOpen(false)}
                            onOpen={() => setAddModalOpen(true)}
                            open={addModalOpen}
                        >
                            <Modal.Header>Add New Email Subscription</Modal.Header>
                            <Modal.Content>
                                <Form>
                                    <Form.Input
                                        id="name"
                                        label="Email Suffix (eg:tamu.edu)"
                                        onChange={(event, data) => setFormValues({...formValues, suffix: data.value})}
                                        required
                                    />
                                </Form>
                            </Modal.Content>
                            <Modal.Actions>
                                <Button
                                    color='black'
                                    onClick={handleCancel}>
                                    Cancel
                                </Button>
                                <Button
                                    content="Add"
                                    onClick={handleAdd}
                                    positive
                                    loading={buttonLoading}
                                />
                            </Modal.Actions></Modal>

                        <Modal
                            onClose={() => setUpdateModalOpen(false)}
                            onOpen={() => setUpdateModalOpen(true)}
                            open={updateModalOpen}
                        >
                            <Modal.Header>Edit Email Subscription</Modal.Header>
                            <Modal.Content>
                                <Form>
                                    <Form.Input
                                        id="name"
                                        label="Email Suffix (eg:tamu.edu)"
                                        value={formValues.suffix}
                                        onChange={(event, data) => setFormValues({...formValues, suffix: data.value})}
                                        required
                                    />
                                </Form>
                            </Modal.Content>
                            <Modal.Actions>
                                <Button
                                    color='black'
                                    onClick={handleCancel}>
                                    Cancel
                                </Button>
                                <Button
                                    content="Save"
                                    onClick={handleEdit}
                                    positive
                                    loading={buttonLoading}
                                />
                            </Modal.Actions></Modal>
                    </GridColumn>
                </Grid.Row>
            </Grid>
        </Container>
    );
};

export default AdminEmailSubscriptionPage;
