import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  Box, Typography, Button, Dialog, DialogActions, DialogContent, DialogTitle,
  TextField, Snackbar, Alert, IconButton
} from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

const RoleManagement = () => {
  const [roles, setRoles] = useState([]);
  const [open, setOpen] = useState(false);
  const [selectedRole, setSelectedRole] = useState(null);
  const [formValues, setFormValues] = useState({
    roleName: '',
    createdAt: '', // Thêm trường createdAt
    createdBy: 'admin', // Trường người thêm mặc định là 'admin'
    updatedAt: '',
    updatedBy: '',
    deletedAt: '',
    deletedBy: '',
  });
  const [openMessage, setOpenMessage] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('token');
    axios.get('https://localhost:7219/api/Role', {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then((res) => {
        const rolesWithId = res.data.map(role => ({
          ...role, 
          id: role.roleId, 
          createdAt: new Date(role.createdAt).toLocaleString(),
          updatedAt: role.updatedAt ? new Date(role.updatedAt).toLocaleString() : '',
          deletedAt: role.deletedAt ? new Date(role.deletedAt).toLocaleString() : '',
        }));
        setRoles(rolesWithId);
      })
      .catch(err => {
        console.error('Error fetching roles:', err);
        alert('Lỗi khi lấy danh sách vai trò');
      });
  }, []);

  const handleOpenDialog = (role = null) => {
    if (role) {
      setSelectedRole(role);
      setFormValues({
        roleName: role.roleName,
        createdAt: role.createdAt,
        createdBy: role.createdBy,
        updatedAt: role.updatedAt,
        updatedBy: role.updatedBy,
        deletedAt: role.deletedAt,
        deletedBy: role.deletedBy,
      });
    } else {
      setSelectedRole(null);
      setFormValues({
        roleName: '',
        createdAt: new Date().toLocaleString(), // Gán ngày giờ hiện tại khi tạo mới
        createdBy: 'admin', // Gán người thêm mặc định là 'admin'
        updatedAt: '',
        updatedBy: '',
        deletedAt: '',
        deletedBy: '',
      });
    }
    setOpen(true);
  };

  const handleCloseDialog = () => {
    setOpen(false);
    setSelectedRole(null);
  };

  const handleFormSubmit = () => {
    const token = localStorage.getItem('token');
    if (selectedRole) {
      axios.put(`https://localhost:7219/api/Role/${selectedRole.roleId}`, formValues, {
        headers: { Authorization: `Bearer ${token}` }
      })
        .then((res) => {
          setRoles(roles.map(role => (role.roleId === selectedRole.roleId ? { ...res.data, id: res.data.roleId } : role)));
          setOpenMessage('Cập nhật vai trò thành công!');
          setOpen(false);
        })
        .catch((err) => {
          console.error('Error updating role:', err);
          alert('Lỗi khi cập nhật vai trò');
        });
    } else {
      axios.post('https://localhost:7219/api/Role', formValues, {
        headers: { Authorization: `Bearer ${token}` }
      })
        .then((res) => {
          setRoles([...roles, { ...res.data, id: res.data.roleId }]);
          setOpenMessage('Thêm vai trò thành công!');
          setOpen(false);
        })
        .catch((err) => {
          console.error('Error creating role:', err);
          alert('Lỗi khi thêm vai trò');
        });
    }
  };

  const handleDeleteRole = (id) => {
    const token = localStorage.getItem('token');
    axios.delete(`https://localhost:7219/api/Role/${id}`, {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(() => {
        setRoles(roles.filter(role => role.id !== id));
        setOpenMessage('Xóa vai trò thành công!');
      })
      .catch(err => {
        console.error('Error deleting role:', err);
        alert('Lỗi khi xóa vai trò');
      });
  };

  const columns = [
    { field: 'id', headerName: 'ID', width: 150 },
    { field: 'roleName', headerName: 'Tên vai trò', width: 200 },
    { field: 'createdAt', headerName: 'Ngày tạo', width: 250 },
    { field: 'createdBy', headerName: 'Tạo bởi', width: 200 },
    { field: 'updatedAt', headerName: 'Ngày cập nhật', width: 250 },
    { field: 'updatedBy', headerName: 'Cập nhật bởi', width: 200 },
    { field: 'deletedAt', headerName: 'Ngày xóa', width: 250 },
    { field: 'deletedBy', headerName: 'Xóa bởi', width: 200 },
    {
      field: 'actions', headerName: 'Thao tác', width: 150,
      renderCell: (params) => (
        <Box>
          <IconButton onClick={() => handleOpenDialog(params.row)}>
            <EditIcon />
          </IconButton>
          <IconButton onClick={() => handleDeleteRole(params.row.id)}>
            <DeleteIcon />
          </IconButton>
        </Box>
      )
    },
  ];

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Quản Lý Vai Trò
      </Typography>
      <Button variant="contained" onClick={() => handleOpenDialog()} sx={{ mb: 2 }}>
        Thêm Vai Trò
      </Button>
      <div style={{ height: 400, width: '100%' }}>
        <DataGrid rows={roles} columns={columns} pageSize={5} />
      </div>

      <Dialog open={open} onClose={handleCloseDialog}>
        <DialogTitle>{selectedRole ? 'Cập nhật vai trò' : 'Thêm vai trò'}</DialogTitle>
        <DialogContent>
          <TextField
            label="Tên vai trò"
            fullWidth
            margin="normal"
            value={formValues.roleName}
            onChange={(e) => setFormValues({ ...formValues, roleName: e.target.value })}
          />
          {/* Trường ngày tạo không cần cho người dùng nhập, sẽ tự động lấy giá trị */}
          <TextField
            label="Ngày tạo"
            fullWidth
            margin="normal"
            value={formValues.createdAt}
            disabled
          />
          {/* Trường người thêm mặc định là admin */}
          <TextField
            label="Người thêm"
            fullWidth
            margin="normal"
            value={formValues.createdBy}
            disabled
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="secondary">Hủy</Button>
          <Button onClick={handleFormSubmit} color="primary">{selectedRole ? 'Cập nhật' : 'Thêm'}</Button>
        </DialogActions>
      </Dialog>

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

export default RoleManagement;
