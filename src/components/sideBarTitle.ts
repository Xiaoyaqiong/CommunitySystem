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