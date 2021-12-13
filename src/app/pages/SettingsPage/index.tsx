import {
  Avatar,
  Button,
  FormControlLabel,
  Grid,
  Modal,
  Switch,
  Typography,
} from '@mui/material';
import { Box } from '@mui/system';
import * as React from 'react';
import { getUser } from 'user_info';
import axios from '../../../axiosConfig';
import { Link as RouterLink, useNavigate } from 'react-router-dom';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export function SettingsPage() {
  const navigate = useNavigate();
  const deleteAcc = () => {
    axios
      .post('/user/delete', {
        id: getUser().id,
      })
      .then(res => {
        console.log(res);
      })
      .finally(() => {
        localStorage.removeItem('user');
        localStorage.removeItem('jwt_token');
        navigate('/');
      });
  };

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const style: any = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };

  return (
    <Grid item lg={8} sx={{ margin: '0 auto' }}>
      <Typography variant="h5" mt={4}>
        Settings
      </Typography>

      <Box display="flex" mt={2} justifyContent="space-between">
        <Avatar
          sx={{
            width: 200,
            height: 200,
            fontSize: '65px',
            borderRadius: 0,
          }}
        >
          {getUser().name}
          <p style={{ fontSize: '20px' }}>{getUser().surname}</p>
        </Avatar>
        <Box
          display="flex"
          flexDirection="column"
          justifyContent="space-between"
          ml={2}
        >
          <Button variant="outlined" sx={{ marginLeft: 1 }}>
            Change username
          </Button>
          <Button variant="outlined" sx={{ marginLeft: 1 }}>
            Change email
          </Button>
          <Button variant="outlined" sx={{ marginLeft: 1 }}>
            Change password
          </Button>
          <Button variant="outlined" sx={{ marginLeft: 1 }}>
            Add 2fa authentication
          </Button>
        </Box>
      </Box>
      {/* BELENKAAA SENELYZAI BRRRRRRR (tingiu margins rasyt xdd) */}
      <br />
      <hr />
      <br />
      <FormControlLabel
        control={<Switch sx={{ m: 1 }} defaultChecked />}
        label="Get email notifications"
      />
      <br />
      <FormControlLabel
        control={<Switch sx={{ m: 1 }} defaultChecked />}
        label="Get application notifications"
      />
      <br />
      <br />
      <hr />
      <Button
        variant="outlined"
        sx={{ marginLeft: 1, marginTop: 2 }}
        color="error"
        onClick={handleOpen}
      >
        Delete account
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Are you sure ?
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            This is irreversible action resulting in permanent deletion of
            account.
          </Typography>
          <Button
            variant="outlined"
            color="error"
            onClick={deleteAcc}
            sx={{ marginTop: 5 }}
          >
            Confirm
          </Button>
        </Box>
      </Modal>
      <br />
      <br />
      <br />
    </Grid>
  );
}
