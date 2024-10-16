import * as createItemTable from './01-createItemTable';
import * as createItemPriceTable from './02-createPriceTable';
import * as createCategoryTable from './03-createCategoryTable';
import * as createItemCategoryTable from './04-createItemCategoryTable';
import * as createRatingTable from './05-createRatingTable';
import * as createRatingMetricTable from './06-createRatingMetricTable';
import * as createScoreTable from './07-createScoreTable';

const migrations = [
  createItemTable,
  createItemPriceTable,
  createCategoryTable,
  createItemCategoryTable,
  createRatingTable,
  createRatingMetricTable,
  createScoreTable,
];

export default migrations;
