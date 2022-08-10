export const inputNumberValidation = (e, setter, item) => {
    if (item) {
        if (+(e.target.value) > +(item.quantity)) {
            e.target.value = item.quantity
        }
        if (+(e.target.value) < 0) {
            e.target.value = '0'
        }
    } else {
        if (+(e.target.value) < 0) {
            e.target.value = '0'
        }
    }

    setter(e.target.value)
}