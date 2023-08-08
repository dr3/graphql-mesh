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
            v1_pet_by_petId(petId: "pet200") {
              paymentOffers {
                ... on v1_Offer {
                  id
                }
                ... on v1_FancyOffer {
                  id
                  issuers {
                    id
                  }
                }
              }
            }
          }
        `,
      }),
    });

    const json = await response.json();
    expect(json).toEqual({
      data: {
        v1_pet_by_petId: {
          "paymentOffers": [
            {
              "id": "hey",
            },
          ],
        }
      }
    });
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
            v1_pet_by_petId_extended(petId: "pet200") {
              paymentOffers {
                ... on v1_Offer {
                  id
                }
                ... on v1_FancyOffer {
                  id
                  issuers {
                    id
                  }
                }
              }
            }
          }
        `,
      }),
    });

    const json = await response.json();
    expect(json).toEqual({
      data: {
        v1_pet_by_petId: {
          "paymentOffers": [
            {
              "id": "hey",
            },
          ],
        }
      }
    });
  });
});
