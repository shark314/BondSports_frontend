import * as React from 'react';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import ProTip from './ProTip';
import LeftSide from './component/LeftSide';
import RightSide from './component/FavouritePlayersPanel';
import {useState} from 'react';
import { Player } from './types/types';
import FavouritePlayersPanel from './component/FavouritePlayersPanel';
import PlayerInfoPanel from './component/PlayerInfoPanel';

function Copyright() {
  return (
    <Typography
      variant="body2"
      align="center"
      sx={{
        color: 'text.secondary',
      }}
    >
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}.
    </Typography>
  );
}

export default function App() {

  const [selectedPlayer, setSelectedPlayer] = useState<Player>();
  const [favoritePlayers, setFavoritePlayers] = useState<Player[]>([]);

  const handleAddToPlayers = (player: Player) => {
    setFavoritePlayers(prevFavorites => {
      // Check if the player is already in the favorites list
      if (prevFavorites.some(favPlayer => favPlayer.id === player.id)) {
        // If found, remove them from the list
        return prevFavorites.filter(favPlayer => favPlayer.id !== player.id);
      } else {
        // If not found, add them to the list
        return [...prevFavorites, player];
      }
    });
  };

  const setSelected = (player:Player) => {
    setSelectedPlayer(player);
  }

  return (
    <Container maxWidth="lg">
      <div style={{ display: 'flex' }}>
        <div style={{ flex: 1 }}>
          <LeftSide setSelected={setSelected} />
        </div>
        <div style={{ flex: 1 }}>
          <div>
            <PlayerInfoPanel selectedPlayer={selectedPlayer} addToFavorite={handleAddToPlayers} favoritePlayers={favoritePlayers}/>
          </div>
          <div>
            <FavouritePlayersPanel favoritePlayers={favoritePlayers} removeToFav={handleAddToPlayers}/>
          </div>
        </div>
      </div>
    </Container>
  );
}
