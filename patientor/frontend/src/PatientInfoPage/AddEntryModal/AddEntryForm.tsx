import React from "react";
import { Field, Form, Formik } from "formik";
import { Button, Container, Grid, Header } from "semantic-ui-react";
import {
  DiagnosisSelection,
  NumberField,
  TextField,
} from "../../AddPatientModal/FormField";
import { useStateValue } from "../../state";
import {
  Entry,
  HealthCheckEntry,
  HospitalEntry,
  OccupationalHealthEntry,
} from "../../types";

export type EntryFormValues = Omit<HealthCheckEntry, "id" | "type"> &
  Omit<OccupationalHealthEntry, "id" | "type"> &
  Omit<HospitalEntry, "id" | "type"> & {
    type: Entry["type"];
  };

interface Props {
  onSubmit: (values: EntryFormValues) => void;
  onCancel: () => void;
  formType: Entry["type"];
}

const AddEntryForm = ({ onSubmit, onCancel, formType }: Props) => {
  const [{ diagnoses }] = useStateValue();

  return (
    <Formik
      enableReinitialize
      initialValues={{
        type: formType,
        description: "",
        date: "",
        specialist: "",
        diagnosisCodes: [],
        healthCheckRating: 0,
        employerName: "",
        sickLeave: {
          startDate: "",
          endDate: "",
        },
        discharge: {
          date: "",
          criteria: "",
        },
      }}
      onSubmit={onSubmit}
      validate={(values) => {
        const requiredError = "Field is required";
        const errors: { [field: string]: string } = {};
        if (!values.description) {
          errors.description = requiredError;
        }
        if (!values.date) {
          errors.date = requiredError;
        }
        if (!values.specialist) {
          errors.specialist = requiredError;
        }

        return errors;
      }}
    >
      {({ isValid, dirty, setFieldValue, setFieldTouched }) => {
        return (
          <Form className="form ui">
            <Field
              label="Description"
              placeholder="Description"
              name="description"
              component={TextField}
            />
            <Field
              label="Date"
              placeholder="YYYY-MM-DD"
              name="date"
              component={TextField}
            />
            <Field
              label="Specialist"
              placeholder="Specialist"
              name="specialist"
              component={TextField}
            />
            {formType === "HealthCheck" && (
              <Field
                label="HealthCheckRating"
                name="healthCheckRating"
                component={NumberField}
                min={0}
                max={3}
              />
            )}
            {formType === "OccupationalHealthcare" && (
              <>
                <Field
                  label="EmployerName"
                  name="employerName"
                  component={TextField}
                  placeholder="Employer Name"
                />
                <Header as="h5" style={{ margin: "0" }}>
                  Sick Leave
                </Header>
                <Container style={{ display: "flex" }}>
                  <Field
                    name="sickLeave.startDate"
                    placeholder="YYYY-MM-DD"
                    component={TextField}
                  />
                  <Field
                    name="sickLeave.endDate"
                    placeholder="YYYY-MM-DD"
                    component={TextField}
                  />
                </Container>
              </>
            )}
            {formType === "Hospital" && (
              <>
                <Field
                  label="Discharge Date"
                  name="discharge.date"
                  placeholder="YYYY-MM-DD"
                  component={TextField}
                />
                <Field
                  label="Discharge Criteria"
                  name="discharge.criteria"
                  placeholder="Criteria"
                  component={TextField}
                />
              </>
            )}
            <DiagnosisSelection
              setFieldValue={setFieldValue}
              setFieldTouched={setFieldTouched}
              diagnoses={Object.values(diagnoses)}
            />
            <Grid>
              <Grid.Column floated="left" width={5}>
                <Button type="button" onClick={onCancel} color="red">
                  Cancel
                </Button>
              </Grid.Column>
              <Grid.Column floated="right" width={5}>
                <Button
                  type="submit"
                  floated="right"
                  color="green"
                  disabled={!dirty || !isValid}
                >
                  Add
                </Button>
              </Grid.Column>
            </Grid>
          </Form>
        );
      }}
    </Formik>
  );
};

export default AddEntryForm;
