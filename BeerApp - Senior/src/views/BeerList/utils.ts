import { getBeerList, getBeerMetaData } from '../../api';
import { Beer, BeerListParams, BeerMetadata } from '../../types';
import handle from '../../utils/error';

const fetchData = (setData: (data: Array<Beer>) => void, params: BeerListParams) => {
  (async () => {
    try {
      const response = await getBeerList({
        page: params.page,
        per_page: params.perPage,
        by_name: params.search,
        sort: params.sort,
      });
      setData(response.data);
    } catch (error) {
      handle(error);
    }
  })();
};

const fetchMetaData = (setData: (data: BeerMetadata) => void, params: BeerListParams) => {
  (async () => {
    try {
      const response = await getBeerMetaData({
        page: params.page,
        per_page: params.perPage,
        by_name: params.search,
        sort: params.sort,
      });
      setData({ total: Number(response.data.total)});
    } catch (error) {
      handle(error);
    }
  })();
};

export { fetchData, fetchMetaData };
