import AsyncLock from 'async-lock'

const BOOTSTRAP = 'BOOTSTRAP'

class LockController {
    constructor() {
        this.lock = new AsyncLock()
    }

    safelyExecute(func) {
        return this.lock.acquire(BOOTSTRAP, () => func())
    }
}

const instance = new LockController()

export default instance
