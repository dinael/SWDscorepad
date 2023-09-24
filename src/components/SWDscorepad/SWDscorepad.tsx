import { useState, ChangeEvent, FC } from 'react'
import { SWDInput } from '../SWDinput/SWDinput'
import SWDvictories from '../SWDvictories/SWDvictories';
import { initialInputs, agoraInputs, pantheonInputs, InputItem } from '../../data/inputValues'

// import total from '../../assets/images/total'

export type SWDscorepadProps = {
  name: string
  showAgora?: boolean
  showPantheon?: boolean
}

export const SWDscorepad: FC<SWDscorepadProps> = ({
  name,
  showAgora = false,
  showPantheon = false,
}: SWDscorepadProps) => {
  const [inputs, setInputs] = useState<InputItem[]>(initialInputs)
  const [agoraInputsState, setAgoraInputs] = useState<InputItem[]>(agoraInputs)
  const [pantheonInputsState, setPantheonInputs] = useState<InputItem[]>(pantheonInputs)

  const handleChange = (event: ChangeEvent<HTMLInputElement>, id: string) => {
    const newInputs = [...inputs]
    const index = newInputs.findIndex((input) => input.id === id)
    if (index !== -1) {
      newInputs[index].value = event.target.value
      setInputs(newInputs)
    }
  }

  const handleAgoraInputChange = (
    event: ChangeEvent<HTMLInputElement>,
    id: string
  ) => {
    const newAgoraInputs = [...agoraInputsState]
    const index = newAgoraInputs.findIndex((input) => input.id === id)
    if (index !== -1) {
      newAgoraInputs[index].value = event.target.value
      setAgoraInputs(newAgoraInputs)
    }
  }

  const handlePantheonInputChange = (
    event: ChangeEvent<HTMLInputElement>,
    id: string
  ) => {
    const newPantheonInputs = [...pantheonInputsState]
    const index = newPantheonInputs.findIndex((input) => input.id === id)
    if (index !== -1) {
      newPantheonInputs[index].value = event.target.value
      setPantheonInputs(newPantheonInputs)
    }
  }

  const calculateTotal = () => {
    let total = 0
    for (const input of inputs) {
      if (input.value !== '') {
        total += parseFloat(input.value) || 0
      }
    }
    for (const input of agoraInputsState) {
      if (input.value !== '') {
        total += parseFloat(input.value) || 0
      }
    }
    for (const input of pantheonInputsState) {
      if (input.value !== '') {
        total += parseFloat(input.value) || 0
      }
    }
    return total
  }

  const total = calculateTotal()

  return (
    <>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', margin: '0 auto' }}>
        <h2 style={{ display: 'none' }}>{name}</h2>
        {inputs.map((input) => (
          <SWDInput
            key={input.id}
            label={input.label}
            type="number"
            id={input.id}
            onChange={(value) => handleChange(value, input.id)}
            value={input.value}
            image={input.image}
            placeholder={input.placeholder}
          />
        ))}
        {showAgora && (
          <>
            <p>Agora</p>
            {agoraInputsState.map((input) => (
              <SWDInput
                key={input.id}
                label={input.label}
                type="number"
                id={input.id}
                onChange={(e) => handleAgoraInputChange(e, input.id)}
                value={input.value}
                image={input.image}
                placeholder={input.placeholder}
              />
            ))}
          </>
        )}
        {showPantheon && (
          <>
            <p>Pantheon</p>
            {pantheonInputsState.map((input) => (
              <SWDInput
                key={input.id}
                label={input.label}
                type="number"
                id={input.id}
                onChange={(e) => handlePantheonInputChange(e, input.id)}
                value={input.value}
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
