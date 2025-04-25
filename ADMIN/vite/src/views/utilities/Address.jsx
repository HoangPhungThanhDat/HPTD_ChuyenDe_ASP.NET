import React, { useEffect, useState } from 'react';
import {
  Box, Typography, Button, IconButton, Snackbar, Alert,
  Dialog, DialogTitle, DialogContent, DialogActions, TextField
} from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import EditIcon from '@mui/icons-material/Edit';
import axios from 'axios';
import DeleteIcon from '@mui/icons-material/Delete';


const AddressManagement = () => {
  const [addresses, setAddresses] = useState([]);
  const [open, setOpen] = useState(false);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [openMessage, setOpenMessage] = useState('');
  const [formValues, setFormValues] = useState({
    userId: '',
    buildingName: '',
    street: '',
    city: '',
    state: '',
    postalCode: '',
    country: '',
  });

  useEffect(() => {
    const token = localStorage.getItem('token');
    axios.get('https://localhost:7219/api/Address', {
      headers: { Authorization: `Bearer ${token}` },
    }).then((res) => {
      // Mapping lại dữ liệu với các trường mới
      const mappedAddresses = res.data.map(address => ({
        ...address,
        id: address.addressId,  // Đảm bảo id là addressId
        user: address.user || { email: 'N/A' },
      }));
      setAddresses(mappedAddresses);
    }).catch((err) => {
      console.error(err);
      alert('Không thể lấy danh sách địa chỉ!');
    });
  }, []);

  const handleOpenDialog = (address = null) => {
    if (address) {
      setSelectedAddress(address);
      setFormValues({
        userId: address.user?.userId || '',
        buildingName: address.buildingName || '',
        street: address.street || '',
        city: address.city || '',
        state: address.state || '',
        postalCode: address.pincode || '', // Sử dụng pincode thay vì postalCode
        country: address.country || '',
      });
    } else {
      setFormValues({
        userId: '',
        buildingName: '',
        street: '',
        city: '',
        state: '',
        postalCode: '',
        country: '',
      });
    }
    setOpen(true);
  };

  const handleCloseDialog = () => {
    setOpen(false);
    setSelectedAddress(null);
  };

  const handleFormSubmit = () => {
    const token = localStorage.getItem('token');
    const addressData = {
      userId: formValues.userId,
      buildingName: formValues.buildingName,
      street: formValues.street,
      city: formValues.city,
      state: formValues.state,
      pincode: formValues.postalCode, // Sử dụng pincode thay vì postalCode
      country: formValues.country,
    };

    if (selectedAddress) {
      // Cập nhật địa chỉ
      axios.put(`https://localhost:7219/api/Address/${selectedAddress.addressId}`, addressData, {
        headers: { Authorization: `Bearer ${token}` },
      }).then(() => {
        setAddresses(addresses.map(a => a.addressId === selectedAddress.addressId ? { ...a, ...addressData } : a));
        setOpenMessage('Cập nhật địa chỉ thành công!');
        setOpen(false);
      }).catch(() => alert('Cập nhật địa chỉ thất bại!'));
    } else {
      // Thêm địa chỉ mới
      axios.post('https://localhost:7219/api/Address', addressData, {
        headers: { Authorization: `Bearer ${token}` },
      }).then((res) => {
        setAddresses([...addresses, { ...res.data, id: res.data.addressId }]);
        setOpenMessage('Thêm địa chỉ thành công!');
        setOpen(false);
      }).catch(() => alert('Thêm địa chỉ thất bại!'));
    }
  };

  const handleDelete = (id) => {
    const token = localStorage.getItem('token');
    axios.delete(`https://localhost:7219/api/Address/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    }).then(() => {
      setAddresses(addresses.filter(address => address.id !== id));
      setOpenMessage('Xóa địa chỉ thành công!');
    }).catch(() => alert('Xóa địa chỉ thất bại!'));
  };

  const columns = [
    { field: 'id', headerName: 'ID', width: 90 },
    {
      field: 'user',
      headerName: 'User',
      width: 200,
      valueGetter: (params) => params.row?.user?.email || 'N/A',
    },
    { field: 'buildingName', headerName: 'Building Name', width: 180 },
    { field: 'street', headerName: 'Street', width: 150 },
    { field: 'city', headerName: 'City', width: 150 },
    { field: 'state', headerName: 'State', width: 150 },
    { field: 'postalCode', headerName: 'Postal Code', width: 150 },
    { field: 'country', headerName: 'Country', width: 150 },
    {
      field: 'actions',
      headerName: 'Actions',
      width: 120,
      renderCell: (params) => {
        if (!params.row) return null;
        return (
          <>
            <IconButton onClick={() => handleOpenDialog(params.row)}><EditIcon /></IconButton>
            <IconButton onClick={() => handleDelete(params.row.id)}><DeleteIcon /></IconButton>
          </>
        );
      },
    },
  ];

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>Quản Lý Địa Chỉ</Typography>

      <Button variant="contained" color="primary" sx={{ mb: 2 }} onClick={() => handleOpenDialog()}>
        Thêm Địa Chỉ
      </Button>

      <DataGrid rows={addresses || []} columns={columns} pageSize={5} autoHeight />

      <Dialog open={open} onClose={handleCloseDialog}>
        <DialogTitle>{selectedAddress ? 'Cập nhật địa chỉ' : 'Thêm địa chỉ'}</DialogTitle>
        <DialogContent>
          <TextField
            label="User ID"
            fullWidth
            margin="normal"
            value={formValues.userId}
            onChange={(e) => setFormValues({ ...formValues, userId: e.target.value })}
          />
          <TextField
            label="Building Name"
            fullWidth
            margin="normal"
            value={formValues.buildingName}
            onChange={(e) => setFormValues({ ...formValues, buildingName: e.target.value })}
          />
          <TextField
            label="Street"
            fullWidth
            margin="normal"
            value={formValues.street}
            onChange={(e) => setFormValues({ ...formValues, street: e.target.value })}
          />
          <TextField
            label="City"
            fullWidth
            margin="normal"
            value={formValues.city}
            onChange={(e) => setFormValues({ ...formValues, city: e.target.value })}
          />
          <TextField
            label="State"
            fullWidth
            margin="normal"
            value={formValues.state}
            onChange={(e) => setFormValues({ ...formValues, state: e.target.value })}
          />
          <TextField
            label="Postal Code"
            fullWidth
            margin="normal"
            value={formValues.postalCode}
            onChange={(e) => setFormValues({ ...formValues, postalCode: e.target.value })}
          />
          <TextField
            label="Country"
            fullWidth
            margin="normal"
            value={formValues.country}
            onChange={(e) => setFormValues({ ...formValues, country: e.target.value })}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="secondary">Hủy</Button>
          <Button onClick={handleFormSubmit} color="primary">{selectedAddress ? 'Cập nhật' : 'Thêm'}</Button>
        </DialogActions>
      </Dialog>

      <Snackbar open={openMessage !== ''} autoHideDuration={2000} onClose={() => setOpenMessage('')}>
        <Alert onClose={() => setOpenMessage('')} severity="success">{openMessage}</Alert>
      </Snackbar>
    </Box>
  );
};

export default AddressManagement;
