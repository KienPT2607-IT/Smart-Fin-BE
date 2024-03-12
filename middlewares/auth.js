const jwt = require("jsonwebtoken");

const auth = async (req, res, next) => {
	try {
		const token = req.header("x-auth-token");
		if (!token) {
			return res.status(401).json({
				message: "No auth token, authorization denied!",
			});
		}
		const verified = jwt.verify(token, "passwordKey");
		if (!verified) {
			return res.status(401).json({
				message: "Token authorization failed, authorization denied!",
			});
		}
		req.user_id = verified.id; // extract id from token and assign to req.user_id
		req.token = token;
		next();
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
};

exports.auth = auth;
