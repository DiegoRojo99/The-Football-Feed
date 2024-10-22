import React, { useState } from 'react';
import './Highlights.css';
import HighlightsCard from './Card';
import {Select, InputLabel, MenuItem, FormControl} from '@mui/material';

function HighlightPage({ data }) {
  const competitions = Object.keys(data);
  const [selectedCompetition, setSelectedCompetition] = useState(competitions[0]);

  const handleChange = (event) => {
    setSelectedCompetition(event.target.value);
  };

  return (
    <div className='highlight-page'>

      <FormControl sx={{ m: 1, minWidth: 120}} size="small" >
        <InputLabel id="simple-select-label">Competition</InputLabel>
        <Select
          labelId="simple-select-label"
          id="simple-select"
          value={selectedCompetition}
          label="Competition"
          onChange={handleChange}
        >
          {competitions.map((competition, index) => (
            <MenuItem key={index} value={competition}>{competition}</MenuItem>
          ))}
        </Select>
      </FormControl>

      <div className='highlight-grid'>
        {data[selectedCompetition].map(card => <HighlightsCard highlight={card} />)}
      </div>
    </div>
  );
}

export default HighlightPage;
