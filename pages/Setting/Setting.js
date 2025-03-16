const app = getApp();

Page({
    data: {
        volume: 100,
        isLogin: false,
        userName: "",
        userAvatar: null,
    },

    onLoad() {
        const savedVolume = wx.getStorageSync('volume');
        this.setData({
            volume: savedVolume || 100
        });

        const savedIsLogin = wx.getStorageSync('isLogin');
        const savedUserName = wx.getStorageSync('userName');
        const savedUserAvatar = wx.getStorageSync('userAvatar');

        if (savedIsLogin) {
            this.setData({
                isLogin: true,
                userName: savedUserName || '',
                userAvatar: savedUserAvatar || null,
            });
        }
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

    OnSettingLoginClick() {
        wx.showModal({
            title: '设置昵称',
            content: '辛怡然',
            editable: true,
            success: (res) => {
                if (res.content == "辛怡然") {
                    wx.showModal({
                        title: '注册失败',
                        content: "你触发了彩蛋, 但该名字在地球online里被人占用了, 请换一个",
                        showCancel: false,
                        confirmText: '关闭'
                    });
                }
                else {
                    let avatar = null;
                    console.log(res);

                    this.setData({
                        isLogin: true,
                        userName: res.content,
                        userAvatar: avatar
                    });

                    wx.setStorageSync('isLogin', true);
                    wx.setStorageSync('userName', res.content);
                }
            }
        })
    },

    OnSettingQuitClick() {
        this.setData({
            isLogin: false,
            userName: "",
            userAvatar: null,
        });

        wx.setStorageSync('isLogin', false);
        wx.setStorageSync('userName', "");
        wx.setStorageSync('userAvatar', null);
    },

    OnSettingAvatarClick() {
        wx.chooseMedia({
            count: 1,
            mediaType: ['image'],
            success: (res) => {
                if (res.tempFiles && res.tempFiles.length > 0) {
                    const tempFilePath = res.tempFiles[0].tempFilePath;
                    this.setData({
                        userAvatar: tempFilePath
                    });

                    wx.setStorageSync('userAvatar', tempFilePath);
                } else {
                    wx.showModal({
                        title: '选择照片失败',
                        content: "请检查是否选择了正确的照片",
                        showCancel: false,
                        confirmText: '关闭'
                    });
                }
            },
            fail: (err) => {
                wx.showModal({
                    title: '选择照片失败',
                    content: "请检查是否选择了正确的照片",
                    showCancel: false,
                    confirmText: '关闭'
                });
            }
        })
    },
})