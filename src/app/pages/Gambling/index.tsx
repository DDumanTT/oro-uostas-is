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
  { option: '$$$' },
  { option: '$$$' },
  { option: '$$$' },
  { option: '$$$' },
  { option: '$$$' },
  { option: '$$$' },
  { option: 'Skrydis' },
  { option: '$$$' },
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

  useEffect(() => {
    setSpinsLeft(getUser().tickets);
  }, []);

  const handleFreeSpin = () => {
    const fromZeroToHundred = Math.floor(Math.random() * 100);
    if (fromZeroToHundred > 70) {
      setSpinsLeft(spinsLeft + 1);
      handeSnackBarSuccess();
    }
  };

  const handleSpinClick = () => {
    if (spinsLeft > 0 && !isSpinning) {
      setIsSpinning(true);
      const newPrizeNumber = Math.floor(Math.random() * data.length);
      setPrizeNumber(newPrizeNumber);
      setMustSpin(true);
      setSpinsLeft(spinsLeft - 1);
    } else if (isSpinning) {
      handeSnackBarWarning();
    } else {
      handeSnackBarError();
    }
  };

  const handeSnackBarSuccess = () => {
    setSnackBar({ severity: 'success', message: 'Gavote nemokamą sukimą!' });
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
      <Item>
        <Button variant="outlined" onClick={handleFreeSpin}>
          Pirkti bileta - paspaudus 29 proc tikimybe kad gales spinint rata
        </Button>
      </Item>

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
            }}
            prizeNumber={data.length - 1}
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
