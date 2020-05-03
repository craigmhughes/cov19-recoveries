import React, {useEffect, useState} from 'react';
import { openDB, deleteDB, wrap, unwrap } from 'idb';


import './App.css';
import RenderCanvas from './components/RenderCanvas.js';


function App() {
  const axios = require('axios').default;

  const [data, setData] = useState(null);

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

    if(foundEntry === undefined){
      fetchData(db);
    } else if(foundEntry.Date.getDate() !== new Date().getDate()-1){
      // Delete case entry
      (await getDb()).delete('cases', 0);

      fetchData(db); 
    }
  }

  function fetchData(db){
    console.log("new data")
    axios.get('https://api.covid19api.com/total/country/united-kingdom/status/recovered').then(async (res)=>{

      // Get latest entry.
      let latest = res.data[res.data.length-1];

      // Overwrite with useless keys omitted && Overwrite date with Date object.
      latest = {
        id: 0,
        Cases: latest.Cases,
        Date: new Date(latest.Date)
      };

      db.add('cases', latest).catch(()=>{});
      
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
    <div className="App">
      <RenderCanvas/>
    </div>
  );
}

export default App;
