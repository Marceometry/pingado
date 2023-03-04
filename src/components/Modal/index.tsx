import { GearSix } from 'phosphor-react'
import { useDisclosure } from '@mantine/hooks'
import { Modal as MantineModal } from '@mantine/core'
import { useGameContext } from '@/contexts'
import { CustomColor, TableBackgroundColor, theme } from '@/styles'
import { ColorButton, ColorList, ModalContent, OpenModalButton } from './styles'

export const Modal = () => {
  const {
    interfaceSettings: { tableColor, cardSize },
    user: { chipColor },
    updateTableColor,
    updateUserColor,
    updateCardSize,
  } = useGameContext()
  const [opened, { open, close }] = useDisclosure(false)

  const tableColors = Object.entries(theme.tableColors).map(
    ([name, value]) => ({ name, value })
  )

  const userColors = Object.entries(theme.customColors).map(
    ([name, value]) => ({ name, value })
  )

  return (
    <>
      <MantineModal
        opened={opened}
        onClose={close}
        title='Configurações da interface'
        size='auto'
        padding={24}
        centered
      >
        <ModalContent>
          <div style={{ display: 'flex', gap: 16 }}>
            <label htmlFor='cardSize'>
              Tamanho das cartas (visível apenas para você):
            </label>
            <input
              type='range'
              name='cardSize'
              id='cardSize'
              min='16'
              max='34'
              step='2'
              value={cardSize.multiplier}
              onChange={(e) => updateCardSize(Number(e.target.value))}
            />
            <span>{cardSize.multiplier}</span>
          </div>

          <div>
            <label htmlFor='tableColor'>
              Cor de fundo da mesa (visível apenas para você):
            </label>

            <ColorList id='tableColor'>
              {tableColors.map((item) => (
                <ColorButton
                  key={item.name}
                  background={item.value}
                  isSelected={tableColor === item.name}
                  onClick={() =>
                    updateTableColor(item.name as TableBackgroundColor)
                  }
                />
              ))}
            </ColorList>
          </div>

          <div>
            <label htmlFor='userColor'>
              Cor das suas fichas e cartas (visível para todos):
            </label>

            <ColorList id='userColor'>
              {userColors.map((item) => (
                <ColorButton
                  key={item.name}
                  background={item.value}
                  isSelected={chipColor === item.name}
                  onClick={() => updateUserColor(item.name as CustomColor)}
                />
              ))}
            </ColorList>
          </div>
        </ModalContent>
      </MantineModal>

      <OpenModalButton onClick={open}>
        <GearSix size={40} weight='duotone' />
      </OpenModalButton>
    </>
  )
}
