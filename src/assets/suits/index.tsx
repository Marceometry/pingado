import { CardSuit } from '@/contexts'

import { ClubsIcon } from './suit-clubs'
import { DiamondsIcon } from './suit-diamonds'
import { HeartsIcon } from './suit-hearts'
import { SpadesIcon } from './suit-spades'

const icons = {
  clubs: ClubsIcon,
  diamonds: DiamondsIcon,
  hearts: HeartsIcon,
  spades: SpadesIcon,
}

type SuitIconProps = React.SVGProps<SVGSVGElement> & {
  suit: CardSuit
  size?: number
}

export const SuitIcon = ({ suit, size = 20, ...props }: SuitIconProps) => {
  const Icon = icons[suit]

  return <Icon {...props} style={{ width: size, height: size }} />
}
