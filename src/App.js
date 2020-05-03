import React, {useEffect, useState} from 'react';

import './App.css';

function App() {
  const axios = require('axios').default;

  const [data, setData] = useState(null);

  /**
   * Perform GET request to API endpoint for UK data on recovered cases.
   *
   */
  function getData(){
    axios.get('https://api.covid19api.com/total/country/united-kingdom/status/recovered').then(res=>{

      // Get latest entry.
      let latest = res.data[res.data.length-1];

      // Overwrite with useless keys omitted && Overwrite date with Date object.
      latest = {
        Cases: latest.Cases,
        Date: new Date(latest.Date)
      };

      console.log(latest);
    }).catch(err=>console.error(err));
  }

  useEffect(()=>{
    getData();
  },[]);

  return (
    <div className="App">
      
    </div>
  );
}

export default App;
