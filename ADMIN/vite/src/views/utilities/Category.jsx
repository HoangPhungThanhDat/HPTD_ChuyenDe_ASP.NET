import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Button, Box, Typography, Snackbar, Alert, IconButton, Dialog, DialogActions,
  DialogContent, DialogTitle, TextField
} from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

const CategoryManagement = () => {
  const [categories, setCategories] = useState([]);
  const [open, setOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [formValues, setFormValues] = useState({
    name: '',
    slug: '',
    parentId: null,
    sortOrder: 0,
    image: '',
    description: '',
    createdAt: '',
    createdBy: '',
    updatedAt: '',
    updatedBy: '',
    deletedAt: '',
    deletedBy: '',
    status: 'active',
    parent: null,
    children: []
  });
  const [openMessage, setOpenMessage] = useState('');

  const token = localStorage.getItem('token');

  const fetchCategories = async () => {
    try {
      const response = await axios.get('https://localhost:7219/api/Category', {
        headers: { Authorization: `Bearer ${token}` }
      });
      const dataWithId = response.data.map((item) => ({ ...item, id: item.categoryId }));
      setCategories(dataWithId);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleOpenDialog = (category = null) => {
    if (category) {
      setSelectedCategory(category);
      setFormValues({ ...category });
    } else {
      setSelectedCategory(null);
      setFormValues({
        name: '',
        slug: '',
        parentId: null,
        sortOrder: 0,
        image: '',
        description: '',
        createdAt: new Date().toISOString(),
        createdBy: 'admin',
        updatedAt: '',
        updatedBy: '',
        deletedAt: '',
        deletedBy: '',
        status: 'active',
        parent: null,
        children: []
      });
    }
    setOpen(true);
  };

  const handleCloseDialog = () => setOpen(false);

  const handleFormSubmit = async () => {
    try {
      const payload = { ...formValues };

      if (selectedCategory) {
        payload.updatedAt = new Date().toISOString();
        payload.updatedBy = 'admin';
        await axios.put(`https://localhost:7219/api/Category/${selectedCategory.categoryId}`, payload, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setOpenMessage('Cập nhật danh mục thành công!');
      } else {
        payload.createdAt = new Date().toISOString();
        payload.createdBy = 'admin';
        await axios.post(`https://localhost:7219/api/Category`, payload, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setOpenMessage('Thêm danh mục thành công!');
      }

      fetchCategories();
      setOpen(false);
    } catch (error) {
      console.error('Error saving category:', error);
    }
  };

  const handleDeleteCategory = async (id) => {
    try {
      await axios.delete(`https://localhost:7219/api/Category/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setOpenMessage('Xóa danh mục thành công!');
      fetchCategories();
    } catch (error) {
      console.error('Error deleting category:', error);
    }
  };

  const columns = [
    { field: 'categoryId', headerName: 'ID', width: 80 },
    { field: 'name', headerName: 'Tên danh mục', width: 180 },
    { field: 'slug', headerName: 'Slug', width: 150 },
    { field: 'parentId', headerName: 'Parent ID', width: 100 },
    { field: 'sortOrder', headerName: 'Sort Order', width: 100 },
    {
      field: 'image',
      headerName: 'Hình ảnh',
      width: 200,
      renderCell: (params) => {
        const imageUrl = params.value;
        return imageUrl ? (
          <img src={imageUrl} alt="Category" style={{ width: '100%', height: 'auto', objectFit: 'contain' }} />
        ) : (
          <Typography variant="body2" color="textSecondary">No Image</Typography>
        );
      }
    },
    { field: 'description', headerName: 'Mô tả', width: 200 },
    { field: 'createdAt', headerName: 'Ngày tạo', width: 180 },
    { field: 'createdBy', headerName: 'Người tạo', width: 120 },
    { field: 'updatedAt', headerName: 'Ngày cập nhật', width: 180 },
    { field: 'updatedBy', headerName: 'Người cập nhật', width: 120 },
    { field: 'deletedAt', headerName: 'Ngày xóa', width: 180 },
    { field: 'deletedBy', headerName: 'Người xóa', width: 120 },
    {
      field: 'status',
      headerName: 'Trạng thái',
      width: 120,
      renderCell: (params) => (params.value === 'active' || params.value === true ? 'Active' : 'Inactive')
    },
    {
      field: 'actions',
      headerName: 'Thao tác',
      width: 150,
      renderCell: (params) => (
        <Box>
          <IconButton onClick={() => handleOpenDialog(params.row)}>
            <EditIcon />
          </IconButton>
          <IconButton onClick={() => handleDeleteCategory(params.row.categoryId)}>
            <DeleteIcon />
          </IconButton>
        </Box>
      )
    }
  ];

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>Quản lý danh mục</Typography>

      <Button variant="contained" onClick={() => handleOpenDialog()} sx={{ mb: 2 }}>
        Thêm danh mục
      </Button>

      <div style={{ height: 600, width: '100%' }}>
        <DataGrid rows={categories} columns={columns} pageSize={10} />
      </div>

      {/* Dialog Form */}
      <Dialog open={open} onClose={handleCloseDialog} maxWidth="md" fullWidth>
        <DialogTitle>{selectedCategory ? 'Cập nhật danh mục' : 'Thêm danh mục'}</DialogTitle>
        <DialogContent>
          {[
            { label: 'Tên danh mục', key: 'name' },
            { label: 'Slug', key: 'slug' },
            { label: 'Parent ID', key: 'parentId', type: 'number' },
            { label: 'Sort Order', key: 'sortOrder', type: 'number' },
            { label: 'Image URL', key: 'image' },
            { label: 'Mô tả', key: 'description' },
            { label: 'Người tạo', key: 'createdBy' },
            { label: 'Người cập nhật', key: 'updatedBy' },
            { label: 'Người xóa', key: 'deletedBy' },
          ].map(({ label, key, type = 'text' }) => (
            <TextField
              key={key}
              label={label}
              fullWidth
              margin="normal"
              type={type}
              value={formValues[key] || ''}
              onChange={(e) =>
                setFormValues({ ...formValues, [key]: type === 'number' ? parseInt(e.target.value) || 0 : e.target.value })
              }
            />
          ))}

          <TextField
            label="Trạng thái"
            select
            fullWidth
            margin="normal"
            value={formValues.status}
            onChange={(e) => setFormValues({ ...formValues, status: e.target.value })}
            SelectProps={{ native: true }}
          >
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </TextField>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Hủy</Button>
          <Button onClick={handleFormSubmit} variant="contained" color="primary">
            {selectedCategory ? 'Cập nhật' : 'Thêm'}
          </Button>
        </DialogActions>
      </Dialog>

      <Snackbar
        open={!!openMessage}
        autoHideDuration={2000}
        onClose={() => setOpenMessage('')}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert severity="success" onClose={() => setOpenMessage('')}>
          {openMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default CategoryManagement;
