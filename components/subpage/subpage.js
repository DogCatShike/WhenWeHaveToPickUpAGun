Component({
    properties: {
        show: {
            type: Boolean,
            value: false
        },
        title: {
            type: String,
            value: '提示'
        },
    },

    methods: {
        OnSubpageCloseClick() {
            this.triggerEvent('close')
        },
    }
})