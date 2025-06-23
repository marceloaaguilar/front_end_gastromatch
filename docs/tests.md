# Documentação de Testes

## Configuração

O projeto utiliza as seguintes ferramentas para testes:

- Jest: Framework de testes
- React Testing Library: Biblioteca para testar componentes React
- @testing-library/jest-dom: Extensões do Jest para DOM
- @testing-library/react: Utilitários para testar componentes React
- @testing-library/user-event: Simulação de eventos do usuário

## Estrutura de Testes

Os testes estão organizados da seguinte forma:

```
src/
  ├── __tests__/           # Diretório para arquivos de teste
  │   └── Home.test.tsx    # Testes do componente Home
  ├── setupTests.ts        # Configuração global dos testes
  └── ...
```

## Configuração do Jest

O Jest está configurado no arquivo `jest.config.js` com as seguintes configurações:

```javascript
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/src/setupTests.ts'],
  moduleNameMapper: {
    '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
    '\\.(gif|ttf|eot|svg|png)$': '<rootDir>/__mocks__/fileMock.js',
  },
  transform: {
    '^.+\\.(ts|tsx)$': 'babel-jest',
  },
  testMatch: ['**/__tests__/**/*.ts?(x)', '**/?(*.)+(spec|test).ts?(x)'],
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  transformIgnorePatterns: [
    'node_modules/(?!(react-router|react-router-dom)/)',
  ],
  globals: {
    'ts-jest': {
      useESM: true,
    },
  },
  moduleDirectories: ['node_modules', 'src'],
};
```

## Configuração do Setup

O arquivo `setupTests.ts` configura o ambiente de testes:

```typescript
import '@testing-library/jest-dom';
import React from 'react';

// Polyfill para TextEncoder
global.TextEncoder = require('util').TextEncoder;
global.TextDecoder = require('util').TextDecoder;

// Mock para import.meta.env
global.import = {
  meta: {
    env: {
      VITE_SERVER_URL: 'http://localhost:3000',
    },
  },
};
```

## Comandos de Teste

```bash
# Executar testes
npm test

# Executar testes em modo watch
npm run test:watch

# Executar testes com cobertura
npm run test:coverage
```

## Relatório de Cobertura

O relatório de cobertura de testes é gerado em:
```
coverage/lcov-report/index.html
```

Este relatório mostra:
- Porcentagem de cobertura de declarações
- Porcentagem de cobertura de branches
- Porcentagem de cobertura de funções
- Porcentagem de cobertura de linhas
- Linhas não cobertas por arquivo

## Boas Práticas

1. **Organização dos Testes**
   - Mantenha os testes próximos aos componentes que eles testam
   - Use o padrão de nomenclatura `*.test.tsx` ou `*.spec.tsx`

2. **Estrutura dos Testes**
   - Use `describe` para agrupar testes relacionados
   - Use `test` ou `it` para casos de teste individuais
   - Use `beforeEach` e `afterEach` para setup e cleanup

3. **Testando Componentes**
   - Teste o comportamento, não a implementação
   - Use queries do React Testing Library
   - Simule interações do usuário com `userEvent`

4. **Mocking**
   - Use `jest.mock()` para mockar módulos
   - Use `jest.fn()` para mockar funções
   - Use `jest.spyOn()` para espionar métodos

## Exemplo de Teste

```typescript
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Home from '../Home';

describe('Home Component', () => {
  test('renders search input', () => {
    render(
      <BrowserRouter>
        <Home />
      </BrowserRouter>
    );
    const searchInput = screen.getByPlaceholderText('Buscar Chefs, pratos...');
    expect(searchInput).toBeInTheDocument();
  });
});
``` 