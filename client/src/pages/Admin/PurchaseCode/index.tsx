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
import {addCodeApi, deleteCodeApi, getAllPurchaseCodeData, updateCodeApi} from "../../../api/admin";


interface PurchaseCode {
    readonly code_id: number;
    name: string;
    priceOff: number;
}

type FormValues = {
    code_id: string,
    name: string;
    priceOff: string;
};

type MessageValues = {
    type:string,
    message:string
}

const AdminPurchaseCodePage: React.FC = (props): JSX.Element => {

    const [formValues, setFormValues] = useState<FormValues>({
        code_id: "",
        name: "",
        priceOff: ""
    });

    const [addModalOpen, setAddModalOpen] = useState(false);
    const [updateModalOpen, setUpdateModalOpen] = useState(false);
    const [purchaseData, setPurchaseCodeData] = useState<PurchaseCode[]>([]);
    const [loading, setLoading] = useState(false);
    const [buttonLoading, setButtonLoading] = useState(false);


    const [message, setMessage] = useState<MessageValues>({
        type:'none',
        message:''
    });

    const getPurchaseCode = () => {
        setLoading(true)
        getAllPurchaseCodeData()
            .then(res => {
                setPurchaseCodeData(res.data)
                setLoading(false)
            })
            .catch(error => {
                console.error(error)
                setLoading(false)
            });
    }
    useEffect(() => {
        getPurchaseCode()
    }, []);

    const handleAdd = () => {
        setButtonLoading(true)
        addCodeApi({
            name: formValues.name,
            priceOff: Number(formValues.priceOff)
        }).then(async (res) => {
            const purchaseCode = res.data.purchaseCode
            localStorage.setItem('purchaseCode', JSON.stringify(purchaseCode));
            setButtonLoading(false)
            setAddModalOpen(false)
            setMessage({type:'success',message:`Purchase code ${formValues.name} has already added.`})
            getPurchaseCode()
        })
            .catch((err) => {
                console.log(err)
                setButtonLoading(false)
                setAddModalOpen(false)
                setMessage({type:'fail',message:`Purchase code ${formValues.name} is already used for another purchase code. Please use a new code.`})
            });

    };

    const handleCancel = () => {
        setAddModalOpen(false)
        setUpdateModalOpen(false)
        setFormValues({ ...formValues, name: '', priceOff:''})
    }

    const handleDelete = (code: PurchaseCode) => {
        setButtonLoading(true)
        deleteCodeApi({code_id: code.code_id})
            .then(res => {
                setButtonLoading(false)
                getPurchaseCode()
                setMessage({type:'success',message:`Purchase code ${code.name} is already deleted.`})

            })
            .catch(error => {
                setButtonLoading(false)
                console.error(error)
                setMessage({type:'fail',message:`Purchase code ${code.name} delete failed. Please try again`})
            });
    };

    const handleEditOpen = (code: PurchaseCode) => {
        console.log(code)
        setFormValues({
            ...formValues,
            code_id: code.code_id.toString(),
            name: code.name,
            priceOff: (code.priceOff).toString()
        })
        setUpdateModalOpen(true)
    };

    const handleEdit = () => {
        setButtonLoading(true)
        updateCodeApi({
            code_id: formValues.code_id,
            priceOff: Number(formValues.priceOff)
        }).then(async (res) => {
            const purchaseCode = res.data.purchaseCode
            localStorage.setItem('purchaseCode', JSON.stringify(purchaseCode));
            setButtonLoading(false)
            setUpdateModalOpen(false)
            setMessage({type:'success',message:`Purchase code ${formValues.name} is already deleted.`})
            getPurchaseCode()
        })
            .catch((err) => {
                console.log(err)
                setButtonLoading(false)
                setUpdateModalOpen(false)
                setMessage({type:'fail',message:`Purchase code ${formValues.name} delete failed. Please try again`})
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
                                <Icon name="add circle"/>Add New Purchase Code
                            </Button>
                        </div>


                        <div style={{marginTop: '10px', height: '80vh', overflowY: 'auto'}}>
                            {loading == true ? <Dimmer active inverted>
                                <Loader inverted>Loading Purchase Code</Loader>
                            </Dimmer> : <div></div>
                            }
                            <Table>
                                <Table.Header>
                                    <Table.Row>
                                        <Table.HeaderCell>Code ID</Table.HeaderCell>
                                        <Table.HeaderCell>Code</Table.HeaderCell>
                                        <Table.HeaderCell>Percent Off</Table.HeaderCell>
                                        <Table.HeaderCell>Operation</Table.HeaderCell>
                                    </Table.Row>
                                </Table.Header>
                                <Table.Body>
                                    {purchaseData.map(purchaseCode => (
                                        <Table.Row key={purchaseCode.code_id}>
                                            <Table.Cell>{purchaseCode.code_id}</Table.Cell>
                                            <Table.Cell>{purchaseCode.name}</Table.Cell>
                                            <Table.Cell>{purchaseCode.priceOff}</Table.Cell>
                                            <Table.Cell>
                                                <Button ui primary basic
                                                        onClick={() => handleEditOpen(purchaseCode)}
                                                >
                                                    EDIT
                                                </Button>
                                                <Button ui negative basic loading={buttonLoading}
                                                        onClick={() => handleDelete(purchaseCode)}
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
                            <Modal.Header>Add New Purchase Code</Modal.Header>
                            <Modal.Content>
                                <Form>
                                    <Form.Input
                                        id="name"
                                        label="Code"
                                        onChange={(event, data) => setFormValues({...formValues, name: data.value})}
                                        required
                                    />
                                    <Form.Input
                                        type="number"
                                        id="priceOff"
                                        label="Percent Off (0-100)"
                                        onChange={(event, data) => setFormValues({...formValues, priceOff: data.value})}
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
                            <Modal.Header>Edit Purchase Code</Modal.Header>
                            <Modal.Content>
                                <Form>
                                    <Form.Input
                                        id="name"
                                        label="Code"
                                        disabled
                                        value={formValues.name}
                                    />
                                    <Form.Input
                                        type="number"
                                        id="priceOff"
                                        label="Percent Off (0-100)"
                                        value={formValues.priceOff}
                                        onChange={(event, data) => setFormValues({...formValues, priceOff: data.value})}
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

export default AdminPurchaseCodePage;
