import React, { useEffect, useState } from 'react';
import {
  Box, Typography, Button, IconButton, Dialog, DialogTitle, DialogContent,
  DialogActions, TextField, Snackbar, Alert
} from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import axios from 'axios';

const OrderDetailManagement = () => {
  const [orderDetails, setOrderDetails] = useState([]);
  const [open, setOpen] = useState(false);
  const [selectedDetail, setSelectedDetail] = useState(null);
  const [formValues, setFormValues] = useState({
    orderId: '',
    productId: '',
    quantity: '',
    price: '',
  });
  const [openMessage, setOpenMessage] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('token');
    axios.get('https://localhost:7219/api/OrderDetail', {
      headers: { Authorization: `Bearer ${token}` },
    }).then((res) => {
      const mapped = res.data.map(item => ({ ...item, id: item.orderDetailId }));
      setOrderDetails(mapped);
    }).catch(() => alert('Không thể lấy dữ liệu chi tiết đơn hàng.'));
  }, []);

  const handleOpenDialog = (detail = null) => {
    if (detail) {
      setSelectedDetail(detail);
      setFormValues({
        orderId: detail.order?.orderId || '',
        productId: detail.product?.productId || '',
        quantity: detail.quantity,
        price: detail.price,
      });
    } else {
      setFormValues({ orderId: '', productId: '', quantity: '', price: '' });
    }
    setOpen(true);
  };

  const handleCloseDialog = () => {
    setOpen(false);
    setSelectedDetail(null);
  };

  const handleSubmit = () => {
    const token = localStorage.getItem('token');
    const data = {
      orderId: parseInt(formValues.orderId),
      productId: parseInt(formValues.productId),
      quantity: parseInt(formValues.quantity),
      price: parseFloat(formValues.price),
    };

    if (selectedDetail) {
      axios.put(`https://localhost:7219/api/OrderDetail/${selectedDetail.orderDetailId}`, data, {
        headers: { Authorization: `Bearer ${token}` },
      }).then(() => {
        setOrderDetails(orderDetails.map(od =>
          od.orderDetailId === selectedDetail.orderDetailId ? { ...od, ...data } : od
        ));
        setOpenMessage('Cập nhật chi tiết đơn hàng thành công!');
        setOpen(false);
      }).catch(() => alert('Cập nhật thất bại.'));
    } else {
      axios.post('https://localhost:7219/api/OrderDetail', data, {
        headers: { Authorization: `Bearer ${token}` },
      }).then((res) => {
        setOrderDetails([...orderDetails, { ...res.data, id: res.data.orderDetailId }]);
        setOpenMessage('Thêm chi tiết đơn hàng thành công!');
        setOpen(false);
      }).catch(() => alert('Thêm mới thất bại.'));
    }
  };

  const handleDelete = (id) => {
    const token = localStorage.getItem('token');
    axios.delete(`https://localhost:7219/api/OrderDetail/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    }).then(() => {
      setOrderDetails(orderDetails.filter(od => od.id !== id));
      setOpenMessage('Xóa thành công!');
    }).catch(() => alert('Xóa thất bại.'));
  };

  const columns = [
    { field: 'id', headerName: 'ID', width: 90 },
    { field: 'order', headerName: 'Order', width: 150, valueGetter: (params) => params.row.order?.orderId ?? 'N/A' },
    { field: 'product', headerName: 'Product', width: 150, valueGetter: (params) => params.row.product?.name ?? 'N/A' },
    { field: 'quantity', headerName: 'Quantity', width: 120 },
    { field: 'price', headerName: 'Price', width: 120 },
    {
      field: 'actions', headerName: 'Actions', width: 130,
      renderCell: (params) => (
        <>
          <IconButton onClick={() => handleOpenDialog(params.row)}><EditIcon /></IconButton>
          <IconButton onClick={() => handleDelete(params.row.id)}><DeleteIcon /></IconButton>
        </>
      )
    }
  ];

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>Quản lý Chi Tiết Đơn Hàng</Typography>
      <Button variant="contained" sx={{ mb: 2 }} onClick={() => handleOpenDialog()}>Thêm Chi Tiết</Button>
      <DataGrid rows={orderDetails} columns={columns} pageSize={5} autoHeight />
      <Dialog open={open} onClose={handleCloseDialog}>
        <DialogTitle>{selectedDetail ? 'Cập nhật Chi tiết' : 'Thêm Chi tiết'}</DialogTitle>
        <DialogContent>
          <TextField label="Order ID" fullWidth margin="normal" value={formValues.orderId} onChange={(e) => setFormValues({ ...formValues, orderId: e.target.value })} />
          <TextField label="Product ID" fullWidth margin="normal" value={formValues.productId} onChange={(e) => setFormValues({ ...formValues, productId: e.target.value })} />
          <TextField label="Quantity" fullWidth margin="normal" type="number" value={formValues.quantity} onChange={(e) => setFormValues({ ...formValues, quantity: e.target.value })} />
          <TextField label="Price" fullWidth margin="normal" type="number" value={formValues.price} onChange={(e) => setFormValues({ ...formValues, price: e.target.value })} />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="secondary">Hủy</Button>
          <Button onClick={handleSubmit} color="primary">{selectedDetail ? 'Cập nhật' : 'Thêm'}</Button>
        </DialogActions>
      </Dialog>
      <Snackbar open={!!openMessage} autoHideDuration={2000} onClose={() => setOpenMessage('')}>
        <Alert onClose={() => setOpenMessage('')} severity="success">{openMessage}</Alert>
      </Snackbar>
    </Box>
  );
};

export default OrderDetailManagement;
