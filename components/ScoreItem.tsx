import { Text, View } from 'react-native';
import { Score } from '../types';

type ScoreItemProps = {
  score: Score;
};

const ScoreItem = ({ score }: ScoreItemProps) => (
  <View className="flex items-center justify-between px-4 py-5">
    <View className="flex min-w-0 flex-row gap-x-4 ">
      <View className="min-w-0 flex-auto">
        <Text className="text-xl font-semibold leading-6 text-gray-900">{score.ratingSchema.ratingSchemaName}</Text>
      </View>
      <View className="items-center justify-center rounded">
        <View className="rounded-full border-2 border-gray-400 px-4 py-1">
          <Text className="text font-bold text-gray-800">{`${score.scoreValue}`}</Text>
        </View>
      </View>
    </View>
  </View>
);

export default ScoreItem;
