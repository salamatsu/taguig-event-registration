import CryptoJS from "crypto-js"

export const encrypt = (id) => {
    let key = CryptoJS.enc.Base64.parse(import.meta.env.VITE_CRYPTOJS_PRIVATE_KEY)
    let encrypt = CryptoJS.AES.encrypt(id, key, {
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Iso10126,
    iv: key
    })
    const encrypted = CryptoJS.enc.Base64.stringify(encrypt.ciphertext)
    return encrypted
}

export const decrypt = (hex) => {
    let key = CryptoJS.enc.Base64.parse(import.meta.env.VITE_CRYPTOJS_PRIVATE_KEY)
    let decrypt = CryptoJS.AES.decrypt(hex, key, {
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Iso10126,
    iv: key
    })
    const decrypted = CryptoJS.enc.Utf8.stringify(decrypt)
    return decrypted 
}