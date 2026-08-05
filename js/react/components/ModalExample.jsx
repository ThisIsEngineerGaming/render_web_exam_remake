import { useState } from "react";
import Modal from "./Modal.jsx";
import styled from "styled-components";

const ExampleContainer = styled.div`
  padding: 2rem;
`;

const ExampleButton = styled.button`
  padding: 0.75rem 1.5rem;
  background-color: ${(props) => props.theme.colors.primary};
  color: ${(props) => props.theme.colors.background};
  border: none;
  border-radius: 4px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background-color: ${(props) => props.theme.colors.primaryHover};
    transform: translateY(-2px);
  }

  &:active {
    transform: translateY(0);
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;

  ${ExampleButton} {
    flex: 1;
    min-width: 150px;
  }
`;

const ModalFooterButtons = styled.div`
  display: flex;
  gap: 1rem;
  justify-content: flex-end;

  button {
    padding: 0.5rem 1rem;
    border-radius: 4px;
    border: none;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.2s ease;

    &:hover {
      transform: translateY(-2px);
    }
  }

  .primary {
    background-color: ${(props) => props.theme.colors.primary};
    color: ${(props) => props.theme.colors.background};
  }

  .secondary {
    background-color: ${(props) => props.theme.colors.border};
    color: ${(props) => props.theme.colors.text};
  }
`;

/**
 * Example component demonstrating Modal usage
 * Shows different modal configurations
 */
export default function ModalExample() {
  const [isSimpleOpen, setIsSimpleOpen] = useState(false);
  const [isWithFooterOpen, setIsWithFooterOpen] = useState(false);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);

  const handleConfirm = () => {
    alert("Action confirmed!");
    setIsConfirmOpen(false);
  };

  return (
    <ExampleContainer>
      <h3>Modal Examples</h3>

      <ButtonGroup>
        <ExampleButton onClick={() => setIsSimpleOpen(true)}>
          Simple Modal
        </ExampleButton>
        <ExampleButton onClick={() => setIsWithFooterOpen(true)}>
          Modal with Footer
        </ExampleButton>
        <ExampleButton onClick={() => setIsConfirmOpen(true)}>
          Confirmation Dialog
        </ExampleButton>
      </ButtonGroup>

      {/* Simple Modal */}
      <Modal
        isOpen={isSimpleOpen}
        onClose={() => setIsSimpleOpen(false)}
        title="Simple Modal"
      >
        <p>
          This is a simple modal without footer. Click the X button or press ESC
          to close. You can also click outside the modal to close it.
        </p>
      </Modal>

      {/* Modal with Footer */}
      <Modal
        isOpen={isWithFooterOpen}
        onClose={() => setIsWithFooterOpen(false)}
        title="Modal with Footer"
        footer={
          <ModalFooterButtons>
            <button className="secondary" onClick={() => setIsWithFooterOpen(false)}>
              Cancel
            </button>
            <button className="primary" onClick={() => setIsWithFooterOpen(false)}>
              Confirm
            </button>
          </ModalFooterButtons>
        }
      >
        <p>
          This modal has a footer section with action buttons. You can customize
          the footer content with any buttons or elements you need.
        </p>
      </Modal>

      {/* Confirmation Dialog */}
      <Modal
        isOpen={isConfirmOpen}
        onClose={() => setIsConfirmOpen(false)}
        title="Confirm Action"
        closeOnOverlayClick={false}
        footer={
          <ModalFooterButtons>
            <button className="secondary" onClick={() => setIsConfirmOpen(false)}>
              Cancel
            </button>
            <button className="primary" onClick={handleConfirm}>
              Yes, Confirm
            </button>
          </ModalFooterButtons>
        }
      >
        <p>Are you sure you want to proceed with this action?</p>
      </Modal>
    </ExampleContainer>
  );
}
