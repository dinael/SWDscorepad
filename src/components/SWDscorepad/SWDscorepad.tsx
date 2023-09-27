import { useState, ChangeEvent, FC, useEffect } from 'react'
import { initialInputs, agoraInputs, pantheonInputs } from '../../data/inputValues'

import SWDinput from '../SWDinput/SWDinput'

export type SWDscorepadProps = {
  name: string
  showAgora?: boolean
  showPantheon?: boolean
  readOnly?: boolean
  onUpdateTotal: (total: number) => void
}

export const SWDscorepad: FC<SWDscorepadProps> = ({
  name,
  showAgora = false,
  showPantheon = false,
  readOnly,
  onUpdateTotal,
}: SWDscorepadProps) => {
  const [inputValues, setInputValues] = useState<{ [id: string]: string }>(() => {
    const initialInputValues: { [id: string]: string } = {}
    for (const input of initialInputs) {
      initialInputValues[input.id] = input.value || ''
    }
    for (const input of agoraInputs) {
      initialInputValues[input.id] = input.value || ''
    }
    for (const input of pantheonInputs) {
      initialInputValues[input.id] = input.value || ''
    }
    return initialInputValues
  })

  const handleChange = (event: ChangeEvent<HTMLInputElement>, id: string) => {
    const newValue = event.target.value
    setInputValues((prevInputValues) => ({
      ...prevInputValues,
      [id]: newValue
    }))
  }

  const calculateTotal = () => {
    let total = 0
    for (const input of initialInputs) {
      if (inputValues[input.id] !== '') {
        total += parseFloat(inputValues[input.id]) || 0
      }
    }
    for (const input of agoraInputs) {
      if (inputValues[input.id] !== '') {
        total += parseFloat(inputValues[input.id]) || 0
      }
    }
    for (const input of pantheonInputs) {
      if (inputValues[input.id] !== '') {
        total += parseFloat(inputValues[input.id]) || 0
      }
    }
    return total
  }

  const total = calculateTotal()

  useEffect(() => {
    onUpdateTotal(total)
  }, [total, onUpdateTotal])

  return (
    <>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', margin: '0 auto' }}>
        <h2 style={{ display: 'none' }}>{name}</h2>
        {initialInputs.map((input) => (
          <SWDinput
            key={input.id}
            label={input.label}
            type="number"
            id={input.id}
            onChange={(event) => handleChange(event, input.id)}
            value={inputValues[input.id]}
            image={input.image}
            placeholder={input.placeholder}
            readOnly={readOnly}
          />
        ))}
        {showAgora && (
          <>
            <p>Agora</p>
            {agoraInputs.map((input) => (
              <SWDinput
                key={input.id}
                label={input.label}
                type="number"
                id={input.id}
                onChange={(event) => handleChange(event, input.id)}
                value={inputValues[input.id]}
                image={input.image}
                placeholder={input.placeholder}
                readOnly={readOnly}
              />
            ))}
          </>
        )}
        {showPantheon && (
          <>
            <p>Pantheon</p>
            {pantheonInputs.map((input) => (
              <SWDinput
                key={input.id}
                label={input.label}
                type="number"
                id={input.id}
                onChange={(event) => handleChange(event, input.id)}
                value={inputValues[input.id]}
                image={input.image}
                placeholder={input.placeholder}
                readOnly={readOnly}
              />
            ))}
          </>
        )}
        <output style={{ display: 'none' }} aria-hidden="true">Total: {total}</output>
      </div>
    </>
  )
}

export default SWDscorepad
