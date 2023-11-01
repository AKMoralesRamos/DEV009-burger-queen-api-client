it('should redirect to home page when valid email and password are entered', () => {
    // Mock the fetch function
    jest.spyOn(global, 'fetch').mockImplementation(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve({ accessToken: 'validToken' }),
      })
    );

    // Mock the navigate function
    const mockNavigate = jest.fn();
    jest.mock('react-router-dom', () => ({
      useNavigate: () => mockNavigate,
    }));

    // Render the component and simulate user input
    const { getByLabelText, getByText } = render(<FormLogin />);
    fireEvent.change(getByLabelText('Email'), { target: { value: 'test@example.com' } });
    fireEvent.change(getByLabelText('Contraseña'), { target: { value: 'password' } });

    // Simulate button click
    fireEvent.click(getByText('Iniciar sesión'));

    // Assert that the navigate function was called with the correct path
    expect(mockNavigate).toHaveBeenCalledWith('/home');

    // Restore the original fetch function
    global.fetch.mockRestore();
  });