const app = getApp();

Page({

    data: {

    },

    onLoad() {
        let bgm = app.globalData.bgm;
        // 这个if怎么想出来的, 忘了, 我的脑子和昨晚的脑子是割裂的. 放c里绝对有bug, 但这里就莫名其妙可以用
        if (!bgm) {
            console.log("播放背景音乐")
            app.globalData.bgm = wx.createInnerAudioContext();
            app.globalData.bgm.src = "/audio/WhenMustGun.wav";
            app.globalData.bgm.loop = true;
            app.globalData.bgm.play();
        }
    },

    onUnload() {
        if (bgm) {
            bgm.stop();
            bgm.destroy();
        }
    },

    OnLoginPlayClick() {
        wx.navigateTo({ // 入栈
            url: '/pages/Game/Game'
        })
    },

    OnLoginSettingClick() {
        wx.navigateTo({
            url: '/pages/Setting/Setting'
        })
    },

    OnLoginFooterClick() {
        // wx.showModal({
        //     title: '版权信息',
        //     content: '程序: 230224125辛怡然, \n 美术: LibLibAI(https://www.liblib.art/), \n 音乐: Deepseek + 230224125辛怡然',
        //     showCancel: false
        // })
        wx.navigateTo({
            url: '/pages/Copyright/Copyright'
        })
    },
})