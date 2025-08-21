import { View } from "react-native";
import { Text } from "react-native";

// Component to render each leaderboard row
export default function LeaderboardItem ({ item }: { item: any }) {

    return (
        <View className="flex flex-row items-center justify-evenly w-full h-10 bg-primary-400/90 border-[1px] border-primary-200/30 rounded-xl">
            <Text className="text-md w-[30%] text-center text-primary-100/80 font-NunitoSemiBold">
                🎖️ Rank {item.rank}
            </Text>

            <Text
                className="text-md w-[45%] text-center text-primary-100/80 font-NunitoSemiBold"
                numberOfLines={1}
                ellipsizeMode="tail"
            >
                {item.userId}
            </Text>

            <Text className="text-md w-[25%] text-center text-primary-100/80 font-NunitoSemiBold">
                💰 {item.highscore}
            </Text>
        </View>
    );
};