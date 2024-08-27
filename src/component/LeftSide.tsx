import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import TextField from '@mui/material/TextField';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import StarIcon from '@mui/icons-material/Star';
import Box from '@mui/material/Box';
import { Player } from '../types/types';
const serverUrl = process.env.SERVER_URL || 'http://localhost:5000/api';
console.log("serverUrl", serverUrl);

interface LeftSideProps {
  setSelected: (Player: Player) => void;
}

const LeftSide: React.FC<LeftSideProps> = ({ setSelected }) => {
  const [players, setPlayers] = useState<Player[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [NextBtn, setNextBtn] = useState(false);
  // const [totalPages, setTotalPages] = useState(1);
  const playersPerPage = 25;

  const fetchPlayers = useCallback(async () => {
    try {
      const response = await axios.get(`${serverUrl}/players`, {
        params: {
          page : currentPage,
          per_page: playersPerPage,
          search: searchTerm,
          'seasons[]': '2023',
        }
      });
      setPlayers(response.data.data);
      setNextBtn(Boolean(response.data.meta.next_cursor? false:true));
      // setTotalPages(Math.ceil(response.data.meta.total_count / playersPerPage));
    } catch (error) {
      console.error('Failed to fetch players', error);
    }
  }, [currentPage, searchTerm]);

  useEffect(() => {
    fetchPlayers();
  }, [fetchPlayers]);

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
    setCurrentPage(1);
  };

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  return (
    <Box m={2}>
      <TextField id="outlined-search" label="Search field" type="search" value={searchTerm} onChange={handleSearch}/>

      <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }} aria-label="contacts" >
      {players.map(player => (
          <ListItem disablePadding key={player.id}>
            <ListItemButton onClick={() => setSelected(player)}>
              <ListItemIcon>
                <StarIcon />
              </ListItemIcon>
              <ListItemText primary={`${player.first_name} ${player.last_name}`} />
            </ListItemButton>
          </ListItem>
        ))}

      </List>
      <div style = {{ display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
        <Button onClick={() => currentPage > 1 ? paginate(currentPage - 1) : null} disabled = {currentPage<2}>
          Prev
        </Button>
        <div>{currentPage}</div>
        <Button onClick={() => paginate(currentPage + 1)} disabled = {NextBtn}>
          Next
        </Button>
      </div>
    </Box>
  );
};

export default LeftSide;
