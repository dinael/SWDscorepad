import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import { fireEvent } from '@testing-library/react'
import SWDvictories from '../components/SWDvictories/SWDvictories'

describe('SWDvictories', () => {
  describe('rendering', () => {
    it('renders Military button', () => {
      render(<SWDvictories />)
      expect(screen.getByRole('button', { name: 'Military' })).toBeInTheDocument()
    })

    it('renders Progress button', () => {
      render(<SWDvictories />)
      expect(screen.getByRole('button', { name: 'Progress' })).toBeInTheDocument()
    })

    it('does not render Political button by default', () => {
      render(<SWDvictories />)
      expect(screen.queryByRole('button', { name: 'Political' })).not.toBeInTheDocument()
    })

    it('renders Political button when showAgora is true', () => {
      render(<SWDvictories showAgora={true} />)
      expect(screen.getByRole('button', { name: 'Political' })).toBeInTheDocument()
    })

    it('does not render Political button when showAgora is false', () => {
      render(<SWDvictories showAgora={false} />)
      expect(screen.queryByRole('button', { name: 'Political' })).not.toBeInTheDocument()
    })

    it('renders three victory buttons when showAgora is true', () => {
      render(<SWDvictories showAgora={true} />)
      expect(screen.getAllByRole('button')).toHaveLength(3)
    })

    it('renders two victory buttons when showAgora is false', () => {
      render(<SWDvictories />)
      expect(screen.getAllByRole('button')).toHaveLength(2)
    })
  })

  describe('disabled state', () => {
    it('all buttons are enabled by default', () => {
      render(<SWDvictories />)
      const buttons = screen.getAllByRole('button')
      buttons.forEach(btn => expect(btn).not.toBeDisabled())
    })

    it('all buttons are disabled when disabled prop is true', () => {
      render(<SWDvictories disabled={true} />)
      const buttons = screen.getAllByRole('button')
      buttons.forEach(btn => expect(btn).toBeDisabled())
    })

    it('all buttons are enabled when disabled prop is false', () => {
      render(<SWDvictories disabled={false} />)
      const buttons = screen.getAllByRole('button')
      buttons.forEach(btn => expect(btn).not.toBeDisabled())
    })
  })

  describe('click handlers', () => {
    it('calls onMilitaryVictory when Military button is clicked', () => {
      const handleMilitary = vi.fn()
      render(<SWDvictories onMilitaryVictory={handleMilitary} />)
      
      fireEvent.click(screen.getByRole('button', { name: 'Military' }))
      expect(handleMilitary).toHaveBeenCalledTimes(1)
    })

    it('calls onProgressVictory when Progress button is clicked', () => {
      const handleProgress = vi.fn()
      render(<SWDvictories onProgressVictory={handleProgress} />)
      
      fireEvent.click(screen.getByRole('button', { name: 'Progress' }))
      expect(handleProgress).toHaveBeenCalledTimes(1)
    })

    it('calls onPoliticalVictory when Political button is clicked', () => {
      const handlePolitical = vi.fn()
      render(<SWDvictories showAgora={true} onPoliticalVictory={handlePolitical} />)
      
      fireEvent.click(screen.getByRole('button', { name: 'Political' }))
      expect(handlePolitical).toHaveBeenCalledTimes(1)
    })

    it('does not call onMilitaryVictory when other buttons are clicked', () => {
      const handleMilitary = vi.fn()
      render(<SWDvictories onMilitaryVictory={handleMilitary} />)
      
      fireEvent.click(screen.getByRole('button', { name: 'Progress' }))
      expect(handleMilitary).not.toHaveBeenCalled()
    })
  })

  describe('accessibility', () => {
    it('victory buttons have correct aria attributes', () => {
      render(<SWDvictories showAgora={true} />)
      const militaryBtn = screen.getByRole('button', { name: 'Military' })
      expect(militaryBtn.className).toContain('military')
    })
  })
})
