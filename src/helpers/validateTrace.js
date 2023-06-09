import { decrypt } from "../services/crypto"

export const validateTraceQrCode = (value) => {
    if(value.length === 24){ //qr length
        const qrCode = decrypt(value)
        if(qrCode && qrCode.length === 11){// decrypted qr length
            return qrCode
        } else {
            return ""
        }
    }else if(value.length === 11){ //ID length
        return value
    }else{
        const qrCode = decrypt(value)
        if(qrCode && qrCode.length === 11){// decrypted qr length
            return qrCode
        } else {
            return ""
        }
    }
}