import bent from 'bent';

let cachedData = [];
const dataHeaders = ['Jenis', 'No', 'Nama Rute', 'Rute Berangkat', 'Rute Kembali'];

async function loadData(): object[] {
  const get = bent(window.location.href, 'json');
  const response = await get('/data.json');

  return response;
}

function formatData(entry: object) {
  const vehicleType: string =
    entry.jenis_trayek === '-'
      ? entry.jenis_angkutan.replace(/K W K/i, 'KWK')
      : entry.jenis_trayek.replace(/K W K/i, 'KWK');
  const routeNumber: string = entry.no_trayek;
  const routeName: string = entry.nama_trayek;
  const routeDepart: string = entry.rute_berangkat.replace(/ -- /g, '\n');
  const routeReturn: string = entry.rute_kembali.replace(/ -- /g, '\n');

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

  result = result.map(chunk => {
    return `(?=.*${chunk})`;
  });

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

async function getData(query: string): object[] {
  if (cachedData.length === 0) {
    const rawData = await loadData();
    cachedData = rawData.map(formatData);
  }

  const regexStr = generateRegexStr(query);
  let result = [];

  if (query !== '' && isRegexValid(regexStr)) {
    const rgx = new RegExp(regexStr, 'ig');

    result = cachedData.reduce((acc, current) => {
      if (rgx.test(current['~digest'])) {
        acc = acc.concat([Object.values(current).slice(0, -1)]);
      }

      return acc;
    }, []);
  }

  return result;
}

export { dataHeaders, formatData, loadData };
export default getData;