import { styles } from "@/components/socialMediaCard/styles";
import { globalStyles } from "@/styles/global";
import { Feather } from "@expo/vector-icons";
import type { ComponentProps } from "react";
import { Alert, Linking, Text, TouchableOpacity, View } from "react-native";


type SocialMediaCardProps = {
    socialMediaName: ComponentProps<typeof Feather>["name"];
    iconColor: string;
}

export function SocialMediaCard(props: SocialMediaCardProps) {
    const openLink = async (url: string) => {
            try {
                await Linking.openURL(url);
            } catch {
                Alert.alert("infelizmente não foi possível achar esse link");
            }
        };

    return (
        <TouchableOpacity 
        activeOpacity={0.6}
        style={styles.socialMediaButton}
        onPress={() => { openLink(`https://${props.socialMediaName}.com`) }}
        >
            <View style={styles.socialMediaAllInfo}>
                <Feather name={props.socialMediaName} size={50} color={props.iconColor}/>
                <Text style={styles.socialMediaText}>{props.socialMediaName}</Text>
            </View>

            <Feather name="arrow-up-right" size={25} color={globalStyles.black2}/>

        </TouchableOpacity>
    );
}

