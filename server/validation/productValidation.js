const Category = require('../database/models/category');

// Fields a client is allowed to set on a product
const PRODUCT_FIELDS = [
  'title',
  'price',
  'discont_price',
  'description',
  'image',
  'categoryId'
];

// Required when a new product is created
const REQUIRED_FIELDS = ['title', 'price', 'description'];

const isNonEmptyString = (value) =>
  typeof value === 'string' && value.trim() !== '';

const isPositiveNumber = (value) =>
  typeof value === 'number' && Number.isFinite(value) && value > 0;

// Copies only the allowed product fields from the request body.
// Unknown fields (id, createdAt, ...) are ignored.
function pickProductFields(body = {}) {
  const data = {};

  PRODUCT_FIELDS.forEach((field) => {
    if (body[field] !== undefined) {
      data[field] = body[field];
    }
  });

  return data;
}

/**
 * Validates product data for create (POST) and update (PUT).
 *
 * @param {object} data - fields picked with pickProductFields
 * @param {object} [options]
 * @param {object} [options.currentProduct] - existing product (for updates),
 *   used to compare a new price with the saved discount and vice versa
 * @returns {Promise<string[]>} list of error messages, empty if valid
 */
async function validateProduct(data, { currentProduct = null } = {}) {
  const errors = [];
  const isUpdate = currentProduct !== null;

  if (!isUpdate) {
    REQUIRED_FIELDS.forEach((field) => {
      if (data[field] === undefined) {
        errors.push(`${field} is required`);
      }
    });
  }

  ['title', 'description', 'image'].forEach((field) => {
    if (field in data && !isNonEmptyString(data[field])) {
      errors.push(`${field} must be a non-empty string`);
    }
  });

  if ('price' in data && !isPositiveNumber(data.price)) {
    errors.push('price must be a number greater than 0');
  }

  if (
    'discont_price' in data &&
    data.discont_price !== null &&
    !isPositiveNumber(data.discont_price)
  ) {
    errors.push('discont_price must be a number greater than 0 or null');
  }

  // Discount price must stay lower than price, using saved values
  // for whatever is not sent in this request
  const finalPrice = 'price' in data ? data.price : currentProduct?.price;
  const finalDiscount =
    'discont_price' in data
      ? data.discont_price
      : currentProduct?.discont_price ?? null;

  if (
    isPositiveNumber(finalPrice) &&
    isPositiveNumber(finalDiscount) &&
    finalDiscount >= finalPrice
  ) {
    errors.push(
      'discont_price' in data
        ? 'discont_price must be lower than price'
        : 'price must be higher than the current discont_price (or send discont_price: null)'
    );
  }

  if ('categoryId' in data) {
    const category = Number.isInteger(data.categoryId)
      ? await Category.findOne({ where: { id: data.categoryId } })
      : null;

    if (!category) {
      errors.push('categoryId must be the id of an existing category');
    }
  }

  return errors;
}

module.exports = {
  PRODUCT_FIELDS,
  pickProductFields,
  validateProduct
};
