# Guia de Testes - GastroMatch Frontend

Este documento fornece instruções sobre como executar e entender os testes do projeto GastroMatch Frontend.

## Configuração do Ambiente

O projeto utiliza as seguintes ferramentas de teste:
- Jest: Framework de teste
- React Testing Library: Biblioteca para testar componentes React
- Jest DOM: Extensões do Jest para testar o DOM

## Acesse o pasta no diretório
Se você está na raiz do projeto ou seja ```\plf-es-2025-1-ti5-0492100-gastromatch```, rode o comando:
```bash
cd code\new_frontend
```

## Scripts Disponíveis

No `package.json`, temos os seguintes scripts para testes:

```bash
npm test           # Executa todos os testes uma vez
npm run test:watch # Executa os testes em modo watch (atualiza automaticamente)
npm run test:coverage # Executa os testes e gera relatório de cobertura
```
Rode o comando abaixo para ver o relatório
```bash
start coverage/lcov-report/index.html
```
Ou rode o teste e ja abra o relatório pelo comando
```bash
npm run test:coverage && start coverage/lcov-report/index.html
```

## Onde rodar os testes?

Abra o terminal e navegue até a pasta do frontend antes de rodar os comandos de teste:

```bash
cd code/new_frontend
```

Depois disso, execute qualquer um dos comandos de teste mostrados acima.

## Estrutura dos Testes

Os testes estão organizados da seguinte forma:
- `src/routes/__tests__/`: Testes dos componentes de rota
- `__mocks__/`: Arquivos de mock para recursos estáticos
- `src/setupTests.ts`: Configuração global dos testes

## Exemplo de Teste

Aqui está um exemplo de como os testes são estruturados:

```typescript
// Exemplo do Home.test.tsx
describe('Home Component', () => {
  // Configuração do mock
  beforeEach(() => {
    // Setup antes de cada teste
  });

  // Função auxiliar para renderizar o componente
  const renderHome = () => {
    return render(
      <BrowserRouter>
        <AuthProvider>
          <Home />
        </AuthProvider>
      </BrowserRouter>
    );
  };

  // Casos de teste
  test('renders search input', () => {
    renderHome();
    const searchInput = screen.getByPlaceholderText('Buscar Chefs, pratos...');
    expect(searchInput).toBeInTheDocument();
  });
});
```

## Tipos de Testes Implementados

1. **Testes de Renderização**
   - Verifica se os componentes são renderizados corretamente
   - Exemplo: Teste do campo de busca e categorias de culinária

2. **Testes de Interação**
   - Verifica se as interações do usuário funcionam
   - Exemplo: Teste de atualização do campo de busca

3. **Testes Assíncronos**
   - Verifica comportamentos assíncronos
   - Exemplo: Teste de carregamento de chefs

## Como Adicionar Novos Testes

1. Crie um arquivo `.test.tsx` ou `.spec.tsx` no diretório `__tests__` correspondente
2. Importe as dependências necessárias:
   ```typescript
   import { render, screen, fireEvent } from '@testing-library/react';
   import '@testing-library/jest-dom';
   ```
3. Escreva seus testes usando o padrão:
   ```typescript
   describe('Nome do Componente', () => {
     test('descrição do teste', () => {
       // Arrange
       // Act
       // Assert
     });
   });
   ```

## Boas Práticas

1. **Organização**
   - Mantenha os testes próximos aos componentes que testam
   - Use nomes descritivos para os testes
   - Agrupe testes relacionados em blocos `describe`

2. **Mocking**
   - Use mocks para dependências externas
   - Mock de APIs e recursos estáticos
   - Exemplo: `global.fetch = jest.fn()`

3. **Assertions**
   - Use assertions específicas e descritivas
   - Prefira testar comportamentos em vez de implementações
   - Exemplo: `expect(element).toBeInTheDocument()`

## Solução de Problemas

Se encontrar erros ao rodar os testes:

1. Verifique se todas as dependências estão instaladas:
   ```bash
   npm install
   ```

2. Limpe o cache do Jest:
   ```bash
   npm test -- --clearCache
   ```

3. Verifique se o arquivo `jest.config.js` está configurado corretamente

4. Certifique-se de que o arquivo `setupTests.ts` está importando todas as extensões necessárias

## Cobertura de Testes

Para verificar a cobertura de testes:
```bash
npm run test:coverage
```

Isso gerará um relatório detalhado mostrando:
- Porcentagem de código coberto
- Arquivos testados
- Linhas não cobertas

## Contribuindo com Testes

Ao adicionar novos testes:
1. Siga o padrão existente
2. Mantenha os testes focados e isolados
3. Use mocks apropriadamente
4. Documente casos especiais ou complexos 