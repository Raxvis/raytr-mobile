import { Item } from '../../types';
import { router } from 'expo-router';
import { useEffect, useReducer } from 'react';
import { Image, View, TouchableOpacity } from 'react-native';
import Button from '../ui/Button';
import TextInput from '../ui/TextInput';
import * as ImagePicker from 'expo-image-picker';
import { XMarkIcon } from 'react-native-heroicons/outline';
import EditLayout from '../layout/EditLayout';
import Header from '../ui/Header';
import useAsyncCallback from '../../hooks/useAsyncCallback';
import upsertItem from '../../services/item/upsertItem';

const reducer = (state, { payload, type }: { payload?: any; type: string }) => {
  switch (type) {
    case 'SET':
      return { ...payload };
    case 'UPDATE':
      return { ...state, ...payload };
    default:
      return state;
  }
};

type ItemFormProps = {
  edit?: boolean;
  initialState: Item;
};

const ItemForm = ({ edit, initialState }: ItemFormProps) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const updateValue = (key) => (value) => dispatch({ type: 'UPDATE', payload: { [key]: value } });

  useEffect(() => {
    dispatch({ type: 'SET', payload: initialState });
  }, []);

  const [save, { loading: saving }] = useAsyncCallback(async () => {
    await upsertItem(state);
    router.back();
  }, [state]);

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      dispatch({ type: 'UPDATE', payload: { itemPicture: result.assets[0].uri } });
    }
  };

  const removeImage = () => dispatch({ type: 'UPDATE', payload: { itemPicture: null } });

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
            value={`${state.itemCost}`}
          />
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
            <Button onPress={pickImage} text="Select Image" />
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
