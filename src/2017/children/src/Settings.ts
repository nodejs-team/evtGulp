class Settings {
    static score: number = 0;
    static bestScore: number = 0;

    static elementCounts:number = 5;
    static luckerIndex: number = 6;
    static runningCount: number = 5;
    static obstacleMap: Object = {
        1: -1, //积水，减命
        2: -1, //路牌，减命
        3: 1, //能量包，加速
        4: 0, //水杯，加命
        5: 0, //大餐，加命
    };
}