export interface ListAreaProvincestypes {
  id: string;
  name: string;
  alt_name: string;
  latitude: number;
  longitude: number;
}

export interface ListAreaRegenciestypes {
  id: string;
  province_id: string;
  name: string;
  alt_name: string;
  latitude: number;
  longitude: number;
}

export interface ListAreaDistrictstypes {
  id: string;
  regency_id: string;
  name: string;
  alt_name: string;
  latitude: number;
  longitude: number;
}

export interface ListAreaVillagestypes {
  id: string;
  district_id: string;
  name: string;
  latitude: number;
  longitude: number;
}
