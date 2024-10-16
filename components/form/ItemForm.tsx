import { Item } from '../../types';
import { router } from 'expo-router';
import { useCallback, useEffect, useMemo, useReducer, useState } from 'react';
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
import createCategory from '../../services/category/createCategory';
import createOptions from '../../utils/createOptions';
import useAsyncMemo from '../../hooks/useAsyncMemo';
import useItemForm from '../../reducers/useItemForm';

type ItemFormProps = {
  edit?: boolean;
  initialState: Item;
};

const ItemForm = ({ edit, initialState }: ItemFormProps) => {
  const { actions, state } = useItemForm(initialState);

  const [save, { loading: saving }] = useAsyncCallback(async () => {
    try {
      await upsertItem(state);
      if (edit) {
        router.back();
      } else {
        router.replace(`/add/${state.itemId}`);
      }
    } catch (error) {
      console.log(error);
    }
  }, [state]);

  const pickLibraryImage = async () => {
    // No permissions request is necessary for launching the image library
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 4],
      quality: 1,
    });

    if (!result.canceled) {
      actions.updateItemPicture(result.assets[0].uri);
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
      actions.updateItemPicture(result.assets[0].uri);
    }
  };

  const getCategoryOptions = async () => {
    const categories = await getAllCategories();
    const categoryOptions = createOptions(categories, 'categoryName', 'categoryId');

    return categoryOptions;
  };

  const createNewCategory = async (value, label) => {
    await createCategory({ categoryId: value, categoryName: label });
    return { value, label };
  };

  return (
    <EditLayout>
      <View className="flex flex-grow">
        <Header title={edit ? 'Edit Item' : 'Add Item'} />
        <View className="flex p-2">
          <TextInput
            name="Item Name"
            onChange={(value) => actions.updateItem({ itemName: value })}
            value={state.itemName}
          />
          <TextInput
            multiline
            name="Item Description"
            onChange={(value) => actions.updateItem({ itemDescription: value })}
            value={state.itemDescription}
          />
          <Multiselect
            createOption={createNewCategory}
            loadOptions={getCategoryOptions}
            name="Category"
            onChange={(values) => actions.updateCategoryIds(values)}
            value={state.categoryIds}
          />
          <View className="flex">
            {state.itemPicture ? (
              <View className="flex">
                <Image
                  style={{ width: '100%', height: undefined, aspectRatio: 1 }}
                  source={{ uri: state.itemPicture }}
                />
                <View className="absolute right-0 top-0 flex">
                  <TouchableOpacity onPress={() => actions.updateItemPicture(null)}>
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
