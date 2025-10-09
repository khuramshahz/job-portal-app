import React from 'react'
import { Box, TextField, MenuItem, Button, Card, CardContent, Typography } from '@mui/material'
import SearchIcon from '@mui/icons-material/Search'
import LocationOnIcon from '@mui/icons-material/LocationOn'
import WorkIcon from '@mui/icons-material/Work'

export default function Filters({ search, setSearch, type, setType, location, setLocation, applyFilters }){
  return (
    <Card sx={{ mb: 3, boxShadow: '0 8px 32px rgba(0,0,0,0.1)' }}>
      <CardContent sx={{ p: 3 }}>
        <Typography variant="h6" sx={{ mb: 2, fontWeight: 700, color: 'primary.main' }}>
          Filter Jobs
        </Typography>
        <TextField 
          fullWidth 
          label="Search Jobs" 
          value={search} 
          onChange={e=>setSearch(e.target.value)} 
          sx={{ mb: 2 }}
          InputProps={{
            startAdornment: <SearchIcon sx={{ color: 'action.active', mr: 1 }} />
          }}
        />
        <TextField 
          select 
          fullWidth 
          label="Job Type" 
          value={type} 
          onChange={e=>setType(e.target.value)} 
          sx={{ mb: 2 }}
          InputProps={{
            startAdornment: <WorkIcon sx={{ color: 'action.active', mr: 1 }} />
          }}
        >
          <MenuItem value="">Any</MenuItem>
          <MenuItem value="full-time">Full-time</MenuItem>
          <MenuItem value="part-time">Part-time</MenuItem>
          <MenuItem value="contract">Contract</MenuItem>
        </TextField>
        <TextField 
          fullWidth 
          label="Location" 
          value={location} 
          onChange={e=>setLocation(e.target.value)} 
          sx={{ mb: 3 }}
          InputProps={{
            startAdornment: <LocationOnIcon sx={{ color: 'action.active', mr: 1 }} />
          }}
        />
        <Button 
          fullWidth 
          variant="contained" 
          onClick={applyFilters}
          sx={{ 
            background: 'linear-gradient(135deg, #ff6b35 0%, #f72585 100%)',
            '&:hover': { background: 'linear-gradient(135deg, #e55a2b 0%, #d61f73 100%)' },
            py: 1.5,
            fontWeight: 600
          }}
        >
          Apply Filters
        </Button>
      </CardContent>
    </Card>
  )
}
