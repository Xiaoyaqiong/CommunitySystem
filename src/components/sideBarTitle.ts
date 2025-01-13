export const sideBarTitle = [
    {
        title: "系统首页",
        icon: 'Odometer',
        index: '/dashboard',
        permiss:[0,1]
    },
    {
        title: "居民生活",
        icon: 'Calendar',
        index:1,
        permiss:[0,1],
        children: [
            {
                subtitle: "智能AI管家",
                icon: 'Umbrella',
                index:'/AITalk',
                permiss:[0,1]
            },
            {
                subtitle: "维护求助",
                icon: 'Phone',
                index:'/myhelp',
                permiss:[0,1]
            },
            {
                subtitle: "生活费用",
                icon: 'Stamp',
                index: '/fees',
                permiss:[0,1]
            },
            {
                subtitle: "小区停车场",
                index: '/parking',
                icon: 'Van',
                permiss:[0,1]
            }
        ]
    },
    {
        title: "小区公告消息",
        index: '/notice',
        icon: 'DocumentCopy',
        permiss:[0,1]
    },
    {
        title: "权限管理",
        icon: 'Warning',
        index:'/permiss',
        permiss:[0]
    },
    {
        title: "信息填写",
        icon: 'Setting',
        index: '/user',
        permiss: [0,1]
    },
]
export const permissData = [
  {
    label: "系统首页",
    permiss: "1",
  },

  {
    label: "停车场",
    permiss: "3",
    children: [
      {
        label: "修改费用",
        permiss: "17",
      },
      {
        label: "操作车辆",
        permiss: "20",
      },
    ],
  },
  {
    label: "求助管理",
    permiss: "8",
    children: [
      {
        label: "我要求助",
        permiss: "60",
      },
      {
        label: "操作求助",
        permiss: "61",
      },
    ],
  },
  {
    label: "生活费用",
    permiss: "4",
    children: [
      {
        label: "导入居民费用",
        permiss: "70",
      },
      {
        label: "下载导入模板",
        permiss: "73",
      },
      {
        label: "导出居民费用",
        permiss: "71",
      },
      {
        label: "删除数据",
        permiss: "72",
      },
    ],
  },
  {
    label: "AI管家",
    permiss: "5",
  },
  {
    label: "小区公告",
    permiss: "6",
    children: [
      {
        label: "创建公告",
        permiss: "31",
      },
      {
        label: "操作公告",
        permiss: "16",
      },
    ],
  },

  {
    label: "用户中心",
    permiss: "2",
  },
  {
    label: "权限管理",
    permiss: "18",
  },
];