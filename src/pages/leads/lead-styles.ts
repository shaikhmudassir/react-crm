import { Tab, TablePagination, Toolbar} from '@mui/material'
import styled from '@emotion/styled';

const CustomTablePagination = styled(TablePagination)`
.MuiToolbar-root {
  min-width: 100px;
}
.MuiTablePagination-toolbar {
  background-color: #f0f0f0;
  color: #333;
}
.MuiTablePagination-caption {
  color: #999;
}
'.MuiTablePagination-displayedRows': {
  display: none;
}
'.MuiTablePagination-actions': {
  display: none;
}
'.MuiTablePagination-selectLabel': {
  margin-top: 4px;
  margin-left: -15px;
}
'.MuiTablePagination-select': {
  color: black;
  margin-right: 0px;
  margin-left: -12px;
  margin-top: -6px;
}
'.MuiSelect-icon': {
  color: black;
  margin-top: -5px;
}
background-color: white;
border-radius: 1;
height: 10%;
overflow: hidden;
padding: 0;
margin: 0;
width: 39%;
padding-bottom: 5;
color: black;
margin-right: 1;
`;


const Tabss = styled(Tab)({
  height: '34px',
  textDecoration: 'none',
  fontWeight: 'bold'
});

const ToolbarNew = styled(Toolbar)({
  minHeight: '48px', height: '48px', maxHeight: '48px',
  width: '100%', display: 'flex', justifyContent: 'space-between', backgroundColor: '#1A3353',
  '& .MuiToolbar-root': { minHeight: '48px !important', height: '48px !important', maxHeight: '48px !important' },
  '@media (min-width:600px)': {
    '& .MuiToolbar-root': {
      minHeight: '48px !important', height: '48px !important', maxHeight: '48px !important'
    }
  }
});