import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {readBook} from "../../api/read";

interface IframeProps {
    src: string;
    title: string;
    width: string;
    height: string;
    allowFullscreen?: boolean;
    frameBorder?: number;
}


const ReadBookPage: React.FC = (props): JSX.Element | null => {

    const [src, setSrc] = useState<string|undefined>("");
    useEffect(()=> {
        readBook().then((res)=>{
            setSrc(res.data.bookURL)
        })
    },[])

    return (
        <div>
            <iframe style={{width:'100vw', height:'90vh', overflowY:'auto',border:'0px'}} src={src}></iframe>
        </div>

    );

}

export default ReadBookPage;
