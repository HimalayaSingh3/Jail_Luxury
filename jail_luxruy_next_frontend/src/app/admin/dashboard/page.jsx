"use client";

import React from "react";
import {
  Box,
  Grid,
  Typography,
  Paper,
  Select,
  MenuItem,
  ToggleButtonGroup,
  ToggleButton,
  useTheme,
  useMediaQuery,
  FormControl, // Added for Select label
  InputLabel, // Added for Select label
  TextField,
} from "@mui/material";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  Legend,
} from "recharts";
import { FaUserFriends } from "react-icons/fa";
import { BiRupee } from "react-icons/bi";

// Sample chart data for Total Revenue (Line Chart)
const totalRevenueData = [
  { month: "FEB", earned: 40, forecasted: 30 },
  { month: "MAR", earned: 95, forecasted: 50 },
  { month: "APR", earned: 80, forecasted: 45 },
  { month: "MAY", earned: 40, forecasted: 90 },
  { month: "JUN", earned: 75, forecasted: 70 },
  { month: "JUL", earned: 55, forecasted: 85 },
];

// Sample chart data for Sales Activity (Bar Chart)
const salesActivityData = [
  { day: "M", sales: 180 },
  { day: "T", sales: 300 },
  { day: "W", sales: 200 },
  { day: "Th", sales: 250 },
  { day: "F", sales: 280 },
  { day: "S", sales: 90 },
];

const DashboardPage = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [revenuePeriod, setRevenuePeriod] = React.useState('weekly'); // State for ToggleButtonGroup
  const [salesPeriod, setSalesPeriod] = React.useState('This week'); // State for Sales Activity Select
  const [headerTimePeriod, setHeaderTimePeriod] = React.useState('Weekly'); // State for header ToggleButtonGroup
  const [headerMonth, setHeaderMonth] = React.useState('April 2025'); // State for header month Select

  const handleRevenuePeriodChange = (event, newPeriod) => {
    if (newPeriod !== null) {
      setRevenuePeriod(newPeriod);
    }
  };

  const handleSalesPeriodChange = (event) => {
    setSalesPeriod(event.target.value);
  };

  const handleHeaderTimePeriodChange = (event, newPeriod) => {
    if (newPeriod !== null) {
      setHeaderTimePeriod(newPeriod);
    }
  };

  const handleHeaderMonthChange = (event) => {
    setHeaderMonth(event.target.value);
  };

  return (
    <Box
      sx={{
        p: { xs: 2, md: 4 },
        width: "100%",
        minHeight: "100vh",
        overflowX: "hidden",
        overflowY: "auto",
        boxSizing: "border-box",
        backgroundColor: "#f5f5f5",
        fontFamily: 'Inter, sans-serif',
      }}
    >
      {/* Main Grid Container with reduced spacing */}
      <Grid container spacing={2}> {/* Reduced spacing from 3 to 2 */}
        {/* Header Section */}
        <Grid item xs={12}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4, flexWrap: 'wrap', gap: { xs: 2, md: 3 } }}>
            <Typography variant="h5" component="h1" sx={{ fontWeight: 'bold', color: '#333' }}>
              Dashboard Overview
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: { xs: 2, md: 3 }, flexWrap: 'wrap', justifyContent: 'flex-end' }}>
              {/* Search input - simplified */}
              <TextField
                variant="outlined"
                size="small"
                placeholder="Quick search"
                sx={{ borderRadius: '8px', '& .MuiOutlinedInput-root': { borderRadius: '8px' } }}
              />
              {/* Notification Bell */}
              <Box sx={{ p: 1, borderRadius: '50%', backgroundColor: 'white', boxShadow: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <span role="img" aria-label="bell" style={{ fontSize: '24px' }}>🔔</span>
              </Box>

              {/* Daily/Weekly/Monthly ToggleButtonGroup */}
              <ToggleButtonGroup
                value={headerTimePeriod}
                exclusive
                onChange={handleHeaderTimePeriodChange}
                size="small"
                sx={{ borderRadius: '8px', overflow: 'hidden', boxShadow: 1 }}
              >
                <ToggleButton value="Daily" sx={{ textTransform: 'none', borderRadius: '8px', '&.Mui-selected': { backgroundColor: '#4A00B8', color: 'white' } }}>Daily</ToggleButton>
                <ToggleButton value="Weekly" sx={{ textTransform: 'none', borderRadius: '8px', '&.Mui-selected': { backgroundColor: '#4A00B8', color: 'white' } }}>Weekly</ToggleButton>
                <ToggleButton value="Monthly" sx={{ textTransform: 'none', borderRadius: '8px', '&.Mui-selected': { backgroundColor: '#4A00B8', color: 'white' } }}>Monthly</ToggleButton>
              </ToggleButtonGroup>

              {/* April 2025 Date Selector */}
              <Select
                value={headerMonth}
                onChange={handleHeaderMonthChange}
                size="small"
                sx={{ borderRadius: '8px', '& .MuiOutlinedInput-root': { borderRadius: '8px' }, boxShadow: 1 }}
              >
                <MenuItem value="April 2025">April 2025</MenuItem>
                <MenuItem value="May 2025">May 2025</MenuItem>
                <MenuItem value="June 2025">June 2025</MenuItem>
              </Select>
            </Box>
          </Box>
        </Grid>

        {/* Total Revenue Chart */}
        <Grid item xs={12} md={8}>
          <Paper sx={{ p: { xs: 2, sm: 3 }, borderRadius: '12px', boxShadow: '0 4px 20px rgba(0,0,0,0.05)' }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2, flexWrap: 'wrap', gap: 2 }}>
              <div>
                <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#333' }}>Total Revenue</Typography>
                <Typography variant="h4" fontWeight={600} sx={{ color: '#4A00B8' }}>
                  ₹10.5M
                </Typography>
              </div>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, flexWrap: 'wrap' }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Box sx={{ width: 10, height: 10, borderRadius: '50%', bgcolor: '#8B5CF6' }}></Box>
                  <Typography variant="body2" color="text.secondary">Earned</Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Box sx={{ width: 10, height: 10, borderRadius: '50%', bgcolor: '#10B981' }}></Box>
                  <Typography variant="body2" color="text.secondary">Forecasted</Typography>
                </Box>
                <Select
                  value="6 months"
                  size="small"
                  sx={{ borderRadius: '8px', '& .MuiOutlinedInput-root': { borderRadius: '8px' } }}
                >
                  <MenuItem value="6 months">6 months</MenuItem>
                  <MenuItem value="12 months">12 months</MenuItem>
                </Select>
              </Box>
            </Box>

            <ResponsiveContainer width="100%" height={isMobile ? 200 : 250}>
              <LineChart
                data={totalRevenueData}
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
              >
                <XAxis dataKey="month" tickLine={false} axisLine={false} />
                <YAxis tickFormatter={(value) => `${value}M`} tickLine={false} axisLine={false} />
                <Tooltip />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="earned"
                  stroke="#8B5CF6" // Purple
                  strokeWidth={2}
                  dot={{ r: 4, fill: '#8B5CF6' }}
                  activeDot={{ r: 6 }}
                />
                <Line
                  type="monotone"
                  dataKey="forecasted"
                  stroke="#10B981" // Green
                  strokeWidth={2}
                  dot={{ r: 4, fill: '#10B981' }}
                  activeDot={{ r: 6 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </Paper>
        </Grid>

        {/* Cars Sold & Sales Activity (stacked vertically on small screens, side-by-side on medium) */}
        <Grid item xs={12} md={4}>
          <Grid container direction="column" spacing={2}> {/* Reduced spacing to match main grid */}
            {/* Cars Sold */}
            <Grid item xs={12}>
              <Paper sx={{ p: { xs: 2, sm: 3 }, borderRadius: '12px', boxShadow: '0 4px 20px rgba(0,0,0,0.05)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: isMobile ? 'auto' : '250px' }}>
                <Box sx={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                  <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#333' }}>Cars Sold</Typography>
                  <Select
                    value="This month"
                    size="small"
                    sx={{ borderRadius: '8px', '& .MuiOutlinedInput-root': { borderRadius: '8px' } }}
                  >
                    <MenuItem value="This month">This month</MenuItem>
                    <MenuItem value="Last month">Last month</MenuItem>
                  </Select>
                </Box>
                {/* Simplified Donut Chart */}
                <Box sx={{ position: 'relative', width: isMobile ? 150 : 200, height: isMobile ? 150 : 200, display: 'flex', alignItems: 'center', justifyContent: 'center', mb: 2 }}>
                  <svg width="100%" height="100%" viewBox="0 0 200 200">
                    {/* Background rings */}
                    <circle cx="100" cy="100" r="80" fill="none" stroke="#E0E7FF" strokeWidth="20" />
                    <circle cx="100" cy="100" r="60" fill="none" stroke="#E0E7FF" strokeWidth="20" />

                    {/* Old Customers Segment (Purple) - approx 50% */}
                    <circle
                      cx="100"
                      cy="100"
                      r="80"
                      fill="none"
                      stroke="#8B5CF6"
                      strokeWidth="20"
                      strokeDasharray="251.3 502.6" /* 50% of circumference (2*PI*80) */
                      strokeDashoffset="0"
                      transform="rotate(-90 100 100)"
                    />
                    {/* New Customers Segment (Green) - approx 40% */}
                    <circle
                      cx="100"
                      cy="100"
                      r="60"
                      fill="none"
                      stroke="#10B981"
                      strokeWidth="20"
                      strokeDasharray="150.8 376.9" /* 40% of circumference (2*PI*60) */
                      strokeDashoffset="0"
                      transform="rotate(90 100 100)" /* Adjust rotation to place it correctly */
                    />
                  </svg>
                  <Box sx={{ position: 'absolute', textAlign: 'center' }}>
                    <Typography variant="h5" sx={{ fontWeight: 'bold', color: '#333' }}>10K</Typography>
                    <Typography variant="body2" color="text.secondary">Total</Typography>
                  </Box>
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-around', width: '100%', flexWrap: 'wrap', gap: 1 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Box sx={{ width: 10, height: 10, borderRadius: '50%', bgcolor: '#8B5CF6' }}></Box>
                    <Typography variant="body2" color="text.secondary">Old Customers: 10K</Typography>
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Box sx={{ width: 10, height: 10, borderRadius: '50%', bgcolor: '#10B981' }}></Box>
                    <Typography variant="body2" color="text.secondary">New Customers: 4K</Typography>
                  </Box>
                </Box>
              </Paper>
            </Grid>

            {/* Sales Activity */}
            <Grid item xs={12}>
              <Paper sx={{ p: { xs: 2, sm: 3 }, borderRadius: '12px', boxShadow: '0 4px 20px rgba(0,0,0,0.05)' }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                  <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#333' }}>Sales Activity</Typography>
                  <Select
                    value={salesPeriod}
                    onChange={handleSalesPeriodChange}
                    size="small"
                    sx={{ borderRadius: '8px', '& .MuiOutlinedInput-root': { borderRadius: '8px' } }}
                  >
                    <MenuItem value="This week">This week</MenuItem>
                    <MenuItem value="Last week">Last week</MenuItem>
                  </Select>
                </Box>
                <ResponsiveContainer width="100%" height={isMobile ? 200 : 250}>
                  <BarChart data={salesActivityData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                    <XAxis dataKey="day" tickLine={false} axisLine={false} />
                    <YAxis tickLine={false} axisLine={false} />
                    <Tooltip />
                    <Bar
                      dataKey="sales"
                      fill="#A78BFA" // Light purple
                      radius={[5, 5, 0, 0]}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </Paper>
            </Grid>
          </Grid>
        </Grid>

        {/* Traffic Gained */}
        <Grid item xs={12} sm={6} md={4}>
          <Paper
            sx={{
              p: { xs: 2, sm: 3 },
              borderRadius: '12px',
              boxShadow: '0 4px 20px rgba(0,0,0,0.05)',
              display: "flex",
              alignItems: "center",
              gap: 2,
              overflow: "hidden",
            }}
          >
            <Box sx={{ p: 1.5, borderRadius: '50%', bgcolor: '#E0E7FF', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <FaUserFriends size={28} color="#8B5CF6" /> {/* Purple icon */}
            </Box>
            <Box>
              <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#333' }}>300,000</Typography>
              <Typography variant="body2" color="text.secondary">Traffic Gained</Typography>
              <Select size="small" value="Jul 2022" sx={{ borderRadius: '8px', '& .MuiOutlinedInput-root': { borderRadius: '8px' } }}>
                <MenuItem value="Jul 2022">Jul 2022</MenuItem>
                <MenuItem value="Jun 2022">Jun 2022</MenuItem>
              </Select>
            </Box>
          </Paper>
        </Grid>

        {/* Profits Earned */}
        <Grid item xs={12} sm={6} md={4}>
          <Paper
            sx={{
              p: { xs: 2, sm: 3 },
              borderRadius: '12px',
              boxShadow: '0 4px 20px rgba(0,0,0,0.05)',
              display: "flex",
              alignItems: "center",
              gap: 2,
              overflow: "hidden",
            }}
          >
            <Box sx={{ p: 1.5, borderRadius: '50%', bgcolor: '#D1FAE5', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <BiRupee size={28} color="#10B981" /> {/* Green icon */}
            </Box>
            <Box>
              <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#333' }}>₹60K</Typography>
              <Typography variant="body2" color="text.secondary">Profits Earned</Typography>
              <Select size="small" value="Jul 2022" sx={{ borderRadius: '8px', '& .MuiOutlinedInput-root': { borderRadius: '8px' } }}>
                <MenuItem value="Jul 2022">Jul 2022</MenuItem>
                <MenuItem value="Jun 2022">Jun 2022</MenuItem>
              </Select>
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default DashboardPage;
