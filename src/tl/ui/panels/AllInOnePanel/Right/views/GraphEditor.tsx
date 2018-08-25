import React from 'react'
import withUtils, {
  IWithUtilsProps,
} from '$tl/ui/panels/AllInOnePanel/Right/views/withUtils'
import ViewBase, {
  IViewBaseProps,
} from '$tl/ui/panels/AllInOnePanel/Right/views/ViewBase'
import GraphEditorPoint from '$tl/ui/panels/AllInOnePanel/Right/views/graphEditor/GraphEditorPoint'
import BezierConnector from '$tl/ui/panels/AllInOnePanel/Right/views/graphEditor/BezierConnector'
import {
  TColor,
  TNormalizedPoints,
} from '$tl/ui/panels/AllInOnePanel/Right/types'
import {
  TMoveSingleHandle,
  TFnNeedsPointIndex,
} from '$tl/ui/panels/AllInOnePanel/Right/views/types'

interface IProps extends IViewBaseProps {
  color: TColor
  points: TNormalizedPoints
}

class GraphEditor extends ViewBase<IProps & IWithUtilsProps> {
  render() {
    const {points, color, propGetter} = this.props
    return (
      <g fill={color.normal} stroke={color.normal}>
        {points.map((point, index) => {
          const prevPoint = points[index - 1]
          const nextPoint = points[index + 1]
          return (
            <g key={index}>
              {point.interpolationDescriptor.connected &&
                nextPoint != null && (
                  <BezierConnector
                    leftPointIndex={index}
                    leftPointTime={point.time}
                    leftPointValue={point.value}
                    rightPointTime={nextPoint.time}
                    rightPointValue={nextPoint.value}
                    handles={point.interpolationDescriptor.handles}
                    removeConnector={this._removeConnector}
                    showContextMenu={this._showConnectorContextMenu}
                  />
                )}
              <GraphEditorPoint
                key={`${point.originalValue}${point.originalTime}`}
                color={color}
                propGetter={propGetter}
                pointTime={point.time}
                pointValue={point.value}
                pointHandles={point.interpolationDescriptor.handles}
                pointConnected={point.interpolationDescriptor.connected}
                originalTime={point.originalTime}
                originalValue={point.originalValue}
                pointIndex={index}
                removePoint={this._removePoint}
                addConnector={this._addConnector}
                movePointToNewCoords={this._movePointToNewCoords}
                moveLeftHandle={this.moveLeftHandle}
                moveRightHandle={this.moveRightHandle}
                makeRightHandleHorizontal={this.makeRightHandleHorizontal}
                makeLeftHandleHorizontal={this.makeLeftHandleHorizontal}
                showPointValuesEditor={this._showPointValuesEditor}
                showContextMenu={this._showPointContextMenu}
                addPointToSelection={this._addPointToSelection}
                removePointFromSelection={this._removePointFromSelection}
                {...(prevPoint
                  ? {
                      prevPointTime: prevPoint.time,
                      prevPointValue: prevPoint.value,
                      prevPointHandles:
                        prevPoint.interpolationDescriptor.handles,
                      prevPointConnected:
                        prevPoint.interpolationDescriptor.connected,
                    }
                  : {})}
                {...(nextPoint
                  ? {
                      nextPointTime: nextPoint.time,
                      nextPointValue: nextPoint.value,
                    }
                  : {})}
              />
            </g>
          )
        })}
      </g>
    )
  }

  moveLeftHandle: TMoveSingleHandle = (pointIndex, newHandle) => {
    this.project.reduxStore.dispatch(
      this.project._actions.historic.movePointLeftHandleInBezierCurvesOfScalarValues(
        {
          propAddress: this.props.propGetter('itemAddress'),
          pointIndex,
          newHandle,
        },
      ),
    )
  }

  moveRightHandle: TMoveSingleHandle = (pointIndex, newHandle) => {
    this.project.reduxStore.dispatch(
      this.project._actions.historic.movePointRightHandleInBezierCurvesOfScalarValues(
        {
          propAddress: this.props.propGetter('itemAddress'),
          pointIndex,
          newHandle,
        },
      ),
    )
  }

  makeLeftHandleHorizontal: TFnNeedsPointIndex = pointIndex => {
    this.project.reduxStore.dispatch(
      this.project._actions.historic.makePointLeftHandleHorizontalInBezierCurvesOfScalarValues(
        {
          propAddress: this.props.propGetter('itemAddress'),
          pointIndex,
        },
      ),
    )
  }

  makeRightHandleHorizontal: TFnNeedsPointIndex = pointIndex => {
    this.project.reduxStore.dispatch(
      this.project._actions.historic.makePointRightHandleHorizontalInBezierCurvesOfScalarValues(
        {
          propAddress: this.props.propGetter('itemAddress'),
          pointIndex,
        },
      ),
    )
  }
}

export default withUtils(GraphEditor)
