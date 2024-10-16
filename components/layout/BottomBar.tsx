import { useCallback } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { PlusCircleIcon, ListBulletIcon, TagIcon, QueueListIcon, UserIcon } from 'react-native-heroicons/outline';
import { useGlobalSearchParams, usePathname, useRouter } from 'expo-router';

const BottomBar = () => {
  const router = useRouter();
  const params = useGlobalSearchParams();

  const navigate = useCallback(
    (route) => {
      while (router.canGoBack()) {
        // Pop from stack until one element is left
        router.back();
      }
      router.replace({ pathname: route, params });
    },
    [params],
  );

  const goBack = useCallback(() => {
    while (router.canGoBack()) {
      // Pop from stack until one element is left
      router.back();
    }

    router.replace(`/`);
  }, [router]);

  return (
    <View className="flex w-full flex-row justify-between bg-black px-4 pb-8 pt-2">
      <TouchableOpacity onPress={() => navigate('/')} className="flex flex-1 items-center">
        <QueueListIcon size={28} color={'white'} />
        <Text className="font-poppins text-[10px] text-white">Feed</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigate('/items')} className="flex flex-1 items-center">
        <ListBulletIcon size={28} color={'white'} />
        <Text className="font-poppins text-[10px] text-white">Items</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigate('/add')} className="flex flex-1 items-center">
        <PlusCircleIcon size={28} color={'white'} />
        <Text className="font-poppins text-[10px] text-white">Rating</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigate('/categories')} className="flex flex-1 items-center">
        <TagIcon size={28} color={'white'} />
        <Text className="font-poppins text-[10px] text-white">Categories</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigate('/profile')} className="flex flex-1 items-center">
        <UserIcon size={28} color={'white'} />
        <Text className="font-poppins text-[10px] text-white">Profile</Text>
      </TouchableOpacity>
    </View>
  );
};

export default BottomBar;
