// import { useState } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import axios from 'axios';

// // material-ui
// import { useTheme } from '@mui/material/styles';
// import {
//   Button, Checkbox, FormControl, FormControlLabel,
//   Grid, IconButton, InputAdornment, InputLabel,
//   OutlinedInput, Typography, Box, Snackbar, Alert
// } from '@mui/material';

// // project imports
// import AnimateButton from 'ui-component/extended/AnimateButton';

// // assets
// import Visibility from '@mui/icons-material/Visibility';
// import VisibilityOff from '@mui/icons-material/VisibilityOff';

// export default function AuthLogin() {
//   const theme = useTheme();
//   const navigate = useNavigate();

//   // State variables
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [checked, setChecked] = useState(true);
//   const [showPassword, setShowPassword] = useState(false);
//   const [openSuccess, setOpenSuccess] = useState(false);
//   const [openError, setOpenError] = useState(false);  // State for error
//   const [errorMessage, setErrorMessage] = useState('');  // Error message state

//   const handleClickShowPassword = () => setShowPassword(!showPassword);
//   const handleMouseDownPassword = (event) => event.preventDefault();

//   const handleLogin = async (e) => {
//     e.preventDefault();

//     try {
//       const response = await axios.post('https://localhost:7219/api/Auth/login', {
//         email: email,
//         password: password
//       });

//       localStorage.setItem('token', response.data.token);

//       // ✅ Hiển thị thông báo thành công
//       setOpenSuccess(true);

//       // Sau 1.5 giây mới chuyển trang (để người dùng thấy thông báo)
//       setTimeout(() => {
//         navigate('/dashboard/default');
//       }, 1500);

//     } catch (error) {
//       console.error('Login failed:', error.response?.data || error.message);
      
//       // Show error snackbar
//       setErrorMessage(error.response?.data?.message || 'Đăng nhập không thành công');
//       setOpenError(true);  // Open the error message snackbar
//     }
//   };

//   return (
//     <>
//       <FormControl fullWidth sx={{ ...theme.typography.customInput }}>
//         <InputLabel htmlFor="outlined-adornment-email-login">Email Address / Username</InputLabel>
//         <OutlinedInput
//           id="outlined-adornment-email-login"
//           type="email"
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//           name="email"
//         />
//       </FormControl>

//       <FormControl fullWidth sx={{ ...theme.typography.customInput }}>
//         <InputLabel htmlFor="outlined-adornment-password-login">Password</InputLabel>
//         <OutlinedInput
//           id="outlined-adornment-password-login"
//           type={showPassword ? 'text' : 'password'}
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//           name="password"
//           endAdornment={
//             <InputAdornment position="end">
//               <IconButton
//                 aria-label="toggle password visibility"
//                 onClick={handleClickShowPassword}
//                 onMouseDown={handleMouseDownPassword}
//                 edge="end"
//                 size="large"
//               >
//                 {showPassword ? <Visibility /> : <VisibilityOff />}
//               </IconButton>
//             </InputAdornment>
//           }
//           label="Password"
//         />
//       </FormControl>

//       <Grid container sx={{ alignItems: 'center', justifyContent: 'space-between' }}>
//         <Grid>
//           <FormControlLabel
//             control={<Checkbox checked={checked} onChange={(event) => setChecked(event.target.checked)} color="primary" />}
//             label="Keep me logged in"
//           />
//         </Grid>
//         <Grid>
//           <Typography variant="subtitle1" component={Link} to="/forgot-password" color="secondary" sx={{ textDecoration: 'none' }}>
//             Forgot Password?
//           </Typography>
//         </Grid>
//       </Grid>

//       <Box sx={{ mt: 2 }}>
//         <AnimateButton>
//           <Button
//             color="secondary"
//             fullWidth
//             size="large"
//             type="submit"
//             variant="contained"
//             onClick={handleLogin}
//           >
//             Sign In
//           </Button>
//         </AnimateButton>
//       </Box>

//       {/* ✅ Snackbar hiển thị thông báo thành công */}
//       <Snackbar
//         open={openSuccess}
//         autoHideDuration={1500}
//         onClose={() => setOpenSuccess(false)}
//         anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
//       >
//         <Alert onClose={() => setOpenSuccess(false)} severity="success" sx={{ width: '100%' }}>
//           Đăng nhập thành công!
//         </Alert>
//       </Snackbar>

//       {/* ✅ Snackbar hiển thị thông báo lỗi */}
//       <Snackbar
//         open={openError}
//         autoHideDuration={3000}
//         onClose={() => setOpenError(false)}
//         anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
//       >
//         <Alert onClose={() => setOpenError(false)} severity="error" sx={{ width: '100%' }}>
//           {errorMessage}
//         </Alert>
//       </Snackbar>
//     </>
//   );
// }






import { Link } from 'react-router-dom';

import useMediaQuery from '@mui/material/useMediaQuery';
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Grid2';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

// project imports
import AuthWrapper1 from './AuthWrapper1';
import AuthCardWrapper from './AuthCardWrapper';
import AuthLogin from '../auth-forms/AuthLogin';

import Logo from 'ui-component/Logo';
import AuthFooter from 'ui-component/cards/AuthFooter';

// ================================|| AUTH3 - LOGIN ||================================ //

export default function Login() {
  const downMD = useMediaQuery((theme) => theme.breakpoints.down('md'));

  return (
    <AuthWrapper1>
      <Grid container direction="column" sx={{ justifyContent: 'flex-end', minHeight: '100vh' }}>
        <Grid size={12}>
          <Grid container sx={{ justifyContent: 'center', alignItems: 'center', minHeight: 'calc(100vh - 68px)' }}>
            <Grid sx={{ m: { xs: 1, sm: 3 }, mb: 0 }}>
              <AuthCardWrapper>
                <Grid container spacing={2} sx={{ alignItems: 'center', justifyContent: 'center' }}>
                  <Grid sx={{ mb: 3 }}>
                    <Link to="#" aria-label="logo">
                      <Logo />
                    </Link>
                  </Grid>
                  <Grid size={12}>
                    <Grid container direction={{ xs: 'column-reverse', md: 'row' }} sx={{ alignItems: 'center', justifyContent: 'center' }}>
                      <Grid>
                        <Stack spacing={1} sx={{ alignItems: 'center', justifyContent: 'center' }}>
                          <Typography gutterBottom variant={downMD ? 'h3' : 'h2'} sx={{ color: 'secondary.main' }}>
                            Hi, Welcome Back
                          </Typography>
                          <Typography variant="caption" sx={{ fontSize: '16px', textAlign: { xs: 'center', md: 'inherit' } }}>
                            Enter your credentials to continue
                          </Typography>
                        </Stack>
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid size={12}>
                    <AuthLogin />
                  </Grid>
                  <Grid size={12}>
                    <Divider />
                  </Grid>
                  <Grid size={12}>
                    <Grid container direction="column" sx={{ alignItems: 'center' }} size={12}>
                      <Typography component={Link} to="/register" variant="subtitle1" sx={{ textDecoration: 'none' }}>
                        Don&apos;t have an account?
                      </Typography>
                    </Grid>
                  </Grid>
                </Grid>
              </AuthCardWrapper>
            </Grid>
          </Grid>
        </Grid>
        <Grid sx={{ px: 3, my: 3 }} size={12}>
          <AuthFooter />
        </Grid>
      </Grid>
    </AuthWrapper1>
  );
}
