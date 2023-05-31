import { FormControl, InputLabel, MenuItem, Select, SelectChangeEvent } from '@mui/material';

export enum SortSelectOption {
  nameAscending = 'name:asc',
  nameDescending = 'name:desc',
  typeAscending = 'type:asc',
  typeDescending = 'type:desc',
}

export interface SortSelectProps {
  sort?: SortSelectOption;
  onSortChange: (event: SelectChangeEvent) => void;
}

const SortSelect = ({sort, onSortChange}: SortSelectProps) => {
  return (
    <FormControl>
      <InputLabel id="sort-label">Sort</InputLabel>
      <Select id="sort" labelId="sort-label" label="Sort" value={sort} onChange={onSortChange}>
        <MenuItem value={SortSelectOption.nameAscending}>Name ascending</MenuItem>
        <MenuItem value={SortSelectOption.nameDescending}>Name descending</MenuItem>
        <MenuItem value={SortSelectOption.typeAscending}>Type ascending</MenuItem>
        <MenuItem value={SortSelectOption.typeDescending}>Type descending</MenuItem>
      </Select>
    </FormControl>
  );
};

export default SortSelect;
