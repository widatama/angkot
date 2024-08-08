import bent from 'bent';

type Entry = {
  id: string;
  jenis_trayek: string;
  jenis_angkutan: string;
  no_trayek: string;
  nama_trayek: string;
  rute_berangkat: string;
  rute_kembali: string;
};

type FormattedEntry = {
  '~id': string;
  'Jenis': string;
  'No': string;
  'Nama Rute': string;
  'Rute Berangkat': string;
  'Rute Kembali': string;
  '~digest': string;
};

let cachedData: FormattedEntry[] = [];
const dataHeaders = ['Jenis', 'No', 'Nama Rute', 'Rute Berangkat', 'Rute Kembali'];

async function loadData(): Promise<Entry[]> {
  const get = bent('json');
  const urlObj = new URL(window.location.href);
  urlObj.pathname = `${urlObj.pathname}/data.json`;

  const response = await get(urlObj.href);

  return response;
}

function formatData(entry: Entry): FormattedEntry {
  const vehicleType: string = (!entry.jenis_trayek || entry.jenis_trayek === '-')
    ? entry.jenis_angkutan.replace(/K W K/i, 'KWK')
    : entry.jenis_trayek.replace(/K W K/i, 'KWK');
  const routeNumber: string = entry.no_trayek;
  const routeName: string = entry.nama_trayek;
  const routeDepart: string = entry.rute_berangkat.replace(/ -- /g, '<br/>');
  const routeReturn: string = entry.rute_kembali.replace(/ -- /g, '<br/>');

  return {
    '~id': entry.no_trayek,
    'Jenis': vehicleType,
    'No': routeNumber,
    'Nama Rute': routeName,
    'Rute Berangkat': routeDepart,
    'Rute Kembali': routeReturn,
    '~digest': [vehicleType, routeNumber, routeName, routeDepart, routeReturn].join(' -- '),
  };
}

function generateRegexStr(rawStr: string): string {
  let result = rawStr.split(' ');

  result = result.map((chunk) => `(?=.*${chunk})`);

  return `${result.join('')}.`;
}

function isRegexValid(regexStr: string): boolean {
  let result = false;

  try {
    const rgx = new RegExp(regexStr);
    result = typeof rgx !== 'undefined';
  } catch (_) { // eslint-disable-line @typescript-eslint/no-unused-vars
    result = false;
  }

  return result;
}

async function getData(query: string): Promise<string[][]> {
  if (cachedData.length === 0) {
    const rawData = await loadData();
    cachedData = rawData.map(formatData);
  }

  const regexStr = generateRegexStr(query);
  let result: string[][] = [];

  if (query !== '' && isRegexValid(regexStr)) {
    const rgx = new RegExp(regexStr, 'ig');
    const highlightRgx = new RegExp(query, 'ig');

    result = cachedData.reduce((acc: string[][], current) => {
      if (rgx.test(current['~digest'])) {
        const row = [...Object.values(current).slice(0, -1)];
        row.forEach((field, idx) => {
          if (typeof field === 'string' && field.length) {
            row[idx] = field.replace(highlightRgx, '<span class="text-blue-500">$&</span>');
          }
        });

        acc = acc.concat([row]);
      }

      return acc;
    }, []);
  }

  return result;
}

export { dataHeaders, formatData, loadData };
export default getData;
