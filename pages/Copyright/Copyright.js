Page({
    data: {
        markers: [{
            id: 0,
            // 拾取坐标不准可还行, 没事, 我自会人肉校准
            longitude: 118.074397,
            latitude: 24.615400,
            name: '位置',
            iconPath: '/img/marker.png',
            width: 40,
            height: 40
        }]
    },

    OnCopyrightCloseClick() {
        wx.navigateBack();
    }
})