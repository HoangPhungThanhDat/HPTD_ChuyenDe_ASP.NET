import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  Box, Button, Typography, IconButton, Snackbar, Alert,
  Dialog, DialogActions, DialogContent, DialogTitle, TextField, MenuItem
} from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

export default function BrandAdminPage() {
  const [brands, setBrands] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [editingBrand, setEditingBrand] = useState(null);
  const [successMsg, setSuccessMsg] = useState('');
  const token = localStorage.getItem('token');

  const defaultForm = {
    name: '',
    slug: '',
    image: '',
    sortOrder: 0,
    status: 'active',
    description: '',
    createdAt: '',
    createdBy: '',
    updatedAt: '',
    updatedBy: '',
    deletedAt: '',
    deletedBy: ''
  };

  const [form, setForm] = useState(defaultForm);

  const fetchBrands = async () => {
    const res = await axios.get('https://localhost:7219/api/Brand', {
      headers: { Authorization: token }
    });
    setBrands(res.data.map(brand => ({ ...brand, id: brand.brandId })));
  };

  useEffect(() => {
    fetchBrands();
  }, []);

  const handleOpenDialog = (brand = null) => {
    if (brand) {
      setEditingBrand(brand);
      setForm({ ...brand });
    } else {
      setEditingBrand(null);
      setForm({ ...defaultForm });
    }
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setEditingBrand(null);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    try {
      const formData = { ...form };
      delete formData.createdAt;
      delete formData.createdBy;
      delete formData.updatedAt;
      delete formData.updatedBy;
      delete formData.deletedAt;
      delete formData.deletedBy;

      if (editingBrand) {
        await axios.put(`https://localhost:7219/api/Brand/${editingBrand.brandId}`, formData, {
          headers: { Authorization: token }
        });
        setSuccessMsg('Cập nhật thành công');
      } else {
        await axios.post('https://localhost:7219/api/Brand', formData, {
          headers: { Authorization: token }
        });
        setSuccessMsg('Tạo mới thành công');
      }

      fetchBrands();
      handleCloseDialog();
    } catch (err) {
      alert('Lỗi xử lý brand.');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Bạn có chắc chắn muốn xóa brand này?')) return;
    await axios.delete(`https://localhost:7219/api/Brand/${id}`, {
      headers: { Authorization: token }
    });
    fetchBrands();
    setSuccessMsg('Xóa thành công');
  };

  const columns = [
    { field: 'id', headerName: 'ID', width: 150 },
    { field: 'name', headerName: 'Tên', width: 200 },
    { field: 'slug', headerName: 'Slug', width: 180 },
    { field: 'sortOrder', headerName: 'Thứ tự', width: 120 },
    { field: 'status', headerName: 'Trạng thái', width: 130 },
    { field: 'createdAt', headerName: 'Ngày tạo', width: 180 },
    { field: 'createdBy', headerName: 'Người tạo', width: 150 },
    { field: 'updatedAt', headerName: 'Ngày cập nhật', width: 180 },
    { field: 'updatedBy', headerName: 'Người cập nhật', width: 150 },
    { field: 'deletedAt', headerName: 'Ngày xóa', width: 180 },
    { field: 'deletedBy', headerName: 'Người xóa', width: 150 },
    {
      field: 'actions', headerName: 'Hành động', width: 150,
      renderCell: (params) => (
        <Box>
          <IconButton onClick={() => handleOpenDialog(params.row)}>
            <EditIcon />
          </IconButton>
          <IconButton onClick={() => handleDelete(params.row.id)}>
            <DeleteIcon />
          </IconButton>
        </Box>
      ),
    },
  ];

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>Quản Lý Brand</Typography>

      <Button variant="contained" color="primary" onClick={() => handleOpenDialog()} sx={{ mb: 2 }}>
        Thêm Brand
      </Button>

      <div style={{ height: 500, width: '100%' }}>
        <DataGrid rows={brands} columns={columns} pageSize={5} />
      </div>

      <Dialog open={openDialog} onClose={handleCloseDialog} fullWidth maxWidth="md">
        <DialogTitle>{editingBrand ? 'Cập nhật Brand' : 'Thêm Brand'}</DialogTitle>
        <DialogContent>
          <TextField label="Tên" fullWidth margin="normal" name="name" value={form.name} onChange={handleChange} />
          <TextField label="Slug" fullWidth margin="normal" name="slug" value={form.slug} onChange={handleChange} />
          <TextField label="Thứ tự" fullWidth margin="normal" type="number" name="sortOrder" value={form.sortOrder} onChange={handleChange} />
          <TextField label="Hình ảnh (URL)" fullWidth margin="normal" name="image" value={form.image} onChange={handleChange} />
          <TextField label="Mô tả" fullWidth margin="normal" name="description" value={form.description} onChange={handleChange} />
          <TextField select label="Trạng thái" fullWidth margin="normal" name="status" value={form.status} onChange={handleChange}>
            <MenuItem value="active">Hiển thị</MenuItem>
            <MenuItem value="inactive">Ẩn</MenuItem>
          </TextField>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Hủy</Button>
          <Button onClick={handleSubmit} variant="contained">Lưu</Button>
        </DialogActions>
      </Dialog>

      <Snackbar open={!!successMsg} autoHideDuration={2000} onClose={() => setSuccessMsg('')} anchorOrigin={{ vertical: 'top', horizontal: 'center' }}>
        <Alert onClose={() => setSuccessMsg('')} severity="success" sx={{ width: '100%' }}>
          {successMsg}
        </Alert>
      </Snackbar>
    </Box>
  );
}
