import React from "react";
import { Button, Divider, Modal, Segment } from "semantic-ui-react";
import { Entry } from "../../types";
import AddEntryForm, { EntryFormValues } from "./AddEntryForm";

interface Props {
  modalOpen: boolean;
  onClose: () => void;
  onSubmit: (values: EntryFormValues) => void;
  error?: string;
}

const AddEntryModal = ({ modalOpen, onClose, onSubmit, error }: Props) => {
  const [formType, setFormType] = React.useState<Entry["type"]>("HealthCheck");

  return (
    <Modal open={modalOpen} onClose={onClose} centered={false} closeIcon>
      <Modal.Header>Add a new Entry</Modal.Header>
      <Modal.Content>
        {error && <Segment inverted color="red">{`Error: ${error}`}</Segment>}
        <Button.Group>
          <Button onClick={() => setFormType("HealthCheck")}>
            HealthCheck
          </Button>
          <Button onClick={() => setFormType("OccupationalHealthcare")}>
            Occupational Healthcare
          </Button>
          <Button onClick={() => setFormType("Hospital")}>Hospital</Button>
        </Button.Group>
        <Divider />
        <AddEntryForm
          onSubmit={onSubmit}
          onCancel={onClose}
          formType={formType}
        />
      </Modal.Content>
    </Modal>
  );
};

export default AddEntryModal;
