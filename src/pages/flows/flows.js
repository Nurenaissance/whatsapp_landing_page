import React from 'react';
import './flows.css';

const Flows = () => {

    return (
        <div className="Flows">
        <div className="sidebar">
          <a href="#Chatbot flows" class="active">Chatbot flows</a>
          <a href="#Trigger">Trigger</a>
         </div>
            <div className="Flows-card">
          <div className="flows-content">
          <h2>Chatbot Flows</h2>
            <input type="text" placeholder="Search..." />
          <div className=" fallback-button "> 
          <button>Chatbot Timer</button>
          <button>Fallback Message</button>
          </div> 
            <button>Add Chatbot</button>
          </div>
          </div>
          <div>
      <h2>Table Example</h2>
      <table className="table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Triggered</th>
            <th>Steps Finished</th>
            <th>Finished</th>
            <th>Modified on</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody> 
           <td>"Catalog_11"</td>
           <td>{46}</td>
            <td>{116}</td>
           <td>{46}</td>
            <td>"Created 14 days ago"
            Updated 14 days ago</td>
          <td>  <button className="action-button">Copy</button>
        <button className="action-button">Edit</button>
        <button className="action-button">Delete</button></td>
       </tbody>
       <tbody>
        <td>"Catalog_11"</td>
           <td>{46}</td>
            <td>{116}</td>
           <td>{46}</td>
            <td>"Created 14 days ago"
            Updated 14 days ago</td>
          <td>  <button className="action-button">Copy</button>
        <button className="action-button">Edit</button>
        <button className="action-button">Delete</button></td>
        </tbody>
        <tbody>
        <td>"Catalog_11"</td>
           <td>{46}</td>
            <td>{116}</td>
           <td>{46}</td>
            <td>"Created 14 days ago"
            Updated 14 days ago</td>
          <td>  <button className="action-button">Copy</button>
        <button className="action-button">Edit</button>
        <button className="action-button">Delete</button></td>
        </tbody>
        <tbody>
        <td>"Catalog_11"</td>
           <td>{46}</td>
            <td>{116}</td>
           <td>{46}</td>
            <td>"Created 14 days ago"
            Updated 14 days ago</td>
          <td>  <button className="action-button">Copy</button>
        <button className="action-button">Edit</button>
        <button className="action-button">Delete</button></td>
        </tbody>
        <tbody>
        <td>"Catalog_11"</td>
           <td>{46}</td>
            <td>{116}</td>
           <td>{46}</td>
            <td>"Created 14 days ago"
            Updated 14 days ago</td>
          <td>  <button className="action-button">Copy</button>
        <button className="action-button">Edit</button>
        <button className="action-button">Delete</button></td>
        </tbody>
        <tbody>
        <td>"Catalog_11"</td>
           <td>{46}</td>
            <td>{116}</td>
           <td>{46}</td>
            <td>"Created 14 days ago"
            Updated 14 days ago</td>
          <td>  <button className="action-button">Copy</button>
        <button className="action-button">Edit</button>
        <button className="action-button">Delete</button></td>
        </tbody>
      </table>
    </div>
        </div>
      );
    };

export default Flows;