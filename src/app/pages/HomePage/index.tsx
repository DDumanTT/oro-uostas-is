import * as React from 'react';
import { Helmet } from 'react-helmet-async';
import { styled } from '@mui/material/styles';
import { Link, useNavigate } from 'react-router-dom';
import {
  Box,
  Button,
  Container,
  CssBaseline,
  TextField,
  Typography,
  CardMedia,
  Grid,
  Card,
} from '@mui/material';
import FeaturedCard from './components/FuturedCard';

export function HomePage() {
  const navigate = useNavigate();
  const [from, setFrom] = React.useState('');
  const [to, setTo] = React.useState('');
  const [error, setError] = React.useState(false);

  const onChange = (e, set) => {
    set(e.target.value);
  };
  // () => history.push('/from:' + from + '/to:' + to)
  return (
    <StyledHomePage>
      <Helmet>
        <title>Home Page</title>
        <meta name="description" content="Homepage" />
      </Helmet>
      <Banner>
        <SearchContainer
          component="form"
          onSubmit={() => navigate('/from:' + from + '/to:' + to)}
        >
          <Grid
            container
            justifyContent="center"
            spacing={1}
            sx={{ zIndex: 2 }}
          >
            <Grid item xs={12} sm={8} md={8}>
              <Box sx={{ display: 'inline-flex', width: '100%' }}>
                <TextField
                  required
                  sx={{ width: '100%' }}
                  className="homepage__textfield"
                  label="From"
                  onChange={e => onChange(e, setFrom)}
                />
                <TextField
                  required
                  sx={{ width: '100%' }}
                  className="homepage__textfield"
                  label="To"
                  onChange={e => onChange(e, setTo)}
                />
              </Box>
            </Grid>
            <Grid item xs={12} sm={3} md={2}>
              <Button
                type="submit"
                // color="secondary"
                //                to={'/from:' + from + '/to:' + to}
                variant="contained"
                sx={{ width: '100%', height: '56px' }}
              >
                Search
              </Button>
            </Grid>
          </Grid>
        </SearchContainer>
      </Banner>
      <FutureCardShape container mt={5} justifyContent="center" spacing={3}>
        <Grid item xs={6} md={3}>
          <Typography variant="h3" gutterBottom component="div">
            Choose your dream destination
          </Typography>
        </Grid>
        <Grid item xs={6} md={3}>
          <FeaturedCard title="Russia" img="/img/russia.jpg">
            The world's largest country offers it all, from historic cities and
            idyllic countryside to artistic riches, epic train rides and
            vodka-fuelled nightlife.
          </FeaturedCard>
        </Grid>
        <Grid item xs={6} md={3}>
          <FeaturedCard title="China" img="/img/china.jpg">
            The third largest country (after Russia and Canada), it has
            everything that can be interesting to a foreigner: architectural
            monuments of one of the most ancient civilizations, national parks
            with different climate and nature, modern metropolises and small
            provincial towns which managed to preserve their original culture.
          </FeaturedCard>
        </Grid>
        <Grid item xs={6} md={3}>
          <FeaturedCard title="America" img="/img/banner.png">
            The United States of America is the world's third largest country in
            size and nearly the third largest in terms of population. Located in
            North America, the country is bordered on the west by the Pacific
            Ocean and to the east by the Atlantic Ocean.
          </FeaturedCard>
        </Grid>
      </FutureCardShape>
      <Typography
        mt={8}
        sx={{ textAlign: 'center' }}
        variant="h4"
        component="div"
      >
        We offer you:
      </Typography>
      <NinjaContainer gradient mt={4} spacing={1} sx={{ zIndex: 2 }}>
        <Grid item xs={12} md={4}>
          <img width={300} src="/img/people-flying.svg" />
        </Grid>
        <Grid container alignItems="center" item xs={12} md={7}>
          <Box>
            <Typography variant="h4" gutterBottom component="div">
              Fly towards your deepest desires, travel across the world with
              just few clicks!
            </Typography>
            <Typography variant="body1" gutterBottom>
              Buy tickets with just few clicks! Yep, its that easy. Search for
              your desired location and chose between multiple flight options.
            </Typography>
          </Box>
        </Grid>
      </NinjaContainer>
      <NinjaContainer mt={4} spacing={1} sx={{ zIndex: 2 }}>
        <Grid item xs={12} md={4}>
          <img width={300} src="/img/undraw_social_friends_re_7uaa.svg" />
        </Grid>
        <Grid container alignItems="center" item xs={12} md={7}>
          <Box>
            <Typography variant="h4" gutterBottom component="div">
              Easy and intuitive way to buy tickets and enjoy your vacation!
            </Typography>
            <Typography variant="body1" gutterBottom>
              Save more time by using easy and intuitive design of the webpage!
              Its super simple to buy tickets, just type your destination and
              off you go!
            </Typography>
          </Box>
        </Grid>
      </NinjaContainer>
      <NinjaContainer mt={4} spacing={1} sx={{ zIndex: 2 }}>
        <Grid item xs={12} md={4}>
          <img width={300} src="/img/undraw_winners_ao-2-o.svg" />
        </Grid>
        <Grid container alignItems="center" item xs={12} md={7}>
          <Box>
            <Typography variant="h4" gutterBottom component="div">
              Buy tickets and participate in lottery to win amazing prizes!
            </Typography>
            <Typography variant="body1" gutterBottom>
              Win free vacion or other great prizes! When you buy a ticket you
              have a chance to participate in a wheel spin and win great prizes!
              Free vacation, monetary prizes, merch, just name it!
            </Typography>
          </Box>
        </Grid>
      </NinjaContainer>
      <NinjaContainer endline mt={4} spacing={1} sx={{ zIndex: 2 }}>
        <Grid item xs={12} md={4}>
          <img width={300} src="/img/undraw_discount_d-4-bd.svg" />
        </Grid>
        <Grid container alignItems="center" item xs={12} md={7}>
          <Box>
            <Typography variant="h4" gutterBottom component="div">
              Big discounts every day!
            </Typography>
            <Typography variant="body1" gutterBottom>
              We ar competitive and aim to provide highest discounts across the
              industry. Make sure to check for great discounts every day!
            </Typography>
          </Box>
        </Grid>
      </NinjaContainer>
      {/* <Box mt={15} sx={{ display: 'flex', justifyContent: 'right' }}>
        <Card sx={{ maxWidth: 300 }}>
          <CardMedia
            component="img"
            image="img/towers.jpg"
            alt="image of twin towers"
          />
        </Card>
      </Box> */}
    </StyledHomePage>
  );
}

const StyledHomePage = styled(Box)`
  position: relative;
  margin-top: 30px;
  .homepage__textfield {
    /* width: 280px; */
  }

  .homepage__textfield:first-child {
    div {
      border-radius: 4px 0 0 4px;
    }
  }

  .homepage__textfield:nth-child(2) {
    div {
      border-radius: 0 4px 4px 0;
    }
  }
`;

const NinjaContainer = styled<any>(Grid)`
  position: relative;
  display: flex;
  justify-content: center;
  transform: scale(0.85);
  border-radius: 5px;
  background-image: ${props =>
    props.gradient && 'linear-gradient(to right, #30cfd0 0%, #330867 100%)'};
}

  &:before {
    content: '';
    display: ${props => !props.endline && 'none'};
    position: absolute;
    width: 100%;
    height: 10px;
    bottom: -60px;
    background-image: linear-gradient(to right, #30cfd0 0%, #330867 100%);
    z-index: -1;
  }
`;

const FutureCardShape = styled(Grid)`
  position: relative;
`;

const Banner = styled(Box)`
  position: relative;
  width: 100%;
  height: 650px;
  background-image: url('/img/banner.png');
  background-position: center;
  background-size: fit;
  background-repeat: no-repeat;
  border-radius: 8px;
  opacity: 0.85;

  ${props => props.theme.breakpoints.down('md')} {
    height: 550px;
  }

  ${props => props.theme.breakpoints.down('sm')} {
    height: 450px;
  }
`;

const SearchContainer = styled(Box)`
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  bottom: 7.5%;
  width: 80%;
  height: 150px;
  margin-left: 50%;
  border-radius: 8px;
  transform: translateX(-50%);
  box-shadow: rgba(0, 0, 0, 0.25) 0px 54px 55px,
    rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px,
    rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px;

  ${props => props.theme.breakpoints.down('md')} {
    width: 97%;
    bottom: 2%;
  }

  ${props => props.theme.breakpoints.down('sm')} {
    width: 100%;
    padding: 0 10px;
    bottom: 0%;
  }

  &:after {
    content: '';
    position: absolute;
    width: 100%;
    height: 100%;
    background-color: #382158;
    border-radius: 5px;
    opacity: 0.95;

    ${props => props.theme.breakpoints.down('sm')} {
      border-radius: 0;
    }
  }
`;
