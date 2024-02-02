import { Link } from 'expo-router';
import { useCallback, useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { DocumentPlusIcon, FolderPlusIcon, PlusIcon, SquaresPlusIcon, XMarkIcon } from 'react-native-heroicons/outline';
import { useNavigation, router } from 'expo-router';

const AddButton = () => {
  const navigation = useNavigation();

  const [open, setOpen] = useState(false);

  const navigate = useCallback(
    (route) => {
      setOpen(false);

      const { routes } = navigation.getState();
      const lastRoute = routes[routes.length - 1];

      if (lastRoute.name.includes('add/')) {
        router.replace(route);
      } else {
        router.navigate(route);
      }
    },
    [setOpen],
  );

  return (
    <View className="absolute bottom-8 left-0 right-0 w-full">
      {!open ? (
        <TouchableOpacity
          onPress={() => setOpen(true)}
          className="mx-auto flex h-16 w-16 items-center justify-center rounded-full border-2 border-accent bg-white"
        >
          <PlusIcon size={36} color={'black'} />
        </TouchableOpacity>
      ) : (
        <View className="relative mx-auto flex h-14 w-14 rounded-full">
          <TouchableOpacity
            onPress={() => setOpen(false)}
            className=" flex h-full w-full items-center justify-center rounded-full border-2  border-dashed border-white"
          >
            <XMarkIcon size={28} color={'white'} />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => navigate('/add/category')}
            className=" absolute -left-[80px] -top-[48px] flex h-16 w-16 items-center justify-center rounded-full bg-accent"
          >
            <SquaresPlusIcon size={28} color={'white'} />
            <Text className="font-poppins text-[8px] text-white">Category</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => navigate('/add/rating')}
            className=" absolute -top-[96px] flex h-16 w-16 items-center justify-center rounded-full bg-accent "
          >
            <DocumentPlusIcon size={28} color={'white'} />
            <Text className="font-poppins text-[8px] text-white">Rating</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => navigate('/add/item')}
            className=" absolute -right-[80px] -top-[48px] flex h-16 w-16 items-center justify-center rounded-full bg-accent"
          >
            <FolderPlusIcon size={28} color={'white'} />
            <Text className="font-poppins text-[8px] text-white">Item</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

export default AddButton;
