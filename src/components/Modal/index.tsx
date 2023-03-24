import { GearSix } from 'phosphor-react'
import { useDisclosure } from '@mantine/hooks'
import {
  Button,
  Checkbox,
  Input,
  Modal as MantineModal,
  Slider,
} from '@mantine/core'
import { useGameContext } from '@/contexts'
import { CustomColor, TableBackgroundColor, theme } from '@/styles'
import { ColorButton, ColorList, ModalContent, OpenModalButton } from './styles'
import { FormEvent, useState } from 'react'

export const Modal = () => {
  const {
    user,
    updateUserName,
    updateUserColor,
    updateTableColor,
    updateCardsHighlight,
    updateCardSize,
    interfaceSettings: { tableColor, cardSize, highlightCards },
  } = useGameContext()
  const [opened, { open, close }] = useDisclosure(false)
  const [username, setUsername] = useState(user.name)

  const tableColors = Object.entries(theme.tableColors).map(
    ([name, value]) => ({ name, value })
  )

  const userColors = Object.entries(theme.customColors).map(
    ([name, value]) => ({ name, value })
  )

  function handleUserName(e: FormEvent) {
    e.preventDefault()
    if (!username) return
    updateUserName(username)
    close()
  }

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
          <form onSubmit={handleUserName}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
              <label htmlFor='name'>Seu nome:</label>
              <Input
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
              <Button type='submit' disabled={!username}>
                Aplicar
              </Button>
            </div>
          </form>

          <div>
            <label htmlFor='userColor'>
              Cor das suas fichas e cartas (visível para todos):
            </label>

            <ColorList id='userColor'>
              {userColors.map((item) => (
                <ColorButton
                  key={item.name}
                  background={item.value}
                  isSelected={user.chipColor === item.name}
                  onClick={() => updateUserColor(item.name as CustomColor)}
                />
              ))}
            </ColorList>
          </div>

          <div>
            <label htmlFor='tableColor'>
              Cor de fundo da mesa (apenas para você):
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

          <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
            <label htmlFor='cardSize'>
              Tamanho das cartas (apenas para você):
            </label>
            <Slider
              id='cardSize'
              name='cardSize'
              min={16}
              max={34}
              step={2}
              value={cardSize.multiplier}
              onChange={(value) => updateCardSize(value)}
              style={{ width: '30%' }}
            />
            <span>{cardSize.multiplier}</span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
            <label htmlFor='highlightCards'>Destacar cartas colocáveis</label>
            <Checkbox
              id='highlightCards'
              checked={highlightCards}
              onChange={(e) => updateCardsHighlight(e.target.checked)}
            />
          </div>
        </ModalContent>
      </MantineModal>

      <OpenModalButton onClick={open}>
        <GearSix size={40} weight='duotone' />
      </OpenModalButton>
    </>
  )
}
