import {Box,Chip,CircularProgress,Paper,Table,TableBody,TableCell,TableContainer,TableHead,TableRow,Typography,Pagination,PaginationItem,} from "@mui/material";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import useGetProfile from "../../hooks/useGetProfile";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

const ProfileOrders = () => {
  const { t } = useTranslation();
  const { data, isLoading, isError, error } = useGetProfile();

  const [page, setPage] = useState(1);

  const rowsPerPage = 5;
  if (isLoading) {
    return <CircularProgress />;
  }

  if (isError) {
    return <Typography color="error">{error.message}</Typography>;
  }

  const displayedOrders = data.orders.slice(
    (page - 1) * rowsPerPage,
    page * rowsPerPage,
  );

  return (
    <Box>
      <Typography
        variant="h4"
        sx={{
          mb: 4,
        }}
      >
        {t("My Orders")}
      </Typography>

      <TableContainer
        component={Paper}
        sx={{
          borderRadius: 3,
          border: "1px solid #e5e7eb",
          boxShadow: "none",
        }}
      >
        <Table>
          <TableHead>
            <TableRow
              sx={{
                backgroundColor: "primary.main",
              }}
            >
              <TableCell sx={{ fontWeight: 600 }}>Order ID</TableCell>
              <TableCell sx={{ fontWeight: 600 }}>Date</TableCell>
              <TableCell sx={{ fontWeight: 600 }}>Amount Paid</TableCell>
              <TableCell sx={{ fontWeight: 600 }}>Status</TableCell>
              <TableCell sx={{ fontWeight: 600 }}>Payment</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {displayedOrders.map((order) => (
              <TableRow key={order.id} hover>
                <TableCell>#{order.id}</TableCell>
                <TableCell>
                  {new Date(order.orderDate).toLocaleDateString()}
                </TableCell>
                <TableCell>${order.amountPaid}</TableCell>
                <TableCell>
                  <Chip
                    label={order.status}
                    color={
                      order.status === "Active"
                        ? "success"
                        : order.status === "Pending"
                          ? "warning"
                          : "default"
                    }
                    size="small"
                  />
                </TableCell>
                <TableCell>
                  <Chip
                    label={order.paymentStatus || "Pending"}
                    color={
                      order.paymentStatus === "Paid"
                        ? "success"
                        : order.paymentStatus === null
                          ? "warning"
                          : "error"
                    }
                    size="small"
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          mt: 4,
        }}
      >
        <Pagination
          count={Math.ceil(data.orders.length / rowsPerPage)}
          onChange={(event, value) => setPage(value)}
          renderItem={(item) => (
            <PaginationItem
              slots={{
                previous: ArrowBackIcon,
                next: ArrowForwardIcon,
              }}
              {...item}
            />
          )}
        />
      </Box>
    </Box>
  );
};

export default ProfileOrders;