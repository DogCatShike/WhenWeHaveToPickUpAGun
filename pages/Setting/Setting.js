const app = getApp();

Page({
    data: {
        volume: 100,
        isLogin: false,
        user: {}
    },

    onLoad() {
        const savedVolume = wx.getStorageSync('gameVolume');
        this.setData({
            volume: savedVolume || 100
        });
    },

    OnSettingCloseClick() {
        wx.navigateBack();
    },

    onSettingSliderChange(e) { // e: 回调参数(还是尽量用统一的命名，尽管像我搞不懂foreach为什么总爱用v一样)
        const value = e.detail.value;
        this.setData({
            volume: value
        });
        wx.setStorageSync('volume', value); // 本地存储

        let bgm = app.globalData.bgm;
        if (bgm) {
            app.globalData.bgm.volume = value / 100;
        }
    },

    OnSettingQuitClick() {
        this.setData({
            isLogin: false,
            user: {}
        });
        wx.removeStorageSync('user');
    },

    OnSettingLoginClick() {
        wx.getUserProfile({
            desc: '是否使用微信登陆这个奇怪的游戏？尽管登陆似乎没有任何作用。',
            success: (res) => {
                this.setData({
                    isLoggedIn: true,
                    userInfo: res.userInfo
                });
                wx.setStorageSync('user', res.userInfo);
            }
        })
    },
})