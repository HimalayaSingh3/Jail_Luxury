"use client"
import * as React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';
import { useTheme } from '@mui/material/styles';

const StyledBox = styled(Box)(({ theme }) => ({
  width: '100%',
  backgroundColor: theme.palette.background.default,
  color:theme.typography.color,
}));

const StyledTabs = styled(Tabs)(({ theme }) => ({
  borderBottom: `1px solid ${theme.palette.divider}`,
  width: '90vw',
  margin: "0 5vw 0 5vw",
  
}));

const StyledTabPanel = styled('div')(({ theme }) => ({
  padding: theme.spacing(3),
  
  width:"90vw",
  margin: "0 5vw 0 5vw",
}));

function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <StyledTabPanel
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box>{children}</Box>}
    </StyledTabPanel>
  );
}

CustomTabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

export default function PdTabComp({ moreDetails = "" }) {
  const [value, setValue] = React.useState(0);
  const theme = useTheme();

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <StyledBox>
      <StyledTabs value={value} onChange={handleChange} aria-label="basic tabs example">
  <Tab label="More Details" {...a11yProps(0)} sx={{ color: 'primary.main' }} />
  <Tab label="Customer Reviews" {...a11yProps(1)} sx={{ color: 'primary.main' }} />
</StyledTabs>
      <CustomTabPanel value={value} index={0}>
        {moreDetails}
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
       No Data Available
      </CustomTabPanel>
    </StyledBox>
  );
}