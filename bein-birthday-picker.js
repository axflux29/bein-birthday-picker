export function selectBirthday(yearSelector = null, monthSelector = null, daySelector = null, config = null) {
    if (config === null) {
        config = {};
    }

    const months = [
        "null",
        "Ocak",
        "Şubat",
        "Mart",
        "Nisan",
        "Mayıs",
        "Haziran",
        "Temmuz",
        "Ağustos",
        "Eylül",
        "Ekim",
        "Kasım",
        "Aralık"
    ];

    if (config.year === null) {
        config.year = 0;
    }

    if (config.month === null) {
        config.month = 0;
    }

    if (config.day === null) {
        config.day = 0;
    }

    if (config.yearRange === null) {
        config.yearRange = 100;
    }

    if (config.endYear === null) {
        config.endYear = new Date().getFullYear();
    }

    let birthdayYear = $(yearSelector);
    if (birthdayYear.length === 0) {
        throw "can not find 'year' select control";
    }
    for (let y = config.endYear; y > config.endYear - config.yearRange; y--) {
        if (y === config.year) {
            $('<option value="' + y + '" selected="selected">' + y + '</option>').appendTo(birthdayYear);
        } else {
            $('<option value="' + y + '" >' + y + '</option>').appendTo(birthdayYear);
        }
    }

    let birthdayMonth = $(monthSelector);
    if (birthdayMonth.length === 0) {
        throw "can not find 'month' select control";
    }
    for (let m = 1; m <= 12; m++) {
        if (m === config.month) {
            $('<option value="' + m + '" selected="selected">' + months[m] + '</option>').appendTo(birthdayMonth);
        } else {
            $('<option value="' + m + '">' + months[m] + '</option>').appendTo(birthdayMonth);
        }
    }

    let birthdayDay = $(daySelector);
    if (birthdayDay.length === 0) {
        throw "can not find 'day' select control";
    }
    for (let d = 1; d <= 31; d++) {
        if (d === config.day) {
            $('<option value="' + d + '" selected="selected">' + d + '</option>').appendTo(birthdayDay);
        } else {
            $('<option value="' + d + '">' + d + '</option>').appendTo(birthdayDay);
        }
    }

    birthdayYear.change(onBirthdayChanged);
    birthdayMonth.change(onBirthdayChanged);
    birthdayDay.change(onBirthdayChanged);

    let day29 = birthdayDay.find('option[value="29"]');
    let day30 = birthdayDay.find('option[value="30"]');
    let day31 = birthdayDay.find('option[value="31"]');
}

function onBirthdayChanged() {
    let year = parseInt(birthdayYear.val());
    let month = parseInt(birthdayMonth.val());
    let day = parseInt(birthdayDay.val());

    switch (month) {
        case 4:
        case 6:
        case 9:
        case 11:
            if (day > 30) {
                birthdayDay.val(30);
            }
            day29.show();
            day30.show();
            day31.hide();
            break;
        case 2:
            if (!isLeapYear(year)) {
                if (day > 28) {
                    birthdayDay.val(28);
                }
                day29.hide();
            } else {
                if (day > 29) {
                    birthdayDay.val(29);
                }
                day29.show();
            }
            day30.hide();
            day31.hide();
            break;
        default:
            day29.show();
            day30.show();
            day31.show();
            break;
    }
}

function isLeapYear(year) {
    return 0 === year % 4 && (year % 100 !== 0 || year % 400 === 0);
}