// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'

type Dates = {
  startDate: string
  endDate: string
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Array<Dates>>
) {
  res.status(200).json([
    {
      startDate: '2022-03-1',
      endDate: '2022-03-15',
    },
    {
      startDate: '2022-03-30',
      endDate: '2022-04-12',
    },
    {
      startDate: '2022-04-13',
      endDate: '2022-04-25',
    },
    {
      startDate: '2022-04-26',
      endDate: '2022-05-31',
    },
    {
      startDate: '2022-07-02',
      endDate: '2022-07-16',
    },
    {
      startDate: '2021-09-27',
      endDate: '2022-03-29',
    },
    {
      startDate: '2022-10-12',
      endDate: '2022-10-18',
    },
    {
      startDate: '2022-10-22',
      endDate: '2022-10-28',
    },
    {
      startDate: '2022-11-18',
      endDate: '2022-11-25',
    },
    {
      startDate: '2022-11-28',
      endDate: '2022-12-04',
    },
  ])
}
