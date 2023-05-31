import { useEffect, useState, useCallback } from 'react';
import { Beer, BeerListParams, BeerMetadata } from '../../types';
import { fetchData, fetchMetaData } from './utils';
import { Grid, Pagination, SelectChangeEvent, TextField } from '@mui/material';
import BeerListItems from './components/BeerListItems';
import SortSelect, { SortSelectOption } from './components/SortSelect';

const PAGE_SIZE = 10;

const BeerList = () => {
  const [beerList, setBeerList] = useState<Array<Beer>>([]);
  const [beerMetaData, setBeerMetadata] = useState<BeerMetadata>({total: 0})
  const [listParams, setListParams] = useState<BeerListParams>({
    page: 1,
    perPage: PAGE_SIZE,
    search: '',
    sort: SortSelectOption.nameAscending,
  });

  useEffect(() => fetchData(setBeerList, listParams), [listParams]);
  useEffect(() => fetchMetaData(setBeerMetadata, listParams), [listParams]);

  const onPageChange = useCallback((event: React.ChangeEvent<unknown>, value: number) => {
    setListParams({
      ...listParams,
      page: value,
    })
  }, [listParams]);
  const onFilterChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    setListParams({
      ...listParams,
      search: event.target.value,
      page: 1,
    })
  }, [listParams]);
  const onSortChange = useCallback((event: SelectChangeEvent) => {
    setListParams({
      ...listParams,
      sort: event.target.value,
      page: 1,
    })
  }, [listParams])

  return (
    <article>
      <section>
        <header>
          <h1>BeerList page</h1>
        </header>
        <main>
          <Grid container spacing={2}>
            <Grid item>
              <TextField id="filter" label="Filter" value={listParams.search} onChange={onFilterChange} />
            </Grid>
            
            <Grid item>
              <SortSelect sort={listParams.sort as SortSelectOption} onSortChange={onSortChange} />
            </Grid>
          </Grid>
          <BeerListItems beerList={beerList} />
          <Pagination count={Math.ceil(beerMetaData.total / PAGE_SIZE)} onChange={onPageChange} />
        </main>
      </section>
    </article>
  );
};

export default BeerList;
