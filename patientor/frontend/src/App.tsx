import React from "react";
import axios from "axios";
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import { Button, Divider, Header, Container } from "semantic-ui-react";

import { apiBaseUrl } from "./constants";
import { setDiagnoses, setPatients, useStateValue } from "./state";
import patientService from "./services/patients";
import diagnosisService from "./services/diagnosis";

import PatientListPage from "./PatientListPage";
import PatientInfoPage from "./PatientInfoPage";

const App = () => {
  const [, dispatch] = useStateValue();

  React.useEffect(() => {
    void axios.get<void>(`${apiBaseUrl}/ping`);

    const fetchPatientList = async () => {
      try {
        const patientListFromApi = await patientService.getAll();
        dispatch(setPatients(patientListFromApi));
      } catch (e) {
        console.error(e);
      }
    };

    const fetchDiagnosisCodes = async () => {
      try {
        const fetchedCodes = await diagnosisService.getAll();

        void dispatch(setDiagnoses(fetchedCodes));
      } catch (e) {
        console.log(e);
      }
    };

    void fetchPatientList();
    void fetchDiagnosisCodes();
  }, [dispatch]);

  return (
    <div className="App">
      <Router>
        <Container>
          <Header as="h1">Patientor</Header>
          <Button as={Link} to="/" primary>
            Home
          </Button>
          <Divider hidden />
          <Switch>
            <Route path="/patients/:id">
              <PatientInfoPage />
            </Route>
            <Route path="/">
              <PatientListPage />
            </Route>
          </Switch>
        </Container>
      </Router>
    </div>
  );
};

export default App;
