/**
 *
 * Gambling
 *
 */
import { Box, Button, Chip, Grid, Paper, Snackbar, Stack } from '@mui/material';
import * as React from 'react';
import { useTranslation } from 'react-i18next';
import { messages } from './messages';
import { styled } from '@mui/material/styles';
import { Wheel } from 'react-custom-roulette';
import { useState, useEffect } from 'react';
import LoopIcon from '@mui/icons-material/Loop';
import MuiAlert, { AlertColor, AlertProps } from '@mui/material/Alert';
import { Data } from 'dataclass';
import { SnackbarOrigin } from '@mui/material/Snackbar';
import { getUser } from 'user_info';
import axios from '../../../axiosConfig';

interface Props {}

export interface State extends SnackbarOrigin {
  open: boolean;
}

const Item = styled(Box)`
  text-align: center;
  flex: flex;
`;

const SpinsLeft = styled(Box)`
  text-align: right;
  margin-top: 20px;
  flex: flex;
`;

const data = [
  { option: 'Nieko 😥' },
  { option: 'Nieko 😥' },
  { option: '10' },
  { option: 'Nieko 😥' },
  { option: 'Nieko 😥' },
  { option: 'Nieko 😥' },
  { option: 'SKRYDIS' },
  { option: 'Nieko 😥' },
];

const backgroundColors = ['#3e3e3e', '#df3428'];

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref,
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export function Gambling(props: Props) {
  /* Routlette docs: https://www.npmjs.com/package/react-custom-roulette */
  /* https://github.com/TheChipmunks/react-roulette */
  const [mustSpin, setMustSpin] = useState(false); // Boolas ar leidzia sukti rata
  const [isSpinning, setIsSpinning] = useState(false); // Boolas ar leidzia sukti rata
  const [prizeNumber, setPrizeNumber] = useState(0); // Skaicius, kuri issuka spineris
  const [spinsLeft, setSpinsLeft] = useState(0); // Gauti spins left is duombazes
  const [rigged, setRigged] = useState(false); // :)
  const [snackBarState, setSnackBarState] = React.useState<State>({
    open: false,
    vertical: 'top',
    horizontal: 'right',
  });
  const [snackBar, setSnackBar] = React.useState<{
    severity: AlertColor;
    message: string;
  }>({
    severity: 'info',
    message: '',
  });
  const { vertical, horizontal, open } = snackBarState;

  const handleKeyPress = React.useCallback(
    event => {
      if (event.keyCode === 81) {
        setRigged(r => {
          console.log(!r);
          return !r;
        });
      }
    },
    [rigged],
  );

  useEffect(() => {
    document.addEventListener('keyup', handleKeyPress, false);
    axios.get('user').then(res => {
      setSpinsLeft(res.data.tickets || 0);
    });
    return () => {
      document.removeEventListener('keyup', handleKeyPress, false);
    };
  }, []);

  const handleSpinClick = () => {
    if (spinsLeft > 0 && !isSpinning) {
      setIsSpinning(true);
      if (!rigged) {
        const newPrizeNumber = Math.floor(Math.random() * data.length);
        setPrizeNumber(newPrizeNumber);
      } else {
        // setPrizeNumber(2);
        setPrizeNumber(6);
      }
      setMustSpin(true);
      setSpinsLeft(spinsLeft - 1);
      axios.get('gambling/spin');
      if (prizeNumber === 6) {
        axios.get('gambling/reward');
      }
    } else if (isSpinning) {
      handeSnackBarWarning();
    } else {
      handeSnackBarError();
    }
  };

  const handeSnackBarSuccess = message => {
    setSnackBar({
      severity: 'success',
      message: message,
    });
    setSnackBarState({ ...snackBarState, open: true });
  };

  const handeSnackBarWarning = () => {
    setSnackBar({ severity: 'warning', message: 'Ratas sukasi!' });
    setSnackBarState({ ...snackBarState, open: true });
  };

  const handeSnackBarError = () => {
    setSnackBar({ severity: 'error', message: 'Neturite sukimų.' });
    setSnackBarState({ ...snackBarState, open: true });
  };

  const handleSnackBarClose = () => {
    setSnackBarState({ ...snackBarState, open: false });
  };

  return (
    <Box>
      <SpinsLeft>
        <Chip
          icon={<LoopIcon />}
          label={'Spins left: ' + spinsLeft}
          variant="outlined"
        />
      </SpinsLeft>
      {/* <Item>
        <Button variant="outlined" onClick={handleFreeSpin}>
          Pirkti bileta - paspaudus 29 proc tikimybe kad gales spinint rata
        </Button>
      </Item> */}

      <Item>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            marginBottom: '20px',
          }}
        >
          <Wheel
            mustStartSpinning={mustSpin}
            onStopSpinning={() => {
              setMustSpin(false);
              setIsSpinning(false);
              if (prizeNumber === 2) {
                handeSnackBarSuccess('Laimejote 10 balu už atlikta darba');
              }
              if (prizeNumber === 6) {
                handeSnackBarSuccess('Laimejote Skrydi');
              }
            }}
            prizeNumber={prizeNumber}
            data={data}
            backgroundColors={backgroundColors}
            textColors={['#ffffff']}
          />
        </Box>
        <Button variant="outlined" onClick={handleSpinClick}>
          SPIN
        </Button>
      </Item>

      <Snackbar
        anchorOrigin={{ vertical, horizontal }}
        open={snackBarState.open}
        autoHideDuration={6000}
        onClose={handleSnackBarClose}
      >
        <Alert
          onClose={handleSnackBarClose}
          severity={snackBar.severity}
          sx={{ width: '100%' }}
        >
          {snackBar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
}
