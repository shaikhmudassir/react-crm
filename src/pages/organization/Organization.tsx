import React, { useEffect } from 'react'
import { Box, Container } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import '../../styles/style.css'
import { OrgUrl } from '../../services/ApiUrls';
import { fetchData } from '../../components/FetchData';

interface Item {
    org: {
        id: any;
        name: any;
    };
}

export default function Organization() {
    const navigate = useNavigate()
    const headers = {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: localStorage.getItem('Token')
    }
    const getOrganization = () => {
        fetchData(`${OrgUrl}/`, 'GET', null as any, headers)
            .then((res: any) => {
                if (res?.profile_org_list) {
                    const org:Item = res?.profile_org_list[0]
                    localStorage.setItem('org', org?.org?.id)
                    if (localStorage.getItem('org')) {
                        navigate('/')
                    }
                }
            })
            .catch((error) => {
                console.error('Error:', error)
            })
    }
    useEffect(() => {
        if (!localStorage.getItem('Token')) {
            navigate('/login')
        } else {
            getOrganization();
        }
    }, [])

    return (
        <Box>
            <Container sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                {/* <OrganizationModal
                    open={organizationModal}
                    handleClose={handleClose}
                /> */}
                {/* <Card>
                    <List>
                        {
                            organization?.length > 0 &&
                            organization.map((item, i) => (
                                <ListItem key={i}>
                                    <StyledListItemButton onClick={() => selectedOrganization(item?.org?.id)}>
                                        <StyledListItemText>
                                            {item?.org?.name}
                                        </StyledListItemText>
                                    </StyledListItemButton>
                                </ListItem>
                            ))}
                    </List>
                </Card> */}
            </Container>
        </Box>

    )
}