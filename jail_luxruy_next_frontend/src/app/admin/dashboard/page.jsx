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
  Stack,
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
} from "recharts";
import { FaUserFriends } from "react-icons/fa";
import { BiRupee } from "react-icons/bi";

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
  const [salesPeriod, setSalesPeriod] = React.useState("This week");
  const [headerTimePeriod, setHeaderTimePeriod] = React.useState("Weekly");
  const [headerMonth, setHeaderMonth] = React.useState("April 2025");

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
        backgroundColor: theme.palette.grey[100],
        fontFamily: "Inter, sans-serif",
      }}
    >
      <Grid container spacing={{ xs: 2, md: 3 }}>
        {/* Header */}
        <Grid item xs={12}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              mb: { xs: 2, md: 3 },
              flexWrap: "wrap",
              gap: { xs: 2, md: 3 },
            }}
          >
            {/* <Typography variant="h5" component="h1" sx={{ fontWeight: "bold", color: theme.palette.text.primary }}>
              Dashboard Overview
            </Typography> */}
            <Stack
              direction={{ xs: "row", sm: "row" }}
              spacing={1}
              display="flex"
              alignItems="center"
              justifyContent="end"
              width="100%"
            >
              <ToggleButtonGroup
                value={headerTimePeriod}
                exclusive
                onChange={handleHeaderTimePeriodChange}
                size="small"
                sx={{
                  borderRadius: "8px",
                  overflow: "hidden",
                  display: "flex",
                  boxShadow: theme.shadows[1],
                }}
              >
                <ToggleButton value="Daily">Daily</ToggleButton>
                <ToggleButton value="Weekly">Weekly</ToggleButton>
                <ToggleButton value="Monthly">Monthly</ToggleButton>
              </ToggleButtonGroup>

              <Select
                value={headerMonth}
                onChange={handleHeaderMonthChange}
                size="small"
                sx={{
                  borderRadius: "8px",
                  "& .MuiOutlinedInput-notchedOutline": {
                    borderRadius: "8px",
                  },
                  boxShadow: theme.shadows[1],
                }}
              >
                <MenuItem value="April 2025">April 2025</MenuItem>
                <MenuItem value="May 2025">May 2025</MenuItem>
                <MenuItem value="June 2025">June 2025</MenuItem>
              </Select>
            </Stack>
          </Box>
        </Grid>

        {/* --- First Row: Total Revenue (Chart) and Cars Sold (Donut) --- */}
        <Grid item xs={12} md={8}>
          <Paper
            sx={{
              p: { xs: 2, sm: 3 },
              borderRadius: "12px",
              boxShadow: theme.shadows[4],
            }}
          >
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "flex-start",
                mb: 2,
                flexWrap: "wrap",
                gap: 2,
              }}
            >
              <Box>
                <Typography
                  variant="h6"
                  sx={{ fontWeight: "bold", color: theme.palette.text.primary }}
                >
                  Total Revenue
                </Typography>
                <Typography variant="h4" fontWeight={600} color="primary">
                  ₹10.5M
                </Typography>
              </Box>
              <Stack
                direction="row"
                spacing={2}
                alignItems="center"
                flexWrap="wrap"
              >
                <Stack direction="row" alignItems="center" spacing={1}>
                  <Box
                    sx={{
                      width: 10,
                      height: 10,
                      borderRadius: "50%",
                      bgcolor: "#8B5CF6",
                    }}
                  ></Box>
                  <Typography variant="body2" color="text.secondary">
                    Earned
                  </Typography>
                </Stack>
                <Stack direction="row" alignItems="center" spacing={1}>
                  <Box
                    sx={{
                      width: 10,
                      height: 10,
                      borderRadius: "50%",
                      bgcolor: "#10B981",
                    }}
                  ></Box>
                  <Typography variant="body2" color="text.secondary">
                    Forecasted
                  </Typography>
                </Stack>
                <Select
                  value="6 months"
                  size="small"
                  sx={{
                    borderRadius: "8px",
                    "& .MuiOutlinedInput-notchedOutline": {
                      borderRadius: "8px",
                    },
                  }}
                >
                  <MenuItem value="6 months">6 months</MenuItem>
                  <MenuItem value="12 months">12 months</MenuItem>
                </Select>
              </Stack>
            </Box>
            <ResponsiveContainer width="100%" height={isMobile ? 200 : 250}>
              <LineChart
                data={totalRevenueData}
                margin={{ top: 5, right: 20, left: 0, bottom: 5 }}
              >
                <XAxis dataKey="month" tickLine={false} axisLine={false} />
                <YAxis
                  tickFormatter={(value) => `${value}M`}
                  tickLine={false}
                  axisLine={false}
                />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="earned"
                  stroke="#8B5CF6"
                  strokeWidth={2}
                  dot={{ r: 4, fill: "#8B5CF6" }}
                  activeDot={{ r: 6 }}
                />
                <Line
                  type="monotone"
                  dataKey="forecasted"
                  stroke="#10B981"
                  strokeWidth={2}
                  dot={{ r: 4, fill: "#10B981" }}
                  activeDot={{ r: 6 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </Paper>
        </Grid>

        <Grid item xs={12} md={4}>
          <Paper
            sx={{
              p: { xs: 2, sm: 3 },
              borderRadius: "12px",
              boxShadow: theme.shadows[4],
              minHeight: isMobile ? "auto" : "300px",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Box
              sx={{
                width: "100%",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                mb: 2,
              }}
            >
              <Typography
                variant="h6"
                sx={{ fontWeight: "bold", color: theme.palette.text.primary }}
              >
                Cars Sold
              </Typography>
              <Select
                value="This month"
                size="small"
                sx={{
                  borderRadius: "8px",
                  "& .MuiOutlinedInput-notchedOutline": {
                    borderRadius: "8px",
                  },
                }}
              >
                <MenuItem value="This month">This month</MenuItem>
                <MenuItem value="Last month">Last month</MenuItem>
              </Select>
            </Box>
            <Box
              sx={{
                position: "relative",
                width: isMobile ? 150 : 200,
                height: isMobile ? 150 : 200,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                mb: 2,
              }}
            >
              <svg width="100%" height="100%" viewBox="0 0 200 200">
                <circle
                  cx="100"
                  cy="100"
                  r="80"
                  fill="none"
                  stroke="#E0E7FF"
                  strokeWidth="20"
                />
                <circle
                  cx="100"
                  cy="100"
                  r="60"
                  fill="none"
                  stroke="#E0E7FF"
                  strokeWidth="20"
                />
                <circle
                  cx="100"
                  cy="100"
                  r="80"
                  fill="none"
                  stroke="#8B5CF6"
                  strokeWidth="20"
                  strokeDasharray="251.3 502.6"
                  strokeDashoffset="0"
                  transform="rotate(-90 100 100)"
                />
                <circle
                  cx="100"
                  cy="100"
                  r="60"
                  fill="none"
                  stroke="#10B981"
                  strokeWidth="20"
                  strokeDasharray="150.8 376.9"
                  strokeDashoffset="0"
                  transform="rotate(90 100 100)"
                />
              </svg>
              <Box sx={{ position: "absolute", textAlign: "center" }}>
                <Typography
                  variant="h5"
                  sx={{ fontWeight: "bold", color: theme.palette.text.primary }}
                >
                  10K
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Total
                </Typography>
              </Box>
            </Box>
            <Stack
              direction="row"
              justifyContent="space-around"
              width="100%"
              flexWrap="wrap"
              gap={1}
            >
              <Stack direction="row" alignItems="center" spacing={1}>
                <Box
                  sx={{
                    width: 10,
                    height: 10,
                    borderRadius: "50%",
                    bgcolor: "#8B5CF6",
                  }}
                ></Box>
                <Typography variant="body2" color="text.secondary">
                  Old Customers: 10K
                </Typography>
              </Stack>
              <Stack direction="row" alignItems="center" spacing={1}>
                <Box
                  sx={{
                    width: 10,
                    height: 10,
                    borderRadius: "50%",
                    bgcolor: "#10B981",
                  }}
                ></Box>
                <Typography variant="body2" color="text.secondary">
                  New Customers: 4K
                </Typography>
              </Stack>
            </Stack>
          </Paper>
        </Grid>

        {/* --- Second Row: Sales Activity --- */}
        <Grid item xs={12}>
          <Paper
            sx={{
              p: { xs: 2, sm: 3 },
              borderRadius: "12px",
              boxShadow: theme.shadows[4],
            }}
          >
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                mb: 2,
              }}
            >
              <Typography
                variant="h6"
                sx={{ fontWeight: "bold", color: theme.palette.text.primary }}
              >
                Sales Activity
              </Typography>
              <Select
                value={salesPeriod}
                onChange={handleSalesPeriodChange}
                size="small"
                sx={{
                  borderRadius: "8px",
                  "& .MuiOutlinedInput-notchedOutline": {
                    borderRadius: "8px",
                  },
                }}
              >
                <MenuItem value="This week">This week</MenuItem>
                <MenuItem value="Last week">Last week</MenuItem>
              </Select>
            </Box>
            <ResponsiveContainer width="100%" height={isMobile ? 200 : 250}>
              <BarChart
                data={salesActivityData}
                margin={{ top: 5, right: 20, left: 0, bottom: 5 }}
              >
                <XAxis dataKey="day" tickLine={false} axisLine={false} />
                <YAxis tickLine={false} axisLine={false} />
                <Tooltip />
                <Bar
                  dataKey="sales"
                  fill={theme.palette.primary.light}
                  radius={[5, 5, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </Paper>
        </Grid>

        {/* --- Third Row: Traffic Gained and Profits Earned --- */}
        <Grid item xs={12} sm={6}>
          <Paper
            sx={{
              p: { xs: 2, sm: 3 },
              borderRadius: "12px",
              boxShadow: theme.shadows[4],
              display: "flex",
              alignItems: "center",
              gap: 2,
              overflow: "hidden",
            }}
          >
            <Box
              sx={{
                p: 1.5,
                borderRadius: "50%",
                bgcolor: theme.palette.primary.light,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <FaUserFriends size={28} color={theme.palette.primary.main} />
            </Box>
            <Stack>
              <Typography
                variant="h6"
                sx={{ fontWeight: "bold", color: theme.palette.text.primary }}
              >
                300,000
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Traffic Gained
              </Typography>
              <Select
                size="small"
                value="Jul 2022"
                sx={{
                  mt: 1,
                  borderRadius: "8px",
                  "& .MuiOutlinedInput-notchedOutline": {
                    borderRadius: "8px",
                  },
                }}
              >
                <MenuItem value="Jul 2022">Jul 2022</MenuItem>
                <MenuItem value="Jun 2022">Jun 2022</MenuItem>
              </Select>
            </Stack>
          </Paper>
        </Grid>

        <Grid item xs={12} sm={6}>
          <Paper
            sx={{
              p: { xs: 2, sm: 3 },
              borderRadius: "12px",
              boxShadow: theme.shadows[4],
              display: "flex",
              alignItems: "center",
              gap: 2,
              overflow: "hidden",
            }}
          >
            <Box
              sx={{
                p: 1.5,
                borderRadius: "50%",
                bgcolor: theme.palette.success.light,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <BiRupee size={28} color={theme.palette.success.main} />
            </Box>
            <Stack>
              <Typography
                variant="h6"
                sx={{ fontWeight: "bold", color: theme.palette.text.primary }}
              >
                ₹60K
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Profits Earned
              </Typography>
              <Select
                size="small"
                value="Jul 2022"
                sx={{
                  mt: 1,
                  borderRadius: "8px",
                  "& .MuiOutlinedInput-notchedOutline": {
                    borderRadius: "8px",
                  },
                }}
              >
                <MenuItem value="Jul 2022">Jul 2022</MenuItem>
                <MenuItem value="Jun 2022">Jun 2022</MenuItem>
              </Select>
            </Stack>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default DashboardPage;
