import { useRouter } from "expo-router";
import React, { useEffect } from "react";
import { Image, Text, View } from "react-native";

const OrderSuccess = () => {
  const router = useRouter();
  useEffect(() => {
    const timer = setTimeout(() => {
      router.push("/(tabs)"); // Thay "TabHome" bằng tên tab bạn muốn chuyển đến
    }, 3000);

    return () => clearTimeout(timer); // Dọn dẹp timeout khi component unmount
  }, []);
  return (
    <View
      style={{
        backgroundColor: "white",
        flex: 1,
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
        gap: 20,
      }}
    >
      <Image
        style={{ height: 200, width: 300 }}
        source={require("../../assets/images/logo_swp.png")}
      />
      <Text
        style={{
          fontSize: 12,
          fontWeight: 600,
          //   position: "absolute",
          //   bottom: 50,
          textAlign: "center",
          paddingHorizontal: 50,
        }}
      >
        Chúc mừng quý khách đã đặt yacht thành công! 🎉 Chúng tôi sẽ sớm liên hệ
        để xác nhận thông tin. Vui lòng kiểm tra email hoặc điện thoại để nhận
        cập nhật. Chúc quý khách có một chuyến đi tuyệt vời!
      </Text>
    </View>
  );
};

export default OrderSuccess;
