const dataHeadings = ['Jenis', 'No', 'Nama Rute', 'Rute Berangkat', 'Rute Kembali'];

let extractedData = {};

function extractData(entry) {
  const vehicleType =
    entry.jenis_trayek === '-'
      ? entry.jenis_angkutan.replace(/K W K/i, 'KWK')
      : entry.jenis_trayek.replace(/K W K/i, 'KWK');
  const routeNumber = entry.no_trayek;
  const routeName = entry.nama_trayek;
  const routeDepart = entry.rute_berangkat.replace(/--/g, '<br/>');
  const routeReturn = entry.rute_kembali.replace(/--/g, '<br/>');

  return {
    Jenis: vehicleType,
    No: routeNumber,
    'Nama Rute': routeName,
    'Rute Berangkat': routeDepart,
    'Rute Kembali': routeReturn,
    '~id': entry.id,
    '~digest': [vehicleType, routeNumber, routeName, routeDepart, routeReturn].join(' -- '),
  };
}

function isRegexValid(regexStr) {
  let result = false;

  try {
    const rgx = new RegExp(regexStr);
    result = typeof rgx !== 'undefined';
  } catch (e) {
    result = false;
  }

  return result;
}

function generateQueryRegex(rawStr) {
  let result = rawStr.split(' ');

  result = result.map(chunk => {
    return `(?=.*${chunk})`;
  });

  return `${result.join('')}.`;
}

function loadData() {
  import(/* webpackChunkName: "data" */ './data.json')
    .then(module => module.default)
    .then(rawData => {
      extractedData = rawData.map(extractData);
    });
}

function dataGet(query) {
  return new Promise(resolve => {
    const queryRegex = generateQueryRegex(query);

    let filteredEntries = [];

    if (query !== '' && isRegexValid(queryRegex)) {
      const rgx = RegExp(queryRegex, 'ig');

      // note: filtering is slow, consider using something like indexed db
      filteredEntries = extractedData.filter(dataEntry => {
        let match = false;

        if (rgx.test(dataEntry['~digest'])) {
          match = true;
        }

        return match;
      });
    }

    resolve(filteredEntries);
  });
}

export { dataHeadings, dataGet, loadData };
