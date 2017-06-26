import React from 'react'
import styled from 'styled-components'

import Gradient from './../Gradient/Gradient'
import { AngleWheel } from './../../containers/index'
import { Button } from './../Common/index'
import { Copy, Reset } from './../Icons/index'
import { TextXS } from './../Common/Typography'

const GRADIENT_HEIGHT = 300

const Container = styled.div`
  position: relative;
  height: ${GRADIENT_HEIGHT}px;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`

const NoBlur = styled.div`
  height: 100%;
  width: 100%;
  border: 1px solid rgba(0, 0, 0, 0.05);
  border-radius: 15px;
`

const Blurred = styled.div`
  filter: blur(20px);
  height: 100%;
  width: 98%;
  border-radius: 15px;
  margin-top: -${GRADIENT_HEIGHT}px;
`

const GradientButton = Button.extend`
  z-index: 20;
  position: absolute;
  padding: 3px;
  border-radius: 3px;
  display: flex;
  align-items: center;
`

const CopiedText = TextXS.extend`
  color: white;
  padding-left: 5px;
  text-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
  text-transform: uppercase;
`

const ResetText = TextXS.extend`
  color: white;
  padding-right: 5px;
  text-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
  text-transform: uppercase;
`

const GradientContainer = ({
  gradientAnimationDuration,
  wheelAnimationDuration,
  id,
  actualAngle,
  hovered,
  onMouseEnter,
  onMouseLeave,
  editingAngle,
  editingStop,
  editingColor,
  stopData,
  pickingColorStop,
  copiedId,
  onCopyCSS,
  edited,
  resetGradientAngle,
  resetColorStop,
  copyHovered,
  resetHovered
}) => {
  const editing = editingAngle || editingStop || editingColor
  const renderButtons = hovered && !editingAngle
  return (
    <Container>
      {renderButtons &&
        <GradientButton
          style={{
            top: 20,
            left: 20
          }}
          title='Copy CSS'
          onClick={() => {
            if (!copiedId || id !== copiedId) {
              onCopyCSS(actualAngle, stopData, id)
            }
          }}
          onMouseEnter={e => onMouseEnter(e, ['main', 'copy'])}
          onMouseLeave={e => onMouseLeave(e, ['main', 'copy'])}
        >
          <Copy color={'white'} />
          {copyHovered &&
            <CopiedText>{copiedId === id ? 'copied' : 'copy css'}</CopiedText>}
        </GradientButton>}
      {renderButtons &&
        edited &&
        <GradientButton
          style={{
            top: 15,
            right: 15
          }}
          title='Reset'
          onClick={() => {
            resetGradientAngle(id)
            resetColorStop(id)
          }}
          onMouseEnter={e => onMouseEnter(e, ['main', 'reset'])}
          onMouseLeave={e => onMouseLeave(e, ['main', 'reset'])}
        >
          {resetHovered && <ResetText>Reset</ResetText>}
          <Reset color='white' />
        </GradientButton>}

      <div
        onMouseEnter={e => onMouseEnter(e, ['main'])}
        onMouseLeave={e => onMouseLeave(e, ['main'])}
        style={{
          height: '100%',
          width: '100%'
        }}
      >
        <NoBlur
          style={{
            zIndex: hovered ? pickingColorStop ? 4 : 9 : 'auto'
          }}
        >
          <Gradient
            editingColor={editingColor}
            stopData={stopData}
            angle={actualAngle}
            transitionDuration={gradientAnimationDuration}
          />
        </NoBlur>

        <Blurred>
          <Gradient
            editingColor={editingColor}
            stopData={stopData}
            hasOpacity
            editing={editing}
            hovered={hovered}
            opacity={0.8}
            angle={actualAngle}
            transitionDuration={gradientAnimationDuration}
          />
        </Blurred>
      </div>

      <AngleWheel
        onMouseEnter={e => onMouseEnter(e, ['main'])}
        onMouseLeave={e => onMouseLeave(e, ['main'])}
        angle={actualAngle}
        id={id}
        transitionDuration={wheelAnimationDuration}
      />
    </Container>
  )
}

export default GradientContainer
