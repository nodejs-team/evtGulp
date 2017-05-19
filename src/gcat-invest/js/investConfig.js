/**
 * Created by mcake on 2016/11/14.
 */

var investConfig = [
    {
        title: "饮食习惯",
        titleIcon: "icons-1",
        pageClass: "sec-first",
        pageIndex: 1,
        questions: [
            {
                "questionCode": "1.1",
                "questionId": "10005558",
                "itemValue": null,
                "icon": "icons-2",
                "title": "您的饮食规律是什么?",
                "answers": ["三餐不定", "三餐规律"]
            },
            {
                "questionCode": "1.2",
                "questionId": "10005559",
                "itemValue": null,
                "icon": "icons-3",
                "title": "您荤素搭配么?",
                "answers": ["都吃", "不爱吃荤菜", "不爱吃素菜", "不爱吃水果"]
            },
            {
                "questionCode": "2.1",
                "questionId": "10005560",
                "itemValue": null,
                "icon": "icons-4",
                "title": "您吃早餐么?",
                "answers": ["基本每天都吃", "不常吃早餐"]
            },
            {
                "questionCode": "2.2",
                "questionId": "10005561",
                "itemValue": null,
                "icon": "icons-5",
                "title": "每天平均喝水量是?",
                "answers": ["两杯以上", "2-8杯", "8杯以上"]
            },
            {
                "questionCode": "3.1",
                "questionId": "10005562",
                "itemValue": null,
                "icon": "icons-6",
                "title": "喜欢油炸或重油炒菜类?",
                "answers": ["是", "偶尔吃", "否"]
            },
            {
                "questionCode": "3.2",
                "questionId": "10005563",
                "itemValue": null,
                "icon": "icons-7",
                "title": "喜欢吃咸、腌制类食物?",
                "answers": ["是", "偶尔吃", "否"]
            },
            {
                "questionCode": "4.1",
                "questionId": "10005564",
                "itemValue": null,
                "icon": "icons-9",
                "title": "你有牙疼、牙龈肿痛等牙齿健康问题?",
                "answers": ["是", "偶尔吃", "否"]
            }
        ]
    },

    {
        title: "生活习惯",
        titleIcon: "icons-10",
        pageClass: "sec-second",
        pageIndex: 2,
        questions: [
            {
                "questionCode": "5.1",
                "questionId": "10005565",
                "itemValue": null,
                "icon": "icons-25",
                "title": "近半年抽烟频次?",
                "answers": ["不抽", "偶尔抽(3天1支)", "每天1包以内", "不限量"]
            },
            {
                "questionCode": "5.2",
                "questionId": "10005566",
                "itemValue": null,
                "icon": "icons-26",
                "title": "近半年的喝酒习惯?",
                "answers": ["不喝", "偶尔喝(每周1次)", "每顿1两以内", "不限量"]
            },
            {
                "questionCode": "6.1",
                "questionId": "10005567",
                "itemValue": null,
                "icon": "icons-13",
                "title": "您经常熬夜吗?",
                "answers": ["基本规律入睡(12点前)", "经常12点以后睡觉"]
            },
            {
                "questionCode": "6.2",
                "questionId": "10005568",
                "itemValue": null,
                "icon": "icons-14",
                "title": "您睡觉打呼噜吗?",
                "answers": ["不大呼噜", "偶尔累了打呼噜","每天打呼噜","不知道"]
            },
            {
                "questionCode": "7.1",
                "questionId": "10005569",
                "itemValue": null,
                "icon": "icons-11",
                "title": "你有运动习惯吗?",
                "answers": ["基本不运动", "1周1次","1周3次","每天运动"]
            },
            {
                "questionCode": "7.2",
                "questionId": "10005570",
                "itemValue": null,
                "icon": "icons-12",
                "title": "排便几天一次?",
                "answers": ["每天1次", "2天一次","不规律有便秘"]
            }
        ]
    },

    {
        title: "生活感受",
        titleIcon: "icons-16",
        pageClass: "sec-third",
        pageIndex: 3,
        questions: [
            {
                "questionCode": "8.1",
                "questionId": "10005571",
                "itemValue": null,
                "icon": "icons-15",
                "title": "您喜欢现在的生活吗?",
                "answers": ["喜欢", "凑合","难以忍受"]
            }
        ]
    },

    {
        title: "基本信息",
        titleIcon: "icons-17",
        pageClass: "sec-fourth",
        pageIndex: 4,
        lastPage: true,
        questions: [
            {
                "questionCode": "9.1",
                "questionId": "10005572",
                "itemValue": null,
                "title": "你喜欢现在的生活吗?",
                "grid": true,
                "plain": true,
                "answers": [{
                    icon: "icons-18",
                    text: "我是汉子<br>I AM A BOY",
                    value: "M",
                    theme: "gray",
                    gridClassName: "active"
                },{
                    icon: "icons-19",
                    text: "我是妹子<br>I AM A GIRL",
                    value: "F",
                    theme: "gray"
                }]
            },
            {
                "questionCode": "10.1",
                "questionId": "10005573",
                "itemValue": null,
                "title": "你喜欢现在的生活吗?",
                "grid": true,
                "answers": [{
                    icon: "icons-20",
                    text: "正常",
                    value: "1",
                    theme: "gray",
                    gridClassName: "grid-item-block active"
                },{
                    icon: "icons-21",
                    text: "偏长型",
                    value: "2",
                    theme: "gray-circle",
                    gridClassName: "grid-item-far"
                },{
                    icon: "icons-22",
                    text: "全身肥胖型",
                    value: "3",
                    theme: "gray-circle",
                    gridClassName: "grid-item-far"
                },{
                    icon: "icons-23",
                    text: "下半身肥胖型",
                    value: "4",
                    theme: "gray-circle",
                    gridClassName: "grid-item-near"
                },{
                    icon: "icons-24",
                    text: "腹部肥胖型",
                    value: "5",
                    theme: "gray-circle",
                    gridClassName: "grid-item-near"
                }]
            },
            {
                "questionCode": "11.1",
                "questionId": "10005574",
                "itemValue": "1985-01-01",
                "title": "您的生日是?",
                "datetime": true
            },
            {
                "questionCode": "11.2",
                "questionId": "10005575",
                "itemValue": null,
                "title": "您的身高是?",
                "label": "厘米"
            },
            {
                "questionCode": "11.3",
                "questionId": "10005576",
                "itemValue": null,
                "title": "您的体重是?",
                "label": "公斤"
            }
        ]
    }
];