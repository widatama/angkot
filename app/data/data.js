import RawData from "./data.json";

const dataHeadings = [
  "Jenis",
  "No",
  "Nama Rute",
  "Rute Berangkat",
  "Rute Kembali"
];

const fullData = RawData.map((entry) => {
  let vehicleType = entry.jenis_trayek === "-" ? entry.jenis_angkutan.replace(/K W K/i, "KWK") : entry.jenis_trayek.replace(/K W K/i, "KWK");
  let routeNumber = entry.no_trayek;
  let routeName = entry.nama_trayek;
  let routeDepart = entry.rute_berangkat.replace(/--/g, "<br/>");
  let routeReturn = entry.rute_kembali.replace(/--/g, "<br/>");

  return {
    "Jenis": vehicleType,
    "No": routeNumber,
    "Nama Rute": routeName,
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
