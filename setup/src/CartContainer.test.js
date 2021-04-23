import React from 'react';
import { render, wait, cleanup, act, screen } from "@testing-library/react";
import CartContainer from './CartContainer';
import { AppProvider, AppContext } from './context';
import "@testing-library/jest-dom/extend-expect";


afterEach(cleanup);

const renderWithContext = (
  component) => {
  return {
    ...render(
        <AppProvider value={AppContext}>
            {component}
        </AppProvider>)
  }
}


global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () =>
      Promise.resolve([{
        id: 1,
        title: 'Samsung Galaxy S7',
        price: 599.99,
        img:
          'https://res.cloudinary.com/diqqf3eq2/image/upload/v1583368215/phone-2_ohtt5s.png',
        amount: 1,
      },
      {
        id: 2,
        title: 'google pixel ',
        price: 499.99,
        img:
          'https://res.cloudinary.com/diqqf3eq2/image/upload/v1583371867/phone-1_gvesln.png',
        amount: 1,
      }
    ])
  })
)


describe('app', () => {
  it('should fetch the data form the API', async() => {
    await wait(async() => renderWithContext(<CartContainer/>));

    expect(screen.getByText("Samsung Galaxy S7")).toBeInTheDocument();
  })
})

