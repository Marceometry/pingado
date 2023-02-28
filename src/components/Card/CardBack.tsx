const CARD_BACK_COLOR = '#7070f1'

export const CardBack = () => {
  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        border: `3px solid ${CARD_BACK_COLOR}`,
        padding: '8px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <div
        style={{
          width: '100%',
          height: '100%',
          border: '2px solid black',
          padding: '6px',
        }}
      >
        <div
          style={{
            width: '100%',
            height: '100%',
            backgroundColor: CARD_BACK_COLOR,
          }}
        />
      </div>
    </div>
  )
}
