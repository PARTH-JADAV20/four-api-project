import React, { useState, useEffect } from "react";
import "./Bank.css";

export default function Bank() {
  const [ifsc, setIfsc] = useState("");
  const [ifscData, setIfscData] = useState(null);
  const [filterData, setFilterData] = useState(null);
  const [filters, setFilters] = useState({
    state: "",
    district: "",
    city: "",
    center: "",
    branch: "",
  });

  const [dropdownOptions, setDropdownOptions] = useState({
    states: [],
    districts: [],
    cities: [],
    centers: [],
    branches: [],
  });

  // Fetch states on component mount
  useEffect(() => {
    fetchOptions("states");
  }, []);

  const fetchOptions = async (level, parentData = {}) => {
    try {
      let url = "https://bank-apis.justinclicks.com/API/V1/STATE";
      if (level === "districts") {
        url += `/${parentData.state}`;
      } else if (level === "cities") {
        url += `/${parentData.state}/${parentData.district}`;
      } else if (level === "centers") {
        url += `/${parentData.state}/${parentData.district}/${parentData.city}`;
      } else if (level === "branches") {
        url += `/${parentData.state}/${parentData.district}/${parentData.city}/${parentData.center}`;
      }

      const response = await fetch(url);
      const data = await response.json();
      if (Array.isArray(data)) {
        setDropdownOptions((prev) => ({ ...prev, [level]: data }));
      } else {
        console.error(`Invalid data format for ${level}`, data);
      }
    } catch (error) {
      console.error(`Error fetching ${level}:`, error);
    }
  };

  const handleFilterChange = async (e) => {
    const { name, value } = e.target;

    // Update the filters state
    setFilters((prevFilters) => ({ ...prevFilters, [name]: value }));

    // Reset dependent dropdowns
    if (name === "state") {
      setDropdownOptions((prev) => ({
        ...prev,
        districts: [],
        cities: [],
        centers: [],
        branches: [],
      }));
      await fetchOptions("districts", { state: value });
    } else if (name === "district") {
      setDropdownOptions((prev) => ({
        ...prev,
        cities: [],
        centers: [],
        branches: [],
      }));
      await fetchOptions("cities", { state: filters.state, district: value });
    } else if (name === "city") {
      setDropdownOptions((prev) => ({
        ...prev,
        centers: [],
        branches: [],
      }));
      await fetchOptions("centers", {
        state: filters.state,
        district: filters.district,
        city: value,
      });
    } else if (name === "center") {
      setDropdownOptions((prev) => ({ ...prev, branches: [] }));
      await fetchOptions("branches", {
        state: filters.state,
        district: filters.district,
        city: filters.city,
        center: value,
      });
    }
  };

  const handleFetchBranchDetails = async () => {
    const { state, district, city, center, branch } = filters;
  
    if (!state || !district || !city || !center || !branch) {
      alert("Please select all fields.");
      return;
    }
  
    try {
      const branchName = branch.endsWith(".json") ? branch : `${branch}.json`;
      const url = `https://bank-apis.justinclicks.com/API/V1/STATE/${state}/${district}/${city}/${center}/${branchName}`;
  
      const response = await fetch(url);
      const data = await response.json();
      if (response.ok) {
        setFilterData(data);
        setIfscData(null); // Clear IFSC result
      } else {
        console.error("Error fetching branch details:", data);
      }
    } catch (error) {
      console.error("Error fetching branch details:", error);
    }
  };
  
  const handleIfscChange = (e) => setIfsc(e.target.value);



 const handleFetchData = async () => {
  if (!ifsc) {
    alert("Please enter an IFSC code.");
    return;
  }
  try {
    const response = await fetch(`https://bank-apis.justinclicks.com/API/V1/IFSC/${ifsc}`);
    if (!response.ok) {
      throw new Error("Invalid IFSC code");
    }
    const data = await response.json();
    setIfscData(data);
    setFilterData(null); // Clear filter result
  } catch (error) {
    alert(error.message);
    setIfscData(null);
  }
};


  return (
    <div className="bank-container">
      <div className="sidebar">
        <h2>Bank Search</h2>

        <div className="input-group2">
          <label htmlFor="ifsc">Enter IFSC Code:</label>
          <input
            type="text"
            className="input-group1"
            id="ifsc"
            value={ifsc}
            onChange={handleIfscChange}
            placeholder="e.g., SBIN0001234"
          />
          <button onClick={handleFetchData}>Fetch IFSC Data</button>
        </div>

        <div className="filters1">
          <h3>Filters</h3>
          <label>
            State:
            <select name="state" value={filters.state} onChange={handleFilterChange}>
              <option value="">Select State</option>
              {dropdownOptions.states.map((state, index) => (
                <option key={index} value={state}>
                  {state}
                </option>
              ))}
            </select>
          </label>

          <label>
            District:
            <select
              name="district"
              value={filters.district}
              onChange={handleFilterChange}
              disabled={!filters.state}
            >
              <option value="">Select District</option>
              {dropdownOptions.districts.map((district, index) => (
                <option key={index} value={district}>
                  {district}
                </option>
              ))}
            </select>
          </label>

          <label>
            City:
            <select
              name="city"
              value={filters.city}
              onChange={handleFilterChange}
              disabled={!filters.district}
            >
              <option value="">Select City</option>
              {dropdownOptions.cities.map((city, index) => (
                <option key={index} value={city}>
                  {city}
                </option>
              ))}
            </select>
          </label>

          <label>
            Center:
            <select
              name="center"
              value={filters.center}
              onChange={handleFilterChange}
              disabled={!filters.city}
            >
              <option value="">Select Center</option>
              {dropdownOptions.centers.map((center, index) => (
                <option key={index} value={center}>
                  {center}
                </option>
              ))}
            </select>
          </label>

          <label>
            Branch:
            <select
              name="branch"
              value={filters.branch}
              onChange={(e) =>
                setFilters((prevFilters) => ({ ...prevFilters, branch: e.target.value }))
              }
              disabled={!filters.center}
            >
              <option value="">Select Branch</option>
              {dropdownOptions.branches.map((branch, index) => {
                const displayBranch = branch.endsWith(".json") ? branch.replace(".json", "") : branch;
                return (
                  <option key={index} value={branch}>
                    {displayBranch}
                  </option>
                );
              })}
            </select>
          </label>
          <button onClick={handleFetchBranchDetails}>Fetch Branch Details</button>
        </div>
      </div>

      <div className="main-content">
        <h2>Bank Details</h2>
        {ifscData && (
          <div className="bank-details">
            <h3>Details from IFSC Code</h3>
            <p>
              <strong>Bank:</strong> {ifscData.BANK}
            </p>
            <p>
              <strong>Branch:</strong> {ifscData.BRANCH}
            </p>
            <p>
              <strong>BankCode:</strong> {ifscData.BANKCODE}
            </p>
            <p>
              <strong>IFSC:</strong> {ifscData.IFSC}
            </p>
            <p>
              <strong>Contact:</strong> {ifscData.CONTACT}
            </p>
            <p>
              <strong>Address:</strong> {ifscData.ADDRESS}
            </p>
            <p>
              <strong>City:</strong> {ifscData.CITY}
            </p>
            <p>
              <strong>UPI:</strong> {ifscData.UPI? 'ALLOWED': null} {ifscData.UPI}
            </p>
          </div>
        )}

        {filterData && (
          <div className="bank-details">
            <h3>Details from Filters</h3>
            <p>
              <strong>Bank:</strong> {filterData.BANK}
            </p>
            <p>
              <strong>Branch:</strong> {filterData.BRANCH}
            </p>
            <p>
              <strong>BankCode:</strong> {filterData.BANKCODE}
            </p>
            <p>
              <strong>IFSC:</strong> {filterData.IFSC}
            </p>
            <p>
              <strong>Contact:</strong> {filterData.CONTACT}
            </p>
            <p>
              <strong>Address:</strong> {filterData.ADDRESS}
            </p>
            <p>
              <strong>City:</strong> {filterData.CITY}
            </p>
            <p>
              <strong>UPI:</strong> {filterData.UPI? 'ALLOWED': null}{filterData.UPI}
            </p>
          </div>
        )}

        {!ifscData && !filterData && (
          <p className="placeholder">Enter IFSC or use filters to fetch data.</p>
        )}
      </div>
    </div>
  );
}
