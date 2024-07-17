import { Box, Button, Card, Stack, Tab, Table, TableBody, TableContainer, TableHead, TablePagination, TableRow, Tabs, Toolbar, Typography, Paper, Select, MenuItem, MenuProps, FormControl, InputLabel, InputBase, styled, TableCell, TableSortLabel, Container } from '@mui/material'
import React, { SyntheticEvent, useEffect, useState } from 'react'
import { FiPlus } from "@react-icons/all-files/fi/FiPlus";
import { FiChevronLeft } from "@react-icons/all-files/fi/FiChevronLeft";
import { FiChevronRight } from "@react-icons/all-files/fi/FiChevronRight";
import { getComparator, stableSort } from '../../components/Sorting';
import { Spinner } from '../../components/Spinner';
import { fetchData } from '../../components/FetchData';
import { TemplateUrl, TemplatesUrl } from '../../services/ApiUrls';
import { AntSwitch, CustomTab, CustomToolbar, FabLeft, FabRight, StyledTableCell, StyledTableRow } from '../../styles/CssStyled';
import { useNavigate } from 'react-router-dom';
import { FaEye, FaLink, FaTrashAlt } from 'react-icons/fa';
import { DeleteModal } from '../../components/DeleteModal';
import { FiChevronUp } from '@react-icons/all-files/fi/FiChevronUp';
import { FiChevronDown } from '@react-icons/all-files/fi/FiChevronDown';
import { EnhancedTableHead } from '../../components/EnchancedTableHead';
import { sampleTemplatesList } from './types';
// import { DeleteModal } from './DeleteModal';

interface HeadCell {
    disablePadding: boolean;
    id: any;
    label: string;
    numeric: boolean;
}

const headCells: readonly HeadCell[] = [
    {
        id: '',
        numeric: false,
        disablePadding: false,
        label: '#'
    },
    {
        id: 'name',
        numeric: false,
        disablePadding: false,
        label: 'Template Name'
    },
    {
        id: 'type',
        numeric: false,
        disablePadding: false,
        label: 'Type'
    },
    {
        id: 'status',
        numeric: false,
        disablePadding: false,
        label: 'Status'
    },
    {
        id: 'actions',
        numeric: false,
        disablePadding: false,
        label: 'Actions'
    },
    {
        id: 'updatedAt',
        numeric: false,
        disablePadding: false,
        label: 'Updated At'
    }
]

export default function Template() {
    const navigate = useNavigate()
    const [loading, setLoading] = useState(true);
    const [templateList, setTemplateList] = useState<any>([]);
    const [page, setPage] = useState(0)
    const [rowsPerPage, setRowsPerPage] = useState(10)

    const [deleteRowModal, setDeleteRowModal] = useState(false)

    const [selected, setSelected] = useState<string[]>([]);
    const [selectedId, setSelectedId] = useState('')
    const [isSelectedId, setIsSelectedId] = useState([])
    const [order, setOrder] = useState('asc')
    const [orderBy, setOrderBy] = useState('name')

    const [selectOpen, setSelectOpen] = useState(false);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [recordsPerPage, setRecordsPerPage] = useState<number>(10);
    const [totalPages, setTotalPages] = useState<number>(0);


    useEffect(() => {
        getTemplate()
    }, [])

    const handleChangePage = (event: any, newPage: any) => {
        setPage(newPage)
    }

    const handleChangeRowsPerPage = (event: any) => {
        setRowsPerPage(parseInt(event.target.value, 10))
        setPage(0)
    }

    const getTemplate = () => {
        const Header = {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: localStorage.getItem('Token'),
            org: localStorage.getItem('org')
          }
        fetchData(`${TemplatesUrl}`, 'GET', null as any, Header)
            .then((data) => {
                if (!data.error) {
                    // setTemplateList(data.data);
                    setTemplateList(sampleTemplatesList);
                    setLoading(false)
                }
            }).catch(()=>setTemplateList(sampleTemplatesList))
    }

    const handleRequestSort = (event: any, property: any) => {
        const isAsc = orderBy === property && order === 'asc'
        setOrder(isAsc ? 'desc' : 'asc')
        setOrderBy(property)
    }

    const DeleteItem = () => {
        const Header = {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: localStorage.getItem('Token'),
            org: localStorage.getItem('org')
          }
        fetchData(`${TemplateUrl}/${selectedId}`, 'DELETE', null as any, Header)
            .then((res: any) => {
                if (!res.error) {
                    deleteRowModalClose()
                    getTemplate()
                }
            })
            .catch(() => {
            })
    }

    const handlePreviousPage = () => {
        setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
    };

    const handleNextPage = () => {
        setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages));
    };

    const handleRecordsPerPageChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setRecordsPerPage(parseInt(event.target.value));
        setCurrentPage(1);
    };
    const renderPageNumbers = () => {
        const pageNumbers = [];
        if (totalPages <= 1) return null;
        for (let i = 1; i <= totalPages; i++) {
            if (
                i === 1 ||
                i === totalPages ||
                (i >= currentPage - 1 && i <= currentPage + 1) ||
                (i <= 2 && currentPage <= 4) ||
                (i >= totalPages - 1 && currentPage >= totalPages - 3)
            ) {
                pageNumbers.push(
                    <button
                        key={i}
                        onClick={() => setCurrentPage(i)}
                        className={i === currentPage ? 'active' : ''}
                    >
                        {i}
                    </button>
                );
            } else if ((i === 3 && currentPage > 4) || (i === totalPages - 2 && currentPage < totalPages - 3)) {
                pageNumbers.push(<span key={-i}>...</span>);
            }
        }
        return pageNumbers;
    };

    const addTemplate = () => {
            navigate('/app/templates/add-template')
    }

    const templateDetails = (templateId: any) => {
        navigate(`/app/templates/template-details`, { state: { templateId, detail: true } })
    }

    const deleteRow = (deleteId: any) => {
        setDeleteRowModal(true)
        setSelectedId(deleteId)
    }
    const deleteRowModalClose = () => {
        setDeleteRowModal(false)
        setSelectedId('')
    }

    const copyLink = (templateId: any)=>{

    }
    const modalDialog = 'Are You Sure you want to delete this template?'
    const modalTitle = 'Delete Template'

    const recordsList = [[10, '10 Records per page'], [20, '20 Records per page'], [30, '30 Records per page'], [40, '40 Records per page'], [50, '50 Records per page']]

    return (
        <Box sx={{ mt: '60px' }}>
            <CustomToolbar sx={{ flexDirection: 'row-reverse' }}>
                <Stack sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                    <Select
                        value={recordsPerPage}
                        onChange={(e: any) => setRecordsPerPage(e.target.value)}
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
                            <MenuItem key={i} value={item[0]} >
                                {item[1]}
                            </MenuItem>
                        ))}
                    </Select>
                    <Box sx={{ borderRadius: '7px', backgroundColor: 'white', height: '40px', minHeight: '40px', maxHeight: '40px', display: 'flex', flexDirection: 'row', alignItems: 'center', mr: 1, p: '0px' }}>
                        <FabLeft onClick={handleNextPage} disabled={currentPage === totalPages}>
                            <FiChevronLeft
                                style={{ height: '15px' }}
                            />
                        </FabLeft>
                        <Typography sx={{ mt: 0, textTransform: 'lowercase', fontSize: '15px', color: '#1A3353', textAlign: 'center' }}>
                            0 to 1
                        </Typography>
                        <FabRight onClick={handleNextPage} disabled={currentPage === totalPages}>
                            <FiChevronRight style={{ height: '15px' }} />
                        </FabRight>
                    </Box>
                    <Button
                        variant='contained'
                        startIcon={<FiPlus className='plus-icon' />}
                        onClick={addTemplate}
                        className={'add-button'}
                    >
                        Add Template
                    </Button>
                </Stack>
            </CustomToolbar>
            <Container sx={{ width: '100%', maxWidth: '100%', minWidth: '100%' }}>
                <Box sx={{ width: '100%', minWidth: '100%', m: '15px 0px 0px 0px' }}>
                    <Paper sx={{ width: 'cal(100%-15px)', mb: 2, p: '0px 15px 15px 15px' }}>
                        <TableContainer >
                            <Table sx={{ minWidth: 600 }} aria-label='customized table'>
                                <EnhancedTableHead
                                    numSelected={selected.length}
                                    order={order}
                                    orderBy={orderBy}
                                    // onSelectAllClick={tab === 0 ? handleSelectAllClick : ''}
                                    // onSelectAllClick={''}
                                    onRequestSort={handleRequestSort}
                                    // rowCount={tab === 0 ? usersData.active_users_count : usersData.inactive_users_count}
                                    numSelectedId={selectedId}
                                    isSelectedId={isSelectedId}
                                    headCells={headCells}
                                />
                                {/* <TableHead>
                            <TableRow>
                                <StyledTableCell style={{ fontWeight: 'bold', fontSize: '13p', color: '#1A3353' }}>Name</StyledTableCell>
                                <StyledTableCell style={{ fontWeight: 'bold', fontSize: '13p', color: '#1A3353' }}>Email</StyledTableCell>
                                <StyledTableCell style={{ fontWeight: 'bold', fontSize: '13p', color: '#1A3353' }}>Phone Number</StyledTableCell>
                                 <StyledTableCell style={{ fontWeight: 'bold', fontSize: '13p', color: '#1A3353' }}>Do Not Call</StyledTableCell> 
                        <StyledTableCell style={{ fontWeight: 'bold', fontSize: '13p', color: '#1A3353' }}>Action</StyledTableCell>
                    </TableRow>
                </TableHead> */}
                                <TableBody>
                                    {
                                        templateList?.length
                                            ? stableSort(templateList, getComparator(order, orderBy))
                                                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((item: any, index: any) => (
                                                    <TableRow
                                                        tabIndex={-1}
                                                        key={index}
                                                        sx={{ border: 0, '&:nth-of-type(even)': { backgroundColor: 'whitesmoke' }, color: 'rgb(26, 51, 83)', textTransform: 'capitalize' }}>
                                                        <TableCell align='left' sx={{ border: 0, color: 'rgb(26, 51, 83)' }}>{index + 1}</TableCell>
                                                        <TableCell align='left' sx={{ cursor: 'pointer', color: '#3E79F7', textTransform: 'none', border: 0 }} onClick={() => templateDetails(item.templateId)}>{item.name}</TableCell>
                                                        <TableCell align='left' sx={{ border: 0, color: 'rgb(26, 51, 83)' }}>{item.type}</TableCell>
                                                        <TableCell align='left' sx={{ border: 0, color: 'rgb(26, 51, 83)' }}>{item.status}</TableCell>
                                                        <TableCell align='left' sx={{ border: 0, color: 'rgb(26, 51, 83)' }}>
                                                            <FaTrashAlt style={{ cursor: 'pointer' }} onClick={() => deleteRow(item.templateId)}/>
                                                            <FaEye style={{ cursor: 'pointer' }} onClick={() => templateDetails(item.templateId)}/>
                                                            <FaLink style={{ cursor: 'pointer' }} onClick={() => copyLink(item.templateId)}/>
                                                        </TableCell>
                                                        <TableCell align='left' sx={{ border: 0, color: 'rgb(26, 51, 83)' }}>{item.updatedAt}</TableCell>
                                                    </TableRow>
                                                ))
                                            : <TableRow> <TableCell colSpan={6} sx={{ border: 0 }}><Spinner /></TableCell></TableRow>
                                    }
                                </TableBody>
                            </Table>
                        </TableContainer>

                    </Paper>
                </Box>
            </Container>
            {
                <DeleteModal
                    onClose={deleteRowModalClose}
                    open={deleteRowModal}
                    id={selectedId}
                    modalDialog={modalDialog}
                    modalTitle={modalTitle}
                    DeleteItem={DeleteItem}
                />
            }
        </Box >
    )
}
