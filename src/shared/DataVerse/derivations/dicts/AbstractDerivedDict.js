// @flow
// import type {IDerivedDict} from './types'
import Emitter from '$shared/DataVerse/utils/Emitter'

export default class AbstractDerivedDict {
  _changeEmitter: Emitter<$FixMe>
  _untapFromSourceChanges: *
  _changeEmitterHasTappers: boolean
  +_reactToHavingTappers: () => void
  +_reactToNotHavingTappers: () => void
  isDerivedDict = 'True'

  constructor() {
    this._trace = new Error('Trace')
    this._changeEmitter = new Emitter()
    this._changeEmitterHasTappers = false
    this._changeEmitter.onNumberOfTappersChange(() => {this._reactToNumberOfChangeTappersChange()})
  }

  _reactToNumberOfChangeTappersChange() {
    const hasTappers = this._changeEmitter.hasTappers()
    if (hasTappers === this._changeEmitterHasTappers) return
    this._changeEmitterHasTappers = hasTappers
    if (hasTappers) {
      this._reactToHavingTappers()
    } else {
      this._reactToNotHavingTappers()
    }
  }

  changes() {
    return this._changeEmitter.tappable
  }

  pointer() {
    if (!this._pointer) {
      this._pointer = pointer.default({root: this, path: []})
    }
    return this._pointer
  }

  proxy(): $IntentionalAny {
    return proxyDerivedDict.default((this: $IntentionalAny))
  }

  extend(x: $IntentionalAny): $IntentionalAny {
    return extend.default((this: $IntentionalAny), x)
  }

  mapValues(fn: $IntentionalAny): $IntentionalAny {
    return mapValues.default((this: $IntentionalAny), fn)
  }
}

const pointer = require('$shared/DataVerse/derivations/pointer')
const proxyDerivedDict = require('./proxyDerivedDict')
const extend = require('./extend')
const mapValues = require('./mapValues')