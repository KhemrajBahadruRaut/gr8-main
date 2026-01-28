"use client";
import React, { useEffect, useState, useCallback } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  Box,
  CircularProgress,
  Alert,
  Chip,
  IconButton,
  Tooltip,
  TextField,
  InputAdornment,
  TablePagination,
  Card,
  CardContent,
} from "@mui/material";
import {
  Search,
  Refresh,
  Download,
  Email,
  Person,
  CalendarToday,
  FilterList,
  Delete,
} from "@mui/icons-material";
import { format } from "date-fns";

interface Subscriber {
  id: number;
  first_name: string;
  email: string;
  created_at: string;
  status?: "active" | "unsubscribed";
}

const NewsletterAdmin: React.FC = () => {
  const [subscribers, setSubscribers] = useState<Subscriber[]>([]);
  const [filteredSubscribers, setFilteredSubscribers] = useState<Subscriber[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [page, setPage] = useState<number>(0);
  const [rowsPerPage, setRowsPerPage] = useState<number>(10);
  const [totalCount, setTotalCount] = useState<number>(0);

  const fetchSubscribers = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      // const res = await fetch("http://localhost/gr8/api/newsletter/get_subscriber.php");
      const res = await fetch("https://gr8.com.np/gr8/api/newsletter/get_subscriber.php");
      if (!res.ok) {
        throw new Error(`Failed to fetch: ${res.status}`);
      }
      const data: Subscriber[] = await res.json();
      setSubscribers(data);
      setFilteredSubscribers(data);
      setTotalCount(data.length);
    } catch (err: any) {
      setError(err.message || "Failed to fetch subscribers");
      console.error("Fetch error:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchSubscribers();
  }, [fetchSubscribers]);

  useEffect(() => {
    const filtered = subscribers.filter(
      (sub) =>
        sub.first_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        sub.email.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredSubscribers(filtered);
    setTotalCount(filtered.length);
    setPage(0);
  }, [searchTerm, subscribers]);

  const handleDeleteSubscriber = async (id: number) => {
    if (!confirm("Are you sure you want to delete this subscriber?")) return;
    
    try {
      const res = await fetch(
        // `http://localhost/gr8/api/newsletter/delete_subscriber.php?id=${id}`,
        `https://gr8.com.np/gr8/api/newsletter/delete_subscriber.php?id=${id}`,
        { method: "DELETE" }
      );
      if (!res.ok) throw new Error("Failed to delete");
      
      setSubscribers(subscribers.filter((sub) => sub.id !== id));
    } catch (err) {
      setError("Failed to delete subscriber");
    }
  };

  const handleExportCSV = () => {
    const headers = ["ID", "First Name", "Email", "Subscribed At"];
    const csvContent = [
      headers.join(","),
      ...filteredSubscribers.map((sub) =>
        [
          sub.id,
          `"${sub.first_name}"`,
          `"${sub.email}"`,
          `"${format(new Date(sub.created_at), "yyyy-MM-dd HH:mm:ss")}"`,
        ].join(",")
      ),
    ].join("\n");

    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `subscribers_${format(new Date(), "yyyy-MM-dd")}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  const formatDate = (dateString: string) => {
    try {
      return format(new Date(dateString), "MMM dd, yyyy HH:mm");
    } catch {
      return dateString;
    }
  };

  if (loading && subscribers.length === 0) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="400px">
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box sx={{ p: 3, backgroundColor: "#f5f5f5", minHeight: "100vh" }}>
      <Card elevation={0} sx={{ mb: 3, borderRadius: 2 }}>
        <CardContent>
          <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
            <Box>
              <Typography variant="h4" fontWeight={600} color="primary">
                Newsletter Subscribers
              </Typography>
              <Typography variant="body2" color="textSecondary">
                Manage your newsletter subscribers and their preferences
              </Typography>
            </Box>
            <Box display="flex" gap={2}>
              <Tooltip title="Refresh">
                <IconButton onClick={fetchSubscribers} color="primary">
                  <Refresh />
                </IconButton>
              </Tooltip>
              <Tooltip title="Export CSV">
                <IconButton onClick={handleExportCSV} color="primary">
                  <Download />
                </IconButton>
              </Tooltip>
            </Box>
          </Box>

          {error && (
            <Alert severity="error" sx={{ mb: 3 }} onClose={() => setError("")}>
              {error}
            </Alert>
          )}

          <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
            <TextField
              placeholder="Search subscribers by name or email..."
              variant="outlined"
              size="small"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              sx={{ width: 400 }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Search />
                  </InputAdornment>
                ),
              }}
            />
            <Box display="flex" alignItems="center" gap={1}>
              <Chip
                icon={<Person />}
                label={`${totalCount} Subscribers`}
                color="primary"
                variant="outlined"
              />
              <Tooltip title="Filter">
                <IconButton>
                  <FilterList />
                </IconButton>
              </Tooltip>
            </Box>
          </Box>
        </CardContent>
      </Card>

      <Card elevation={0} sx={{ borderRadius: 2 }}>
        <TableContainer component={Paper} elevation={0}>
          <Table sx={{ minWidth: 650 }}>
            <TableHead sx={{ backgroundColor: "#f8f9fa" }}>
              <TableRow>
                <TableCell sx={{ fontWeight: 600, color: "#666" }}>ID</TableCell>
                <TableCell sx={{ fontWeight: 600, color: "#666" }}>
                  <Box display="flex" alignItems="center" gap={1}>
                    <Person fontSize="small" /> Name
                  </Box>
                </TableCell>
                <TableCell sx={{ fontWeight: 600, color: "#666" }}>
                  <Box display="flex" alignItems="center" gap={1}>
                    <Email fontSize="small" /> Email Address
                  </Box>
                </TableCell>
                <TableCell sx={{ fontWeight: 600, color: "#666" }}>
                  <Box display="flex" alignItems="center" gap={1}>
                    <CalendarToday fontSize="small" /> Subscription Date
                  </Box>
                </TableCell>
                <TableCell sx={{ fontWeight: 600, color: "#666" }}>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredSubscribers.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={5} align="center" sx={{ py: 4 }}>
                    <Box textAlign="center">
                      <Email sx={{ fontSize: 60, color: "#e0e0e0", mb: 2 }} />
                      <Typography variant="h6" color="textSecondary" gutterBottom>
                        No subscribers found
                      </Typography>
                      <Typography variant="body2" color="textSecondary">
                        {searchTerm
                          ? "Try adjusting your search terms"
                          : "Subscribers will appear here once they sign up"}
                      </Typography>
                    </Box>
                  </TableCell>
                </TableRow>
              ) : (
                filteredSubscribers
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((sub) => (
                    <TableRow
                      key={sub.id}
                      hover
                      sx={{
                        "&:hover": { backgroundColor: "#f8f9fa" },
                        transition: "background-color 0.2s",
                      }}
                    >
                      <TableCell>
                        <Chip label={`#${sub.id}`} size="small" variant="outlined" />
                      </TableCell>
                      <TableCell>
                        <Typography fontWeight={500}>{sub.first_name}</Typography>
                      </TableCell>
                      <TableCell>
                        <Box display="flex" alignItems="center" gap={1}>
                          <Email fontSize="small" color="action" />
                          <Typography>{sub.email}</Typography>
                        </Box>
                      </TableCell>
                      <TableCell>
                        <Box display="flex" alignItems="center" gap={1}>
                          <CalendarToday fontSize="small" color="action" />
                          <Typography variant="body2" color="textSecondary">
                            {formatDate(sub.created_at)}
                          </Typography>
                        </Box>
                      </TableCell>
                      <TableCell>
                        <Box display="flex" gap={1}>
                          <Tooltip title="Send email">
                            <IconButton size="small" color="primary">
                              <Email fontSize="small" />
                            </IconButton>
                          </Tooltip>
                          <Tooltip title="Delete subscriber">
                            <IconButton
                              size="small"
                              color="error"
                              onClick={() => handleDeleteSubscriber(sub.id)}
                            >
                              <Delete fontSize="small" />
                            </IconButton>
                          </Tooltip>
                        </Box>
                      </TableCell>
                    </TableRow>
                  ))
              )}
            </TableBody>
          </Table>
        </TableContainer>

        {filteredSubscribers.length > 0 && (
          <TablePagination
            component="div"
            count={totalCount}
            page={page}
            onPageChange={(_, newPage) => setPage(newPage)}
            rowsPerPage={rowsPerPage}
            onRowsPerPageChange={(e) => {
              setRowsPerPage(parseInt(e.target.value, 10));
              setPage(0);
            }}
            rowsPerPageOptions={[5, 10, 25, 50]}
            sx={{ borderTop: 1, borderColor: "divider" }}
          />
        )}
      </Card>

      <Box mt={3} display="flex" justifyContent="space-between" alignItems="center">
        <Typography variant="body2" color="textSecondary">
          Showing {filteredSubscribers.length === 0 ? 0 : page * rowsPerPage + 1}-
          {Math.min((page + 1) * rowsPerPage, totalCount)} of {totalCount} subscribers
        </Typography>
        <Typography variant="body2" color="textSecondary">
          Last updated: {format(new Date(), "MMM dd, yyyy HH:mm")}
        </Typography>
      </Box>
    </Box>
  );
};

export default NewsletterAdmin;