// // src/mocks/handlers.js
// import { rest } from "msw";
// import { BASE_URL, companies, company, jobs, userCtx } from "../testMockData";

// export const handlers = [
//   rest.get(`${BASE_URL}/companies/:handle`, (req, res, ctx) => {
//     return res(ctx.status(200), ctx.json({ company }));
//   }),

//   rest.get(`${BASE_URL}/companies`, (req, res, ctx) => {
//     return res(ctx.status(200), ctx.json({ companies }));
//   }),

//   rest.get(`${BASE_URL}/jobs`, (req, res, ctx) => {
//     return res(ctx.status(200), ctx.json({ jobs }));
//   }),

//   // rest.post(`${BASE_URL}/auth/token`, (req, res, ctx) => {
//   //   console.log(req.body);

//   //   return res(ctx.status(201), ctx.json("long token"));
//   // }),

//   // rest.get(`${BASE_URL}/users/:username`, (req, res, ctx) => {
//   //   return res(ctx.status(200), ctx.json({ userCtx }));
//   // }),
// ];
export {};
