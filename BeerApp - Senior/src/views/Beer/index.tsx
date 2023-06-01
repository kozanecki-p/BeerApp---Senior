import { useEffect, useState } from 'react';
import { Beer as IBeer } from '../../types';
import { fetchData, useSetAsFavorite } from './utils';
import { useParams } from 'react-router-dom';
import { FavoriteIcon } from '../../components/Icons/FavouriteIcon';

const Beer = () => {
  const { id } = useParams();
  const [beer, setBeer] = useState<IBeer>();

  // eslint-disable-next-line
  useEffect(fetchData.bind(this, setBeer, id), [id]);
  const [isFavorite, toggle] = useSetAsFavorite(beer);

  return (
    <article>
      <section>
        <header>
          <h1>
            {beer?.name}
            <FavoriteIcon isFavorite={isFavorite} setFavorite={toggle} />
          </h1>
        </header>
        <main>
          <span>
            <b>Type: </b> {beer?.brewery_type}
          </span>
        </main>
      </section>
    </article>
  );
};

export default Beer;
