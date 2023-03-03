import { GearSix } from 'phosphor-react'
import { useDisclosure } from '@mantine/hooks'
import { Modal as MantineModal } from '@mantine/core'
import { useGameContext } from '@/contexts'
import { CustomColor, TableBackgroundColor, theme } from '@/styles'
import { OpenModalButton } from './styles'

export const Modal = () => {
  const {
    interfaceSettings: { tableColor },
    user: { chipColor },
    updateTableColor,
    updateUserColor,
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
        <div
          style={{
            paddingTop: 16,
            gap: 32,
            display: 'grid',
            placeItems: 'center',
          }}
        >
          <div>
            <label htmlFor='tableColor'>
              Cor de fundo da mesa (visível apenas para você):
            </label>

            <div
              id='tableColor'
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: 10,
                marginTop: 16,
              }}
            >
              {tableColors.map((item) => (
                <button
                  key={item.name}
                  style={{
                    width: 50,
                    height: 50,
                    fontSize: 0,
                    background: item.value,
                    borderRadius: 8,
                    border: '2px solid transparent',
                    borderColor:
                      tableColor === item.name ? 'white' : 'transparent',
                    transition: 'border-color 0.2s',
                  }}
                  onClick={() =>
                    updateTableColor(item.name as TableBackgroundColor)
                  }
                />
              ))}
            </div>
          </div>
          <div>
            <label htmlFor='userColor'>
              Cor das suas fichas e cartas (visível para todos):
            </label>

            <div
              id='userColor'
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: 10,
                marginTop: 16,
              }}
            >
              {userColors.map((item) => (
                <button
                  key={item.name}
                  style={{
                    width: 50,
                    height: 50,
                    fontSize: 0,
                    background: item.value,
                    borderRadius: 8,
                    border: '2px solid transparent',
                    borderColor:
                      chipColor === item.name ? 'white' : 'transparent',
                    transition: 'border-color 0.2s',
                  }}
                  onClick={() => updateUserColor(item.name as CustomColor)}
                />
              ))}
            </div>
          </div>
        </div>
      </MantineModal>

      <OpenModalButton onClick={open}>
        <GearSix size={40} weight='duotone' />
      </OpenModalButton>
    </>
  )
}
