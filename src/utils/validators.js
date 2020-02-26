import Joi from "@hapi/joi";

export default {
  website: Joi.string().pattern(/^(https?:\/\/)?(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&//=]*)$/, 'uri').label('Website'),
  email: Joi.string().email({tlds: {allow: false}})
};
