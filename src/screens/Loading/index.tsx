import MetallicShineLoading from "@/components/metallicShineLoading";
import { View } from "react-native";
import { styles } from "./styles";

export function Loading() {
    return (
        <View style={styles.container}>
            <MetallicShineLoading />
        </View>
    )
}