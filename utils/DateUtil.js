/**
 * Created by user on 16/7/21.
 */

import moment from '../libs/moment.js';


var DateUtil = {
    format(date, style) {
        if (date && style) {
            return moment(Number(date)).format(style);
        }
        
        console.error('invalid date and style');
        return null;
    },
    getTimeObject(time){
        return moment(time).toObject()
    },
    /**
     * 今天开始时间
     */
    getTodayStart() {
        return moment({hour: 0, minute: 0, seconds: 0}).unix() * 1000;
    },

    /**
     * 昨天开始时间
     */
    getYestodayStart() {
        return moment({hour: 0, minute: 0, seconds: 0}).subtract(1, 'days').unix() * 1000;
    },

    /**
     * 获取聊天时间的字符串形式  时间戳转字符串
     */
    reFormatDateStr(dateStr) {
        return DateUtil.getDateStr(moment(dateStr).unix()*1000)
        
    },
    /**
     *  时间戳转字符串
     */
    reFormatDateStr2(dateStr) {
        return DateUtil.format(moment(dateStr).unix()*1000, 'YYYY-MM-DD HH:mm')

    },
    /**
     * 获取聊天时间的字符串形式  时间戳转字符串
     */
    getDateStr(date) {
      // console.log('datedate', date)
        let start = DateUtil.getYestodayStart();
        let end = DateUtil.getTodayStart();

        if (date >= end) {
            return DateUtil.format(date, 'HH:mm');
        } else if (date < end && date >= start) {
            return '昨天 ' + DateUtil.format(date, 'HH:mm');
        } else {
            return DateUtil.format(date, 'YYYY-MM-DD HH:mm');
        }
    }
};
module.exports = DateUtil;