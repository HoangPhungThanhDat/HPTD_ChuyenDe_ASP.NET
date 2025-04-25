import { useState, useEffect } from 'react';
import {
  Button, Grid, Typography, Box, TextField, Snackbar, Alert, IconButton, MenuItem
} from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import axios from 'axios';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';

export default function ProductManagement() {
  const [products, setProducts] = useState([]);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarType, setSnackbarType] = useState('success');
  const [showForm, setShowForm] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [selectedId, setSelectedId] = useState(null);

  const [product, setProduct] = useState({
    name: '',
    priceBuy: '',
    priceSale: '',
    qty: '',
    description: '',
    content: '',
    image: '',
    categoryId: '',
    brandId: '',
    slug: '',
    status: 'active',
  });

  const token = localStorage.getItem('token');

  const fetchProducts = () => {
    axios.get('https://localhost:7219/api/Products', {
      headers: { 'Authorization': `Bearer ${token}` }
    })
      .then(res => {
        const data = res.data.map(p => ({ id: p.productId, ...p }));
        setProducts(data);
      })
      .catch(err => {
        console.error(err);
        showSnackbar('Không thể tải dữ liệu sản phẩm.', 'error');
      });
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const showSnackbar = (message, type = 'success') => {
    setSnackbarMessage(message);
    setSnackbarType(type);
    setOpenSnackbar(true);
  };

  const handleChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    const apiUrl = isEditing
      ? `https://localhost:7219/api/Products/${selectedId}`
      : 'https://localhost:7219/api/Products';
    const method = isEditing ? 'put' : 'post';

    // Tạo bản sao của dữ liệu sản phẩm và thêm createdAt, createdBy khi thêm mới
    const dataToSend = { ...product };
    if (!isEditing) {
      dataToSend.createdAt = new Date().toISOString();
      dataToSend.createdBy = 'admin';
    }

    axios[method](apiUrl, dataToSend, {
      headers: { 'Authorization': `Bearer ${token}` }
    })
      .then(() => {
        showSnackbar(isEditing ? 'Cập nhật sản phẩm thành công!' : 'Thêm sản phẩm thành công!');
        resetForm();
        fetchProducts();
      })
      .catch(err => {
        console.error(err);
        showSnackbar('Có lỗi xảy ra khi lưu sản phẩm!', 'error');
      });
  };

  const handleEdit = (id) => {
    const p = products.find(p => p.id === id);
    if (p) {
      setProduct({ ...p });
      setIsEditing(true);
      setSelectedId(id);
      setShowForm(true);
    }
  };

  const handleDelete = (id) => {
    if (window.confirm('Bạn có chắc chắn muốn xóa sản phẩm này?')) {
      axios.delete(`https://localhost:7219/api/Products/${id}`, {
        headers: { 'Authorization': `Bearer ${token}` }
      })
        .then(() => {
          showSnackbar('Sản phẩm đã được xóa!');
          fetchProducts();
        })
        .catch(err => {
          console.error(err);
          showSnackbar('Có lỗi xảy ra khi xóa sản phẩm!', 'error');
        });
    }
  };

  const resetForm = () => {
    setProduct({
      name: '',
      priceBuy: '',
      priceSale: '',
      qty: '',
      description: '',
      content: '',
      image: '',
      categoryId: '',
      brandId: '',
      slug: '',
      status: 'active',
    });
    setIsEditing(false);
    setSelectedId(null);
    setShowForm(false);
  };

  const columns = [
    { field: 'id', headerName: 'ID', width: 90 },
    { field: 'name', headerName: 'Tên sản phẩm', width: 160 },
    { field: 'priceBuy', headerName: 'Giá mua', width: 120 },
    { field: 'priceSale', headerName: 'Giá bán', width: 120 },
    { field: 'qty', headerName: 'Số lượng', width: 100 },
    { field: 'description', headerName: 'Mô tả', width: 200 },
    { field: 'content', headerName: 'Nội dung', width: 200 },
    {
      field: 'image',
      headerName: 'Hình ảnh',
      width: 120,
      renderCell: (params) => (
        <img src={params.value} alt="" style={{ width: 50, height: 'auto' }} />
      ),
    },
    { field: 'slug', headerName: 'Slug', width: 120 },
    { field: 'categoryId', headerName: 'Mã danh mục', width: 120 },
    { field: 'brandId', headerName: 'Mã thương hiệu', width: 120 },
    { field: 'status', headerName: 'Trạng thái', width: 120 },
    {
      field: 'actions',
      headerName: 'Hành động',
      width: 150,
      renderCell: (params) => (
        <>
          <IconButton onClick={() => handleEdit(params.row.id)}><EditIcon /></IconButton>
          <IconButton onClick={() => handleDelete(params.row.id)}><DeleteIcon /></IconButton>
        </>
      ),
    }
  ];

  return (
    <Box sx={{ p: 2 }}>
      <Typography variant="h4" gutterBottom>Quản lý sản phẩm</Typography>

      <Button
        variant="contained"
        startIcon={<AddIcon />}
        onClick={() => setShowForm(!showForm)}
        sx={{ mb: 2 }}
      >
        {showForm ? 'Ẩn form' : isEditing ? 'Cập nhật sản phẩm' : 'Thêm sản phẩm'}
      </Button>

      {showForm && (
        <Grid container spacing={2} sx={{ mb: 3 }}>
          {[ 
            { label: 'Tên sản phẩm', name: 'name' },
            { label: 'Giá mua', name: 'priceBuy', type: 'number' },
            { label: 'Giá bán', name: 'priceSale', type: 'number' },
            { label: 'Số lượng', name: 'qty', type: 'number' },
            { label: 'Slug', name: 'slug' },
            { label: 'Mô tả', name: 'description' },
            { label: 'Nội dung', name: 'content' },
            { label: 'Ảnh (URL)', name: 'image' },
            { label: 'Mã danh mục', name: 'categoryId', type: 'number' },
            { label: 'Mã thương hiệu', name: 'brandId', type: 'number' },
          ].map(({ label, name, type = 'text' }) => (
            <Grid item xs={12} sm={6} md={4} key={name}>
              <TextField
                label={label}
                name={name}
                type={type}
                fullWidth
                value={product[name]}
                onChange={handleChange}
              />
            </Grid>
          ))}

          <Grid item xs={12} sm={6} md={4}>
            <TextField
              select
              label="Trạng thái"
              name="status"
              fullWidth
              value={product.status}
              onChange={handleChange}
            >
              <MenuItem value="active">Hoạt động</MenuItem>
              <MenuItem value="inactive">Không hoạt động</MenuItem>
            </TextField>
          </Grid>

          <Grid item xs={12}>
            <Button
              variant="contained"
              color={isEditing ? 'warning' : 'success'}
              fullWidth
              onClick={handleSubmit}
            >
              {isEditing ? 'Cập nhật sản phẩm' : 'Thêm sản phẩm'}
            </Button>
          </Grid>
        </Grid>
      )}

      <Box sx={{ height: 500, width: '100%' }}>
        <DataGrid
          rows={products}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5]}
        />
      </Box>

      <Snackbar
        open={openSnackbar}
        autoHideDuration={3000}
        onClose={() => setOpenSnackbar(false)}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert severity={snackbarType} onClose={() => setOpenSnackbar(false)} sx={{ width: '100%' }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
}
