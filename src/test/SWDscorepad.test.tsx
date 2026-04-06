import { describe, it, expect, vi } from 'vitest'
import { render, screen, waitFor } from '@testing-library/react'
import { SWDscorepad } from '../components/SWDscorepad/SWDscorepad'
import { fireEvent } from '@testing-library/react'

describe('SWDscorepad', () => {
  describe('rendering', () => {
    it('renders with player name in sr-only heading', () => {
      render(<SWDscorepad name="Player 1" onUpdateTotal={() => {}} />)
      expect(screen.getByText("Player 1's scorepad")).toHaveClass('sr-only')
    })

    it('renders all initial inputs', () => {
      render(<SWDscorepad name="Player 1" onUpdateTotal={() => {}} />)
      const inputs = screen.getAllByRole('spinbutton')
      expect(inputs.length).toBeGreaterThan(0)
    })

    it('does not render Agora section by default', () => {
      render(<SWDscorepad name="Player 1" onUpdateTotal={() => {}} />)
      expect(screen.queryByText('Agora')).not.toBeInTheDocument()
    })

    it('does not render Pantheon section by default', () => {
      render(<SWDscorepad name="Player 1" onUpdateTotal={() => {}} />)
      expect(screen.queryByText('Pantheon')).not.toBeInTheDocument()
    })

    it('renders Agora section when showAgora is true', () => {
      render(<SWDscorepad name="Player 1" showAgora={true} onUpdateTotal={() => {}} />)
      expect(screen.getByText('Agora')).toBeInTheDocument()
    })

    it('renders Pantheon section when showPantheon is true', () => {
      render(<SWDscorepad name="Player 1" showPantheon={true} onUpdateTotal={() => {}} />)
      expect(screen.getByText('Pantheon')).toBeInTheDocument()
    })

    it('renders both Agora and Pantheon sections when both props are true', () => {
      render(<SWDscorepad name="Player 1" showAgora={true} showPantheon={true} onUpdateTotal={() => {}} />)
      expect(screen.getByText('Agora')).toBeInTheDocument()
      expect(screen.getByText('Pantheon')).toBeInTheDocument()
    })
  })

  describe('input interactions', () => {
    it('calls onUpdateTotal when input changes', async () => {
      const handleUpdateTotal = vi.fn()
      render(<SWDscorepad name="Player 1" onUpdateTotal={handleUpdateTotal} />)
      
      const firstInput = screen.getAllByRole('spinbutton')[0]
      fireEvent.change(firstInput, { target: { value: '5' } })
      
      await waitFor(() => {
        expect(handleUpdateTotal).toHaveBeenCalled()
      })
    })

    it('updates total when input value changes', async () => {
      const handleUpdateTotal = vi.fn()
      render(<SWDscorepad name="Player 1" onUpdateTotal={handleUpdateTotal} />)
      
      const firstInput = screen.getAllByRole('spinbutton')[0]
      fireEvent.change(firstInput, { target: { value: '10' } })
      
      await waitFor(() => {
        expect(handleUpdateTotal).toHaveBeenLastCalledWith(expect.any(Number))
      })
    })

    it('handles multiple input changes', async () => {
      const handleUpdateTotal = vi.fn()
      render(<SWDscorepad name="Player 1" onUpdateTotal={handleUpdateTotal} />)
      
      const inputs = screen.getAllByRole('spinbutton')
      fireEvent.change(inputs[0], { target: { value: '5' } })
      fireEvent.change(inputs[1], { target: { value: '3' } })
      
      await waitFor(() => {
        expect(handleUpdateTotal).toHaveBeenCalledTimes(3)
      })
    })
  })

  describe('readOnly state', () => {
    it('all inputs are editable by default', () => {
      render(<SWDscorepad name="Player 1" onUpdateTotal={() => {}} />)
      const inputs = screen.getAllByRole('spinbutton')
      inputs.forEach(input => expect(input).not.toBeDisabled())
    })

    it('all inputs are disabled when readOnly is true', () => {
      render(<SWDscorepad name="Player 1" readOnly={true} onUpdateTotal={() => {}} />)
      const inputs = screen.getAllByRole('spinbutton')
      inputs.forEach(input => expect(input).toBeDisabled())
    })

    it('inputs are enabled when readOnly is false', () => {
      render(<SWDscorepad name="Player 1" readOnly={false} onUpdateTotal={() => {}} />)
      const inputs = screen.getAllByRole('spinbutton')
      inputs.forEach(input => expect(input).not.toBeDisabled())
    })
  })

  describe('total calculation', () => {
    it('calculates correct total for initial inputs only', async () => {
      const handleUpdateTotal = vi.fn()
      render(<SWDscorepad name="Player 1" onUpdateTotal={handleUpdateTotal} />)
      
      const inputs = screen.getAllByRole('spinbutton')
      fireEvent.change(inputs[0], { target: { value: '5' } })
      fireEvent.change(inputs[1], { target: { value: '3' } })
      
      await waitFor(() => {
        const lastCall = handleUpdateTotal.mock.calls[handleUpdateTotal.mock.calls.length - 1][0]
        expect(lastCall).toBe(8)
      })
    })

    it('includes Agora inputs in total when enabled', async () => {
      const handleUpdateTotal = vi.fn()
      render(<SWDscorepad name="Player 1" showAgora={true} onUpdateTotal={handleUpdateTotal} />)
      
      const inputs = screen.getAllByRole('spinbutton')
      const agoraInput = inputs[inputs.length - 1]
      fireEvent.change(agoraInput, { target: { value: '2' } })
      
      await waitFor(() => {
        expect(handleUpdateTotal).toHaveBeenLastCalledWith(expect.any(Number))
      })
    })
  })

  describe('output accessibility', () => {
    it('has hidden output element with total', () => {
      render(<SWDscorepad name="Player 1" onUpdateTotal={() => {}} />)
      const output = screen.getByText(/Total:/)
      expect(output).toHaveAttribute('aria-hidden', 'true')
    })
  })
})
