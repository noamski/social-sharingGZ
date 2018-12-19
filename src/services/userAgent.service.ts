import { Injectable } from '@angular/core';

@Injectable()
export class UserAgentService {
    constructor() { }

    /**
     * Determine the mobile operating system.
     * This function returns one of 'iOS', 'Android', 'Windows Phone', or 'unknown'.
     * from: https://stackoverflow.com/a/21742107
     * @returns {String}
     */
    getMobileOperatingSystem() {
        var userAgent = navigator.userAgent || navigator.vendor || window['opera'];

        // Windows Phone must come first because its UA also contains "Android"
        if (/windows phone/i.test(userAgent)) {
            return "Windows Phone";
        }

        if (/android/i.test(userAgent)) {
            return "Android";
        }

        // iOS detection from: http://stackoverflow.com/a/9039885/177710
        if (/iPad|iPhone|iPod/.test(userAgent) && !window['MSStream']) {
            return "iOS";
        }

        return "unknown";
    }

    /**
     * Detect if user uses iOS phone
     * @returns {Boolean}
     */
    isiOSPhone() {
        var userAgent = navigator.userAgent || navigator.vendor || window['opera'];

        return /iPad|iPhone|iPod/.test(userAgent) && !window['MSStream'] ? true : false
    }

   /**
     * Detect if user uses Android phone
     * @returns {Boolean}
     */
    isAndroidPhone() {
        var userAgent = navigator.userAgent || navigator.vendor || window['opera'];

        return /android/i.test(userAgent) ? true : false
    }
}