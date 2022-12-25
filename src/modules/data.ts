import bent from 'bent';

let cachedData: any[] = [];
const dataHeaders = ['Jenis', 'No', 'Nama Rute', 'Rute Berangkat', 'Rute Kembali'];

async function loadData(): Promise<object[]> {
  const get = bent('json');
  const response = await get(`${window.location.href}data.json`);

  return response;
}

function formatData(entry: any) {
  const vehicleType: string = entry.jenis_trayek === '-'
    ? entry.jenis_angkutan.replace(/K W K/i, 'KWK')
    : entry.jenis_trayek.replace(/K W K/i, 'KWK');
  const routeNumber: string = entry.no_trayek;
  const routeName: string = entry.nama_trayek;
  const routeDepart: string = entry.rute_berangkat.replace(/ -- /g, '<br/>');
  const routeReturn: string = entry.rute_kembali.replace(/ -- /g, '<br/>');

  return {
    '~id': entry.id,
    Jenis: vehicleType,
    No: routeNumber,
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
  } catch (e) {
    result = false;
  }

  return result;
}

async function getData(query: string): Promise<object[]> {
  if (cachedData.length === 0) {
    const rawData = await loadData();
    cachedData = rawData.map(formatData);
  }

  const regexStr = generateRegexStr(query);
  let result = [];

  if (query !== '' && isRegexValid(regexStr)) {
    const rgx = new RegExp(regexStr, 'ig');
    const highlightRgx = new RegExp(query, 'ig');

    result = cachedData.reduce((acc, current) => {
      if (rgx.test(current['~digest'])) {
        const row = [...Object.values(current).slice(0, -1)];
        row.forEach((field, idx) => {
          if (typeof field === 'string' && field.length) {
            row[idx] = field.replace(highlightRgx, '<span class="text-blue-500">$&</span>');
          }
        });
        // eslint-disable-next-line no-param-reassign
        acc = acc.concat([row]);
      }

      return acc;
    }, []);
  }

  return result;
}

export { dataHeaders, formatData, loadData };
export default getData;
