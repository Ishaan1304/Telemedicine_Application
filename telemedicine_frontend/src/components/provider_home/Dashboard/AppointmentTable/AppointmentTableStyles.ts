import { SxProps, Theme } from '@mui/material';

export const tableContainerStyle: SxProps<Theme> = {
  padding: "20px",
  height: '280px',
  boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
  borderRadius: '8px',
  overflow: "scroll",
};

export const textFieldStyle: SxProps<Theme> = {
  width: '250px',
  marginLeft: "20px",
  marginTop:1 
};

export const tableStyle: SxProps<Theme> = {
  minWidth: 650,
  height:5,
};

export const tableRowStyle: SxProps<Theme> = {
  height: 5,
  transition: 'background-color 0.3s, transform 0.2s',
  '&:nth-of-type(odd)': {
    backgroundColor: '#f9f9f9',
  },
  '&:hover': {
    backgroundColor: '#e0f7fa',
    transform: 'scale(1.02)',
  },
};

export const tableHeadStyle: SxProps<Theme> = {
  height: 5,
};

export const actionButtonStyle: SxProps<Theme> = {
  width: "90px",
  backgroundColor: '#007bff',
  color: '#fff',
  '&:hover': {
    backgroundColor: '#0056b3',
    transform: 'scale(1.0)',
  },
};

export const containerStyle: SxProps<Theme> = {
  border: "1px solid #ddd",
  borderRadius: '8px',
  overflow: 'hidden',
};
