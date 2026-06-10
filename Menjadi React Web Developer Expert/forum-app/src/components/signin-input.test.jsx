import React from 'react';
import { describe, it, expect, afterEach, vi } from 'vitest';
import { cleanup, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import matchers from '@testing-library/jest-dom/matchers';
import SigninInput from '@/components/signin-input';
import { MemoryRouter } from 'react-router-dom';

expect.extend(matchers);

describe('signin-input component', () => {
  afterEach(() => {
    cleanup();
  });

  it('should handle email typing correctly', async () => {
    // arrange
    render(
      <MemoryRouter>
        <SigninInput signin={() => {}} />
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
        <SigninInput signin={() => {}} />
      </MemoryRouter>,
    );
    const passwordInput = screen.getByPlaceholderText('password');

    // action
    await userEvent.type(passwordInput, 'password');

    // assert
    expect(passwordInput).toHaveValue('password');
  });

  it('should call signin function when login button is clicked', async () => {
    // arrange
    const mockSignin = vi.fn();
    render(
      <MemoryRouter>
        <SigninInput signin={mockSignin} />
      </MemoryRouter>,
    );

    const emailInput = screen.getByPlaceholderText('m@example.com');
    await userEvent.type(emailInput, 'emailtest@gmail.com');

    const passwordInput = screen.getByPlaceholderText('password');
    await userEvent.type(passwordInput, 'password');

    const loginButton = screen.getByRole('button', {
      name: 'Login',
    });

    // action
    await userEvent.click(loginButton);

    // assert
    expect(mockSignin).toHaveBeenCalledWith({
      email: 'emailtest@gmail.com',
      password: 'password',
    });
  });
});
