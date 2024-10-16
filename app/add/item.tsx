import { Item } from '../../types';
import uuid from '../../utils/uuid';
import ItemForm from '../../components/form/ItemForm';

const getNewItem = (): Item => ({
  itemId: uuid(),
  itemName: '',
  itemPicture: '',
  itemDescription: '',
  categories: [],
});

const AddItem = () => <ItemForm initialState={getNewItem()} />;

export default AddItem;
