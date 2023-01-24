import {
  table,
  getMinifiedRecords,
  findRecordByFilter,
} from "../../lib/airtable";

const createCoffeeStore = async (req, res) => {
  if (req.method == "POST") {
    const { id, name, address, voting, imgUrl, neighborhood } = req.body;

    try {
      if (id) {
        const record = await findRecordByFilter(id);

        if (record.length !== 0) {
          res.json({ record, message: "This record has already has been" });
        } else {
          if (name) {
            const createRecords = await table.create([
              {
                fields: {
                  id,
                  name,
                  address,
                  neighborhood,
                  voting,
                  imgUrl,
                },
              },
            ]);

            const records = getMinifiedRecords(createRecords);
            res.status(201);
            res.json({ records });
          } else {
            res.status(400);
            res.json({ message: "id or name missing" });
          }
        }
      } else {
        res.status(400);
        res.json({ message: "id is missing" });
      }
    } catch (error) {
      res.json({ message: "something went wrong", error });
    }
  }
};

export default createCoffeeStore;
