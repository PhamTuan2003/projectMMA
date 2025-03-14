import {
  View,
  Text,
  useWindowDimensions,
  Image,
  TouchableOpacity,
  TextInput,
} from "react-native";
import React, { useState } from "react";
import Svg, { Defs, LinearGradient, Stop, Path } from "react-native-svg";
import { FontAwesome6, FontAwesome5, Ionicons } from "@expo/vector-icons";
import api from "@/utils/CustomizeApi";
import { register } from "@/service/ApiService";
import { useRouter } from "expo-router";
const RegisterScreen = () => {
  const router = useRouter();
  const { width, height } = useWindowDimensions();
  const width_node = width / 4;
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const handleChange = (name: string, value: string) => {
    setFormData((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleRegister = async () => {
    try {
      const response = await register(formData.username, formData.password);

      console.log("Full API Response:", response.data);

      if (!response || typeof response !== "object") {
        console.error("API response is invalid:", response);
        return;
      }

      if (!response.data || !response.data.desc) {
        console.error("API response is missing necessary fields:", response);
        return;
      }

      router.push({
        pathname: "/registerInformation",
        params: { desc: response.data.desc },
      });
    } catch (error) {
      console.error("Registration Error:", error);
    }
  };

  return (
    <View style={{ flex: 1, backgroundColor: "#F0F0F0", height: "100%" }}>
      {/* header */}
      <View style={{ width: "100%", position: "relative" }}>
        <Svg width={500} height={200} fill="none">
          <Defs>
            <LinearGradient id="grad1" x1="0%" x2="100%" y1="0%" y2="0%">
              <Stop offset="0%" stopColor="green" />
              <Stop offset="100%" stopColor="#03D12E" />
            </LinearGradient>
          </Defs>
          <Path
            // d="M 0 0 L 0 100 C 100 100 100 200 200 100 S 300 200 400 100 L 400 0 L 0  0"
            d={`M 0 0 L 0 100 C ${width_node} 100 ${width_node} 180 ${
              width_node * 2
            } 100 S ${width_node * 3} 180 ${width} 100 L ${width} 0 L 0  0`}
            stroke="transparent"
            fill="url(#grad1)"
          />
        </Svg>
        {/* avatar */}
        <View
          style={{
            position: "absolute",
            top: 70,
            left: "50%",
            transform: [{ translateX: -50 }],
          }}
        >
          <View
            style={{
              width: 120,
              height: 120,
              backgroundColor: "#FCFBFB",
              borderRadius: 100,
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Image
              source={require("../../assets/images/avatar/1.png")}
              style={{ width: 80, height: 80, borderRadius: 50 }}
            />
            <TouchableOpacity
              style={{
                position: "absolute",
                bottom: 10,
                right: 0,
                width: 30,
                height: 30,
                backgroundColor: "#757474",
                borderRadius: 15,
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <FontAwesome6 name="add" size={16} color="white" />
            </TouchableOpacity>
          </View>
        </View>
      </View>
      {/* body */}
      <View style={{ width: "100%", paddingTop: 30, paddingHorizontal: 15 }}>
        {/* <View style={{ width: "100%", marginBottom: 20 }}>
          <TextInput
            placeholder="First Name *"
            placeholderTextColor={"gray"}
            style={{
              height: 60,
              borderRadius: 30,
              padding: 20,
              width: "100%",
              backgroundColor: "white",
              fontSize: 16,
            }}
          />
        </View>
        <View style={{ width: "100%", marginBottom: 20 }}>
          <TextInput
            placeholder="Last Name *"
            placeholderTextColor={"gray"}
            style={{
              height: 60,
              borderRadius: 30,
              padding: 20,
              width: "100%",
              backgroundColor: "white",
              fontSize: 16,
            }}
          />
        </View>
        <View style={{ width: "100%", marginBottom: 20 }}>
          <TextInput
            placeholder="Email Address *"
            placeholderTextColor={"gray"}
            style={{
              height: 60,
              borderRadius: 30,
              padding: 20,
              width: "100%",
              backgroundColor: "white",
              fontSize: 16,
            }}
          />
        </View>
        <View style={{ width: "100%", marginBottom: 20 }}>
          <TextInput
            placeholder="Mobile Phone *"
            placeholderTextColor={"gray"}
            style={{
              height: 60,
              borderRadius: 30,
              padding: 20,
              width: "100%",
              backgroundColor: "white",
              fontSize: 16,
            }}
          />
        </View> */}
        <View style={{ width: "100%", marginBottom: 20 }}>
          <TextInput
            value={formData.username}
            onChangeText={(text) => handleChange("username", text)}
            placeholder="User name *"
            placeholderTextColor={"gray"}
            style={{
              height: 60,
              borderRadius: 30,
              padding: 20,
              width: "100%",
              backgroundColor: "white",
              fontSize: 16,
            }}
          />
        </View>
        <View style={{ width: "100%", marginBottom: 20 }}>
          <TextInput
            value={formData.password}
            onChangeText={(text) => handleChange("password", text)}
            placeholder="Password *"
            placeholderTextColor={"gray"}
            style={{
              height: 60,
              borderRadius: 30,
              padding: 20,
              width: "100%",
              backgroundColor: "white",
              fontSize: 16,
            }}
            secureTextEntry={true}
          />
        </View>
        <View style={{ width: "100%", marginBottom: 20 }}>
          <TouchableOpacity
            onPress={handleRegister}
            style={{
              width: "100%",
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <View
              style={{
                width: "60%",
                height: 60,
                borderRadius: 30,
                backgroundColor: "green",
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <FontAwesome5 name="sign-in-alt" size={24} color="white" />
              <Text
                style={{
                  fontSize: 20,
                  fontWeight: "bold",
                  color: "white",
                  paddingLeft: 10,
                }}
              >
                SIGN IN
              </Text>
            </View>
          </TouchableOpacity>
        </View>
        <View
          style={{
            width: "100%",
            marginBottom: 20,
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Text style={{ fontSize: 16, color: "gray" }}>
            Or create account using social media
          </Text>
        </View>
        <View
          style={{
            width: "100%",
            marginBottom: 20,
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <TouchableOpacity
            style={{
              width: 60,
              height: 60,
              borderRadius: 30,
              backgroundColor: "white",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <FontAwesome5 name="facebook" size={24} color="blue" />
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              width: 60,
              height: 60,
              borderRadius: 30,
              backgroundColor: "white",
              justifyContent: "center",
              alignItems: "center",
              marginLeft: 10,
            }}
          >
            <FontAwesome5 name="google" size={24} color="red" />
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              width: 60,
              height: 60,
              borderRadius: 30,
              backgroundColor: "white",
              justifyContent: "center",
              alignItems: "center",
              marginLeft: 10,
            }}
          >
            <Ionicons name="logo-apple" size={24} color="black" />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default RegisterScreen;
