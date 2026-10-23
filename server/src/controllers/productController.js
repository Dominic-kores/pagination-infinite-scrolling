
import prisma from "../lib/prisma.js";

// Convert query parameters into valid positive integers.
function parsePositiveInteger(value, defaultValue, max = Infinity) {
  if (value === undefined) return defaultValue;

  const number = Number(value);

  if (
    !Number.isSafeInteger(number) ||
    number < 1 ||
    number > max
  ) {
    return null;
  }

  return number;
}

// GET /api/products
export async function getProducts(req, res, next) {
  try {
    // STEP 1: Read and validate pagination parameters.
    const page = parsePositiveInteger(req.query.page, 1);
    const limit = parsePositiveInteger(req.query.limit, 10, 100);

    if (page === null || limit === null) {
      return res.status(400).json({
        message:
          "Page must be at least 1 and limit must be between 1 and 100.",
      });
    }

    // STEP 2: Read optional filtering parameters.
    const category = req.query.category || "";
    const search = req.query.search || "";

    if (
      typeof category !== "string" ||
      typeof search !== "string"
    ) {
      return res.status(400).json({
        message: "Category and search must be strings.",
      });
    }

    // STEP 3: Validate sorting parameters.
    const allowedSortFields = [
      "createdAt",
      "price",
      "name",
    ];

    const sort = req.query.sort ?? "createdAt";
    const order = req.query.order ?? "desc";

    if (
      !allowedSortFields.includes(sort) ||
      !["asc", "desc"].includes(order)
    ) {
      return res.status(400).json({
        message: "Invalid sort field or order.",
      });
    }

    // STEP 4: Calculate how many products to skip.
    const skip = (page - 1) * limit;

    if (!Number.isSafeInteger(skip)) {
      return res.status(400).json({
        message: "Page offset is too large.",
      });
    }

    // STEP 5: Build the Prisma filter.
    // Both findMany and count will use this filter.
    const where = {
      ...(category && { category }),
      ...(search && {
        name: {
          contains: search,
          mode: "insensitive",
        },
      }),
    };

    // STEP 6: Fetch products and total count in parallel.
    const [data, total] = await Promise.all([
      prisma.product.findMany({
        where,
        skip,
        take: limit,
        orderBy: [
          { [sort]: order },
          { id: "asc" },
        ],
      }),

      prisma.product.count({
        where,
      }),
    ]);

    // STEP 7: Calculate pagination metadata.
    const totalPages = Math.ceil(total / limit);

    // STEP 8: Return the required response structure.
    return res.status(200).json({
      data,
      metadata: {
        page,
        limit,
        total,
        totalPages,
        hasNext: page < totalPages,
        hasPrev: page > 1 && totalPages > 0,
      },
    });
  } catch (error) {
    next(error);
  }
}

// GET /api/products/categories
export async function getCategories(req, res, next) {
  try {
    // Get unique categories from PostgreSQL.
    const categories = await prisma.product.findMany({
      distinct: ["category"],
      select: { category: true },
      orderBy: { category: "asc" },
    });

    res.json({
      data: categories.map((item) => item.category),
    });
  } catch (error) {
    next(error);
  }
}
