import React, { useEffect, useState } from 'react';
import {
  Box, Typography, Button, Snackbar, Alert, Dialog, DialogTitle,
  DialogContent, DialogActions, TextField, IconButton
} from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import axios from 'axios';

const ContactManagement = () => {
  const [contacts, setContacts] = useState([]);
  const [open, setOpen] = useState(false);
  const [selectedContact, setSelectedContact] = useState(null);
  const [formValues, setFormValues] = useState({
    name: '',
    email: '',
    phone: '',
    title: '',
    content: '',
    status: 'Chờ phản hồi',
    userId: '', // Thêm userId ở đây
    replayId: null,
  });
  const [openMessage, setOpenMessage] = useState('');
  
  const token = localStorage.getItem('token');
  const userId = localStorage.getItem('userId'); // Giả sử userId lưu trong localStorage

  useEffect(() => {
    axios.get('https://localhost:7219/api/Contact', {
      headers: { Authorization: `Bearer ${token}` }
    })
    .then(res => {
      const contactsWithId = res.data.map(contact => ({
        ...contact,
        id: contact.contactId
      }));
      setContacts(contactsWithId);
    })
    .catch(err => console.error('Lỗi khi lấy dữ liệu contact:', err));
  }, []);

  const handleOpenDialog = (contact = null) => {
    if (contact) {
      setSelectedContact(contact);
      setFormValues({
        name: contact.name,
        email: contact.email,
        phone: contact.phone,
        title: contact.title,
        content: contact.content,
        status: contact.status,
        userId: contact.userId,
        replayId: contact.replayId
      });
    } else {
      setFormValues({
        name: '',
        email: '',
        phone: '',
        title: '',
        content: '',
        status: 'Chờ phản hồi',
        userId: userId, // Gán userId cho trường hợp thêm mới
        replayId: null
      });
    }
    setOpen(true);
  };

  const handleCloseDialog = () => {
    setOpen(false);
    setSelectedContact(null);
  };

  const handleFormSubmit = () => {
    if (selectedContact) {
      // Cập nhật thông tin liên hệ
      axios.put(`https://localhost:7219/api/Contact/${selectedContact.contactId}`, {
        ...formValues,
        contactId: selectedContact.contactId
      }, {
        headers: { Authorization: `Bearer ${token}` }
      })
      .then(() => {
        setContacts(prev => prev.map(c => c.contactId === selectedContact.contactId ? { ...formValues, id: selectedContact.contactId } : c));
        setOpenMessage('Cập nhật liên hệ thành công!');
        handleCloseDialog();
      })
      .catch(err => {
        console.error('Lỗi khi cập nhật contact:', err);
        alert('Lỗi cập nhật liên hệ!');
      });
    } else {
      // Thêm mới liên hệ
      axios.post('https://localhost:7219/api/Contact', {
        ...formValues,
        userId: userId // Gửi userId khi thêm mới
      }, {
        headers: { Authorization: `Bearer ${token}` }
      })
      .then(res => {
        setContacts(prev => [...prev, { ...res.data, id: res.data.contactId }]);
        setOpenMessage('Thêm liên hệ thành công!');
        handleCloseDialog();
      })
      .catch(err => {
        console.error('Lỗi khi thêm contact:', err);
        alert('Lỗi thêm liên hệ!');
      });
    }
  };

  const handleDeleteContact = (id) => {
    axios.delete(`https://localhost:7219/api/Contact/${id}`, {
      headers: { Authorization: `Bearer ${token}` }
    })
    .then(() => {
      setContacts(prev => prev.filter(c => c.id !== id));
      setOpenMessage('Xóa liên hệ thành công!');
    })
    .catch(err => {
      console.error('Lỗi khi xóa contact:', err);
      alert('Lỗi khi xóa liên hệ!');
    });
  };

  const columns = [
    { field: 'id', headerName: 'ID', width: 90 },
    { field: 'name', headerName: 'Tên', width: 150 },
    { field: 'email', headerName: 'Email', width: 200 },
    { field: 'phone', headerName: 'Điện thoại', width: 150 },
    { field: 'title', headerName: 'Tiêu đề', width: 200 },
    { field: 'content', headerName: 'Nội dung', width: 250 },
    { field: 'status', headerName: 'Trạng thái', width: 150 },
    {
      field: 'actions', headerName: 'Thao tác', width: 130,
      renderCell: (params) => (
        <Box>
          <IconButton onClick={() => handleOpenDialog(params.row)}>
            <EditIcon />
          </IconButton>
          <IconButton onClick={() => handleDeleteContact(params.row.id)}>
            <DeleteIcon />
          </IconButton>
        </Box>
      )
    }
  ];

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>Quản lý liên hệ</Typography>
      <Button variant="contained" color="primary" onClick={() => handleOpenDialog()} sx={{ mb: 2 }}>
        Thêm liên hệ
      </Button>
      <div style={{ height: 500, width: '100%' }}>
        <DataGrid rows={contacts} columns={columns} pageSize={5} />
      </div>

      <Dialog open={open} onClose={handleCloseDialog}>
        <DialogTitle>{selectedContact ? 'Cập nhật liên hệ' : 'Thêm liên hệ'}</DialogTitle>
        <DialogContent>
          <TextField fullWidth label="Tên" margin="normal" value={formValues.name} onChange={(e) => setFormValues({ ...formValues, name: e.target.value })} />
          <TextField fullWidth label="Email" margin="normal" value={formValues.email} onChange={(e) => setFormValues({ ...formValues, email: e.target.value })} />
          <TextField fullWidth label="Điện thoại" margin="normal" value={formValues.phone} onChange={(e) => setFormValues({ ...formValues, phone: e.target.value })} />
          <TextField fullWidth label="Tiêu đề" margin="normal" value={formValues.title} onChange={(e) => setFormValues({ ...formValues, title: e.target.value })} />
          <TextField fullWidth label="Nội dung" multiline rows={4} margin="normal" value={formValues.content} onChange={(e) => setFormValues({ ...formValues, content: e.target.value })} />
          <TextField fullWidth label="Trạng thái" margin="normal" value={formValues.status} onChange={(e) => setFormValues({ ...formValues, status: e.target.value })} />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="secondary">Hủy</Button>
          <Button onClick={handleFormSubmit} color="primary">{selectedContact ? 'Cập nhật' : 'Thêm'}</Button>
        </DialogActions>
      </Dialog>

      <Snackbar open={!!openMessage} autoHideDuration={2000} onClose={() => setOpenMessage('')}>
        <Alert severity="success" onClose={() => setOpenMessage('')}>{openMessage}</Alert>
      </Snackbar>
    </Box>
  );
};

export default ContactManagement;
