var Settings = (function () {
    function Settings() {
    }
    var d = __define,c=Settings,p=c.prototype;
    Settings.score = 0;
    Settings.bestScore = 0;
    Settings.elementCounts = 5;
    Settings.luckerIndex = 6;
    Settings.runningCount = 5;
    Settings.obstacleMap = {
        1: -1,
        2: -1,
        3: 1,
        4: 0,
        5: 0,
    };
    return Settings;
}());
egret.registerClass(Settings,'Settings');
