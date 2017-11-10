// @flow
import type {Selector} from '$studio/types'
import type {ComponentId} from './types'
import stringStartsWith from 'lodash/startsWith'

export const getComponentDescriptor: Selector<*, *> = (
  state,
  id: ComponentId,
) =>
  state.componentModel.componentDescriptors[
    stringStartsWith(id, 'TheaterJS/Core/') ? 'core' : 'custom'
  ][id]