import Applier, { ApplierType } from './applier.mongo';
import fs from 'fs';
import path from 'path';
import { parse } from 'csv-parse';

export async function findApplier(dmNumber: string, serialNumber: string) {
  return await Applier.findOne({ dmNumber, serialNumber });
}

export async function saveApplier(item: ApplierType) {
  const {
    dmNumber,
    itemCode,
    serialNumber,
    getDifSerial,
    proformaInv,
    receiveDocs,
    received,
    repairable,
    additionInfo,
    lastEditor,
    rpa,
  } = item;
  try {
    await Applier.updateOne(
      {
        dmNumber: item.dmNumber,
        serialNumber: item.serialNumber,
      },
      {
        dmNumber,
        itemCode,
        serialNumber,
        getDifSerial,
        proformaInv,
        receiveDocs,
        received,
        repairable,
        additionInfo,
        lastEditor,
        rpa,
      },
      { upsert: true }
    );
  } catch (error) {
    console.error(`Could not save applier ${error}`);
  }
}

export async function getAllApplierDB() {
  return await Applier.find({}, { __v: 0 }); // exclude __v
}

export function loadApplierData() {
  return new Promise((resolve, reject) => {
    fs.createReadStream(
      path.join(__dirname, '..', '..', 'data', 'applierData.csv')
    )
      .pipe(parse({ columns: true }))
      .on('data', async (data) => {
        const { dmNumber, serialNumber } = data;
        const item = await findApplier(dmNumber, serialNumber);
        if (item) {
          console.log(
            `dmNumber: ${dmNumber}, serialNumber: ${serialNumber} already exists`
          );
        }

        saveApplier(data);
      })
      .on('error', async (error) => {
        console.log(error);
        reject(error);
      })
      .on('end', async () => {
        const countApplierFound = (await getAllApplierDB()).length;
        console.log(`${countApplierFound} items found!`);
        resolve('');
      });
  });
}
