import { merge } from 'lodash';
import ReactApexChart from 'react-apexcharts';
// material
import { useTheme, styled } from '@mui/material/styles';
import { Card, CardHeader } from '@mui/material';
// utils
import { fNumber } from '../../../utils/formatNumber';
//
import { BaseOptionChart } from '../../charts';
import { useEffect, useState } from 'react';
import axios from '../../../../../../axiosConfig';

// ----------------------------------------------------------------------

const CHART_HEIGHT = 372;
const LEGEND_HEIGHT = 72;

const ChartWrapperStyle = styled('div')(({ theme }) => ({
  height: CHART_HEIGHT,
  marginTop: theme.spacing(5),
  '& .apexcharts-canvas svg': { height: CHART_HEIGHT },
  '& .apexcharts-canvas svg,.apexcharts-canvas foreignObject': {
    overflow: 'visible',
  },
  '& .apexcharts-legend': {
    height: LEGEND_HEIGHT,
    alignContent: 'center',
    position: 'relative !important',
    borderTop: `solid 1px ${theme.palette.divider}`,
    top: `calc(${CHART_HEIGHT - LEGEND_HEIGHT}px) !important`,
  },
}));

// ----------------------------------------------------------------------

const CHART_DATA = [4344, 5435, 1443, 4443];

export default function AppCurrentVisits() {
  const theme = useTheme();
  const [data, setData] = useState([]);
  const [options, setOptions] = useState(
    merge(BaseOptionChart(), {
      colors: [
        theme.palette.primary.main,
        theme.palette.info.main,
        theme.palette.warning.main,
        theme.palette.error.main,
      ],
      labels: ['Loading'],
      stroke: { colors: [theme.palette.background.paper] },
      legend: { floating: true, horizontalAlign: 'center' },
      dataLabels: { enabled: true, dropShadow: { enabled: false } },
      tooltip: {
        fillSeriesColor: false,
        y: {
          formatter: seriesName => fNumber(seriesName),
          title: {
            formatter: seriesName => `#${seriesName}`,
          },
        },
      },
      plotOptions: {
        pie: { donut: { labels: { show: false } } },
      },
    }),
  );

  useEffect(() => {
    console.log(options);
    axios.get('/stats').then(res => {
      setOptions({
        ...options,
        labels: res.data.popular_destinations.map(x => x.arrival_location),
      });
      setData(res.data.popular_destinations);
    });
  }, []);

  return (
    <Card>
      <CardHeader title="Top flight locations" />
      <ChartWrapperStyle dir="ltr">
        <ReactApexChart
          type="pie"
          series={data.map(x => x.count)}
          options={options}
          height={280}
        />
      </ChartWrapperStyle>
    </Card>
  );
}
