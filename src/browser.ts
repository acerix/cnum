/**
 * This file is the entrypoint of browser builds; The code executes when loaded in a browser.
 */
import cnum from './cnum'
// eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-explicit-any
(window as any).cnum = cnum

import Rat from './Rat'
// eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-explicit-any
(window as any).Rat = Rat

import Polyrat from './Polyrat'
// eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-explicit-any
(window as any).Polyrat = Polyrat

import {π} from './Rat'
// eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-explicit-any
(window as any).π = π

// instead of casting window to any, you can extend the Window interface: https://stackoverflow.com/a/43513739/5433572
// @todo can I?
// declare global {
//   interface Window {
//     Rat: Rat
//   }
// }

console.log(`cnum v${cnum.version}`)
