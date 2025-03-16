const app = getApp()

Page({
    data: {
        isPlot: false, // 剧情
        
        adult: 0, // 成人
        child: 0, // 儿童
        player: 1, // 玩家
        
        // 成人子类目
        soldier: 0, // 士兵
        farmer: 0, // 农民

        food: 0, // 食物
        gun: 0, // 枪
    },

    onLoad() { // Awake
        let bgm = app.globalData.bgm;

        const savedVolume = wx.getStorageSync('volume');
        this.setData({
            volume: savedVolume || 100
        });

        if (!bgm) {
            app.globalData.bgm = wx.createInnerAudioContext();
            app.globalData.bgm.src = "/audio/WhenMustGun.wav";
            app.globalData.bgm.loop = true;
            app.globalData.bgm.play();
            app.globalData.bgm.volume = this.data.volume / 100;
        }
    },

    onUnload() { // OnDestroy
        let bgm = app.globalData.bgm;

        if (bgm) {
            bgm.stop();
            bgm.destroy();
            getApp().globalData.bgm = null;
        }
    },

    onReady() { // Start

    },

    onShow() { // OnEnable

    },

    onHide() { // OnDisable

    },
})