import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Button, Grid, Typography, Box, Snackbar, Alert, IconButton, Dialog, DialogActions, DialogContent, DialogTitle, TextField
} from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [open, setOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [message, setMessage] = useState('');
  const [openMessage, setOpenMessage] = useState(false);
  const [formValues, setFormValues] = useState({
    email: '',
    firstName: '',
    lastName: '',
    mobileNumber: '',
    password: '',
    status: true,  // Mặc định là Active
    createdAt: new Date().toISOString(),  // Thời gian hiện tại
    createdBy: 'Admin',  // Được tạo bởi Admin
  });

  // Fetch users when the component mounts
  useEffect(() => {
    const token = localStorage.getItem('token');
    axios.get('https://localhost:7219/api/User', {
      headers: {
        'Authorization': `Bearer ${token}`,
      }
    })
      .then((response) => {
        console.log('Fetched users:', response.data);
        if (Array.isArray(response.data)) {
          const usersWithId = response.data.map(user => ({ ...user, id: user.userId }));
          setUsers(usersWithId);
        } else {
          console.error('Dữ liệu không phải là mảng');
        }
      })
      .catch((error) => {
        console.error('Error fetching users:', error);
        alert('Có lỗi xảy ra khi lấy danh sách người dùng');
      });
  }, []);

  const handleOpenDialog = (user = null) => {
    if (user) {
      setSelectedUser(user);
      setFormValues({
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        mobileNumber: user.mobileNumber,
        password: '',  // Không cần hiện thị password khi cập nhật
        status: user.status,
        createdAt: user.createdAt,
        createdBy: user.createdBy,
      });
    } else {
      setFormValues({
        email: '',
        firstName: '',
        lastName: '',
        mobileNumber: '',
        password: '',
        status: true,
        createdAt: new Date().toISOString(),
        createdBy: 'Admin',
      });
    }
    setOpen(true);
  };

  const handleCloseDialog = () => {
    setOpen(false);
    setSelectedUser(null);
  };

  const handleFormSubmit = () => {
    const token = localStorage.getItem('token');
    const userData = {
      email: formValues.email,
      firstName: formValues.firstName,
      lastName: formValues.lastName,
      mobileNumber: formValues.mobileNumber,
      password: formValues.password,
      status: formValues.status,
      createdAt: formValues.createdAt,
      createdBy: formValues.createdBy,
    };

    if (selectedUser) {
      // Cập nhật người dùng
      axios.put(`https://localhost:7219/api/User/${selectedUser.userId}`, userData, {
        headers: {
          'Authorization': `Bearer ${token}`,
        }
      })
        .then((response) => {
          setUsers(users.map((user) => (user.userId === selectedUser.userId ? response.data : user)));
          setOpenMessage('Cập nhật người dùng thành công!');
          setOpen(false);
        })
        .catch((error) => {
          console.error('Error updating user:', error);
          alert('Có lỗi xảy ra khi cập nhật người dùng');
        });
    } else {
      // Thêm người dùng mới
      axios.post('https://localhost:7219/api/User', userData, {
        headers: {
          'Authorization': `Bearer ${token}`,
        }
      })
        .then((response) => {
          setUsers([...users, { ...response.data, id: response.data.userId }]);
          setOpenMessage('Thêm người dùng thành công!');
          setOpen(false);
        })
        .catch((error) => {
          console.error('Error creating user:', error);
          alert('Có lỗi xảy ra khi thêm người dùng');
        });
    }
  };

  const handleDeleteUser = (id) => {
    const token = localStorage.getItem('token');
    axios.delete(`https://localhost:7219/api/User/${id}`, {
      headers: {
        'Authorization': `Bearer ${token}`,
      }
    })
      .then(() => {
        setUsers(users.filter((user) => user.id !== id));
        setOpenMessage('Xóa người dùng thành công!');
      })
      .catch((error) => {
        console.error('Error deleting user:', error);
        alert('Có lỗi xảy ra khi xóa người dùng');
      });
  };

  const columns = [
    { field: 'id', headerName: 'ID', width: 150 },
    { field: 'email', headerName: 'Email', width: 250 },
    { field: 'firstName', headerName: 'First Name', width: 150 },
    { field: 'lastName', headerName: 'Last Name', width: 150 },
    { field: 'mobileNumber', headerName: 'Mobile Number', width: 180 },
    { field: 'status', headerName: 'Status', width: 100, renderCell: (params) => (params.value ? 'Active' : 'Inactive') },
    { field: 'createdAt', headerName: 'Created At', width: 180 },
    { field: 'createdBy', headerName: 'Created By', width: 180 },
    { field: 'updatedAt', headerName: 'Updated At', width: 180 },
    { field: 'updatedBy', headerName: 'Updated By', width: 180 },
    { field: 'deletedAt', headerName: 'Deleted At', width: 180 },
    { field: 'deletedBy', headerName: 'Deleted By', width: 180 },
    {
      field: 'actions', headerName: 'Actions', width: 150,
      renderCell: (params) => (
        <Box>
          <IconButton onClick={() => handleOpenDialog(params.row)}>
            <EditIcon />
          </IconButton>
          <IconButton onClick={() => handleDeleteUser(params.row.id)}>
            <DeleteIcon />
          </IconButton>
        </Box>
      )
    },
  ];

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Quản Lý Người Dùng
      </Typography>

      <Button
        variant="contained"
        color="primary"
        onClick={() => handleOpenDialog()}
        sx={{ mb: 2 }}
      >
        Thêm Người Dùng
      </Button>

      <div style={{ height: 400, width: '100%' }}>
        <DataGrid rows={users} columns={columns} pageSize={5} />
      </div>

      {/* Dialog for adding or editing user */}
      <Dialog open={open} onClose={handleCloseDialog}>
        <DialogTitle>{selectedUser ? 'Cập nhật người dùng' : 'Thêm người dùng'}</DialogTitle>
        <DialogContent>
          <TextField
            label="Email"
            fullWidth
            margin="normal"
            value={formValues.email}
            onChange={(e) => setFormValues({ ...formValues, email: e.target.value })}
          />
          <TextField
            label="First Name"
            fullWidth
            margin="normal"
            value={formValues.firstName}
            onChange={(e) => setFormValues({ ...formValues, firstName: e.target.value })}
          />
          <TextField
            label="Last Name"
            fullWidth
            margin="normal"
            value={formValues.lastName}
            onChange={(e) => setFormValues({ ...formValues, lastName: e.target.value })}
          />
          <TextField
            label="Mobile Number"
            fullWidth
            margin="normal"
            value={formValues.mobileNumber}
            onChange={(e) => setFormValues({ ...formValues, mobileNumber: e.target.value })}
          />
          <TextField
            label="Password"
            type="password"
            fullWidth
            margin="normal"
            value={formValues.password}
            onChange={(e) => setFormValues({ ...formValues, password: e.target.value })}
          />
          <TextField
            label="Status"
            select
            fullWidth
            margin="normal"
            value={formValues.status}
            onChange={(e) => setFormValues({ ...formValues, status: e.target.value })}
            SelectProps={{
              native: true,
            }}
          >
            <option value={true}>Active</option>
            <option value={false}>Inactive</option>
          </TextField>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="secondary">
            Hủy
          </Button>
          <Button onClick={handleFormSubmit} color="primary">
            {selectedUser ? 'Cập nhật' : 'Thêm'}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Snackbar for success messages */}
      <Snackbar
        open={openMessage !== ''}
        autoHideDuration={2000}
        onClose={() => setOpenMessage('')}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert onClose={() => setOpenMessage('')} severity="success">
          {openMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default UserManagement;
