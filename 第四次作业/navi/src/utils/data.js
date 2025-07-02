// src/utils/data.js

const allRoomsData = [
  {
    id: 1,
    name: "大厅",
    rooms: [
      { id: 1, name: "大厅-1", img: "/Resources/lobby-1.jpg" },
      { id: 2, name: "大厅-2", img: "/Resources/lobby-2.jpg" }
    ]
  },
  {
    id: 2,
    name: "中庭",
    rooms: [
      { id: 1, name: "中庭-1", img: "/Resources/center-lobby-1.jpg" },
      { id: 2, name: "中庭-2", img: "/Resources/center-lobby-2.jpg" },
      { id: 3, name: "中庭-3", img: "/Resources/center-lobby-3.jpg" },
      { id: 4, name: "中庭-4", img: "/Resources/center-lobby-4.jpg" },
      { id: 5, name: "中庭-5", img: "/Resources/center-lobby-5.jpg" }
    ]
  },
  {
    id: 3,
    name: "休闲区",
    rooms: [
      { id: 1, name: "休闲区-1", img: "/Resources/playroom-1.jpg" },
      { id: 2, name: "休闲区-2", img: "/Resources/playroom-2.jpg" },
      { id: 3, name: "休闲区-3", img: "/Resources/activity-room-1.jpg" },
      { id: 4, name: "休闲区-4", img: "/Resources/activity-room-2.jpg" },
      { id: 5, name: "学习区", img: "/Resources/study.jpg" }
    ]
  },
  {
    id: 4,
    name: "户外风景",
    rooms: [
      { id: 1, name: "阳台-1", img: "/Resources/balcony-1.jpg" },
      { id: 2, name: "阳台-2", img: "/Resources/balcony-2.jpg" },
      { id: 3, name: "阳台-3", img: "/Resources/balcony-whole.jpg" }
    ]
  },
  {
    id: 5,
    name: "会议室",
    rooms: [
      { id: 1, name: "会议室-417", img: "/Resources/417.jpg" },
      { id: 2, name: "会议室-441", img: "/Resources/441.jpg" }
    ]
  },
  {
    id: 6,
    name: "办公室",
    rooms: [
      {
        id: 1,
        name: "教研室-410",
        img: "/Resources/410.jpg",
        teachers: [
          { id: 1, name: "王冬青" },
          { id: 2, name: "李江峰" },
          { id: 3, name: "夏波涌" },
          { id: 4, name: "张颖" }
        ]
      },
      {
        id: 2,
        name: "教研室-412",
        img: "/Resources/412.jpg",
        teachers: [
          { id: 1, name: "刘岩" },
          { id: 2, name: "张慧娟" },
          { id: 3, name: "孙萍" },
          { id: 4, name: "罗怡桂" }
        ]
      },
      {
        id: 3,
        name: "教务办公室-442L",
        img: "/Resources/442L.jpg",
        teachers: [
          { id: 1, name: "刘梦露" },
          { id: 2, name: "李慧敏" },
          { id: 3, name: "王彩霞" },
          { id: 4, name: "杨丹" },
          { id: 5, name: "姚仕仪" }
        ]
      },
      {
        id: 4,
        name: "学院办公室-442R",
        img: "/Resources/442R.jpg",
        teachers: [
          { id: 1, name: "闫鹏" },
          { id: 2, name: "张晶" },
          { id: 3, name: "林伊凡" },
          { id: 4, name: "钱银飞" },
          { id: 5, name: "王昊榕" },
          { id: 6, name: "俞晓静" }
        ]
      },
      {
        id: 5,
        name: "学生工作办公室-446",
        img: "/Resources/446.jpg",
        teachers: [
          { id: 1, name: "张砚秋" },
          { id: 2, name: "丁瑞庭" },
          { id: 3, name: "葛蕾" },
          { id: 4, name: "焦嘉欣" },
          { id: 5, name: "钟梦莹" },
          { id: 6, name: "陈璞皎" }
        ]
      },
      {
        id: 6,
        name: "副书记办公室-448-1",
        img: "/Resources/448-1.jpg",
        teachers: [{ id: 1, name: "陈荣" }]
      },
      {
        id: 7,
        name: "副书记办公室-448-2",
        img: "/Resources/448-2.jpg",
        teachers: [{ id: 1, name: "吴晓培" }]
      },
      {
        id: 8,
        name: "院务助理办公室-448-3",
        img: "/Resources/448-3.jpg",
        teachers: [{ id: 1, name: "宋井宽" }]
      },
      {
        id: 9,
        name: "党委书记办公室-450L",
        img: "/Resources/450L.jpg",
        teachers: [{ id: 1, name: "熊岚" }]
      },
      {
        id: 10,
        name: "院长办公室-450R",
        img: "/Resources/450R.jpg",
        teachers: [{ id: 1, name: "申恒涛" }]
      },
      {
        id: 11,
        name: "副院长办公室-451-1",
        img: "/Resources/451-1.jpg",
        teachers: [{ id: 1, name: "王成" }]
      },
      {
        id: 12,
        name: "副院长办公室-451-2",
        img: "/Resources/451-2.jpg",
        teachers: [{ id: 1, name: "何良华" }]
      },
      {
        id: 13,
        name: "副院长办公室-451-3",
        img: "/Resources/451-3.jpg",
        teachers: [{ id: 1, name: "张林" }]
      },
      {
        id: 14,
        name: "党委办公室-456",
        img: "/Resources/456.jpg",
        teachers: [
          { id: 1, name: "周微微" },
          { id: 2, name: "陆凤兰" },
          { id: 3, name: "赵清理" }
        ]
      },
      {
        id: 15,
        name: "实验中心-443",
        img: "/Resources/443.jpg",
        teachers: [
          { id: 1, name: "陈梁" },
          { id: 2, name: "杨旻" },
          { id: 3, name: "严海州" }
        ]
      }
    ]
  },
  {
    id: 7,
    name: "教室/实验室",
    rooms: [
      { id: 1, name: "研究生工作室-407", img: "/Resources/407.jpg", board_img: "/Resources/407-board.jpg" },
      { id: 2, name: "研究生工作室-408", img: "/Resources/408.jpg", board_img: "/Resources/408-board.jpg" },
      { id: 3, name: "研究生工作室-409", img: "/Resources/409.jpg", board_img: "/Resources/409-board.jpg" },
      { id: 4, name: "教学机房-416", img: "/Resources/416.jpg" },
      { id: 5, name: "研究生工作室-418", img: "/Resources/418.jpg", board_img: "/Resources/418-board.jpg" },
      { id: 6, name: "实验室-419", img: "/Resources/419.jpg", board_img: "/Resources/419-board.jpg" },
      { id: 7, name: "教学机房-426", img: "/Resources/426.jpg", board_img: "/Resources/426-board.jpg" },
      { id: 8, name: "教学机房-430", img: "/Resources/430.jpg", board_img: "/Resources/430-board.jpg" },
      { id: 9, name: "阶梯教室-434", img: "/Resources/434.jpg" }
    ]
  },
  {
    id: 8,
    name: "综合室",
    rooms: [
      { id: 1, name: "电梯处", img: "/Resources/elevator.jpg" },
      { id: 2, name: "打卡处-420", img: "/Resources/420.jpg" },
      { id: 3, name: "党员之家-432", img: "/Resources/432.jpg" },
      { id: 4, name: "档案室-444", img: "/Resources/444.jpg" }
    ]
  }
]

// 自动生成 pagerooms (移除 room_ 前缀)
export const pagerooms = allRoomsData.flatMap(group =>
  group.rooms.map(room => ({
    name: room.name,
    id: room.id, // 直接使用原始ID
    groupId: group.id
  }))
)

// 自动生成 pageteachers (移除 room_ 前缀)
export const pageteachers = allRoomsData.flatMap(group =>
  group.rooms.filter(room => room.teachers).flatMap(room =>
    room.teachers.map(teacher => ({
      id: teacher.id,
      name: teacher.name,
      roomId: room.id,    // 房间ID
      roomName: room.name, // 房间名称
      groupId: group.id,  // 组ID
      groupName: group.name // 组名称
    }))
  )
)

// 自动生成 pageroomdetail (使用纯数字ID作为键)
export const pageroomdetail = allRoomsData.reduce((acc, group) => {
  group.rooms.forEach(room => {
    // 使用 "groupId-roomId" 作为复合键
    const compositeKey = `${group.id}-${room.id}`;
    acc[compositeKey] = {
      name: room.name,
      description: `这里是${room.name}`,
      teachers: room.teachers?.map(t => t.name) || [],
      img: room.img,
      board_img: room.board_img,
      groupName: group.name,
      groupId: group.id,
      roomId: room.id  // 添加原始roomId
    }
  })
  return acc
}, {})

export { allRoomsData }

// utils.js 或 data.js 中
export function getGroupIdByRoomId(groupId, roomId) {
  const compositeKey = `${groupId}-${roomId}`;
  return pageroomdetail[compositeKey]?.groupId;
}