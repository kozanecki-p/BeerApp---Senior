import { useEffect, useState, useCallback } from 'react';
import { Beer, BeerListParams, BeerMetadata } from '../../types';
import { fetchData, fetchMetaData } from './utils';
import { Avatar, List, ListItemAvatar, ListItemButton, ListItemText, Pagination } from '@mui/material';
import SportsBar from '@mui/icons-material/SportsBar';
import { useNavigate } from 'react-router-dom';

const PAGE_SIZE = 10;

const BeerList = () => {
  const navigate = useNavigate();
  const [beerList, setBeerList] = useState<Array<Beer>>([]);
  const [beerMetaData, setBeerMetadata] = useState<BeerMetadata>({total: 0})
  const [listParams, setListParams] = useState<BeerListParams>({
    page: 1,
    perPage: PAGE_SIZE,
    search: ''
  });

  // eslint-disable-next-line
  useEffect(fetchData.bind(this, setBeerList, listParams), [listParams]);
  useEffect(fetchMetaData.bind(this, setBeerMetadata, listParams), [listParams]);

  const onBeerClick = (id: string) => navigate(`/beer/${id}`);
  const onPageChange = useCallback((event: React.ChangeEvent<unknown>, value: number) => {
    setListParams({
      ...listParams,
      page: value,
    })
  }, []);

  return (
    <article>
      <section>
        <header>
          <h1>BeerList page</h1>
        </header>
        <main>
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
          <Pagination count={Math.ceil(beerMetaData.total / PAGE_SIZE)} onChange={onPageChange} />
        </main>
      </section>
    </article>
  );
};

export default BeerList;
