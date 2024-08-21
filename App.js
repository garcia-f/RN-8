import { Stack } from 'expo-router';
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, TouchableOpacity, View, Dimensions } from 'react-native';
import Animated, { Easing, useSharedValue, useAnimatedStyle, withTiming } from 'react-native-reanimated';

export default function Index() {

  const backgroundOpacity = useSharedValue(1);
  const titleOpacity = useSharedValue(1);
  const translateY = useSharedValue(-300);
  const [isFaded, setIsFaded] = useState(false);

  const backgroundStyle = useAnimatedStyle(() => {
    return {
      opacity: backgroundOpacity.value,
    };
  });

  const titleStyle = useAnimatedStyle(() => {
    return {
      opacity: titleOpacity.value,
      transform: [{ translateY: translateY.value }],
    };
  });

  useEffect(() => {
    translateY.value = withTiming(30, { duration: 1000, easing: Easing.inOut(Easing.linear) });
  }, []);

  const handlePress = () => {
    if (isFaded) {
      backgroundOpacity.value = withTiming(1, {
        duration: 2000,
        easing: Easing.inOut(Easing.ease),
      });
      titleOpacity.value = withTiming(1, {
        duration: 2000,
        easing: Easing.inOut(Easing.ease),
      });
      translateY.value = withTiming(30, { duration: 1000, easing: Easing.inOut(Easing.linear) });
    } else {
      backgroundOpacity.value = withTiming(0.5, {
        duration: 2000,
        easing: Easing.inOut(Easing.ease),
      });
      titleOpacity.value = withTiming(0, {
        duration: 2000,
        easing: Easing.inOut(Easing.ease),
      });
      translateY.value = withTiming(-300, { duration: 1000, easing: Easing.inOut(Easing.linear) });
    }
    setIsFaded(!isFaded);
  };

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.background, backgroundStyle]} />
      <Animated.View style={[styles.box, titleStyle]}>
        <Text style={styles.title}>Trabajo practico</Text>
        <Text style={styles.title}>N8</Text>
      </Animated.View>
      <TouchableOpacity style={styles.btn} onPress={handlePress}>
        <Text>{isFaded ? 'Restaurar Fondo' : 'Iniciar'}</Text>
      </TouchableOpacity>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  background: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'brown',
  },
  box: {
    width: 200,
    height: 100,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  btn: {
    backgroundColor: '#6f9df9',
    padding: 10,
    borderRadius: 10,
    marginTop: '15%',
  },
});
