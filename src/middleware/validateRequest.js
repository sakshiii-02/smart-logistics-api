const validateRequest = (schemas) => {
    return (req, res, next) => {
        req.validated = req.validated || {};

        for (const [source, schema] of Object.entries(schemas)) {
            const { error, value } = schema.validate(req[source], {
                abortEarly: false,
                convert: true,
                stripUnknown: true
            });

            if (error) {
                return res.status(400).json({
                    success: false,
                    message: "Validation failed",
                    errors: error.details.map((detail) => detail.message)
                });
            }

            req.validated[source] = value;
        }

        next();
    };
};

module.exports = validateRequest;