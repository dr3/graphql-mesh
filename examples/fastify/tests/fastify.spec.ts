import { fetch } from '@whatwg-node/fetch';
import { app } from '../src/app';
import { upstream } from '../src/upstream';

describe('fastify', () => {
  beforeAll(async () => {
    await app.listen({
      port: 4000,
    });
    await upstream.listen({
      port: 4001,
    });
  });

  afterAll(() => {
    app.close();
    upstream.close();
  });

  it('should work', async () => {
    const response = await fetch('http://localhost:4000/graphql', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query: /* GraphQL */ `
          {
            petByPetId(petId: "pet200") {
              name
              characteristic
            }
          }
        `,
      }),
    });

    const json = await response.json();
    expect(json).toEqual({ data: { petByPetId: { name: 'Bob', characteristic: ["FLUFFY"] } } });
  });

  it('should work extended', async () => {
    const response = await fetch('http://localhost:4000/graphql', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query: /* GraphQL */ `
          {
            petByPetIdExtended(petId: "pet200") {
              name
              characteristic
            }
          }
        `,
      }),
    });

    const json = await response.json();
    expect(json).toEqual({ data: { petByPetIdExtended: { name: 'Bob', characteristic: ["FLUFFY"] } } });
  });

  it('should work too', async () => {
    const response = await fetch('http://localhost:4000/graphql', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query: /* GraphQL */ `
          {
            petByPetId(petId: "pet500") {
              name
              characteristic
            }
          }
        `,
      }),
    });

    const resJson = await response.json();

    expect(resJson).toEqual({
      data: { petByPetId: null },
      errors: [
        {
          message: 'HTTP Error: 500, Could not invoke operation GET /pet/{args.petId}',
          path: ['petByPetId'],
          extensions: {
            request: { url: 'http://localhost:4001/pet/pet500', method: 'GET' },
            responseJson: { error: 'Error' },
          },
        },
      ],
    });
  });
});
