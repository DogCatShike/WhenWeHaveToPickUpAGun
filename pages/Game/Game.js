const app = getApp()

Page({
    data: {
        isPlot: true, // 剧情
        isNoAdult: false, // 无成人
        isNoFood: false, // 无食物
        plotList: [
            "战争突然爆发，战火侵袭了你所在的村庄。作为村里留下的唯一的年青人，你必须带领人民，活下去，直到最后一刻。（好累，不想往下做，写了一点点接口，游戏主要逻辑是有了，差一个功能。但一边做一边蹦想法，感觉把现在构思的做完，我会在做完之前加一百个没那么重要的功能。以上是我的全部狡辩。)",
            "夜间，不知道从哪儿来了一伙强盗。大概是发国难财，他们看起来很强壮，还带着武器。你们必须做出反抗。",
            "不想编剧情了"
        ],
        plotIndex: 0,

        adult: 100, // 成人
        child: 30, // 儿童
        player: 1, // 玩家
        people: 100, // 总人口

        // 成人子类目
        soldier: 0, // 士兵
        farmer: 100, // 农民

        food: 500, // 食物
        gun: 0, // 枪

        day: 1, // 天数

        showSubPage: -1, // 1: 政策, 2: 人口, 3: 贸易

        // 政策
        isChildWork: false, // 童工
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

        const adult = this.data.adult;
        const food = this.data.food;
        if (adult <= 0) {
            this.setData({
                isNoAdult: true,
            });
        }

        if (food <= 0) {
            this.setData({
                isNoFood: true,
            });
        }

        const day = this.data.day;
        {
            if (day >= 3) {
                this.NoNew();
            }
        }
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

    OnPolicyChildWorkClick() {
        const isChildWork = this.data.isChildWork;
        this.setData({
            isChildWork: !isChildWork
        })

        const child = this.data.child;
        const adult = this.data.adult;
        const farmer = this.data.farmer;
        const soldier = this.data.soldier;

        if (!isChildWork) // 实际上是允许童工
        {
            if (farmer + soldier == adult) {
                this.setData({
                    people: adult + child,
                    farmer: farmer + child,
                });
            }
        }
        else {
            if (farmer + soldier == adult + child) {
                this.setData({
                    people: adult,
                    farmer: farmer - child,
                });
            }
        }
    },

    OnSubpageCloseClick() {
        this.setData({
            showSubPage: -1
        })
    },

    OnSubpageSliderChange(e) {
        const people = this.data.people;
        const farmer = e.detail.value;
        const soldier = people - farmer;

        this.setData({
            farmer: farmer,
            soldier: soldier,
        });
    },

    OnTradeSureClick() {
        console.log('OnGameTradeClick');
        this.setData({
            showSubPage: -1
        })
    },

    OnGameNextClick() {
        const day = this.data.day;
        const adult = this.data.adult;
        const child = this.data.child;
        const farmer = this.data.farmer;
        const food = this.data.food;
        this.setData({
            isPlot: true,
            day: day + 1,

            food: food - adult - child * 0.5 + farmer,
        })

        const gun = this.data.gun;
        if (day == 1) {
            this.Dead(30);
            this.setData({
                gun: gun + 1,
            })
        }
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

    OnNoAdultClick() {
        const soldier = this.data.soldier;
        this.setData({
            showSubPage: -1,
            player: 0,
            adult: 1,
            soldier: soldier + 1,
        })

        this.NoNew();
    },

    OnNoFoodClick() {
        this.setData({
            showSubPage: -1,
            player: 0,
            adult: 1,
            child: 0,
            farmer: 0,
            soldier: 1,
        })

        this.NoNew();
    },

    Dead: function (number) {
        const people = this.data.people;
        const adult = this.data.adult;
        const child = this.data.child;
        const soldier = this.data.soldier;
        const farmer = this.data.farmer;

        this.setData({
            people: people - number,
        });

        if (number <= soldier) {
            this.setData({
                soldier: soldier - number,
                adult: adult - number,
            });
        }
        else if (number > soldier && number <= adult) {
            this.setData({
                soldier: 0,
                farmer: farmer - (number - soldier) * 2,
                adult: adult - soldier - (number - soldier) * 2,
            });
        }
        else if (number > adult && number <= people) {
            this.setData({
                soldier: 0,
                farmer: farmer - (number - soldier) * 2 - (number - adult) * 3,
                adult: 0,
                child: child - (number - adult) * 3,
            });
        }
        else if (number > people) {
            this.setData({
                soldier: 0,
                farmer: 0,
                adult: 0,
                child: 0,
                people: 0,
            });
        }
    },

    NoNew: function () {
        wx.showModal({
            title: '',
            content: '之后没有新内容了, 你可以继续游玩, 可能有剧情, 但是没有造成变量非规律变化的事件了',
            confirmText: '退出游戏',
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
    }
})