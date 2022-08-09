export const inputNumberValidation = (e, setter, item) => {
    if (item) {
        if (+(e.target.value) > +(item.quantity)) {
            e.target.value = item.quantity
        }
        if (+(e.target.value) < 1) {
            e.target.value = '1'
        }
    } else {
        if (+(e.target.value) < 1) {
            e.target.value = '1'
        }
    }

    setter(e.target.value)
}