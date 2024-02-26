import { View, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';

const EditLayout = ({ children }) => {
  return (
    <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <ScrollView contentContainerStyle={{ flexGrow: 1 }} className="h-full">
        <View className="ios:pb-12 android:pb-4 flex h-full">{children}</View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default EditLayout;
