import React, { useState } from "react";
import { FontAwesome6, FontAwesome5, Ionicons } from "@expo/vector-icons";
import {
  Image,
  Text,
  TextInput,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from "react-native";
import Svg, { Defs, LinearGradient, Stop, Path } from "react-native-svg";
import { router, useLocalSearchParams, useRouter } from "expo-router";
import { updateCustomerProfile } from "@/service/ApiService";
const RegisterInformationScreen = () => {
  const { width, height } = useWindowDimensions();
  const route = useRouter();
  const width_node = width / 4;
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phoneNumber: "",
    address: "",
  });
  const { desc } = useLocalSearchParams();

  const handleChange = (name: string, value: string) => {
    setFormData((prevState) => ({ ...prevState, [name]: value }));
  };
  console.log("te", desc);
  const handleUpdate = async () => {
    try {
      const response = await updateCustomerProfile(
        desc as string,
        formData.fullName,
        formData.email,
        formData.phoneNumber,
        formData.address
      );
      console.log("datsssa", response.data);
      router.push("/(tabs)");
    } catch (error) {
      console.error("Lỗi cập nhật:", error.response?.data || error.message);
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
        <View style={{ width: "100%", marginBottom: 20 }}>
          <TextInput
            placeholder="Full Name*"
            placeholderTextColor={"gray"}
            onChangeText={(text) => handleChange("fullName", text)}
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
            onChangeText={(text) => handleChange("email", text)}
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
            keyboardType="numeric"
            onChangeText={(text) => handleChange("phoneNumber", text)}
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
            placeholder="Address*"
            onChangeText={(text) => handleChange("address", text)}
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
          <TouchableOpacity
            onPress={handleUpdate}
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
              <Text
                style={{
                  fontSize: 20,
                  fontWeight: "bold",
                  color: "white",
                  paddingLeft: 10,
                }}
              >
                Confirm
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default RegisterInformationScreen;
