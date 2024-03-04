import { Item } from '../../types';
import { router } from 'expo-router';
import { useCallback, useEffect, useReducer, useState } from 'react';
import { Image, View, TouchableOpacity } from 'react-native';
import Button from '../ui/Button';
import TextInput from '../ui/TextInput';
import * as ImagePicker from 'expo-image-picker';
import { XMarkIcon } from 'react-native-heroicons/outline';
import EditLayout from '../layout/EditLayout';
import Header from '../ui/Header';
import useAsyncCallback from '../../hooks/useAsyncCallback';
import upsertItem from '../../services/item/upsertItem';
import Multiselect from '../ui/Multiselect';
import getAllCategories from '../../services/category/getAllCategories';
import createOptions from '../../utils/createOptions';
import useAsyncMemo from '../../hooks/useAsyncMemo';

type ItemFormProps = {
  edit?: boolean;
  initialState: Item;
};

const ItemForm = ({ edit, initialState }: ItemFormProps) => {
  const [state, setState] = useState(initialState);
  const [categories, setCategories] = useState([]);

  const updateValue = (key) => (value) => setState((s) => ({ ...s, [key]: value }));

  const [save, { loading: saving }] = useAsyncCallback(async () => {
    await upsertItem(state, categories);
    router.replace(`/add/${state.itemId}`);
  }, [state, categories]);

  const pickLibraryImage = async () => {
    // No permissions request is necessary for launching the image library
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 4],
      quality: 1,
    });

    if (!result.canceled) {
      setState((s) => ({ ...s, itemPicture: result.assets[0].uri }));
    }
  };

  const pickPhotoImage = async () => {
    const permissions = await ImagePicker.getCameraPermissionsAsync();

    if (permissions.status !== 'granted' && permissions.canAskAgain) {
      const { status } = await ImagePicker.requestCameraPermissionsAsync();

      if (status !== 'granted') {
        return;
      }
    }

    const result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 4],
      quality: 1,
    });

    if (!result.canceled) {
      setState((s) => ({ ...s, itemPicture: result.assets[0].uri }));
    }
  };

  const removeImage = () => setState((s) => ({ ...s, itemPicture: null }));

  const upateCategories = useCallback((value) => {
    setCategories(value);
  }, []);

  const [categoryOptions] = useAsyncMemo(async () => {
    const categorys = await getAllCategories();
    const categoryOptions = createOptions(categorys, 'categoryName', 'categoryId');

    return categoryOptions;
  }, []);

  return (
    <EditLayout>
      <View className="flex flex-grow">
        <Header title="Add Item" />
        <View className="flex p-2">
          <TextInput name="Item Name" onChange={updateValue('itemName')} value={state.itemName} />
          <TextInput
            multiline
            name="Item Description"
            onChange={updateValue('itemDescription')}
            value={state.itemDescription}
          />
          <TextInput
            name="Item Cost"
            keyboardType="numeric"
            onChange={updateValue('itemCost')}
            value={state.itemCost ? `${state.itemCost}` : undefined}
          />
          <Multiselect options={categoryOptions} name="Category" onChange={upateCategories} value={categories} />
          <View className="flex">
            {state.itemPicture ? (
              <View className="flex">
                <Image
                  style={{ width: '100%', height: undefined, aspectRatio: 1 }}
                  source={{ uri: state.itemPicture }}
                />
                <View className="absolute right-0 top-0 flex">
                  <TouchableOpacity onPress={removeImage}>
                    <View className="rounded-bl bg-black p-4">
                      <XMarkIcon color="white" size={25} />
                    </View>
                  </TouchableOpacity>
                </View>
              </View>
            ) : null}
            <View className="flex flex-row justify-between">
              <View className="mr-2 flex flex-1">
                <Button onPress={pickLibraryImage} text="Select Image" />
              </View>
              <View className="ml-2 flex flex-1">
                <Button onPress={pickPhotoImage} text="Take Photo" />
              </View>
            </View>
          </View>
        </View>
      </View>
      <View className="flex p-2">
        {edit ? (
          <Button disabled={saving} onPress={save} text="Save Item" />
        ) : (
          <Button disabled={saving} onPress={save} text="Add Item" />
        )}
      </View>
    </EditLayout>
  );
};

export default ItemForm;
