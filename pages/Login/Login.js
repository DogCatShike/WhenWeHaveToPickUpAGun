let bgm = null;

Page({

    data: {

    },

    onLoad() {
        if (!bgm) {
            console.log("播放背景音乐")
            bgm = wx.createInnerAudioContext();
            bgm.src = "/audio/WhenMustGun.wav";
            bgm.loop = true;
            bgm.play();
        }
    },

    onUnload() {
        if (bgm) {
            bgm.stop();
            bgm.destroy();
        }
    },

    OnLoginPlayClick() {
        wx.navigateTo({
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