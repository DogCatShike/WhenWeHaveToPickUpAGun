const app = getApp()

Page({
    data: {
        isPlot: true, // 剧情
        plotList: [
            "第一段剧情...",
            "第二段剧情...",
            "第三段剧情..."
        ],
        plotIndex: 0,

        adult: 100, // 成人
        child: 30, // 儿童
        player: 1, // 玩家

        // 成人子类目
        soldier: 0, // 士兵
        farmer: 100, // 农民

        food: 500, // 食物
        gun: 0, // 枪

        day: 1, // 天数

        showSubPage: -1, // 1: 政策, 2: 人口, 3: 贸易
    },

    onLoad() { // Awake
        let bgm = app.globalData.bgm;

        const savedVolume = wx.getStorageSync('volume');
        const savedIsPlot = wx.getStorageSync('isPlot');
        const savedPlotIndex = wx.getStorageSync('plotIndex');
        const savedAdult = wx.getStorageSync('adult');
        const savedChild = wx.getStorageSync('child');
        const savedPlayer = wx.getStorageSync('player');
        const savedSoldier = wx.getStorageSync('soldier');
        const savedFarmer = wx.getStorageSync('farmer');
        const savedFood = wx.getStorageSync('food');
        const savedGun = wx.getStorageSync('gun');
        const savedDay = wx.getStorageSync('day');

        this.setData({
            volume: savedVolume || 100,
            isPlot: savedIsPlot || true,
            plotIndex: savedPlotIndex || 0,
            adult: savedAdult || 100,
            child: savedChild || 30,
            player: savedPlayer || 1,
            soldier: savedSoldier || 0,
            farmer: savedFarmer || 100,
            food: savedFood || 500,
            gun: savedGun || 0,
            day: savedDay || 1,
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
            isPlot: false,
            plotIndex: this.data.plotIndex + 1,
        });
    },

    OnGamePolicyClick() {
        this.setData({
            showSubPage: 1
        })
    },

    OnGamePopulationClick() {
        this.setData({
            showSubPage: 2
        })
    },

    OnGameTradeClick() {
        this.setData({
            showSubPage: 3
        })
    },

    OnSubpageCloseClick() {
        this.setData({
            showSubPage: -1
        })
    },

    onSubpageSureClick() {
        console.log("onSubpageSureClick");
    },

    OnGameNextClick() {
        console.log("OnGameNextClick");
    },

    OnGameBackClick() {
        wx.showModal({
            title: '',
            content: '确认返回主界面吗? 当前进度将保存',
            confirmText: '确认退出',
            cancelText: '继续游戏',
            showCancel: true,
            success: (res) => {
                if (res.confirm) {
                    wx.setStorageSync('isPlot', this.data.isPlot);
                    wx.setStorageSync('plotIndex', this.data.plotIndex);
                    wx.setStorageSync('adult', this.data.adult);
                    wx.setStorageSync('child', this.data.child);
                    wx.setStorageSync('player', this.data.player);
                    wx.setStorageSync('soldier', this.data.soldier);
                    wx.setStorageSync('farmer', this.data.farmer);
                    wx.setStorageSync('food', this.data.food);
                    wx.setStorageSync('gun', this.data.gun);
                    wx.setStorageSync('day', this.data.day);

                    wx.reLaunch({
                        url: '/pages/Login/Login'
                    });
                }
            }
        })
    },
})