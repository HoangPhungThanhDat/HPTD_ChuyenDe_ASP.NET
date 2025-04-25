import React, { useEffect, useState } from 'react';
import {
  Box, Typography, Button, IconButton, Snackbar, Alert,
  Dialog, DialogTitle, DialogContent, DialogActions, TextField, Grid
} from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import axios from 'axios';

const OrderManagement = () => {
  const [orders, setOrders] = useState([]);
  const [open, setOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [openMessage, setOpenMessage] = useState('');
  const [formValues, setFormValues] = useState({
    userId: '',
    deliveryName: '',
    deliveryGender: '',
    deliveryEmail: '',
    deliveryPhone: '',
    deliveryAddress: '',
    note: '',
    createdAt: new Date().toISOString(),
    createdBy: 'admin', // Giả sử "admin" là người tạo đơn hàng
    updatedAt: new Date().toISOString(),
    updatedBy: 'admin', // Giả sử "admin" là người cập nhật đơn hàng
    type: 'Express',
    status: '',
  });

  useEffect(() => {
    const token = localStorage.getItem('token');
    axios.get('https://localhost:7219/api/Order', {
      headers: { Authorization: `Bearer ${token}` },
    }).then((res) => {
      const mappedOrders = res.data.map(order => ({ ...order, id: order.orderId }));
      setOrders(mappedOrders);
    }).catch((err) => {
      console.error(err);
      alert('Không thể lấy danh sách đơn hàng!');
    });
  }, []);

  const handleOpenDialog = (order = null) => {
    if (order) {
      setSelectedOrder(order);
      setFormValues({
        userId: order.userId || '',
        deliveryName: order.deliveryName || '',
        deliveryGender: order.deliveryGender || '',
        deliveryEmail: order.deliveryEmail || '',
        deliveryPhone: order.deliveryPhone || '',
        deliveryAddress: order.deliveryAddress || '',
        note: order.note || '',
        createdAt: order.createdAt,
        createdBy: order.createdBy || 'admin',
        updatedAt: order.updatedAt,
        updatedBy: order.updatedBy || 'admin',
        type: order.type || 'Express',
        status: order.status || '',
      });
    } else {
      setFormValues({
        userId: '',
        deliveryName: '',
        deliveryGender: '',
        deliveryEmail: '',
        deliveryPhone: '',
        deliveryAddress: '',
        note: '',
        createdAt: new Date().toISOString(),
        createdBy: 'admin',
        updatedAt: new Date().toISOString(),
        updatedBy: 'admin',
        type: 'Express',
        status: '',
      });
    }
    setOpen(true);
  };

  const handleCloseDialog = () => {
    setOpen(false);
    setSelectedOrder(null);
  };

  const handleFormSubmit = () => {
    const token = localStorage.getItem('token');
    const orderData = {
      userId: formValues.userId,
      deliveryName: formValues.deliveryName,
      deliveryGender: formValues.deliveryGender,
      deliveryEmail: formValues.deliveryEmail,
      deliveryPhone: formValues.deliveryPhone,
      deliveryAddress: formValues.deliveryAddress,
      note: formValues.note,
      createdAt: formValues.createdAt,
      createdBy: formValues.createdBy,
      updatedAt: new Date().toISOString(),
      updatedBy: formValues.updatedBy,
      type: formValues.type,
      status: formValues.status,
    };

    if (selectedOrder) {
      axios.put(`https://localhost:7219/api/Order/${selectedOrder.orderId}`, orderData, {
        headers: { Authorization: `Bearer ${token}` },
      }).then(() => {
        setOrders(orders.map(o => o.orderId === selectedOrder.orderId ? { ...o, ...orderData } : o));
        setOpenMessage('Cập nhật đơn hàng thành công!');
        setOpen(false);
      }).catch(() => alert('Cập nhật đơn hàng thất bại!'));
    } else {
      axios.post('https://localhost:7219/api/Order', orderData, {
        headers: { Authorization: `Bearer ${token}` },
      }).then((res) => {
        setOrders([...orders, { ...res.data, id: res.data.orderId }]);
        setOpenMessage('Thêm đơn hàng thành công!');
        setOpen(false);
      }).catch(() => alert('Thêm đơn hàng thất bại!'));
    }
  };

  const handleDelete = (id) => {
    const token = localStorage.getItem('token');
    axios.delete(`https://localhost:7219/api/Order/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    }).then(() => {
      setOrders(orders.filter(order => order.id !== id));
      setOpenMessage('Xóa đơn hàng thành công!');
    }).catch(() => alert('Xóa đơn hàng thất bại!'));
  };

  const columns = [
    { field: 'id', headerName: 'ID', width: 90 },
    { field: 'deliveryName', headerName: 'Tên Giao Hàng', width: 200 },
    { field: 'deliveryPhone', headerName: 'Số Điện Thoại', width: 150 },
    { field: 'deliveryAddress', headerName: 'Địa Chỉ Giao Hàng', width: 250 },
    { field: 'status', headerName: 'Trạng Thái', width: 150 },
    { field: 'orderDate', headerName: 'Ngày Đặt Hàng', width: 200 },
    {
      field: 'actions',
      headerName: 'Hành Động',
      width: 120,
      renderCell: (params) => (
        <>
          <IconButton onClick={() => handleOpenDialog(params.row)}><EditIcon /></IconButton>
          <IconButton onClick={() => handleDelete(params.row.id)}><DeleteIcon /></IconButton>
        </>
      ),
    },
  ];

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>Quản Lý Đơn Hàng</Typography>

      <Button variant="contained" color="primary" sx={{ mb: 2 }} onClick={() => handleOpenDialog()}>
        Thêm Đơn Hàng
      </Button>

      <Box sx={{ width: '100%', overflowX: 'auto' }}>
        <DataGrid
          rows={orders}
          columns={columns}
          pageSize={5}
          autoHeight
        />
      </Box>

      <Dialog open={open} onClose={handleCloseDialog}>
        <DialogTitle>{selectedOrder ? 'Cập nhật đơn hàng' : 'Thêm đơn hàng'}</DialogTitle>
        <DialogContent>
          <TextField
            label="User ID"
            fullWidth
            margin="normal"
            value={formValues.userId}
            onChange={(e) => setFormValues({ ...formValues, userId: e.target.value })}
          />
          <TextField
            label="Tên Giao Hàng"
            fullWidth
            margin="normal"
            value={formValues.deliveryName}
            onChange={(e) => setFormValues({ ...formValues, deliveryName: e.target.value })}
          />
          <TextField
            label="Giới Tính"
            fullWidth
            margin="normal"
            value={formValues.deliveryGender}
            onChange={(e) => setFormValues({ ...formValues, deliveryGender: e.target.value })}
          />
          <TextField
            label="Email"
            fullWidth
            margin="normal"
            value={formValues.deliveryEmail}
            onChange={(e) => setFormValues({ ...formValues, deliveryEmail: e.target.value })}
          />
          <TextField
            label="Số Điện Thoại"
            fullWidth
            margin="normal"
            value={formValues.deliveryPhone}
            onChange={(e) => setFormValues({ ...formValues, deliveryPhone: e.target.value })}
          />
          <TextField
            label="Địa Chỉ"
            fullWidth
            margin="normal"
            value={formValues.deliveryAddress}
            onChange={(e) => setFormValues({ ...formValues, deliveryAddress: e.target.value })}
          />
          <TextField
            label="Ghi Chú"
            fullWidth
            margin="normal"
            value={formValues.note}
            onChange={(e) => setFormValues({ ...formValues, note: e.target.value })}
          />
          <TextField
            label="Ngày Đặt Hàng"
            type="datetime-local"
            fullWidth
            margin="normal"
            value={formValues.createdAt.slice(0, 16)}
            onChange={(e) => setFormValues({ ...formValues, createdAt: e.target.value })}
          />
          <TextField
            label="Trạng Thái"
            fullWidth
            margin="normal"
            value={formValues.status}
            onChange={(e) => setFormValues({ ...formValues, status: e.target.value })}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="secondary">Hủy</Button>
          <Button onClick={handleFormSubmit} color="primary">{selectedOrder ? 'Cập nhật' : 'Thêm'}</Button>
        </DialogActions>
      </Dialog>

      <Snackbar open={openMessage !== ''} autoHideDuration={2000} onClose={() => setOpenMessage('')}>
        <Alert onClose={() => setOpenMessage('')} severity="success">{openMessage}</Alert>
      </Snackbar>
    </Box>
  );
};

export default OrderManagement;
