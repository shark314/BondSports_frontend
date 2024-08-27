import React from 'react';
import { Player } from '../types/types';
import { Box, Button, List, ListItem } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

interface FavouritePlayersPanelProps {
  favoritePlayers: Player[];
  removeToFav: (Player: Player) => void;
}

const FavouritePlayersPanel: React.FC<FavouritePlayersPanelProps> = ({ removeToFav, favoritePlayers }) => {
  return (
    <div>
      <h2>Favorite Players</h2>
      <List>
        {favoritePlayers.map(player => (
          <ListItem
            key={player.id}
            sx={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-between'
            }}
          >
            <Box>
              {player.first_name} {player.last_name}
            </Box>
            <Box display="flex" >
              <Button variant="contained" onClick={() => removeToFav(player)} endIcon={<DeleteIcon />}>Remove</Button>
            </Box>
          </ListItem>
        ))}
      </List>
    </div>
  );
};

export default FavouritePlayersPanel;
