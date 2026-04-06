import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { SWDinput } from '../components/SWDinput/SWDinput'

describe('SWDinput', () => {
  describe('rendering', () => {
    it('renders label text', () => {
      render(<SWDinput id="test" label="Test Label" value="" onChange={() => {}} />)
      expect(screen.getByText('Test Label')).toBeInTheDocument()
    })

    it('renders with correct id and htmlFor', () => {
      render(<SWDinput id="coins" label="Coins" value="" onChange={() => {}} />)
      const input = screen.getByLabelText('Coins')
      expect(input).toHaveAttribute('id', 'coins')
    })

    it('renders with default type text', () => {
      render(<SWDinput id="test" label="Test" value="" onChange={() => {}} />)
      expect(screen.getByRole('textbox')).toHaveAttribute('type', 'text')
    })

    it('renders with type number when specified', () => {
      render(<SWDinput id="test" label="Test" value="" onChange={() => {}} type="number" />)
      expect(screen.getByRole('spinbutton')).toBeInTheDocument()
    })

    it('displays initial value', () => {
      render(<SWDinput id="test" label="Test" value="42" onChange={() => {}} />)
      expect(screen.getByDisplayValue('42')).toBeInTheDocument()
    })

    it('displays placeholder text', () => {
      render(<SWDinput id="test" label="Test" value="" onChange={() => {}} placeholder="Enter value" />)
      expect(screen.getByPlaceholderText('Enter value')).toBeInTheDocument()
    })

    it('renders image when provided', () => {
      render(<SWDinput id="test" label="Test" value="" onChange={() => {}} image="/test.png" />)
      const img = document.querySelector('img')
      expect(img).toBeInTheDocument()
      expect(img).toHaveAttribute('alt', 'Test')
      expect(img).toHaveAttribute('aria-hidden', 'true')
    })

    it('does not render image when not provided', () => {
      render(<SWDinput id="test" label="Test" value="" onChange={() => {}} />)
      expect(screen.queryByRole('img')).not.toBeInTheDocument()
    })
  })

  describe('states', () => {
    it('is disabled when readOnly is true', () => {
      render(<SWDinput id="test" label="Test" value="" onChange={() => {}} readOnly={true} />)
      expect(screen.getByRole('textbox')).toBeDisabled()
    })

    it('is enabled when readOnly is false', () => {
      render(<SWDinput id="test" label="Test" value="" onChange={() => {}} readOnly={false} />)
      expect(screen.getByRole('textbox')).not.toBeDisabled()
    })

    it('is enabled by default', () => {
      render(<SWDinput id="test" label="Test" value="" onChange={() => {}} />)
      expect(screen.getByRole('textbox')).not.toBeDisabled()
    })
  })

  describe('accessibility', () => {
    it('has aria-describedby for label', () => {
      render(<SWDinput id="test" label="Test" value="" onChange={() => {}} />)
      const input = screen.getByRole('textbox')
      expect(input).toHaveAttribute('aria-describedby', 'label-test')
    })

    it('has correct maxLength attribute', () => {
      render(<SWDinput id="test" label="Test" value="" onChange={() => {}} maxLength={5} />)
      expect(screen.getByRole('textbox')).toHaveAttribute('maxlength', '5')
    })

    it('has default maxLength of 2', () => {
      render(<SWDinput id="test" label="Test" value="" onChange={() => {}} />)
      expect(screen.getByRole('textbox')).toHaveAttribute('maxlength', '2')
    })
  })
})
