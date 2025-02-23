import { AntDesign, FontAwesome, Ionicons, MaterialIcons } from '@expo/vector-icons';
import { useFonts } from 'expo-font';
import { useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { Image, ScrollView, Text, TouchableOpacity, View } from 'react-native';
// 📗 khai báo thư viện mà expo hổ trỡ để lấy giá trị chiều cao  statusBar
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import Constants from "expo-constants";

const MyAccountScreen = () => {
  const router = useRouter()
  const navigation = useNavigation();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const checkLoginStatus = async () => {
      const token = await AsyncStorage.getItem('token');
      setIsLoggedIn(!!token)
    }
    checkLoginStatus();
  }, [])



  const [fontsLoaded, fontError] = useFonts({
    HelvetIns: require("../../assets/fonts/HelvetIns.ttf"),
    PlaywriteNL: require("../../assets/fonts/Playwrite_NL/Playwrite-NL.ttf"),
    Montserrat: require("../../assets/fonts/Montserrat/static/Montserrat-Regular.ttf"),

  });
  // Hàm xử lý đăng xuất
  const handleLogout = async () => {
    await AsyncStorage.removeItem('token'); // Xóa token khỏi AsyncStorage
    setIsLoggedIn(false);
    router.replace('/login')
  };

  const handleLogin = () => {
    router.push('/login')
  };

  return (
    <View style={{ flex: 1, width: '100%', height: '100%', position: 'relative', backgroundColor: 'white' }}>
      {/* background */}
      <View style={{ width: '100%', height: '40%', position: 'absolute', zIndex: 1 }}>
        {/* <Image source={require('../../assets/images/travel/1.jpg')} style={{width:'100%',height:'100%'}} /> */}
        <View style={{ backgroundColor: '#77fc89', width: '100%', height: '100%' }}>

        </View>
      </View>
      <View style={{ width: '100%', position: 'relative', zIndex: 50, paddingTop: Constants.statusBarHeight }}>
        {/* header */}
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 20, alignItems: 'center' }}>
          <TouchableOpacity onPress={() => router.back()}>
            <View style={{ width: 35, height: 35, borderRadius: 20, backgroundColor: '#fff', justifyContent: 'center', alignItems: 'center' }}>
              <Ionicons name='chevron-back' size={20} color={'black'} />
            </View>
          </TouchableOpacity>

          <View style={{ flexDirection: 'row', gap: 10 }}>

            <TouchableOpacity>
              <View style={{ width: 35, height: 35, borderRadius: 20, backgroundColor: '#fff', justifyContent: 'center', alignItems: 'center' }}>
                <AntDesign name="sharealt" size={20} color="black" />
              </View>
            </TouchableOpacity>

          </View>
        </View>
        {/* end header */}
      </View>
      <ScrollView style={{ width: '100%', position: 'relative', zIndex: 2 }}>

        <View style={{ width: '100%', height: '100%', position: 'relative', zIndex: 2 }}>


          {/* avatar */}
          <View>
            <View style={{ width: 100, height: 100, backgroundColor: '#FFF', borderRadius: 20, alignSelf: 'center', justifyContent: 'center', alignItems: 'center' }}>
              <Image source={require('../../assets/images/avatar/1.png')} style={{ width: 80, height: 80, borderRadius: 20, alignSelf: 'center' }} />
            </View>
            <Text style={{ fontSize: 22, alignSelf: 'center', marginTop: 10, fontFamily: 'HelvetIns', color: '#000' }}>Pham Thanh Tuan</Text>
            <TouchableOpacity style={{ width: 120, margin: 'auto', padding: 5, borderRadius: 20, backgroundColor: '#fcf864', justifyContent: 'center', alignItems: 'center', marginTop: 10 }}>
              <Text style={{ fontSize: 13, alignSelf: 'center', fontFamily: 'Montserrat', color: '#000' }}>Join 5 year</Text>
            </TouchableOpacity>
          </View>
          {/* end avatar */}

          {/* body */}
          <View style={{ flex: 1, paddingTop: 30, height: '100%' }}>

            <View style={{ width: '100%', backgroundColor: '#fff', borderTopRightRadius: 30, borderTopLeftRadius: 30, padding: 30 }}>
              <TouchableOpacity style={{ width: '100%', paddingHorizontal: 10, paddingVertical: 15 }}>
                <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
                  <View style={{ width: 35, height: 35, borderRadius: 8, backgroundColor: '#066ce7', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                    <AntDesign name="wechat" size={20} color="#fff" />

                  </View>
                  <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                    <Text style={{ fontSize: 16, fontFamily: 'Montserrat', color: '#000' }}>Start a Chat</Text>
                    <Ionicons name='chevron-forward' size={24} color="black" />

                  </View>
                </View>
              </TouchableOpacity>
              <TouchableOpacity style={{ width: '100%', paddingHorizontal: 10, paddingVertical: 15 }}>
                <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
                  <View style={{ width: 35, height: 35, borderRadius: 8, backgroundColor: '#e7c506', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>

                    <AntDesign name="edit" size={20} color="#fff" />
                  </View>
                  <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                    <Text style={{ fontSize: 16, fontFamily: 'Montserrat', color: '#000' }}>Edit Profle</Text>
                    <Ionicons name='chevron-forward' size={24} color="black" />
                  </View>
                </View>
              </TouchableOpacity>
              <TouchableOpacity style={{ width: '100%', paddingHorizontal: 10, paddingVertical: 15 }}>
                <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
                  <View style={{ width: 35, height: 35, borderRadius: 8, backgroundColor: '#9efe49', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>

                    <MaterialIcons name="collections" size={20} color="#fff" />
                  </View>
                  <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                    <Text style={{ fontSize: 16, fontFamily: 'Montserrat', color: '#000' }}>Collections Status</Text>
                    <Ionicons name='chevron-forward' size={24} color="black" />
                  </View>
                </View>
              </TouchableOpacity>
              <TouchableOpacity style={{ width: '100%', paddingHorizontal: 10, paddingVertical: 15 }}>
                <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
                  <View style={{ width: 35, height: 35, borderRadius: 8, backgroundColor: '#000', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>

                    <MaterialIcons name="grid-view" size={20} color="#fff" />
                  </View>
                  <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                    <Text style={{ fontSize: 16, fontFamily: 'Montserrat', color: '#000' }}>Views Blocked Users</Text>
                    <Ionicons name='chevron-forward' size={24} color="black" />
                  </View>
                </View>
              </TouchableOpacity>
              <TouchableOpacity style={{ width: '100%', paddingHorizontal: 10, paddingVertical: 15 }}>
                <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
                  <View style={{ width: 35, height: 35, borderRadius: 8, backgroundColor: '#feb149', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                    <AntDesign name="edit" size={20} color="#fff" />
                  </View>
                  <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                    <Text style={{ fontSize: 16, fontFamily: 'Montserrat', color: '#000' }}>Expert replies</Text>
                    <Ionicons name='chevron-forward' size={24} color="black" />
                  </View>
                </View>
              </TouchableOpacity>
              <TouchableOpacity style={{ width: '100%', paddingHorizontal: 10, paddingVertical: 15 }}>
                <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
                  <View style={{ width: 35, height: 35, borderRadius: 8, backgroundColor: '#ae49fe', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>

                    <MaterialIcons name="preview" size={20} color="#fff" />
                  </View>
                  <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                    <Text style={{ fontSize: 16, fontFamily: 'Montserrat', color: '#000' }}>Review Ratings</Text>
                    <Ionicons name='chevron-forward' size={24} color="black" />
                  </View>
                </View>
              </TouchableOpacity>
              <TouchableOpacity style={{ width: '100%', paddingHorizontal: 10, paddingVertical: 15 }}>
                <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
                  <View style={{ width: 35, height: 35, borderRadius: 8, backgroundColor: '#370ca9', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                    <AntDesign name="setting" size={20} color="#fff" />
                  </View>
                  <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                    <Text style={{ fontSize: 16, fontFamily: 'Montserrat', color: '#000' }}>Settings</Text>
                    <Ionicons name='chevron-forward' size={24} color="black" />
                  </View>
                </View>
              </TouchableOpacity>
              <TouchableOpacity
                style={{ width: '100%', paddingHorizontal: 10, paddingVertical: 15 }}
                onPress={isLoggedIn ? handleLogout : handleLogin}
              >
                <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
                  <View
                    style={{
                      width: 35,
                      height: 35,
                      borderRadius: 8,
                      backgroundColor: isLoggedIn ? '#facb1d' : '#1d72fa',
                      flexDirection: 'column',
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}
                  >
                    <FontAwesome name={isLoggedIn ? 'sign-out' : 'sign-in'} size={20} color="#fff" />
                  </View>
                  <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                    <Text style={{ fontSize: 16, fontFamily: 'Montserrat', color: '#000' }}>
                      {isLoggedIn ? 'Logout' : 'Login'}
                    </Text>
                    <Ionicons name='chevron-forward' size={24} color="black" />
                  </View>
                </View>
              </TouchableOpacity>
            </View>
          </View>

          {/* end body */}

        </View>
      </ScrollView>

    </View>
  )
}

export default MyAccountScreen