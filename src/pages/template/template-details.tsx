
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
import { sampleTemplateDetails, TEMPLATEOBJECTTYPE } from './types'

const getTemplateDetailsFromSampleData = (templateId:string): TEMPLATEOBJECTTYPE=> {
    return sampleTemplateDetails.filter((i)=>i.templateId===templateId)[0];
};
export default function TemplateDetails() {
    const navigate = useNavigate()
    const { state } = useLocation()
    const [templateDetails, setTemplateDetails] = useState<TEMPLATEOBJECTTYPE | null>(null)

    useEffect(() => {
        getTemplateDetail(state?.templateId)
    }, [state?.templateId])
    const getTemplateDetail = (templateId: any) => {
        const Header = {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: localStorage.getItem('Token'),
            org: localStorage.getItem('org')
          }
        fetchData(`${TemplateUrl}/${templateId}`, 'GET', null as any, Header)
            .then((res) => {
                console.log(res, 'res');
                if (!res.error) {
                    setTemplateDetails(res?.data)
                }
            }).catch(()=>setTemplateDetails(getTemplateDetailsFromSampleData(templateId)))
    }

    const backbtnHandle = () => {
        navigate('/app/templates')
    }

    const editHandle = () => {
        navigate('/app/templates/edit-template', {
            state: { value: templateDetails, templateId: state?.templateId}
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