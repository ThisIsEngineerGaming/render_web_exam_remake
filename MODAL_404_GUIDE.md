# Modal & 404 Page Implementation Guide

## Overview
This guide covers the newly added Modal component and 404 Not Found page in your render_project_remake.

---

## 404 Not Found Page

### Files Added
- `js/react/pages/NotFound.jsx` - The 404 page component
- `js/react/pages/NotFound.styles.js` - Styled components for the 404 page

### How It Works
The 404 page is automatically displayed when users navigate to any route that doesn't exist. It's registered in `main.jsx` as a catch-all route using the wildcard `*` path.

```jsx
<Route path="*" element={<NotFound />} />
```

### Features
- Large, prominent 404 error code
- Friendly message explaining the issue
- "Return to Homepage" button for easy navigation
- Responsive design that works on all screen sizes
- Themed with your current design system

### Styling
The 404 page uses styled-components and respects your theme colors:
- `theme.colors.primary` - Button color
- `theme.colors.text` - Headings
- `theme.colors.textSecondary` - Description text
- `theme.colors.background` - Page background

---

## Modal Component

### Files Added
- `js/react/components/Modal.jsx` - The reusable Modal component
- `js/react/components/Modal.styles.js` - Styled components for the Modal
- `js/react/components/ModalExample.jsx` - Example usage demonstrations

### Basic Usage

```jsx
import { useState } from "react";
import Modal from "./components/Modal.jsx";

export default function YourComponent() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button onClick={() => setIsOpen(true)}>Open Modal</button>

      <Modal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        title="Modal Title"
      >
        <p>Your content goes here</p>
      </Modal>
    </>
  );
}
```

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `isOpen` | boolean | - | Controls whether the modal is visible |
| `onClose` | function | - | Callback triggered when modal should close |
| `title` | string | - | Title displayed in the modal header |
| `children` | ReactNode | - | Content displayed in the modal body |
| `footer` | ReactNode | undefined | Optional footer content (buttons, etc) |
| `closeOnOverlayClick` | boolean | true | Whether clicking the overlay closes the modal |

### Features

✅ **Keyboard Navigation**
- Press ESC to close the modal
- Focus management and accessible

✅ **Multiple Trigger Methods**
- Click the X button to close
- Click outside the modal (configurable)
- Press ESC key
- Programmatically via state

✅ **Body Scroll Prevention**
- Automatically disables body scroll when modal is open
- Re-enables when modal closes

✅ **Smooth Animations**
- Fade-in overlay animation
- Slide-in content animation
- Close button rotation on hover

✅ **Theme Integration**
- Respects your styled-components theme
- Uses theme colors consistently
- Responsive design

### Advanced Examples

#### Modal with Footer Buttons
```jsx
import { useState } from "react";
import Modal from "./components/Modal.jsx";

export default function Example() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button onClick={() => setIsOpen(true)}>Open Modal</button>

      <Modal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        title="Confirm Action"
        footer={
          <div style={{ display: "flex", gap: "1rem" }}>
            <button onClick={() => setIsOpen(false)}>Cancel</button>
            <button onClick={() => {
              // Handle confirmation
              setIsOpen(false);
            }}>
              Confirm
            </button>
          </div>
        }
      >
        <p>Are you sure?</p>
      </Modal>
    </>
  );
}
```

#### Confirmation Dialog (No Outside Click to Close)
```jsx
<Modal
  isOpen={isOpen}
  onClose={() => setIsOpen(false)}
  title="Important"
  closeOnOverlayClick={false}
>
  <p>This requires an explicit action to close.</p>
</Modal>
```

#### Modal with Custom Styling
```jsx
import styled from "styled-components";

const CustomContent = styled.div`
  padding: 2rem;
  text-align: center;

  h3 {
    color: ${props => props.theme.colors.primary};
  }
`;

<Modal
  isOpen={isOpen}
  onClose={() => setIsOpen(false)}
  title="Custom Styled Modal"
>
  <CustomContent>
    <h3>Custom Content</h3>
    <p>Style it however you want!</p>
  </CustomContent>
</Modal>
```

### Common Use Cases

**1. Confirmation Dialogs**
```jsx
const [deleteConfirm, setDeleteConfirm] = useState(false);

<Modal
  isOpen={deleteConfirm}
  onClose={() => setDeleteConfirm(false)}
  closeOnOverlayClick={false}
  title="Delete Item?"
  footer={
    <button onClick={() => handleDelete()}>Delete</button>
  }
>
  This action cannot be undone.
</Modal>
```

**2. Form Modals**
```jsx
<Modal isOpen={isOpen} onClose={onClose} title="Add New Product">
  <form onSubmit={handleSubmit}>
    <input type="text" placeholder="Product name" />
    <input type="number" placeholder="Price" />
    {/* form fields */}
  </form>
</Modal>
```

**3. Alerts/Notifications**
```jsx
<Modal isOpen={isOpen} onClose={onClose} title="Success!">
  <p>Your changes have been saved.</p>
</Modal>
```

**4. Multi-Step Wizards**
```jsx
const [step, setStep] = useState(1);

<Modal isOpen={isOpen} onClose={onClose} title={`Step ${step} of 3`}>
  {step === 1 && <StepOne />}
  {step === 2 && <StepTwo />}
  {step === 3 && <StepThree />}
</Modal>
```

---

## Testing

### View Modal Examples
Use the `ModalExample.jsx` component to see three different modal configurations in action:

```jsx
import ModalExample from "./components/ModalExample.jsx";

// In your component:
<ModalExample />
```

This demonstrates:
- Simple modal without footer
- Modal with action buttons
- Confirmation dialog with prevented outside clicks

### Test 404 Page
Navigate to any non-existent route:
- `http://localhost:5173/nonexistent`
- `http://localhost:5173/admin/settings`
- Any route not in your router configuration

---

## Accessibility

Both components include accessibility features:

✅ **Modal**
- Semantic HTML structure
- ARIA labels on close button
- Keyboard navigation (ESC, Tab)
- Focus trap considerations
- Proper color contrast

✅ **404 Page**
- Semantic heading hierarchy
- Meaningful button text
- Proper link structure
- High contrast design

---

## Styling & Customization

All components use styled-components and respect your theme. To customize colors, edit your theme configuration (typically in your ThemeWrapper or theme context).

Common theme colors used:
- `theme.colors.primary` - Primary action color
- `theme.colors.background` - Background color
- `theme.colors.text` - Primary text color
- `theme.colors.textSecondary` - Secondary text color
- `theme.colors.border` - Border color

---

## Browser Support

Both components work in all modern browsers:
- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers

---

## Questions?

Refer to the component files directly for more detailed implementation notes and inline documentation.
