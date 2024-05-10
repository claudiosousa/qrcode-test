const QrCode = {
    props: ['qrnumber'],
    template: `
        <div class="qrcode_component">
            <div class="qrcode_container"></div>
            <span class="qrnumber">{{qrnumber}}</span>
        </div>`,
    methods: {
        renderQrCode() {
            this.qrcode_value = generateQrCodeFromNumber(this.qrnumber);
            this.qrcode = new QRCode(this.$el.firstChild, {
                text: this.qrcode_value,
                width: 170,
                height: 170,
                colorDark: "#000000",
                colorLight: "#ffffff",
                correctLevel: QRCode.CorrectLevel.L
            });
        }
    },
    updated() {
        this.qrcode.clear();
        this.qrcode_value = generateQrCodeFromNumber(this.qrnumber);
        this.qrcode.makeCode(this.qrcode_value);
    },
    mounted() {
        this.renderQrCode();
    }
}

const generateQrCodeFromNumber = qrnumber => {
    //const qrnumber = (Math.floor(Date.now() / 1000 / 60) + "").padStart(8, "0"),
    const pre_date = "0904532",
        start_date = "20221014",
        end_date = "20601231",
        post_date = "346653621"

    return qrnumber + pre_date + start_date + end_date + post_date;
}