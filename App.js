


import Animated, {
  useSharedValue,
  withTiming,
  useAnimatedStyle,
  Easing,
} from "react-native-reanimated";
import { View, Button, StyleSheet, Text } from "react-native";


export default function AnimatedStyleUpdateExample(props) {
  const randomWidth = useSharedValue(10);

  const config = {
    duration: 500,
    easing: Easing.bezier(0.5, 0.01, 0, 1),
  };

  const style = useAnimatedStyle(() => {
    return {
      width: withTiming(randomWidth.value, config),
    };
  });

  return (
    <View style={styles.contenedor}>
      <Text>Trabajo Practico N8</Text>
      <Animated.View
        style={[
          { width: 100, height: 80, backgroundColor: "black", margin: 30 },
          style,
        ]}
      />
      <Button
        title="Iniciar"
        onPress={() => {
          randomWidth.value = Math.random() * 350;
        }}
      />
    </View>
  );
}


const styles = StyleSheet.create({
  contenedor: {
      flex: 1,
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
  },
});