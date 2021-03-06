import React, { useState, useEffect } from "react";
import { NativeSelect, FormControl } from "@material-ui/core";

import styles from "./CountryPicker.module.css";

import { fetchCountries } from "../../api";

const ConntryPicker = ({handleCountryChange}) => {
  const [fetchedCoutries, setFetchedCoutries] = useState([]);
  useEffect(() => {
    const fetchAPI = async () => {
      setFetchedCoutries(await fetchCountries());
    };
    fetchAPI();
  }, [setFetchedCoutries]);
  console.log(fetchedCoutries);
  return (
    <FormControl className={styles.formControl}>
      <NativeSelect defaultValue="" onChange={(e)=> handleCountryChange(e.target.value)}>
        <option value=""> Global</option>
        {fetchedCoutries.map((country,i) => <option key={i} value={country}>{country}</option>)}
      </NativeSelect>
    </FormControl>
  );
};

export default ConntryPicker;
