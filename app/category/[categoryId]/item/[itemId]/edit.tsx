import { useLocalSearchParams } from 'expo-router';
import { useState } from 'react';
import { Item } from '../../../../../types';
import getItem from '../../../../../services/item/getItem';
import ItemForm from '../../../../../components/form/ItemForm';
import useAsyncEffect from '../../../../../hooks/useAsyncEffect';

const EditItem = () => {
  const { itemId } = useLocalSearchParams();
  const [item, setItem] = useState<Item | undefined>();

  useAsyncEffect(async () => {
    const result = await getItem(itemId);

    setItem(result);
  }, [itemId]);

  if (!item) {
    return null;
  }

  return <ItemForm edit initialState={item} />;
};

export default EditItem;
