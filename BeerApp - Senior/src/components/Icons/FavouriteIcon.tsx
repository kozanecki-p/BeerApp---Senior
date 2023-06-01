import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteFilledIcon from '@mui/icons-material/Favorite';
import { useCallback } from 'react';

export interface FavoriteIconProps {
  isFavorite: boolean;
  setFavorite: (favorite: boolean) => void;
}

const FavoriteIcon = ({ isFavorite = false, setFavorite }: FavoriteIconProps)  => {
  const update = useCallback(() => setFavorite(!isFavorite), [isFavorite, setFavorite]);
  return <span onClick={update}>
    {
      isFavorite
        ? <FavoriteFilledIcon fontSize='small' />
        : <FavoriteBorderIcon fontSize='small' />
    }
  </span>
};

export { FavoriteIcon };