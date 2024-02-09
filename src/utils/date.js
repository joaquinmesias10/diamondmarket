import moment from 'moment';

const getWeek = (start_day = new Date()) => {
    let dates = []
    var s_id = start_day.getDay()
    for (var i = s_id; i < 7; i++) {
        dates.push(moment(start_day).add((i - s_id), 'days').toDate())
    }
    return dates
}

export const getMonthWeekdates = () => {
    let total_dates = []

    var start_date = new Date()
    for (var i = 0; i < 4; i++) {
        let dates = getWeek(start_date)
        total_dates.push(dates)
        if (dates.length > 0) {
            start_date = moment(dates[dates.length - 1]).add(1, 'days').toDate()
        }
    }
    return total_dates
}

export const getDateMonthStr = (date_obj = new Date()) => {
    return moment(date_obj).format("MMM D")
}
export const getDateMonthDayStr = (date_obj = new Date()) => {
    return moment(date_obj).format("MMM D dddd")
}
export const getDateYearStr = (date_obj = new Date()) => {
    return moment(date_obj).format("yyyy-MM-DD")
}

export const getDateYearTimeStr = (date_obj = new Date()) => {
    return moment(date_obj).format("DD/MM/yyyy hh:mm A")
}

export const getDateMonthDayFromDateStr = (date_str) => {
    return moment(date_str, "yyyy-MM-D").format("MMM D ddd")
}

export const getDateStrs_btw_dates = (start_date, end_date) => {
    if(start_date == null) { return [] }
    if(end_date == null) {
        return [getDateYearStr(start_date)]
    }
    let start = moment(start_date);
    let end = moment(end_date);
    let day_diff = end.diff(start, 'days')

    let return_str=[getDateYearStr(start_date)]
    for(var i = 0; i < day_diff; i ++) {
        return_str.push(getDateYearStr(start.add(1, 'days').toDate()))
    }
    return return_str
}

export const getTimeString=(hour , min )=>{
    var str = ""
    if (hour < 10) {
        str = `0${hour}`
    }
    else {
        str = `${hour}`
    }
    str = str + ":"
    if (min < 10) {
        str = str + `0${min}`
    }
    else {
        str = str + `${min}`
    }
    return str
}