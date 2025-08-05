"use client";
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
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
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';
import SortIcon from '@mui/icons-material/Sort';
import FilterListIcon from '@mui/icons-material/FilterList';

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
  border: '1px solid #e0e0e0',
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: theme.palette.grey[500],
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '30ch',
    },
  },
}));

const rows = [
  {
    id: 1,
    productName: 'Beli Produk dari Sumber lain',
    productId: '5484568',
    price: '$120.25',
    stock: 2,
    details: [
      'https://placehold.co/40x40/FF6347/FFFFFF?text=P1',
      'https://placehold.co/40x40/4682B4/FFFFFF?text=P2',
    ],
  },
  {
    id: 2,
    productName: 'Outlet sedang tutup sementara',
    productId: '5484568',
    price: '$120.25',
    stock: 8,
    details: [
      'https://placehold.co/40x40/FFD700/000000?text=P3',
      'https://placehold.co/40x40/DA70D6/FFFFFF?text=P4',
    ],
  },
  {
    id: 3,
    productName: 'Tidak ada order',
    productId: '5484568',
    price: '$120.25',
    stock: 12,
    details: [
      'https://placehold.co/40x40/FF69B4/FFFFFF?text=P5',
      'https://placehold.co/40x40/00CED1/FFFFFF?text=P6',
    ],
  },
  {
    id: 4,
    productName: 'Pakai produk lain',
    productId: '5484568',
    price: '$120.25',
    stock: 1,
    details: [
      'https://placehold.co/40x40/808000/FFFFFF?text=P7',
      'https://placehold.co/40x40/4B0082/FFFFFF?text=P8',
    ],
  },
];

export default function App() {
  const [isClient, setIsClient] = useState(false);
  const [value, setValue] = useState(0);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [anchorEl, setAnchorEl] = useState(null);

  const router = useRouter();

  useEffect(() => {
    setIsClient(true); // Mark client-side only
  }, []);

  if (!isClient) return null; // Prevent hydration mismatch

  const handleChange = (event, newValue) => setValue(newValue);
  const handleMenuClick = (event) => setAnchorEl(event.currentTarget);
  const handleMenuClose = () => setAnchorEl(null);
  const handleChangePage = (event, newPage) => setPage(newPage);
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  return (
    <Box sx={{ flexGrow: 1, backgroundColor: '#f5f5f5', minHeight: '100vh' }}>
      <AppBar position="static" color="transparent" elevation={0} sx={{ borderBottom: '1px solid #e0e0e0' }}>
        <Toolbar>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' }, color: '#333' }}
          >
            Product Management
          </Typography>
          <IconButton size="large" color="inherit">
            <Badge badgeContent={4} color="error">
              <NotificationsIcon sx={{ color: '#555' }} />
            </Badge>
          </IconButton>
          <IconButton size="large" edge="end" color="inherit">
            <Avatar alt="UserProfile" src="" />
          </IconButton>
          <Typography variant="body1" sx={{ ml: 1, color: '#333' }}>UserProfile</Typography>
        </Toolbar>
      </AppBar>

      <Box sx={{ p: 3 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            sx={{
              textTransform: 'none',
              backgroundColor: '#007bff',
              color: '#fff',
              borderRadius: '8px',
              boxShadow: 'none',
              '&:hover': {
                backgroundColor: '#0056b3',
                boxShadow: 'none',
              },
            }}
            onClick={() => router.push('/admin/addproduct')}
          >
            Add New Product
          </Button>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Button variant="outlined" startIcon={<EditIcon />} sx={btnStyle}>Group Edit</Button>
            <Button variant="outlined" startIcon={<SaveIcon />} sx={btnStyle}>Save as Default</Button>
          </Box>
        </Box>

        <Paper sx={{ p: 2, borderRadius: '8px' }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
            <Tabs value={value} onChange={handleChange}>
              <Tab label="Product list" />
              <Tab label="125 Products" />
            </Tabs>
            <Search>
              <SearchIconWrapper><SearchIcon /></SearchIconWrapper>
              <StyledInputBase placeholder="Search Product" inputProps={{ 'aria-label': 'search product' }} />
            </Search>
            <Button variant="outlined" startIcon={<SortIcon />} sx={btnStyle}>Sorting By</Button>
            <Button variant="outlined" startIcon={<FilterListIcon />} sx={{ ...btnStyle, ml: 1 }}>Filters</Button>
          </Box>

          <TableContainer component={Paper} sx={tableStyle}>
            <Table sx={{ minWidth: 650 }}>
              <TableHead sx={{ backgroundColor: '#f9f9f9' }}>
                <TableRow>
                  <TableCell padding="checkbox" />
                  <TableCell>Product Name</TableCell>
                  <TableCell>Price</TableCell>
                  <TableCell>Stock</TableCell>
                  <TableCell>Details</TableCell>
                  <TableCell />
                </TableRow>
              </TableHead>
              <TableBody>
                {(rowsPerPage > 0
                  ? rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  : rows
                ).map((row) => (
                  <TableRow key={row.id}>
                    <TableCell padding="checkbox"><input type="checkbox" /></TableCell>
                    <TableCell>
                      <Typography variant="subtitle1" fontWeight="medium">{row.productName}</Typography>
                      <Typography variant="body2" color="text.secondary">{row.productId}</Typography>
                    </TableCell>
                    <TableCell>{row.price}</TableCell>
                    <TableCell>{row.stock}</TableCell>
                    <TableCell>
                      <Box sx={{ display: 'flex', gap: 1 }}>
                        {row.details.map((imgSrc, index) => (
                          <Avatar
                            key={index}
                            src={imgSrc}
                            variant="rounded"
                            sx={{ width: 40, height: 40 }}
                            onError={(e) => {
                              e.currentTarget.src = `https://placehold.co/40x40/CCCCCC/000000?text=N/A`;
                            }}
                          />
                        ))}
                      </Box>
                    </TableCell>
                    <TableCell>
                      <IconButton onClick={handleMenuClick}><MoreHorizIcon /></IconButton>
                      <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleMenuClose}>
                        <MenuItem onClick={handleMenuClose}>Option 1</MenuItem>
                        <MenuItem onClick={handleMenuClose}>Option 2</MenuItem>
                      </Menu>
                    </TableCell>
                  </TableRow>
                ))}
                {emptyRows > 0 && (
                  <TableRow style={{ height: 53 * emptyRows }}>
                    <TableCell colSpan={6} />
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>

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
              },
              '.MuiTablePagination-selectLabel, .MuiTablePagination-displayedRows': {
                display: 'none',
              },
            }}
          />
        </Paper>
      </Box>
    </Box>
  );
}

const btnStyle = {
  textTransform: 'none',
  borderColor: '#e0e0e0',
  color: '#555',
  '&:hover': {
    borderColor: '#ccc',
  },
  borderRadius: '8px',
};

const tableStyle = {
  borderRadius: '8px',
  boxShadow: 'none',
  border: '1px solid #e0e0e0',
};
