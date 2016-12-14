import RawData from "./data.json";

const dataHeadings = [
  "Jenis",
  "No",
  "Nama",
  "Rute Berangkat",
  "Rute Kembali"
];

const fullData = RawData.map((entry) => {
  let vehicleType = entry.jenis_trayek === "-" ? entry.jenis_angkutan : entry.jenis_trayek;
  let routeNumber = entry.no_trayek;
  let routeName = entry.nama_trayek;
  let routeDepart = entry.rute_berangkat;
  let routeReturn = entry.rute_kembali;

  return {
    "Jenis": vehicleType,
    "No": routeNumber,
    "Nama": routeName,
    "Rute Berangkat": routeDepart,
    "Rute Kembali": routeReturn,
    "~id": entry.id,
    "~digest": [
      vehicleType,
      routeNumber,
      routeName,
      routeDepart,
      routeReturn
    ].join(" -- ")
  };
});

function isRegexValid(regexStr) {
  let result = true;
  try {
    new RegExp(regexStr);
  }
  catch (e) {
    result = false;
  }

  return result;
}

function generateQueryRegex(rawStr) {
  let result = rawStr.split(" ");

  result = result.map((chunk) => {
    return "(?=.*" + chunk + ")";
  });

  return result.join("") + ".";
}

const dataGet = (query) => {
  const queryRegex = generateQueryRegex(query);

  let filteredEntries = [];

  if (query !== "" && isRegexValid(queryRegex)) {
    const rgx = RegExp(queryRegex, "ig");

    filteredEntries = fullData.filter((dataEntry) => {
      let match = false;

      if (rgx.test(dataEntry["~digest"])) {
        match = true;
      }

      return match;
    });
  }

  return filteredEntries;
};

export {dataHeadings, fullData, dataGet};
