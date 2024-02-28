import React from 'react';

// Higher-Order Component
const withEnhancements = (WrappedComponent) => {
  // This component takes the props and adds some enhancements
  const EnhancedComponent = (props) => {
    // Add additional props or logic here
    const newProp = 'This is a new prop added by the HOC';

    // Render the WrappedComponent with the enhanced props
    return <WrappedComponent {...props} enhancedProp={newProp} />;
  };

  // Return the enhanced component
  return EnhancedComponent;
};

// Your original functional component
const MyComponent = (props) => {
  return (
    <div>
      <p>{props.text}</p>
      <p>{props.enhancedProp}</p>
    </div>
  );
};

// Enhance MyComponent using the HOC
const MyEnhancedComponent = withEnhancements(MyComponent);

// Now, use MyEnhancedComponent in your application
const App = () => {
  return <MyEnhancedComponent text="Hello, World!" />;
};

export default App;
