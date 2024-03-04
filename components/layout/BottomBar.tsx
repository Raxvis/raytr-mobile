import { useCallback } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { PlusCircleIcon, ListBulletIcon, HomeIcon, QueueListIcon, UserIcon } from 'react-native-heroicons/outline';
import { useGlobalSearchParams, usePathname, useRouter } from 'expo-router';

const BottomBar = () => {
  const router = useRouter();
  const params = useGlobalSearchParams();

  const navigate = useCallback(
    (route) => {
      router.push({ pathname: route, params });
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
    <View className="flex w-full flex-row justify-between bg-black px-12 pb-8 pt-2">
      <TouchableOpacity onPress={goBack} className="flex items-center">
        <HomeIcon size={28} color={'white'} />
        <Text className="font-poppins text-[8px] text-white">Home</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigate('/feed')} className="flex items-center">
        <QueueListIcon size={28} color={'white'} />
        <Text className="font-poppins text-[8px] text-white">Feed</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigate('/add')} className="flex items-center">
        <PlusCircleIcon size={28} color={'white'} />
        <Text className="font-poppins text-[8px] text-white">Rating</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigate('/lists')} className="flex items-center">
        <ListBulletIcon size={28} color={'white'} />
        <Text className="font-poppins text-[8px] text-white">Lists</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigate('/profile')} className="flex items-center">
        <UserIcon size={28} color={'white'} />
        <Text className="font-poppins text-[8px] text-white">Profile</Text>
      </TouchableOpacity>
    </View>
  );
};

export default BottomBar;
