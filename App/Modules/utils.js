//@flow
export const calculateProgress = (scroll: number, height: number) => {
    let progress
    progress = parseFloat(scroll) / parseFloat(height) || 0
    if (progress < 0) {
        progress = 0
    } else if (progress > 1) {
        progress = 1
    }
    return progress
}
