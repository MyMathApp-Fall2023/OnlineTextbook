import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {readBook} from "../../api/read";
import {Container, Icon, Message} from "semantic-ui-react";

interface IframeProps {
    src: string;
    title: string;
    width: string;
    height: string;
    allowFullscreen?: boolean;
    frameBorder?: number;
}


const ReadBookPage: React.FC = (props): JSX.Element | null => {
    const [loading,setLoading] = useState<boolean>(false)
    const [src, setSrc] = useState<string|undefined>("");
    useEffect(()=> {
        setLoading(true)
        readBook().then((res)=>{
            setSrc(res.data.readValidation.bookURL)
            setLoading(false)
        }).catch((error)=> {
            setSrc(undefined)
            setLoading(false)
        })
    },[])

    if (loading) {
        return (
            <Container>
                <Message icon
                size='massive'>
                <Icon name='circle notched' loading />
                <Message.Content>
                    <Message.Header>Checking</Message.Header>
                    Checking for your purchasing record and email subscription
                </Message.Content>
            </Message>
            </Container>
        )
    }

    else {
        return (

            src !== undefined ?
                <div>
                    <iframe style={{width:'100vw', height:'90vh', overflowY:'auto',border:'0px'}} src={src}></iframe>
                </div>:
                <Container>
                    <Message icon='meh outline'
                             size='massive'
                             negative
                             header='Sorry'
                             content='You can&#39;t read the book now. Please purchase it first or check your email address.
                    '>
                    </Message>
                </Container>

        )
    }





}

export default ReadBookPage;
