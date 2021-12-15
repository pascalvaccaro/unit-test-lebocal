import { rest } from 'msw';
import * as data from './data.json';

export const handlers = [
  rest.get("https://api.openweathermap.org/data/2.5/onecall", (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json(data),
      ctx.delay(),
      // ctx.delay('infinite'),
      // ctx.delay()
    )
  })
];