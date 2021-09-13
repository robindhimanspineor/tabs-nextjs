import React, { useState } from 'react';
import { useLazyQuery } from '@apollo/react-hooks';
import { useRouter } from 'next/router';
import {
  MAKE_QUERY,
  MODEL_QUERY,
  SUB_MODEL_QUERY,
  ENGINE_QUERY,
} from '../queries/filtersQuery';
import { withApollo } from '../libs/apollo';

import styles from '../styles/Filters.module.css';

// import { Router } from '../routes';

const Filter = () => {
  const router = useRouter();
  const makeQuery = useLazyQuery(MAKE_QUERY);
  const modelQuery = useLazyQuery(MODEL_QUERY);
  const submodelQuery = useLazyQuery(SUB_MODEL_QUERY);
  const engineQuery = useLazyQuery(ENGINE_QUERY);

  const [vehicleData, setVehicalData] = useState({
    year: '',
    make: '',
    model: '',
    subModel: '',
    engine: '',
  });

  const handleChange = (e) => {
    let obj = { ...vehicleData };
    obj[e.target.name] = e.target.value;
    if (e.target.name === 'year') {
      makeQuery[0]({ variables: { year: e.target.value } });
    }
    if (e.target.name === 'make') {
      modelQuery[0]({
        variables: { year: vehicleData.year, make: e.target.value },
      });
    }
    if (e.target.name === 'model') {
      submodelQuery[0]({
        variables: {
          year: vehicleData.year,
          make: vehicleData.make,
          model: e.target.value,
        },
      });
    }
    if (e.target.name === 'subModel') {
      engineQuery[0]({
        variables: {
          year: vehicleData.year,
          make: vehicleData.make,
          model: vehicleData.model,
          submodel: e.target.value,
        },
      });
    }
    setVehicalData({ ...obj });
  };

  const renderYears = () => {
    return (
      <select
        onChange={handleChange}
        name="year"
        value={vehicleData.year}
        className={styles.select}
      >
        <option value="year">Select Year</option>
        <option value="2021">2021</option>
        <option value="2020">2020</option>
        <option value="2019">2019</option>
        <option value="2018">2018</option>
        <option value="2017">2017</option>
        <option value="2016">2016</option>
        <option value="2015">2015</option>
        <option value="2014">2014</option>
        <option value="2013">2013</option>
      </select>
    );
  };

  const renderMakes = () => {
    return (
      <select
        onChange={handleChange}
        name="make"
        value={vehicleData.make}
        disabled={!makeQuery[1]?.data?.store?.makes?.length}
        className={styles.select}
      >
        {makeQuery[1].loading && <option>Loading...</option>}
        <option value="year">Select Make</option>
        {makeQuery[1]?.data?.store?.makes?.map((item) => (
          <option key={item.key} value={item.value}>
            {item.value}
          </option>
        ))}
      </select>
    );
  };
  const renderModels = () => {
    return (
      <select
        onChange={handleChange}
        name="model"
        value={vehicleData.model}
        disabled={!modelQuery[1]?.data?.store?.model?.length}
        className={styles.select}
      >
        {modelQuery[1].loading && <option>Loading...</option>}
        <option value="year">Select Model</option>
        {modelQuery[1]?.data?.store?.model?.map((item) => (
          <option key={item.key} value={item.value}>
            {item.value}
          </option>
        ))}
      </select>
    );
  };

  const renderSubModels = () => {
    return (
      <select
        onChange={handleChange}
        name="subModel"
        value={vehicleData.subModel}
        disabled={!submodelQuery[1]?.data?.store?.submodel?.length}
        className={styles.select}
      >
        {submodelQuery[1].loading && <option>Loading...</option>}
        <option value="year">Select SubModel</option>
        {submodelQuery[1]?.data?.store?.submodel?.map((item) => (
          <option key={item.key} value={item.value}>
            {item.value}
          </option>
        ))}
      </select>
    );
  };

  const renderEngines = () => {
    return (
      <select
        onChange={handleChange}
        name="engine"
        value={vehicleData.engine}
        disabled={!engineQuery[1]?.data?.store?.engine?.length}
        className={styles.select}
      >
        {engineQuery[1].loading && <option>Loading...</option>}
        <option value="year">Select Engine</option>
        {engineQuery[1]?.data?.store?.engine?.map((item) => (
          <option key={item.key} value={item.value}>
            {item.value}
          </option>
        ))}
      </select>
    );
  };

  const checkVehicleData = () => {
    if (
      vehicleData.year &&
      vehicleData.make &&
      vehicleData.model &&
      vehicleData.subModel &&
      vehicleData.engine
    )
      return false;

    return true;
  };

  const handleShopNowClick = (e) => {
    e.preventDefault();
    router.push(
      `/${
        vehicleData.make.split(' ').join('-') +
        '-' +
        vehicleData.model +
        '-' +
        vehicleData.year
      }/${vehicleData.subModel}/${vehicleData.engine.split(' ').join('-')}`
    );
  };

  const renderShopNowButton = () => {
    return (
      <button disabled={checkVehicleData()} onClick={handleShopNowClick}>
        SHOP NOW
      </button>
    );
  };

  return (
    <div className={styles.filtersContainer}>
      {renderYears()}
      {renderMakes()}
      {renderModels()}
      {renderSubModels()}
      {renderEngines()}
      {renderShopNowButton()}
    </div>
  );
};

export default withApollo({ ssr: true })(Filter);
