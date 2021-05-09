class Case {
  yearWeek: Date | string;
  casesWeekly: number;
  deathsWeekly: number;
  countriesAndTerritories: string;
  geoId: string;
  countryTerritoryCode: string;
  popData2019: number;
  continentExp: string;
  notificationRate: string;

  constructor(
    yearWeek: Date | string,
    casesWeekly: number,
    deathsWeekly: number,
    countriesAndTerritories: string,
    geoId: string,
    countryTerritoryCode: string,
    popData2019: number,
    continentExp: string,
    notificationRate: string
  ) {
    this.yearWeek = yearWeek;
    this.casesWeekly = casesWeekly;
    this.deathsWeekly = deathsWeekly;
    this.countriesAndTerritories = countriesAndTerritories;
    this.geoId = geoId;
    this.countryTerritoryCode = countryTerritoryCode;
    this.popData2019 = popData2019;
    this.continentExp = continentExp;
    this.notificationRate = notificationRate;
  }
}

export default Case;
