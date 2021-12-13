/**
 *
 * FlightCard
 *
 */
import * as React from 'react';
import styled from 'styled-components/macro';
import {
  Box,
  Typography,
  Stack,
  Card,
  CardContent,
  CardHeader,
  CardActions,
  Button,
  Modal,
} from '@mui/material';
import axios from '../../../../../axiosConfig';
import { getUser } from 'user_info';
import { useNavigate } from 'react-router-dom';

interface Props {
  flightData: {
    departureTime: string;
    departure_location: string;
    arrivalTime: string;
    arrival_location: string;
    duration: number;
    boarding_time: Date;
    ticket_price: number;
    logoPath: string;
  };
  delete?: boolean;
  snackbar?: any;
  bruhwin?: any;
}

export function FlightCard(props: Props) {
  let data: any = props.flightData;
  var datetime = new Date('1970-01-01 ' + data.duration);
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

  const handleBookCancel = () => {
    axios
      .post('/bookings/delete', {
        flight_id: data.id,
      })
      .then(res => {
        console.log(data.id);

        //toast notification
        window.location.reload();
        console.log(res);
      });
  };

  const handleBookFlight = () => {
    axios
      .post('/bookings/insert', {
        user_id: getUser().id,
        flight_id: data.id,
      })
      .then(res => {
        //toast notification
        console.log(res);
        props.snackbar();

        if (res.data.ticket_received == true) {
          props.bruhwin();
        }
      });
  };

  return (
    <StyledCard>
      <CardTop subheader={data.boarding_time} />
      <CardContent>
        <StyledInfo>
          <CardElement>
            <Typography variant="h5">{data.departure_location}</Typography>
          </CardElement>
          <MiddleElement>
            <Typography variant="h5">
              {String(datetime.getHours()).padStart(2, '0')}:
              {String(datetime.getMinutes()).padStart(2, '0')}
            </Typography>
          </MiddleElement>
          <CardElement>
            <Typography variant="h5">{data.arrival_location}</Typography>
          </CardElement>
        </StyledInfo>
      </CardContent>
      <CardFooter>
        {/* <Box sx={{ display: 'flex', flexGrow: 1, height: '5vh' }}>
          <img width="auto" height="auto" src={data.logoPath} alt="logo" />
        </Box> */}
        <Typography variant="h6" sx={{ display: 'flex' }}>
          €{data.ticket_price}
        </Typography>
        {props.delete ? (
          <Button
            variant="contained"
            size="large"
            color="error"
            sx={{ marginLeft: '15px', display: 'flex' }}
            onClick={() => {
              handleOpen();
            }}
          >
            Cancel
          </Button>
        ) : (
          <Button
            variant="contained"
            size="large"
            sx={{ marginLeft: '15px', display: 'flex' }}
            onClick={() => {
              handleOpen();
            }}
          >
            Book
          </Button>
        )}

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
            {/* <Typography id="modal-modal-description" sx={{ mt: 2 }}>
              This is irreversible action resulting in permanent deletion of
              account.
            </Typography> */}
            <Button
              variant="outlined"
              color="primary"
              onClick={() => {
                if (props.delete) {
                  handleBookCancel();
                } else {
                  handleBookFlight();
                }
                handleClose();
              }}
              sx={{ marginTop: 5 }}
            >
              Confirm
            </Button>
          </Box>
        </Modal>
      </CardFooter>
    </StyledCard>
  );
}

const CardElement = styled(Box)`
  width: 100%;
  height: 100%;
  text-align: center;
`;

const MiddleElement = styled(Box)`
  border-left: 1px ${props => props.theme.palette.primary.main} solid;
  border-right: 1px ${props => props.theme.palette.primary.main} solid;
  width: 100%;
  height: 100%;
  text-align: center;
`;

const CardTop = styled(CardHeader)`
  border-bottom: 1px ${props => props.theme.palette.primary.main} solid;
`;

const CardFooter = styled(CardActions)`
  padding-top: 16px;
  border-top: 1px ${props => props.theme.palette.primary.main} solid;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  img {
    margin-right: auto;
    margin-left: 5px;
  }
`;

const StyledInfo = styled(Box)`
  display: inline-flex;
  width: 100%;
  margin-top: 15px;
  margin-bottom: 15px;
  justify-content: space-evenly;
`;

const StyledCard = styled(Card)`
  margin-top: 15px;
`;
