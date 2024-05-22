import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box } from '@mui/material';
import Sidebar from '../../components/Sidebar';
import Organization from '../organization/Organization';
import { fetchData } from '../../components/FetchData';
import { OrgUrl } from '../../services/ApiUrls';
interface Item {
  org: {
      id: any;
      name: any;
  };
}
export const Home = (props: any) => {
  const navigate = useNavigate();
  const [org, setOrg] = useState(false);
  
  const headers = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    Authorization: localStorage.getItem('Token'),
  };
  // const [localStorageChange, setLocalStorageChange] = useState(false);

  // useEffect(() => {
  //   const handleStorageChange = () => {
  //     setLocalStorageChange(true);
  //   };

  //   window.addEventListener('storage', handleStorageChange);

  //   return () => {
  //     window.removeEventListener('storage', handleStorageChange);
  //   };
  // }, []);
  useEffect(() => {
    if (!localStorage.getItem('Token')) {
      navigate('/login');
    } else if (!localStorage.getItem('org')) {
      setOrg(false);
    } else if (localStorage.getItem('Token') && localStorage.getItem('org')) {
      setOrg(true);
    }
  }, [navigate]);

  const getOrganization = () => {
    fetchData(`${OrgUrl}/`, 'GET', null as any, headers)
      .then((res: any) => {
        if (res?.profile_org_list) {
          const org: Item = res?.profile_org_list[0];
          localStorage.setItem('org', org?.org?.id);
          if (localStorage.getItem('org')) {
            navigate('/');
          }
        }
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };

  useEffect(() => {
    if (!localStorage.getItem('Token')) {
      navigate('/login');
    } else {
      getOrganization();
    }
  }, []);
  // useEffect(() => {
  //   const token = localStorage.getItem('Token');
  //   const organization = localStorage.getItem('org');
  //   if (!token || !organization) {
  //     navigate('/login');
  //   } else if(!organization){
  //     navigate('/organization')
  //   }
  // }, [navigate]);
  return (
    <Box sx={{}}>
      {org && (
        <Sidebar
          // handleDrawerClose={() => handleDrawerClose}
          open={true}
        />
      ) }
    </Box>
  );
};
