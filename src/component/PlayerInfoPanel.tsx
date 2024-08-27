import React, { useEffect, useState, useReducer } from 'react';
import axios from 'axios';
import { Player } from '../types/types';
import { Alert, Box, Button, Fade, List, ListItemButton } from '@mui/material';
import StarBorderPurple500Icon from '@mui/icons-material/StarBorderPurple500';

interface PlayerInfoPanelProps {
    selectedPlayer: Player | undefined;
    addToFavorite: (selectedPlayer: Player) => void;
    favoritePlayers: Player[];
}

const serverUrl = process.env.SERVER_URL || 'http://localhost:5000/api';

const PlayerInfoPanel: React.FC<PlayerInfoPanelProps> = ({ addToFavorite, selectedPlayer, favoritePlayers }) => {
    const [playerStats, setPlayerStats] = useState<any>(null);
    const [showAlert, setShowAlert] = useState(false);

    useEffect(() => {
        if (showAlert) {
            const timer = setTimeout(() => setShowAlert(false), 3000);
            return () => clearTimeout(timer);
        }
    }, [showAlert]);

    useEffect(() => {
        const fetchData = async () => {
            if (selectedPlayer) {
                try {
                    const response = await axios.get(`${serverUrl}/pInfo`, {
                        params: {
                            playerId: selectedPlayer.id,
                            seasonStats: true,
                        },
                    });
                    setPlayerStats(response.data.data[0]);  // assuming you want the first entry in the returned array
                    setShowAlert(true);
                } catch (error) {
                    console.error('Error fetching player stats:', error);
                }
            }
        };

        fetchData();
    }, [selectedPlayer]);
    
    
    if (!selectedPlayer ) {
        return (
            <div>
                <h2>Player Information</h2>
                <p>No Player Selected.</p>
            </div>
        )
    }
    
    if (!playerStats ) {
        return (
            <div>
                <Fade in={showAlert} timeout={{ enter: 500, exit: 500 }} unmountOnExit>
                <Alert severity="error" onClose={() => setShowAlert(false)}>
                    No Data Available
                </Alert>
                </Fade>
                <h2>Player Information</h2>
                <p>No Data Available</p>
            </div>
        )
    }
    const isFavorite = favoritePlayers.some(player => player.id === selectedPlayer.id);
    
    return (
        <div>
            <Fade in={showAlert} timeout={{ enter: 500, exit: 500 }} unmountOnExit>
                <Alert severity="success" onClose={() => setShowAlert(false)}>Successfully Updated</Alert>
            </Fade>

            <h2>Player Information</h2>
            <List>
                <ListItemButton>Name: {selectedPlayer.first_name} {selectedPlayer.last_name}</ListItemButton>
                <ListItemButton>Team: {playerStats.team.full_name}</ListItemButton>
                <ListItemButton>Position: {selectedPlayer?.position}</ListItemButton>
                <ListItemButton>Height: {selectedPlayer?.height}</ListItemButton>
                <ListItemButton>Weight: {selectedPlayer?.weight}</ListItemButton>
                <ListItemButton>Points: {playerStats.pts}</ListItemButton>
                <ListItemButton>Assists: {playerStats.ast}</ListItemButton>
                <ListItemButton>Rebounds: {playerStats.reb}</ListItemButton>
                {/* Add more stats or player details as needed */}
                <Box display="flex" justifyContent="flex-end">
                    {isFavorite? (
                        <Button variant="contained" onClick={() => addToFavorite(selectedPlayer)} disabled startIcon={<StarBorderPurple500Icon />}>Add to Favorite</Button>
                    ): (
                        <Button variant="contained" onClick={() => addToFavorite(selectedPlayer)} startIcon={<StarBorderPurple500Icon />}>Add to Favorite</Button>
                    )}
                </Box>
            </List>
        </div>
    );
};

export default PlayerInfoPanel;
