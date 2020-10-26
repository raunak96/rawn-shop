import React, { useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';

const SearchBox = () => {
    const [keyword, setKeyword] = useState("");
    const history = useHistory();

    const handleSubmit = e =>{
        e.preventDefault();
        if(keyword.trim())
            history.push(`/?keyword=${keyword}`);
        else
            history.push("/");
    }
    return (
        <Form onSubmit={handleSubmit} inline>
            <Form.Control type="search" placeholder="Search Products.." value={keyword} onChange={(e)=>setKeyword(e.target.value)} className='mr-sm-2 ml-sm-5'/>
            <Button type="submit" variant="outline-success" className="px-4 py-2">Search</Button>
        </Form>
    );
};

export default SearchBox;