import { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";

function App() {

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [source, setSource] = useState("Call");

  const [leads, setLeads] = useState([]);

  const fetchLeads = async () => {

    const res = await axios.get(
      "http://localhost:5000/leads"
    );

    setLeads(res.data);

  };

  useEffect(() => {
    fetchLeads();
  }, []);


  const addLead = async () => {

    if (!name || !phone) {

      alert("Please fill all fields");

      return;

    }

    await axios.post(
      "http://localhost:5000/leads",
      {
        name,
        phone,
        source
      }
    );

    setName("");
    setPhone("");
    setSource("Call");

    fetchLeads();

  };


  const updateStatus = async (id, status) => {

    await axios.put(
      `http://localhost:5000/leads/${id}`,
      {
        status
      }
    );

    fetchLeads();

  };


  const deleteLead = async (id) => {

    await axios.delete(
      `http://localhost:5000/leads/${id}`
    );

    fetchLeads();

  };


  return (

    <div className="container">

      <h1>Lead Management System</h1>

      {/* Dashboard */}

      <div className="dashboard">

        <h3>Total Leads: {leads.length}</h3>

        <h3>
          Converted: {
            leads.filter(
              lead => lead.status === "Converted"
            ).length
          }
        </h3>

      </div>


      {/* Form */}

      <input
        value={name}
        placeholder="Enter Name"
        onChange={(e) =>
          setName(e.target.value)}
      />


      <input
        value={phone}
        placeholder="Enter Phone"
        onChange={(e) =>
          setPhone(e.target.value)}
      />


      <select
        value={source}
        onChange={(e) =>
          setSource(e.target.value)}
      >

        <option>Call</option>

        <option>
          WhatsApp
        </option>

        <option>
          Field
        </option>

      </select>


      <button onClick={addLead}>
        Add Lead
      </button>

      <hr />


      {/* Lead List */}

      {

        leads.map((lead) => (

          <div
            className="card"
            key={lead.id}
          >

            <h3>{lead.name}</h3>

            <p>
              Phone:
              {lead.phone}
            </p>

            <p>
              Source:
              {lead.source}
            </p>

            <p>
              Status:
              {lead.status}
            </p>


            <select

              onChange={(e) =>

                updateStatus(
                  lead.id,
                  e.target.value
                )

              }

            >

              <option>
                Interested
              </option>

              <option>
                Not Interested
              </option>

              <option>
                Converted
              </option>

            </select>


            <button

              onClick={() =>

                deleteLead(
                  lead.id
                )

              }

            >

              Delete

            </button>

          </div>

        ))

      }

    </div>

  );

}

export default App;