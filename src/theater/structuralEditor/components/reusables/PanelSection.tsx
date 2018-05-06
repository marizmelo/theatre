import React from 'react'
import * as css from './PanelSection.css'
import cx from 'classnames'

type Props = {
  children: React.ReactNode
  withHorizontalMargin?: boolean
  label?: string
  withTopMargin?: boolean
  withoutBottomMargin?: boolean
}

type State = {}

class PanelSection extends React.PureComponent<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = {}
  }

  render() {
    const {
      label,
      withHorizontalMargin,
      withTopMargin,
      withoutBottomMargin,
    } = this.props
    const hasLabel = typeof label === 'string'
    return (
      <div
        className={cx(css.container, {
          [css.withHorizontalMargin]: withHorizontalMargin === true,
          [css.hasLabel]: hasLabel,
          [css.withTopMargin]: withTopMargin === true,
          [css.withoutBottomMargin]: withoutBottomMargin === true,
        })}
      >
        {hasLabel && (
          <div className={css.label}>
            <span className={css.labelText}>{this.props.label}</span>
          </div>
        )}
        <div className={css.body}>{this.props.children}</div>
        <div className={css.separator} />
      </div>
    )
  }
}

export default PanelSection