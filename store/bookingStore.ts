import { create } from "zustand";

interface Room {
  idRoom: string;
  name: string;
  price: number;
  area: number;
  avatar: string;
  description: string;
  roomImageSet: any;
  roomType: {
    idRoomType: string;
    price: number;
    type: string;
    utilities: string;
  };
  yachtId: string;
}

interface ServiceStore {
  scheduleChoose: any | null;
  setScheduleChoose: (schedule: any | null) => void;
  idYacht: any | null;
  setIdYacht: (idYacht: any | null) => void;
  roomChoose: Room[] | null;
  setRoomChoose: (room: Room) => void;
  clearRoomChoose: () => void;
  clearScheduleChoose: () => void;
}
export const useServiceStore = create<ServiceStore>((set, get) => ({
  scheduleChoose: null,
  setScheduleChoose: (data) => set({ scheduleChoose: data }),
  idYacht: null,
  setIdYacht: (data) => set({ idYacht: data }),
  roomChoose: [], // Đảm bảo khởi tạo là một mảng rỗng
  setRoomChoose: (room) => {
    const currentRooms = get().roomChoose; // Lấy danh sách phòng hiện tại
    const isSelected = currentRooms?.some((r) => r.idRoom === room.idRoom);

    set({
      roomChoose: isSelected
        ? currentRooms?.filter((r) => r.idRoom !== room.idRoom) // Nếu đã có thì xóa
        : [...currentRooms, room], // Nếu chưa có thì thêm vào danh sách
    });
  },
  clearRoomChoose: () => set({ roomChoose: [] }),
  clearScheduleChoose: () => set({ scheduleChoose: null }),
}));
