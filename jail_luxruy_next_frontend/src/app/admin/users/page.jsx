"use client";
import React, { useState } from "react";
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
  Card,
  CardContent,
  Grid,
  LinearProgress, // For the progress bar in the cards
} from "@mui/material";
import { styled, alpha } from "@mui/material/styles";
import SearchIcon from "@mui/icons-material/Search";
import NotificationsIcon from "@mui/icons-material/Notifications";
import AccountCircle from "@mui/icons-material/AccountCircle";
import SortIcon from "@mui/icons-material/Sort"; // For Sorting By icon
import PersonIcon from "@mui/icons-material/Person"; // For user icon in cards
import TrendingUpIcon from "@mui/icons-material/TrendingUp"; // For trending up icon
import TrendingDownIcon from "@mui/icons-material/TrendingDown"; // For trending down icon
import BarChartIcon from "@mui/icons-material/BarChart"; // For bar chart icon
import AnalyticsIcon from "@mui/icons-material/Analytics"; // For analytics icon

// Styled components for the search bar
const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(3),
    width: "auto",
  },
  border: "1px solid #e0e0e0", // Light grey border
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  color: theme.palette.grey[500], // Grey icon color
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "30ch", // Increased width for better visibility
    },
  },
}));

// Sample Data for the table (user-centric)
const rows = [
  {
    id: 1,
    userName: "Floyd Miles",
    emailAddress: "tanya.hill@example.com",
    city: "Omsk",
    accountCreatedDate: "7/11/19",
  },
  {
    id: 2,
    userName: "Kristin Watson",
    emailAddress: "curtis.weaver@example.com",
    city: "Nalchik",
    accountCreatedDate: "4/4/18",
  },
  {
    id: 3,
    userName: "Annette Black",
    emailAddress: "deanna.curtis@example.com",
    city: "Khabarovsk",
    accountCreatedDate: "3/4/16",
  },
  {
    id: 4,
    userName: "Wade Warren",
    emailAddress: "felicia.reid@example.com",
    city: "Mannheim",
    accountCreatedDate: "4/21/12",
  },
  {
    id: 5,
    userName: "Esther Howard",
    emailAddress: "dolores.chambers@example.com",
    city: "Cincinnati (OH)",
    accountCreatedDate: "12/4/17",
  },
  {
    id: 6,
    userName: "Cameron Williamson",
    emailAddress: "michael.mitc@example.com",
    city: "Sterlitamak",
    accountCreatedDate: "8/30/14",
  },
  {
    id: 7,
    userName: "Albert Flores",
    emailAddress: "sara.cruz@example.com",
    city: "Lomas de Zamora",
    accountCreatedDate: "8/16/17",
  },
  {
    id: 8,
    userName: "Robert Fox",
    emailAddress: "kenzi.lawson@example.com",
    city: "Greensboro (NC)",
    accountCreatedDate: "5/30/14",
  },
  {
    id: 9,
    userName: "Jenny Wilson",
    emailAddress: "jackson.graham@example.com",
    city: "Lubeck",
    accountCreatedDate: "5/27/15",
  },
  {
    id: 10,
    userName: "Ralph Edwards",
    emailAddress: "willie.jennings@example.com",
    city: "Vladikavkaz (Osetinskaya ASSR)",
    accountCreatedDate: "1/31/14",
  },
  {
    id: 11,
    userName: "Cody Fisher",
    emailAddress: "michelle.rivera@example.com",
    city: "Krasnodar",
    accountCreatedDate: "5/16/12",
  },
  {
    id: 12,
    userName: "Brooklyn Simmons",
    emailAddress: "georgia.young@example.com",
    city: "Rubtsovsk",
    accountCreatedDate: "7/18/17",
  },
  {
    id: 13,
    userName: "Theresa Webb",
    emailAddress: "debbie.baker@example.com",
    city: "Hama",
    accountCreatedDate: "8/16/13",
  },
  {
    id: 14,
    userName: "Darrell Steward",
    emailAddress: "nathan.roberts@example.com",
    city: "Bochum",
    accountCreatedDate: "10/6/13",
  },
  {
    id: 15,
    userName: "Ronald Richards",
    emailAddress: "nevaeh.simmons@example.com",
    city: "Mönchengladbach",
    accountCreatedDate: "9/18/16",
  },
  {
    id: 16,
    userName: "Jerome Bell",
    emailAddress: "bill.sanders@example.com",
    city: "Baton Rouge (LA)",
    accountCreatedDate: "1/15/12",
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
    <Box
      sx={{
        flexGrow: 1,
        backgroundColor: "#f5f5f5",
        minHeight: "100vh",
  
      
      }}
    >
      {/* Top AppBar */}
      <AppBar
        position="static"
        color="transparent"
        elevation={0}
        sx={{ borderBottom: "1px solid #e0e0e0" }}
      >
        <Toolbar>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{
              flexGrow: 1,
              display: { xs: "none", sm: "block" },
              color: "#333",
            }}
          >
            User management {/* Changed title */}
          </Typography>
          <IconButton
            size="large"
            aria-label="show 4 new mails"
            color="inherit"
          >
            <Badge badgeContent={4} color="error">
              <NotificationsIcon sx={{ color: "#555" }} />
            </Badge>
          </IconButton>
          <IconButton
            size="large"
            edge="end"
            aria-label="account of current user"
            aria-haspopup="true"
            color="inherit"
          >
            <Avatar alt="" src="" />
          </IconButton>
          <Typography variant="body1" sx={{ ml: 1, color: "#333" }}>
            UserProfile
          </Typography>
        </Toolbar>
      </AppBar>

      {/* Main Content Area */}
      <Box sx={{ p: 3 }}>
        {/* Summary Cards Section */}
        <Grid container spacing={3} sx={{ mb: 3 }}>
          <Grid item xs={12} sm={4}>
            <Card
              sx={{
                borderRadius: "8px",
                boxShadow: "none",
                border: "1px solid #e0e0e0",
              }}
            >
              <CardContent>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    mb: 1,
                  }}
                >
                  <Typography variant="subtitle1" color="text.secondary">
                    Active users
                  </Typography>
                  <IconButton size="small" sx={{ color: "#555" }}>
                    <PersonIcon />
                  </IconButton>
                </Box>
                <Typography variant="h4" fontWeight="bold" sx={{ mb: 0.5 }}>
                  1250
                </Typography>
                <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
                  <TrendingDownIcon color="error" fontSize="small" />
                  <Typography variant="body2" color="error" sx={{ ml: 0.5 }}>
                    -10%
                  </Typography>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{ ml: 0.5 }}
                  >
                    compared to last month
                  </Typography>
                </Box>
                <LinearProgress
                  variant="determinate"
                  value={70}
                  sx={{ height: 5, borderRadius: 5 }}
                />
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Card
              sx={{
                borderRadius: "8px",
                boxShadow: "none",
                border: "1px solid #e0e0e0",
              }}
            >
              <CardContent>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    mb: 1,
                  }}
                >
                  <Typography variant="subtitle1" color="text.secondary">
                    New Users
                  </Typography>
                  <IconButton size="small" sx={{ color: "#555" }}>
                    <TrendingUpIcon />
                  </IconButton>
                </Box>
                <Typography variant="h4" fontWeight="bold" sx={{ mb: 0.5 }}>
                  24
                </Typography>
                <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
                  <TrendingUpIcon color="success" fontSize="small" />
                  <Typography variant="body2" color="success" sx={{ ml: 0.5 }}>
                    +5%
                  </Typography>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{ ml: 0.5 }}
                  >
                    compared to last month
                  </Typography>
                </Box>
                <LinearProgress
                  variant="determinate"
                  value={80}
                  sx={{ height: 5, borderRadius: 5 }}
                />
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Card
              sx={{
                borderRadius: "8px",
                boxShadow: "none",
                border: "1px solid #e0e0e0",
              }}
            >
              <CardContent>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    mb: 1,
                  }}
                >
                  <Typography variant="subtitle1" color="text.secondary">
                    Totall Users
                  </Typography>
                  <IconButton size="small" sx={{ color: "#555" }}>
                    <BarChartIcon />
                  </IconButton>
                </Box>
                <Typography variant="h4" fontWeight="bold" sx={{ mb: 0.5 }}>
                  1301
                </Typography>
                <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
                  <TrendingUpIcon color="success" fontSize="small" />
                  <Typography variant="body2" color="success" sx={{ ml: 0.5 }}>
                    +40%
                  </Typography>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{ ml: 0.5 }}
                  >
                    compared to last month
                  </Typography>
                </Box>
                <LinearProgress
                  variant="determinate"
                  value={90}
                  sx={{ height: 5, borderRadius: 5 }}
                />
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        <Paper sx={{ p: 2, borderRadius: "8px" }}>
          {/* Tabs and Search User Section */}
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              mb: 2,
            }}
          >
            <Tabs
              value={value}
              onChange={handleChange}
              aria-label="user list tabs"
              sx={{
                "& .MuiTabs-flexContainer": {
                  justifyContent: "flex-start", // Align tabs to start
                },
                "& .MuiTab-root": {
                  minWidth: "unset", // Remove minimum width constraint
                  padding: "6px 16px", // Adjust padding for a more compact look
                  textTransform: "none", // Keep text as is
                },
                "& .Mui-selected": {
                  fontWeight: "bold", // Make selected tab bold
                },
              }}
            >
              <Tab label="user list" />
              <Tab label="1240 user" />
            </Tabs>
            <Search>
              <SearchIconWrapper>
                <SearchIcon />
              </SearchIconWrapper>
              <StyledInputBase
                placeholder="Search user" // Changed placeholder
                inputProps={{ "aria-label": "search user" }}
              />
            </Search>
            <Button
              variant="outlined"
              startIcon={<SortIcon />}
              sx={{
                textTransform: "none",
                borderColor: "#e0e0e0",
                color: "#555",
                "&:hover": {
                  borderColor: "#ccc",
                },
                borderRadius: "8px",
              }}
            >
              Sorting By
            </Button>
            <Button
              variant="outlined"
              sx={{
                textTransform: "none",
                borderColor: "#e0e0e0",
                color: "#555",
                "&:hover": {
                  borderColor: "#ccc",
                },
                borderRadius: "8px",
              }}
            >
              Created date
            </Button>
          </Box>

          {/* Data Table */}
          <TableContainer
            component={Paper}
            sx={{
              borderRadius: "8px",
              boxShadow: "none",
              border: "1px solid #e0e0e0",
            }}
          >
            <Table sx={{ minWidth: 650 }} aria-label="user table">
              <TableHead sx={{ backgroundColor: "#f9f9f9" }}>
                <TableRow>
                  <TableCell padding="checkbox">
                    {/* Checkbox for selecting all users if needed */}
                  </TableCell>
                  <TableCell>User Name</TableCell>
                  <TableCell>Email Address</TableCell>
                  <TableCell>City</TableCell>
                  <TableCell>Account Created date</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {(rowsPerPage > 0
                  ? rows.slice(
                      page * rowsPerPage,
                      page * rowsPerPage + rowsPerPage
                    )
                  : rows
                ).map((row) => (
                  <TableRow
                    key={row.id}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell padding="checkbox">
                      {/* Individual user checkbox */}
                      <input type="checkbox" />
                    </TableCell>
                    <TableCell component="th" scope="row">
                      <Typography variant="subtitle1" fontWeight="medium">
                        {row.userName}
                      </Typography>
                    </TableCell>
                    <TableCell>{row.emailAddress}</TableCell>
                    <TableCell>{row.city}</TableCell>
                    <TableCell>{row.accountCreatedDate}</TableCell>
                  </TableRow>
                ))}
                {emptyRows > 0 && (
                  <TableRow style={{ height: 53 * emptyRows }}>
                    <TableCell colSpan={5} /> {/* Adjusted colspan */}
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>

          {/* Pagination */}
          <TablePagination
            rowsPerPageOptions={[5, 10, 25, { label: "All", value: -1 }]}
            component="div"
            count={rows.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
            sx={{
              ".MuiTablePagination-toolbar": {
                display: "flex",
                justifyContent: "center",
                "& > div": {
                  order: 1, // Reorder to center the numbers
                },
                "& > .MuiTablePagination-spacer": {
                  flex: "1 1 auto", // Allow spacer to take available space
                },
              },
              ".MuiTablePagination-selectLabel, .MuiTablePagination-displayedRows":
                {
                  display: "none",
                },
            }}
          />
        </Paper>
      </Box>
    </Box>
  );
}
