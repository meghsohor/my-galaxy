import React from 'react'
import { MemoryRouter } from 'react-router-dom';
import { rest } from 'msw'
import { setupServer } from 'msw/node'
import { render, waitFor, screen } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import Universes from './Universes';

const handlers = [
  rest.get('http://localhost:5000/universes', (req, res, ctx) => {
    return res(ctx.json([
      {
        "id": 333,
        "maxSize": 3,
        "name": "Big universe"
      }
    ]))
  }),
  rest.get('http://localhost:5000/stars', (req, res, ctx) => {
    return res(ctx.json([
      {
        "color": "RED",
        "id": 123,
        "name": "My happy star 123",
        "universeId": 333
      }
    ]))
  })
];

const server = setupServer(...handlers);

beforeAll(() => server.listen())
afterEach(() => server.resetHandlers())
afterAll(() => server.close())

test('Fetches and displays data', async () => {
  render(
    <MemoryRouter>
      <Universes />
    </MemoryRouter>
  );
  expect(screen.getByTestId('loading')).toBeInTheDocument();

  const universesTable = await waitFor(() => screen.getByTestId('universe-table'));

  expect(universesTable).toBeInTheDocument();
});

test('handles server error', async () => {
  server.use(
    rest.get('http://localhost:5000/universes', (req, res, ctx) => {
      return res(ctx.status(404))
    })
  )

  render(
    <MemoryRouter>
      <Universes />
    </MemoryRouter>
  );

  await waitFor(() => screen.getByTestId('no-data'))

  expect(screen.getByTestId('no-data')).toBeInTheDocument();
})