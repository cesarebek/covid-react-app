import React, { FC, useEffect, useState } from 'react';
import axios from 'axios';
import { DataTable } from 'primereact/datatable';
import { Dropdown } from 'primereact/dropdown';
import { Column } from 'primereact/column';

const baseUrl = 'https://ruota-di-scorta.azurewebsites.net/web-api';

type Props = {
  countries: any[];
};

const Table: FC<Props> = ({ countries }) => {
  const [selectedCountry, setSelectedCountry] = useState('');
  const [data, setData] = useState([]);

  //Fetching cases by selected country
  const getCases = () => {
    const query = selectedCountry === '' ? '' : `?country=${selectedCountry}`;
    axios
      .get(`${baseUrl}/case${query}`)
      .then((response) => {
        console.log(response.data);
        setData(response.data);
      })
      .catch((e) => console.log(e));
  };
  useEffect(() => {
    getCases();
  }, [selectedCountry]);

  //Deleting cases by clicking the row
  const deleteCase = (id: number) => {
    axios.delete(`${baseUrl}/case/${id}`);
    getCases();
  };

  const columns = [
    { field: 'id', header: 'ID' },
    { field: 'continent', header: 'Continent' },
    { field: 'country', header: 'Country' },
    { field: 'countryCode', header: 'Country Code' },
    { field: 'casesWeekly', header: 'Weekly Cases' },
    { field: 'deathsWeekly', header: 'Weekly Deaths' },
    { field: 'popData2019', header: 'Population 2019' },
    { field: 'yearWeek', header: 'Date' },
  ];

  return (
    <div>
      <div className='p-grid p-d-flex p-jc-center'>
        <Dropdown
          options={countries}
          value={selectedCountry}
          optionLabel='country'
          onChange={(e) => setSelectedCountry(e.value.code)}
          placeholder='Select a City'
          className='p-m-3 p-col-4'
        />
        <DataTable
          className='p-mx-6 p-mt-6'
          onRowClick={(e) => deleteCase(e.data.id)}
          value={data}
        >
          {columns.map((col) => (
            <Column key={col.field} field={col.field} header={col.header} />
          ))}
        </DataTable>
      </div>
    </div>
  );
};

export default Table;
