import { View, Text } from "react-native";
import React, { useEffect, useState } from "react";
import { Redirect } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";

const IndexScreen = () => {
  return <Redirect href="/splash" />;
};

export default IndexScreen;
