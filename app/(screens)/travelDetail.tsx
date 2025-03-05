import {
  View,
  Text,
  Image,
  useWindowDimensions,
  TouchableOpacity,
  ScrollView,
  Modal,
  StyleSheet,
  Dimensions,
} from "react-native";
import React, { useEffect, useMemo, useState } from "react";
import Svg, { Path } from "react-native-svg";
import {
  AntDesign,
  Entypo,
  MaterialIcons,
  Fontisto,
  FontAwesome,
  Ionicons,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import Constants from "expo-constants";
import { useLocalSearchParams, useRouter } from "expo-router";
import {
  findRoomByYachtId,
  findYachtById,
  getScheduleByYacht,
  getServiceByYacht,
} from "@/service/ApiService";
import moment from "moment";
import "moment/locale/vi";
import { useServiceStore } from "@/store/bookingStore";

moment.locale("vi");
const TravelDetailScreen = () => {
  const router = useRouter();
  const { width, height } = useWindowDimensions();
  const { idYacht } = useLocalSearchParams();
  const [yacht, setYacht] = useState([]);
  const [room, setRoom] = useState();
  const [service, setService] = useState();
  const [schedule, setSchedule] = useState();
  const screenHeight = Dimensions.get("window").height;
  const modalHeight = (2 / 3) * screenHeight;
  const formatDate = (date: string) => {
    const formattedDate = moment(date).format("dddd, D [tháng] M YYYY");
    return formattedDate.charAt(0).toUpperCase() + formattedDate.slice(1);
  };
  const { scheduleChoose, setScheduleChoose, setIdYacht } = useServiceStore();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await findYachtById(idYacht);
        const responseRoom = await findRoomByYachtId(idYacht);
        const responseService = await getServiceByYacht(idYacht);
        const responseSchedule = await getScheduleByYacht(idYacht);
        setSchedule(responseSchedule.data);
        console.log(responseSchedule.data);
        setRoom(responseRoom.data.data);
        setYacht(response.data.data);
        setService(responseService.data.data);
      } catch (error) {
        console.error("Error fetching yachts:", error);
      }
    };

    fetchData();
  }, []);

  const maxVisible = 4;
  const visibleRooms = room?.slice(0, maxVisible - 1);
  const remainingCount = room?.length - (maxVisible - 1);
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalOrderVisible, setModalOrderVisible] = useState(false);
  const openModal = () => {
    setModalVisible(!modalVisible);
  };

  const [checkedServices, setCheckedServices] = useState<{
    [key: string]: number;
  }>({});
  const [selectedRooms, setSelectedRooms] = useState([]);

  const closeModal = () => {
    setSelectedRooms([]);
    setModalVisible(!modalVisible);
  };
  const navigateInModal = () => {
    setModalVisible(!modalVisible);
    setIdYacht(idYacht);
    router.push("/findRoom");
  };
  const getRoomQuantity = (roomId: any) => {
    const room = selectedRooms.find((r) => r.roomId === roomId);
    return room ? room.quantity : 0;
  };
  const total = useMemo(() => {
    const totalRooms = selectedRooms?.reduce(
      (sum, room) => sum + room.totalPrice,
      0
    );

    const totalServices = Object.values(checkedServices).reduce(
      (sum, price) => sum + price,
      0
    );

    return totalRooms + totalServices;
  }, [selectedRooms, checkedServices]);
  const formattedRooms = selectedRooms.flatMap(
    ({ roomId, quantity, totalPrice }) =>
      Array(quantity).fill({
        roomId,
        quantity: 1,
        totalPrice: totalPrice / quantity,
      })
  );

  return (
    <ScrollView
      style={{
        height: "100%",
        backgroundColor: "#fff",
        position: "relative",
      }}
      contentContainerStyle={{ flex: 1 }}
    >
      <View
        style={{
          flex: 1,
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <View style={{ flex: 1 }}>
          {/* header */}
          <View
            style={{
              width: "100%",
              height: height / 3 + 80,
              position: "relative",
            }}
          >
            {/* header */}
            <View
              style={{
                width: "100%",
                paddingTop: Constants.statusBarHeight,
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                paddingHorizontal: 20,
                paddingVertical: 10,
                position: "relative",
                zIndex: 200,
              }}
            >
              <TouchableOpacity onPress={() => router.back()}>
                <AntDesign name="arrowleft" size={35} color="white" />
              </TouchableOpacity>

              <TouchableOpacity>
                <View
                  style={{
                    width: 35,
                    height: 35,
                    borderRadius: 20,
                    flexDirection: "row",
                    justifyContent: "center",
                    alignItems: "center",
                    backgroundColor: "#ee5a06",
                  }}
                >
                  <Fontisto name="favorite" size={20} color="#fff" />
                </View>
              </TouchableOpacity>
            </View>

            <Image
              source={{ uri: yacht?.image }}
              style={{
                width: "100%",
                height: "100%",
                borderBottomLeftRadius: 50,
                position: "absolute",
                top: 0,
              }}
            />

            <View
              style={{
                position: "absolute",
                height: 150,
                top: 280,
                left: 0,
                backgroundColor: "transparent",
              }}
            >
              <Svg width={`${width}`} height={150} fill="none">
                <Path
                  d={`M 0 0 C 20 40 40 40 60 40 L ${width - 60} 40 C ${
                    width - 40
                  } 40 ${width - 20} 40 ${width} 80
                    L ${width} 150 C ${width - 20} 110 ${width - 40} 110 ${
                    width - 60
                  } 110 
                    L 60 110 C 40 110 20 110 0 80
                    `}
                  fill="#fcfaec"
                  stroke={"transparent"}
                  strokeWidth={0}
                />
              </Svg>
            </View>
            <View style={{ position: "absolute", top: 250, left: 30 }}>
              <Text style={{ fontWeight: 600, fontSize: 25, color: "#FFF" }}>
                {yacht?.name}
              </Text>
            </View>
            <View
              style={{ paddingHorizontal: 20, position: "absolute", bottom: 0 }}
            >
              <View
                style={{ flexDirection: "row", alignItems: "center", gap: 20 }}
              >
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <AntDesign name="star" size={20} color="#eebd06" />
                  <Text
                    style={{ fontWeight: 500, fontSize: 17, paddingLeft: 10 }}
                  >
                    {yacht?.yachtType?.starRanking}
                  </Text>
                </View>
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <AntDesign name="eye" size={20} color="#ee5a06" />
                  <Text
                    style={{ fontWeight: 500, fontSize: 17, paddingLeft: 10 }}
                  >
                    120 Views
                  </Text>
                </View>
              </View>
            </View>
          </View>
          {/* content */}
          <View style={{ width: "100%", flex: 1, paddingHorizontal: 20 }}>
            <View style={{ paddingTop: 50 }}>
              <Text
                style={{
                  fontWeight: 500,
                  fontSize: 25,
                  color: "#2e2e2e",
                  paddingBottom: 10,
                }}
              >
                About
              </Text>
              <View>
                <Text
                  style={{ fontSize: 16, color: "#545454", lineHeight: 27 }}
                >
                  {yacht?.description}
                </Text>
              </View>
            </View>
            <View style={{ paddingTop: 10 }}>
              <Text
                style={{
                  fontWeight: 500,
                  fontSize: 25,
                  color: "#2e2e2e",
                  paddingBottom: 10,
                }}
              >
                Gallery
              </Text>
              <View
                style={{
                  flexDirection: "row",
                  gap: 10,
                  justifyContent: "flex-start",
                  marginTop: 5,
                }}
              >
                {visibleRooms?.map((item) => (
                  <View key={item.idRoom}>
                    <Image
                      source={{ uri: item?.avatar }}
                      style={{ width: 80, height: 80, borderRadius: 15 }}
                    />
                  </View>
                ))}

                {remainingCount > 0 && (
                  <View style={{ position: "relative" }}>
                    <Image
                      source={{ uri: room[maxVisible - 1]?.avatar }}
                      style={{
                        width: 80,
                        height: 80,
                        borderRadius: 15,
                        opacity: 0.5,
                      }}
                    />
                    <View
                      style={{
                        position: "absolute",
                        width: "100%",
                        height: "100%",
                        backgroundColor: "rgba(0, 0, 0, 0.5)",
                        justifyContent: "center",
                        alignItems: "center",
                        borderRadius: 15,
                      }}
                    >
                      <Text
                        style={{
                          color: "white",
                          fontSize: 20,
                          fontWeight: "bold",
                        }}
                      >
                        +{remainingCount}
                      </Text>
                    </View>
                  </View>
                )}
              </View>
            </View>
          </View>
        </View>

        {/* footer */}
        <View
          style={{
            width: "100%",
            paddingBottom: 20,
          }}
        >
          <View
            style={{
              flexDirection: "row",
              justifyContent: "flex-end",
              alignItems: "center",
              paddingHorizontal: 20,
              paddingVertical: 10,
            }}
          >
            <TouchableOpacity onPress={openModal}>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  gap: 5,
                  backgroundColor: "#ee5a06",
                  padding: 10,
                  borderRadius: 20,
                  paddingHorizontal: 20,
                }}
              >
                <FontAwesome name="send" size={24} color="white" />
                <Text
                  style={{
                    fontWeight: 600,
                    fontSize: 20,
                    color: "white",
                    paddingLeft: 10,
                  }}
                >
                  Find a room
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={[styles.modalContent, { maxHeight: modalHeight }]}>
            <Text style={styles.modalTitle}>Lên kế hoạch</Text>
            <ScrollView showsVerticalScrollIndicator={false}>
              <View style={{ flexDirection: "column", gap: 5 }}>
                <View
                  style={{ flexDirection: "row", alignItems: "center", gap: 5 }}
                >
                  <Fontisto name="date" size={18} color="black" />
                  <Text style={{ fontWeight: "600" }}>Ngày khởi hành</Text>
                </View>
                <View>
                  {schedule?.map((item) => {
                    const isSelected =
                      scheduleChoose?.idSchedule === item.idSchedule;

                    return (
                      <TouchableOpacity
                        key={item.idSchedule}
                        onPress={() =>
                          setScheduleChoose(isSelected ? null : item)
                        }
                        style={{
                          flexDirection: "row",
                          alignItems: "center",
                          justifyContent: "space-between",
                          padding: 10,
                          backgroundColor: isSelected ? "#ee9a7a" : "#fff",
                          borderRadius: 10,
                          marginVertical: 5,
                          borderWidth: 1,
                          borderColor: isSelected ? "#ee9a7a" : "#ccc",
                        }}
                      >
                        <Text
                          style={{
                            color: isSelected ? "white" : "black",
                            fontWeight: isSelected ? "bold" : "normal",
                          }}
                        >
                          {formatDate(item.startDate)}
                        </Text>
                        <Text
                          style={{
                            color: isSelected ? "white" : "black",
                            fontWeight: isSelected ? "bold" : "normal",
                          }}
                        >
                          {formatDate(item.endDate)}
                        </Text>
                      </TouchableOpacity>
                    );
                  })}
                </View>
              </View>
            </ScrollView>
            <View style={{ flexDirection: "row", gap: 10 }}>
              <TouchableOpacity onPress={closeModal} style={styles.closeButton}>
                <Text style={styles.closeButtonText}>Đóng</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={navigateInModal}
                style={styles.acceptButton}
              >
                <Text style={styles.acceptButtonText}>Đồng ý</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </ScrollView>
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
  roomItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 10,
    flex: 1,
    gap: 20,
  },
  roomImage: {
    width: 60,
    height: 60,
    borderRadius: 10,
  },
  roomText: {
    fontSize: 16,
    fontWeight: "bold",
  },
  quantityControl: {
    flexDirection: "row",
    alignItems: "center",
    borderColor: "red",
  },
  quantityButton: {
    width: 20,
    height: 20,
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
  },
  quantityText: {
    fontSize: 17,
    fontWeight: "bold",
  },
  quantityNumber: {
    fontSize: 16,
    marginHorizontal: 10,
  },
  closeButton: {
    marginTop: 10,
    borderWidth: 1,
    borderColor: "#FF5733",
    paddingVertical: 10,
    borderRadius: 10,
    alignItems: "center",

    flex: 1,
  },
  acceptButton: {
    marginTop: 10,
    backgroundColor: "#FF5733",
    paddingVertical: 10,
    borderRadius: 10,
    alignItems: "center",
    flex: 1,
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
export default TravelDetailScreen;
