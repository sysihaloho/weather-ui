import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';

export default function BasicSelect() {
  const [city, setCity] = React.useState('');

  const [cities] = React.useState(
    ['Melbourne', 'Sydney', 'Brisbane','Jakarta', 'Singapore', 'Tokyo', 'Bandung',
  'Bangkok', 'New York', 'Paris', 'London', 'Madrid', 'Milan', 'Berlin']);

  const [weather, setWeather] = React.useState(null);

  const handleChange = (event) => {
    setCity(event.target.value)
    const url = "http://localhost:8080/getWeatherByCity/"+ event.target.value;
    const fetchData = async () => {
        try {
            const response = await fetch(url);
            const json = await response.json();
            setWeather(json);
        } catch (error) {
            console.log("error", error);
        }
    };

    fetchData();

  };

  return (
    <Box sx={{ minWidth: 120, padding:5}} >
      <p>Select Location</p>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">City</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={city}
          label="City"
          onChange={handleChange}
        >
          {cities.map((row, index) => <MenuItem key={index} value={row}>{row}</MenuItem>)}
        </Select>
      </FormControl>

      {weather !== null ? 
        <Card sx={{ maxWidth: 275, marginTop: 5, backgroundColor: "lightblue" }} >
        <CardContent>
          <Typography sx={{ fontSize: 14, textAlign:"right" }} color="text.secondary" gutterBottom>
            {weather.name}, {weather.sys.country}
          </Typography>
          <Typography sx={{ mb: 1.5, textAlign:"right" }} color="text.secondary">
            {weather.weather[0].main}
          </Typography>

          <Typography variant="h3" component="div">
            {Math.round(weather.main.temp)}°C
          </Typography>
        
          <Typography variant="body2" color="text.secondary">
            lat : {weather.coord.lat}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            lon : {weather.coord.lon}
          </Typography>
        </CardContent>
      </Card> : ''}
    </Box>
  );
}
