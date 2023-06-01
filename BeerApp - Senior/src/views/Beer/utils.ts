import { getBeer } from '../../api';
import { Beer } from '../../types';
import handle from '../../utils/error';
import { useLocalStorage } from '../../utils/useLocalStorage';

const fetchData = (setData: (data: Beer) => void, id?: string) => {
  if (!id) return;

  (async () => {
    try {
      const response = await getBeer(id);
      setData(response.data);
    } catch (error) {
      handle(error);
    }
  })();
};

const useSetAsFavorite = (beerToUpdate?: Beer) => {
  const [beers, setBeers] = useLocalStorage<Beer[]>('favorite-beers', []);

  const isAlreadyFavorite = beers.some((beer: Beer) => beer.id === beerToUpdate?.id);

  const toggle = () => {
    if (!isAlreadyFavorite) {
      setBeers([...beers, beerToUpdate]);
      return;
    }
  
    setBeers(beers.filter((beer: Beer) => beer.id !== beerToUpdate?.id));
  }

  return [isAlreadyFavorite, toggle];
}

export { fetchData, useSetAsFavorite };
