import { View, Image, Text, TouchableOpacity, ScrollView } from "react-native";
import React, { useState, useEffect, useRef, useContext } from "react";
import tailwind from "tailwind-rn";
import Svg, { Path } from "react-native-svg";
import { WIDTH } from "./constants";
import { Camera } from "expo-camera";

const Home = () => {
  // COMPONENT VARIABLES
  const [photo, setPhoto] = useState();
  const [isDark, setIsDark] = useState(false);
  // CAMERA VARIABLES
  const cam = useRef();
  const [type, setType] = useState(Camera.Constants.Type.back);
  const [camPermitted, setCamPermitted] = useState(null);
  // LIGHT & DARK MODE VARIABLES
  const bgColor = isDark ? " bg-gray-800 " : " bg-gray-100 ";
  const bgAccent = isDark ? " bg-gray-700 " : " bg-gray-300 ";
  const textColor = isDark ? " text-gray-100 " : " text-gray-800 ";
  const textAccent = isDark ? "text-gray-300" : "text-gray-700";
  // CAMERA FUNCTIONS
  useEffect(() => {
    const init = async () => {
      const { status } = await Camera.requestPermissionsAsync();
      setCamPermitted(status === "granted");
    };
    init();
  }, []);

  return (
    <View style={tailwind(`flex flex-1 ${bgColor}`)}>
      <View
        style={tailwind("flex flex-row items-center justify-between px-4 pt-2")}
      >
        <Text style={tailwind(`text-xl ${textColor}`)}>Image Recognition</Text>

        {!isDark ? (
          <TouchableOpacity activeOpacity={0.7} onPress={() => setIsDark(true)}>
            <Svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              style={tailwind(`w-8 h-8 ${textColor}`)}
            >
              <Path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
            </Svg>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => setIsDark(false)}
          >
            <Svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              style={tailwind(`w-8 h-8 ${textColor}`)}
            >
              <Path
                fillRule="evenodd"
                d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z"
                clipRule="evenodd"
              />
            </Svg>
          </TouchableOpacity>
        )}
      </View>
      <View style={tailwind("flex flex-1")}>
        <View style={[tailwind("flex p-2"), { width: WIDTH, height: WIDTH }]}>
          {photo ? (
            <Image
              style={tailwind(
                `${bgAccent} flex justify-center flex-1 rounded-xl`
              )}
              source={{ uri: photo.uri }}
            />
          ) : (
            <View
              style={tailwind(
                `${bgAccent} flex flex-1 justify-center overflow-hidden rounded-xl`
              )}
            >
              {camPermitted ? (
                <Camera
                  ref={(ref) => (cam.current = ref)}
                  style={tailwind(`absolute inset-0`)}
                  type={type}
                  ratio="1:1"
                />
              ) : (
                <Text style={tailwind(`${textColor} text-center`)}>
                  Accept Camera Permission to access
                </Text>
              )}
            </View>
          )}
        </View>
      </View>
    </View>
  );
};

export default Home;
