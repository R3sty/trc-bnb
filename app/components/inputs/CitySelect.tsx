"use client";

import cities from "philippines/cities.json"
import Select from 'react-select';

export type CitySelectValue = {
  label: string;
  value: string;
}

interface CitySelectProps {
  value?: CitySelectValue;
  onChange: (value: CitySelectValue) => void;
}

const CitySelect: React.FC<CitySelectProps> = ({ value, onChange }) => {
  const cityOptions = cities.map(city => ({
    label: city.name,
    value: city.name,
  }));

  return (
    <div>
      <Select
        placeholder="Anywhere"
        isClearable
        options={cityOptions}
        value={value}
        onChange={(value) => onChange(value as CitySelectValue)}
        formatOptionLabel={(option: any) => (
          <div className="flex flex-row items-center gap-3">
            <div>{option.label}</div>
          </div>
        )}
        classNamePrefix="select"
        theme={(theme) => ({
          ...theme,
          borderRadius: 6,
          colors: {
            ...theme.colors,
            primary: "black",
            primary25: "#ffe4e6",
          },
        })}
      />
    </div>
  );
}

export default CitySelect;
