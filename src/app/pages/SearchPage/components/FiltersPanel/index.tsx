/**
 *
 * FiltersPanel
 *
 */
import * as React from 'react';
import styled from 'styled-components/macro';
import {
  Typography,
  Paper,
  Slider,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Grid,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useState } from 'react';
import { useTheme } from '@mui/material/styles';

interface Props {}

export function FiltersPanel(props: Props) {
  const [durationSliderValue, setDurationSliderValue] = useState([0, 1000]);
  const theme = useTheme();

  function timeConvert(n) {
    var hours = n / 60;
    var rhours = Math.floor(hours);
    var minutes = (hours - rhours) * 60;
    var rminutes = Math.round(minutes);
    return rhours + ' h ' + rminutes + ' min';
  }

  return (
    <Grid item sm={12} md={4}>
      <FiltersBox>
        <Typography
          variant="h5"
          sx={{
            padding: '12px',
            borderBottom: '1px solid' + theme.palette.primary.main,
          }}
        >
          Flight filters
        </Typography>
        <Accordion defaultExpanded>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography variant="subtitle1">Flight duration</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              {timeConvert(durationSliderValue[0])} to{' '}
              {timeConvert(durationSliderValue[1])}
            </Typography>
            <Slider
              disableSwap
              value={durationSliderValue}
              onChange={(e: Event, newValue: number | number[]) => {
                setDurationSliderValue(newValue as number[]);
              }}
              min={0}
              max={1440}
            ></Slider>
          </AccordionDetails>
        </Accordion>
      </FiltersBox>
    </Grid>
  );
}

const FiltersBox = styled(Paper)`
  display: flex;
  flex: 1 1 auto;
  justify-content: center;
  flex-direction: column;
`;
