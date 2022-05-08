import version from './version'

class cnum {
  static get version(): string {
    return version
  }
}

export default cnum
export { version }
export * from './Rat'
export * from './Polyrat'
