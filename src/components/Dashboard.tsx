import React, { FC, useState } from 'react';
import { useHistory } from 'react-router-dom';
// Case Model
import Case from '../Case';
// PrimeReact Components
import { InputText } from 'primereact/inputtext';
import { Dropdown } from 'primereact/dropdown';
import { Button } from 'primereact/button';
import axios from 'axios';
// import { Calendar } from 'primereact/calendar';

type Props = {
  countries: any[];
};
type Country = {
  code: string;
  continent: string;
  country: string;
};

const baseUrl = 'https://ruota-di-scorta.azurewebsites.net/web-api';

const Dashboard: FC<Props> = ({ countries }) => {
  const [formData, setFormData] = useState<Case>(
    new Case(new Date().toISOString(), 0, 0, '', '', '', 0, '', '')
  );

  const history = useHistory();

  const onFormChange = (property: string, value: string | number) => {
    setFormData({
      ...formData,
      [property]: value,
    });
  };

  const onCountrySelect = (obj: Country) => {
    let data = { ...formData };
    data.countriesAndTerritories = obj.country;
    data.countryTerritoryCode = obj.code;
    data.continentExp = obj.continent;
    setFormData(data);
  };

  const submitCase = (e: any) => {
    e.preventDefault();
    axios
      .post(`${baseUrl}/case`, formData)
      .then((response) => {
        console.log(response);
        history.push('/');
      })
      .then((e) => console.log(e));
  };

  return (
    <div className='p-fluid p-formgrid p-grid p-m-6'>
      {/* Year Week
      <div className='p-field p-col-12 p-md-6'>
        <label htmlFor='date'>Year Week</label>
        <Calendar
          value={formData.yearWeek}
          dateFormat='yy/mm'
          onChange={(e) => {
            console.log(e.value);
            onFormChange('yearWeek', e.value);
          }}
          id='date'
        ></Calendar>
      </div> */}
      {/* Weekly Cases */}
      <div className='p-field p-col-12 p-md-6'>
        <label htmlFor='wc'>Weekly Cases</label>
        <InputText
          value={formData.casesWeekly}
          id='wc'
          type='number'
          onChange={(e) => onFormChange('casesWeekly', e.target.value)}
        />
      </div>
      {/* Weekly Deaths */}
      <div className='p-field p-col-12 p-md-6'>
        <label htmlFor='wd'>Weekly Deaths</label>
        <InputText
          value={formData.deathsWeekly}
          id='wd'
          type='number'
          onChange={(e) => onFormChange('deathsWeekly', e.target.value)}
        />
      </div>
      {/* Country */}
      <div className='p-field p-col-12 p-md-6'>
        <label htmlFor='country'>Country</label>
        <Dropdown
          value={formData.countriesAndTerritories}
          id='country'
          options={countries}
          optionLabel='country'
          placeholder='Select a Country'
          onChange={(e) => onCountrySelect(e.value)}
        />
      </div>
      {/* Geo ID */}
      <div className='p-field p-col-12 p-md-6'>
        <label htmlFor='geo'>Geo ID</label>
        <InputText
          value={formData.geoId}
          id='geo'
          type='text'
          onChange={(e) => onFormChange('geoId', e.target.value)}
        />
      </div>
      {/* Population 2019 */}
      <div className='p-field p-col-12 p-md-6'>
        <label htmlFor='pop'>Population 2019</label>
        <InputText
          value={formData.popData2019}
          id='pop'
          type='number'
          onChange={(e) => onFormChange('popData2019', e.target.value)}
        />
      </div>
      {/* Notification Rate */}
      <div className='p-field p-col-12 p-md-6'>
        <label htmlFor='rate'>Notification Rate</label>
        <InputText
          value={formData.notificationRate}
          id='rate'
          type='text'
          onChange={(e) => onFormChange('notificationRate', e.target.value)}
        />
      </div>
      <Button type='button' label='Submit' onClick={submitCase} />
    </div>
  );
};

export default Dashboard;
