import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  createDrawerNavigator,
  DrawerContentScrollView,
} from "@react-navigation/drawer";
import { DrawerActions, useNavigation } from "@react-navigation/native";
import { useRouter } from "expo-router";
import { jwtDecode } from "jwt-decode";
import React, { useEffect, useState } from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
// ICON
import {
  AntDesign,
  Entypo,
  FontAwesome,
  Ionicons,
  MaterialCommunityIcons,
  MaterialIcons,
} from "@expo/vector-icons";

// Menu Drawer
import { getProfileCustomer } from "@/service/ApiService";
import Bills from "../bills";
import CollectionScreen from "../collections";
import TabRootLayout from "../home";
import MyAccountScreen from "../myAccount";
import NewScreen from "../news";
import RegisterScreen from "../register";
import WishListScreen from "../wishLists";
const Drawer = createDrawerNavigator();

// Custom Drawer Navigator
const CustomDrawerContent = (props: any) => {
  const { state, navigation } = props;

  const [user, setUser] = useState<any>(null);
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = await AsyncStorage.getItem("token");
        const idAccount = await AsyncStorage.getItem("idAccount");
        if (!token) return; // Nếu chưa có token, không làm gì cả

        const decodedToken = jwtDecode(token); // Giải mã token
        if (idAccount) {
          const response = await getProfileCustomer(idAccount); // Gọi API lấy thông tin người dùng
          setUser(response.data);
          console.log("object", response);
        }
      } catch (error) {
        console.error("Lỗi khi lấy thông tin người dùng:", error);
      }
    };

    fetchUserData();
  }, []);

  return (
    <View style={{ flex: 1, height: "100%" }}>
      <DrawerContentScrollView {...props}>
        {/* <DrawerItemList {...props} /> */}
        <View style={{ width: "100%", height: "100%", flex: 1 }}>
          {/* header top */}
          <View
            style={{
              width: "100%",
              paddingVertical: 30,
              paddingHorizontal: 20,
              borderBottomColor: "#F5F4F4",
              borderBottomWidth: 1,
            }}
          >
            <View
              style={{
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
                gap: 10,
              }}
            >
              <View
                style={{
                  width: 80,
                  height: 80,
                  borderRadius: 40,
                  backgroundColor: "gray",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Image
                  source={require("../../../assets/images/avatar/1.png")}
                  style={{ width: 70, height: 70, borderRadius: 35 }}
                />
              </View>
              <View style={{ paddingTop: 10 }}>
                <Text
                  style={{ fontSize: 20, fontWeight: "bold", color: "black" }}
                >
                  {user ? user.fullName : ""}
                </Text>
                <Text
                  style={{ fontSize: 14, fontWeight: "400", color: "black" }}
                >
                  {user ? user.email : ""}
                </Text>
              </View>
            </View>
          </View>

          {/* menu */}
          <View style={{ flex: 1, height: "100%" }}>
            {props.state.routes.map((route: any, index: any) => {
              const { drawerIcon, drawerLabel } =
                props.descriptors[route.key].options;
              const focused = index === props.state.index;
              //console.warn(route.name)
              return (
                <TouchableOpacity
                  key={route.key}
                  style={{
                    width: "100%",
                    paddingVertical: 10,
                    paddingHorizontal: 20,
                    flexDirection: "row",
                    alignContent: "center",
                  }}
                  onPress={() => navigation.navigate(route.name)}
                >
                  <View
                    style={{
                      width: "100%",
                      flexDirection: "row",
                      justifyContent: "center",
                      alignItems: "center",
                      gap: 10,
                    }}
                  >
                    {drawerIcon &&
                      drawerIcon({
                        focused,
                        color: focused ? "#fff" : "green",
                        size: 30,
                      })}
                    {drawerLabel && drawerLabel({ focused, color: "black" })}
                  </View>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>
      </DrawerContentScrollView>
      <View
        style={{
          padding: 30,
          backgroundColor: "white",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Text style={{ fontSize: 14, color: "black" }}>
          Travel App, Version 1.0.1
        </Text>
      </View>
    </View>
  );
};

const MyDrawerApp = () => {
  const router = useRouter();
  const navigation = useNavigation();
  return (
    <Drawer.Navigator
      screenOptions={{
        headerShown: false,
        drawerActiveTintColor: "white",
        drawerInactiveTintColor: "white",
        drawerActiveBackgroundColor: "green",
        drawerInactiveBackgroundColor: "transparent",
        drawerStyle: {
          backgroundColor: "white",
          width: 300,
          height: "100%",
          padding: 0,
          margin: 0,
        },
      }}
      drawerContent={(props) => <CustomDrawerContent {...props} />}
    >
      {/* 
        viết layout cho menu tại đây
        Chú ý chúng ta dùng component={TabRootLayout}  để có bottom tabs ở bên dưới screen
      */}
      <Drawer.Screen
        name="Home"
        component={TabRootLayout}
        options={{
          drawerIcon: ({ focused, color, size }) => {
            return (
              <View
                style={{
                  backgroundColor: focused ? "green" : "#fff",
                  borderRadius: 8,
                  padding: 2,
                }}
              >
                <MaterialCommunityIcons
                  name="home-outline"
                  size={size}
                  color={color}
                />
              </View>
            );
          },
          drawerLabel: ({ focused, color }) => {
            return (
              <View style={{ flex: 1 }}>
                <View
                  style={{
                    width: "100%",
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <Text
                    style={{
                      flex: 1,
                      color: focused ? "green" : color,
                      fontSize: 16,
                      fontWeight: 500,
                      paddingLeft: 10,
                    }}
                  >
                    Home
                  </Text>
                  <Entypo name="chevron-right" size={16} color={color} />
                </View>
              </View>
            );
          },
        }}
      />

      <Drawer.Screen
        name="collections"
        component={CollectionScreen}
        options={{
          headerShown: false,
          drawerIcon: ({ focused, color, size }) => {
            return (
              <View
                style={{
                  backgroundColor: focused ? "green" : "#fff",
                  borderRadius: 8,
                  padding: 2,
                }}
              >
                <MaterialIcons name="collections" size={size} color={color} />
              </View>
            );
          },
          drawerLabel: ({ focused, color }) => {
            return (
              <View style={{ flex: 1 }}>
                <View
                  style={{
                    width: "100%",
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <Text
                    style={{
                      flex: 1,
                      color: focused ? "green" : color,
                      fontSize: 16,
                      fontWeight: 500,
                      paddingLeft: 10,
                    }}
                  >
                    Collections
                  </Text>
                  <Entypo name="chevron-right" size={16} color={color} />
                </View>
              </View>
            );
          },
        }}
      />

      <Drawer.Screen
        name="cart"
        component={Bills}
        options={{
          headerShown: true,
          headerTitle: "Carts",
          headerLeft: () => (
            <TouchableOpacity
              style={{ paddingHorizontal: 20 }}
              onPress={() => navigation.dispatch(DrawerActions.openDrawer())}
            >
              <Ionicons name="filter" size={30} color="black" />
            </TouchableOpacity>
          ),

          headerRight: () => (
            <TouchableOpacity style={{ paddingHorizontal: 20 }}>
              <AntDesign name="message1" size={24} color="black" />
            </TouchableOpacity>
          ),

          drawerIcon: ({ focused, color, size }) => {
            return (
              <View
                style={{
                  backgroundColor: focused ? "green" : "#fff",
                  borderRadius: 8,
                  padding: 2,
                }}
              >
                <Ionicons name="cart" size={size} color={color} />
              </View>
            );
          },
          drawerLabel: ({ focused, color }) => {
            return (
              <View style={{ flex: 1 }}>
                <View
                  style={{
                    width: "100%",
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <Text
                    style={{
                      flex: 1,
                      color: focused ? "green" : color,
                      fontSize: 16,
                      fontWeight: 500,
                      paddingLeft: 10,
                    }}
                  >
                    Bills
                  </Text>
                  <Entypo name="chevron-right" size={16} color={color} />
                </View>
              </View>
            );
          },
        }}
      />

      <Drawer.Screen
        name="news"
        component={NewScreen}
        options={{
          headerShown: true,
          headerTitle: "News",
          headerLeft: () => (
            <TouchableOpacity
              style={{ paddingHorizontal: 20 }}
              onPress={() => navigation.dispatch(DrawerActions.openDrawer())}
            >
              <Ionicons name="filter" size={30} color="black" />
            </TouchableOpacity>
          ),

          headerRight: () => (
            <TouchableOpacity style={{ paddingHorizontal: 20 }}>
              <AntDesign name="search1" size={24} color="black" />
            </TouchableOpacity>
          ),
          drawerIcon: ({ focused, color, size }) => {
            return (
              <View
                style={{
                  backgroundColor: focused ? "green" : "#fff",
                  borderRadius: 8,
                  padding: 2,
                }}
              >
                <MaterialIcons name="receipt" size={size} color={color} />
              </View>
            );
          },
          drawerLabel: ({ focused, color }) => {
            return (
              <View style={{ flex: 1 }}>
                <View
                  style={{
                    width: "100%",
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <Text
                    style={{
                      flex: 1,
                      color: focused ? "green" : color,
                      fontSize: 16,
                      fontWeight: 500,
                      paddingLeft: 10,
                    }}
                  >
                    News
                  </Text>
                  <Entypo name="chevron-right" size={16} color={color} />
                </View>
              </View>
            );
          },
        }}
      />

      <Drawer.Screen
        name="wishLists"
        component={WishListScreen}
        options={{
          headerShown: true,
          headerTitle: "Travel Wishlist",
          headerLeft: () => (
            <TouchableOpacity
              style={{ paddingHorizontal: 20 }}
              onPress={() => navigation.dispatch(DrawerActions.openDrawer())}
            >
              <Ionicons name="filter" size={30} color="black" />
            </TouchableOpacity>
          ),

          drawerIcon: ({ focused, color, size }) => {
            return (
              <View
                style={{
                  backgroundColor: focused ? "green" : "#fff",
                  borderRadius: 8,
                  padding: 2,
                }}
              >
                <FontAwesome name="heart" size={size} color={color} />
              </View>
            );
          },
          drawerLabel: ({ focused, color }) => {
            return (
              <View style={{ flex: 1 }}>
                <View
                  style={{
                    width: "100%",
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <Text
                    style={{
                      flex: 1,
                      color: focused ? "green" : color,
                      fontSize: 16,
                      fontWeight: 500,
                      paddingLeft: 10,
                    }}
                  >
                    Travel Wishlist
                  </Text>
                  <Entypo name="chevron-right" size={16} color={color} />
                </View>
              </View>
            );
          },
        }}
      />

      <Drawer.Screen
        name="RecentlyViewed"
        component={TabRootLayout}
        options={{
          drawerIcon: ({ focused, color, size }) => {
            return (
              <View
                style={{
                  backgroundColor: focused ? "green" : "#fff",
                  borderRadius: 8,
                  padding: 2,
                }}
              >
                <Ionicons name="eye" size={size} color={color} />
              </View>
            );
          },
          drawerLabel: ({ focused, color }) => {
            return (
              <View style={{ flex: 1 }}>
                <View
                  style={{
                    width: "100%",
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <Text
                    style={{
                      flex: 1,
                      color: focused ? "green" : color,
                      fontSize: 16,
                      fontWeight: 500,
                      paddingLeft: 10,
                    }}
                  >
                    Recently Viewed
                  </Text>
                  <Entypo name="chevron-right" size={16} color={color} />
                </View>
              </View>
            );
          },
        }}
      />

      <Drawer.Screen
        name="MyAccount"
        component={MyAccountScreen}
        options={{
          drawerIcon: ({ focused, color, size }) => {
            return (
              <View
                style={{
                  backgroundColor: focused ? "green" : "#fff",
                  borderRadius: 8,
                  padding: 2,
                }}
              >
                <Ionicons name="person" size={size} color={color} />
              </View>
            );
          },
          drawerLabel: ({ focused, color }) => {
            return (
              <View style={{ flex: 1 }}>
                <View
                  style={{
                    width: "100%",
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <Text
                    style={{
                      flex: 1,
                      color: focused ? "green" : color,
                      fontSize: 16,
                      fontWeight: 500,
                      paddingLeft: 10,
                    }}
                  >
                    My Account{" "}
                  </Text>
                  <Entypo name="chevron-right" size={16} color={color} />
                </View>
              </View>
            );
          },
        }}
      />
      <Drawer.Screen
        name="About"
        component={TabRootLayout}
        options={{
          drawerIcon: ({ focused, color, size }) => {
            return (
              <View
                style={{
                  backgroundColor: focused ? "green" : "#fff",
                  borderRadius: 8,
                  padding: 2,
                }}
              >
                <Entypo name="info" size={size} color={color} />
              </View>
            );
          },
          drawerLabel: ({ focused, color }) => {
            return (
              <View style={{ flex: 1 }}>
                <View
                  style={{
                    width: "100%",
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <Text
                    style={{
                      flex: 1,
                      color: focused ? "green" : color,
                      fontSize: 16,
                      fontWeight: 500,
                      paddingLeft: 10,
                    }}
                  >
                    About
                  </Text>
                  <Entypo name="chevron-right" size={16} color={color} />
                </View>
              </View>
            );
          },
        }}
      />
      {/* thêm các screeb khác */}
      <Drawer.Screen name="register" component={RegisterScreen} />
    </Drawer.Navigator>
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
export default MyDrawerApp;
