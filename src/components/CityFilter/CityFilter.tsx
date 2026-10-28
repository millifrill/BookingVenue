/* eslint-disable @typescript-eslint/no-unused-vars */
export type City = {
   cityId: number;
   name: string;
};

export type CityFilterProps = {
   cities: City[];
   value: number | null;
   onChange: (cityId: number | null) => void;
};

export default function CityFilter(_props: CityFilterProps) {
   return null;
}
