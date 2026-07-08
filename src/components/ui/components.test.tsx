import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { Button } from './Button';
import { Input } from './Input';

describe('UI Component Library', () => {
  describe('Button Component', () => {
    it('renders text content correctly', () => {
      render(<Button>Click me</Button>);
      expect(screen.getByRole('button', { name: /click me/i })).toBeInTheDocument();
    });

    it('handles click events', () => {
      const handleClick = vi.fn();
      render(<Button onClick={handleClick}>Click me</Button>);
      fireEvent.click(screen.getByRole('button'));
      expect(handleClick).toHaveBeenCalledTimes(1);
    });

    it('renders loading spinner and disables click when isLoading is true', () => {
      const handleClick = vi.fn();
      render(
        <Button isLoading onClick={handleClick}>
          Submit
        </Button>
      );
      const button = screen.getByRole('button');
      expect(button).toBeDisabled();
      fireEvent.click(button);
      expect(handleClick).not.toHaveBeenCalled();
    });
  });

  describe('Input Component', () => {
    it('binds label and description helpers correctly', () => {
      render(
        <Input
          label="Username"
          helperText="Enter your corporate ID"
          placeholder="User ID"
        />
      );
      expect(screen.getByLabelText(/username/i)).toBeInTheDocument();
      expect(screen.getByText(/enter your corporate ID/i)).toBeInTheDocument();
    });

    it('displays error message and sets aria-invalid when error is present', () => {
      render(<Input label="Email" error="Invalid email domain" />);
      const input = screen.getByLabelText(/email/i);
      expect(input).toHaveAttribute('aria-invalid', 'true');
      expect(screen.getByRole('alert')).toHaveTextContent(/invalid email domain/i);
    });
  });
});
