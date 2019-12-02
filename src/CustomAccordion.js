import React, { useState, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';

import CustomAccordionSection from './CustomAccordionSection';

function CustomAccordion({allowMultipleOpen, children}) {
    const [openSections, setOpenSections] = useState({});

    useEffect(() => {
        const updatedOpenSections = {};
        children.forEach(child => {
            if(child.props.isOpen) {
                updatedOpenSections[child.props.label] = true;
            }
        });
        setOpenSections(updatedOpenSections);
    }, [children]);


  const onClick = useCallback(label => {

    // const isOpen = !!openSections[label];

    if (allowMultipleOpen) {
        // setOpenSections(
        //   {
        //     ...openSections,
        //     [label]: !isOpen
        //   }
        // );
        setOpenSections(prevOpenSections => ({...prevOpenSections, [label]: !prevOpenSections[label]}));
      } else {
        // setOpenSections(
        //     {
        //         [label]: !isOpen
        //     }
        //     );
        setOpenSections(prevOpenSections => ({[label]: !prevOpenSections[label]}));
    }
  }, [allowMultipleOpen]);


    return (
      <div style={{ border: '2px solid #008f68' }}>
        {children.map((child, index) => (
          <CustomAccordionSection
            key={index}
            isOpen={!!openSections[child.props.label]}
            label={child.props.label}
            onClick={onClick}
          >
            {child.props.children}
          </CustomAccordionSection>
        ))}
      </div>
    );

}

CustomAccordion.prototype = {
    allowMultipleOpen: PropTypes.bool,
    children: PropTypes.instanceOf(Object).isRequired,
}

export default CustomAccordion;
