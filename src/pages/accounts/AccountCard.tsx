
import {Stack, TableRow,TableCell, IconButton,Avatar} from '@mui/material'
import { FaEdit, FaTrashAlt } from 'react-icons/fa';

interface IACCOUNTCARD {
    accountInfo: any;
    showDetails: (id:string)=>void;
    deleteAccount: (id:string)=>void;
    // editAccountDetails: (id:string)=>void;
}

export const AccountCard = (props: IACCOUNTCARD)=>{
    const {showDetails, accountInfo, deleteAccount} = props;
    return <TableRow
    tabIndex={-1}
    sx={{ border: 0, '&:nth-of-type(even)': { backgroundColor: 'whitesmoke' }, color: 'rgb(26, 51, 83)', textTransform: 'capitalize' }}
>
    <TableCell
        className='tableCell-link'
        onClick={() => showDetails(accountInfo.id)}
    >
        {accountInfo?.name ? accountInfo?.name : '---'}
    </TableCell>
    <TableCell className='tableCell'>
        {accountInfo?.website ? accountInfo?.website : '---'}
    </TableCell>
    <TableCell className='tableCell'>
        <Stack style={{ display: 'flex', flexDirection: 'row', alignaccountInfos: "center" }}>
            <Avatar src={accountInfo?.lead?.created_by?.profile_pic} alt={accountInfo?.lead?.created_by?.email} /><Stack sx={{ ml: 1 }}>{accountInfo?.lead?.account_name ? accountInfo?.lead?.account_name : '---'}</Stack>
        </Stack>
    </TableCell>
    <TableCell className='tableCell'>
        {accountInfo?.lead?.country ? accountInfo?.lead?.country : '---'}
    </TableCell>
    <TableCell className='tableCell'>
        {accountInfo?.tags?.length ? accountInfo?.tags.map((tag: any, i: any) => <Stack sx={{ mr: 0.5 }}> Tags(tag)</Stack>) : '---'}
    </TableCell>
    <TableCell className='tableCell'>
        {/* <IconButton>
            <FaEdit
                onClick={() => editAccountDetails(accountInfo?.id)}
                style={{ fill: '#1A3353', cursor: 'pointer', width: '18px' }}
            />
        </IconButton> */}
        <IconButton>
            <FaTrashAlt
                onClick={() => deleteAccount(accountInfo?.id)}
                style={{ fill: '#1A3353', cursor: 'pointer', width: '15px' }} />
        </IconButton>
    </TableCell>
</TableRow>
}