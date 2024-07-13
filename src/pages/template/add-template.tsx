import React, { useState } from 'react'
import {
    TextField,
    AccordionDetails,
    Accordion,
    AccordionSummary,
    Typography,
    Box,
    Divider
} from '@mui/material'
import { FaArrowDown } from 'react-icons/fa';
import { useLocation, useNavigate } from 'react-router-dom';
import { TemplatesUrl } from '../../services/ApiUrls';
import { CustomAppBar } from '../../components/CustomAppBar';
import { fetchData, Header } from '../../components/FetchData';
import { AntSwitch, CustomSelectField, RequiredTextField } from '../../styles/CssStyled';
import '../../styles/style.css'
import { FiChevronDown } from '@react-icons/all-files/fi/FiChevronDown';

type FormErrors = {
    name?: string[];
};

function AddTemplate() {
    const navigate = useNavigate()
    const { state } = useLocation()
    const [error, setError] = useState(false)
    const [formData, setFormData] = useState({
        name: ''
    })
    const [errors, setErrors] = useState<FormErrors>({});

    const handleChange = (e: any) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e: any) => {
        e.preventDefault();
        submitForm();
    };

    const submitForm = () => {
        const Header = {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: localStorage.getItem('Token'),
            org: localStorage.getItem('org')
          }
        const data = { name: formData.name }
        fetchData(`${TemplatesUrl}`, 'POST', JSON.stringify(data), Header)
            .then((res: any) => {
                if (!res.error) {
                    resetForm()
                    navigate('/app/templates')
                }
                if (res.error) {
                    setError(true)
                }
            })
            .catch(() => {
            })
    };

    const resetForm = () => {
        setFormData({ name: '' });
        setErrors({});
    }
    const backbtnHandle = () => {
        navigate('/app/templates')
    }
    const module = 'Templates'
    const crntPage = 'Add Template'
    const backBtn = 'Back To Templates'

    const onCancel = () => {
        resetForm();
        backbtnHandle();
    }
    return (
        <Box sx={{ mt: '60px' }}>
            <CustomAppBar backbtnHandle={backbtnHandle} module={module} backBtn={backBtn} crntPage={crntPage} onCancel={onCancel} onSubmit={handleSubmit} />
            <Box sx={{ mt: "120px" }}>
                <form onSubmit={handleSubmit}>
                    <div style={{ padding: '10px' }}>
                        <div className='leadContainer'>
                            <Accordion style={{ width: '98%' }}
                                defaultExpanded
                            >
                                <AccordionSummary expandIcon={<FiChevronDown style={{ fontSize: '25px' }} />}>
                                    <Typography className='accordion-header'>Template Information</Typography>
                                </AccordionSummary>
                                <Divider className='divider' />
                                <AccordionDetails>
                                    <Box
                                        sx={{ width: '98%', color: '#1A3353',mb:1 }}
                                        component='form'
                                        // noValidate
                                        autoComplete='off'
                                    >
                                        <div className='fieldContainer'>
                                            <div className='fieldSubContainer'>
                                                <div className='fieldTitle'>Template Name</div>
                                                <RequiredTextField
                                                    name='name'
                                                    value={formData.name}
                                                    onChange={handleChange}
                                                    style={{ width: '70%' }}
                                                    size='small'
                                                    helperText={errors?.name?.[0] ? errors?.name[0] : ''}
                                                    error={!!errors?.name?.[0]}

                                                />
                                            </div>
                                        </div>
                                    </Box>
                                </AccordionDetails>
                            </Accordion>
                        </div>
                    </div>
                </form>
            </Box>

        </Box>
    )
}

export default AddTemplate