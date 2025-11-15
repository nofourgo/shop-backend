const Product = require('../models/Product');
const Category = require('../models/Category');
async function getAllChildCategoryIds(categoryId) {
  const children = await Category.find({ parentId: categoryId }).select('_id');
  let ids = children.map(c => c._id.toString());

  for (let child of children) {
    const subIds = await getAllChildCategoryIds(child._id);
    ids = ids.concat(subIds);
  }

  return ids;
}
exports.getProductByCategorySlug = async (req, res) => {
  try {
    const slug = req.query.slug || null;


    let category;
    if (slug) {
      category = await Category.findOne({ link: slug });
      if (!category) return res.status(404).json({ message: 'Category not found' });
    }

    let categoryIds = [];
    if (category) {
      // Lấy tất cả categoryId của category + con của nó
      const childIds = await getAllChildCategoryIds(category._id);
      categoryIds = [category._id.toString(), ...childIds];
    }

    // Nếu slug rỗng, categoryIds = [] → lấy tất cả sản phẩm
    const filter = categoryIds.length > 0 ? { categoryId: { $in: categoryIds } } : {};

    const products = await Product.find(filter);
    res.json({ items: products, totalCount: products.length });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
};
exports.getProductByUrl = async (req, res) => {
  try {
    const slug = req.query.url;
    if (!slug) return res.status(400).json({ message: 'Missing url parameter' });

    const product = await Product.findOne({ slug });
    if (!product) return res.status(404).json({ message: 'Product not found' });

    res.json(product);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
exports.getProductByFilters = async (req, res) => {
  try {
    const { textSearch, typeOf, width, length, recycle } = req.query;
    let filter = {};

    // --- Category filter (categories[])
    const categories = req.query.categories || req.query['categories[]'];

    if (categories) {
      const categoryArray = Array.isArray(categories) ? categories : [categories];
      let categoryIds = [];

      for (const id of categoryArray) {
        // Lấy toàn bộ con
        const childIds = await getAllChildCategoryIds(id);
        categoryIds.push(id, ...childIds);
      }

      // Loại trùng
      categoryIds = [...new Set(categoryIds)];

      filter.categoryId = { $in: categoryIds };
    }

    // --- Text search
    if (textSearch) {
      filter.prodName = { $regex: textSearch, $options: 'i' };
    }

    // --- TypeOf filter
    if (typeOf) {
      const typeArray = Array.isArray(typeOf) ? typeOf.map(Number) : [Number(typeOf)];
      filter.typeOf = { $in: typeArray };
    }

    // --- Width filter
    if (width) {
      const [min, max] = JSON.parse(width);
      filter.width = { $gte: min, $lte: max };
    }

    // --- Length filter
    if (length) {
      const [min, max] = JSON.parse(length);
      filter.length = { $gte: min, $lte: max };
    }

    // --- Recycle filter
    if (recycle) {
      const recycleArray = Array.isArray(recycle) ? recycle : [recycle];
      filter.recycle = { $in: recycleArray };
    }

    console.log("Filter applied:", filter);

    const products = await Product.find(filter);

    res.json({ items: products, totalCount: products.length });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
};
exports.getRelatedProducts = async (req, res) => {
  try {
    // Lấy productUrl từ param
    const productUrl = req.query.productUrl;
    if (!productUrl) return res.status(400).json({ message: 'Missing productUrl parameter' });
    // Tìm sản phẩm theo slug
    const product = await Product.findOne({ slug: productUrl });
    if (!product) return res.status(404).json({ message: 'Product not found' });
    // Tìm các sản phẩm liên quan trong cùng category, trừ chính nó
    const relatedProducts = await Product.find({
      categoryId: product.categoryId,
      _id: { $ne: product._id }
    }).limit(10); // Giới hạn 10 sản phẩm liên quan
    // Trả về danh sách sản phẩm liên quan


    res.json({ items: relatedProducts, totalCount: relatedProducts.length });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}
