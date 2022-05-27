import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import successMessages from '../../config/successMessage';
import Input from '../input/Input';
import './CreateForm.css'
import { CircularProgress } from '@mui/material';
const CreateForm = () => {
    const { id } = useParams()
    const [values, setValues] = useState({});
    const [loading, setLoading] = useState(false);
    let url;
    useEffect(() => {
        setValues({});
        if (id) {
            url = `http://localhost/api/get_form.php?id=${id}`;
        } else {
            url = "http://localhost/api/get_form.php";
        }
        fetch(url)
            .then((response) => response.json())
            .then((json) => {
                setValues(json.data.fields[0]);
            });
    }, [id]);

    const handleSubmit = (e) => {
        e.preventDefault();
        successMessages("http://localhost/api/submit_form.php", setLoading).then(
            (response) => {

            }
        );
    };
    return (
        <div className='form_container'>
            <form onSubmit={handleSubmit}>
                {Object.keys(values).map((key, index) => (
                    <Input key={index} input={values[key]} label={key} />
                ))}

                {loading ? (
                    <CircularProgress />
                ) : (
                    <button className='btn' type="submit">Submit</button>
                )}

            </form>
        </div>
    );
};

export default CreateForm;