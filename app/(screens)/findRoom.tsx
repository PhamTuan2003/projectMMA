import React, { useEffect, useMemo, useState } from "react";
import {
  Dimensions,
  Image,
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

import {
  EvilIcons,
  AntDesign,
  Entypo,
  MaterialIcons,
  Fontisto,
  FontAwesome,
  Ionicons,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import { useRouter } from "expo-router";
import moment from "moment";
import "moment/locale/vi";
import { useServiceStore } from "@/store/bookingStore";
import {
  bookingRoom,
  bookingRoomOrder,
  findRoomByYachtId,
  findYachtById,
  getIdCustomer,
  getScheduleByYacht,
  getServiceByYacht,
} from "@/service/ApiService";
import AsyncStorage from "@react-native-async-storage/async-storage";

moment.locale("vi");
const FindRoom = () => {
  const screenHeight = Dimensions.get("window").height;
  const modalHeight = (2 / 3) * screenHeight;
  const {
    scheduleChoose,
    idYacht,
    setRoomChoose,
    roomChoose,
    clearRoomChoose,
    clearScheduleChoose,
  } = useServiceStore();
  const router = useRouter();
  const formatDate = (date: string) => {
    const formattedDate = moment(date).format("dddd, D [tháng] M YYYY");
    return formattedDate.charAt(0).toUpperCase() + formattedDate.slice(1);
  };
  const [yacht, setYacht] = useState([]);
  const [room, setRoom] = useState();
  const [service, setService] = useState();
  const [schedule, setSchedule] = useState();
  const [customerId, setCustomerId] = useState<any | null>();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await findYachtById(idYacht);
        const responseRoom = await findRoomByYachtId(idYacht);
        const responseService = await getServiceByYacht(idYacht);
        const responseSchedule = await getScheduleByYacht(idYacht);
        const accountId = await AsyncStorage.getItem("idAccount");
        const customerId = await getIdCustomer(accountId);

        setSchedule(responseSchedule.data);
        setCustomerId(customerId.data.data);
        setRoom(responseRoom.data.data);
        setYacht(response.data.data);
        setService(responseService.data.data);
        console.log(customerId.data.data);
      } catch (error) {
        console.error("Error fetching yachts:", error);
      }
    };

    fetchData();
  }, []);
  const toggleRoomSelection = (room: any) => {
    setRoomChoose(room);
  };
  const totalPrice =
    roomChoose?.reduce((sum, room) => sum + (room.roomType?.price ?? 0), 0) ??
    0;
  const [modalOrderVisible, setModalOrderVisible] = useState(false);
  const goBack = () => {
    router.back();
    clearRoomChoose();
    clearScheduleChoose();
  };
  const openModal = () => {
    setModalOrderVisible(!modalOrderVisible);
  };
  const closeModal = () => {
    setModalOrderVisible(false);
  };
  const [checkedServices, setCheckedServices] = useState<{
    [key: string]: number;
  }>({});
  const toggleChecked = (idService: string, price: number) => {
    setCheckedServices((prev) => {
      const newCheckedServices = { ...prev };

      if (newCheckedServices[idService]) {
        delete newCheckedServices[idService];
      } else {
        newCheckedServices[idService] = price;
      }

      return newCheckedServices;
    });
  };
  const [formData, setFormData] = useState({
    requirement: "",
    amount: 0,
    scheduleId: scheduleChoose?.idSchedule,
    customerId: customerId,
    roomIds: [],
    serviceIds: [],
    yachtId: idYacht,
  });
  const total = useMemo(() => {
    const totalRooms = roomChoose?.reduce(
      (sum, room) => sum + room.roomType.price,
      0
    );

    const totalServices = Object.values(checkedServices).reduce(
      (sum, price) => sum + price,
      0
    );

    return totalRooms + totalServices;
  }, [roomChoose, checkedServices]);
  const handleChange = (name: string, value: string) => {
    setFormData((prevState) => ({ ...prevState, [name]: value }));
  };
  const handleBooking = async () => {
    const token = await AsyncStorage.getItem("token");
    console.log("Token trước khi gửi request:", token);

    const data = {
      ...formData,
      amount: Number(total),
      roomIds: roomChoose?.map((room) => room.idRoom) || [],
      serviceIds: Object.keys(checkedServices),
      customerId: customerId || "",
    };
    console.log(data);
    try {
      await bookingRoomOrder(data);
      console.log(data);
      clearRoomChoose();
      clearScheduleChoose();
      router.push("/orderSuccess");
    } catch (error) {
      console.error("Error booking room:", error);
      console.error(
        "API Response:",
        error.response?.data || "No response data"
      );
    }
  };
  const closeModalBooking = () => {
    setModalOrderVisible(false);
    setCheckedServices({});
  };
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "space-between",
        backgroundColor: "white",
      }}
    >
      <View
        style={{
          height: 60,
          borderBottomWidth: 1,
          borderColor: "#cbcbcb",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
          position: "relative",
        }}
      >
        <TouchableOpacity
          onPress={goBack}
          style={{ position: "absolute", top: 30, left: 10 }}
        >
          <MaterialIcons name="arrow-back" size={18} color="black" />
        </TouchableOpacity>

        <Text style={{ fontWeight: "600", fontSize: 18, marginTop: 15 }}>
          Lựa chọn phòng
        </Text>
      </View>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          paddingHorizontal: 10,
          marginVertical: 10,
        }}
      >
        <View style={{ flexDirection: "row", alignItems: "center", gap: 5 }}>
          <Fontisto name="date" size={18} color="black" />
          <Text style={{ fontWeight: "600" }}>Ngày khởi hành</Text>
        </View>
        <Text>{formatDate(scheduleChoose?.startDate)}</Text>
      </View>
      <ScrollView style={{ margin: 10, flexDirection: "column", gap: 10 }}>
        <View style={{ flexDirection: "column", gap: 8 }}>
          {room?.map((item) => {
            return (
              <View
                key={item.idRoom}
                style={{
                  flexDirection: "column",
                  borderWidth: 1,
                  borderColor: "#cbcbcb",
                  borderRadius: 10,
                }}
              >
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                  }}
                >
                  <View
                    style={{
                      flexDirection: "column",
                      flex: 1,
                      paddingTop: 7,
                      paddingLeft: 7,
                      paddingRight: 7,
                      justifyContent: "space-between",
                    }}
                  >
                    <View>
                      <Text style={{ fontWeight: "600" }}>{item?.name}</Text>
                      <View
                        style={{
                          flexDirection: "row",
                          alignItems: "center",
                          gap: 5,
                        }}
                      >
                        <Ionicons name="bed" size={12} color={"gray"} />
                        <Text style={{ fontSize: 12, color: "gray" }}>
                          {item.area} m²
                        </Text>
                      </View>
                    </View>
                    <View
                      style={{
                        marginTop: 8,
                        borderBottomWidth: 1,
                        borderColor: "#cbcbcb",
                        paddingBottom: 7,
                      }}
                    >
                      <Text
                        style={{
                          fontSize: 13,
                          color: "#3569cb",
                          fontWeight: "600",
                        }}
                      >
                        Các dịch vụ bao gồm:
                      </Text>
                      <View>
                        {item.roomType?.utilities
                          ?.split(",")
                          .map((util, index) => (
                            <Text key={index} style={{ fontSize: 12 }}>
                              • {util.trim()}
                            </Text>
                          ))}
                      </View>
                    </View>
                  </View>
                  <Image
                    style={{ height: "100%", width: 100, borderRadius: 5 }}
                    source={{ uri: item?.avatar }}
                  />
                </View>

                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                    backgroundColor: roomChoose?.some(
                      (r) => r.idRoom === item.idRoom
                    )
                      ? "#d4f5ff"
                      : "#fff",
                    margin: 7,
                    padding: 7,
                    borderRadius: 5,
                  }}
                >
                  <View style={{ flexDirection: "column" }}>
                    <Text style={{ fontSize: 12, color: "gray" }}>Giá</Text>
                    <Text
                      style={{
                        fontWeight: "600",
                        fontSize: 14,
                        color: "#ff6a00",
                      }}
                    >
                      {new Intl.NumberFormat("vi-VN", {
                        style: "currency",
                        currency: "VND",
                      }).format(item.roomType.price)}
                    </Text>
                  </View>
                  <TouchableOpacity onPress={() => toggleRoomSelection(item)}>
                    <Text
                      style={{
                        fontWeight: "700",
                        fontSize: 13,
                        color: "#00a6ff",
                      }}
                    >
                      {roomChoose?.some((r) => r.idRoom === item.idRoom)
                        ? "Bỏ chọn"
                        : "Chọn"}
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            );
          })}
        </View>
      </ScrollView>

      <View
        style={{
          height: 70,
          flexDirection: "row",
          justifyContent: "space-between",
          backgroundColor: "#fff",
          padding: 10,
          borderRadius: 5,
          shadowColor: "#000",
          shadowOffset: { width: 0, height: -5 },
          shadowOpacity: 1.2,
          shadowRadius: 1,
          elevation: 15,
          alignItems: "center",
        }}
      >
        <View>
          <Text style={{ fontSize: 13, color: "gray" }}>Giá</Text>
          <Text style={{ color: "#ff6a00", fontWeight: "600", fontSize: 15 }}>
            {new Intl.NumberFormat("vi-VN", {
              style: "currency",
              currency: "VND",
            }).format(totalPrice)}
          </Text>
        </View>
        <View>
          <TouchableOpacity
            onPress={openModal}
            style={{
              paddingHorizontal: 20,
              backgroundColor: "#ee5a06",
              paddingVertical: 5,
              borderRadius: 5,
            }}
          >
            <Text style={{ color: "white", fontWeight: 500 }}>Dặt phòng</Text>
          </TouchableOpacity>
        </View>
      </View>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalOrderVisible}
        onRequestClose={() => setModalOrderVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={[styles.modalContent, { maxHeight: modalHeight }]}>
            <View style={{ position: "relative" }}>
              <TouchableOpacity
                onPress={closeModalBooking}
                style={{ position: "absolute", top: 5, zIndex: 99 }}
              >
                <EvilIcons name="close" size={24} color="black" />
              </TouchableOpacity>

              <Text style={styles.modalTitle}>Đặt du thuyền</Text>
            </View>

            <ScrollView showsVerticalScrollIndicator={false}>
              <View style={{ flexDirection: "column", gap: 5 }}>
                {roomChoose?.map((item) => (
                  <View
                    key={item.idRoom}
                    style={{
                      flexDirection: "column",
                      borderWidth: 1,
                      borderColor: "#cbcbcb",
                      borderRadius: 10,
                    }}
                  >
                    <View
                      style={{
                        flexDirection: "row",
                        justifyContent: "space-between",
                        gap: 5,
                      }}
                    >
                      <View
                        style={{
                          flexDirection: "column",
                          flex: 1,
                          padding: 7,
                          justifyContent: "space-between",
                        }}
                      >
                        <View>
                          <Text style={{ fontWeight: "600" }}>
                            {item?.name}
                          </Text>
                          <View
                            style={{
                              flexDirection: "row",
                              alignItems: "center",
                              gap: 5,
                            }}
                          >
                            <Ionicons name="bed" size={12} color={"gray"} />
                            <Text style={{ fontSize: 12, color: "gray" }}>
                              {item.area} m²
                            </Text>
                          </View>
                        </View>
                      </View>
                      <View style={{ flexDirection: "column" }}>
                        <Text style={{ fontSize: 12, color: "gray" }}>Giá</Text>
                        <Text
                          style={{
                            fontWeight: "600",
                            fontSize: 14,
                            color: "#ff6a00",
                          }}
                        >
                          {new Intl.NumberFormat("vi-VN", {
                            style: "currency",
                            currency: "VND",
                          }).format(item.roomType.price)}
                        </Text>
                      </View>
                      <Image
                        style={{ height: "100%", width: 100, borderRadius: 5 }}
                        source={{ uri: item?.avatar }}
                      />
                    </View>
                  </View>
                ))}
              </View>
              <View style={{ paddingTop: 10 }}>
                <Text
                  style={{
                    fontWeight: 500,
                    fontSize: 17,
                    color: "#2e2e2e",
                    paddingBottom: 10,
                  }}
                >
                  Các dịch vụ bạn muốn thêm
                </Text>
                <View style={{ flexDirection: "column", gap: 3 }}>
                  {service?.map((item) => (
                    <View
                      key={item.idService}
                      style={{
                        flexDirection: "row",
                        justifyContent: "space-between",
                        alignItems: "center",
                        flex: 1,
                        gap: 10,
                      }}
                    >
                      <View
                        style={{
                          flexDirection: "row",
                          flex: 1,
                          justifyContent: "space-between",
                        }}
                      >
                        <View style={{ flexDirection: "row", gap: 5 }}>
                          <MaterialCommunityIcons
                            name="room-service-outline"
                            size={20}
                          />
                          <Text style={{ fontWeight: "500" }}>
                            {item.service}
                          </Text>
                        </View>

                        <Text
                          style={{
                            fontWeight: 500,
                            color: "#e85232",
                          }}
                        >
                          {new Intl.NumberFormat("vi-VN", {
                            style: "currency",
                            currency: "VND",
                          }).format(item.price)}
                        </Text>
                      </View>
                      <TouchableOpacity
                        onPress={() =>
                          toggleChecked(item.idService, item.price)
                        }
                      >
                        <MaterialCommunityIcons
                          name={
                            checkedServices[item.idService]
                              ? "checkbox-marked"
                              : "checkbox-blank-outline"
                          }
                          size={24}
                          color={
                            checkedServices[item.idService] ? "#e85232" : "gray"
                          }
                        />
                      </TouchableOpacity>
                    </View>
                  ))}
                </View>
              </View>
              <View style={{ paddingTop: 10 }}>
                <Text
                  style={{
                    fontWeight: 500,
                    fontSize: 17,
                    color: "#2e2e2e",
                    paddingBottom: 10,
                  }}
                >
                  Thông tin booking
                </Text>
                <View>
                  <TextInput
                    value={formData.requirement}
                    onChangeText={(text) => handleChange("requirement", text)}
                    placeholder="Yêu cầu của quý khách *"
                    placeholderTextColor={"gray"}
                    style={{
                      borderBottomWidth: 1,
                      borderColor: "#cbcbcb",
                      fontSize: 13,
                      textAlignVertical: "bottom",
                    }}
                    multiline={true}
                    numberOfLines={4}
                  />
                </View>
              </View>
            </ScrollView>
            <View style={{ flexDirection: "column", gap: 10, marginTop: 10 }}>
              <TouchableOpacity
                onPress={handleBooking}
                style={styles.acceptButton}
              >
                <Text style={styles.acceptButtonText}>Booking</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};
const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalContent: {
    backgroundColor: "white",
    padding: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    width: "100%",
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 10,
  },
  closeButton: {
    borderWidth: 1,
    borderColor: "#FF5733",
    paddingVertical: 5,
    borderRadius: 10,
    alignItems: "center",
  },
  acceptButton: {
    backgroundColor: "#FF5733",
    paddingVertical: 5,
    borderRadius: 10,
    alignItems: "center",
  },
  closeButtonText: {
    color: "#FF5733",
    fontSize: 16,
  },
  acceptButtonText: {
    color: "white",
    fontSize: 16,
  },
});
export default FindRoom;
