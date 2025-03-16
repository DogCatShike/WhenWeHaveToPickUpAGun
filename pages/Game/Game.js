const app = getApp()

Page({
    data: {
        isPlot: false, // 剧情
        plotText: "", // 剧情文本

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
        const savedIsPlot = wx.getStorageSync('isPlot');
        const savedAdult = wx.getStorageSync('adult');
        const savedChild = wx.getStorageSync('child');
        const savedPlayer = wx.getStorageSync('player');
        const savedSoldier = wx.getStorageSync('soldier');
        const savedFarmer = wx.getStorageSync('farmer');
        const savedFood = wx.getStorageSync('food');
        const savedGun = wx.getStorageSync('gun');

        this.setData({
            volume: savedVolume || 100,
            isPlot: savedIsPlot || false,
            adult: savedAdult || 0,
            child: savedChild || 0,
            player: savedPlayer || 1,
            soldier: savedSoldier || 0,
            farmer: savedFarmer || 0,
            food: savedFood || 0,
            gun: savedGun || 0,
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

    OnGameContinueClick() {
        this.setData({
            isPlot: flase,
        });
    },

    OnGamePolicyClick() {
        console.log("OnGamePolicyClick");
    },

    OnGamePopulationClick() {
        console.log("OnGamePopulationClick");
    },

    OnGameTradeClick() {
        console.log("OnGameTradeClick");
    },

    OnGameBackClick() {
        wx.showModal({
            title: null,
            content: '确认返回主界面吗? 当前进度将保存',
            editable: true,
            showCancel: true,
            success: (res) => {
                if (res.confirm) {
                    wx.setStorageSync('isPlot', this.data.isPlot);  
                    wx.setStorageSync('adult', this.data.adult);
                    wx.setStorageSync('child', this.data.child);
                    wx.setStorageSync('player', this.data.player);
                    wx.setStorageSync('soldier', this.data.soldier);
                    wx.setStorageSync('farmer', this.data.farmer);
                    wx.setStorageSync('food', this.data.food);
                    wx.setStorageSync('gun', this.data.gun);

                    wx.reLaunch({
                        url: '/pages/Login/Login'
                    });
                }
            }
        })
    },
})