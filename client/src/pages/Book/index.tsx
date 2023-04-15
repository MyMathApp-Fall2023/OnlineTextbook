import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {readBook} from "../../api/read";

const ReadBookPage: React.FC = (props): JSX.Element | null => {

        const [htmlContent, setHtmlContent] = useState('');

        useEffect(() => {

            readBook().then((res) => {
                setHtmlContent(res.data);
            })
        }, []);

        return (
            <div dangerouslySetInnerHTML={{__html: htmlContent}}/>
        );

}

export default ReadBookPage;
