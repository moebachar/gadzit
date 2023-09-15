import Joi from "joi-browser";

export const validate = (data, schema) => {
  const options = { abortEarly: false };
  const { error } = Joi.validate(data, schema, options);
  if (!error) return null;

  const errors = {};
  for (let item of error.details) errors[item.path[0]] = item.message;
  return errors;
};

export function validate_date(date, time, hourDifference) {
  const currentDate = new Date();
  const inputDateTime = new Date(`${date} ${time}`);

  // Calculate the time difference in milliseconds
  const timeDiff = Math.abs(inputDateTime - currentDate);
  const hoursDiff = timeDiff / (1000 * 60 * 60);

  return hoursDiff >= hourDifference;
}
