// src/mocks/handlers.js
import { rest } from "msw";
import { BASE_URL, companies, company, jobs } from "../testMockData";

export const handlers = [
  rest.get(`${BASE_URL}/companies/:handle`, (req, res, ctx) => {
    return res(ctx.status(200), ctx.json({ company }));
  }),

  rest.get(`${BASE_URL}/companies`, (req, res, ctx) => {
    return res(ctx.status(200), ctx.json({ companies }));
  }),

  rest.get(`${BASE_URL}/jobs`, (req, res, ctx) => {
    return res(ctx.status(200), ctx.json({ jobs }));
  }),
];
