import React from "react";

export default {
   required: 'This field is required.',
   nothing: 'Nothing selected',
   clean: 'Clean selected',
   reload: 'Refresh data',
   settings: 'Settings',
   extended: 'Extended',
   minimal: 'Minimal',
   all: 'All',
   visible: 'Visible',
   allHidden: 'All fields are hidden',
   allVisible: 'All fields are visible',
   hidden: 'Hidden',
   image: 'Image',

   yes: 'Yes',
   no: 'No',

   page: (c, p) => {
      return `Page ${c} from ${p} loaded`
   },
   greaterThan: 'Greater than',
   lessThan: 'Less than',
   equalTo: 'Equal to',
   notEqual: 'Not equal',
   contain: 'Contain',
   apply: 'Apply'
}
