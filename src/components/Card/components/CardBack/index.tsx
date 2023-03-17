import { CustomColor } from '@/styles'
import { CardBackContainer } from './styles'

type CardBackProps = {
  color?: CustomColor
}

export const CardBack = ({ color = 'black' }: CardBackProps) => {
  return (
    <CardBackContainer color={color}>
      <div>
        <div />
      </div>
    </CardBackContainer>
  )
}
