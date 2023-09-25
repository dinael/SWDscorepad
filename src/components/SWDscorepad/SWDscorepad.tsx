import { useState, ChangeEvent, FC, useEffect } from 'react'
import { initialInputs, agoraInputs, pantheonInputs } from '../../data/inputValues'

import SWDInput from '../SWDinput/SWDInput'
import SWDvictories from '../SWDvictories/SWDvictories'

export type SWDscorepadProps = {
  name: string
  showAgora?: boolean
  showPantheon?: boolean
  onUpdateTotal: (total: number) => void
}

export const SWDscorepad: FC<SWDscorepadProps> = ({
  name,
  showAgora = false,
  showPantheon = false,
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
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
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
          <SWDInput
            key={input.id}
            label={input.label}
            type="number"
            id={input.id}
            onChange={(event) => handleChange(event, input.id)}
            value={inputValues[input.id]}
            image={input.image}
            placeholder={input.placeholder}
          />
        ))}
        {showAgora && (
          <>
            <p>Agora</p>
            {agoraInputs.map((input) => (
              <SWDInput
                key={input.id}
                label={input.label}
                type="number"
                id={input.id}
                onChange={(event) => handleChange(event, input.id)}
                value={inputValues[input.id]}
                image={input.image}
                placeholder={input.placeholder}
              />
            ))}
          </>
        )}
        {showPantheon && (
          <>
            <p>Pantheon</p>
            {pantheonInputs.map((input) => (
              <SWDInput
                key={input.id}
                label={input.label}
                type="number"
                id={input.id}
                onChange={(event) => handleChange(event, input.id)}
                value={inputValues[input.id]}
                image={input.image}
                placeholder={input.placeholder}
              />
            ))}
          </>
        )}
        <output>Total: {total}</output>
        <SWDvictories showAgora={showAgora}></SWDvictories>
      </div>
    </>
  )
}

export default SWDscorepad
