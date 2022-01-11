// import React from 'react'
import { toast } from 'react-toastify';
import { messages } from "./constants";
import validator from 'validator';
import axios from "axios";
import moment from 'moment';
const invalidDate = "Invalid Date";
let toastId;
//FUNCTION FOR STRING ENCODE :START
export function encodeString(data) {
    data = escape(encodeURIComponent(data));
    return data;
}
//FUNCTION FOR STRING ENCODE : END

/*FUNCTION FOR STRING DECODE :START */
export function decodeString(data) {

    data = decodeURIComponent(data);
    return data;
}
/*FUNCTION FOR STRING DECODE :END */
/*SHOWING NOTIFY MESSAGES: START */
function closeToast() {
    toastId = null;
}
export function notify(notifyType, constants, autoClose) {
    console.log("working from uitility notify")
    console.log("notifyType", notifyType)
    console.log("constants", constants)
    console.log("autoClose", autoClose)
    autoClose = autoClose ? true : false;
    if (toastId) {
        if (notifyType === "error") {
            toast.update(toastId, { render: constants, type: toast.TYPE.ERROR, onClose: closeToast });
            // console.log("working in error")
        }
        else {
            toast.update(toastId, { render: constants, type: toast.TYPE.SUCCESS, onClose: closeToast });
            // console.log("working in success")
        }
    }
    else {
        if (notifyType === "error") {
            if (autoClose) {
                toastId = toast.error(constants, { onClose: closeToast, autoClose: 5000 });

            } else {
                toastId = toast.error(constants, { onClose: closeToast });
            }
        }
        else {
            toastId = toast.success(constants, { onClose: closeToast, autoClose: 5000 });
        }
    }
}
/*SHOWING NOTIFY MESSAGES: END */
export function showLoader() {
    document.getElementById("parent-loader").style.display = "block";
    document.querySelector("body").style.overflow = "hidden";
}
export function hideLoader() {
    document.getElementById("parent-loader").style.display = "none";
    document.querySelector("body").style.overflow = "auto";
}
export function focusById(id) {
    let x = document.getElementById(id.toString());
    if (x) {
        x.focus()
        return true;
    }
    return false;
}
export function isMatches(value, regex) {
    value = value ? value.toString() : "";
    value = value.trim();
    if (!value || !value.match(regex)) {
        return false;
    }
    return true;
}
export function isEmail(value) {
    value = value ? value.toString() : "";
    value = value.trim();
    if (!validator.isEmail(value)) {
        return false;
    }
    return true;
}
export function toDefaultDateFormat(date, customDateFormat) {
    if (date && !isNaN(parseInt(date)) && date.toString() === parseInt(date).toString()) {
        date = parseInt(date);
    }
    if (date && (new Date(date).toString()) !== "Invalid Date") {
        // follow this link for moment documentation to format date
        // https://momentjscom.readthedocs.io/en/latest/moment/04-displaying/01-format/
        date = new Date(date);
        let dateFormat = customDateFormat ? customDateFormat : messages.momentDateFormat;
        return moment(date).format(dateFormat);
    }
    else {
        return "Invalid Date";
    }
}
/*Upload file- start*/
export function uploadFile(dataToSend, successCallback, errorMsg) {
    axios.post('/uploadFile/upload', dataToSend)
        .then(function (response) {
            let data = response.data ? response.data : {};
            console.log(data);
            if (data.uploadSuccess) {
                successCallback(data.fileName)
            }
            else {
                notify(messages.toastError, "error");
            }
        })
        .catch(function (response) {

        });
}