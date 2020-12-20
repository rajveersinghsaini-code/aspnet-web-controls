const STRINGS = {
  collapseAll: (rowsCount) => `Collapse All ${rowsCount} rows`,
  collapseAllRowsAnnouncement: (rowsCount) =>
    `all ${rowsCount} rows, collapsed`,
  collapseSingle: "Collapse",
  footerLabel: "Table Foote",
  emptyDataMessage: "No data available",
  rowExpandButtonLabel: (itemKey, item = {}) =>
    `${item.expand ? "collapsed" : "expand"} more about ${itemkey}`,
  expandAll: (rowsCount) => `Expand All ${rowsCount} rows`,
  expandAllRowsAnnouncement: (rowsCount) => `all ${rowsCount} rows, expand`,
  rowExpandedLabel: (uniqueNumber) => `${uniqueNumber}, expanded content`,
  collapsedRowAnnouncement: (itemKey) => `more about ${itemKey}, collapsed`,
  expandedRowAnnouncement: (itemKey) => `more about ${itemKey}, expanded`,
  rowExpandedDetails: (itemKey) => `${itemKey} details`,
  expandSingle: "Expand",
  row: "Row",
  select: "Select",
  selectAll: "Select All",
  selectTypeRowInstructions: "Use SPACE to select a row",
  sortAscending: "sorted ascending",
  softDescending: "sorted descending",
  sortable: "sortable",
  sorted: "sorted",
  sortedBy: "sorted by",
  selected: "selected",
  deselected: "deselected",
  getSelectAllStatus: (selectedRowCount, status) =>
    `${selectedRowCount} rows ${status}`,
};

export default STRINGS;
