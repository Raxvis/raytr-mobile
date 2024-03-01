import { useCallback } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { DocumentPlusIcon, FolderPlusIcon, SquaresPlusIcon, HomeIcon } from 'react-native-heroicons/outline';
import { useGlobalSearchParams, usePathname, useRouter } from 'expo-router';

const BottomBar = () => {
  const router = useRouter();
  const pathname = usePathname();
  const params = useGlobalSearchParams();

  const navigate = useCallback(
    (route) => {
      router.push({ pathname: route, params });
    },
    [params],
  );

  if (pathname.includes('add/') || pathname.includes('/edit')) {
    return null;
  }

  return (
    <View className="flex w-full flex-row justify-between bg-black px-12 pb-8 pt-2">
      <TouchableOpacity onPress={() => navigate('/')} className="flex items-center">
        <HomeIcon size={28} color={'white'} />
        <Text className="font-poppins text-[8px] text-white">Home</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigate('/add/category')} className="flex items-center">
        <SquaresPlusIcon size={28} color={'white'} />
        <Text className="font-poppins text-[8px] text-white">Category</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigate('/add/rating')} className="flex items-center">
        <DocumentPlusIcon size={28} color={'white'} />
        <Text className="font-poppins text-[8px] text-white">Rating</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigate('/add/item')} className="flex items-center">
        <FolderPlusIcon size={28} color={'white'} />
        <Text className="font-poppins text-[8px] text-white">Item</Text>
      </TouchableOpacity>
    </View>
  );
};

export default BottomBar;
