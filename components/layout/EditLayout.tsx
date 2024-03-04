import { View, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';

const EditLayout = ({ children }) => {
  return (
    <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <ScrollView contentContainerStyle={{ flexGrow: 1 }} className="h-full">
        <View className="flex h-full pb-4">{children}</View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default EditLayout;
