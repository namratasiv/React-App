import React from "react";
import './home.css';


export default class Home extends React.Component{
  constructor(props){
    super(props);
    this.state = {

      error: null,
      isLoaded: false,
      bankAccount: [],
      searchString: ''

    };

  }
  handleChange = (e) => {
     this.setState({ searchString:e.target.value });
   }
componentDidMount(){
  var PER_PAGE = 10;
  var proxyUrl = 'https://cors-anywhere.herokuapp.com/',
    targetUrl = 'http://starlord.hackerearth.com/bankAccount'
  fetch(proxyUrl + targetUrl)
  .then(res => res.json())
  .then(
    (result) => {
result = JSON.parse(JSON.stringify(result).replace(/\s(?=\w+":)/g, ""));
      this.setState({
        isLoaded:true,
        bankAccount: result

      });
    },
    (error) => {
      this.setState({
        isLoaded:true,
        error
      });
    }
  )

}

  render(){
var {error, isLoaded, bankAccount} = this.state;
var searchString = this.state.searchString.trim().toLowerCase();
if (searchString.length > 0) {
       bankAccount = bankAccount.filter(function(user) {
         return user.TransactionDetails.toLowerCase().match( searchString );
       });
     }
if (error){
  return <div className="error"> Error: {error.message} </div>;
} else if (!isLoaded){
  return (

  <div className="loading"> LOADING...</div>

);
}else{return(

    <div className ="details">

    <input className="searchbar" type="text" value={this.state.searchString} onChange={this.handleChange} placeholder="Search/Filter by Transaction Details..."/>
    <table class = "table table-hover table-dark">
    <thead>
    <tr>

      <th scope="col">Account number</th>
      <th scope="col">Date</th>
      <th scope="col">Transaction Details</th>
      <th scope="col">Value Date</th>
      <th scope="col">Withdrawal Amount</th>
      <th scope="col">Deposit Amount</th>
      <th scope="col">Balance Amount</th>

    </tr>
  </thead>
  <tbody>
    {bankAccount.map(function(user) {
    return(  <tr>

      <td>{user.AccountNo}</td>
      <td>{user.Date}</td>
      <td>{user.TransactionDetails}</td>
      <td>{user.ValueDate}</td>
      <td>{user.WithdrawalAMT}</td>
      <td>{user.DepositAMT}</td>
      <td>{user.BalanceAMT}</td>

    </tr>
);
}

    )}
</tbody>
</table>
<footer className="footer">
<h6> Built by Namrata Sivakumar &copy;</h6>
</footer>
    </div>

  )
}
}
}
