class Utils {
  methods1 () {}
  
  isEmptyObject (obj) {
    if (typeof obj !== 'object') {
      return false
    }
    if (obj === null) {
      return false
    }
    const keys = Object.keys(obj)
    return keys.length === 0
  }
}

export default new Utils()
