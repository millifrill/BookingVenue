import { API_URL } from '../../src/utils/constants.ts';

describe('Cities', () => {
  it('Given the seeded database, When the cities are fetched, Then every city is returned in alphabetical order', () => {
    cy.request('GET', `${API_URL}/cities`).then((response) => {
      expect(response.status).to.equal(200);

      const names = response.body.map((city: { name: string }) => city.name);
      expect(names).to.deep.equal([
        'Göteborg',
        'Linköping',
        'Malmö',
        'Stockholm',
        'Umeå',
        'Uppsala',
        'Örebro',
      ]);
      expect(response.body[0]).to.have.all.keys('cityId', 'name');
    });
  });
});
