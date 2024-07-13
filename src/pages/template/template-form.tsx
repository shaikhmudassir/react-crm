import { Box, Card } from "@mui/material";
import { TEMPLATEOBJECTTYPE } from "./types";


type TEMPLATEFORMPROPS = {
    templateDetails: TEMPLATEOBJECTTYPE
}
export const TemplateForm = (props: TEMPLATEFORMPROPS)=>{
    const  {templateDetails} = props;
    return <Box sx={{ width: '100%' }}>
    <Card sx={{ borderRadius: '7px' }}>
        <div style={{ padding: '20px', borderBottom: '1px solid lightgray', display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ fontWeight: 600, fontSize: '18px', color: '#1a3353f0' }}>
                Template Information
            </div>
        </div>
        <div style={{ padding: '20px', display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
        <div style={{ width: '32%' }}>
                <div className='title2'>Name</div>
                <div className='title3'>
                    {templateDetails?.name || '---'}
                </div>
            </div>
            <div style={{ width: '32%' }}>
                <div className='title2'>Locale</div>
                <div className='title3'>
                    {templateDetails?.locale || '---'}
                </div>
            </div>
        </div>
        <div style={{ padding: '20px', display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
        <div style={{ width: '32%' }}>
                <div className='title2'>Message Body</div>
                <div className='title3'>
                    {templateDetails?.messageBody || '---'}
                </div>
            </div>
            <div style={{ width: '32%' }}>
                <div className='title2'>Message Footer</div>
                <div className='title3'>
                    {templateDetails?.footerText || '---'}
                </div>
            </div>
        </div>
    </Card>
</Box>
}