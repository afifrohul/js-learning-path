import React from 'react';
import { describe, it, expect, afterEach, vi } from 'vitest';
import { cleanup, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import matchers from '@testing-library/jest-dom/matchers';
import { MemoryRouter } from 'react-router-dom';
import SignupInput from '@/components/signup-input';

expect.extend(matchers);

describe('signup-input component', () => {
  afterEach(() => {
    cleanup();
  });

  it('should handle name typing correctly', async () => {
    // arrange
    render(
      <MemoryRouter>
        <SignupInput signup={() => {}} />
      </MemoryRouter>,
    );
    const nameInput = screen.getByPlaceholderText('John Doe');

    // action
    await userEvent.type(nameInput, 'Afif Rohul');

    // assert
    expect(nameInput).toHaveValue('Afif Rohul');
  });

  it('should handle email typing correctly', async () => {
    // arrange
    render(
      <MemoryRouter>
        <SignupInput signup={() => {}} />
      </MemoryRouter>,
    );
    const emailInput = screen.getByPlaceholderText('m@example.com');

    // action
    await userEvent.type(emailInput, 'emailtest@gmail.com');

    // assert
    expect(emailInput).toHaveValue('emailtest@gmail.com');
  });

  it('should handle password typing correctly', async () => {
    // arrange
    render(
      <MemoryRouter>
        <SignupInput signup={() => {}} />
      </MemoryRouter>,
    );
    const passwordInput = screen.getByPlaceholderText('password');

    // action
    await userEvent.type(passwordInput, 'password');

    // assert
    expect(passwordInput).toHaveValue('password');
  });

  it('should call signup function when login button is clicked', async () => {
    // arrange
    const mockSignup = vi.fn();
    render(
      <MemoryRouter>
        <SignupInput signup={mockSignup} />
      </MemoryRouter>,
    );

    const nameInput = screen.getByPlaceholderText('John Doe');
    await userEvent.type(nameInput, 'Afif Rohul');

    const emailInput = screen.getByPlaceholderText('m@example.com');
    await userEvent.type(emailInput, 'emailtest@gmail.com');

    const passwordInput = screen.getByPlaceholderText('password');
    await userEvent.type(passwordInput, 'password');

    const registerButton = screen.getByRole('button', {
      name: 'Create Account',
    });

    // action
    await userEvent.click(registerButton);

    // assert
    expect(mockSignup).toHaveBeenCalledWith({
      name: 'Afif Rohul',
      email: 'emailtest@gmail.com',
      password: 'password',
    });
  });
});
