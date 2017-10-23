// @flow
import type {CommonNamespaceState} from '$studio/common/types'
import type {WorkspaceNamespaceState} from '$studio/workspace/types'
import type {ComponentModelNamespaceState} from '$studio/componentModel/types'
import * as D from '$shared/DataVerse'

export type CoreState = D.ObjectLiteral<{
  common: CommonNamespaceState,
  workspace: WorkspaceNamespaceState,
  componentModel: ComponentModelNamespaceState,
  // componentModel: D.ObjectLiteral<{}>,
}>