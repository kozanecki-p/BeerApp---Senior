import { getRandomBeerList } from '../../api';
import { Beer } from '../../types';
import handle from '../../utils/error';
import { useLocalStorage } from '../../utils/useLocalStorage';

const fetchData = (setData: (data: Array<Beer>) => void) => {
  (async () => {
    try {
      const { data } = await getRandomBeerList(10);
      setData(data);
    } catch (error) {
      handle(error);
    }
  })();
};

const useUpdateFavoriteBeers = (): [Beer[], () => void] => {
  const [beers, setBeers] = useLocalStorage<Beer[]>('favorite-beers', []);

  const clearFavoriteBeers = () => {
    setBeers([]);
  }

  return [beers, clearFavoriteBeers];
}

export { fetchData, useUpdateFavoriteBeers };
