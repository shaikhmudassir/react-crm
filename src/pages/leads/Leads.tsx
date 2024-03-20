import React, { SyntheticEvent, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { Box, Button, Stack, Tabs, Typography, MenuItem, Select } from '@mui/material'
import { LeadUrl } from '../../services/ApiUrls';
import { DeleteModal } from '../../components/DeleteModal';
import { fetchData } from '../../components/FetchData';
import { Spinner } from '../../components/Spinner';
import { FiChevronUp } from '@react-icons/all-files/fi/FiChevronUp';
import { FiChevronDown } from '@react-icons/all-files/fi/FiChevronDown';
import { FiPlus } from "@react-icons/all-files/fi/FiPlus";
import { FiChevronLeft } from "@react-icons/all-files/fi/FiChevronLeft";
import { FiChevronRight } from "@react-icons/all-files/fi/FiChevronRight";
import { CustomTab, CustomToolbar, FabLeft, FabRight } from '../../styles/CssStyled';
import '../../styles/style.css'
import { LeadCard } from './LeadCard';

// import css from './css';
// import emotionStyled from '@emotion/styled';
// import { styled } from '@mui/system';
// import { css } from '@emotion/react';



// margin-bottom: -15px;
//   display: flex;
//   justify-content: space-between;
//   background-color: #1A3353;
// export const formatDate = (dateString: any) => {
//   const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' }
//   return new Date(dateString).toLocaleDateString(undefined, options)
// }
// interface LeadList {
//   drawer: number;
// }
export default function Leads(props: any) {
  // const {drawer}=props
  const navigate = useNavigate()
  const [tab, setTab] = useState('open');
  const [loading, setLoading] = useState(true);

  const [leads, setLeads] = useState([])
  const [valued, setValued] = useState(10)
  const [rowsPerPage, setRowsPerPage] = useState(10)
  const [page, setPage] = useState(0)
  const [initial, setInitial] = useState(true)
  const [order] = useState('asc')
  const [orderBy] = useState('calories')

  const [openLeads, setOpenLeads] = useState([])
  const [openLeadsCount, setOpenLeadsCount] = useState(0)
  const [closedLeads, setClosedLeads] = useState([])
  const [openClosedCount, setClosedLeadsCount] = useState(0)
  const [contacts, setContacts] = useState([])
  const [status, setStatus] = useState([])
  const [source, setSource] = useState([])
  const [companies, setCompanies] = useState([])
  const [tags, setTags] = useState([])
  const [users, setUsers] = useState([])
  const [countries, setCountries] = useState([])
  const [industries, setIndustries] = useState([])

  const [selectOpen, setSelectOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [recordsPerPage, setRecordsPerPage] = useState<number>(10);
  const [totalPages, setTotalPages] = useState<number>(0);

  const [openCurrentPage, setOpenCurrentPage] = useState<number>(1);
  const [openRecordsPerPage, setOpenRecordsPerPage] = useState<number>(10);
  const [openTotalPages, setOpenTotalPages] = useState<number>(0);
  const [openLoading, setOpenLoading] = useState(true);


  const [closedCurrentPage, setClosedCurrentPage] = useState<number>(1);
  const [closedRecordsPerPage, setClosedRecordsPerPage] = useState<number>(10);
  const [closedTotalPages, setClosedTotalPages] = useState<number>(0);
  const [closedLoading, setClosedLoading] = useState(true);

  const [deleteLeadModal, setDeleteLeadModal] = useState(false)
  const [selectedId, setSelectedId] = useState('')

  useEffect(() => {
    if (!!localStorage.getItem('org')) {
      getLeads()
    }
  }, [!!localStorage.getItem('org')]);

  useEffect(() => {
    getLeads()
  }, [openCurrentPage, openRecordsPerPage, closedCurrentPage, closedRecordsPerPage]);
  const getLeads = async () => {
    const Header = {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: localStorage.getItem('Token'),
      org: localStorage.getItem('org')
    }
    try {
      const openOffset = (openCurrentPage - 1) * openRecordsPerPage;
      const closeOffset = (closedCurrentPage - 1) * closedRecordsPerPage;
      await fetchData(`${LeadUrl}/?offset=${tab === "open" ? openOffset : closeOffset}&limit=${tab === "open" ? openRecordsPerPage : closedRecordsPerPage}`, 'GET', null as any, Header)
        .then((res) => {
          // console.log(res, 'leads')
          if (!res.error) {
            // if (initial) {
            setOpenLeads(res?.open_leads?.open_leads)
            setOpenLeadsCount(res?.open_leads?.leads_count)
            setOpenTotalPages(Math.ceil(res?.open_leads?.leads_count / openRecordsPerPage));
            setClosedLeads(res?.close_leads?.close_leads)
            setClosedLeadsCount(res?.close_leads?.leads_count)
            setClosedTotalPages(Math.ceil(res?.close_leads?.leads_count / closedRecordsPerPage));
            setContacts(res?.contacts)
            setStatus(res?.status)
            setSource(res?.source)
            setCompanies(res?.companies)
            setTags(res?.tags)
            setUsers(res?.users)
            setCountries(res?.countries)
            setIndustries(res?.industries)
            setLoading(false)
            // setLeadsList();
            // setInitial(false)
          }
          // else {
          //     // setContactList(Object.assign([], contacts, [data.contact_obj_list]))
          //     setContactList(prevContactList => prevContactList.concat(data.contact_obj_list));
          //     // setContactList(...contactList,data.contact_obj_list)
          //     setLoading(false)
          // }
          // }
        })
    }
    catch (error) {
      console.error('Error fetching data:', error);
    }
  }

  const handleChangeTab = (e: SyntheticEvent, val: any) => {
    setTab(val)
  }
  const handleRecordsPerPage = (event: React.ChangeEvent<HTMLSelectElement>) => {
    if (tab == 'open') {
      setOpenLoading(true)
      setOpenRecordsPerPage(parseInt(event.target.value));
      setOpenCurrentPage(1);
    } else {
      setClosedLoading(true)
      setClosedRecordsPerPage(parseInt(event.target.value));
      setClosedCurrentPage(1);
    }

  };
  const handlePreviousPage = () => {
    if (tab == 'open') {
      setOpenLoading(true)
      setOpenCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
    } else {
      setClosedLoading(true)
      setClosedCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
    }
  };

  const handleNextPage = () => {
    if (tab == 'open') {
      setOpenLoading(true)
      setOpenCurrentPage((prevPage) => Math.min(prevPage + 1, openTotalPages));
    } else {
      setClosedLoading(true)
      setClosedCurrentPage((prevPage) => Math.min(prevPage + 1, closedTotalPages));
    }
  };
  const onAddHandle = () => {
    if (!loading) {
      navigate('/app/leads/add-leads', {
        state: {
          detail: false,
          contacts: contacts || [], status: status || [], source: source || [], companies: companies || [], tags: tags || [], users: users || [], countries: countries || [], industries: industries || []
          // status: leads.status, source: leads.source, industry: leads.industries, users: leads.users, tags: leads.tags, contacts: leads.contacts 
        }
      })
    }
  }

  const openLeadDetails = (leadId: any) => {
    navigate(`/app/leads/lead-details`, { state: { leadId, detail: true, contacts: contacts || [], status: status || [], source: source || [], companies: companies || [], tags: tags || [], users: users || [], countries: countries || [], industries: industries || [] } })
    // navigate('/app/leads/lead-details', { state: { leadId: leadItem.id, edit: storeData, value } })
  }
  const deleteLead = (deleteId: any) => {
    setDeleteLeadModal(true)
    setSelectedId(deleteId)
  }

  const deleteLeadModalClose = () => {
    setDeleteLeadModal(false)
    setSelectedId('')
  }
  const modalDialog = 'Are You Sure You want to delete selected Lead?'
  const modalTitle = 'Delete Lead'

  const deleteItem = () => {
    const Header = {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: localStorage.getItem('Token'),
      org: localStorage.getItem('org')
    }
    fetchData(`${LeadUrl}/${selectedId}/`, 'DELETE', null as any, Header)
      .then((res: any) => {
        // console.log('delete:', res);
        if (!res.error) {
          deleteLeadModalClose()
          getLeads()
        }
      })
      .catch(() => {
      })
  }

  const recordsList = [[10, '10 Records per page'], [20, '20 Records per page'], [30, '30 Records per page'], [40, '40 Records per page'], [50, '50 Records per page']]
  return (
    <Box sx={{
      mt: '60px',
      // width: '1370px' 
    }}>

      <CustomToolbar>
        <Tabs defaultValue={tab} onChange={handleChangeTab} sx={{ mt: '26px' }}>
          <CustomTab value="open" label="Open"
            sx={{
              backgroundColor: tab === 'open' ? '#F0F7FF' : '#284871',
              color: tab === 'open' ? '#3f51b5' : 'white',
            }} />
          <CustomTab value="closed" label="Closed"
            sx={{
              backgroundColor: tab === 'closed' ? '#F0F7FF' : '#284871',
              color: tab === 'closed' ? '#3f51b5' : 'white',
              ml: '5px',
            }}
          />
        </Tabs>

        <Stack sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
          <Select
            value={tab === 'open' ? openRecordsPerPage : closedRecordsPerPage}
            onChange={(e: any) => handleRecordsPerPage(e)}
            open={selectOpen}
            onOpen={() => setSelectOpen(true)}
            onClose={() => setSelectOpen(false)}
            className={`custom-select`}
            onClick={() => setSelectOpen(!selectOpen)}
            IconComponent={() => (
              <div onClick={() => setSelectOpen(!selectOpen)} className="custom-select-icon">
                {selectOpen ? <FiChevronUp style={{ marginTop: '12px' }} /> : <FiChevronDown style={{ marginTop: '12px' }} />}
              </div>
            )}
            sx={{
              '& .MuiSelect-select': { overflow: 'visible !important' }
            }}
          >
            {recordsList?.length && recordsList.map((item: any, i: any) => (
              <MenuItem key={i} value={item[0]}>
                {item[1]}
              </MenuItem>
            ))}
          </Select>
          <Box sx={{ borderRadius: '7px', backgroundColor: 'white', height: '40px', minHeight: '40px', maxHeight: '40px', display: 'flex', flexDirection: 'row', alignItems: 'center', mr: 1, p: '0px' }}>
            <FabLeft onClick={handlePreviousPage} disabled={tab === 'open' ? openCurrentPage === 1 : closedCurrentPage === 1}>
              <FiChevronLeft style={{ height: '15px' }} />
            </FabLeft>
            <Typography sx={{ mt: 0, textTransform: 'lowercase', fontSize: '15px', color: '#1A3353', textAlign: 'center' }}>
              {tab === 'open' ? `${openCurrentPage} to ${openTotalPages}` : `${closedCurrentPage} to ${closedTotalPages}`}

            </Typography>
            <FabRight onClick={handleNextPage} disabled={tab === 'open' ? (openCurrentPage === openTotalPages) : (closedCurrentPage === closedTotalPages)}>
              <FiChevronRight style={{ height: '15px' }} />
            </FabRight>
          </Box>
          <Button
            variant='contained'
            startIcon={<FiPlus className='plus-icon' />}
            onClick={onAddHandle}
            className={'add-button'}
          >
            Add Lead
          </Button>
        </Stack>
      </CustomToolbar>
      <Box sx={{ p: '10px', mt: '5px' }}>
      {tab === 'open' ?  
          openLeads?.length ? openLeads.map((item: any, index: any) => <LeadCard key={index} lead={item} openLead={openLeadDetails}
          deleteLead={deleteLead}/>
          ) : <h1>No Open Leads</h1>
         :   
          closedLeads?.length ? closedLeads.map((item: any, index: any) => <LeadCard key={index} lead={item} openLead={openLeadDetails}
          deleteLead={deleteLead}/>
          ):
          <h1>No Closed Leads</h1>
        }
        </Box>
      <DeleteModal
        onClose={deleteLeadModalClose}
        open={deleteLeadModal}
        id={selectedId}
        modalDialog={modalDialog}
        modalTitle={modalTitle}
        DeleteItem={deleteItem}
      />
    </Box>
  )
}
