import { findRecordByFilter, table } from "../../lib/airtable";
import type { NextApiRequest, NextApiResponse } from 'next'
import Airtable, { FieldSet, Records,Record } from "airtable";



const favouriteCoffeeStoreById = async (req:NextApiRequest, res:NextApiResponse) => {
  const { id } = req.query;
  if (id) {
    if (req.method === "PUT") {
      try {
        const records = await findRecordByFilter(id);
        if (records && records.length > 0) {
          const record = records[0];
          const calculatedVoting = record.voting + 1;

          //updating voting we need a function here to update airtable form
          const updatedRecord = await table.update([
            {
              id: record.recordId,
              fields: {
                voting: calculatedVoting,
              },
            },
          ]);
          res.json({ updatedRecord });
        }
      } catch (error) {
        console.log({ error });
      }
    } else {
      res.status(500);
    }
  } else {
    res.json({ message: "Id is missing" });
  }
};

export default favouriteCoffeeStoreById;
