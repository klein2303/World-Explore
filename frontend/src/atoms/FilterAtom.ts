import {atom} from 'recoil';
import { getFilters } from '../utils/FilterStorage';

export const filterAtom = atom({
    key: 'filterAtom',
    default: getFilters(),
});

