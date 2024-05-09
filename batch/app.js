const { createApp } = Vue;

createApp({
    data() {
        return {
            first_qr_code: 91000000,
            qrcode_numbers: [],
            qr_codes_rendered: false,
            nb_qr_codes: 1000
        };
    },
    methods: {
        generateQrCodeNumbers() {
            this.first_qr_code = parseInt(this.first_qr_code);
            let qrcode_numbers = [];
            for (let i = 0; i < this.nb_qr_codes; i++) {
                qrcode_numbers.push(i + this.first_qr_code);
            }
            this.qrcode_numbers = qrcode_numbers;
            document.title = `Batch QR codes ${this.first_qr_code} - ${this.first_qr_code + this.nb_qr_codes}`;
            this.qr_codes_rendered = true;
        }
    },
    components: {
        QrCode
    }
}).mount('#app');