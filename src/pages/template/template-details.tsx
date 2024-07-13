
import React, { useEffect, useState } from 'react'
import {
    Card,
    Box
} from '@mui/material'
import { CustomAppBar } from '../../components/CustomAppBar'
import { useLocation, useNavigate } from 'react-router-dom'
import { TemplateUrl } from '../../services/ApiUrls'
import { fetchData, Header } from '../../components/FetchData'
import { TemplateDetailsForm } from './template-details-form'
import { TEMPLATEOBJECTTYPE } from './types'

const sampleData: TEMPLATEOBJECTTYPE = {
    name: 'My Template',
    locale: 'English (US)',
    messageBody: 'Hello Shakib, I am here to assist you. How can I help you today?',
    footerText: 'You can send text or email us at aaacrm@yorcrm.com',
    button: ''
}
export default function TemplateDetails() {
    const navigate = useNavigate()
    const { state } = useLocation()
    const [templateDetails, setTemplateDetails] = useState<TEMPLATEOBJECTTYPE | null>(null)

    useEffect(() => {
        getTemplateDetail(state?.templateId?.id)
    }, [state?.templateId?.id])

    const getTemplateDetail = (id: any) => {
        const Header = {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: localStorage.getItem('Token'),
            org: localStorage.getItem('org')
          }
        fetchData(`${TemplateUrl}/${id}`, 'GET', null as any, Header)
            .then((res) => {
                console.log(res, 'res');
                if (!res.error) {
                    setTemplateDetails(res?.data)
                }
            }).catch(()=>setTemplateDetails(sampleData))
    }

    const backbtnHandle = () => {
        navigate('/app/templates')
    }

    const editHandle = () => {
        navigate('/app/templates/edit-template', {
            state: { value: templateDetails, id: state?.templateId?.id }
        })
    }

    const module = 'Templates'
    const crntPage = 'Template Detail'
    const backBtn = 'Back To Templates'

    return (
        <Box sx={{ mt: '60px' }}>
            <div>
                <CustomAppBar backbtnHandle={backbtnHandle} module={module} backBtn={backBtn} crntPage={crntPage} editHandle={editHandle} />
                <Box sx={{ mt: '120px', p: '20px', display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                    {templateDetails && <TemplateDetailsForm templateDetails={templateDetails}/>}
                </Box>
            </div>
        </Box>
    )
}