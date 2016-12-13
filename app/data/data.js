import RawData from "./data.json";

const dataHeadings = [
  "Jenis",
  "No",
  "Nama",
  "Rute Berangkat",
  "Rute Kembali"
];

const dataBody = RawData.map((entry) => {
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
    "id": entry.id
  };
});

export {dataHeadings, dataBody};
