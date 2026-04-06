import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import { SWDinput } from '../components/SWDinput/SWDinput'
import { fireEvent } from '@testing-library/react'

describe('SWDinput - Edge Cases', () => {
  it('has maxLength attribute', () => {
    render(
      <SWDinput
        id="test"
        label="Test"
        value=""
        onChange={vi.fn()}
        type="text"
        maxLength={3}
      />
    )
    expect(screen.getByRole('textbox')).toHaveAttribute('maxlength', '3')
  })

  it('handles number type with valid input', () => {
    const handleChange = vi.fn()
    render(
      <SWDinput
        id="test"
        label="Test"
        value=""
        onChange={handleChange}
        type="number"
      />
    )
    
    const input = screen.getByRole('spinbutton')
    fireEvent.change(input, { target: { value: '42' } })
    
    expect(handleChange).toHaveBeenCalled()
  })

  it('number input rejects non-numeric characters', () => {
    const handleChange = vi.fn()
    render(
      <SWDinput
        id="test"
        label="Test"
        value=""
        onChange={handleChange}
        type="number"
      />
    )
    
    const input = screen.getByRole('spinbutton')
    fireEvent.change(input, { target: { value: 'abc' } })
    
    expect(handleChange).not.toHaveBeenCalled()
  })

  it('number input accepts positive sign', () => {
    const handleChange = vi.fn()
    render(
      <SWDinput
        id="test"
        label="Test"
        value=""
        onChange={handleChange}
        type="number"
      />
    )
    
    const input = screen.getByRole('spinbutton')
    fireEvent.change(input, { target: { value: '+5' } })
    
    expect(handleChange).toHaveBeenCalled()
  })

  it('handles zero value', () => {
    render(
      <SWDinput
        id="test"
        label="Test"
        value="0"
        onChange={vi.fn()}
        type="number"
      />
    )
    
    expect(screen.getByDisplayValue('0')).toBeInTheDocument()
  })

  it('has min attribute for number type', () => {
    render(
      <SWDinput
        id="test"
        label="Test"
        value=""
        onChange={vi.fn()}
        type="number"
      />
    )
    
    expect(screen.getByRole('spinbutton')).toHaveAttribute('min', '0')
  })

  it('does not have min attribute for text type', () => {
    render(
      <SWDinput
        id="test"
        label="Test"
        value=""
        onChange={vi.fn()}
        type="text"
      />
    )
    
    expect(screen.getByRole('textbox')).not.toHaveAttribute('min')
  })
})
