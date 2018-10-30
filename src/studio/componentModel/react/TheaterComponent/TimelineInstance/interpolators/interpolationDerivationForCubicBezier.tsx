import UnitBezier from 'timing-function/lib/UnitBezier'
import AbstractDerivation from '$shared/DataVerse/derivations/AbstractDerivation'
import withDeps from '$shared/DataVerse/derivations/withDeps'

type Config = {
  timeD: AbstractDerivation<number>
  interpolationDescriptorP: $FixMe
  leftPointTimeD: AbstractDerivation<number>
  leftPointValueD: AbstractDerivation<$FixMe>
  rightPointTimeD: AbstractDerivation<undefined | null | number>
  rightPointValueD: AbstractDerivation<$FixMe>
}

type Solver = {
  solveSimple(progression: number): number
}

export default function interpolationDerivationForCubicBezier(
  config: Config,
): AbstractDerivation<$FixMe> {
  // debugger
  return isConnected(config).flatMap(
    isConnected =>
      isConnected ? interpolatedValue(config) : config.leftPointValueD,
  )
}

const unitBezier = (interpolationDescriptorP: $FixMe) => {
  return withDeps(
    {
      lxD: interpolationDescriptorP.prop('handles').index(0),
      lyD: interpolationDescriptorP.prop('handles').index(1),
      rxD: interpolationDescriptorP.prop('handles').index(2),
      ryD: interpolationDescriptorP.prop('handles').index(3),
    },
    ({lxD, lyD, rxD, ryD}) => {
      return new UnitBezier(
        lxD.getValue(),
        lyD.getValue(),
        1 - rxD.getValue(),
        1 - ryD.getValue(),
      )
    },
  )
}

const progression = ({timeD, leftPointTimeD, rightPointTimeD}: Config) => {
  return withDeps(
    {timeD, leftPointTimeD, rightPointTimeD},
    ({timeD, leftPointTimeD, rightPointTimeD}) => {
      const rightPointTime = rightPointTimeD.getValue()
      if (typeof rightPointTime === 'number') {
        const distance = rightPointTime - leftPointTimeD.getValue()
        return (timeD.getValue() - leftPointTimeD.getValue()) / distance
      } else {
        return 0
      }
    },
  )
}

const isConnected = ({interpolationDescriptorP}: Config) =>
  interpolationDescriptorP.prop('connected')

const interpolatedValue = (config: Config) => {
  const progressionD = progression(config)
  const solverD = unitBezier(config.interpolationDescriptorP)
  const {leftPointValueD, rightPointValueD} = config

  return withDeps(
    {progressionD, solverD, leftPointValueD, rightPointValueD},
    () => {
      // console.log('here')
      // debugger
      const solver: Solver = solverD.getValue()
      const valueProgression = solver.solveSimple(progressionD.getValue())
      const valueDiff = rightPointValueD.getValue() - leftPointValueD.getValue()
      return leftPointValueD.getValue() + valueProgression * valueDiff
    },
  )
}