import { getHeaderTitle } from "@react-navigation/elements";
import { DrawerActions } from '@react-navigation/native';
import { Tabs } from "expo-router";
import React, { useEffect, useRef, useState } from "react";
import {
    Animated,
    Dimensions,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from "react-native";
import { scale } from "react-native-size-scaling";
import { Path, Svg } from "react-native-svg";
// ICON
import {
    AntDesign,
    EvilIcons,
    Ionicons,
    MaterialCommunityIcons
} from "@expo/vector-icons";
import Constants from "expo-constants";
import { getPathDown } from "../../components/curve";

const CustomTitleTab = ({ children }: any) => {
  return (
    <View style={styles.tabTitle}>
      <Text style={styles.tabTitleText}>{children}</Text>
    </View>
  );
};

const TabRootLayout = () => {
    const [maxWidth, setMaxWidth] = useState(Dimensions.get("window").width);
    const heightHeader = Constants.statusBarHeight + 50;
    const returnpathDown = getPathDown(maxWidth, 60, 50);
  
    const translation = useRef(new Animated.Value(0)).current;
    useEffect(() => {
      const animation = Animated.loop(
        Animated.sequence([
          Animated.timing(translation, {
            toValue: 60, // chiều cao của nút qrcode
            duration: 1000,
            useNativeDriver: false,
          }),
          Animated.timing(translation, {
            toValue: 1, // bắt đầu từ 0 đến 60
            duration: 1000, // số giây
            useNativeDriver: false,
          }),
        ])
      );
      animation.start(); // chạy cái function animation
  
      // xoá animation sau khi chạy xong ->"unmount"
      return () => animation.stop();
    }, [translation]); // Nếu translation thay đổi , thì nó sẽ chạy lại animation
  
    return (
      <>
        <Tabs
          screenOptions={{
            headerShown: true, // kaka
            tabBarActiveTintColor: "white",
            tabBarInactiveTintColor: "white",
            tabBarStyle: {
              backgroundColor: "green",
              borderTopWidth: 0,
              position: "absolute",
              elevation: 0,
            },
            header: ({ navigation, route, options }) => {
  
              const title = getHeaderTitle(options, route.name);
  
              // check kiểm tra tab hiện tại có phải là "Home" hay không
              if (title === "Home") {
                return (
                  <>
                    <View
                      style={{
                        width: "100%",
                        height: heightHeader,
                        backgroundColor: "green",
                        paddingTop: Constants.statusBarHeight,
                      }}
                    >
                      {/* header */}
                      <View style={styles.headerTop}>
                        <View>
                          <View style={styles.headerContent}>
                            <TouchableOpacity onPress={() => navigation.dispatch(DrawerActions.openDrawer())}>
                              <Ionicons name="filter" size={35} color="white" />
                            </TouchableOpacity>
                            <View
                              style={{
                                flexShrink: 1,
                                flex: 1,
                                justifyContent: "center",
                                alignItems: "center",
                              }}
                            >
                              <Text
                                style={[
                                  styles.headerTitle,
                                  { fontFamily: "HelvetIns", fontSize: 30 },
                                ]}
                              >
                                Travel App
                              </Text>
                            </View>
                            <TouchableOpacity>
                              <View>
                                <EvilIcons name="bell" size={40} color="white" />
                                <View
                                  style={{
                                    width: 22,
                                    height: 22,
                                    borderRadius: 20,
                                    backgroundColor: "red",
                                    position: "absolute",
                                    top: -5,
                                    right: 0,
                                    flexDirection: "row",
                                    justifyContent: "center",
                                    alignItems: "center",
                                  }}
                                >
                                  <Text
                                    style={{
                                      color: "white",
                                      textAlign: "center",
                                      fontSize: 10,
                                      fontWeight: "bold",
                                    }}
                                  >
                                    99
                                  </Text>
                                </View>
                              </View>
                            </TouchableOpacity>
                          </View>
                        </View>
                      </View>
                    </View>
                  </>
                );
              }
  
              // chúng ta có thể cấu hình cho các tab khác nếu chúng ta muốn
              else {
                return null;
              }
            },
          }}
        >
          <Tabs.Screen
            name="index"
            options={{
              title: "Home",
              // headerStyle:styles.headerStyle,
              tabBarIcon: ({ color, focused }) => {
                return (
                  <MaterialCommunityIcons name="home" size={30} color={color} />
                );
              },
              tabBarLabel: () => <CustomTitleTab>Home</CustomTitleTab>,
            }}
          />
  
          <Tabs.Screen
            name="favorites"
            options={{
              title: "favorites",
              tabBarIcon: ({ color, focused }) => {
                return (
                  <MaterialCommunityIcons name="heart" size={30} color={color} />
                );
              },
              tabBarLabel: () => <CustomTitleTab>favorites</CustomTitleTab>,
            }}
          />
          <Tabs.Screen
            name="qrcode"
            options={{
              headerShown: false,
              unmountOnBlur: false,
              tabBarItemStyle: {
                margin: 0,
                backgroundColor: "white",
                zIndex: -50,
              },
              tabBarIcon: () => (
                <View
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    height: 60,
                    width: 60,
                    backgroundColor: "green",
                    borderRadius: 30,
                    overflow: "hidden",
                  }}
                >
                  <AntDesign name="qrcode" size={30} color="white" />
                  <Animated.View
                    style={[
                      {
                        position: "absolute",
                        right: 0,
                        width: 60,
                        height: 1,
                        backgroundColor: "white",
                      },
                      { top: translation },
                    ]}
                  ></Animated.View>
                </View>
              ),
              tabBarLabel: () => (
                <View>
                  <Svg width={maxWidth} height={scale(60)}>
                    <Path fill={"green"} {...{ d: returnpathDown }} />
                  </Svg>
                </View>
              ),
            }}
          />
          <Tabs.Screen
            name="messages"
            options={{
              title: "Messages",
              tabBarIcon: ({ color, focused }) => {
                return (
                  <MaterialCommunityIcons
                    name="message"
                    size={30}
                    color={color}
                  />
                );
              },
              tabBarLabel: () => <CustomTitleTab>Messages</CustomTitleTab>,
            }}
          />
          <Tabs.Screen
            name="settings"
            options={{
              title: "settings",
              tabBarIcon: ({ color, focused }) => {
                return (
                  <MaterialCommunityIcons name="cog" size={30} color={color} />
                );
              },
              tabBarLabel: () => <CustomTitleTab>settings</CustomTitleTab>,
            }}
          />
        </Tabs>
      </>
    );
  };

  const styles = StyleSheet.create({
    headerStyle: {
      backgroundColor: "green",
      height: 80, // Specify the height of your custom header
    },
    tabTitle: {
      flex: 1,
      alignItems: "center",
      justifyContent: "center",
    },
    tabTitleText: {
      fontSize: 14,
      color: "white",
      paddingVertical: 10,
      fontWeight: "bold",
    },
    headerTop: {
      width: "100%",
      paddingHorizontal: 20,
    },
    headerContent: {
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
    },
    headerTitle: {
      fontSize: 18,
      fontWeight: "600",
      color: "#fff",
    },
  });


  export default TabRootLayout;