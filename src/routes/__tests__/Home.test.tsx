import React from 'react';
import { render, screen, fireEvent, waitFor, act } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';

// Mock do hook useAuth para simular usuário autenticado
jest.mock('../../context/AuthProvider', () => ({
  ...jest.requireActual('../../context/AuthProvider'),
  useAuth: () => ({
    user: {
      id: 1,
      nome: 'Usuário Teste',
      email: 'teste@email.com',
      telefone: '123456789',
      endereco: 'Rua Teste',
      photo: 'test.jpg',
      type: 'cliente',
    },
    loading: false,
    login: jest.fn(),
    logout: jest.fn(),
  }),
}));

import Home from '../Home';
import { AuthProvider } from '../../context/AuthProvider';

process.env.VITE_SERVER_URL = 'http://localhost:3000';

// Mock do fetch
global.fetch = jest.fn();

describe('Home Component', () => {
  const mockChefs = {
    data: {
      chefs: [
        {
          id: 1,
          user: {
            name: 'Chef João',
            profile_photo: 'test.jpg'
          },
          specialization: 'Culinária Italiana',
          professional_description: 'Chef especializado em massas'
        }
      ]
    }
  };

  beforeEach(() => {
    (global.fetch as jest.Mock).mockResolvedValue({
      json: () => Promise.resolve(mockChefs)
    });
  });

  const renderHome = async () => {
    let utils;
    await act(async () => {
      utils = render(
        <BrowserRouter>
          <AuthProvider>
            <Home />
          </AuthProvider>
        </BrowserRouter>
      );
    });
    return utils;
  };

  test('renders search input', async () => {
    await renderHome();
    const searchInput = screen.getByPlaceholderText('Buscar Chefs, pratos...');
    expect(searchInput).toBeInTheDocument();
  });

  test('renders cuisine categories', async () => {
    await renderHome();
    expect(screen.getByText('Japonesa')).toBeInTheDocument();
    expect(screen.getByText('Italiana')).toBeInTheDocument();
    expect(screen.getByText('Argentina')).toBeInTheDocument();
    expect(screen.getByText('Brasileira')).toBeInTheDocument();
  });

  test('renders chefs section', async () => {
    await renderHome();
    await waitFor(() => {
      expect(screen.getByText('Chefs Disponíveis')).toBeInTheDocument();
    });
  });

  test('search input updates value', async () => {
    await renderHome();
    const searchInput = screen.getByPlaceholderText('Buscar Chefs, pratos...');
    fireEvent.change(searchInput, { target: { value: 'Italiano' } });
    expect(searchInput).toHaveValue('Italiano');
  });
}); 