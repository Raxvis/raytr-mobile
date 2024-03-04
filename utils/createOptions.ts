const createOptions = (records, labelKey, valueKey) =>
  records.map((record) => ({
    label: record[labelKey],
    value: record[valueKey],
  }));

export default createOptions;
