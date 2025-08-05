"use client";
import React, { useState } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  InputBase,
  Tabs,
  Tab,
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Avatar,
  TablePagination,
  Menu,
  MenuItem,
  Button,
  Badge,
} from '@mui/material';
import { styled, alpha } from '@mui/material/styles';
import SearchIcon from '@mui/icons-material/Search';
import NotificationsIcon from '@mui/icons-material/Notifications';
import AccountCircle from '@mui/icons-material/AccountCircle';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import AddIcon from '@mui/icons-material/Add';
import DescriptionIcon from '@mui/icons-material/Description'; // For Excel File icon
import SortIcon from '@mui/icons-material/Sort'; // For Sorting By icon

// Styled components for the search bar
const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(3),
    width: 'auto',
  },
  border: '1px solid #e0e0e0', // Light grey border
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: theme.palette.grey[500], // Grey icon color
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '30ch', // Increased width for better visibility
    },
  },
}));

// Sample Data for the table
const rows = [
  {
    id: 1,
    customerName: 'Esther Howard',
    customerAddress: '3881 Ranchview Dr. Richardson, California',
    noOrder: '22227',
    orderStatus: 'In process',
    orderDate: '14.04.01.15',
    details: [
      'https://placehold.co/40x40/FF6347/FFFFFF?text=P1',
      'https://placehold.co/40x40/4682B4/FFFFFF?text=P2',
      'https://placehold.co/40x40/32CD32/FFFFFF?text=P3',
    ],
  },
  {
    id: 2,
    customerName: 'Jane Cooper',
    customerAddress: '2972 Westheimer Rd. Santa Ana, Illinois',
    noOrder: '22227',
    orderStatus: 'In process',
    orderDate: '14.04.01.15',
    details: [
      'https://placehold.co/40x40/FFD700/000000?text=P4',
      'https://placehold.co/40x40/DA70D6/FFFFFF?text=P5',
      'https://placehold.co/40x40/8A2BE2/FFFFFF?text=P6',
    ],
  },
  {
    id: 3,
    customerName: 'Jenny Wilson',
    customerAddress: '2464 Royal Ln. Mesa, New Jersey 45463',
    noOrder: '22227',
    orderStatus: 'In process',
    orderDate: '14.04.01.15',
    details: [
      'https://placehold.co/40x40/FF69B4/FFFFFF?text=P7',
      'https://placehold.co/40x40/00CED1/FFFFFF?text=P8',
      'https://placehold.co/40x40/FF4500/FFFFFF?text=P9',
    ],
  },
  {
    id: 4,
    customerName: 'Cameron Williamson',
    customerAddress: '2118 Thornridge Cir. Syracuse, Connecticut',
    noOrder: '22227',
    orderStatus: 'In process',
    orderDate: '14.04.01.15',
    details: [
      'https://placehold.co/40x40/808000/FFFFFF?text=P10',
      'https://placehold.co/40x40/4B0082/FFFFFF?text=P11',
      'https://placehold.co/40x40/20B2AA/FFFFFF?text=P12',
    ],
  },
  {
    id: 5,
    customerName: 'Devon Lane',
    customerAddress: '2715 Ash Dr. San Jose, South Dakota 83475',
    noOrder: '22227',
    orderStatus: 'In process',
    orderDate: '14.04.01.15',
    details: [
      'https://placehold.co/40x40/B22222/FFFFFF?text=P13',
      'https://placehold.co/40x40/FF8C00/FFFFFF?text=P14',
      'https://placehold.co/40x40/8B0000/FFFFFF?text=P15',
    ],
  },
  {
    id: 6,
    customerName: 'Darrell Steward',
    customerAddress: '1901 Thornridge Cir. Stitch, Hawaii 81063',
    noOrder: '22227',
    orderStatus: 'In process',
    orderDate: '14.04.01.15',
    details: [
      'https://placehold.co/40x40/7CFC00/000000?text=P16',
      'https://placehold.co/40x40/00BFFF/FFFFFF?text=P17',
      'https://placehold.co/40x40/DC143C/FFFFFF?text=P18',
    ],
  },
  {
    id: 7,
    customerName: 'Darlene Robertson',
    customerAddress: '3517 W. Gray St. Utica, Pennsylvania 57867',
    noOrder: '22227',
    orderStatus: 'In process',
    orderDate: '14.04.01.15',
    details: [
      'https://placehold.co/40x40/FF6347/FFFFFF?text=P19',
      'https://placehold.co/40x40/4682B4/FFFFFF?text=P20',
      'https://placehold.co/40x40/32CD32/FFFFFF?text=P21',
    ],
  },
];

export default function App() {
  const [value, setValue] = useState(0);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5); // Adjust rows per page as needed
  const [anchorEl, setAnchorEl] = useState(null);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  return (
    <Box sx={{ flexGrow: 1, backgroundColor: '#f5f5f5', minHeight: '100vh' }}>
      {/* Top AppBar */}
      <AppBar position="static" color="transparent" elevation={0} sx={{ borderBottom: '1px solid #e0e0e0' }}>
        <Toolbar>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' }, color: '#333' }}
          >
            Order management
          </Typography>
          <IconButton size="large" aria-label="show 4 new mails" color="inherit">
            <Badge badgeContent={4} color="error">
              <NotificationsIcon sx={{ color: '#555' }} />
            </Badge>
          </IconButton>
          <IconButton
            size="large"
            edge="end"
            aria-label="account of current user"
            aria-haspopup="true"
            color="inherit"
          >
            <Avatar alt="UserProfile" src="" />
          </IconButton>
          <Typography variant="body1" sx={{ ml: 1, color: '#333' }}>UserProfile</Typography>
        </Toolbar>
      </AppBar>

      {/* Main Content Area */}
      <Box sx={{ p: 3 }}>
        <Paper sx={{ p: 2, borderRadius: '8px' }}>
          {/* Search and Excel File Section */}
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
            <Search>
              <SearchIconWrapper>
                <SearchIcon />
              </SearchIconWrapper>
              <StyledInputBase
                placeholder="Search Orders"
                inputProps={{ 'aria-label': 'search' }}
              />
            </Search>
            <Button
              variant="outlined"
              startIcon={<DescriptionIcon />}
              sx={{
                textTransform: 'none',
                borderColor: '#e0e0e0',
                color: '#555',
                '&:hover': {
                  borderColor: '#ccc',
                },
                borderRadius: '8px',
              }}
            >
              Excel File
            </Button>
          </Box>

          {/* Tabs Section */}
          <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 2 }}>
            <Tabs
              value={value}
              onChange={handleChange}
              aria-label="order status tabs"
              // Add flexGrow to tabs to distribute space evenly
              sx={{
                '& .MuiTabs-flexContainer': {
                  justifyContent: 'space-between', // Distribute items evenly
                },
                '& .MuiTab-root': {
                  flexGrow: 1, // Allow tabs to grow and fill space
                  minWidth: 0, // Ensure tabs can shrink if needed
                }
              }}
            >
              <Tab label="Pending" />
              <Tab label="Send" />
              <Tab label="Cancelled" />
              <Tab label="Closed" />
            </Tabs>
          </Box>

          {/* Table and Sorting Section */}
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 2 }}>
            <Button
              variant="outlined"
              startIcon={<SortIcon />}
              sx={{
                textTransform: 'none',
                borderColor: '#e0e0e0',
                color: '#555',
                '&:hover': {
                  borderColor: '#ccc',
                },
                borderRadius: '8px',
              }}
            >
              Sorting By
            </Button>
          </Box>

          {/* Data Table */}
          <TableContainer component={Paper} sx={{ borderRadius: '8px', boxShadow: 'none', border: '1px solid #e0e0e0' }}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead sx={{ backgroundColor: '#f9f9f9' }}>
                <TableRow>
                  <TableCell>Customer Name</TableCell>
                  <TableCell>NO. Order</TableCell>
                  <TableCell>Order Status</TableCell>
                  <TableCell>Order Date</TableCell>
                  <TableCell sx={{ pl: 10 }}>Details</TableCell>
                  <TableCell></TableCell> 
                  <TableCell></TableCell> 
                </TableRow>
              </TableHead>
              <TableBody>
                {(rowsPerPage > 0
                  ? rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  : rows
                ).map((row) => (
                  <TableRow
                    key={row.id}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      <Typography variant="subtitle1" fontWeight="medium">{row.customerName}</Typography>
                      <Typography variant="body2" color="text.secondary">{row.customerAddress}</Typography>
                    </TableCell>
                    <TableCell>{row.noOrder}</TableCell>
                    <TableCell>
                      <Button
                        variant="contained"
                        sx={{
                          backgroundColor: '#e0f7fa', // Light blue background
                          color: '#00796b', // Dark teal text
                          borderRadius: '16px',
                          textTransform: 'none',
                          boxShadow: 'none',
                          '&:hover': {
                            backgroundColor: '#b2ebf2',
                            boxShadow: 'none',
                          },
                        }}
                      >
                        {row.orderStatus}
                      </Button>
                    </TableCell>
                    <TableCell>{row.orderDate}</TableCell>
                    <TableCell>
                      <Box sx={{ display: 'flex', gap: 1 }}>
                        {row.details.map((imgSrc, index) => (
                          <Avatar
                            key={index}
                            src={imgSrc}
                            variant="rounded"
                            sx={{ width: 40, height: 40 }}
                            onError={(e) => {
                              // Fallback for broken images
                              e.currentTarget.src = `https://placehold.co/40x40/CCCCCC/000000?text=N/A`;
                              e.currentTarget.alt = "Image not available";
                            }}
                          />
                        ))}
                      </Box>
                    </TableCell>
                    <TableCell>
                      <IconButton size="small" sx={{ backgroundColor: '#e0f7fa', '&:hover': { backgroundColor: '#b2ebf2' } }}>
                        <AddIcon sx={{ color: '#00796b' }} />
                      </IconButton>
                    </TableCell>
                    <TableCell>
                      <IconButton
                        aria-label="more"
                        aria-controls={`menu-${row.id}`}
                        aria-haspopup="true"
                        onClick={handleMenuClick}
                      >
                        <MoreHorizIcon />
                      </IconButton>
                      <Menu
                        id={`menu-${row.id}`}
                        anchorEl={anchorEl}
                        open={Boolean(anchorEl)}
                        onClose={handleMenuClose}
                      >
                        <MenuItem onClick={handleMenuClose}>Option 1</MenuItem>
                        <MenuItem onClick={handleMenuClose}>Option 2</MenuItem>
                      </Menu>
                    </TableCell>
                  </TableRow>
                ))}
                {emptyRows > 0 && (
                  <TableRow style={{ height: 53 * emptyRows }}>
                    <TableCell colSpan={7} />
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>

          {/* Pagination */}
          <TablePagination
            rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
            component="div"
            count={rows.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
            sx={{
              '.MuiTablePagination-toolbar': {
                display: 'flex',
                justifyContent: 'center',
                '& > div': {
                  order: 1, // Reorder to center the numbers
                },
                '& > .MuiTablePagination-spacer': {
                  flex: '1 1 auto', // Allow spacer to take available space
                },
              },
              '.MuiTablePagination-selectLabel, .MuiTablePagination-displayedRows': {
                display: 'none', // Hide "Rows per page" and "1-5 of X" text
              },
            }}
          />
        </Paper>
      </Box>
    </Box>
  );
}
