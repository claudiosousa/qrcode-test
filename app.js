const MAX_QRCODE_VALIDITY_MINUTES = 1; //1m
//const MAX_QRCODE_VALIDITY_MINUTES = 8 * 60; // 8h
const QRCODE_SIZE = 200;

const check_age_and_generate_qrcode = () => {
    const [, last_qrcode_age_minutes] = get_last_qrcode_and_age_minutes();
    const last_qrcode_still_valid = last_qrcode_age_minutes <= MAX_QRCODE_VALIDITY_MINUTES;
    if (!last_qrcode_still_valid || confirm("QR Code still valid!\nAre you sure you want to generate a new one?"))
        generate_qrcode();
}

const qrcode = new QRCode(qrcode_container, {
    width: QRCODE_SIZE,
    height: QRCODE_SIZE,
    text: "http://jindo.dev.naver.com/collie",
    colorDark: "#000000",
    colorLight: "#ffffff",
    correctLevel: QRCode.CorrectLevel.H
});

const set_qrcode = new_qrcode => {
    qrcode.clear();
    qrcode.makeCode(new_qrcode);
    code_id.innerText = new_qrcode;
    save_qr_code(new_qrcode);
}

const generate_qrcode = () => {
    const new_qr_code = generate_qrcode_number();
    set_qrcode(new_qr_code);
    show_qrcode_age(0);
}

const generate_qrcode_number = () => {
    /*
    QRCODE = QR_NUMBER + 
            0904532 +
            year(from_date) + month(from_date) + day(from_date) +
            year(to_date) + month(to_date) + day(to_date) +
            346653621
    
    QR number       00000000-99999999
    From	        14-10-2022
    To	            31-12-2060
    Start nb	    90012119
    Part pre-date	0904532
    Part post-date	346653621
    Ex:	            9001211909045322022101420601231346653621
    */

    // qrnumber: 8 digits number changing every minute
    const qrnumber = (Math.floor(Date.now() / 1000 / 60) + "").padStart(8, "0"),
        pre_date = "0904532",
        start_date = "20221014",
        end_date = "20601231",
        post_date = "346653621"

    return qrnumber + pre_date + start_date + end_date + post_date;
}

const show_qrcode_age = qrcode_age_minutes => {
    if (!qrcode_age_minutes) {
        qrcode_validity_time.innerText = "Just generated now.";
    } else {
        const validity_time_minutes = MAX_QRCODE_VALIDITY_MINUTES - qrcode_age_minutes;
        const validity_hours = Math.floor(validity_time_minutes / 60);
        const validity_minutes = Math.floor(validity_time_minutes) - validity_hours * 60;
        const validity_seconds = Math.floor((validity_time_minutes - Math.floor(validity_time_minutes)) * 60);
        qrcode_validity_time.innerText = `Still valid for ${validity_hours} hours, ${validity_minutes} minutes and ${validity_seconds} seconds.`;
    }
}

const load_or_generate_qrcode = () => {
    const [last_qrcode, last_qrcode_age_minutes] = get_last_qrcode_and_age_minutes();
    if (last_qrcode_age_minutes > MAX_QRCODE_VALIDITY_MINUTES) {
        generate_qrcode();
    }
    else {
        set_qrcode(last_qrcode)
        show_qrcode_age(last_qrcode_age_minutes);
    }
}

const save_qr_code = qrcode => {
    localStorage.setItem("last_qrcode", qrcode);
    localStorage.setItem("last_qrcode_time", Date.now());
}

const get_last_qrcode_and_age_minutes = () => {
    const last_qrcode = localStorage.getItem("last_qrcode")
    const last_qrcode_time = parseInt(localStorage.getItem("last_qrcode_time"));
    const last_qrcode_age_minutes = (Date.now() - last_qrcode_time) / (1000 * 60);
    return [last_qrcode, last_qrcode_age_minutes]
}

reload_code.onclick = check_age_and_generate_qrcode;

window.onload = load_or_generate_qrcode;