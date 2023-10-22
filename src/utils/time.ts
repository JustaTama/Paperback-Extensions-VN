export function convertTime(time: string): Date {
    if (time === '') return new Date()
    
    let date
    
    // 2023-08-12T00:00:00
    if (time.includes('T') && time.includes('-')) {
        date = new Date(time)
        return date
    }
    
    // 29/12/22
    if (time.split('/').length == 3) {
        date = time.split('/')
        date[2] = '20' + date[2]
        return new Date(
            Number.parseInt(date[2]),
            Number.parseInt(date[1]!) - 1,
            Number.parseInt(date[0]!)
        )
    }

    // 11:44 05/02
    if (time.includes(':')) {
        date = new Date()
        const temp = time.split(' ')
        date.setHours(Number.parseInt(temp[0]!.split(':')[0]!))
        date.setMinutes(Number.parseInt(temp[0]!.split(':')[1]!))

        date.setDate(Number.parseInt(temp[1]!.split('/')[0]!))
        date.setMonth(Number.parseInt(temp[1]!.split('/')[1]!) - 1)

        return date
    }

    // something "* trước"
    if (time.includes('trước')) {
        const T = Number.parseInt(time.split(' ')[0]!)
        date = new Date()
        if (time.includes('giây')) {
            date.setSeconds(date.getSeconds() - T)
            return date
        }
        if (time.includes('phút')) {
            date.setMinutes(date.getMinutes() - T)
            return date
        }
        if (time.includes('giờ')) {
            date.setHours(date.getHours() - T)
            return date
        }
        if (time.includes('ngày')) {
            date.setDate(date.getDate() - T)
            return date
        }
        if (time.includes('tháng')) {
            date.setMonth(date.getMonth() - T)
            return date
        }
        if (time.includes('năm')) {
            date.setFullYear(date.getFullYear() - T)
            return date
        }
    }

    return new Date()
}
