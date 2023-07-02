import React, { Component } from 'react';
import Axios from 'axios';


class App extends Component {
  state = {
    msg : 'None....',
    myDepart:[],
    myData : []
        
    } 
    
    id = ''
    dpt = ''

    componentWillMount()
    {
      Axios.get("http://localhost:3001/iHi/DataQuery",{params: {sql:"SELECT * FROM tbl_depart"}  }).then(
        (res) => 
        {
          this.setState({myDepart:res.data})
        }
      )
    }
  render() { 
    return (
      

      <div>
        <h1>iHi CRUD Application</h1>

        
        
      <select onChange={(x)=> 
      {
        let s1 = "Select * From Tbl_emp where depart = '"+x.target.value+"' "
          Axios.get("http://localhost:3001/iHi/DataQuery",{params: {sql:s1}  }).then(
            (res) => 
            {
              this.setState({myData:res.data})
            }
          )
      }
      }>
        {
          this.state.myDepart.map
            ( 
            (itm) =>
              <option value={itm['DPT_NAme']}>Depart: { itm['DPT_NAme'] } </option>
            )
        }
      </select>



        <select onChange={(obj) => 
        {
          // alert(obj.target.value)

          let s1 = "Select * From Tbl_emp where depart = '"+obj.target.value+"' "
          Axios.get("http://localhost:3001/iHi/DataQuery",{params: {sql:s1}  }).then(
            (res) => 
            {
              this.setState({myData:res.data})
            }
          )
        }
        
        }>

        <option value="IT">IT</option>
        <option value="HR">HR</option>
        <option value="Accounts">Accounts</option>
        </select>
      
        <table border = '1'>
        <tr>
          <td>ID</td>
          <td>Emp Name</td>
          <td>Salary</td>
          <td>Depart</td>
          <td>Shift</td>
          <td>Gender</td>
        </tr>
        {
          this.state.myData.map (
          (val) =>   
        <tr>
          <td>{val['ID']}</td>
          <td>{val['Emp_Name']}</td>
          <td>{val['Salary']}</td>
          <td>{val['Depart']}</td>
          <td>{val['Shift']}</td>
          <td>{val['Gender']}</td>
        </tr>

          )
        }

        </table>

        {this.state.msg}
        <input onChange={(x)=> this.id = x.target.value }></input>
        
        <input onChange={(x)=> this.dpt = x.target.value }></input>
        
        <button onClick={()=>
        {
          // alert('')
          let s1 = "insert into tbl_depart values ("+ this.id +",'"+this.dpt+"')";
          Axios.post("http://localhost:3001/CUD_Fun",{mySQL:s1}).then(
            (obj)=>
            {
              this.setState({msg:obj.data})
            }
          )
        }
        }>Insert</button>
        &nbsp;
        <button onClick={()=>
        {
          let s1 = "Update tbl_depart set DPT_Name = '"+this.dpt+"' where ID = " + this.id
          Axios.post ("http://localhost:3001/CUD_Fun",{mySQL:s1}).then(
            (res) => 
            {
              if (res.data == 'Done')
                this.setState({msg:'Successfully Update Data'})
              else
                this.setState({msg:'Some Error...'})
            }
          )
        }
        
        } >Update</button>
        &nbsp;
        <button onClick={()=>{
          let sql = "Delete From tbl_depart where id = " + this.id
          Axios.post ("http://localhost:3001/CUD_Fun",{mySQL:sql}).then (
            (obj)=>
            {
              if (obj.data == "Done")
                this.setState({msg:'asdsa dsad sadsad sad  Delete...'})
              else
              this.setState({msg:'Some Error....'})
            }
          )
        }} >Delete </button>
        &nbsp;
        <button onClick={()=>{
          let s1 = "Select * From Tbl_emp where shift = 'Morning' "
          Axios.get("http://localhost:3001/iHi/DataQuery",{params: {sql:s1}  }).then(
            (res) => 
            {
              this.setState({myData:res.data})
            }
          )
            
        }}>Read data</button>
      </div>
    );
  }
}
 
export default App;