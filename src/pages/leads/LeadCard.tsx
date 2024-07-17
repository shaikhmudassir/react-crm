import React from 'react';
import { Avatar, AvatarGroup, Box, Stack, Link } from '@mui/material';
import { Label } from '../../components/Label';
import FormateTime from '../../components/FormateTime';
import { FaTrashAlt } from 'react-icons/fa';

interface ILEADCARD{
    lead:any,
    openLead:(leadId:string)=>void,
    deleteLead: (leadId:string)=>void
}
export const LeadCard = (props: ILEADCARD) => {
  const { lead, openLead, deleteLead } = props;
  return (
    lead && <Box>
      <Box className="lead-box">
        <Box className="lead-box1">
          <Stack className="lead-row1">
            <div
              style={{
                color: '#1A3353',
                fontSize: '1rem',
                fontWeight: '500',
                cursor: 'pointer',
              }}
              onClick={() => openLead(lead?.id)}
            >
              {lead?.title}
            </div>
            <div onClick={() => deleteLead(lead?.id)}>
              <FaTrashAlt style={{ cursor: 'pointer', color: 'gray' }} />
            </div>
          </Stack>
          <Stack className="lead-row2">
            <div className="lead-row2-col1">
              <div
                style={{
                  color: 'gray',
                  fontSize: '16px',
                  textTransform: 'capitalize',
                }}
              >
                {lead?.country || ''} - source{' '}
                <span style={{ color: '#1a3353', fontWeight: 500 }}>
                  {lead?.source || '--'}
                </span>{' '}
                - status{' '}
                <span style={{ color: '#1a3353', fontWeight: 500 }}>
                  {lead?.status || '--'}
                </span>
              </div>
              <Box
                sx={{
                  ml: 1,
                  //  flexWrap: 'wrap', width: '50%'
                }}
              >
                {lead?.tags.map((tagData: any, index: any) => (
                  // tag.slice(0, 3).map((tagData: any, index: any) => (
                  <Label tags={tagData} key={index} />
                ))}
                {lead?.tags.length > 4 ? (
                  <Link sx={{ ml: 1 }}>+{lead?.tags.length - 4}</Link>
                ) : (
                  ''
                )}
              </Box>
              <Box sx={{ ml: 1 }}>
                <div style={{ display: 'flex' }}>
                  <AvatarGroup
                    // total={2}
                    max={3}
                  >
                    {/* <Tooltip title={con.user.username}> */}
                    {/* {tag.map((tagData: any, index: any) => ( */}
                    {lead?.team &&
                      lead?.team?.map((team: any, index: any) => (
                        <Avatar alt={team} src={team}>
                          {team}
                        </Avatar>
                      ))}
                    {/* </Tooltip> */}
                    {/* )} */}
                  </AvatarGroup>
                </div>
              </Box>
              {/* {
                    lead?.assigned_to.map((assignlead: any, index: any) => (
                        assignlead?.user_details.profile_pic
                        ? <Avatar alt='Remy Sharp'
                            src={assignlead?.user_details.profile_pic}
                        />
                        : <Avatar alt='Remy Sharp'
                            size='small'
                        // sx={{ backgroundColor: 'deepOrange', color: 'white', textTransform: 'capitalize', mt: '-20px', ml: '10px' }}
                        >
                            {assignlead?.user_details.first_name.charAt(0)}
                        </Avatar>
                    ))
                    } */}
            </div>
            <div className="lead-row2-col2">
              {/* created on {formatDate(lead?.created_on)} by   &nbsp;<span> */}
              created&nbsp; {FormateTime(lead?.created_at)}&nbsp; by
              <Avatar
                alt={lead?.first_name}
                src={lead?.created_by?.profile_pic}
                sx={{ ml: 1 }}
                // style={{
                //   height: '20px',
                //   width: '20px'
                // }}
              />{' '}
              &nbsp;&nbsp;{lead?.first_name}&nbsp;{lead?.last_name}
            </div>
          </Stack>
        </Box>
      </Box>
    </Box>
  );
};
