import { TableHead, TableRow, TableCell, TableSortLabel } from '@mui/material';
import type { SortOrder } from 'src/shared/types/sort';
import { DEFAULT_SORT_KEY } from 'src/modules/currencies/constants';

interface Props {
  compared: string[];
  order: SortOrder;
  orderBy: string;
  onSort: (key: string) => void;
}

export function CurrencyTableHeader({ compared, order, orderBy, onSort }: Props) {
  return (
    <TableHead sx={{ bgcolor: 'grey.100' }}>
      <TableRow>
        <TableCell
          sx={{ position: 'sticky', left: 0, zIndex: 3, bgcolor: 'grey.100' }}
          sortDirection={orderBy === DEFAULT_SORT_KEY ? order : false}
        >
          <TableSortLabel
            active={orderBy === DEFAULT_SORT_KEY}
            direction={orderBy === DEFAULT_SORT_KEY ? order : 'asc'}
            onClick={() => onSort(DEFAULT_SORT_KEY)}
          >
            Date
          </TableSortLabel>
        </TableCell>
        {compared.map((c) => (
          <TableCell key={c} align="right" sortDirection={orderBy === c ? order : false}>
            <TableSortLabel
              active={orderBy === c}
              direction={orderBy === c ? order : 'asc'}
              onClick={() => onSort(c)}
            >
              {c.toUpperCase()}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}
