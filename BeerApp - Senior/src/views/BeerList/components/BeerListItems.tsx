import { Beer } from '../../../types';
import { Avatar, List, ListItemAvatar, ListItemButton, ListItemText } from '@mui/material';
import SportsBar from '@mui/icons-material/SportsBar';
import { useNavigate } from 'react-router-dom';

export interface BeerListItemsProps {
  beerList: Beer[];
}

const BeerListItems = ({beerList = []}: BeerListItemsProps) => {
  const navigate = useNavigate();

  const onBeerClick = (id: string) => navigate(`/beer/${id}`);

  return (
    <List>
      {beerList.map((beer) => (
        <ListItemButton key={beer.id} onClick={onBeerClick.bind(this, beer.id)}>
          <ListItemAvatar>
            <Avatar>
              <SportsBar />
            </Avatar>
          </ListItemAvatar>
          <ListItemText primary={beer.name} secondary={beer.brewery_type} />
        </ListItemButton>
      ))}
    </List>
  );
};

export default BeerListItems;
