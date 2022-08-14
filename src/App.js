import './style.css';
import React, { useState } from 'react';
import axios from 'axios';


function App() {
  const API_URL = 'https://unstoppabledomains.g.alchemy.com/domains/';
  const API_KEY = 'YQGFnIoOyWdUiBLorP1zrK4c4kHHH0fA';

  const [stats, setStats] = useState(null);



  function processLookup(e) {
    e.preventDefault();

    let domain = document.getElementById('domain').value;
    if (!domain) return;

    axios.get(API_URL + domain, {
      headers: {
        'Authorization': `bearer ${API_KEY}`
      }
    })
      .then(res => {
        setStats(res.data);
        console.log(res.data);
    })
      .catch(err => {
        setStats();
    });
  }

  return (
    <div className="text-center">
      <div>
        <h1>Search a Unstoppable Domain</h1>
      </div>
      <form onSubmit={processLookup}>
        <div>
          <center>
          <input id="domain" type="text" placeholder="Enter a domain name (Ex : sambitsargam.crypto)" aria-label="Enter a domain name" aria-describedby="button-addon"autoComplete="off"/>
          <button type="submit" id="btn">Search</button></center>
        </div> 
      </form>
      {stats ?
      <div className="domain-card">
        <h2>{stats.meta.domain}</h2>
        <h3>Owned by {stats.meta.owner}</h3>
        <span>On the {stats.meta.blockchain} blockchain</span>

        {stats.records["whois.for_sale.value"] ?
          <div className="onsale">On Sale</div>
          : <div className="nosale">Not on Sale</div>
        }
        <div>
          <span>Mail: {stats.records["whois.email.value"]}</span>
          <div>
                <b>No Mail found</b>
              </div>
        </div>
        <div>
          {stats.records["ipfs.redirect_domain.value"] ?
            <span>Website : {stats.records["ipfs.redirect_domain.value"]}</span>
            :
              <div>
                <b>No Website found</b>
              </div>
          }
          </div>
            <div>
          <h3><strong>Here are the differents blockchain addresses in the domain profile</strong></h3>
          <div>
          {stats.records["crypto.ETH.address"] ?
            <span>ETH address : {stats.records["crypto.ETH.address"]}</span>
            :
              <div>
                <b>No ETH address</b>
              </div>
          }
          </div>
          <div>
          {stats.records["crypto.MATIC.version.MATIC.address"] ?
            <span>Matic address : {stats.records["crypto.MATIC.version.MATIC.address"]}</span>
            :
              <div>
                <b>No Matic address</b>
              </div>
          }
          </div>

          <button className="contact">
            <a className="contactlink" target="_blank" href={`${stats.records['ipfs.redirect_domain.value']}`} rel="noreferrer">
              Website
            </a>
          </button>
        
        </div>
      </div>
      :
        <div>
          <b>Search a domain</b>
        </div>
      }
      <div>
        <footer>Made with ❤️ by <span>@SAMBITSARGAM</span></footer>
      </div>
    </div>
  );
}

export default App;
