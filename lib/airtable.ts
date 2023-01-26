import Airtable, {
  FieldSet,
  Records,
  Record,
  Collaborator,
  Attachment,
} from "airtable";

const base = new Airtable({
  apiKey: process.env.NEXT_PUBLIC_AIRTABLE_API_KEY as string,
}).base(process.env.NEXT_PUBLIC_AIRTABLE_BASE_ID as string);

const table = base("coffee-stores") as Airtable.Table<Airtable.FieldSet>;

interface getMinifiedRecordType {
  recordId?: string;
  id?: string;
  name?: string;
  imgUrl?: string;
  voting?: number;
  address?: string;
}

const getMinifiedRecord = (record: Record<FieldSet>): getMinifiedRecordType => {
  return {
    recordId: record.id,
    ...record.fields,
  };
};

const getMinifiedRecords = (
  records: Records<FieldSet>
): getMinifiedRecordType[] => {
  return records.map((record) => getMinifiedRecord(record));
};

const findRecordByFilter = async (
  id: any
): Promise<getMinifiedRecordType[]> => {
  const findCoffeeStoreRecords = await table
    .select({
      filterByFormula: `id="${id}"`,
    })
    .firstPage();
  return getMinifiedRecords(findCoffeeStoreRecords);
};

export { table, getMinifiedRecords, findRecordByFilter };
