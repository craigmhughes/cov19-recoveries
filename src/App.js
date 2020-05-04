import React, {useEffect, useState} from 'react';
import { openDB } from 'idb';


import './App.css';
import RenderCanvas from './components/RenderCanvas.js';


function App() {
  const axios = require('axios').default;

  const [nhs, setNhs] = useState(new Date().getDay() === 4 && new Date().getHours() === 20);

  const [data, setData] = useState({
    id: 0,
    Cases: 0,
    Date: 0
  });

  /**
   * Perform GET request to API endpoint for UK data on recovered cases.
   *
   */
  async function checkDb(){
    
    const db = await getDb();

    // Found entry in 'cases' idb.
    let foundEntry = {};

    await db.getAll('cases').then((res)=>{
      foundEntry = res[0];
    }).catch((err)=>{
    });

    // Get time data was last pulled from API.
    let lastChecked = localStorage.getItem("lastChecked");

    if(foundEntry === undefined || lastChecked === null){
      fetchData(db);
    } else if(new Date(Number(lastChecked)).getDate() !== new Date(Date.now()).getDate()){

      // Delete case entry
      (await getDb()).delete('cases', 0);

      fetchData(db); 
    } else {
      setData(foundEntry);
    }
  }

  function fetchData(db){
    console.log("new data")
    axios.get('https://api.covid19api.com/live/country/united-kingdom/status/recovered').then(async (res)=>{

      // Get latest entry.
      let latest = res.data[res.data.length-1];

      // Overwrite with useless keys omitted && Overwrite date with Date object.
      latest = {
        id: 0,
        Cases: latest.Recovered,
        Date: new Date(latest.Date)
      };

      for(let i = res.data.length; i > 0; i--){
        let temp = res.data[i-1];

        latest.Cases += temp.Recovered;
      }

      db.add('cases', latest).catch(()=>{});
      localStorage.setItem("lastChecked", JSON.stringify(Date.now()));
      setData(latest);
      
    }).catch(err=>console.error(err));
  }

  async function getDb(){
    if (!('indexedDB' in window)) {
        console.log('This browser doesn\'t support IndexedDB');
        return false;
    }

    // ObjectStore names
    const stores = ['cases'];

    return await openDB('Heart', 1, {
        upgrade(db){
            for(let storeName of stores){
                const store = db.createObjectStore(storeName, {
                    keyPath: 'id',
                    autoIncrement: true
                });

                store.createIndex('id','id');
            }
        }
    });
  }

  useEffect(()=>{
    getDb();

    checkDb();
  },[]);

  return (
    <main className="App">
      <RenderCanvas rate={data.Cases} nhs={nhs}/>
      {nhs ?
      <section className="update">
        <p className="update__cases">Thank you</p>
        <p className="update__subtitle">{data.Cases.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")} Recovered UK cases (COVID-19)</p>
        <p className="update__source">Source <a href="https://github.com/CSSEGISandData/COVID-19">Johns Hopkins CSSE</a></p>
        <p className="update__author"><a href="https://www.justgiving.com/associationofnhscharities">#ClapForOurCarers</a></p>
      </section>
      :
      <section className="update">
        <p className="update__cases">{data.Cases.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</p>
        <p className="update__subtitle">Recovered UK cases (COVID-19)</p>
        <p className="update__source">Source <a href="https://github.com/CSSEGISandData/COVID-19">Johns Hopkins CSSE</a></p>

        <p className="update__author">Made by: <a href="https://github.com/craigmhughes">Craig Hughes</a></p>
      </section>}
    </main>
  );
}

if(navigator.serviceWorker){
  navigator.serviceWorker.register('./sw.js');
}

export default App;
